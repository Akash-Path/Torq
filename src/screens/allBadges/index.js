import React, {useCallback, useEffect, useState} from 'react';
import {styles} from './style';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../res/colors';
import Spacer from '../../components/Spacer';
import {hp, profileSettings, wp} from '../../res/constants';
import SuperText from '../../components/SuperText';
import {
  FlatList,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';
import {global} from '../../res/global';
import {images} from '../../res/images';
import {SafeAreaView} from 'react-native-safe-area-context';
import {baseURL} from '../../api/authApi';
import {useNavigation, useRoute} from '@react-navigation/native';
import {userBadges} from '../../res/badges';

const AllBadges = props => {
  const [searchQuerry, setSearchQuerry] = useState('');

  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() =>{
console.log("route are ", route.params)
  }, [])

  return (
    <>
      <LinearGradient
        colors={[colors.GRADIENT1, colors.GRADIENT2]}
        style={styles.gradient}
        start={{x: 0, y: 0.4}}
        end={{x: 1.6, y: 0}}>
        <Spacer space={wp(8)} />
        <SafeAreaView>
          <View
            style={[
              global.row,
              {justifyContent: 'space-between', paddingHorizontal: wp(5)},
            ]}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.goBack();
              }}
              style={{width: wp(20)}}>
              <Image source={images.back} />
            </TouchableOpacity>
            <SuperText
              value="All Badges"
              medium
              color={colors.WHITE}
              size={wp(5)}
              style={{alignSelf: 'center'}}
            />
            <View style={{width: wp(20)}} />
          </View>
        </SafeAreaView>
      </LinearGradient>
      <View style={styles.subView}>
        <Spacer space={wp(2)} />
        <View style={{marginHorizontal: wp(4)}}>
          <FlatList
            data={userBadges}
            keyExtractor={item => item.level}
            numColumns={2}
            renderItem={({item}) => {
              return (
                // <ImageBackground style={{}}>
                <View
                  style={[
                    {
                      justifyContent: 'space-between',
                      marginVertical: wp(3),
                      marginHorizontal: wp(1),
                    },
                  ]}>
                  <Image
                    source={{uri: `${baseURL}/badges/${item.name}.jpeg`}}
                    style={[styles.tempmail]}
                  />
                      <View style={{paddingLeft:10}}>

                  <SuperText value={`Name: ${item.name}`} color={'black'} />
                  <SuperText value={`Level: ${item.level}`} color={'black'} />
                  <SuperText
                    value={`Required Refferals: ${item.noOfReferrals}`}
                    color={'black'}
                    size={12}
                    />
                    </View>
                  <View
                    style={{
                      ...StyleSheet.absoluteFill,
                      borderRadius:10,
                      backgroundColor: `${(item.level) > (route?.params?.level) ? "rgba(128, 128, 128, 0.5)": "rgba(128, 128, 128, 0)"}`, // Semi-transparent gray color
                    }}
                  />
                </View>
                // </ImageBackground>
              );
            }}
          />
        </View>
      </View>
    </>
  );
};

export default AllBadges;
