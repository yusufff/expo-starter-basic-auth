import React, { useState } from 'react'
import Toast from 'react-native-root-toast';
import axios from 'axios';
import { StyleSheet, View, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import Config from '../../../config';

const ForgetPasswordScreen = () => {
  const [form, setForm] = useState({
    username: '',
  });
  const [loading, setLoading] = useState();
  const navigation = useNavigation();

  const handleSubmit = async () => {
    if ( loading || form.username === '' ) return;
    setLoading(true);

    try {
      const { data: forgetData } = await axios.post(Config.endpoints.forgetPassword, form);

      if ( forgetData ) {
        setLoading(false);
        Toast.show('Email sent', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
        gotoLogin();
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

  const gotoLogin = () => {
    navigation.navigate('Login');
  }

  const gotoRegister = () => {
    navigation.navigate('Register');
  }

  return (
    <View style={{ flex: 1 }}>
      <Button
        onPress={handleSubmit}
        title={loading ? 'Sending...' : 'Send Email'}
      />
      <Button
        onPress={gotoLogin}
        title="Login"
      />
      <Button
        onPress={gotoRegister}
        title="Register"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  logoContainer: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 40,
    resizeMode: 'contain',
  },
  header: {
    padding: 30,
    paddingTop: 50,
  },
  headerTitle: {
    marginBottom: 10,
  },
  inlineLink: {
    color: '#7ED321',
  },
  form: {
    padding: 30,
  },
  formInput: {
    marginBottom: 10,
  },
  formButton: {
    marginTop: 10,
  },
  loadingIndicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ForgetPasswordScreen
