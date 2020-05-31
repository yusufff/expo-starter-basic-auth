import React, { useState, useRef, useEffect } from 'react';
import { Platform, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SplashScreen } from 'expo';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';

import useLinking from './src/navigation/useLinking';

import RootNavigator from './src/navigation/RootNavigator';

import { AuthContext } from "./src/hooks/useAuth";
import { StoreContext } from "./src/hooks/useStore";

import Config from './config';

axios.defaults.baseURL = Config.baseURL;

enableScreens();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [initialNavigationState, setInitialNavigationState] = useState();
  const containerRef = useRef();
  const { getInitialState } = useLinking(containerRef);

  const [authUser, setAuthUser] = useState();
  const [globalStore, setGlobalStore] = useState({});

  const fetchUser = async () => {
    const token = await SecureStore.getItemAsync('token');
    if ( token ) {
      if ( token === 'test' ) return setAuthUser({ username: 'test' });
      
      axios.defaults.headers.common['Authorization'] = `bearer ${token}`;
      const { data: userData } = await axios.get(Config.endpoints.user);
      if ( userData ) {
        setAuthUser(userData);
      }
    }
  }

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();
        setInitialNavigationState(await getInitialState());

        await fetchUser();
      } catch (e) {
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  const setToken = async (token) => await SecureStore.setItemAsync('token', token);
  const removeToken = async () => {
    await SecureStore.deleteItemAsync('token');
    axios.defaults.headers.common['Authorization'] = '';
    setAuthUser();
  }

  const setStore = (key, value) => setGlobalStore(prevState => ({
    ...prevState,
    [key]: typeof value === 'function' ? value(prevState[key]) : value
  }))

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AuthContext.Provider value={{
          user: authUser,
          setUser: setAuthUser,
          fetchUser,
          setToken,
          removeToken,
        }}>
          <StoreContext.Provider value={{
            store: globalStore,
            setStore,
          }}>
            {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
            <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
              <RootNavigator />
            </NavigationContainer>
          </StoreContext.Provider>
        </AuthContext.Provider>
      </SafeAreaProvider>
    );
  }
}
