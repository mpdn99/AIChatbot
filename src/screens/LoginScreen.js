/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    Platform,
    TextInput,
    TouchableOpacity,
    Animated,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import styles from '../styles';
import { useSelector, useDispatch } from 'react-redux';
import allActions from '../actions/';
import checkUser from '../services/checkUser';
import { LoginManager, AccessToken } from 'react-native-fbsdk';

export default function LoginScreen({ navigation }) {
    const [msg, setMsg] = useState('');

    const phoneNumber = useSelector(state => state.phoneNumberReducer.state);

    const dispatch = useDispatch();

    const phoneNumberHandler = (number) => {
        dispatch(allActions.setPhoneNumber(number));
        dispatch(allActions.setUser_id(number));
    };

    const signInWithPhoneNumber = () => {
        checkUser(phoneNumber, dispatch, setMsg, navigation);
    };

    async function signInWithAnonymous() {
        LoginManager.logInWithPermissions(['public_profile', 'email']).then(
            function (result) {
                if (result.isCancelled) {
                } else {
                    return AccessToken.getCurrentAccessToken().then((data) => {
                        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
                        return auth().signInWithCredential(facebookCredential);
                    }).then((user) => {
                        console.log(user.additionalUserInfo.profile.id);
                        dispatch(allActions.setPhoneNumber(user.additionalUserInfo.profile.email));
                        dispatch(allActions.setUser_id(user.additionalUserInfo.profile.id));
                        dispatch(allActions.setRole('anonymous'));
                        navigation.replace('Main');
                    });
                }
            },
        );
    }

    useEffect(() => {
        LoginAnimation();
    }, []);

    //animation
    const AnimLogin = useRef(new Animated.Value(200)).current;
    const LoginAnimation = () => {
        Animated.spring(AnimLogin, {
            toValue: 0,
            useNativeDriver: false,
        }).start();
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.container}>
                <View style={[styles.circle, { height: 500, width: 500 }]} />
                <View style={{}}>
                    <Image
                        source={require('../images/icon.png')}
                        style={{ height: 250, width: 250, alignSelf: 'center' }}
                    />
                </View>
                <Text style={{ alignSelf: 'center', marginHorizontal: 5, color: 'red' }}>{msg}</Text>
                <Animated.View style={{ marginTop: AnimLogin }}>
                    <View style={{ marginHorizontal: 32 }}>
                        <TextInput
                            placeholder="Nhập số điện thoại của bạn"
                            style={styles.input}
                            onChangeText={phoneNumberHandler}
                            keyboardType="phone-pad"
                            autoCompleteType="tel"
                        />
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginHorizontal: 20,
                            marginVertical: 32,
                        }}>
                        <TouchableOpacity style={styles.button} onPress={signInWithPhoneNumber}>
                            <Text style={styles.buttonText}>Tiếp tục</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{ marginHorizontal: 32 }}>
                        Bạn chưa có tài khoản? <Text style={{ color: 'blue' }} onPress={signInWithAnonymous}> Đăng nhập bằng tài khoản khách</Text>
                    </Text>
                </Animated.View>
            </View>
        </KeyboardAvoidingView>
    );
}
