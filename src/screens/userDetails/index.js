import React, {useEffect, useState} from 'react';
import {styles} from './style';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../res/colors';
import Header from '../../components/Header';
import Spacer from '../../components/Spacer';
import {data, hp, wp} from '../../res/constants';
import SuperText from '../../components/SuperText';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {global} from '../../res/global';
import {images} from '../../res/images';
import * as Progress from 'react-native-progress';
import Settings from '../settings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getProfile, uploadPhoto} from '../../api/homePageApi';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {baseURL} from '../../api/authApi';
import {useUser} from '../../../context/UserContext';
import {useRoute} from '@react-navigation/native';

const userDetails = props => {
  const [activeIndex, setactiveIndex] = useState(1);

  const [availableBalance, setAvailableBalance] = useState(0);
  const [rank, setrank] = useState(0);
  const [invitationCode, setinvitationCode] = useState('');
  const [badges, setbadges] = useState([]);
  const [email, setemail] = useState('');
  const [miningSessions, setminingSessions] = useState([]);
  const [name, setname] = useState('');
  const [tier1Referrals, settier1Referrals] = useState([]);
  const [tier2Referrals, settier2Referrals] = useState([]);
  const [referrals, setrefferals] = useState(0);
  const [stakings, setstakings] = useState([]);
  const [stakingBalance, setstakingBalance] = useState(0);
  const [level, setlevel] = useState(0);
  const [streak, setstreak] = useState(0);
  const [qrCodePath, setqrCodePath] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  const route = useRoute();

  const [loading, setLoading] = useState(false);

  const {popupClicked, togglePopupClicked} = useUser();

  const getuser = async () => {
    setLoading(true);
    const response = route?.params?.user;
    if (response == 404) {
      console.log('error in getting the profile in profile screen');
    } else {
      console.log('response in profile screen is here ');
      console.log(response);
      setrank(response?.item?.rank);
      setrefferals(response?.item?.referrals);
      setname(response?.item?.name);
      setlevel(response?.item?.level);
      setbadges(response?.item?.badges);
      setAvailableBalance(response?.item?.availableBalance);
      //   await AsyncStorage.setItem(
      //     'profilepic',
      //     JSON.stringify(response?.data?.photoUrl),
      //   );
      let pic = response?.item?.photo;
      console.log(pic);
      if (pic.includes('"')) {
        pic = pic.replaceAll('"', '');
      }
      console.log(pic);
      setPhotoUrl(pic);
    }
    setLoading(false);
  };
  //
  const options = {
    mediaType: 'photo',
  };

  const handleSelectImage = async () => {
    const result = await launchImageLibrary(options);
    console.log(result.assets[0]);
    const img = result.assets[0];
  };

  const handeUploadPhoto = async () => {
    const result = await launchImageLibrary(options);
    console.log(result.assets[0]);
    const file = result.assets[0];
    const formData = new FormData();

    formData.append('photo', {
      uri: file.uri,
      type: file.type,
      name: file.fileName,
    });

    const response = await uploadPhoto(formData);
    if (response == 413) {
      Alert.alert('File size too large!', 'File size should be less then 1 MB');
      return;
    }
    if (response == 404) {
      console.log('');
    } else {
      console.log('response data is : ');
      console.log(response.data);
      await getuser();
      await togglePopupClicked();
    }
  };

  useEffect(() => {
    getuser();
    // console.log("user Details are ", route?.params?.user)
  }, [popupClicked]);

  return activeIndex == 1 ? (
    <>
      <LinearGradient
        colors={[colors.GRADIENT1, colors.GRADIENT2]}
        style={styles.gradient}
        start={{x: 0, y: 0.4}}
        end={{x: 1.6, y: 0}}>
        {/* <Header
          screenName="profile"
          onChangeIndex={index => {
            props.setactiveIndex(index);
          }}
          profile={photoUrl}
        /> */}
        <Spacer space={wp(4)} />
        <View
          style={[
            global.row,
            {justifyContent: 'space-between', alignItems:"center", paddingHorizontal: wp(5)},
          ]}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.goBack();
            }}
            style={{width: wp(20)}}>
            <Image source={images.back} />
          </TouchableOpacity>
          <SuperText
            value="User Details"
            medium
            color={colors.WHITE}
            size={wp(5)}
            style={{alignSelf: 'center'}}
          />
          <View style={{width: wp(20)}} />
        </View>
        <Spacer space={wp(4)} />
        <View
          style={[
            global.row,
            {
              justifyContent: 'flex-start',
              width: wp(90),
              alignSelf: 'center',
              gap:10
            },
          ]}>
          <View style={{alignItems: 'center'}}>
            <View style={styles.profileWrapper}>
              <Image
                source={
                  photoUrl
                    ? {
                        uri: photoUrl && `${baseURL}/photoUploads/${photoUrl}`,
                      }
                    : images.profile
                }
                style={styles.profile}
              />
            </View>
            {/* <TouchableOpacity style={styles.camera} onPress={handeUploadPhoto}>
              <Image source={images.camera} />
            </TouchableOpacity> */}
          </View>
          <SuperText
            value={name}
            medium
            color={colors.WHITE}
            size={wp(3.6)}
            style={{width: wp(45)}}
          />
          {/* <TouchableOpacity
            onPress={() => {
            //   props.navigation.navigate('PreStalking');
            }}>
            <Image source={images.category} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setactiveIndex(2);
            }}>
            <Image source={images.settings} />
          </TouchableOpacity> */}
        </View>
        <Spacer space={wp(3)} />
        {loading ? (
          <ActivityIndicator color={colors.GRADIENT1} size={24} />
        ) : (
          <View
            style={[
              global.row,
              {
                justifyContent: 'space-between',
                width: wp(90),
                alignSelf: 'center',
              },
            ]}>
            <View style={{alignItems: 'center'}}>
              <SuperText
                value={rank}
                semiBold
                color={colors.WHITE}
                size={wp(4.5)}
              />
              <SuperText
                value="GLOBAL RANK"
                regular
                color={colors.WHITE}
                size={wp(3.5)}
              />
            </View>
            <View style={{alignItems:"center"}}>
            {/* <TouchableOpacity
              //   onPress={props.onPress}
              style={{alignItems: 'center'}}> */}
              <SuperText
                value={(availableBalance / 1).toFixed(2)}
                semiBold
                color={colors.WHITE}
                size={wp(4.5)}
              />
              <SuperText
                value="BALANCE"
                regular
                color={colors.WHITE}
                size={wp(3.5)}
              />
              </View>
            {/* </TouchableOpacity> */}
            {/* <TouchableOpacity
              onPress={() => {
                // props.setactiveIndex(2);
              }}
              style={{alignItems: 'center'}}> */}
              <View style={{alignItems:"center"}}>
              <SuperText
                value={referrals}
                semiBold
                color={colors.WHITE}
                size={wp(4.5)}
              />
              <SuperText
                value="REFERRALS"
                regular
                color={colors.WHITE}
                size={wp(3.5)}
              />
              </View>
            {/* </TouchableOpacity> */}
            <View style={{alignItems: 'center'}}>
              <SuperText
                value={level}
                semiBold
                color={colors.WHITE}
                size={wp(4.5)}
              />
              <SuperText
                value="LEVEL"
                regular
                color={colors.WHITE}
                size={wp(3.5)}
              />
            </View>
          </View>
        )}
      </LinearGradient>
      <View style={styles.subView}>
        <Spacer space={wp(2)} />
        {/* <View style={[styles.snowWrapper, global.shadow]}>
          <Image source={images.snow} />
          <View style={{width: wp(60)}}>
            <SuperText
              value="MECHANIC"
              medium
              color={colors.BLACK}
              size={wp(4.5)}
            />
            <SuperText
              value="Build a snow empire"
              regular
              color={colors.BLACK}
              size={wp(3.3)}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('DailyBonus');
            }}>
            <Image source={images.arrowRight} />
          </TouchableOpacity>
        </View> */}
        <Spacer space={wp(2)} />
        <View
          style={[
            global.row,
            {
              justifyContent: 'space-between',
              width: wp(90),
              alignSelf: 'center',
            },
          ]}>
          <SuperText
            value={`${name ? name.toUpperCase() : 'USER'} BADGES`}
            mSemiBold
            color={colors.BLACK}
            size={wp(4.5)}
          />
          {/* <TouchableOpacity>
            <SuperText
              value="view all"
              mRegular
              color={colors.GRADIENT1}
              size={wp(4)}
            />
          </TouchableOpacity> */}
        </View>
        <Spacer space={wp(2)} />
        <View>
          {badges?.length > 0 ? (
            <FlatList
              data={badges}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{marginVertical: wp(1)}}
              renderItem={({item, index}) => {
                // console.log(`${baseURL}${item?.imageUrl}`)
                return (
                  <View style={index == 0 && {marginLeft: wp(4)}}>
                    <View style={[styles.listWrapper, global.shadow]}>
                      <Image
                        source={{
                          uri: item.imageUrl && `${baseURL}${item?.imageUrl}`,
                        }}
                        style={styles.ice}
                        width={wp('35%')}
                        height={hp('20%')}
                      />
                      {/* <SuperText value={`"TORQ GEN."`} medium color={colors.BLACK} size={wp(4)} /> */}
                      <SuperText
                        value={`${item.name}`}
                        medium
                        color={colors.BLACK}
                        size={wp(4)}
                      />
                      <Spacer space={wp(1)} />
                      {/* <Progress.Bar
                                                color={colors.GREEN2}
                                                unfilledColor={colors.GRAY4}
                                                progress={0.3}
                                                width={wp(30)}
                                                borderWidth={0}
                                                height={wp(3)}
                                                borderRadius={wp(10)}
                                              /> */}
                      <Spacer space={wp(0.5)} />
                      {/* <View
                      style={[
                        global.row,
                        {justifyContent: 'space-between', width: wp(28)},
                      ]}>
                      <SuperText
                      value="Social"
                      regular
                      color={colors.BLACK}
                      size={wp(3.5)}
                      />
                      <SuperText
                        value={`${item.level} of 10`}
                        regular
                        color={colors.BLACK}
                        size={wp(3.5)}
                      />
                    </View> */}
                    </View>
                  </View>
                );
              }}
            />
          ) : (
            <>
              <SuperText
                value={'No badges to display'}
                color={colors.BLACK}
                style={{paddingLeft: 20}}
              />
            </>
          )}
        </View>
      </View>
    </>
  ) : (
    <Settings
      setactiveIndex={index => {
        props.setactiveIndex(index);
      }}
      onBack={() => {
        setactiveIndex(1);
      }}
    />
  );
};

export default userDetails;
