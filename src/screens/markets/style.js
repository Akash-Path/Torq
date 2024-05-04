import { StyleSheet } from 'react-native'
import { colors } from '../../res/colors'
import { isIphoneX } from 'react-native-iphone-x-helper'
import { hp, wp } from '../../res/constants'
export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    subView: {
        backgroundColor: colors.WHITE,
        flex: 1,
        marginTop: -hp(40),
        borderTopLeftRadius: wp(4),
        borderTopRightRadius: wp(4),
    },
    gradient: {
        flex: 1,
    },
    mainWrapper: {
        justifyContent: 'space-between',
        backgroundColor: colors.WHITE,
        marginTop: -hp(6),
        width: wp(90),
        borderRadius: wp(6),
        alignSelf: 'center',
        padding: wp(5),
        flexDirection: 'row',
        alignItems: 'center'
    },
    bottomBorder: {
        width: wp(35),
        height: 1,
        backgroundColor: colors.BLACK,
        opacity: 0.1,
        marginVertical: wp(3)
    },
    border: {
        width: 1,
        height: wp(26),
        backgroundColor: colors.BLACK,
        opacity: 0.1,
        marginVertical: wp(3)
    },
    icon: {
        width: wp(10),
        height: wp(10)
    }
})