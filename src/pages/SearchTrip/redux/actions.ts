import { defineAction } from 'redux-typed-actions';

export const GetFilter = defineAction<any>('GET_FILTER');
export const GetFilterSuccess = defineAction<any>('GET_FILTER_SUCCESS');
export const GetFilterFailed = defineAction<any>('GET_FILTER_FAILED');

export const GetSeat = defineAction<any>('GET_SEAT');
export const GetSeatSuccess = defineAction<any>('GET_SEAT_SUCCESS');
export const GetSeatFailed = defineAction<any>('GET_SEAT_FAILED');

export const SubmitTicket = defineAction<any>('SUBMIT_TICKET');
export const SubmitTicketSuccess = defineAction<any>('SUBMIT_TICKET_SUCCESS');
export const SubmitTicketFailed = defineAction<any>('SUBMIT_TICKET_FAILED');
export const SubmitTicketSuccessNotBack = defineAction<any>('SUBMIT_TICKET_SUCCESS_NOT_BACK');

export const Submit2Ticket = defineAction<any>('SUBMIT_2TICKET');
export const Submit2TicketSuccess = defineAction<any>('SUBMIT_2TICKET_SUCCESS');
export const Submit2TicketFailed = defineAction<any>('SUBMIT_2TICKET_FAILED');

export const SubmitPromoteCode = defineAction<any>('SUBMIT_PROMOTE_CODE');
export const SubmitPromoteCodeSuccess = defineAction<any>('SUBMIT_PROMOTE_CODE_SUCCESS');
export const SubmitPromoteCodeFailed = defineAction<any>('SUBMIT_PROMOTE_CODE_FAILED');

export const ClearPromotion = defineAction<any>('CLEAR_PROMOTION');
