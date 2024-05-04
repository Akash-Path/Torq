import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import SuperText from './SuperText';
import { colors } from '../res/colors';
import { hp, wp } from '../res/constants';
import { fonts } from '../res/fonts';
import Spacer from './Spacer';

const Input = (props) => {
    return (
        <View style={styles.container}>
            {props.label &&
                <>
                    <SuperText value={props.label} color={colors.BLACK} size={wp(3.8)} medium />
                    <Spacer space={wp(0.5)} />
                </>
            }
            <View style={styles.inputWrapper}>
                {props.icon && <Image source={props.icon} />}
                <TextInput value={props.value}  keyboardType={props.num? "numeric": ""} onChangeText={props.stateHandler} secureTextEntry={props.secureTextEntry} placeholder={props.placeholder} placeholderTextColor={colors.GRAY} style={[styles.input, props.rightIcon && { width: wp(70) }]} />
                {props.rightIcon &&
                    <TouchableOpacity onPress={props.onRightClick}>
                        <Image source={props.rightIcon} style={styles.rightIcon} />
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}

export default Input;

const styles = StyleSheet.create({
    container: {
        width: wp(90),
        alignSelf: 'center',
        marginVertical: wp(3)
    },
    inputWrapper: {
        borderWidth: 1,
        borderColor: colors.GRADIENT1,
        borderRadius: wp(2),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: wp(2),
        justifyContent: 'space-between'
    },
    input: {
        fontFamily: fonts.REGULAR,
        fontSize: wp(3.8),
        color: colors.BLACK,
        height: hp(6),
        textAlignVertical: 'center',
        padding: 0,
        width: wp(76)
    },
    rightIcon: {
        width: hp(2.8),
        height: hp(2.8),
        resizeMode: 'contain'
    }
});