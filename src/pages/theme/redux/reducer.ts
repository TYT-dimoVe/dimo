import { PlainAction } from 'redux-typed-actions';
import { TestState } from 'screens/theme/model';
import { TestRequest, TestSuccess, TestFailed } from 'screens/theme/redux/actions';

const initialState: TestState = {
  test: false,
};

export function loginReducer(state: TestState = initialState, action: PlainAction) {
  switch (action.type) {
    case TestRequest.type:
      return { ...state };
    case TestSuccess.type:
      return { ...state };
    case TestFailed.type:
      return { ...state };
    default:
      return state;
  }
}
