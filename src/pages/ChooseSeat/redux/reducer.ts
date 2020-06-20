import { PlainAction } from 'redux-typed-actions';
import { seatsState } from 'pages/ChooseSeat/model';
import { SearchOrderSuccess} from 'pages/SearchOrder/redux/actions';
import { SaveSeats } from './actions';

const initialState: seatsState = {
  seats: [],
  totalPrice: 0,
};

export function seatsReducer(state: seatsState = initialState, action: PlainAction) {
  switch (action.type) {
    case SaveSeats.type:
      return {
        ...state,
        seats:action.payload.seats,
        totalPrice: action.payload.totalPrice,
      }
    default:
      return state;
  }
}
