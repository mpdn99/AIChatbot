/* eslint-disable prettier/prettier */
import React, {useState, useCallback, useEffect} from 'react';
import {StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import Header from '../components/Header';
import {GiftedChat} from 'react-native-gifted-chat';

export default function ChatScreen({navigation}) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Chào anh/ chị, tôi là BOT trả lời tin nhắn thông minh.',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback(([]) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, [messages]);
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <GiftedChat
        messages={messages}
        onSend={() => onSend(messages)}
        user={{
          username: 'guest',
        }}
        placeholder="Nhập tin nhắn"
      />
      <StatusBar barStyle="light-content" backgroundColor="black" translucent={false} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
