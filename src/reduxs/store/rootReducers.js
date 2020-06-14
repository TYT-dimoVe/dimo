import AppRouteConfigs from 'navigators/AppRouteConfig';
import { createNavigationReducer } from 'react-navigation-redux-helpers';
import { combineReducers } from 'redux';
import { homeReducer } from 'pages/Home/redux/reducer'
const navReducer = createNavigationReducer(AppRouteConfigs);

export const rootReducer = combineReducers({
    nav: navReducer,
    HomeStore: homeReducer,
});