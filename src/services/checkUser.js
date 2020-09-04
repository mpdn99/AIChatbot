import firestore from '@react-native-firebase/firestore';
import allActions from '../actions/';
import login from './login';

const checkUser = (phoneNumber, dispatch, setMsg, navigation) => {
  firestore()
    .collection('user')
    .doc(phoneNumber)
    .get()
    .then((documentSnapshot) => {
      if (documentSnapshot.exists) {
        login(phoneNumber, dispatch, navigation);
        dispatch(allActions.setRole(documentSnapshot.data().role));
      } else {
        setMsg('Số điên thoại sai!');
      }
    });
};

export default checkUser;
