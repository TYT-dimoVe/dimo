import { defineAction } from 'redux-typed-actions';

export const SearchOrder = defineAction<any>('SEARCH_ORDER');
export const SearchOrderSuccess = defineAction<any>('SEARCH_ORDER_SUCCESS');
export const SearchOrderFailed = defineAction<any>('SEARCH_ORDER_FAILED');
