import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import ForgetPasswordScreen from '../screens/Auth/ForgetPasswordScreen';

const { Navigator, Screen } = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Navigator initialRouteName="Login">
      <Screen name="Login" component={LoginScreen} />
      <Screen name="Register" component={RegisterScreen} />
      <Screen name="ForgetPassword" component={ForgetPasswordScreen} />
    </Navigator>
  )
}

export default AuthNavigator;
