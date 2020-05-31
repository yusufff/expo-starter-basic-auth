import React from 'react';
import { View, Text, Button } from 'react-native';

import { useAuth } from '../../hooks/useAuth';

const ProfileScreen = () => {
  const { removeToken } = useAuth();

  const logout = () => {
    removeToken();
  }

  return (
    <View style={{ flex: 1 }}>
      <Text>Profile</Text>
      <Button
        onPress={logout}
        title="Log out"
      />
    </View>
  )
}

export default ProfileScreen;
