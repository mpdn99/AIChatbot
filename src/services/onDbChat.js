import database from '@react-native-firebase/database';

const onDbChat = (USER, callback) => {
  const parse = (snapshot) => {
    var {createdAt, text, user, quickReplies} = snapshot.val();
    text = text.replaceAll('\\n', '\n');
    const {key: _id} = snapshot;
    let message = {_id, createdAt, text, user};
    if (quickReplies != null) {
      message = {_id, createdAt, text, user, quickReplies};
    }
    return message;
  };

  const onChildAdd = database()
    .ref(`/users/${USER._id}`)
    .limitToLast(10)
    .on('child_added', (snapshot) => callback(parse(snapshot)));
};

export default onDbChat;
