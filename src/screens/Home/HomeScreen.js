import React from 'react';
import { SafeAreaView, Text, Button } from 'react-native';

import { useAuth } from '../../hooks/useAuth';

const HomeScreen = () => {
  const { removeToken } = useAuth();

  const logout = () => {
    removeToken();
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Home</Text>
      <Button
        onPress={logout}
        title="Log out"
      />
    </SafeAreaView>
  )
}

export default HomeScreen;
