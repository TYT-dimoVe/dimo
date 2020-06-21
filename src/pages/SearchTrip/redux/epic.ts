import { Observable } from 'redux';
import { PlainAction } from 'redux-typed-actions';
import { ofType, combineEpics } from 'redux-observable';
import { GetFilter, GetFilterFailed, GetFilterSuccess, GetSeatSuccess, GetSeatFailed, GetSeat, SubmitTicket, SubmitTicketSuccess, SubmitTicketFailed, SubmitTicketSuccessNotBack, Submit2Ticket, Submit2TicketFailed} from 'pages/SearchTrip/redux/actions';
import { GlobalLoadingSetup, GlobalModalSetup } from 'components';
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
    GlobalLoadingSetup.getLoading().isVisible();
    return request<any>({
      method: 'POST',
      url: 'getSeat',
      param: action.payload.round === 1 ? action.payload.round1 : action.payload.round2,
      option: {
        format: 'json',
      },
    }).pipe(
      map((value) => {
        GlobalLoadingSetup.getLoading().isHide();
        if ((value as any).result) {
          const data = {
            round: action.payload.round,
            round1: action.payload.round1 && action.payload.round1,
            round2: action.payload.round2 && action.payload.round2,
            result: (value as any).result,
          }
          return GetSeatSuccess.get(data);
        }
        return GetSeatFailed.get();
      }),
      catchError((error) => {
        GlobalLoadingSetup.getLoading().isHide();
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

const submit2Ticket$ = (action$: Observable<PlainAction>) =>
action$.pipe( 
  ofType(Submit2Ticket.type),
  exhaustMap((action: any) => {
    return request<any>({
      method: 'POST',
      url: 'submitTicket',
      param: action.payload.pay1,
      option: {
        format: 'json',
      },
    }).pipe(
      map((value) => {
        if ((value as any).result) {
          const val = {
            pay: action.payload.pay2
          }
          return SubmitTicketSuccessNotBack.get(val);
        }
        GlobalModalSetup.getGlobalModalHolder().alertMessage(
          'error',
          'Thanh toán đơn hàng thất bại. Vui lòng thử lại sau.',
        );
        return Submit2TicketFailed.get();
      }),
      catchError((error) => {
        GlobalModalSetup.getGlobalModalHolder().alertMessage(
          'error',
          'Thanh toán đơn hàng thất bại. Vui lòng thử lại sau.',
        );
        return of(Submit2TicketFailed.get(error));
      }),
    );
  }),
);

const submitNotBackSuccess$ = (action$: Observable<PlainAction>) =>
action$.pipe(
  ofType(SubmitTicketSuccessNotBack.type),
  map((action: any) => {
    return SubmitTicket.get(action.payload)
  }),
);

const submitTicket$ = (action$: Observable<PlainAction>) =>
action$.pipe( 
  ofType(SubmitTicket.type),
  exhaustMap((action: any) => {
    GlobalLoadingSetup.getLoading().isVisible();
    console.info(action.payload.pay)
    return request<any>({
      method: 'POST',
      url: 'submitTicket',
      param: action.payload.pay,
      option: {
        format: 'json',
      },
    }).pipe(
      map((value) => {
        GlobalLoadingSetup.getLoading().isHide();
        if ((value as any).result) {
            if (action.payload.paymentCode === 'DIRECT' || action.payload.paymentCode === 'BANK_TRANSFER') {
              GlobalModalSetup.getGlobalModalHolder().alertMessage(
                'success',
                'Đặt vé thành công! Vui lòng thanh toán trong vòng 24h kể từ ngày đặt.',
              );
            } else {
              GlobalModalSetup.getGlobalModalHolder().alertMessage(
                'success',
                'Thanh toán đơn hàng thành công! Vui lòng kiểm tra email và tin nhắn để xem thông tin vé.',
              );
            }
            return SubmitTicketSuccess.get((value as any).result);
        }
        GlobalModalSetup.getGlobalModalHolder().alertMessage(
          'error',
          'Thanh toán đơn hàng thất bại. Vui lòng thử lại sau.',
        );
        return SubmitTicketFailed.get();
      }),
      catchError((error) => {
        GlobalLoadingSetup.getLoading().isHide();
        GlobalModalSetup.getGlobalModalHolder().alertMessage(
          'error',
          'Thanh toán đơn hàng thất bại. Vui lòng thử lại sau.',
        );
        return of(SubmitTicketFailed.get(error));
      }),
    );
  }),
);



const finishSubmit$ = (action$: Observable<PlainAction>) =>
action$.pipe(
  ofType(SubmitTicketSuccess.type, SubmitTicketFailed.type, Submit2TicketFailed.type),
  map((action: any) => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Main' })],
    });
    return store.dispatch(resetAction);
  }),
);

export const searchEpics = combineEpics(getFilter$, getFilterSuccess$, getSeats$ , getSeatsSuccess$, submitTicket$, finishSubmit$, submit2Ticket$, submitNotBackSuccess$);
