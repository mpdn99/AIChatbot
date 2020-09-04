import React from 'react';
import {StyleSheet, SafeAreaView, StatusBar, Button} from 'react-native';
import Header from '../components/Header';

export default function ListScreen({navigation}) {
  return (
    <SafeAreaView>
      <Header navigation={navigation} />
      <StatusBar
        barStyle="light-content"
        backgroundColor="black"
        translucent={false}
      />
      <Button
        title="test"
        onPress={() => {
          navigation.navigate('TeacherChat');
        }}
      />
    </SafeAreaView>
  );
}
