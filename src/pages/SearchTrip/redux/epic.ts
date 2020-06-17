import { Observable } from 'redux';
import { PlainAction } from 'redux-typed-actions';
import { ofType, combineEpics } from 'redux-observable';
import { GetCities, GetCitiesFailed, GetCitiesSuccess, SearchTrips, SearchTripsSuccess, SearchTripsFailed } from 'pages/Home/redux/actions';
import { GlobalLoadingSetup } from 'components';
import { exhaustMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { StackActions, NavigationActions } from 'react-navigation';
import { store } from 'reduxs/store';
import { request } from 'utils/network/api';

const getCities$ = (action$: Observable<PlainAction>) =>
  action$.pipe(
    ofType(GetCities.type),
    exhaustMap((action: any) => {
      return request<any>({
        method: 'GET',
        url: 'cities',
      }).pipe(
        map((value) => {
          if ((value as any).result.length > 0) {
            return GetCitiesSuccess.get((value as any).result);
          }
          return GetCitiesFailed.get();
        }),
        catchError((error) => {
          return of(GetCitiesFailed.get(error));
        }),
      );
    }),
  );

  const searchTrips$ = (action$: Observable<PlainAction>) =>
  action$.pipe(
    ofType(SearchTrips.type),
    exhaustMap((action: any) => {
      return request<any>({
        method: 'POST',
        url: 'trips',
        param: action.payload,
        option: {
          format: 'json',
        },
      }).pipe(
        map((value) => {
          if ((value as any).result.totalItems && (value as any).result.totalItems > 0) {
            return SearchTripsSuccess.get((value as any).result);
          }
          return SearchTripsFailed.get();
        }),
        catchError((error) => {
          return of(GetCitiesFailed.get(error));
        }),
      );
    }),
  );

  const searchTripsSuccess$ = (action$: Observable<PlainAction>) =>
  action$.pipe(
    ofType(SearchTripsSuccess.type),
    map((action: any) => {
      return store.dispatch(
        NavigationActions.navigate({
          routeName: 'SearchTrip',
          params: {}
        }),
      );
    }),
  );
export const homeEpics = combineEpics(getCities$, searchTrips$, searchTripsSuccess$);
