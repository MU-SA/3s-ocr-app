import AsyncStorage from '@react-native-community/async-storage';

class UserService {
  setUserName = async _name => {
    await AsyncStorage.setItem('name', _name);
  };
  getUserName = async () => {
    return await AsyncStorage.getItem('name');
  };
  setUserImage = async _image => {
    await AsyncStorage.setItem('image', _image);
  };
  getUserImage = async () => {
    return await AsyncStorage.getItem('image');
  };
  setUserEmail = async _email => {
    await AsyncStorage.setItem('email', _email);
  };
  getUserEmail = async () => {
    return await AsyncStorage.getItem('email');
  };
  setFriendEmail = async _email => {
    await AsyncStorage.setItem('friend_email', _email);
  };
  getFriendEmail = async () => {
    return await AsyncStorage.getItem('friend_email');
  };
  signOut = async () => {
    await AsyncStorage.removeItem('name');
    await AsyncStorage.removeItem('email');
    await AsyncStorage.removeItem('photo');
    await AsyncStorage.removeItem('friend_email');
    return true;
  };
}
export default new UserService();
