/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import HeaderBack from '../components/HeaderBack';
import {GiftedChat} from 'react-native-gifted-chat';
import {useSelector, useDispatch} from 'react-redux';
// import testApi from '../services/testApi';

export default function ChatScreen({navigation, route}) {
  const [messages, setMessages] = useState([]);
  const phoneNumber = useSelector(state => state.phoneNumberReducer.state);


  const USER =  {
      name: parseInt(phoneNumber),
      id: parseInt(phoneNumber),
  };

  const onSend = (messages) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
    let message = messages[0].text;
  };


  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack navigation={navigation} />
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{_id: USER._id}}
        showUserAvatar
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
