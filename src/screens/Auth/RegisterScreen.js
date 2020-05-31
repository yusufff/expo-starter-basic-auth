import React, { useState } from 'react'
import Toast from 'react-native-root-toast';
import axios from 'axios';
import { StyleSheet, View, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../hooks/useAuth';

import Config from '../../../config';

const RegisterScreen = () => {
  const [form, setForm] = useState({
    username: 'test',
    password: 'test',
  });
  const [loading, setLoading] = useState();
  const navigation = useNavigation();
  const { setToken, setUser, fetchUser } = useAuth();

  const handleSubmit = async () => {
    if ( loading || form.username === '' || form.password === '' ) return;
    setLoading(true);

    try {
      const { data: registerData } = await axios.post(Config.endpoints.register, form);

      if ( registerData ) {
        const { data: loginData } = await axios.post(Config.endpoints.login, form);

        if ( loginData.token ) {
          await setToken(loginData.token);
          fetchUser();
        } else {
          setLoading(false);
          Toast.show('Something went wrong', {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
          });
        }
      } else {
        setLoading(false);
        Toast.show('Something went wrong', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
      }
    } catch(error) {
      setLoading(false);
      Toast.show('Something went wrong', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
    }
  };

  const fakeRegister = () => {
    setToken('test');
    setUser({
      username: 'test'
    })
  }

  const gotoLogin = () => {
    navigation.navigate('Login');
  }

  const gotoForgetPassword = () => {
    navigation.navigate('ForgetPassword');
  }

  return (
    <View style={{ flex: 1 }}>
      <Button
        onPress={handleSubmit}
        title={loading ? 'Signing up...' : 'Sign Up'}
      />
      <Button
        onPress={fakeRegister}
        title={loading ? 'Fake Signing up...' : 'Fake Sign Up'}
      />
      <Button
        onPress={gotoLogin}
        title="Login"
      />
      <Button
        onPress={gotoForgetPassword}
        title="Forget Password"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  
});

export default RegisterScreen
