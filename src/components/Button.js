import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import SuperText from './SuperText'
import { colors } from '../res/colors'
import { hp, wp } from '../res/constants'
import { images } from '../res/images'

const Button = (props) => {
    return (
        <TouchableOpacity style={[styles.container, props.extraStyle, {alignItems:"center"}]} onPress={props.onPress}>
            {props.icon == "backarrow"? <Image source={images.backarrow} style={{width:hp("1.5%"), height:hp("1.5%")}} /> : <></>}
            <SuperText value={props.label} color={props.color ? props.color : colors.WHITE} size={wp(4)} semiBold />
            {props.icon == "nextarrow"? <Image source={images.nextarrow} style={{width:hp("1.5%"), height:hp("1.5%")}} /> : <></>}
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.GRADIENT1,
        borderRadius: wp(3),
        padding: wp(2),
        width: wp(90),
        alignSelf: 'center',
        alignItems: "center",
        justifyContent: 'center',
        height: hp(6.2)
    }
});