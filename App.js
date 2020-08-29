import React, {Component} from 'react';
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
import firebase from 'firebase';
import RootStack from './Navigators';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 380});


//All the React navigators in the Navigators.js file in the same folder
const AppContainer = createAppContainer(RootStack);

//Redux setup
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['SignInReducer']
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer, {},
  compose(
      applyMiddleware(ReduxThunk)) 
  );

export default class App extends Component{
  constructor(props){
    super(props);
  }

  //firebase
  UNSAFE_componentWillMount(){
    if(!firebase.apps.length){
      var firebaseConfig = {
        apiKey: "AIzaSyCLr6CGAU-T5y9g4NmaGxrVfHpxsYEHC4s",
        authDomain: "yummy-7016c.firebaseapp.com",
        databaseURL: "https://yummy-7016c.firebaseio.com",
        projectId: "yummy-7016c",
        storageBucket: "yummy-7016c.appspot.com",
        messagingSenderId: "747840545905",
        appId: "1:747840545905:web:02f5e7dbc35f68064fe7d0",
        measurementId: "G-4R4626T1YX"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      //firebase.analytics();
  }
}

  render(){
  const persistor = persistStore(store);
  persistor.purge();
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
    backgroundColor: '#fff',
  },
});