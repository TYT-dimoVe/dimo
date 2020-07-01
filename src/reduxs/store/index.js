import AsyncStorage from '@react-native-community/async-storage';
import {createStore, applyMiddleware} from 'redux';
import {createReactNavigationReduxMiddleware} from 'react-navigation-redux-helpers';
import {persistReducer, persistStore} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import {createEpicMiddleware} from 'redux-observable';
import logger from 'redux-logger';
import {rootEpic} from '../../reduxs/store/rootEpics';
import {rootReducer} from '../../reduxs/store/rootReducers';

const persistConfig = {
  key: 'root',
  version: 0,
  storage: AsyncStorage,
  blacklist: [],
  whitelist: ['Root'],
  stateReconciler: autoMergeLevel2,
};

const finalReducer = persistReducer(persistConfig, rootReducer);

const middleware = createReactNavigationReduxMiddleware((state) => state.nav);

const epicMiddleware = createEpicMiddleware();

const applyMiddlewarePro = applyMiddleware(middleware, epicMiddleware);
const applyMiddlewareDev = applyMiddleware(logger, middleware, epicMiddleware);

export const store = createStore(
  finalReducer,
  __DEV__ ? applyMiddlewareDev : applyMiddlewarePro,
);

epicMiddleware.run(rootEpic);

export const persistor = persistStore(store);
