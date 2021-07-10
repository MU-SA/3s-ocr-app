/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './App/Screens/HomeScreen';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import LoginScreen from './App/Screens/LoginScreen';
import CaptureScreen from './App/Screens/CaptureScreen';
import SettingScreen from './App/Screens/SettingScreen';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '18444436630-1ghf56bfler2tqi0qoacjtbheft0n95i.apps.googleusercontent.com',
  forceCodeForRefreshToken: true,
  androidClientId:
    '18444436630-c6n2lcpvtv8qlra2l345amgtk3ga0aba.apps.googleusercontent.com',

  offlineAccess: true,
});

const Auth = createStackNavigator(
  {
    LoginScreen: {
      screen: LoginScreen,
    },
  },
  {initialRouteName: 'LoginScreen', headerMode: 'none'},
);
const StackNav = createStackNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
    },
    CaptureScreen: {
      screen: CaptureScreen,
    },
    SettingScreen: {
      screen: SettingScreen,
    },
  },
  {headerMode: 'none', initialRouteName: 'HomeScreen'},
);
const app = createSwitchNavigator(
  {
    App: StackNav,
    Auth: Auth,
  },
  {initialRouteName: 'Auth'},
);
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default createAppContainer(app);
