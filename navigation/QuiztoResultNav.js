import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Quiz from '../screens/QuizScreen';
import Result from '../screens/ResultScreen';

function QuizNav(initialRouteName) {
const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRouteName}>
        <Stack.Screen name='Quiz' component={Quiz} />
        <Stack.Screen name='Result' component={Result} />
      </Stack.Navigator>
  );
}

QuizNav.defaultProps =  {
    initialRouteName: 'Result',
  }
  

export default QuizNav;