/* eslint-disable prettier/prettier */
import React, {useState, useCallback, useEffect} from 'react';
import {StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import Header from '../components/Header';
import {GiftedChat} from 'react-native-gifted-chat';
import {useSelector, useDispatch} from 'react-redux';
import botAPI from '../services/botAPI';
import chat from '../services/chat';
// import onDbChat from '../services/onDbChat';
import offDbChat from '../services/offDbChat';
import database from '@react-native-firebase/database';

// import testApi from '../services/testApi';


const BOT_USER = {
  _id: 1,
  name: 'EDU Bot',
  avatar: 'https://i.imgur.com/7k12EPD.png',
};


export default function ChatScreen({navigation}) {
  const [messages, setMessages] = useState([]);
  const phoneNumber = useSelector(state => state.phoneNumberReducer.state);
  useEffect(() => {
    // onDbChat(USER, message => {
    //   setMessages(previousMessages => GiftedChat.append(previousMessages, message))
    // }
    // );
      const parse = (snapshot) => {
        var {createdAt, text, user, quickReplies} = snapshot.val();
        text = text.replaceAll('\\n', '\n');
        const {key: _id} = snapshot;
        let message = {_id, createdAt, text, user};
        if (quickReplies != null) {
          message = {_id, createdAt, text, user, quickReplies};
        }
        setMessages(previousMessages => GiftedChat.append(previousMessages, message));
      };
    
      const onChildAdd = database()
        .ref(`/users/${USER._id}`)
        .limitToLast(10)
        .on('child_added', (snapshot) => (parse(snapshot)));
    botAPI(USER._id, 'hello',botSend);
    return () => {
      // offDbChat();
      database().ref(`/users/${USER._id}`).off('child_added', onChildAdd);
    };
  }, []);

  const USER =  {
      name: phoneNumber,
      _id: phoneNumber,
  };

  const onSend = (messages = []) => {
    console.log(messages);
      // setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
    let message = messages[0].text;
    let msg = {
      _id: Math.round(Math.random() * 1000000),
      text: message,
      createdAt: new Date(),
      user: USER,
      };
    // testApi(messages, setBotMessage);
    botAPI(USER._id, message,botSend);
    chat(msg, USER._id);
  };

  const botSend = (msgbot, button) => {
    console.log(msgbot);
    let msg = {
      _id: Math.round(Math.random() * 1000000),
      text: msgbot,
      createdAt: new Date(),
      user: BOT_USER,
    };
    if (button != null){
      msg = {
        _id: Math.round(Math.random() * 1000000),
        text: msgbot,
        createdAt: new Date(),
        user: BOT_USER,
        quickReplies: {
          type: 'radio', // or 'checkbox',
          values: button,
        },
      };
    }
      // setMessages(previousMessages => GiftedChat.append(previousMessages, [msg]));
      chat(msg, USER._id);
  };

  const onQuickReply = (replies) => {
    const createdAt = new Date();
    onSend([
      {
        createdAt,
        _id: Math.round(Math.random() * 1000000),
        text: replies[0].title,
        user: USER,
      },
    ]);
  };


  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{_id: USER._id}}
        onQuickReply={onQuickReply}
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
