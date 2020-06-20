import { PlainAction } from 'redux-typed-actions';
import { searchState } from 'pages/SearchTrip/model';
import { GetFilterSuccess, GetSeatSuccess } from './actions';
import { FilterTripsSuccess } from 'pages/Home/redux/actions';

const initialState: searchState = {
  timeStart: '',
  pickUp: '',
  timeVal: '',
  busOperatorVal: '',
  busTypeVal: '',
  floor1: [],
  floor2: [],
  column: 0,
  row: 0,
  listTimeStart: [],
  listBusOperatorId: [],
  listBusType: [],
  priceFrom: 0,
  priceTo: 0,
  price: 0,
};

export function searchReducer(state: searchState = initialState, action: PlainAction) {
  switch (action.type) {
    case GetFilterSuccess.type:
      return { 
        ...state,
        listTimeStart: action.payload.timeStart,
        listBusOperatorId: action.payload.busOperatorId,
        listBusType: action.payload.busType,
       };
       case GetSeatSuccess.type:
        return {
          ...state,
          floor1: action.payload.result.floor1,
          floor2: action.payload.result.floor2,
          column: action.payload.result.column,
          row: action.payload.result.row,
          timeStart: action.payload.timeStart,
          pickUp: action.payload.pickUp,
          price: action.payload.price,
        }
        case FilterTripsSuccess.type:
          return {
            ...state,
            timeVal: action.payload.timeVal,
            busOperatorVal: action.payload.busOperatorVal,
            busTypeVal: action.payload.busTypeVal,
            priceFrom: action.payload.priceFrom,
            priceTo: action.payload.priceTo,
          }
    default:
      return state;
  }
}
