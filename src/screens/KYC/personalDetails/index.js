import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  TextInput,
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
import {personalInfo} from '../../../api/kycApi';
import {count} from 'firebase/firestore';
// import CountryPicker from "rn-country-picker";
import CountryPicker from 'react-native-country-picker-modal';

const PersonalDetails = props => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [panCard, setPanCard] = useState('');
  const [conuntry, setCountry] = useState('');
  const [dOB, setDOB] = useState('');
  const [loading, setLoading] = useState(false);

  const [countryPicker, setCountryPicker] = useState(false);

  const [countryName, setCountryName] = useState('');

  const selectedValue = value => {
    console.log('value is : ', value);
    setCountryName(value);
    setCountryPicker(false);
    setCountry(value?.name);
  };

  const [d1, setD1] = useState('');
  const [d2, setD2] = useState('');
  const [m1, setM1] = useState('');
  const [m2, setM2] = useState('');
  const [y1, setY1] = useState('');
  const [y2, setY2] = useState('');

  const handleNext = data => {
    props.navigation.navigate('UploadDocuments', {kyc: data});
  };

  const handlePerosnalInfo = async () => {
    // if (d1 > 3) {
    //   Alert.alert('Invalid date of bith!');
    // } else {
    //   if (m1 > 1) {
    //     Alert.alert('Invalid date of bith!');
    //   } else {
    //     if (y1 > 20 || y1 < 19) {
    //       Alert.alert('Invalid date of bith!');
    //     } else {
    //       if (y1 == 20 && y2 > 23) {
    //         Alert.alert('Year should be less then  current year.');
    //       } else {
    //         setDOB(`${d1}${d2}-${m1}${m2}-${y1}${y2}`);
    //       }
    //     }
    //   }
    // }
    setLoading(true);
    const user = await AsyncStorage.getItem('user');

    const userData = JSON.parse(user);
    if ((name, phone, panCard, conuntry, postalCode, d1, d2, m1, m2, y1, y2)) {
      const data = {
        userId: userData._id,
        fullName: name,
        dob: `${d1}${d2}-${m1}${m2}-${y1}${y2}`,
        phoneNo: phone,
        panCardNo: panCard,
        country: conuntry,
        postalCode: postalCode,
      };
      console.log('data in ui is : ', data);
      setLoading(false);
      handleNext(data);
    } else {
      Alert.alert('Fill all fields Fist');
      setLoading(false);
    }
  };

  const selectCountry = () => {
    setCountryPicker(true);
  };

  useEffect(() => {
    console.log('personal Details Screen');
  }, []);

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
          <Image source={images.infokyc} style={styles.logo} />
          <Spacer space={wp(1)} />
          <SuperText
            value="Personal Details"
            semiBold
            color={colors.BLACK}
            size={hp(2.5)}
          />
        </View>
        <Input
          stateHandler={setName}
          label="Full Name"
          placeholder="Enter Name"
          // icon={images.ic_user}
        />
        <View style={{paddingHorizontal: wp('5')}}>
          <View>
            <SuperText
              value={'DOB'}
              color={colors.BLACK}
              size={wp(3.8)}
              medium
            />
          </View>
          <View style={{flexDirection: 'row', gap: 10}}>
            <View style={{flexDirection: 'row', alignSelf: 'stretch'}}>
              <TextInput
                onChangeText={setD1}
                maxLength={1}
                placeholder="hello"
                style={styles.inputLeft}
                keyboardType="numeric"
              />
              <TextInput
                onChangeText={setD2}
                maxLength={1}
                placeholder="hello"
                style={styles.inputRight}
                keyboardType="numeric"
              />
              {/* <MaskInput
      value={creditCard}
      onChangeText={setCreditCard}
      mask={Masks.CREDIT_CARD}
    /> */}
            </View>
            <View style={{flexDirection: 'row', alignSelf: 'stretch'}}>
              <TextInput
                onChangeText={setM1}
                maxLength={1}
                placeholder="hello"
                style={styles.inputLeft}
                keyboardType="numeric"
              />
              <TextInput
                onChangeText={setM2}
                maxLength={1}
                placeholder="hello"
                style={styles.inputRight}
                keyboardType="numeric"
              />
            </View>
            <View style={{flexDirection: 'row', alignSelf: 'stretch'}}>
              <TextInput
                onChangeText={setY1}
                maxLength={2}
                placeholder="hello"
                style={styles.inputLeft}
                keyboardType="numeric"
              />
              <TextInput
                onChangeText={setY2}
                maxLength={2}
                placeholder="hello"
                style={styles.inputRight}
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>
        <Input
          num={true}
          stateHandler={setPhone}
          label="Mobile Number"
          placeholder="Enter Mobile Number"
          // icon={images.email}
        />
        <Input
          stateHandler={setPanCard}
          label="Pan Card Number"
          placeholder="Enter Pan Card Number"
          // icon={images.blockchain}
        />

        {/* <CountryPicker
				disable={false}
				animationType={"slide"}
				language="en"
				containerStyle={styles.pickerStyle}
				pickerTitleStyle={styles.pickerTitleStyle}
				selectedCountryTextStyle={styles.selectedCountryTextStyle}
				countryNameTextStyle={styles.countryNameTextStyle}
				pickerTitle={"Country Picker"}
				searchBarPlaceHolder={"Search......"}
				hideCountryFlag={false}
				hideCountryCode={true}
        
				searchBarStyle={styles.searchBarStyle}
				countryCode={"1"}
				selectedValue={selectedValue}
			/> */}
        {countryPicker ? (
          <CountryPicker
            onSelect={selectedValue}
            withCountryNameButton={true}
            visible={countryPicker}
          />
        ) : (
          <></>
        )}
        {/* 
<CountryPicker
        {...{
          countryCode,
          withFilter,
          withFlag,
          withCountryNameButton,
          withAlphaFilter,
          withCallingCode,
          withEmoji,
          onSelect,
        }}
        visible
      /> */}
        {/* <TouchableOpacity onPress={()=>{
      }}> */}

        {/* <View> */}

        <Input
          rightIcon={images.arrowDown_black}
          onRightClick={selectCountry}
          stateHandler={setCountry}
          label="Country"
          value={conuntry}
          placeholder="Select Your Country"
        />
        {/* </View>
          </TouchableOpacity> */}
        <Input
          num={true}
          stateHandler={setPostalCode}
          label="Postal Code"
          placeholder="Enter You Postal Code"
        />
        <Spacer space={hp(2)} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginRight: wp('3'),
          }}>
          {loading ? (
            <ActivityIndicator size={'large'} color={colors.GRADIENT1} />
          ) : (
            <Button
              icon={'nextarrow'}
              extraStyle={{
                width: wp('30%'),
                borderRadius: 50,
                height: hp('5'),
                flexDirection: 'row',
                gap: 6,
              }}
              onPress={() => {
                handlePerosnalInfo();
              }}
              label="Next"
            />
          )}
        </View>
        <Spacer space={hp(1)} />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default PersonalDetails;
