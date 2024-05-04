import { StyleSheet } from 'react-native'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { hp } from '../../res/constants'
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: "center"
    },
    loader: {
        marginBottom: getBottomSpace() + hp(1)
    }
})