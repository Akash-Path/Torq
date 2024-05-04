import { StyleSheet } from 'react-native'
import { colors } from '../../../res/colors'
import { hp, wp } from '../../../res/constants'
export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    subView: {
        flex: 1,
        backgroundColor: colors.WHITE,
        borderTopLeftRadius: wp(6),
        borderTopRightRadius: wp(6),
        marginTop: -hp(3),
    },
    logo: {
        width: wp(40),
        height: hp(10),
        objectFit:"contain"
    },
    socialIcon: {
        width: hp(6),
        height: hp(6),
    },
    border: {
        backgroundColor: colors.GRAY2,
        height: 1.5,
        width: wp(25)
    },
    inputLeft:{
        borderWidth:1,
        color:"black",
        borderTopLeftRadius:5,
        borderBottomLeftRadius:5,
        borderColor:colors.GRADIENT1,
    },
    inputRight:{
        borderWidth:1,
        color:"black",
        borderTopRightRadius:5,
        borderBottomRightRadius:5,
        borderColor:colors.GRADIENT1,
    },
    pickerTitleStyle: {
		justifyContent: "center",
		flexDirection: "row",
		alignSelf: "center",
		fontWeight: "bold",
	},
	pickerStyle: {
		height: 54,
		width: 250,
		marginVertical: 10,
		borderColor: "#303030",
		alignItems: "center",
		marginHorizontal: 10,
		padding: 10,
		backgroundColor: "white",
		borderRadius: 5,
		borderWidth: 2,
		fontSize: 16,
		color: "#000",
	},
	selectedCountryTextStyle: {
		paddingLeft: 5,
		color: "#000",
		textAlign: "right",
	},

	countryNameTextStyle: {
		paddingLeft: 10,
		color: "#000",
		textAlign: "right",
	},

	searchBarStyle: {
		flex: 1,
	},
})