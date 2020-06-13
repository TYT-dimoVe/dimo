import { Observable } from 'redux';
import { PlainAction } from 'redux-typed-actions';
import { ofType, combineEpics } from 'redux-observable';
import { TestRequest, TestFailed, TestSuccess } from 'screens/theme/redux/actions';
import { GlobalLoadingSetup, GlobalModalSetup } from 'components';
import { ResponseSuccess, ResponseFailed } from 'screens/theme/model';
import { exhaustMap, catchError, map } from 'rxjs/operators';
import { translate } from 'utils/language';
import { of } from 'rxjs';
import { StackActions, NavigationActions } from 'react-navigation';
import { store } from 'reduxs/store';
import { request } from 'utils/network/api';
import CODE from 'utils/network/code';

const TestRequestEpic$ = (action$: Observable<PlainAction>): Observable<PlainAction> =>
  action$.pipe(
    ofType(TestRequest.type),
    exhaustMap((action) => {
      GlobalLoadingSetup.getLoading().isVisible();
      return request<ResponseSuccess>({
        method: 'POST',
        url: '<>',
        param: action.payload,
        option: {
          format: 'json',
        },
      }).pipe(
        map((value) => {
          GlobalLoadingSetup.getLoading().isHide();
          if ((value as any).errorCode === CODE.SUCCESS) {
            GlobalModalSetup.getGlobalModalHolder().alertMessage(
              translate('response:notification'),
              translate('response:resSuccess'),
            );
            return TestSuccess.get(value as any);
          }

          if ((value as any).errorCode === CODE.FAILED) {
            GlobalModalSetup.getGlobalModalHolder().alertMessage(
              translate('response:notification'),
              `${translate('response:resFailed')} : ${value.errorDesc}`,
            );
            return TestFailed.get(value as any);
          }
        }),
        catchError((error: ResponseFailed) => {
          GlobalLoadingSetup.getLoading().isHide();
          return of(TestFailed.get(error));
        }),
      );
    }),
  );

const TestSuccess$ = (action$: Observable<PlainAction>) =>
  action$.pipe(
    ofType(TestSuccess.type),
    map((action) => {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Login' })],
      });

      return store.dispatch(resetAction);
    }),
  );

export const testEpics = combineEpics(TestRequestEpic$, TestSuccess$);
