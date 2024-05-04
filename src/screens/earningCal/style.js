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
        borderRadius: wp(4),
        backgroundColor: colors.WHITE,
        flexDirection: 'row',
        alignItems: "center",
        marginVertical: wp(2),
        marginHorizontal: wp(4),
    },
    greenLine: {
        backgroundColor: colors.GREEN,
        height: wp(10),
        width: wp(1.5)
    },
    gradient: {
        flex: 1,
    },
    logo: {
        width: wp(10),
        height: wp(10),
        marginHorizontal: wp(2)
    },

    slider: {
        paddingVertical: wp(2),
        width: wp(86),
        alignSelf: 'center'
    },
    root: {
        width: wp(6.5),
        height: wp(6.5),
        borderRadius: wp(6.5) / 2,
        borderWidth: 1,
        borderColor: colors.WHITE,
        backgroundColor: colors.GRADIENT1
    },
    rail: {
        flex: 1,
        height: wp(2),
        borderRadius: wp(1),
        backgroundColor: colors.GRAY8,
    },
    railSelected: {
        flex: 1,
        height: wp(2),
        backgroundColor: colors.GRADIENT1,
        borderRadius: wp(2),
    },
    mainWrapper: {
        justifyContent: 'space-between',
        backgroundColor: colors.WHITE,
        marginTop: -hp(6),
        width: wp(90),
        borderRadius: wp(6),
        alignSelf: 'center',
        paddingVertical: wp(4),
    }
})