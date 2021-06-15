import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  page: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: '#121212',
  },
  container: {
    padding: 22,
    justifyContent: 'space-evenly',
    flex: 1,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    padding: 8,
    borderRadius: 8,
    color: 'white',
    borderColor: '#323232',
    borderWidth: 1,
    marginTop: 8,
  },
  saveButton: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#323232',
    marginTop: 8,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 15,
    alignSelf: 'center',
  },
  signOutText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
