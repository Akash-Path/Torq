import React, {useEffect, useState} from 'react';
import {styles} from './style';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../res/colors';
import Header from '../../components/Header';
import Spacer from '../../components/Spacer';
import {data, hp, wp} from '../../res/constants';
import SuperText from '../../components/SuperText';
import {
  FlatList,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
  PermissionsAndroid,
  Text,
  Alert,
  ActivityIndicator,
  Linking,
} from 'react-native';
import {global} from '../../res/global';
import {images} from '../../res/images';
import Contacts from 'react-native-contacts';
import * as Progress from 'react-native-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {balanceHistoryOfSpecificDate, homeDetails} from '../../api/homePageApi';
import {activeTiers} from '../../api/contactApi';
import {sendNotification, sendNotificationToAll} from '../../api/notifications';
import {baseURL} from '../../api/authApi';
import {useNavigation} from '@react-navigation/native';

function Switch(props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <LinearGradient
        colors={
          props.activeIndex == props.id
            ? [colors.GRADIENT1, colors.GRADIENT2]
            : [colors.WHITE, colors.WHITE]
        }
        style={[styles.btn, global.row]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <Image
          source={props.icon}
          style={{
            tintColor:
              props.activeIndex == props.id ? colors.WHITE : colors.GRAY,
          }}
        />
        <Spacer row={wp(1)} />
        <SuperText
          value={props.label}
          medium
          color={props.activeIndex == props.id ? colors.WHITE : colors.GRAY}
          size={wp(3.5)}
        />
      </LinearGradient>
    </TouchableOpacity>
  );
}

