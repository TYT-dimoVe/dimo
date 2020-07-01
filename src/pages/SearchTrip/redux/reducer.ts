import { FilterTripsSuccess } from 'pages/Home/redux/actions';
import { searchState } from 'pages/SearchTrip/model';
import { PlainAction } from 'redux-typed-actions';
import { GetFilterSuccess, GetSeatSuccess, SubmitPromoteCodeSuccess } from './actions';

const initialState: searchState = {
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
  round1: [],
  round2: [],
  round: 1,
  promotePercent: 0,
  isDisableBtn: false,
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
          round1: action.payload.round1 || state.round1,
          round2: action.payload.round2 || state.round2,
          round: action.payload.round,
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
        case SubmitPromoteCodeSuccess.type:
          return {
            ...state,
            promotePercent: action.payload,
            isDisableBtn:true,
          }
    default:
      return state;
  }
}
