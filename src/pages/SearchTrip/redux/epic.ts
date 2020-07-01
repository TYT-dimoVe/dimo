import { GlobalLoadingSetup, GlobalModalSetup } from 'components';
import { GetFilter, GetFilterFailed, GetFilterSuccess, GetSeat, GetSeatFailed, GetSeatSuccess, Submit2Ticket, Submit2TicketFailed, Submit2TicketSuccess, SubmitPromoteCode, SubmitPromoteCodeFailed, SubmitPromoteCodeSuccess, SubmitTicket, SubmitTicketFailed, SubmitTicketSuccess } from 'pages/SearchTrip/redux/actions';
import { NavigationActions, StackActions } from 'react-navigation';
import { Observable } from 'redux';
import { combineEpics, ofType } from 'redux-observable';
import { PlainAction } from 'redux-typed-actions';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { request } from 'utils/network/api';
import { store } from '../../../reduxs/store';

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
      url: 'submitTickets',
      param: action.payload,
      option: {
        format: 'json',
      },
    }).pipe(
      map((value) => {
        if ((value as any).result) {
          if (action.payload.paymentCode === 'DIRECT' || action.payload.paymentCode === 'BANK_TRANSFER') {
            GlobalModalSetup.getGlobalModalHolder().submitSuccessMessage(
              'success',
              'Đặt vé thành công! Vui lòng thanh toán trong vòng 24h kể từ ngày đặt.',
              `Mã vé chiều đi: ${(value as any).result.ticket1.ticketId} \n Mã vé chiều về: ${(value as any).result.ticket2.ticketId}`
            );
          } else {
            GlobalModalSetup.getGlobalModalHolder().submitSuccessMessage(
              'success',
              'Thanh toán đơn hàng thành công! Vui lòng kiểm tra email và tin nhắn để xem thông tin vé.',
              `Mã vé chiều đi: ${(value as any).result.ticket1.ticketId} \n Mã vé chiều về: ${(value as any).result.ticket2.ticketId}`
            );
          }
          return Submit2TicketSuccess.get((value as any).result);
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

const submitTicket$ = (action$: Observable<PlainAction>) =>
action$.pipe( 
  ofType(SubmitTicket.type),
  exhaustMap((action: any) => {
    GlobalLoadingSetup.getLoading().isVisible();
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
              GlobalModalSetup.getGlobalModalHolder().submitSuccessMessage(
                'success',
                'Đặt vé thành công! Vui lòng thanh toán trong vòng 24h kể từ ngày đặt.',
                `Mã vé: ${(value as any).result.ticketId}`
              );
            } else {
              GlobalModalSetup.getGlobalModalHolder().submitSuccessMessage(
                'success',
                'Thanh toán đơn hàng thành công! Vui lòng kiểm tra email và tin nhắn để xem thông tin vé.',
                `Mã vé: ${(value as any).result.ticketId}`
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
  ofType(SubmitTicketSuccess.type, Submit2TicketSuccess.type),
  map((action: any) => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Main' })],
    });
    return store.dispatch(resetAction);
  }),
);

const submitPromoteCode$ = (action$: Observable<PlainAction>) =>
action$.pipe(
  ofType(SubmitPromoteCode.type),
  exhaustMap((action: any) => {
    console.info('mmmmmm', action.payload)
    return request<any>({
      method: 'POST',
      url: 'promotionDiscount',
      param: action.payload,
      option: {
        format: 'json',
      },
    }).pipe(
      map((value) => {
        if ((value as any).result) {
          return SubmitPromoteCodeSuccess.get((value as any).result);
        }
        return SubmitPromoteCodeFailed.get();
      }),
      catchError((error) => {
        return of(SubmitPromoteCodeFailed.get(error));
      }),
    );
  }),
);

export const searchEpics = combineEpics(getFilter$, getFilterSuccess$, getSeats$ , getSeatsSuccess$, submitTicket$, finishSubmit$, submit2Ticket$, submitPromoteCode$);