const Search = props => {
  const [activeIndex, setactiveIndex] = useState(1);
  const [userContacts, setUserContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handlegetcontacs = async () => {
    setLoading(true);
    console.log('handle get contacts');
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS)
      .then(res => {
        console.log('Permission : ', res);
        if (res === 'granted') {
          setIsAllowed(true);
          Contacts.getAll()
            .then(contacts => {
              // work with contacts
              // console.log(contacts);
              setUserContacts(contacts);
              setLoading(false);
            })
            .catch(e => {
              console.log('err is : ', e);
              setLoading(false);
            });
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Permission error: ', error);
        setLoading(false);
      });
  };
  const [isAllowed, setIsAllowed] = useState(false);

  const fetchContacts = async () => {
    setLoading(true);
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
    );
    console.log(' now permission : ', granted);
    if (granted) {
      setIsAllowed(true);
      handlegetcontacs();
    } else {
      console.log('not granted');
    }
    setLoading(false);
  };

  const [inTier1Array, setinTier1Array] = useState([]);
  const [inTier2Array, setinTier2Array] = useState([]);
  const [tier1Array, setTier1Array] = useState([]);
  const [tier2Array, setTier2Array] = useState([]);
  const [totalTier1, setTotalTier1] = useState(0);
  const [totalTier2, setTotalTier2] = useState(0);
  const [referrals, setreferrals] = useState(0);

  const getTierUsers = async () => {
    setLoading(true);
    const resp = await AsyncStorage.getItem('user');
    let user = JSON.parse(resp);
    const response = await activeTiers();
    console.log(response);
    console.log(user);
    if (response == 404) {
      console.log('error getting home details');
    } else {
      console.log('response is : ');
      console.log(response.data);
      setTotalTier1(response?.data?.totalTier1);
      setTier1Array(response?.data?.activeTier1);
      setTier2Array(response?.data?.activeTier2);
      setTotalTier2(response?.data?.totalTier2);
      setinTier1Array(response?.data?.inActiveTier1);
      setinTier2Array(response?.data?.inActiveTier2);
      setreferrals(response?.data?.totalTier1 + response?.data?.totalTier2);
    }
    setLoading(false);
  };

  const [pingLoading, setPingLoading] = useState(false);

  const handlePing = async userId => {
    // setPingLoading(true);
    const userdata = await AsyncStorage.getItem('user');
    const user = JSON.parse(userdata);
    const data = {userId, name: user?.name, notificationType: 'ping', data: 0};
    console.log(data);
    const response = await sendNotification(data);
    if (response == 404) {
      Alert.alert('You can only ping once in 24 hours');
    } else {
      console.log(response.data);
      Alert.alert('ping sent successfully!');
    }
    // setPingLoading(false);
  };

  const handleSearch = async text => {
    console.log(text);
    setSearchText(text);
    let userArray = [];
    userArray = userContacts.filter(contact => {
      return contact.displayName.includes(text);
    });
    setUserContacts(userArray);
  };

  const navigation = useNavigation();

  const handleGetUserDetails = user => {
    console.log('user is : ', user);
    navigation.navigate('UserDetails', {user: {item: user}});
    console.log('click user Details');
  };

  const handlePingAll = async () => {
        const userdata = await AsyncStorage.getItem('user');
    const user = JSON.parse(userdata);
    const data = {receivers: []};
    if (inTier1Array.length !== 0 || inTier2Array.length !== 0) {
      if (activeIndex == 2) {
        if (inTier1Array.length == 0) {
          console.log('returning');
          return;
        }
        console.log('no');
        let arraytier1 = inTier1Array;
        let arraytier1Push = [];
        arraytier1.map(item => {
          arraytier1Push.push(item._id);
        });
        data.receivers = arraytier1Push;
      } else {
        if (inTier2Array.length == 0) {
          console.log('returingn 2');
          return;
        }
        console.log(' not for now');
        let arraytier2 = inTier2Array;
        let arraytier2Push = [];
        arraytier2.map(item => {
          arraytier2Push.push(item._id);
        });
        data.receivers = arraytier2Push;
      }
      console.log(data);
      const response = await sendNotificationToAll(data);
      console.log('Ping all clicked');
      if (response == 403) {
        Alert.alert('You can only ping once in 24 hours');
        return;
      }
      if (response == 404) {
        Alert.alert('You can only ping once in 24 hours');
      } else {
        console.log(response.data);
        Alert.alert('ping sent successfully!');
      }
    }
  };

  const onContactPress = async phoneNumber => {
    const user = await AsyncStorage.getItem('user');
    const userData = await JSON.parse(user);
    const message = `Hey! Check out this awesome app: Torq Newtork! Using the invitation code: ${userData.invitationCode}`;
    const url = `sms:${phoneNumber};?&body=${encodeURIComponent(message)}`;
    Linking.openURL(url);
  };

  useEffect(() => {
    fetchContacts();
    getTierUsers();
  }, []);

  const ContactsComponent = () => {
    return (
      <ScrollView>
        <View
          style={[
            global.row,
            {
              justifyContent: 'space-between',
              width: wp(80),
              alignSelf: 'center',
            },
          ]}>
          <View style={global.row}>
            <Image source={images.menuUser} />
            <Spacer row={wp(1)} />
            <View>
              <SuperText
                value="Referrals"
                regular
                color={colors.GRAY3}
                size={wp(3.5)}
              />
              <SuperText
                value={`${referrals}`}
                medium
                color={colors.BLACK}
                size={wp(4)}
              />
            </View>
          </View>
          {/* <View style={styles.border} />
                    <View>
                        <SuperText value="Earnings" regular color={colors.GRAY3} size={wp(3.5)} />
                        <View style={{ flexDirection: 'row' }}>
                            <SuperText value="15." medium color={colors.BLACK} size={wp(4)} />
                            <SuperText value="42" regular color={colors.BLACK} size={wp(3)} />
                            <Spacer row={wp(0.5)} />
                            <SuperText value="Torq" medium color={colors.BLACK} size={wp(4)} />
                        </View>
                    </View> */}
        </View>
        <Spacer space={wp(4)} />
        {isAllowed ? (
          <View style={{paddingHorizontal: 20}}>
            {loading ? (
              <ActivityIndicator size={'large'} color={colors.GRADIENT1} />
            ) : (
              <FlatList
                data={userContacts}
                keyExtractor={item => item.id}
                renderItem={item => {
                  // console.log(item.item.phoneNumbers[0]?.number);
                  return (
                    <View
                      style={[
                        global.row,
                        {
                          justifyContent: 'space-between',
                          marginVertical: wp(3),
                        },
                      ]}>
                      <Image source={images.ic_user} style={styles.tempmail} />
                      <SuperText
                        value={`${
                          item.item.displayName
                            ? item.item.displayName
                            : item.item.givenName
                        }`}
                        medium
                        color={colors.BLUE2}
                        size={wp(3.5)}
                        style={{width: wp(40)}}
                      />
                      <TouchableOpacity
                        onPress={() => {
                          onContactPress(item.item.phoneNumbers[0]?.number);
                        }}>
                        <View style={styles.pingWrapper}>
                          {/* <Image source={images.bell} /> */}

                          <SuperText
                            value={`${item.item.phoneNumbers[0]?.number}`}
                            medium
                            color={colors.BLACK}
                            size={wp(3.2)}
                          />
                        </View>
                      </TouchableOpacity>
                      {/* <Image source={images.flag} /> */}
                    </View>
                  );
                }}
              />
            )}
          </View>
        ) : (
          <View style={{alignItems: 'center'}}>
            <Image
              source={images.contactsImg}
              style={{
                width: wp(65),
                height: hp(30),
                objectFit: 'fill',
                marginVertical: 5,
                borderRadius: 200,
              }}
            />
            <SuperText
              value="Torq is better with friends"
              medium
              color={colors.BLUE2}
              size={wp(4)}
            />
            <Spacer space={wp(0.5)} />
            <SuperText
              style={{textAlign: 'center'}}
              value={`Sync your contacts and see who is already on\nTorq. In the future, you will be able to send\nTorq to any of your contacts`}
              regular
              color={colors.BLUE2}
              size={wp(3.2)}
            />
            <Spacer space={wp(2)} />
            <TouchableOpacity
              style={styles.btnWrapper}
              onPress={() => handlegetcontacs()}>
              <Image source={images.contacts} />
              <Spacer row={wp(1)} />
              <SuperText
                value="Allow contacts access"
                medium
                color={colors.WHITE}
                size={wp(4)}
              />
            </TouchableOpacity>
          </View>
        )}
        <Spacer space={hp(4)} />
      </ScrollView>
    );
  };

  const Tier = () => {
    return (
      <View style={{paddingHorizontal: wp(5)}}>
        <View style={[global.row, {justifyContent: 'space-between'}]}>
          <View
            style={[global.row, {justifyContent: 'space-between', flex: 1}]}>
            <View style={{flexDirection: 'row'}}>
              <SuperText
                value="Active: "
                regular
                color={colors.GRAY3}
                size={wp(3.5)}
              />
              <SuperText
                value={` ${
                  activeIndex == 2
                    ? totalTier1 - inTier1Array.length
                    : totalTier2 - inTier2Array.length
                }/${activeIndex == 2 ? totalTier1 : totalTier2}`}
                regular
                color={colors.BLACK}
                size={wp(3.5)}
              />
            </View>
            <TouchableOpacity
              onPress={() => handlePingAll()}
              style={{
                borderWidth: 1,
                borderColor: colors.GRADIENT1,
                borderRadius: 10,
                paddingHorizontal: 10,
                paddingVertical: 5,
              }}>
              <SuperText
                value="Ping All"
                regular
                color={colors.GRADIENT1}
                size={wp(3.5)}
              />
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row'}}>
            {/* <SuperText value="Tier 1 Earning:17. " regular color={colors.GRAY3} size={wp(3.5)} /> */}
            {/* <SuperText value="45" regular color={colors.GRAY3} size={wp(2.8)} /> */}
            {/* <SuperText value=" Torq" regular color={colors.GRAY3} size={wp(3.5)} /> */}
          </View>
        </View>
        <Spacer space={wp(2)} />
        {loading ? (
          <ActivityIndicator size={'large'} color={colors.GRADIENT1} />
        ) : (
          <>
            {activeIndex == 2 ? (
              inTier1Array.length == 0 && tier1Array.length == 0 ? (
                <Text style={{color: 'black'}}>No tier 1 refferals!</Text>
              ) : (
                <>
                  <FlatList
                    refreshing={loading}
                    onRefresh={getTierUsers}
                    data={activeIndex == 2 ? inTier1Array : inTier2Array}
                    keyExtractor={item => item.id}
                    renderItem={item => {
                      // console.log(item);
                      return (
                        <View
                          style={[
                            global.row,
                            {
                              justifyContent: 'space-between',
                              marginVertical: wp(3),
                            },
                          ]}>
                          <Image
                            source={
                              item.item.photo
                                ? {
                                    uri: `${baseURL}/photoUploads/${item.item.photo}`,
                                  }
                                : images.profile
                            }
                            style={styles.tempmail}
                          />
                          <TouchableOpacity
                            onPress={() => {
                              handleGetUserDetails(item.item);
                            }}>
                            <SuperText
                              value={`${item.item.name}`}
                              medium
                              color={colors.BLUE2}
                              size={wp(3.5)}
                              style={{width: wp(50)}}
                            />
                          </TouchableOpacity>
                          {/* {pingLoading ? (
                          <ActivityIndicator size={'large'} color={colors.GRADIENT1} />
                        ) : ( */}
                          <TouchableOpacity
                            onPress={() => {
                              handlePing(item.item._id);
                            }}>
                            <View style={styles.pingWrapper}>
                              <Image source={images.bell} />
                              <SuperText
                                value="Ping"
                                medium
                                color={colors.BLACK}
                                size={wp(3.2)}
                              />
                            </View>
                          </TouchableOpacity>
                          {/* )} */}
                          <Image source={images.flag} />
                        </View>
                      );
                    }}
                  />
                  <FlatList
                    refreshing={loading}
                    onRefresh={getTierUsers}
                    data={activeIndex == 2 ? tier1Array : tier2Array}
                    keyExtractor={item => item.id}
                    renderItem={item => {
                      // console.log(item);
                      return (
                        <View
                          style={[
                            global.row,
                            {
                              justifyContent: 'space-between',
                              marginVertical: wp(3),
                            },
                          ]}>
                          <Image
                            source={
                              item.item.photo
                                ? {
                                    uri: `${baseURL}/photoUploads/${item.item.photo}`,
                                  }
                                : images.profile
                            }
                            style={styles.tempmail}
                          />
                          <TouchableOpacity
                            onPress={() => {
                              handleGetUserDetails(item.item);
                            }}>
                            <SuperText
                              value={`${item.item.name}`}
                              medium
                              color={colors.BLUE2}
                              size={wp(3.5)}
                              style={{width: wp(50)}}
                            />
                          </TouchableOpacity>
                          {/* {pingLoading ? (
                          <ActivityIndicator size={'large'} color={colors.GRADIENT1} />
                        ) : ( */}
                          <TouchableOpacity
                            onPress={() => {
                              // handlePing(item.item._id);
                            }}>
                            <View
                              style={[
                                {
                                  borderColor: colors.GREEN2,
                                  borderWidth: 1,
                                  paddingVertical: 3,
                                  paddingHorizontal: 5,
                                  borderRadius: 100,
                                },
                              ]}>
                              {/* <Image source={images.bell} /> */}
                              <SuperText
                                value="Online"
                                medium
                                color={colors.GREEN2}
                                size={wp(3.2)}
                              />
                            </View>
                            {/* <Image source={images.greentick} style={{width:40, height:40, borderRadius:100}} /> */}
                          </TouchableOpacity>
                          {/* )} */}
                          <Image source={images.flag} />
                        </View>
                      );
                    }}
                  />
                </>
              )
            ) : inTier2Array.length == 0 && tier2Array.length == 0 ? (
              <Text style={{color: 'black'}}>No Tier 2 Refferals!</Text>
            ) : (
              <>
                <FlatList
                  refreshing={loading}
                  onRefresh={getTierUsers}
                  data={activeIndex == 2 ? inTier1Array : inTier2Array}
                  keyExtractor={item => item.id}
                  renderItem={item => {
                    // console.log(item);
                    return (
                      <View
                        style={[
                          global.row,
                          {
                            justifyContent: 'space-between',
                            marginVertical: wp(3),
                          },
                        ]}>
                        <Image
                          source={
                            item.item.photo
                              ? {
                                  uri: `${baseURL}/photoUploads/${item.item.photo}`,
                                }
                              : images.profile
                          }
                          style={styles.tempmail}
                        />
                        <TouchableOpacity
                          onPress={() => {
                            handleGetUserDetails(item.item);
                          }}>
                          <SuperText
                            value={`${item.item.name}`}
                            medium
                            color={colors.BLUE2}
                            size={wp(3.5)}
                            style={{width: wp(50)}}
                          />
                        </TouchableOpacity>
                        {/* {pingLoading ? (
                        <ActivityIndicator size={'large'} color={'blue'} />
                      ) : ( */}
                        <TouchableOpacity
                          onPress={() => {
                            handlePing(item.item._id);
                          }}>
                          <View style={styles.pingWrapper}>
                            <Image source={images.bell} />
                            <SuperText
                              value="Ping"
                              medium
                              color={colors.BLACK}
                              size={wp(3.2)}
                            />
                          </View>
                        </TouchableOpacity>
                        {/* )} */}
                        <Image source={images.flag} />
                      </View>
                    );
                  }}
                />
                <FlatList
                  refreshing={loading}
                  onRefresh={getTierUsers}
                  data={activeIndex == 2 ? tier1Array : tier2Array}
                  keyExtractor={item => item.id}
                  renderItem={item => {
                    // console.log(item);
                    return (
                      <View
                        style={[
                          global.row,
                          {
                            justifyContent: 'space-between',
                            marginVertical: wp(3),
                          },
                        ]}>
                        <Image
                          source={
                            item.item.photo
                              ? {
                                  uri: `${baseURL}/photoUploads/${item.item.photo}`,
                                }
                              : images.profile
                          }
                          style={styles.tempmail}
                        />
                        <TouchableOpacity
                          onPress={() => {
                            handleGetUserDetails(item.item);
                          }}>
                          <SuperText
                            value={`${item.item.name}`}
                            medium
                            color={colors.BLUE2}
                            size={wp(3.5)}
                            style={{width: wp(50)}}
                          />
                        </TouchableOpacity>
                        {/* {pingLoading ? (
                        <ActivityIndicator size={'large'} color={'blue'} />
                      ) : ( */}
                        <TouchableOpacity
                          onPress={() => {
                            // handlePing(item.item._id);
                          }}>
                          <View
                            style={[
                              {
                                borderColor: colors.GREEN2,
                                borderWidth: 1,
                                paddingVertical: 3,
                                paddingHorizontal: 5,
                                borderRadius: 100,
                              },
                            ]}>
                            {/* <Image source={images.bell} /> */}
                            <SuperText
                              value="Online"
                              medium
                              color={colors.GREEN2}
                              size={wp(3.2)}
                            />
                          </View>
                          {/* <Image source={images.greentick} /> */}
                        </TouchableOpacity>
                        {/* )} */}
                        <Image source={images.flag} />
                      </View>
                    );
                  }}
                />
              </>
            )}
          </>
        )}
      </View>
    );
  };

  return (
    <>
      <LinearGradient
        colors={[colors.GRADIENT1, colors.GRADIENT2]}
        style={styles.gradient}
        start={{x: 0, y: 0.4}}
        end={{x: 1.6, y: 0}}>
        <Header
          screenName="search"
          onChangeIndex={index => {
            props.setactiveIndex(index);
          }}
        />
        <Spacer space={wp(2)} />
        <View style={styles.searchWrapper}>
          <Image source={images.search} />
          <TextInput
            value={searchText}
            style={[styles.input, {color: 'black'}]}
            placeholder="Search for users"
            placeholderTextColor={colors.GRAY6}
            onChangeText={handleSearch}
          />
        </View>
      </LinearGradient>
      <View style={styles.subView}>
        <Spacer space={wp(2)} />
        <View style={[styles.swithWrapper, global.shadow]}>
          <Switch
            id={1}
            activeIndex={activeIndex}
            label="Contacts"
            icon={images.contact}
            onPress={() => {
              setactiveIndex(1);
            }}
          />
          <Switch
            id={2}
            activeIndex={activeIndex}
            label="Tier 1"
            icon={images.tier1}
            onPress={() => {
              setactiveIndex(2);
            }}
          />
          <Switch
            id={3}
            activeIndex={activeIndex}
            label="Tier 2"
            icon={images.tier2}
            onPress={() => {
              setactiveIndex(3);
            }}
          />
        </View>
        <Spacer space={wp(2)} />
        {activeIndex == 1 ? <ContactsComponent /> : <Tier />}
      </View>
    </>
  );
};

export default Search;
