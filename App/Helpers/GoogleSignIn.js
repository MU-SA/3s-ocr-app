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
    return true;
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    } else if (error.code === statusCodes.IN_PROGRESS) {
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    } else {
      console.log(error);
    }
    return false;
  }
};
