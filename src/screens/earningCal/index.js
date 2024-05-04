import React, { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../res/colors';
import Header from '../../components/Header';
import Spacer from '../../components/Spacer';
import { data, hp, wp } from '../../res/constants';
import { isIphoneX } from 'react-native-iphone-x-helper';
import SuperText from '../../components/SuperText';
import { FlatList, Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { global } from '../../res/global';
import { images } from '../../res/images';
import RnRangeSlider from 'rn-range-slider';

const EarningCal = (props) => {

    const [low1, setLow1] = useState(10);
    const [low2, setLow2] = useState(15);
    const [low3, setLow3] = useState(30);
    let hourlyMiningRate = (16)+(low1 *(0.25 * 16) +
      low2 * (0.05 * 16) +
      ((low3/100) * 16));

    //#region slider callback
    const renderRail = useCallback(() => <View style={styles.rail} />, []);
    const renderRailSelected = useCallback(() => <View style={styles.railSelected} />, []);
    const renderThumb = useCallback(() => <View style={styles.root} ></View>, []);


    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[colors.GRADIENT1, colors.GRADIENT2]}
                style={styles.gradient}
                start={{ x: 0, y: 0.4 }} end={{ x: 1.6, y: 0 }}
            >
                        <Spacer space={wp(4)} />
                <SafeAreaView>
                    <View style={[global.row, { justifyContent: 'space-between', paddingHorizontal: wp(5) }]}>
                        <TouchableOpacity onPress={() => { props.navigation.goBack() }} style={{ width: wp(20), }}>
                            <Image source={images.back} />
                        </TouchableOpacity>
                        <SuperText value="Earning Calculator" medium color={colors.WHITE} size={wp(5)} style={{ alignSelf: 'center', }} />
                        <View style={{ width: wp(20), }} />
                    </View>
                </SafeAreaView>
            </LinearGradient>
            <View style={styles.subView}>
                <View style={[styles.mainWrapper, global.shadow]}>
                    <View style={[global.row, { justifyContent: 'center', }]}>
                        <SuperText value={`${hourlyMiningRate}`} mBold color={colors.BLACK} size={wp(7)} />
                        <Image source={images.logo} style={styles.logo} />
                        <SuperText value="Torq/h" mBold color={colors.BLACK} size={wp(7)} />
                    </View>
                    <Spacer space={wp(3)} />
                    <View style={[global.row, { justifyContent: 'space-between', marginHorizontal: wp(4.5) }]}>
                        <Image source={images.ic_user} />
                        <SuperText value="Tier 1 referrals" regular color={colors.GRAY5} size={wp(3.5)} style={{ width: wp(62) }} />
                        <SuperText value={low1} regular color={colors.BLACK} size={wp(4)} style={{ width: wp(10), textAlign: 'right' }} />
                    </View>
                    <RnRangeSlider
                        style={styles.slider}
                        low={low1}
                        min={0}
                        max={20}
                        step={1}
                        disableRange
                        renderThumb={renderThumb}
                        renderRail={renderRail}
                        renderRailSelected={renderRailSelected}
                        onValueChanged={(low, high) => { setLow1(low); }}
                    />
                    <Spacer space={wp(2)} />
                    <View style={[global.row, { justifyContent: 'space-between', marginHorizontal: wp(4.5) }]}>
                        <Image source={images.ic_user} />
                        <SuperText value="Tier 2 referrals" regular color={colors.GRAY5} size={wp(3.5)} style={{ width: wp(62) }} />
                        <SuperText value={low2} regular color={colors.BLACK} size={wp(4)} style={{ width: wp(10), textAlign: 'right' }} />
                    </View>
                    <RnRangeSlider
                        style={styles.slider}
                        low={low2}
                        min={0}
                        max={20}
                        step={1}
                        disableRange
                        renderThumb={renderThumb}
                        renderRail={renderRail}
                        renderRailSelected={renderRailSelected}
                        onValueChanged={(low, high) => { setLow2(low); }}
                    />
                    <Spacer space={wp(2)} />
                    <View style={[global.row, { justifyContent: 'space-between', marginHorizontal: wp(4.5) }]}>
                        <Image source={images.ic_user} />
                        <SuperText value="Wheel Percentage" regular color={colors.GRAY5} size={wp(3.5)} style={{ width: wp(62) }} />
                        <SuperText value={low3 + "%"} regular color={colors.BLACK} size={wp(4)} style={{ width: wp(10), textAlign: 'right' }} />
                    </View>
                    <RnRangeSlider
                        style={styles.slider}
                        low={low3}
                        min={0}
                        max={100}
                        step={25}
                        disableRange
                        renderThumb={renderThumb}
                        renderRail={renderRail}
                        renderRailSelected={renderRailSelected}
                        onValueChanged={(low, high) => { setLow3(low); }}
                    />
                </View>
            </View>
        </View>

    )
}

export default EarningCal;