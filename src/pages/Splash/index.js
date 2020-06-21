import LottieView from 'lottie-react-native';
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  NavigationInjectedProps,
  StackActions,
  NavigationActions,
} from 'react-navigation';

export default class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    setTimeout(() => {
      return this._navigateReset('Main');
    }, 5000);
  }

  _navigateReset = (routeName) => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName})],
    });
    this.props.navigation.dispatch(resetAction);
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <View style={styles.body}>
          <LottieView
            source={require('../../assets/bus.json')}
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
