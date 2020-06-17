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
  roundTripPickUp: '',
  roundTripDropDown: '',
  roundTripDate: '',
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
        roundTripPickUp: action.payload.roundTripPickUp,
        roundTripDropDown: action.payload.roundTripDropDown,
        roundTripDate: action.payload.roundTripDate,
      }
    default:
      return state;
  }
}
