import { Observable } from 'redux';
import { PlainAction } from 'redux-typed-actions';
import { ofType, combineEpics } from 'redux-observable';
import { GetFilter, GetFilterFailed, GetFilterSuccess, GetSeatSuccess, GetSeatFailed, GetSeat} from 'pages/SearchTrip/redux/actions';
import { GlobalLoadingSetup } from 'components';
import { exhaustMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { StackActions, NavigationActions } from 'react-navigation';
import { store } from '../../../reduxs/store';
import { request } from 'utils/network/api';

  const getFilter$ = (action$: Observable<PlainAction>) =>
  action$.pipe(
    ofType(GetFilter.type),
    exhaustMap((action: any) => {
      return request<any>({
        method: 'POST',
        url: 'filterForTrips',
        param: action.payload,
        option: {
          format: 'json',
        },
      }).pipe(
        map((value) => {
          if ((value as any).result) {
            return GetFilterSuccess.get((value as any).result);
          }
          return GetFilterFailed.get();
        }),
        catchError((error) => {
          return of(GetFilterFailed.get(error));
        }),
      );
    }),
  );

  const getFilterSuccess$ = (action$: Observable<PlainAction>) =>
  action$.pipe(
    ofType(GetFilterSuccess.type),
    map((action: any) => {
      return store.dispatch(
        NavigationActions.navigate({
          routeName: 'Filter',
          params: {}
        }),
      );
    }),
  );


  const getSeats$ = (action$: Observable<PlainAction>) =>
  action$.pipe( 
    ofType(GetSeat.type),
    exhaustMap((action: any) => {
      return request<any>({
        method: 'POST',
        url: 'getSeat',
        param: action.payload,
        option: {
          format: 'json',
        },
      }).pipe(
        map((value) => {
          if ((value as any).result) {
            const data = {
              pickUp: action.payload.pickUp,
              timeStart: action.payload.timeStart,
              price: action.payload.price,
              result: (value as any).result,
            }
            return GetSeatSuccess.get(data);
          }
          return GetSeatFailed.get();
        }),
        catchError((error) => {
          return of(GetSeatFailed.get(error));
        }),
      );
    }),
  );

  const getSeatsSuccess$ = (action$: Observable<PlainAction>) =>
  action$.pipe(
    ofType(GetSeatSuccess.type),
    map((action: any) => {
      return store.dispatch(
        NavigationActions.navigate({
          routeName: 'ChooseSeat',
          params: {}
        }),
      );
    }),
  );
export const searchEpics = combineEpics(getFilter$, getFilterSuccess$, getSeats$ , getSeatsSuccess$);
