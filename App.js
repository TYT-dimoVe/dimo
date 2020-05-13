import LottieView from 'lottie-react-native';
import React from 'react';
import {SafeAreaView, StatusBar, Text, View, StyleSheet} from 'react-native';

export default class BasicExample extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        <View style={styles.body}>
          <LottieView
            source={require('./src/assets/bus.json')}
            autoPlay
            loop
            style={{width: '100%'}}
            resizeMode={'contain'}
          />
          <Text
            style={{
              fontSize: 40,
              letterSpacing: 4,
              fontFamily: 'BDPBIRGULA',
              color: '#FF7000',
            }}>
            dimo
          </Text>
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
    marginTop: -30,
  },
});
