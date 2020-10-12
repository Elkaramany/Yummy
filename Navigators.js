import {createBottomTabNavigator} from 'react-navigation-tabs';
import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

import SignUp from './Components/SignUp';
import SignUpFinal from './Components/SignUpFinal';
import Menu from './Components/Menu';
import AdminSignUp from './Components/AdminSignUp';
import AdminMenu from './Components/AdminMenu';
import Settings from './Components/Settings';
import AdminSettings from './Components/AdminSettings';
import Cart from './Components/Cart';
import FoodSpecific from './Components/FoodSpecific';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from './Components/Home';
import Checkout from './Components/Checkout';
import MainMenu from './Components/MainMenu';
import MapLocations from './Components/MapLocations';
import Transactions from './Components/Transactions';

const ICON_SIZE = 28;
const ACTIVE_TINT_COLOR = '#338329';

//The customer account navigator

const RootTab = createBottomTabNavigator({
  Menu: {screen: Menu,
    navigationOptions:{
    tabBarIcon:({tintColor}) =>{
        return <Icon2 name={'food'} size={ICON_SIZE} color={tintColor} />
    },
  }
  },
  Cart: {screen: Cart,navigationOptions:{
    tabBarIcon:({tintColor}) =>{
      return <Icon name={'shopping-cart'} size={ICON_SIZE} color={tintColor} />
  },
  }},
  Settings: {screen: Settings,
    navigationOptions:{
    tabBarIcon:({tintColor}) =>{
        return <Icon2 name={'account'} size={ICON_SIZE} color={tintColor} />
    },
  }},
},
{
tabBarOptions: {
  labelStyle: { fontSize: 18, marginTop: 5},
  tabStyle: {marginTop: 10},
  activeTintColor: ACTIVE_TINT_COLOR,
},
defaultNavigationOptions:{
  header: null,
}
});

//The Admin account navigator

const AdminRootTab = createBottomTabNavigator({
    AdminMenu: {screen: AdminMenu,
      navigationOptions:{
        tabBarIcon:({tintColor}) =>{
            return <Icon name={'reorder'} size={ICON_SIZE} color={tintColor} />
        },
    }
    },
    History: {screen: Transactions,
    navigationOptions:{
    tabBarIcon:({tintColor}) =>{
        return <Icon2 name={'history'} size={ICON_SIZE} color={tintColor} />
    },
}},Settings: {screen: AdminSettings,
  navigationOptions:{
  tabBarIcon:({tintColor}) =>{
      return <Icon2 name={'account-box-multiple'} size={ICON_SIZE} color={tintColor} />
  },
}},
  },
  {
  tabBarOptions: {
    labelStyle: { fontSize: 18, marginTop: 5},
    tabStyle: {marginTop: 10},
    activeTintColor: ACTIVE_TINT_COLOR,
  },
  defaultNavigationOptions:{
    header: null,
  }
  });
  
  //Default navigator
  
const RootStack = createStackNavigator({
    MainMenu:{screen: MainMenu},
    Home: {screen: Home},
    SignUp: {screen: SignUp},
    SignUpFinal: {screen: SignUpFinal},
    AdminSignUp: {screen: AdminSignUp},
    FoodSpecific: {screen: FoodSpecific},
    Checkout:{screen: Checkout},
    MapLocations: {screen: MapLocations},
    RootTab: {screen: RootTab},
    AdminRootTab: {screen: AdminRootTab},
    },
    {
    defaultNavigationOptions:{
        headerShown: false
    },
    });

export default RootStack;