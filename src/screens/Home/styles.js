import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  main: {
    marginTop: hp(6),
    width: '82%',
    alignSelf: 'center',
    maxWidth: 400,
  },
  title: {
    fontSize: hp(2.2),
    color: '#3198F7',
    fontWeight: '700',
    marginVertical:hp(1)
  },
  callMain: {
   marginTop:hp(5) 
  },
  input: {
    width: '100%',
    maxHeight: 60,
    height: hp(5),
    paddingLeft: wp(2.5),
    marginVertical: hp(1),
    borderWidth: 1,
    borderColor: '#3198F7',
    fontSize: hp(2),
    color: '#3198F7',
    alignSelf: 'center',
    fontWeight: '700',
  },
  button: {
    width: '25%',
    maxHeight: 60,
    height: hp(5),
    backgroundColor: '#3198F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(1),
  },
  buttonTitle: {
    fontSize: hp(2),
    color: '#fff',
    fontWeight: 'bold',
  },
});
