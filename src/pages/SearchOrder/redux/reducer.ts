import { orderState } from 'pages/SearchOrder/model';
import { SearchOrderSuccess } from 'pages/SearchOrder/redux/actions';
import { PlainAction } from 'redux-typed-actions';

const initialState: orderState = {
  order: [],
};

export function orderReducer(state: orderState = initialState, action: PlainAction) {
  switch (action.type) {
    case SearchOrderSuccess.type:
      return {
        ...state,
        order:action.payload,
      }
    default:
      return state;
  }
}
