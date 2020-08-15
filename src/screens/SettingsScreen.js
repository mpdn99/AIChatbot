/* eslint-disable prettier/prettier */
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Header from '../components/Header';

export default function SettingsScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
