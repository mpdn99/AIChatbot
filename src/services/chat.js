import database from '@react-native-firebase/database';

const chat = (msg, room) => {
  text = msg.replacingOccurrences(of: "\n", with: "\n")
  const newReference = database().ref(`/users/${room}`).push(msg);
  console.log('Auto generated key: ', newReference.key);
};

export default chat;
