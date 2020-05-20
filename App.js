import LottieView from 'lottie-react-native';
import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import codePush from 'react-native-code-push';

class AppComponent extends React.Component {
  componentWillMount() {
    codePush.sync({
      updateDialog: true,
      installMode: codePush.InstallMode.IMMEDIATE,
    });
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <View style={styles.body}>
          <LottieView
            source={require('./src/assets/bus.json')}
            autoPlay
            loop
            style={{width: '100%'}}
            resizeMode={'contain'}
          />
          <Text style={styles.title}>dimo</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const App = codePush(AppComponent);
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: -60,
  },
  title: {
    fontSize: 40,
    letterSpacing: 4,
    fontFamily: 'BDPBIRGULA',
    color: '#FF7000',
  },
});
