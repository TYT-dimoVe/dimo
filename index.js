import * as firebase from 'firebase';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { firebaseConfig } from './firebase.config';

console.disableYellowBox = true;

firebase.initializeApp(firebaseConfig);
// const analytics = firebase.analytics();

AppRegistry.registerComponent(appName, () => App);
