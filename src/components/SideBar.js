/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {Image, StyleSheet, Text, View, Alert} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import auth from '@react-native-firebase/auth';

export default function SideBar(props) {
  const signOut = () => {
    auth()
    .signOut()
    .then(() => props.navigation.replace('Login'));
  }

  const logoutNoti = () => {
    Alert.alert('Đăng xuất', 'Bạn có chắc muốn đăng xuất không?', [
      {text: 'Hủy bỏ'},
      {text: 'Đăng xuất', onPress: signOut },
    ]);
  };

  return (
    <DrawerContentScrollView style={{flex: 1}} {...props}>
      <View style={styles.userInfo}>
        <Image style={styles.img} source={require('../images/guest.png')} />
        <Text style={styles.text}>Guest</Text>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem label="Đăng xuất" onPress={logoutNoti} />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  userInfo: {
    marginVertical: 20,
    alignItems: 'center',
  },
  img: {
    height: 100,
    width: 100,
    borderRadius: 200,
    margin: 20,
  },
  text: {
    fontWeight: 'bold',
  },
});
