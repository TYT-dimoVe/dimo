import React from 'react';
import {View, Text} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import SplashScreen from 'pages/Splash';
import HomeScreen from 'pages/Home';

const MainStack = createStackNavigator(
  {
    Home: { screen: HomeScreen },
  },
  {
    headerMode: 'null',
    initialRouteName: 'Home',
  },
);

const AppRouteConfigs = createStackNavigator(
  {
    Splash: {
      screen: SplashScreen,
    },
    Main: MainStack,
    
  },
  {
    initialRouteName: 'Splash',
    headerMode: 'none',
  },
);

export default createAppContainer(AppRouteConfigs);
