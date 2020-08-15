/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import AppDrawerNavigation from './AppDrawerNavigator';
const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          headerShown: false,
          cardStyleInterpolator:
            CardStyleInterpolators.forHorizontalIOS,
        }}
        animation="fade"
        // eslint-disable-next-line react-native/no-inline-styles
        style={{backgroundColor: 'transparent'}}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={AppDrawerNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}