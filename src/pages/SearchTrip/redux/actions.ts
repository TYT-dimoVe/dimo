import { defineAction } from 'redux-typed-actions';

export const GetFilter = defineAction<any>('GET_FILTER');
export const GetFilterSuccess = defineAction<any>('GET_FILTER_SUCCESS');
export const GetFilterFailed = defineAction<any>('GET_FILTER_FAILED');

export const GetSeat = defineAction<any>('GET_SEAT');
export const GetSeatSuccess = defineAction<any>('GET_SEAT_SUCCESS');
export const GetSeatFailed = defineAction<any>('GET_SEAT_FAILED');