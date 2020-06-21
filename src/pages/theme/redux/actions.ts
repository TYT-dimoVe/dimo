import { defineAction } from 'redux-typed-actions';
import { Response, ResponseFailed, ResponseSuccess } from 'screens/theme/model';

export const TestRequest = defineAction<Response>('TEST_REQUEST');
export const TestSuccess = defineAction<ResponseSuccess>('TEST_SUCCESS');
export const TestFailed = defineAction<ResponseFailed>('TEST_FAILED');
