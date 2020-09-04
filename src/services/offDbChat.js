import database from '@react-native-firebase/database';

const offDbChat = (USER) => {
  ;
  database().ref(`/users/${USER._id}`).off('value', onValueChange);
};

export default offDbChat;
