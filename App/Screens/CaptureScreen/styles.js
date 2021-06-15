import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  buttons: {
    position: 'absolute',
    width: '95%',
    bottom: 16,
    alignSelf: 'center',
  },
  button: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#121212',
  },
  buttonText: {
    color: 'white',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  resetButton: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#121212',
    marginTop: 16,
  },
  detectedTextColor: {
    color: 'rgba(255,255,255,.8)',
  },
  textRecognitionContainer: {
    position: 'absolute',
  },
  camera: {
    flex: 1,
  },
});
