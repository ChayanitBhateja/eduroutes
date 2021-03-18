import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

import Home from '../screens/homeScreen';
import QuizNav from './QuiztoResultNav';

export default function HomeScreenNavigator() {
    const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          if (route.name == 'Home') {
            if (focused) {
              return <Entypo name="home" color={color} size={size} />;
            } else {
              return <AntDesign name="home" color={color} size={size} />;
            }
          } else if (route.name == 'Quiz') {
            if (focused) {
              return <Entypo name="code" color={color} size={size} />;
            } else {
              return <Feather name="code" color={color} size={size} />;
            }
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'grey',
      }}>
      <Tab.Screen name="Home" component={Home}   />
      <Tab.Screen name="Quiz" component={QuizNav} />
    </Tab.Navigator>
  );
}