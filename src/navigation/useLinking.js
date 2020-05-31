import { useLinking } from '@react-navigation/native';
import { Linking } from 'expo';

export default function(containerRef) {
  return useLinking(containerRef, {
    prefixes: [Linking.makeUrl('/')],
    config: {
      Auth: {
        path: 'auth',
        screens: {
          Login: 'login',
          Register: 'register',
          ForgetPassword: 'forget-password',
        },
      },
      App: {
        path: 'app',
        screens: {
          Home: {
            path: 'home',
            screens: {
              Home: 'home',
            },
          },
          Profile: {
            path: 'profile',
            screens: {
              Profile: 'profile',
            },
          },
        },
      },
    },
  });
}
