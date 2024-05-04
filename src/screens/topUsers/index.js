import React, {useCallback, useEffect, useState} from 'react';
import {styles} from './style';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../res/colors';
import Spacer from '../../components/Spacer';
import {hp, profileSettings, wp} from '../../res/constants';
import SuperText from '../../components/SuperText';
import {FlatList, Image, TextInput, TouchableOpacity, View} from 'react-native';
import {global} from '../../res/global';
import {images} from '../../res/images';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BarChart} from 'react-native-gifted-charts';
import {baseURL} from '../../api/authApi';
import {useNavigation} from '@react-navigation/native';

const TopUsers = props => {
  const [searchQuerry, setSearchQuerry] = useState('');
  const [targetArray, settargetArray] = useState(
    props?.route?.params?.topUsers,
  );

  const handleSearch = searchText => {
    setSearchQuerry(searchText);

    const userArray = props?.route?.params?.topUsers;
    let filteredUserArray = [];
    if (userArray) {
      // filteredUserArray=userArray.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()));
      filteredUserArray = userArray.filter(item =>
        item.name.toLowerCase().includes(searchText.toLowerCase()),
      );
      // for(let i=0 ;i<userArray.length;i++){
      //     if(userArray[i].name.toLowerCase().includes(searchText.toLowerCase())){
      //         filteredUserArray.push(userArray[i]);
      //     }
      // }
    }
    settargetArray(filteredUserArray);
  };

  const navigation = useNavigation();

  const handleGetUserDetails = user => {
    navigation.navigate('UserDetails', {user});
    console.log('click user Details');
  };

  return (
    <>
      <LinearGradient
        colors={[colors.GRADIENT1, colors.GRADIENT2]}
        style={styles.gradient}
        start={{x: 0, y: 0.4}}
        end={{x: 1.6, y: 0}}>
                  <Spacer space={wp(2)} />
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
              value="Top Users"
              medium
              color={colors.WHITE}
              size={wp(5)}
              style={{alignSelf: 'center'}}
            />
            <View style={{width: wp(20)}} />
          </View>
          <Spacer space={wp(3)} />
          <View style={styles.searchWrapper}>
            <Image source={images.search} />
            <TextInput
              value={searchQuerry}
              onChangeText={handleSearch}
              style={[styles.input, {color: 'black'}]}
              placeholder="Search for users"
              placeholderTextColor={colors.GRAY6}
            />
          </View>
          <Spacer space={wp(3)} />
        </SafeAreaView>
      </LinearGradient>
      <View style={styles.subView}>
        <Spacer space={wp(2)} />
        <View style={{marginHorizontal: wp(4)}}>
          <FlatList
            data={targetArray}
            keyExtractor={item => item.id}
            renderItem={item => {
              return (
                <View
                  style={[
                    global.row,
                    {justifyContent: 'space-between', marginVertical: wp(3)},
                  ]}>
                  <Image
                    source={
                      item.item.photo
                        ? {uri: `${baseURL}/photoUploads/${item.item.photo}`}
                        : images.profile
                    }
                    style={styles.tempmail}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      handleGetUserDetails(item);
                    }}>
                    <SuperText
                      value={item.item.name}
                      medium
                      color={colors.BLUE2}
                      size={wp(3.5)}
                      style={{width: wp(50)}}
                    />
                    <SuperText
                      value={`Rank: ${item.item.rank}`}
                      medium
                      color={colors.BLUE2}
                      size={wp(3.5)}
                      style={{width: wp(50)}}
                    />
                  </TouchableOpacity>
                  <SuperText
                    value={item.item.availableBalance}
                    regular
                    color={colors.GRAY5}
                    size={wp(3)}
                  />
                  <SuperText
                    value="Torq"
                    regular
                    color={colors.GRAY5}
                    size={wp(3)}
                  />
                </View>
              );
            }}
          />
        </View>
      </View>
    </>
  );
};

export default TopUsers;
