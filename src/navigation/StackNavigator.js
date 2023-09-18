import React from 'react';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import DashboardScreen from '../screens/DashboardScreen';
import {createStackNavigator} from '@react-navigation/stack';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import EmailVerificationScreen from '../screens/EmailVerificationScreen';
const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
      <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
      <Stack.Screen name="EmailVerificationScreen" component={EmailVerificationScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
