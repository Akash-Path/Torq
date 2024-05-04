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
        marginTop: -hp(54),
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
})