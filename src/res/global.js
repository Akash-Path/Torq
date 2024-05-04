import { StyleSheet } from "react-native";
import { colors } from "./colors";
import { wp } from "./constants";
import { fonts } from "./fonts";

export const global = StyleSheet.create({
    bold: {
        fontFamily: fonts.BOLD,
    },
    light: {
        fontFamily: fonts.LIGHT,
    },
    ultraLight: {
        fontFamily: fonts.EXTRA_LIGHT,
    },
    medium: {
        fontFamily: fonts.MEDIUM,
    },
    regular: {
        fontFamily: fonts.REGULAR,
    },
    semiBold: {
        fontFamily: fonts.SEMI_BOLD,
    },
    thin: {
        fontFamily: fonts.THIN,
    },
    mSemiBold: {
        fontFamily: fonts.M_SEMI_BOLD,
    },
    mMedium: {
        fontFamily: fonts.M_SEMI_BOLD,
    },
    mBold: {
        fontFamily: fonts.M_BOLD,
    },
    mRegular: {
        fontFamily: fonts.M_REGULAR,
    },
    row: {
        flexDirection: 'row',
        alignItems: "center"
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    }
}) 