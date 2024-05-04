import React, {useCallback, useEffect, useState} from 'react';
import {styles} from './style';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../res/colors';
import Header from '../../components/Header';
import Spacer from '../../components/Spacer';
import {hp, wp} from '../../res/constants';
import SuperText from '../../components/SuperText';
import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  Linking,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
// import DatePicker from 'react-native-date-picker';
// import RNDateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import {global} from '../../res/global';
import {images} from '../../res/images';
import {
  balanceHistory,
  balanceHistoryOfSpecificDate,
  getUserBurningCards,
  homeDetails,
} from '../../api/homePageApi';

const BalanceHistory = props => {
  const [activeIndex, setactiveIndex] = useState(0);

  const onViewableItemsChanged = ({viewableItems, changed}) => {
    setactiveIndex(changed[0].index);
  };

  const [date, setDate] = useState(new Date());

  const [datepickervalue, setDatepickervalue] = useState(dayjs);

  const [balance, setbalance] = useState(0);

  const [loading, setLoading] = useState(false);

  const getHomeDeatils = async () => {
    setLoading(true);
    console.log('first');
    const response = await homeDetails();
    if (response == 404) {
      Alert.alert('Cannot get your data!');
      console.log('error code is : 404');
      setLoading(false);
    } else {
      console.log(response.data);
      setbalance(response?.data?.availableBalance);
      setLoading(false);
    }
  };

  const [dayOld, setdayOld] = useState([]);
  const [monthOld, setmonthOld] = useState([]);
  const [weekOld, setweekOld] = useState([]);

  const [dayActive, setDayActive] = useState(true);
  const [monthActive, setMonthActive] = useState(false);
  const [weekActive, setWeekActive] = useState(false);
  const [dateActive, setDateActive] = useState(false);

  const [targetArray, settargetArray] = useState([]);
  const [targetArray2, settargetArray2] = useState([]);

  const [isHistory, setIsHistory] = useState(true);
  const [isBurninig, setIsBurning] = useState(false);

  const handleIsHistory = () => {
    console.log('history');
    setIsHistory(true);
    setIsBurning(false);
    handlebalanceHistory();
  };

  const handleIsBurning = () => {
    console.log('hello');
    setIsHistory(false);
    setIsBurning(true);
    handleGetBurningCards();
  };

  const handlebalanceHistory = async () => {
    const response = await balanceHistory();
    if (response == 404) {
      console.log('error in balanceHistory UI');
    } else {
      console.log(response.data);
      //   console.log("is")
      setdayOld(response?.data?.dayOld);
      setmonthOld(response?.data?.monthOld);
      setweekOld(response?.data?.weekOld);
      settargetArray(response?.data?.dayOld.reverse());
      settargetArray2([]);
    }
  };

  const handleGetBurningCards = async () => {
    const response = await getUserBurningCards();
    if (response == 404) {
      console.log('error in burning UI');
    } else {
      console.log(response.data);
      console.log('is burning');
      // setBurningCards(response?.data?.burningCards);
      settargetArray2(response?.data?.burningCards);
    }
  };

  const handleDayActive = () => {
    console.log('day');
    setDayActive(true);
    setMonthActive(false);
    setWeekActive(false);
    settargetArray(dayOld.reverse());
  };

  const handleWeekActive = () => {
    console.log('week');
    setDayActive(false);
    setMonthActive(false);
    setWeekActive(true);
    settargetArray(weekOld.reverse());
  };

  const handleMonthActive = () => {
    setDayActive(false);
    setMonthActive(true);
    setWeekActive(false);
    settargetArray(monthOld.reverse());
    console.log('month');
  };

  const openWeb = useCallback(async url => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);
    await Linking.openURL(url);
  });
  const [isdatePicker, setIsDatePicker] = useState(false);
  const toggleDatePicker = () => {
    if (isdatePicker) {
      handleGetdataFromDate();
    }
    setIsDatePicker(!isdatePicker);
  };

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    console.warn('A date has been picked: ', date);
    hideDatePicker();
  };

  const handleGetdataFromDate = async () => {
    console.log('here');
    console.log((datepickervalue + '').split('T'));
    const nowdata = new Date(datepickervalue);
    console.log(nowdata.toISOString().split('T')[0]);
    const data = {
      date: nowdata.toISOString().split('T')[0],
    };
    console.log(data);
    const response = await balanceHistoryOfSpecificDate(data);
    console.log(response);
    // console.log(response.data)
    setDayActive(false);
    setMonthActive(false);
    setWeekActive(false);
    settargetArray(response?.specificDate);
    // settargetArray(response?.data?.specificDate);
  };

  useEffect(() => {
    handlebalanceHistory();
    getHomeDeatils();
  }, []);

  return (
    <>
      <LinearGradient
        colors={[colors.GRADIENT1, colors.GRADIENT2]}
        style={styles.gradient}
        start={{x: 0, y: 0.4}}
        end={{x: 1.6, y: 0}}>
        <Header
          onChangeIndex={index => {
            props.setactiveIndex(index);
          }}
        />
        <Spacer space={wp(2)} />
        <View
          style={[
            global.row,
            {justifyContent: 'space-between', paddingHorizontal: wp(5)},
          ]}>
          <TouchableOpacity
            onPress={() => {
              props.setactiveIndex(1);
            }}
            style={{width: wp(20)}}>
            <Image source={images.back} />
          </TouchableOpacity>
          <SuperText
            value="Balance History"
            medium
            color={colors.WHITE}
            size={wp(5)}
            style={{alignSelf: 'center'}}
          />
          <View style={{width: wp(20)}} />
        </View>
      </LinearGradient>
      <View style={styles.subView}>
        <Spacer space={wp(2)} />
        <View>
          <ImageBackground
            source={images.balanceBg}
            style={[styles.mainWrapper]}
            resizeMode="contain">
            <FlatList
              data={[...new Array(1).keys()]}
              pagingEnabled
              horizontal
              showsHorizontalScrollIndicator={false}
              onViewableItemsChanged={onViewableItemsChanged}
              viewabilityConfig={{
                itemVisiblePercentThreshold: 50,
              }}
              renderItem={() => {
                return (
                  <View
                    style={{
                      width: wp(85),
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      padding: wp(5),
                    }}>
                    <View style={{alignItems: 'center'}}>
                      <TouchableOpacity
                        style={{alignItems: 'center'}}
                        onPress={handleIsHistory}>
                        <Image source={images.wallet} />
                        <Spacer space={wp(0.5)} />
                        <SuperText
                          value="WALLET"
                          regular
                          color={colors.WHITE}
                          size={wp(3.5)}
                        />
                        <View style={{flexDirection: 'row'}}>
                          <SuperText
                            value={`${(balance / 1).toFixed(2)}`}
                            medium
                            color={colors.WHITE}
                            size={wp(3)}
                          />
                          {/* <SuperText
                          value="0"
                          medium
                          color={colors.WHITE}
                          size={wp(2.5)}
                        /> */}
                          <SuperText
                            value=" Torq"
                            medium
                            color={colors.WHITE}
                            size={wp(3)}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.border} />
                    <TouchableOpacity
                      onPress={() => {
                        handleIsBurning();
                      }}>
                      <View style={{alignItems: 'center'}}>
                        <Image
                          source={images.burnings}
                          style={{
                            width: hp(6),
                            height: hp(6),
                            borderRadius: 100,
                          }}
                        />
                        <Spacer space={wp(0.5)} />
                        <SuperText
                          value="BURNING"
                          regular
                          color={colors.WHITE}
                          size={wp(3.5)}
                        />
                        {/* <View style={{flexDirection: 'row'}}>
                        <SuperText
                          value="104. "
                          medium
                          color={colors.WHITE}
                          size={wp(3)}
                        />
                        <SuperText
                        value="09"
                        medium
                        color={colors.WHITE}
                        size={wp(2.5)}
                        />
                        <SuperText
                        value=" Torq"
                        medium
                        color={colors.WHITE}
                        size={wp(3)}
                        />
                      </View> */}
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </ImageBackground>
          {/* <View style={styles.pagination}>
            <View
              style={[
                styles.dot,
                activeIndex == 0 && {backgroundColor: colors.WHITE},
              ]}
            />
            <View
              style={[
                styles.dot,
                activeIndex == 1 && {backgroundColor: colors.WHITE},
              ]}
            />
          </View> */}
        </View>
        <Spacer space={wp(2)} />
        {isHistory ? (
          <View style={[global.row, {width: wp(85), alignSelf: 'center'}]}>
            <TouchableOpacity
              onPress={() => {
                toggleDatePicker();
              }}>
              {/* <DatePicker date={date} onDateChange={setDate} /> */}
              <LinearGradient
                colors={[colors.GRADIENT1, colors.GRADIENT2]}
                start={{x: 0, y: 0.4}}
                end={{x: 1.6, y: 0}}
                style={styles.btn}>
                <Image source={images.calendar} />
                <Spacer row={wp(0.8)} />
                <SuperText
                  value="Choose date"
                  medium
                  color={colors.WHITE}
                  size={wp(3)}
                />
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.btn,
                {backgroundColor: dayActive ? colors.BLUE3 : colors.GRAY10},
              ]}
              onPress={() => {
                handleDayActive();
              }}>
              <SuperText
                value="1 Day"
                medium
                color={dayActive ? colors.WHITE : colors.GRAY5}
                size={wp(3)}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleWeekActive();
              }}
              style={[
                styles.btn,
                {backgroundColor: weekActive ? colors.BLUE3 : colors.GRAY10},
              ]}>
              <SuperText
                value="1 Weak"
                medium
                color={weekActive && weekActive ? colors.WHITE : colors.GRAY5}
                size={wp(3)}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleMonthActive();
              }}
              style={[
                styles.btn,
                {backgroundColor: monthActive ? colors.BLUE3 : colors.GRAY10},
              ]}>
              <SuperText
                value="1 Month"
                medium
                color={monthActive ? colors.WHITE : colors.GRAY5}
                size={wp(3)}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <></>
        )}

        <Spacer space={wp(2)} />
        {/* <View
          style={[
            global.row,
            {justifyContent: 'space-between', marginHorizontal: wp(8)},
          ]}>
          <View style={global.row}>
            <Image source={images.calendar} tintColor={colors.GRAY5} />
            <Spacer row={wp(0.5)} />
            <SuperText
              value="Dec 07 , 2023"
              medium
              color={colors.GRAY5}
              size={wp(3.5)}
            />
          </View>
          <View style={global.row}>
            <Image source={images.star} />
            <Spacer row={wp(0.5)} />
            <SuperText
              value="-75.02%"
              medium
              color={colors.GRAY5}
              size={wp(3.5)}
            />
          </View>
          <View style={global.row}>
            <SuperText value="-0." medium color={colors.GRAY5} size={wp(3.5)} />
            <SuperText value="45" medium color={colors.GRAY5} size={wp(2.5)} />
            <SuperText
              value=" Torq"
              medium
              color={colors.GRAY5}
              size={wp(3.5)}
            />
          </View>
        </View> */}
        <Spacer space={wp(2)} />

        {isdatePicker ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: wp('80%'),
                backgroundColor: 'black',
                borderRadius: 10,
              }}>
              <DateTimePicker
                mode="single"
                date={datepickervalue}
                onChange={params => {
                  setDatepickervalue(params.date);
                  let currentdata = params.date;
                  console.log(currentdata);
                }}
              />
            </View>
          </View>
        ) : (
          <ScrollView>
            <>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                {isHistory && targetArray?.length == 0 ? (
                  <SuperText
                    value={`No data to display`}
                    medium
                    color={colors.BLACK}
                    size={wp(4)}
                  />
                ) : (
                  ''
                )}
                {isBurninig && targetArray2?.length == 0 ? (
                  <SuperText
                    value={`No data to display`}
                    medium
                    color={colors.BLACK}
                    size={wp(4)}
                  />
                ) : (
                  ''
                )}
              </View>
            </>
            {isHistory &&
              targetArray?.map(item => {
                let time = [];

                console.log(item.time);
                const dateString = item.time;

                // Regular expression to match date components
                const dateRegex =
                  /(\d{1,2})\/(\d{1,2})\/(\d{2}), (\d{1,2}):(\d{2}) (AM|PM)/;

                // Extract date components using regex
                const [, month, day, year, hours, minutes, ampm] =
                  dateString.match(dateRegex);

                // Convert year to full year
                const fullYear = parseInt(year) + 2000; // Assuming all years are in the 21st century

                // Convert hours to 24-hour format
                let parsedHours = parseInt(hours);
                if (ampm === 'PM' && parsedHours !== 12) {
                  parsedHours += 12;
                } else if (ampm === 'AM' && parsedHours === 12) {
                  parsedHours = 0;
                }

                // Create a Date object
                let date = new Date(
                  fullYear,
                  month - 1,
                  day,
                  parsedHours,
                  minutes,
                );

                // Get the timezone offset in minutes
                const timezoneOffset = date.getTimezoneOffset();

                // Adjust the date for timezone difference
                date = new Date(date.getTime() - timezoneOffset * 60 * 1000);

                // Get the local date and time
                const localDate = date.toLocaleString();

                console.log('this : ', localDate);
                time = localDate.split(',');
                console.log(' is : ', localDate);

                return (
                  <View style={[global.shadow, styles.earningWrapper]}>
                    <Image source={images.bulb} />
                    <SuperText
                      value={`${item.earning}         Torq`}
                      medium
                      color={colors.BLACK}
                      size={wp(4)}
                    />
                    <SuperText
                      value={`+${(item.percentage / 1).toFixed(2)}%`}
                      medium
                      color={colors.BLUE3}
                      size={wp(4)}
                    />
                    <View style={global.row}>
                      <Image source={images.clock} />
                      <Spacer row={wp(1)} />
                      <View style={{}}>
                        <SuperText
                          // value={`${item.time}`}
                          value={`${time[0]}`}
                          // value={`${item.time.split(',')[0]}`}
                          regular
                          color={colors.BLACK}
                          size={wp(3.5)}
                        />
                        <SuperText
                          // value={`${item.time}`}
                          value={`${time[1]}`}
                          // value={`${item.time.split(',')[1]}`}
                          regular
                          color={colors.BLACK}
                          size={wp(3.5)}
                        />
                      </View>
                    </View>
                  </View>
                );
              })}
            {isBurninig &&
              targetArray2?.map(item => {
                const dateString = new Date(item.createdAt);
                console.log(dateString.toLocaleString());
                let time = dateString.toLocaleString().split(',');

                return (
                  <View style={[global.shadow, styles.earningWrapper]}>
                    <Image source={images.bulb} />
                    <SuperText
                      value={`- ${item.amount}`}
                      medium
                      color={'red'}
                      size={wp(4)}
                    />
                    <SuperText
                      value={`Torq`}
                      medium
                      color={colors.BLACK}
                      size={wp(4)}
                    />
                    <View style={global.row}>
                      <Image source={images.clock} />
                      <Spacer row={wp(1)} />
                      <View style={{}}>
                        <SuperText
                          // value={`${item.time}`}
                          value={`${time[0]}`}
                          // value={`${item.time.split(',')[0]}`}
                          regular
                          color={colors.BLACK}
                          size={wp(3.5)}
                        />
                        <SuperText
                          // value={`${item.time}`}
                          value={`${time[1]}`}
                          // value={`${item.time.split(',')[1]}`}
                          regular
                          color={colors.BLACK}
                          size={wp(3.5)}
                        />
                      </View>
                    </View>
                  </View>
                );
              })}
          </ScrollView>
        )}
        <Spacer space={wp(4)} />
      </View>
    </>
  );
};

export default BalanceHistory;
