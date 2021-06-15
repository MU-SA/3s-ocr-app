import {Image, Pressable, SafeAreaView, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Storage from '../../Helpers/Storage';
import {useNavigation} from 'react-navigation-hooks';
import styles from './styles';
export default ({}) => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState();
  const [userImage, setUserImage] = useState();
  const [userEmail, setUserEmail] = useState();
  const getUserData = async () => {
    const name = await Storage.getUserName();
    const image = await Storage.getUserImage();
    const email = await Storage.getUserEmail();
    setUserName(name);
    setUserImage(image);
    setUserEmail(email);
  };
  const onCapturePressed = () => {
    navigation.navigate('CaptureScreen');
  };

  const onSettingsPressed = () => {
    navigation.navigate('SettingScreen');
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.header}>
        <Image source={{uri: userImage}} style={styles.avatar} />
        <View>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.email}>{userEmail}</Text>
        </View>
      </View>
      <View style={styles.container}>
        <Pressable style={styles.capture} onPress={onCapturePressed}>
          <Image
            source={require('../../Assets/capture.png')}
            style={styles.capture_image}
            resizeMode={'cover'}
          />
          <Text style={styles.capture_title}>Capture</Text>
        </Pressable>
        <Pressable onPress={onSettingsPressed} style={styles.settings}>
          <Image
            source={require('../../Assets/setting.png')}
            style={styles.capture_image}
            resizeMode={'cover'}
          />
          <Text style={styles.capture_title}>Settings</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};
