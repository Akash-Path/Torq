import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { styles } from './style';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../res/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { hp, wp } from '../../res/constants';
import { images } from '../../res/images';
import BonusWheel from '../../components/BonusWheel';
import Spacer from '../../components/Spacer';


const DailyBonus = (props) => {

    return (
        <LinearGradient
            colors={[colors.GRADIENT1, colors.GRADIENT2]}
            style={styles.container}
            start={{ x: 0, y: 0.4 }} end={{ x: 1.6, y: 0 }}>
                                        <Spacer space={wp(2)} />
            <SafeAreaView>
                <View style={[{ paddingHorizontal: wp(5), }]}>
                    <TouchableOpacity onPress={() => { props.navigation.goBack() }} style={{ width: wp(20), }}>
                        <Image source={images.back} />
                    </TouchableOpacity>
                    <Image source={images.dailyBonus} style={{ alignSelf: 'center', marginTop: -hp(4), width: hp(14), height: hp(14) }} />
                </View>
                <BonusWheel />
            </SafeAreaView>
        </LinearGradient>
    )
}

export default DailyBonus;