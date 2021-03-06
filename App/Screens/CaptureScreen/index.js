import {
  Linking,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {RNCamera} from 'react-native-camera';
import styles from './styles';
import Storage from '../../Helpers/Storage';
export default ({}) => {
  const [ocrElement, setOcrElement] = useState([]);
  const [canDetectText, toggleTextDetection] = useState(false);
  const [buttonText, setButtonText] = useState('');
  const [email, setEmail] = useState('');
  const [barCode, setBarCode] = useState('');
  const camera = useRef();
  const backgroundStyle = {flex: 1, flexGrow: 1};
  const textRecognized = ({textBlocks}) => {
    try {
      if (textBlocks) {
        setOcrElement(textBlocks);
      } else {
        console.log(textBlocks);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onTogglePressed = () => {
    if (ocrElement.length === 0 && !canDetectText) {
      toggleTextDetection(!canDetectText);
    } else if (ocrElement.length > 0 && canDetectText) {
      toggleTextDetection(false);
      setButtonText('Send using email');
    } else {
      let body = '';
      ocrElement.map(block => {
        body += block.value + '\n';
      });
      const query = `mailto:<${email}>?subject=Text scanned from my camera&body=${body}`;
      const canOpen = Linking.canOpenURL(query);
      if (canOpen) Linking.openURL(query);
    }
  };
  const reset = () => {
    setOcrElement([]);
    toggleTextDetection(false);
    setButtonText('');
  };

  const onBarCodeDetected = e => {
    setOcrElement([
      ...ocrElement,
      {...e, value: '*****Bar Code Detected***\n\t\t' + e.data},
    ]);
  };
  const renderTextBlocks = () => (
    <View style={styles.textRecognitionContainer}>
      <ScrollView pointerEvents="none">
        {ocrElement.map(renderTextBlock)}
      </ScrollView>
    </View>
  );

  const renderTextBlock = ({bounds, value}) => (
    <View key={value + bounds.origin.x}>
      <Text style={styles.detectedTextColor}>{value}</Text>
    </View>
  );
  const getData = async () => {
    setEmail(await Storage.getFriendEmail());
  };
  useEffect(() => getData(), []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <RNCamera
        onTextRecognized={canDetectText ? textRecognized : null}
        ref={camera}
        onBarCodeRead={canDetectText ? onBarCodeDetected : null}
        captureAudio={false}
        style={styles.camera}
      />
      {barCode ? <Text>Bar Code Detected : {barCode}</Text> : null}
      {renderTextBlocks()}
      <View style={styles.buttons}>
        <Pressable onPress={onTogglePressed} style={styles.button}>
          <Text style={styles.buttonText}>
            {buttonText
              ? buttonText
              : canDetectText
              ? 'Stop Detecting'
              : 'Detect'}
          </Text>
        </Pressable>

        {buttonText ? (
          <Pressable onPress={reset} style={styles.resetButton}>
            <Text style={styles.buttonText}>reset</Text>
          </Pressable>
        ) : null}
      </View>
    </SafeAreaView>
  );
};
