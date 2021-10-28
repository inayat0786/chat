import {StyleSheet, Platform} from 'react-native';
export default StyleSheet.create({
  container: {
    marginTop: 20,
    width: '85%',
    alignSelf: 'center',
  },
  input: {
    height: 40,
    borderWidth: 1,
    width: '100%',
    borderRadius: 5,
    marginVertical: 10,
    paddingLeft: 10,
  },
  button: {
    padding: 10,
    borderWidth: 2,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonTitle: {
    fontSize: 15,
  },
  groups: {
    padding: 20,
    backgroundColor: 'gray',
    marginVertical: 10,
    borderRadius: 5,
  },
  groupTitle: {
    color: '#fff',
    fontSize: 17,
  },
});
