import { StyleSheet } from 'react-native'
import { colors } from '../../res/colors'
import { hp, wp } from '../../res/constants'
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
        marginTop: -hp(14),
        borderTopLeftRadius: wp(4),
        borderTopRightRadius: wp(4),
    },
    profile: {
        width: wp(20),
        height: wp(20),
        borderRadius:100
    },
    profileWrapper: {
        padding: wp(0.6),
        backgroundColor: colors.WHITE,
        borderRadius: wp(20),
    },
    camera: {
        position: 'absolute',
        bottom: -wp(3)
    },
    snowWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.WHITE,
        marginTop: -hp(5),
        width: wp(90),
        borderRadius: wp(6),
        alignSelf: 'center',
        padding: wp(1),
        paddingHorizontal: wp(3),
    },
    listWrapper: {
        backgroundColor: colors.WHITE,
        borderRadius: wp(4),
        padding: wp(2),
        marginHorizontal: wp(2),
        alignItems: 'center',
        marginVertical: wp(1)
    },
})