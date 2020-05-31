import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';

import HomeScreen from '../screens/Home/HomeScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';

const BottomTabNavigator = createBottomTabNavigator();
const HomeStackNavigator = createStackNavigator();
const ProfileStackNavigator = createStackNavigator();

const HomeNavigator = () => (
  <HomeStackNavigator.Navigator>
    <HomeStackNavigator.Screen name="Home" component={HomeScreen} />
  </HomeStackNavigator.Navigator>
)

const ProfileNavigator = () => (
  <ProfileStackNavigator.Navigator>
    <ProfileStackNavigator.Screen name="Profile" component={ProfileScreen} />
  </ProfileStackNavigator.Navigator>
)

const AppNavigator = () => {
  return (
    <BottomTabNavigator.Navigator>
      <BottomTabNavigator.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" pack="feather" size={size} color={color} />
          ),
          tabBarLabel: 'Home'
        }}
      />
      <BottomTabNavigator.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" pack="feather" size={size} color={color} />
          ),
          tabBarLabel: 'Profile'
        }}
      />
    </BottomTabNavigator.Navigator>
  )
}


export default AppNavigator;
