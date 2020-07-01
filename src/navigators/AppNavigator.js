import { createReduxContainer } from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';
import AppRouteConfigs from './AppRouteConfig';

const App = createReduxContainer(AppRouteConfigs);

const mapStateToProps = (state) => ({
  state: state.nav,
});

const AppWithNavigationState = connect(mapStateToProps)(App);

export default AppWithNavigationState;
