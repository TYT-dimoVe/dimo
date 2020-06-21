import { seatsState } from 'pages/ChooseSeat/model';
import { PlainAction } from 'redux-typed-actions';
import { SaveCustomerInfo, SaveSeats, UpdateTranship, GetPaymentMethodSuccess } from './actions';

const initialState: seatsState = {
  round: 1,
  tranship1: '',
  tranship2: '',
  seatRound1: [],
  seatRound2: [],
  customerInfo: [],
  paymentMethod: []
};

export function seatsReducer(state: seatsState = initialState, action: PlainAction) {
  switch (action.type) {
    case SaveSeats.type:
      return {
        ...state,
        round: action.payload.round,
        seatRound1: action.payload.seatRound1 || state.seatRound1,
        seatRound2:  action.payload.seatRound2 || state.seatRound1,
      }
    case UpdateTranship.type:
      return {
        ...state,
        tranship1: action.payload.tranship1 || state.tranship1,
        tranship2:  action.payload.tranship2 || state.tranship2,
      }
    case SaveCustomerInfo.type:
      return {
        ...state,
        customerInfo: action.payload,
      }
    case GetPaymentMethodSuccess.type:
      return {
        ...state,
        paymentMethod: action.payload.result
      }
    default:
      return state;
  }
}
