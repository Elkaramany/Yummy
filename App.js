import React, {PureComponent} from 'react';
import { createAppContainer} from 'react-navigation';
import { StyleSheet, View, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Provider} from 'react-redux';
import {createStore, compose, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import reducers from './reducers';
import {PersistGate} from 'redux-persist/lib/integration/react';
import RootStack from './Navigators';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 380});

//All the React navigators in the Navigators.js file
const AppContainer = createAppContainer(RootStack);

//Redux setup
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['SignInReducer', 'FetchedDatabase']
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer, {},
  compose(
      applyMiddleware(ReduxThunk)) 
  );

export default class App extends PureComponent{

  render(){
  const persistor = persistStore(store);
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <PersistGate persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </View>
    </Provider>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});