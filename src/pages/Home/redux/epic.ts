import { Observable } from 'redux';
import { PlainAction } from 'redux-typed-actions';
import { ofType, combineEpics } from 'redux-observable';
import { GetCities, GetCitiesFailed, GetCitiesSuccess, SearchTrips, SearchTripsSuccess, SearchTripsFailed, LoadMoreTrips, LoadMoreTripsSuccess, LoadMoreTripsFailed, FilterTrips, FilterTripsSuccess, FilterTripsFailed } from 'pages/Home/redux/actions';
import { GlobalLoadingSetup, GlobalModalSetup } from 'components';
import { exhaustMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { StackActions, NavigationActions } from 'react-navigation';
import { store } from '../../../reduxs/store';
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
      GlobalLoadingSetup.getLoading().isVisible();
      return request<any>({
        method: 'POST',
        url: 'trips',
        param: action.payload,
        option: {
          format: 'json',
        },
      }).pipe(
        map((value) => {
          GlobalLoadingSetup.getLoading().isHide();
          if ((value as any).result.totalItems && (value as any).result.totalItems > 0) {
            const data = {
              data: (value as any).result.data,
              totalItems: (value as any).result.totalItems,
              round: action.payload.round,
              date: (value as any).result.date,
              round1Date: action.payload.round1Date,
            }
            return SearchTripsSuccess.get(data);
          }
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'empty',
            'Không tìm thấy chuyến xe phù hợp!',
          );
          return SearchTripsFailed.get();
        }),
        catchError((error) => {
          GlobalLoadingSetup.getLoading().isHide();
          GlobalModalSetup.getGlobalModalHolder().alertMessage(
            'empty',
            'Không tìm thấy chuyến xe phù hợp!',
          );
          return of(SearchTripsFailed.get(error));
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
          params: { round: action.payload.round }
        }),
      );
    }),
  );

  const loadMoreTrips$ = (action$: Observable<PlainAction>) =>
  action$.pipe(
    ofType(LoadMoreTrips.type),
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
            return LoadMoreTripsSuccess.get((value as any).result);
          }
          return LoadMoreTripsFailed.get();
        }),
        catchError((value) => {
          return of(LoadMoreTripsFailed.get(value.response.data.result.message));
        }),
      );
    }),
  );

  const filterTrips$ = (action$: Observable<PlainAction>) =>
  action$.pipe(
    ofType(FilterTrips.type),
    exhaustMap((action: any) => {
      return request<any>({
        method: 'POST',
        url: 'searchTrips',
        param: action.payload,
        option: {
          format: 'json',
        },
      }).pipe(
        map((value) => {
          if ((value as any).result.totalItems && (value as any).result.totalItems > 0) {
            const val = {
              result: (value as any).result,
              timeVal: action.payload.timeStart || '',
              busOperatorVal: action.payload.busOperatorId || '',
              busTypeVal: action.payload.busType || '',
              priceFrom: action.payload.priceFrom || 0,
              priceTo: action.payload.priceTo || 0,
              isFilter: action.payload.isFilter,
              round: action.payload.round,
            }
            return FilterTripsSuccess.get(val);
          }
          return FilterTripsFailed.get();
        }),
        catchError((error) => {
          return of(FilterTripsFailed.get(error));
        }),
      );
    }),
  );

  const filterTripsSuccess$ = (action$: Observable<PlainAction>) =>
  action$.pipe(
    ofType(FilterTripsSuccess.type),
    map((action: any) => {
      return store.dispatch(
        NavigationActions.navigate({
          routeName: 'SearchTrip',
          params: {  round: action.payload.round }
        }),
      );
    }),
  );
export const homeEpics = combineEpics(getCities$, searchTrips$, searchTripsSuccess$, loadMoreTrips$, filterTrips$, filterTripsSuccess$);
