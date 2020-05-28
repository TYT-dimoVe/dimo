import LottieView from 'lottie-react-native';
import React from 'react';
import {SafeAreaView, StatusBar, Text, View} from 'react-native';

export default class SplashScreen extends React.Component {
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
