import {StyleSheet} from 'react-native';
import {colors} from '../../../res/colors';
import {hp, wp} from '../../../res/constants';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subView: {
    flex: 1,
    backgroundColor: colors.WHITE,
    borderTopLeftRadius: wp(6),
    borderTopRightRadius: wp(6),
    marginTop: -hp(3),
  },
  logo: {
    width: hp(20),
    height: hp(20),
  },
  socialIcon: {
    width: hp(6),
    height: hp(6),
  },
  border: {
    backgroundColor: colors.GRAY2,
    height: 1.5,
    width: wp(25),
  },
  shadow: {
    shadowColor: '#000', // Shadow color
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25, // Shadow opacity (0 to 1)
    shadowRadius: 3.84, // Shadow radius
    elevation: 5, // Android elevation
    backgroundColor: '#fff', // Background color
    padding: 20,
    borderRadius: 10,
  },
});
