import { StyleSheet } from "react-native";
import { colors } from "../../res/colors";
import { hp, wp } from "../../res/constants";
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
    width: hp(10),
    height: hp(10),
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
});
