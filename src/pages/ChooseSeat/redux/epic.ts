import { Observable } from 'redux';
import { PlainAction } from 'redux-typed-actions';
import { ofType, combineEpics } from 'redux-observable';
import { SearchOrder, SearchOrderSuccess, SearchOrderFailed } from 'pages/SearchOrder/redux/actions';
import { GlobalLoadingSetup } from 'components';
import { exhaustMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { StackActions, NavigationActions } from 'react-navigation';
import { store } from '../../../reduxs/store';
import { request } from 'utils/network/api';

  const searchOrder$ = (action$: Observable<PlainAction>) =>
  action$.pipe( 
    ofType(SearchOrder.type),
    exhaustMap((action: any) => {
      return request<any>({
        method: 'POST',
        url: 'findTickets',
        param: action.payload,
        option: {
          format: 'json',
        },
      }).pipe(
        map((value) => {
          if ((value as any).result && (value as any).result.length > 0) {
            return SearchOrderSuccess.get((value as any).result[0]);
          }
          return SearchOrderFailed.get();
        }),
        catchError((error) => {
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
          params: {}
        }),
      );
    }),
  );

export const searchOrderEpics = combineEpics(searchOrder$, searchOrderSuccess$);
