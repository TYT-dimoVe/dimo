import AppRouteConfigs from 'navigators/AppRouteConfig';
import { createNavigationReducer } from 'react-navigation-redux-helpers';
import { combineReducers } from 'redux';
import { homeReducer } from 'pages/Home/redux/reducer';
import { searchReducer } from 'pages/SearchTrip/redux/reducer';
import { orderReducer } from 'pages/SearchOrder/redux/reducer';
import { seatsReducer } from 'pages/ChooseSeat/redux/reducer';
const navReducer = createNavigationReducer(AppRouteConfigs);

export const rootReducer = combineReducers({
    nav: navReducer,
    HomeStore: homeReducer,
    SearchStore: searchReducer,
    OrderStore: orderReducer,
    SeatStore: seatsReducer,
});