import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import Storage from './Storage';
export default async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    Storage.setUserEmail(userInfo.user.email);
    Storage.setUserImage(userInfo.user.photo);
    Storage.setUserName(userInfo.user.name);
    console.log('TRUUUUUUUUUUUUUUUE');
    return true;
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log('statusCodes.SIGN_IN_CANCELLED' + error);
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log('statusCodes.IN_PROGRESS' + error.code);
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log(
        'error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE' + error.code,
      );
    } else {
      console.log('error >>' + error);
    }
    return false;
  }
};
