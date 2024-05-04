import { StyleSheet } from 'react-native'
import { colors } from '../../res/colors'
import { hp, wp } from '../../res/constants'
import { isIphoneX } from 'react-native-iphone-x-helper'
import { fonts } from '../../res/fonts'
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE,
    },

    star: {
        width: wp(6.5),
        height: wp(6.5),
        resizeMode: 'contain'
    },
    gradient: {
        flex: 1,
    },
    subView: {
        backgroundColor: colors.WHITE,
        flex: 1,
        marginTop: isIphoneX() ? -hp(35) : -hp(30),
        borderTopLeftRadius: wp(4),
        borderTopRightRadius: wp(4),
        paddingHorizontal: wp(4)
    },
    sliderContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.WHITE,
        borderRadius: wp(5),
        padding: wp(4),
        width: wp(80),
        alignSelf: 'center'
    },
    torqStar: {
        position: 'absolute',
        top: -wp(6),
        alignSelf: 'center'
    },
    text: {
        fontFamily: fonts.M_MEDIUM,
        fontSize: wp(2.5),
        color: colors.GRAY7
    },
    earningWrapper: {
        backgroundColor: colors.WHITE,
        borderRadius: wp(5),
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
        marginVertical: wp(2),
        padding: wp(2)
    },
    inviteWraper: {
        backgroundColor: colors.WHITE,
        borderRadius: wp(5),
        alignItems: "center",
        justifyContent: 'space-between',
        marginVertical: wp(2),
        padding: wp(2)
    },

    container2: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    step: {
        width: 200,
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        alignItems: 'center',
    },
    activeStep: {
        backgroundColor: '#3498db',
    },
    lastStep: {
        marginBottom: 0,
    },
    stepLabel: {
        color: '#000',
        fontWeight: 'bold',
    },
    activeLabel: {
        color: '#fff',
    },
    stepContent: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
})