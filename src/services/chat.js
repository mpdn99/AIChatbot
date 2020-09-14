import database from '@react-native-firebase/database';

const chat = (msg, user) => {
  const room = user._id;
  database().ref(`/users/${room}`).push(msg);
  if (
    msg.text ===
    'Hiện tại tôi chưa hiểu ý của bạn. Bạn vui lòng đợi giáo viên trả lời.'
  ) {
    database()
      .ref('/teacher/')
      .equalTo(room)
      .once('value', (snapshot) => {
        if (snapshot.exists() && msg.user._id === 1) {
          console.log(room);
        } else {
          console.log('not exist');
          database().ref(`/teacher/${room}`).set({user: user, isReply: false});
        }
      });
  }
};

export default chat;
