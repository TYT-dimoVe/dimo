import { PlainAction } from 'redux-typed-actions';
import { homeState } from 'pages/Home/model';
import { GetCitiesSuccess, SearchTripsSuccess, SaveRoundTrip } from 'pages/Home/redux/actions';

const initialState: homeState = {
  cities: [],
  searchData: [],
  total: 0,
  date: '',
  page: 1,
  isRoundTrip:  false,
  pickUpCode: '',
  dropDownCode: '',
  roundTripDate: '',
  pickUpCity: '',
  dropDownCity: ''
};

export function homeReducer(state: homeState = initialState, action: PlainAction) {
  switch (action.type) {
    case GetCitiesSuccess.type:
      return { 
        ...state,
        cities: action.payload
       };
    case SearchTripsSuccess.type:
      return {
        ...state,
        searchData: action.payload.data,
        total: action.payload.totalItems,
        date: action.payload.date,
      }
    case SaveRoundTrip.type:
      return {
        ...state,
        isRoundTrip: action.payload.isRoundTrip,
        pickUpCode: action.payload.roundTripPickUp,
        dropDownCode: action.payload.roundTripDropDown,
        roundTripDate: action.payload.roundTripDate,
        pickUpCity: action.payload.pickUpCity,
        dropDownCity: action.payload.dropDownCity
      }
    default:
      return state;
  }
}
