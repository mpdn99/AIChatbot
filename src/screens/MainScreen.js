/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import Header from '../components/Header';
import {GiftedChat} from 'react-native-gifted-chat';
import {useSelector} from 'react-redux';
import botAPI from '../services/botAPI';
import chat from '../services/chat';
import database from '@react-native-firebase/database';


const BOT_USER = {
  _id: 1,
  name: 'EDU Bot',
  avatar: 'https://images.discordapp.net/avatars/692723897887490138/5d4e9766c52fa9142924df3bb9a1d514.png?size=512',
};


export default function ChatScreen({navigation}) {
  const [messages, setMessages] = useState([]);

  const phoneNumber = useSelector(state => state.phoneNumberReducer.state);
  const user_id = useSelector(state => state.idReducer.state);
  useEffect(() => {
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
        .ref(`/users/${USER._id}`)
        .limitToLast(20)
        .on('child_added', (snapshot) =>
        setMessages(previousMessages => GiftedChat.append(previousMessages, parse(snapshot))));
        botAPI(USER._id, 'hello',botSend);
    return () => {
      database().ref(`/users/${USER._id}`).off('child_added', onChildAdd);
    };
  }, []);

  const USER =  {
      name: phoneNumber,
      _id: user_id,
      avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/1200px-User_font_awesome.svg.png',
  };

  const onSend = (messagesSend = []) => {
    let message = messagesSend[0].text;
    let msg = {
      _id: Math.round(Math.random() * 1000000),
      text: message,
      createdAt: new Date().toLocaleString(),
      user: USER,
      };
    botAPI(USER._id, message,botSend);
    chat(msg, USER);
  };

  const botSend = (msgbot, button) => {
    let msg = {
      _id: Math.round(Math.random() * 1000000),
      text: msgbot,
      createdAt: new Date().toLocaleString(),
      user: BOT_USER,
    };
    if (button != null){
      msg = {
        _id: Math.round(Math.random() * 1000000),
        text: msgbot,
        createdAt: new Date().toLocaleString(),
        user: BOT_USER,
        quickReplies: {
          type: 'radio', // or 'checkbox',
          values: button,
        },
      };
    }
      chat(msg, USER);
  };

  const onQuickReply = (replies) => {
    // const createdAt = new Date();
    // onSend([
    //   {
    //     createdAt,
    //     _id: Math.round(Math.random() * 1000000),
    //     text: replies[0].payload,
    //     user: USER,
    //   },
    // ]);
    let msg = {
      _id: Math.round(Math.random() * 1000000),
      text: replies[0].title,
      createdAt: new Date().toLocaleString(),
      user: USER,
      };
    botAPI(USER._id, replies[0].payload,botSend);
    chat(msg, USER);
  };


  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={USER}
        onQuickReply={onQuickReply}
        placeholder='Nhập tin nhắn...'
      />
      <StatusBar barStyle="light-content" backgroundColor="black" translucent={false}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
