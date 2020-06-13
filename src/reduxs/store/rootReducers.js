import AppRouteConfigs from 'navigators/AppRouteConfig';
import { createNavigationReducer } from 'react-navigation-redux-helpers';
import { combineReducers } from 'redux';
const navReducer = createNavigationReducer(AppRouteConfigs);

export const rootReducer = combineReducers({
    nav: navReducer
});