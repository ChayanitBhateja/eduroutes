import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createSwitchNavigator, createCompatNavigatorFactory } from "@react-navigation/compat";

import Signin from '../screens/Signin';
import Signup from '../screens/Signup';
import HomeScreenNavigator from './homeScreenNavigation';
import SplashScreen from '../screens/splashScreen';

function Navigator({ initialRouteName }) {
  const Switch = createSwitchNavigator({
    Splash: {
      screen: SplashScreen,
    },
    
    Signin: {
      screen:Signin,
    },
    
    Signup: {
      screen: Signup,
    },

    Home: {
      screen: HomeScreenNavigator
    },
  }, {
      initialRouteName: 'Splash',
      backBehavior:'none',
  });
  return (
    <NavigationContainer>
      <Switch />
    </NavigationContainer>
    
  );
}

export default Navigator;