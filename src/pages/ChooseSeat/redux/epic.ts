import { GlobalLoadingSetup } from 'components';
import { Observable } from 'redux';
import { combineEpics, ofType } from 'redux-observable';
import { PlainAction } from 'redux-typed-actions';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { request } from 'utils/network/api';
import { GetPaymentMethod, GetPaymentMethodFailed, GetPaymentMethodSuccess } from './actions';
import { store } from '../../../reduxs/store';
import { NavigationActions } from 'react-navigation';

  const getPaymentMethod$ = (action$: Observable<PlainAction>) =>
  action$.pipe( 
    ofType(GetPaymentMethod.type),
    exhaustMap((action: any) => {
      GlobalLoadingSetup.getLoading().isVisible();
      return request<any>({
        method: 'GET',
        url: 'paymentMethod',
      }).pipe(
        map((value) => {
          GlobalLoadingSetup.getLoading().isHide();
          if ((value as any).result && (value as any).result.length > 0) {
            return GetPaymentMethodSuccess.get((value as any));
          }
          return GetPaymentMethodFailed.get();
        }),
        catchError((error) => {
          GlobalLoadingSetup.getLoading().isHide();
          return of(GetPaymentMethodFailed.get(error));
        }),
      );
    }),
  );

  const getPaymentMethodSuccess$ = (action$: Observable<PlainAction>) =>
  action$.pipe(
    ofType(GetPaymentMethodSuccess.type),
    map((action: any) => {
      return store.dispatch(
        NavigationActions.navigate({
          routeName: 'Payment',
          params: { }
        }),
      );
    }),
  );


export const seatEpics = combineEpics(getPaymentMethod$, getPaymentMethodSuccess$);
