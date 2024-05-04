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
import { launchImageLibrary } from 'react-native-image-picker';
import { panCardFront } from '../../../api/kycApi';

const UploadDocuments = props => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [panCard, setPanCard] = useState('');
  const [conuntry, setCountry] = useState('');
  const [loading, setLoading] = useState(false);
// images states
  const [panFrontImg, setPanFrontImg] = useState("");
  const [panBackImg, setPanBackImg] = useState("");
  const [govtFrontImg, setGovtFrontImg] = useState("");
  const [govtBackImg, setGovtBackImg] = useState("");
  const [selfieImg, setSelfieImg] = useState("");

  const [panFrontImgUri, setPanFrontImgUri] = useState("");
  const [panBackImgUri, setPanBackImgUri] = useState("");
  const [govtFrontImgUri, setGovtFrontImgUri] = useState("");
  const [govtBackImgUri, setGovtBackImgUri] = useState("");

  const options = {
    mediaType: 'photo',
  };

  const handleSelectPanFront = async () =>{
    const result = await launchImageLibrary(options);
    console.log("pan front is : ", result.assets[0]);
    const file = result.assets[0];
    const formData = new FormData();

    if(file.fileSize > 1000000){
      Alert.alert("File size should be less then 1 MB");
      return;
    }

    setPanFrontImgUri(file.uri);

    formData.append('panCardFront', {
      uri: file.uri,
      type: file.type,
      name: file.fileName,
    });
    // formData.append("kycId", props?.route?.params?.kyc._id);

    console.log("form data is : ", formData)

    setPanFrontImg(formData);
  }

  const handleSelectPanBack = async () =>{
    const result = await launchImageLibrary(options);
    console.log("pan back is : ", result.assets[0]);
    const file = result.assets[0];
    const formData = new FormData();

    
    if(file.fileSize > 1000000){
      Alert.alert("File size should be less then 1 MB");
      return;
    }

    setPanBackImgUri(file.uri);

    formData.append('panCardBack', {
      uri: file.uri,
      type: file.type,
      name: file.fileName,
    });

    setPanBackImg(formData);
  }

  const handleSelectGovtFront = async () =>{
    const result = await launchImageLibrary(options);
    console.log("govt front is : ", result.assets[0]);
    const file = result.assets[0];
    const formData = new FormData();
    
    if(file.fileSize > 1000000){
      Alert.alert("File size should be less then 1 MB");
      return;
    }

    setGovtFrontImgUri(file.uri);

    formData.append('govDocFront', {
      uri: file.uri,
      type: file.type,
      name: file.fileName,
    });

    setGovtFrontImg(formData);
  }

  const handleSelectGovtBack = async () =>{
    const result = await launchImageLibrary(options);
    console.log("govt back is : ", result.assets[0]);
    const file = result.assets[0];
    const formData = new FormData();
    
    if(file.fileSize > 1000000){
      Alert.alert("File size should be less then 1 MB");
      return;
    }

    setGovtBackImgUri(file.uri);

    formData.append('govDocBack', {
      uri: file.uri,
      type: file.type,
      name: file.fileName,
    });

    setGovtBackImg(formData);
    // const response = await panCardFront(formData);
    // if (response == 413) {
    //   Alert.alert("File size too large!" ,'File size should be less then 1 MB');
    //   return;
    // }
    // if (response == 404) {
    //   console.log('error in img iupload ui for pan');
    // } else {
    //   console.log('response data is : ');
    //   console.log(response.data);
    // }
  }


  const handleNext = () => {
    if(panFrontImg && panBackImg && govtFrontImg && govtBackImg){

      const data = {
        panFrontImg, panBackImg, govtFrontImg, govtBackImg
      }
      props.navigation.navigate("SelfieVerification", {documents:data,kyc:props?.route?.params?.kyc});
    }else{
      Alert.alert("Upload all documents first!");
    }
  };


  useEffect(() => {
    console.log('personal Details Screen');
    console.log("props are : ", props.route.params);
  }, []);

  const FileCard = props => {
    return (
      <View style={[ {gap: 10, marginVertical:10}]}>
        <SuperText
          value={props.value}
          color={colors.BLACK}
          style={{marginLeft: 20}}
          size={wp(4)}
        />
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <ImageBackground
          borderRadius={hp(2)}
          source={{uri:props.uri?props.uri:"img"}}
            style={[styles.shadow, {
              width: wp('85%'),
              height: hp('20%'),
              borderRadius: hp('2'),
            }]}>
            <View
              style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
              <Button
              onPress={props.onPress}
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
          </ImageBackground>
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
          {/* <Image source={images.docskyc} style={{width:hp(20),height:hp(10), objectFit:"contain"}} /> */}
          <Image source={images.docskyc} style={styles.logo} />
          <Spacer space={wp(1)} />
          <SuperText
            value="Upload Documents"
            semiBold
            color={colors.BLACK}
            size={hp(2.5)}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            gap: 8,
            marginVertical: 5,
            alignItems: 'center',
            marginLeft: 20,
          }}>
          <Image
            source={images.dot}
            style={{width: hp('1.5'), height: hp('1.5')}}
          />
          <SuperText value={'Add Pan Card'} color={'black'} semiBold />
        </View>
        <FileCard value="1) Front Side" onPress={handleSelectPanFront} uri={panFrontImgUri} />
        <FileCard value="2) Back Side" onPress={handleSelectPanBack} uri={panBackImgUri} />
        <View
          style={{
            flexDirection: 'row',
            gap: 8,
            marginVertical: 15,
            alignItems: 'center',
            marginLeft: 20,
          }}>
          <Image
            source={images.dot}
            style={{width: hp('1.5'), height: hp('1.5')}}
          />
          <SuperText value={'Add Any Other Govt.Doc(DL/ID/Etc)'} color={'black'} semiBold />
        </View>
        <FileCard value="1) Front Side" onPress={handleSelectGovtFront} uri={govtFrontImgUri} />
        <FileCard value="2) Back Side" onPress={handleSelectGovtBack} uri={govtBackImgUri} />

        <Spacer space={hp(2)} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: wp('5'),
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
              setGovtBackImgUri("");
              setGovtBackImg("");
              setPanBackImg("");
              setPanBackImgUri("");
              setPanFrontImg("");
              setPanFrontImgUri("");
              setGovtFrontImg("");
              setGovtFrontImgUri("");
              props.navigation.goBack();
            }}
            label="Back"
          />
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
                handleNext();
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

export default UploadDocuments;
