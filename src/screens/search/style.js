import { StyleSheet } from 'react-native'
import { colors } from '../../res/colors'
import { isIphoneX } from 'react-native-iphone-x-helper'
import { hp, wp } from '../../res/constants'
import { fonts } from '../../res/fonts'
export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    gradient: {
        flex: 1
    },
    subView: {
        backgroundColor: colors.WHITE,
        flex: 1,
        marginTop: -hp(42),
        borderTopLeftRadius: wp(4),
        borderTopRightRadius: wp(4),
    },
    searchWrapper: {
        flexDirection: 'row',
        alignItems: "center",
        borderRadius: wp(4),
        backgroundColor: colors.WHITE,
        paddingHorizontal: wp(3),
        width: wp(90),
        alignSelf: "center",
        justifyContent: 'space-between',
    },
    input: {
        fontFamily: fonts.REGULAR,
        fontSize: wp(3.5),
        width: wp(75),
        height: wp(12),
    },
    swithWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: wp(5),
        width: wp(90),
        alignSelf: 'center',
        backgroundColor: colors.WHITE,
        marginTop: -hp(5),
        padding: wp(2),
    },
    btn: {
        padding: wp(4),
        borderRadius: wp(3.5)
    },
    border: {
        width: 1,
        height: wp(8),
        backgroundColor: colors.BLACK
    },
    btnWrapper: {
        backgroundColor: colors.BLUE3,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: wp(3),
        padding: wp(3)
    },
    tempmail: {
        width: wp(10),
        height: wp(10),
        borderRadius: wp(2),
    },
    pingWrapper: {
        borderWidth: 1,
        borderColor: colors.BLUE2,
        borderRadius: wp(10),
        padding: wp(2),
        paddingVertical: wp(1),
        flexDirection: 'row',
        alignItems: 'center',
    }
})