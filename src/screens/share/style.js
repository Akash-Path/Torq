import { StyleSheet, } from 'react-native'
import { colors } from '../../res/colors'
import { hp, wp } from '../../res/constants'
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE,
    },
    subView: {
        backgroundColor: colors.WHITE,
        borderRadius: wp(4),
        width: wp(90),
        padding: wp(4),
        alignSelf: 'center',
        alignItems: "center"
    },
    profileWrapper: {
        padding: wp(1),
        backgroundColor: colors.WHITE,
        borderRadius: wp(20),
        marginTop: -wp(14),
    },
    logo: {
        width: wp(10),
        height: wp(10)
    },
    btn: {
        backgroundColor: colors.WHITE,
        borderRadius: wp(4),
        borderRadius: wp(3),
        padding: wp(2),
        width: wp(90),
        alignSelf: 'center',
        alignItems: "center",
        justifyContent: 'center',
        height: hp(6.2),
        flexDirection: 'row',
    },
    profle: {
        width: hp(10),
        height: hp(10),
        borderRadius:100
    }
})