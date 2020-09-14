/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import HeaderBack from '../components/HeaderBack';
import {GiftedChat} from 'react-native-gifted-chat';
import {useSelector, useDispatch} from 'react-redux';
import database from '@react-native-firebase/database';
import chat from '../services/chat';
// import testApi from '../services/testApi';

export default function ChatScreen({navigation, route}) {
  const [messages, setMessages] = useState([]);

  const room = route.params?.key;
  const User = route.params?.user;

  const BOT_USER = {
    _id: 1,
    name: 'EDU Bot',
    avatar: 'https://images.discordapp.net/avatars/692723897887490138/5d4e9766c52fa9142924df3bb9a1d514.png?size=512',
  };

  const onSend = (messages) => {
      // setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
    let message = messages[0].text;
    let msg = {
      _id: Math.round(Math.random() * 1000000),
      text: message,
      createdAt: new Date().toLocaleString(),
      user: BOT_USER,
      };
      chat(msg, User);
  };

  useEffect(() => {
    console.log(room);
    const parse = (snapshot) => {
      var {createdAt, text, user, quickReplies} = snapshot.val();
      text = text.split('\\n').join('\n');
      const {key: _id} = snapshot;
      let message = {_id, createdAt, text, user};
      if (quickReplies != null) {
        message = {_id, createdAt, text, user, quickReplies};
      }
      return message;
    };

    const onChildAdd = database()
      .ref(`/users/${room}`)
      .limitToLast(20)
      .on('child_added', (snapshot) =>
      setMessages(previousMessages => GiftedChat.append(previousMessages, parse(snapshot))));
    return () => {
      database().ref(`/users/${room}`).off('child_added', onChildAdd);
    }
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack navigation={navigation} title={User.name} />
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={BOT_USER}
        showUserAvatar
        placeholder='Nhập tin nhắn'
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
