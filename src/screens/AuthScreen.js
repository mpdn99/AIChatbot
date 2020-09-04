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
import styles from '../styles';
import {useSelector} from 'react-redux';

export default function AuthScreen({ navigation }) {
    const [code, setCode] = useState('');
    const [Msg, setMsg] = useState('');

    const confirm = useSelector(state => state.confirmReducer.state);
    const role = useSelector(state => state.roleReducer.state);

    async function confirmCode() {
        try {
            if (code.length > 0){
                await confirm.confirm(code);
                navigation.replace('Main');
            }
        } catch (error) {
            setMsg('Mã xác nhận sai. Mời bạn nhập lại!');
        }
    }

    const backToSignIn = () => {
        navigation.replace('Login');

    };

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
                <View>
                    <View style={{ marginHorizontal: 32 }}>
                        <Text>
                            Bạn sẽ nhận được một tin nhắn văn bản chứa mã xác nhận của bạn.
                Hãy nhập nó vào bên dưới.{' '}
                        </Text>
                        <Text style={{ marginHorizontal: 5, color: 'red' }}>{Msg}</Text>
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
            </View>
        </KeyboardAvoidingView>
    );
}
