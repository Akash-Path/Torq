import {
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './style';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../../res/colors';
import SuperText from '../../../components/SuperText';
import {hp, wp} from '../../../res/constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import Spacer from '../../../components/Spacer';
import {images} from '../../../res/images';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import {global} from '../../../res/global';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fonts} from '../../../res/fonts';
import {ColorSpace} from 'react-native-reanimated';

const KycStatus = props => {
  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.GRADIENT1, colors.GRADIENT2]}
        style={styles.gradient}
        start={{x: 0, y: 0.4}}
        end={{x: 1.6, y: 0}}>
        {!isIphoneX() && <Spacer space={wp(2)} />}
        <SafeAreaView style={{alignItems: 'center', flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('BottomNavigation');
            }}
            style={{width: wp(45), paddingLeft: 15}}>
            <Image source={images.back} style={{width: hp(3), height: hp(3)}} />
          </TouchableOpacity>
        </SafeAreaView>
        <Spacer space={isIphoneX() ? wp(2) : wp(5)} />
      </LinearGradient>

      <KeyboardAwareScrollView style={styles.subView}>
        <View style={{alignItems: 'center'}}>
          <Spacer space={hp(10)} />
          {props?.route?.params?.kycStatus == 'pending' ? (
            <Image source={images.pendingKyc} style={styles.logo} />
          ) : props?.route?.params?.kycStatus == 'rejected' ? (
            <Image source={images.rejectedKyc} style={styles.logo} />
          ) : props?.route?.params?.kycStatus == 'verified' ? (
            <Image source={images.verifiedKyc} style={styles.logo} />
          ) : (
            <Image source={images.pendingKyc} style={styles.logo} />
          )}
          <Spacer space={wp(2)} />
          <SuperText
            value={`KYC ${props?.route?.params?.kycStatus ? props?.route?.params?.kycStatus : 'pending'}`}
            semiBold
            color={colors.BLACK}
            size={hp(2.5)}
          />
        </View>
        <Spacer space={hp(8)} />
        <View style={{marginHorizontal: wp(10)}}>
          {props?.route?.params?.kycStatus == 'rejected' ? (
            <SuperText value={'Resaon:'} bol color={'black'} />
          ) : (
            <></>
          )}
          <SuperText
            style={{paddingRight: 5, fontSize: 13, fontFamily: fonts.REGULAR, textAlign:`${props?.route?.params?.kycStatus == 'Rejected'? "start":"center"}`}}
            value={`${
              props?.route?.params?.kycStatus == 'pending'
                ? 'Please wait patiently until we verify you. We’ll send you an email when your KYC status changes.'
                : props?.route?.params?.kycStatus == 'rejected'
                ? 'Loeram ; Pimpinan at Self-Employed ; Lives in Batam, Riau, Indonesia ; From Surabaya, Indonesia.'
                : props?.route?.params?.kycStatus == 'verified'
                ? 'Your KYC has been completed!'
                : 'Please wait patiently until we verify you. We’ll send you an email when your KYC status changes.'
            }`}
            color={'black'}
          />
        </View>

        <Spacer space={hp(2)} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          {props?.route?.params?.kycStatus == 'rejected' ? (
            <Button
              extraStyle={{
                width: wp('70%'),
              }}
              onPress={() => {
                props.navigation.navigate('PersonalDetails');
              }}
              label="Re-Submit"
            />
          ) : (
            <Button
            extraStyle={{
              width: wp('70%'),
            }}
            onPress={() => {
              props.navigation.navigate('BottomNavigation');
            }}
            label="Back to Home"
          />
          )}
        </View>
        <Spacer space={hp(1)} />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default KycStatus;
