import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  page: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    position: 'absolute',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginEnd: 8,
  },
  userName: {
    fontWeight: 'bold',
    color: 'white',
  },
  email: {
    fontSize: 12,
    color: 'white',
  },
  container: {
    justifyContent: 'center',
    flex: 1,
    padding: 22,
  },
  capture: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  capture_image: {
    width: 36,
    height: 36,
    tintColor: 'white',
  },
  capture_title: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 4,
  },
  settings: {
    alignItems: 'center',
    marginTop: 44,
  },
});
