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
import AuthScreen from '../screens/AuthScreen';
import TeacherChatScreen from '../screens/TeacherChatScreen';
import AppDrawerNavigation from './AppDrawerNavigator';
import {useSelector} from 'react-redux';
const Stack = createStackNavigator();


export default function AppNavigator() {
  const role = useSelector(state => state.roleReducer.state);

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
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Main" component={AppDrawerNavigation} />
        <Stack.Screen name="TeacherChat" component={TeacherChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}