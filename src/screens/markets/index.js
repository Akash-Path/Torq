import React, {useEffect, useState} from 'react';
import {styles} from './style';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../res/colors';
import Header from '../../components/Header';
import Spacer from '../../components/Spacer';
import {data, wp} from '../../res/constants';
import SuperText from '../../components/SuperText';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {global} from '../../res/global';
import {images} from '../../res/images';
import {LineChart} from 'react-native-gifted-charts';
import {globalStats, marketsData} from '../../api/marketApi';
import {coins} from '../../res/coins';

const Markets = props => {
  const [coinData, setCoinData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getMarketStats = async () => {
    setLoading(true);
    try {
      const response = await marketsData();
      if (response == 404) {
        console.log('cannot get data from market stats');
      } else {
        console.log(response.data.data);
        setCoinData(response.data.data);
      }
    } catch (error) {
      console.log('error is getting merket stats', error);
    }
    setLoading(false);
  };

  const [totalMerketCap, setTotalMarketCap] = useState(0);
  const [merketSentiment, setMarketSentiment] = useState('');
  const [
    total_volume_24h_yesterday_percentage_change,
    settotal_volume_24h_yesterday_percentage_change,
  ] = useState(0);
  const [total_volume_24h, settotal_volume_24h] = useState(0);
  const [
    total_market_cap_yesterday_percentage_change,
    settotal_market_cap_yesterday_percentage_change,
  ] = useState(0);
  const [change24, setChange24] = useState(0);
  const [change7d, setChange7d] = useState(0);

  const getGlobalStats = async () => {
    setLoading(true);
    const response = await globalStats();
    if (response == 404) {
      console.log('cannot get global stats');
    } else {
      console.log(response.data.data);
      setTotalMarketCap(response.data.data.total_market_cap);
      settotal_volume_24h(response.data.data.total_volume_24h);
      settotal_volume_24h_yesterday_percentage_change(
        response.data.data.total_volume_24h_yesterday_percentage_change,
      );
      settotal_market_cap_yesterday_percentage_change(
        response.data.data.total_market_cap_yesterday_percentage_change,
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    getMarketStats();
    getGlobalStats();
  }, []);

  const dataChart = [
    {value: 0},
    {value: 70},
    {value: 50},
    {value: 50},
    {value: 0},
    {value: 80},
    {value: 90},
  ];

  return (
    <>
      <LinearGradient
        colors={[colors.GRADIENT1, colors.GRADIENT2]}
        style={styles.gradient}
        start={{x: 0, y: 0.4}}
        end={{x: 1.6, y: 0}}>
        <Header
        screenName="market"
          onChangeIndex={index => {
            props.setactiveIndex(index);
          }}
        />
        <Spacer space={wp(2)} />
        <SuperText
          value="Markets"
          medium
          color={colors.WHITE}
          size={wp(5)}
          style={{alignSelf: 'center'}}
        />
      </LinearGradient>
      <View style={styles.subView}>
        <View style={[styles.mainWrapper, global.shadow]}>
          <View>
            <SuperText
              value="Total Market Cap"
              medium
              color={colors.BLACK}
              size={wp(3.5)}
            />
            <Spacer space={wp(0.2)} />
            <SuperText
              value={`$${(totalMerketCap / 1000000000000).toFixed(2)} Trillion`}
              medium
              color={colors.GRADIENT1}
              size={wp(3.8)}
            />
            <View style={styles.bottomBorder} />
            <SuperText
              value="24h Cap Change"
              medium
              color={colors.BLACK}
              size={wp(3.5)}
            />
            <Spacer space={wp(0.2)} />
            <SuperText
              value={`${(
                total_market_cap_yesterday_percentage_change / 1
              ).toFixed(2)}%`}
              medium
              color={colors.GRADIENT1}
              size={wp(3.8)}
            />
          </View>
          <View style={styles.border} />
          <View>
            <SuperText
              value="Total Volume"
              medium
              color={colors.BLACK}
              size={wp(3.5)}
            />
            <Spacer space={wp(0.2)} />
            <SuperText
              value={`$${(total_volume_24h / 1000000000).toFixed(2)}B`}
              medium
              color={colors.GRADIENT1}
              size={wp(3.8)}
            />
            <View style={styles.bottomBorder} />
            <SuperText
              value="24h Volume Change"
              medium
              color={colors.BLACK}
              size={wp(3.5)}
            />
            <Spacer space={wp(0.2)} />
            <SuperText
              value={`${(
                total_volume_24h_yesterday_percentage_change / 1
              ).toFixed(2)}%`}
              medium
              color={colors.GRADIENT1}
              size={wp(3.8)}
            />
          </View>
        </View>
        <Spacer space={wp(2)} />
        {/* <FlatList data={[...new Array(5).keys()]} keyExtractor={(item) => item.id} */}
        {loading ? (
          <ActivityIndicator size={'large'} color={colors.GRADIENT1} />
        ) : (
          <FlatList
            data={coinData}
            keyExtractor={item => item.id}
            renderItem={item => {
              const imguri =
                item.item.code == 'BTC'
                  ? coins.BTC
                  : item.item.code == 'ETH'
                  ? coins.ETH
                  : item.item.code == 'BNB'
                  ? coins.BNB
                  : item.item.code == 'SOL'
                  ? coins.SOL
                  : item.item.code == 'XRP'
                  ? coins.XRP
                  : item.item.code == 'ADA'
                  ? coins.ADA
                  : item.item.code == 'DOGE'
                  ? coins.DOGE
                  : item.item.code == 'AVAX'
                  ? coins.AVAX
                  : item.item.code == 'TRX'
                  ? coins.TRX
                  : item.item.code == 'DAI'
                  ? coins.DAI
                  : item.item.code == 'DOT'
                  ? coins.DOT
                  : item.item.code == 'LINK'
                  ? coins.LINK
                  : item.item.code == 'MATIC'
                  ? coins.MATIC
                  : item.item.code == 'SHIB'
                  ? coins.SHIB
                  : item.item.code == 'LTC'
                  ? coins.LTC
                  : item.item.code == 'ICP'
                  ? coins.ICP
                  : item.item.code == 'BCH'
                  ? coins.BCH
                  : item.item.code == 'ATOM'
                  ? coins.ATOM
                  : item.item.code == 'UNI'
                  ? coins.UNI
                  : item.item.code == 'OP'
                  ? coins.OP
                  : '';
              return (
                <View
                  style={[
                    global.row,
                    {
                      justifyContent: 'space-between',
                      marginHorizontal: wp(4),
                      marginVertical: wp(2),
                    },
                  ]}>
                  <Image source={{uri: imguri}} style={styles.icon} />
                  <View style={{}}>
                    <SuperText
                      value={`${item.item.code}`}
                      medium
                      color={colors.BLUE2}
                      size={wp(3.8)}
                    />
                    <SuperText
                      value={`$${(item.item.cap / 1000000000).toFixed(2)}B`}
                      regular
                      color={colors.GRAY5}
                      size={wp(3.6)}
                    />
                  </View>
                  <View
                    width={wp(30)}
                    minWidth={wp(30)}
                    style={{width: wp(30)}}>
                    <LineChart
                      data={dataChart}
                      width={wp(20)}
                      height={wp(6)}
                      color1={colors.BLUE4}
                      hideAxesAndRules
                      adjustToWidth
                      hideDataPoints1
                      curved
                      bezier
                    />
                  </View>
                  <View style={{alignItems: 'flex-end'}}>
                    <SuperText
                      value={`$${(item.item.rate / 1).toFixed(2)}`}
                      medium
                      color={colors.BLUE2}
                      size={wp(3.8)}
                    />
                    <SuperText
                      value={`${(item.item.delta['day'] / 1).toFixed(2)}%`}
                      regular
                      color={colors.BLUE4}
                      size={wp(3.5)}
                    />
                  </View>
                </View>
              );
            }}
          />
        )}
      </View>
    </>
  );
};

export default Markets;
