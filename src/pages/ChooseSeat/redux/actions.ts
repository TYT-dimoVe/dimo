import { defineAction } from 'redux-typed-actions';

export const SaveSeats = defineAction<any>('SAVE_SEATS');
export const UpdateTranship = defineAction<any>('UPDATE_TRANSHIP');
export const SaveCustomerInfo = defineAction<any>('SAVE_CUSTOMER_INFO')

export const GetPaymentMethod = defineAction<any>('GET_PAYMENT_METHOD');
export const GetPaymentMethodSuccess = defineAction<any>('GET_PAYMENT_METHOD_SUCCESS');
export const GetPaymentMethodFailed = defineAction<any>('GET_PAYMENT_METHOD_FAILED');
