import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';

import { useAuth } from '../hooks/useAuth';

const { Navigator, Screen } = createStackNavigator();

const RootNavigator = () => {
  const { user } = useAuth();

  return (
    <Navigator initialRouteName="Auth" headerMode="none">
      {user ? (
        <>
          <Screen name="App" component={AppNavigator} />
        </>
      ) : (
        <>
          <Screen name="Auth" component={AuthNavigator} />
        </>
      )}
    </Navigator>
  )
}

export default RootNavigator;
