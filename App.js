import React from 'react';
import { createAppContainer} from 'react-navigation';
import {createBottomTabNavigator, BottomTabBar} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import { StyleSheet, View, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Provider} from 'react-redux';
import Home from './Components/Home';
import {createStore, compose, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import reducers from './reducers';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {PersistGate} from 'redux-persist/lib/integration/react';
import firebase from 'firebase';

import SignUp from './Components/SignUp';
import SignUpFinal from './Components/SignUpFinal';
import Menu from './Components/Menu';
import AdminSignUp from './Components/AdminSignUp';
import AdminMenu from './Components/AdminMenu';
import Settings from './Components/Settings';
import AdminSettings from './Components/AdminSettings';
import Cart from './Components/Cart';
import FoodSpecific from './Components/FoodSpecific';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 380});

const RootTab = createBottomTabNavigator({
  Menu: {screen: Menu},
  Cart: {screen: Cart},
  Settings: {screen: Settings},
},
{
tabBarOptions: {
  labelStyle: { fontSize: 18, marginTop: 5},
  tabStyle: {marginTop: 10}
},
});

const RootTab2 = createBottomTabNavigator({
  AdminMenu: {screen: AdminMenu,
    navigationOptions:{
      header: null,
      tabBarIcon:({tintColor}) =>{
          return <Icon name={'reorder'} size={28} color={tintColor} />
      },
  }
  },
  AdminSettings: {screen: AdminSettings,
    navigationOptions:{
    header: null,
    tabBarIcon:({tintColor}) =>{
        return <Icon2 name={'account-box-multiple'} size={28} color={tintColor} />
    },
}}
},
{
tabBarOptions: {
  labelStyle: { fontSize: 18, marginTop: 5},
  tabStyle: {marginTop: 10}
},
});

const RootStack = createStackNavigator({
  Home: {screen: Home},
  SignUp: {screen: SignUp},
  SignUpFinal: {screen: SignUpFinal},
  AdminSignUp: {screen: AdminSignUp},
  FoodSpecific: {screen: FoodSpecific},
  RootTab: {screen: RootTab},
  RootTab2: {screen: RootTab2},
},
{
defaultNavigationOptions:{
  headerShown: false
},
},
{ 
  initialRouteName: 'Home',
});

const AppContainer = createAppContainer(RootStack);

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

export default class App extends React.Component{
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
  );}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});