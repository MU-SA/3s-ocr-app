import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import GoogleSignIn from '../../Helpers/GoogleSignIn';
import React, {useEffect} from 'react';
import {SafeAreaView, Text} from 'react-native';
import styles from './styles';
import {useNavigation} from 'react-navigation-hooks';
export default ({}) => {
  const navigation = useNavigation();
  const onSignInPressed = async () => {
    const isLogged = await GoogleSignIn();
    if (isLogged) navigation.navigate('App');
  };

  const checkIsSigned = async () => {
    const isSigned = await GoogleSignin.isSignedIn();
    if (isSigned) navigation.navigate('HomeScreen');
    console.log(isSigned);
  };
  useEffect(() => checkIsSigned(), []);

  return (
    <SafeAreaView style={styles.page}>
      <Text style={styles.title}>Welcome</Text>
      <GoogleSigninButton
        color={GoogleSigninButton.Color.Dark}
        size={GoogleSigninButton.Size.Wide}
        onPress={onSignInPressed}
      />
    </SafeAreaView>
  );
};
