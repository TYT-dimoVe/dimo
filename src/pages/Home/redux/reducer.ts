import { PlainAction } from 'redux-typed-actions';
import { homeState } from 'pages/Home/model';
import { GetCitiesSuccess, SearchTripsSuccess, SaveRoundTrip, LoadMoreTripsSuccess, FilterTripsSuccess } from 'pages/Home/redux/actions';

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
  dropDownCity: '',
  isFilter: false,
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
        pickUpCode: action.payload.pickUpCode,
        dropDownCode: action.payload.dropDownCode,
        roundTripDate: action.payload.roundTripDate,
        pickUpCity: action.payload.pickUpCity,
        dropDownCity: action.payload.dropDownCity
      }
    case LoadMoreTripsSuccess.type:
      return {
        ...state,
        searchData: state.searchData.concat(action.payload.data),
        total: action.payload.totalItems,
        date: action.payload.date,
        page: state.page + 1,
      }
      case FilterTripsSuccess.type:
        return {
          ...state,
          searchData: action.payload.result.data,
          total: action.payload.result.totalItems,
          isFilter: action.payload.isFilter,
        }
    default:
      return state;
  }
}
