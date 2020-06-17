import AppWithNavigationState from 'navigators/AppNavigator';
import React from 'react';
import { StatusBar, StyleSheet, Text, View, BackHandler } from 'react-native';
import codePush from 'react-native-code-push';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/reduxs/store';
import { getCurrentRouteName } from 'utils/function';

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
      updateDialog: false,
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
            translate('common:exitApp'),
            [
              {
                text: translate('common:no'),
                onPress: () => console.info('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: translate('common:yes'),
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
      </View>
    );
  }
}

// const App = codePush(AppComponent);
const App = AppComponent
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});
