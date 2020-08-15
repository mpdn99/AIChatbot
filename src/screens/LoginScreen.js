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
import styles from '../styles/styles';

export default function LoginScreen({ navigation }) {
    // If null, no SMS has been sent
    const [confirm, setConfirm] = useState(null);
    const [show, setShow] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');
    const [CodeMsg, setCodeMsg] = useState('');

    // Handle the button press
    async function signInWithPhoneNumber() {
        const confirmation = await auth().signInWithPhoneNumber('+84' + phoneNumber);
        setConfirm(confirmation);
        setShow(true);
    }

    async function confirmCode() {
        try {
            await confirm.confirm(code);
            console.log(confirm._auth._user.uid);
            navigation.navigate('Main');
        } catch (error) {
            setCodeMsg('Mã xác nhận sai. Mời bạn nhập lại!');
        }
    }

    const backToSignIn = () => {
        setCodeMsg('');
        setShow(false);
    };

    async function signInWithAnonymous() {
        auth()
            .signInAnonymously()
            .then(() => {
                navigation.navigate('Main');
            });
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
                {show ? (
                    <View>
                        <View style={{ marginHorizontal: 32 }}>
                            <Text>
                                Bạn sẽ nhận được một tin nhắn văn bản chứa mã xác nhận của bạn.
                Hãy nhập nó vào bên dưới.{' '}
                            </Text>
                            <Text style={{ marginHorizontal: 5, color: 'red' }}>{CodeMsg}</Text>
                            <TextInput
                                placeholder="Nhập mã xác nhận"
                                style={styles.input}
                                onChangeText={setCode}
                                keyboardType="number-pad"
                            />
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                marginHorizontal: 20,
                                marginVertical: 32,
                            }}>
                            <TouchableOpacity style={styles.button} onPress={confirmCode}>
                                <Text style={styles.buttonText}>Đăng nhập</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={{ marginHorizontal: 32 }}>
                            Sau một phút chưa nhận được tin nhắn văn bản?
              <Text style={{ color: 'blue' }} onPress={backToSignIn}>
                                {' '}
                Nhập lại số điện thoại của bạn{' '}
                            </Text>
                        </Text>
                    </View>
                ) : (
                        <Animated.View style={{ marginTop: AnimLogin }}>
                            <View style={{ marginHorizontal: 32 }}>
                                <TextInput
                                    placeholder="Nhập số điện thoại của bạn"
                                    style={styles.input}
                                    onChangeText={setPhoneNumber}
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
                    )}
            </View>
        </KeyboardAvoidingView>
    );
}
