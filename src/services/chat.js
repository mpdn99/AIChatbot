import database from '@react-native-firebase/database';

const chat = (msg, room) => {
  const newReference = database().ref(`/users/${room}`).push(msg);
};

export default chat;
