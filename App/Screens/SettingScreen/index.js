import {Pressable, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Storage from '../../Helpers/Storage';
import styles from './styles';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useNavigation} from 'react-navigation-hooks';

export default ({}) => {
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const navigation = useNavigation();
  const onTyping = value => {
    setText(value);
  };

  useEffect(() => {
    getEmail();
    return () => setData();
  }, []);
  const setData = async () => {
    console.log('test', text, email);

    if (text !== email) {
      await Storage.setFriendEmail(text);
      getEmail();
    }
  };
  const getEmail = async () => {
    const storedEmail = await Storage.getFriendEmail();
    setEmail(storedEmail);
    setText(storedEmail);
  };

  const onSignOutPressed = async () => {
    await GoogleSignin.signOut();
    await Storage.signOut();
    navigation.navigate('Auth');
  };
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Set e-mail to send data to</Text>
          <TextInput
            onChangeText={onTyping}
            value={text}
            placeholder={email || 'Email'}
            style={styles.input}
            keyboardType={'email-address'}
          />
          {text === email ? null : (
            <Pressable onPress={setData} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save</Text>
            </Pressable>
          )}
        </View>

        <Pressable style={styles.saveButton} onPress={onSignOutPressed}>
          <Text style={styles.signOutText}>Signout</Text>
        </Pressable>
      </View>
    </View>
  );
};
