import {Observable} from 'redux';
import {PlainAction} from 'redux-typed-actions';
import {ofType, combineEpics} from 'redux-observable';
import {
  SearchOrder,
  SearchOrderSuccess,
  SearchOrderFailed,
  GetSeat,
  GetSeatSuccess,
  GetSeatFailed,
} from 'pages/SearchOrder/redux/actions';
import {GlobalLoadingSetup, GlobalModalSetup} from 'components';
import {exhaustMap, catchError, map} from 'rxjs/operators';
import {of} from 'rxjs';
import {StackActions, NavigationActions} from 'react-navigation';
import {store} from '../../../reduxs/store';
import {request} from 'utils/network/api';

const searchOrder$ = (action$: Observable<PlainAction>) =>
  action$.pipe(
    ofType(SearchOrder.type),
    exhaustMap((action: any) => {
      GlobalLoadingSetup.getLoading().isVisible();
      return request<any>({
        method: 'POST',
        url: 'findTickets',
        param: action.payload,
        option: {
          format: 'json',
        },
      }).pipe(
        map((value) => {
          GlobalLoadingSetup.getLoading().isHide();
          if ((value as any).result) {
            return SearchOrderSuccess.get((value as any).result);
          }
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'empty',
            'Không tìm thấy đơn hàng phù hợp.',
          );
          return SearchOrderFailed.get();
        }),
        catchError((error) => {
          GlobalLoadingSetup.getLoading().isHide();
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'empty',
            'Không tìm thấy đơn hàng phù hợp.',
          );
          return of(SearchOrderFailed.get(error));
        }),
      );
    }),
  );

const searchOrderSuccess$ = (action$: Observable<PlainAction>) =>
  action$.pipe(
    ofType(SearchOrderSuccess.type),
    map((action: any) => {
      return store.dispatch(
        NavigationActions.navigate({
          routeName: 'DetailTicket',
          params: {},
        }),
      );
    }),
  );

export const searchOrderEpics = combineEpics(searchOrder$, searchOrderSuccess$);
