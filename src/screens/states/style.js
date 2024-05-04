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
        marginTop: -hp(56),
        borderTopLeftRadius: wp(4),
        borderTopRightRadius: wp(4),
    },
    gradient: {
        flex: 1,
    },
    logo: {
        width: wp(10),
        height: wp(10),
        borderRadius:100,
    },
    btn: {
        padding: wp(4),
        borderRadius: wp(3.5),
        width: wp(40),
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainWrapper: {
        justifyContent: 'space-between',
        backgroundColor: colors.WHITE,
        marginTop: -hp(6),
        width: wp(90),
        borderRadius: wp(6),
        alignSelf: 'center',
        padding: wp(3),
        flexDirection: 'row',
        alignItems: 'center'
    },
    totalUsers: {
        width: wp(7),
        height: wp(7),
        resizeMode: 'contain'
    },
    line: {
        width: 1,
        height: wp(6),
        backgroundColor: colors.WHITE,
    },
    text: {
        fontFamily: fonts.REGULAR,
        color: colors.GRAY3,
        fontSize: wp(3),
    },
    tempmail: {
        width: wp(10),
        height: wp(10),
        borderRadius: wp(2),
    },
})