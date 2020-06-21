import React from 'react';
import {View, Text} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import SplashScreen from 'pages/Splash';
import HomeScreen from 'pages/Home';
import SearchTripScreen from 'pages/SearchTrip';
import SearchOrderScreen from 'pages/SearchOrder';
import DetailOrderScreen from 'pages/DetailTicket';
import ChooseSeatScreen from 'pages/ChooseSeat';
import FilterScreen from 'pages/SearchTrip/components/filterScreen';
import TranshipmentScreen from 'pages/ChooseSeat/components/transhipmentScreen';
import InfomationScreen from 'pages/ChooseSeat/components/infomationScreen';
import ConfirmScreen from 'pages/ChooseSeat/components/confirmScreen';
import PaymentScreen from 'pages/ChooseSeat/components/paymentScreen';

const MainStack = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    SearchTrip: { screen: SearchTripScreen},
    Filter: { screen: FilterScreen},
    SearchOrder: { screen: SearchOrderScreen},
    DetailTicket: { screen: DetailOrderScreen },
    ChooseSeat : { screen: ChooseSeatScreen },
    Transhipment: { screen: TranshipmentScreen},
    Infomation: { screen: InfomationScreen},
    Confirm: { screen: ConfirmScreen },
    Payment: { screen: PaymentScreen }
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
