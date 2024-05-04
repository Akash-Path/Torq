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
    listWrapper: {
        flexDirection: 'row',
        alignItems: "center",
        marginVertical: wp(2),
        marginHorizontal: wp(4),
        justifyContent: 'space-between'
    },
    greenLine: {
        backgroundColor: colors.GREEN,
        height: wp(10),
        width: wp(1.5)
    },
    gradient: {
        flex: 1,
    },
    mainWrapper: {
        justifyContent: 'space-around',
        // backgroundColor: colors.BLUE3,
        marginTop: -hp(8),
        width: wp(85),
        height: wp(35),
        borderRadius: wp(6),
        alignSelf: 'center',
        flexDirection: 'row',
    },
    border: {
        width: 1,
        height: wp(18),
        backgroundColor: colors.WHITE,
    },
    pagination: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        bottom: wp(3),
        width: wp(85),
        alignSelf: 'center',
        justifyContent: 'center',
    },
    dot: {
        width: wp(2.4),
        height: wp(2.4),
        borderRadius: wp(2),
        backgroundColor: colors.GRAY9,
        marginHorizontal: wp(0.5)
    },
    btn: {
        padding: wp(2),
        paddingHorizontal: wp(3),
        borderRadius: wp(5),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.BLUE3,
        marginHorizontal: wp(1)
    },
    earningWrapper: {
        backgroundColor: colors.WHITE,
        borderRadius: wp(5),
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
        marginVertical: wp(2),
        padding: wp(2),
        marginHorizontal: wp(6)
    },
    inviteWraper: {
        backgroundColor: colors.WHITE,
        borderRadius: wp(5),
        alignItems: "center",
        justifyContent: 'space-between',
        marginVertical: wp(2),
        padding: wp(2)
    },
})