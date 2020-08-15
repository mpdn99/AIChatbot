/* eslint-disable prettier/prettier */
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SideBar from '../components/SideBar';
import MainScreen from '../screens/MainScreen';
import SettingsScreen from '../screens/SettingsScreen';
const Drawer = createDrawerNavigator();
const AppDrawerNavigation = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Main"
      drawerContent={(props) => <SideBar {...props} />}>
      <Drawer.Screen
        name="Main"
        component={MainScreen}
        options={{title: 'Trang chủ'}}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{title: 'Cài đặt'}}
      />
    </Drawer.Navigator>
  );
};
export default AppDrawerNavigation;
