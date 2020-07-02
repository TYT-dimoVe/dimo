import AppWithNavigationState from 'navigators/AppNavigator';
import React from 'react';
import { StatusBar, StyleSheet, Text, View, BackHandler, Alert } from 'react-native';
import codePush from 'react-native-code-push';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/reduxs/store';
import { getCurrentRouteName } from 'utils/function';
import {  GlobalLoading, GlobalLoadingSetup, GlobalModal, GlobalModalSetup } from 'components';

console.disableYellowBox = true;
StatusBar.setTranslucent(true);
StatusBar.setBarStyle('dark-content');
StatusBar.setBackgroundColor('transparent');

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    if (Text.defaultProps == null) {
      Text.defaultProps = {};
    }
    Text.defaultProps.allowFontScaling = false;
  }

  componentWillMount() {
    this.backHandler();
    codePush.sync({
      updateDialog: true,
      installMode: codePush.InstallMode.IMMEDIATE,
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () => {});
  }

  backHandler = () => {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', () => {
        if (getCurrentRouteName(store.getState().nav) === 'Home') {
          Alert.alert(
            '',
            'Thoát ứng dụng?',
            [
              {
                text: 'Từ chối',
                onPress: () => console.info('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'Đồng ý',
                onPress: () => BackHandler.exitApp(),
              },
            ],
            { cancelable: true },
          );
          return true;
        }
        store.dispatch({ type: 'Navigation/BACK' });
        return true;
      });
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
          <Provider store={store}>
            <PersistGate persistor={persistor}>
              <AppWithNavigationState />
            </PersistGate>
          </Provider>
          <GlobalLoading ref={(ref) => GlobalLoadingSetup.setLoading(ref)} />
          <GlobalModal ref={(ref) => GlobalModalSetup.setGlobalModalHolder(ref)} />
      </View>
    );
  }
}

const App = codePush(AppComponent);
// const App = AppComponent;
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});
