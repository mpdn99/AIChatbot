/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const Header = ({navigation, title}) => {
  const MenuBtn = () => {
    navigation.openDrawer();
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <TouchableOpacity onPress={MenuBtn}>
          <Icon
            name="menu"
            size={30}
            color="white"
            style={{marginLeft: 5}}
          />
        </TouchableOpacity>
      </View>
      <View style={{flex: 2, justifyContent: 'center'}}>
        <Text style={{color: 'white', fontSize: 20}}>{title}</Text>
      </View>
      <View style={{flex: 1, justifyContent: 'center'}}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 55,
    // marginTop: Platform.OS === 'android' ? 25 : 0,
    backgroundColor: '#68C2E8',
  },
});

export default Header;
