/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, {useRef, useEffect} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Animated,
  Easing,
} from 'react-native';
import styles from '../styles';

export default function SplashScreen({navigation}) {
  const animIcon = useRef(new Animated.Value(0)).current;

  const IconAnim = () => {
    Animated.timing(animIcon, {
      toValue: 250,
      duration: 500,
      easing: Easing.bounce,
      useNativeDriver: false,
    }).start();
  };

  const goToLogin = () => {
    navigation.replace('Login');
  };

  useEffect(() => {
    IconAnim();
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.circle, {height: 500, width: 500}]} />
      <View>
        <Animated.Image
          source={require('../images/icon/bird.png')}
          style={{height: animIcon, width: animIcon, alignSelf: 'center'}}
        />
        <Image
          source={require('../images/icon/text.png')}
          style={{height: 100, width: 200, alignSelf: 'center'}}
        />
      </View>
      <TouchableOpacity
        style={[styles.button, {alignSelf: 'center'}]}
        onPress={goToLogin}>
        <Text style={styles.buttonText}>BẮT ĐẦU</Text>
      </TouchableOpacity>
    </View>
  );
}
