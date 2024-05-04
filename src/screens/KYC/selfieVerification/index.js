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
import {launchImageLibrary} from 'react-native-image-picker';
import {
  govDocBack,
  govDocFront,
  panCardBack,
  panCardFront,
  personalInfo,
  selfieUpload,
} from '../../../api/kycApi';
import { useUser } from '../../../../context/UserContext';

const SelfieVerification = props => {
  const [selfieImg, setSelfieImg] = useState('');
  const [selfieUri, setSelfieUri] = useState('');
  const [loading, setLoading] = useState(false);

  const {kycStatus, setKycStatus} = useUser();

  const handleSubmit = async () => {
    setLoading(true);
    if (selfieImg) {
      const personalInfoResponse = await personalInfo(
        props?.route?.params?.kyc,
      );
      if (personalInfoResponse == 404) {
        Alert.alert('cannot submit you data');
      } else {

        console.log('personal data response : ', personalInfoResponse.data.kyc);

        let panFrontdata = props?.route?.params?.documents?.panFrontImg;
        panFrontdata.append('kycId', personalInfoResponse?.data?.kyc._id);
        const panFrontResp = await panCardFront(panFrontdata);
        
        let panBackData = props?.route?.params?.documents?.panBackImg;
        panBackData.append('kycId', personalInfoResponse?.data?.kyc._id);
        const panBackResp = await panCardBack(panBackData);

        let govtFrontData = props?.route?.params?.documents?.govtFrontImg;
        govtFrontData.append('kycId', personalInfoResponse?.data?.kyc._id);
        const govtFrontResp = await govDocFront(govtFrontData);

        let govtBackData = props?.route?.params?.documents?.govtBackImg;
        govtBackData.append('kycId', personalInfoResponse?.data?.kyc._id);
        const govtBackResp = await govDocBack(govtBackData);

        let selfiedata = selfieImg;
        selfieImg.append("kycId", personalInfoResponse?.data?.kyc._id);
        const selfieResp = await selfieUpload(selfiedata);

        console.log('renspose from pan front is : ', panFrontResp.data);
        console.log('renspose from pan back is : ', panBackResp.data);
        console.log('renspose from govt front is : ', govtFrontResp.data);
        console.log('renspose from govt back is : ', govtBackResp.data);
        console.log('renspose from selfie is : ', selfieResp.data);
        Alert.alert(
          'Congratulations!',
          'You documents have been submitted successfully!',
        );
        setKycStatus("pending");
        props.navigation.navigate("KycStatus", {kycStatus:"pending"});
        setLoading(false);
      }
    } else {
      Alert.alert('Uplod you selfie first according to given instructions!');
      setLoading(false);
    }
    setLoading(false);
    // props.navigation.navigate("KycStatus", {kycStatus:"Pending"});
  };

  const options = {
    mediaType: 'photo',
  };

  const handleSelectSelfie = async () => {
    const result = await launchImageLibrary(options);
    console.log('govt back is : ', result.assets[0]);
    const file = result.assets[0];
    const formData = new FormData();

    if (file.fileSize > 1000000) {
      Alert.alert('File size should be less then 1 MB');
      return;
    }

    setSelfieUri(file.uri);

    formData.append('selfie', {
      uri: file.uri,
      type: file.type,
      name: file.fileName,
    });
    setSelfieImg(formData);
  };

  useEffect(() => {
    console.log('personal Details Screen');
    console.log('Props in selfie screen are : ', props.route.params);
  }, []);

  const FileCard = props => {
    return (
      <View style={{gap: 10, marginVertical: 20}}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <View
            style={[
              styles.shadow,
              {
                width: wp('85%'),
                height: hp('25%'),
                borderRadius: hp('2'),
              },
            ]}>
            {props.uri ? (
              <Image
                source={{uri: props.uri}}
                style={{width: '97%', height: '97%'}}
              />
            ) : (
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flex: 1,
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: colors.GRADIENT1,
                    backgroundColor: 'rgba(231,18,209,0.09)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: hp('9'),
                    width: hp(9),
                    borderRadius: 10,
                  }}>
                  <SuperText
                    value={'Name'}
                    color={'black'}
                    style={{fontSize: 12}}
                  />
                  <SuperText
                    value={'Date'}
                    color={'black'}
                    style={{fontSize: 12}}
                  />
                  <SuperText
                    value={'TORQ'}
                    color={'black'}
                    style={{fontSize: 12}}
                  />
                </View>
                <Image
                  source={images.selfie}
                  style={{width: hp('12%'), height: hp('12%')}}
                />
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: colors.GRADIENT1,
                    backgroundColor: 'rgba(231,18,209,0.09)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: hp('9'),
                    width: hp(9),
                    borderRadius: 10,
                  }}>
                  <SuperText
                    value={'Pan'}
                    color={'black'}
                    style={{fontSize: 12}}
                  />
                  <SuperText
                    value={'Card'}
                    color={'black'}
                    style={{fontSize: 12}}
                  />
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  };

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
              props.navigation.goBack();
            }}
            style={{width: wp(45), paddingLeft: 15}}>
            <Image source={images.back} style={{width: hp(3), height: hp(3)}} />
          </TouchableOpacity>
          <SuperText
            value="KYC"
            bold
            color={colors.WHITE}
            size={wp(5)}
            style={{}}
          />
        </SafeAreaView>
        <Spacer space={isIphoneX() ? wp(2) : wp(5)} />
      </LinearGradient>

      <KeyboardAwareScrollView style={styles.subView}>
        <View style={{alignItems: 'center'}}>
          <Spacer space={wp(2)} />
          <Image source={images.finalkyc} style={styles.logo} />
          <Spacer space={wp(1)} />
          <SuperText
            value="Selfie Verification"
            semiBold
            color={colors.BLACK}
            size={hp(2.5)}
          />
        </View>
        <View>
          <FileCard uri={selfieUri} />
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Button
            onPress={handleSelectSelfie}
            extraStyle={{
              borderWidth: 1,
              width: wp('30%'),
              borderRadius: 40,
              height: hp('5'),
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              backgroundColor: 'transparent',
            }}
            color="black"
            label="Upload +"
          />
        </View>
        <View style={{marginHorizontal: wp(10)}}>
          <SuperText value={'Note:'} bold color={'black'} />
          <SuperText
            style={{paddingRight: 5, fontSize: 13, fontFamily: fonts.REGULAR}}
            value={
              'Take your selfie in proper lighting while holding your PAN Card & a paper having your name, date and TORQ. Make sure your face and both docs are clearly visible'
            }
            color={'black'}
          />
        </View>

        <Spacer space={hp(2)} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: wp('10'),
          }}>
          <Button
            icon={'backarrow'}
            extraStyle={{
              width: wp('30%'),
              borderRadius: 50,
              height: hp('5'),
              flexDirection: 'row',
              gap: 6,
            }}
            onPress={() => {
              props.navigation.goBack();
            }}
            label="Back"
          />
          {loading ? (
            <ActivityIndicator size={'large'} color={colors.GRADIENT1} />
          ) : (
            <Button
              extraStyle={{
                width: wp('30%'),
                borderRadius: 50,
                height: hp('5'),
                flexDirection: 'row',
                gap: 6,
              }}
              onPress={() => {
                handleSubmit();
              }}
              label="Submit"
            />
          )}
        </View>
        <Spacer space={hp(1)} />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default SelfieVerification;
