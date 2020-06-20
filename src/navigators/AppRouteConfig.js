import React from 'react';
import {View, Text} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import SplashScreen from 'pages/Splash';
import HomeScreen from 'pages/Home';
import SearchTripScreen from 'pages/SearchTrip';
import FilterScreen from 'pages/Filter';
import SearchOrderScreen from 'pages/SearchOrder';
import DetailOrderScreen from 'pages/DetailTicket';
import ChooseSeatScreen from 'pages/ChooseSeat';
import TranshipmentScreen from 'pages/Transhipment';

const MainStack = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    SearchTrip: { screen: SearchTripScreen},
    Filter: { screen: FilterScreen},
    SearchOrder: { screen: SearchOrderScreen},
    DetailTicket: { screen: DetailOrderScreen },
    ChooseSeat : { screen: ChooseSeatScreen },
    Transhipment: { screen: TranshipmentScreen}
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
    initialRouteName: 'Main',
    headerMode: 'none',
  },
);

export default createAppContainer(AppRouteConfigs);
