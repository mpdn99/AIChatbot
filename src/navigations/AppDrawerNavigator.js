/* eslint-disable prettier/prettier */
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SideBar from '../components/SideBar';
import MainScreen from '../screens/MainScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ListScreen from '../screens/AuthScreen';
import {useSelector} from 'react-redux';
const Drawer = createDrawerNavigator();
const AppDrawerNavigation = () => {
  const role = useSelector(state => state.roleReducer.state);
  return (
    <Drawer.Navigator
      // initialRouteName="Main"
      drawerContent={(props) => <SideBar {...props} />}>
      {
        role === 'teacher' ? (
          <Drawer.Screen
            name="List"
            component={ListScreen}
            options={{title: 'Trang chủ'}}
          />
        ) : (
          <Drawer.Screen
            name="Chat"
            component={MainScreen}
            options={{title: 'Trang chủ'}}
          />
        )
      }
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{title: 'Cài đặt'}}
      />

    </Drawer.Navigator>
  );
};
export default AppDrawerNavigation;
