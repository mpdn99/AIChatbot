import auth from '@react-native-firebase/auth';
import allActions from '../actions/';

async function signInWithPhoneNumber(phoneNumber, dispatch, navigation) {
  const confirmation = await auth().signInWithPhoneNumber('+84' + phoneNumber);
  dispatch(allActions.setConfirm(confirmation));
  navigation.replace('Auth');
}

export default signInWithPhoneNumber;