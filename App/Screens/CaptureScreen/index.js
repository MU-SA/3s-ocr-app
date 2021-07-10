import {
  Alert,
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
  const [barcode, setBarcode] = useState([]);
  const [canDetectText, toggleTextDetection] = useState(false);
  const [buttonText, setButtonText] = useState('');
  const [DetectedChargeText, setDetectedChargeText] = useState('');
  const [DetectedChargeTxt, setDetectedChargeTxt] = useState(false);
  const [email, setEmail] = useState('');
  const [barCode, setBarCodes] = useState('');
  const camera = useRef();
  const backgroundStyle = {flex: 1, flexGrow: 1};
  const textRecognized = ({textBlocks}) => {
    try {
      if (textBlocks) {
        setOcrElement(textBlocks);
      } else {
        // console.log(textBlocks);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  
  const onTogglePressed = () => {
    if (ocrElement.length === 0 && !canDetectText) {
      toggleTextDetection(!canDetectText);
    } else if (ocrElement.length > 0 && canDetectText) {
      console.log('ocrElement' + ocrElement);
      toggleTextDetection(false);
      setButtonText('Send using email');
    } else {
      let body = '';
      ocrElement.map(block => {
        body += block.value + '\n';
      });

      const query = `mailto:<${email}>?subject=Text scanned from my camera&body= pin code: ${DetectedChargeText} bar code: ${DetectedChargeText} `;
      const canOpen = Linking.canOpenURL(query);
      if (canOpen) {
        Linking.openURL(query);
      }
    }
  };
  const reset = () => {
    setOcrElement([]);
    toggleTextDetection(false);
    setButtonText('');
  };

  const onBarCodeDetected = e => {
    // setOcrElement([
    //   ...ocrElement,
    //   {...e, value: '*****Bar Code Detected***\n\t\t' + e.data},
    // ]);
    setBarCodes(e.data);
    toggleTextDetection(false);
    // Alert.alert(barcode);
  };

  const onTextDetected = ({textBlocks}) => {
    try {
      if (textBlocks) {
        console.log(textBlocks);
        setOcrElement(textBlocks);
        textBlocks.map((bounds, value) =>
          textBlocks[value].value.startsWith('Scratch here')
            ? setDetectedChargeText(
                textBlocks[value].value.replace(/[^0-9\s]/g, ''),
              )
            : null,
        );
      } else {
        console.log(textBlocks);
      }
    } catch (error) {
      console.log(error);
    }

    // setOcrElement([
    //   ...ocrElement,
    //   {...e, value: '*****Bar Code Detected***\n\t\t' + e.data},
    // ]);
    // setBarcode(e.data);
    // toggleTextDetection(false);
    // Alert.alert(barcode);
  };

  var regexp =
    /^( ?:([0-9]{3} (?:[0-9]{4}) (?:[0-9]{3}) (?:[0-9]{4}) (?:[0-9]{3}) ))$/;

  // const renderTextBlocks = () => (
  //   <View style={styles.textRecognitionContainer}>
  //     <ScrollView pointerEvents="none">
  //       {!DetectedChargeText ? ocrElement.map(renderTextBlock) : null}
  //     </ScrollView>
  //   </View>
  // );

  useEffect(() => {
    if (barCode !== '' && DetectedChargeText !== '') {
      Alert.alert('barcode' + barCode + '\\n Pin code' + DetectedChargeText);
    }
  }, [barCode, DetectedChargeText]);
  const renderTextBlock = ({bounds, value}) => {
    value.startsWith('Scratch here')
      ? setDetectedChargeText(value.replace(/[^0-9\s]/g, ''))
      : null;
  };
  // <View key={value + bounds.origin.x}>
  //   <Text style={styles.detectedTextColor}>
  //     {/* {console.log(
  //       'value >> ' + value.startsWith('Scratch here')
  //         ? value.replace(/[^0-9\s]/g, '')
  //         : '',
  //     )} */}

  //     {/* {value.startsWith('Scratch here') ? {setDetectedChargeText(true)} : ''} */}

  //     {/* {regexp.test(value.replace(/[^0-9\s]/g, '')) ? value : 'not yet'} */}
  //     {value.startsWith('Scratch here') ? value.replace(/[^0-9\s]/g, '') : ''}
  //     {barcode}
  //     {/* {ocrElement} */}
  //   </Text>
  // </View>
  const getData = async () => {
    setEmail(await Storage.getFriendEmail());
  };
  useEffect(() => getData(), []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <RNCamera
        onTextRecognized={
          canDetectText && DetectedChargeText === '' ? onTextDetected : null
        }
        ref={camera}
        onBarCodeRead={canDetectText ? onBarCodeDetected : null}
        captureAudio={false}
        style={styles.camera}
      />
      <View style={{height: '40%'}}>
        {barCode ? (
          <Text style={{fontWeight: 'bold'}}>
            Bar Code Detected : {barCode}
          </Text>
        ) : null}
        {DetectedChargeText ? (
          <Text style={{fontWeight: 'bold'}}>
            PIN Detected : {DetectedChargeText}
          </Text>
        ) : null}
      </View>
      {/* {renderTextBlocks()} */}

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
