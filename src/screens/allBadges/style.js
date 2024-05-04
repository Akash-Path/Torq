import { StyleSheet } from 'react-native'
import { colors } from '../../res/colors'
import { isIphoneX } from 'react-native-iphone-x-helper'
import { hp, wp } from '../../res/constants'
import { fonts } from '../../res/fonts'
export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    subView: {
        backgroundColor: colors.WHITE,
        flex: 1,
        marginTop: -hp(62),
        borderTopLeftRadius: wp(4),
        borderTopRightRadius: wp(4),
    },
    gradient: {
        flex: 1,
    },
    text: {
        fontFamily: fonts.REGULAR,
        color: colors.GRAY3,
        fontSize: wp(3),
    },
    tempmail: {
        width: hp(20),
        height: hp(25),
        borderRadius: wp(2),
    },
    searchWrapper: {
        flexDirection: 'row',
        alignItems: "center",
        borderRadius: wp(4),
        backgroundColor: colors.WHITE,
        padding: wp(3),
        width: wp(90),
        alignSelf: "center",
        justifyContent: 'space-between',
    },
    input: {
        fontFamily: fonts.REGULAR,
        fontSize: wp(3.5),
        width: wp(75),
    },
})