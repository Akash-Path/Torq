import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  Share,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./style";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../res/images";
import LinearGradient from "react-native-linear-gradient";
import { colors } from "../../res/colors";
import { hp, wp } from "../../res/constants";
import Spacer from "../../components/Spacer";
import SliderView from "../../components/SliderView";
import SuperText from "../../components/SuperText";
import { isIphoneX } from "react-native-iphone-x-helper";
import Header from "../../components/Header";
import Notifications from "../notifications";
import Profile from "../profile";
import Search from "../search";
import Carousel from "react-native-reanimated-carousel";
import { global } from "../../res/global";
import { BarChart, LineChart, PieChart } from "react-native-gifted-charts";
import Markets from "../markets";
import BalanceHistory from "../balanceHistory";
import * as Progress from "react-native-progress";
import StepIndicator from "react-native-step-indicator";
import VerticalStepIndicator from "../../components/VerticalStep";
import {
  GestureHandlerRootView,
  NativeViewGestureHandler,
  ScrollView,
} from "react-native-gesture-handler";
import { getConstants, homeDetails } from "../../api/homePageApi";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../../../context/UserContext";
import StakingHistory from "../stakingHistory";
import { getKycStatus } from "../../api/kycApi";
import { getProgress } from "../../api/progressApi";

const window = Dimensions.get("window");
const PAGE_WIDTH = window.width;

const Home = (props) => {
  const [activeIndex, setactiveIndex] = useState(1);

  const [invitationCode, setInvitaitonCode] = useState("");
  const [availableBalance, setAvailableBalance] = useState(0);
  const [bonusOfReferral, setBonusOfReferral] = useState(0);
  const [coins, setcoins] = useState(0);
  const [currentEarningRate, setcurrentEarningRate] = useState(0);
  const [daysOff, setdaysOff] = useState(0);
  const [hourlyEarnings, sethourlyEarnings] = useState([]);
  const [rank, setrank] = useState(0);
  const [stakingBalance, setstakingBalance] = useState(0);
  const [streak, setstreak] = useState(0);
  const [tier1Referrals, settier1Referrals] = useState(0);
  const [tier2Referrals, settier2Referrals] = useState(0);
  const [bonusWheelBonus, setbonusWheelBonus] = useState(0);
  const [miningSessions, setMeinigSessions] = [];

  const [userProgress, setUserProgress] = useState({});
  const [progressPoint, setProgressPoint] = useState(0);

  const navigation = useNavigation();
  const [photoUrl, setPhotoUrl] = useState("");

  const [loading, setLoading] = useState(false);

  const getHomeDeatils = async () => {
    setLoading(true);
    console.log("first");
    const response = await homeDetails();
    if (response == 401) {
      Alert.alert("Login in Again!", "Login Session Expired");
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("profilepic");
      setLoading(false);
      navigation.navigate("Login");
      return;
    }
    if (response == 404) {
      Alert.alert("Cannot get your data!");
      console.log("error code is : 404");
      setLoading(false);
    } else {
      console.log(response.data);
      setAvailableBalance(response?.data?.availableBalance);
      setBonusOfReferral(response?.data?.bonusOfReferral);
      setcoins(response?.data?.coins);
      setcurrentEarningRate(response?.data?.currentEarningRate);
      setdaysOff(response?.data?.daysOff);
      setrank(response?.data?.rank);
      setGlobalRank(response?.data?.rank);
      sethourlyEarnings(response?.data?.hourlyEarnings);
      setstakingBalance(response?.data?.stakingBalance);
      setstreak(response?.data?.streak);
      settier1Referrals(response?.data?.tier1Referrals);
      settier2Referrals(response?.data?.tier2Referrals);
      setbonusWheelBonus(response?.data?.bonusWheelBonus);
      //   setMeinigSessions(response?.data?.miningSessions);
      const KYCstatus = await getKycStatus();
      const trqConstants = await getConstants();
      const userdata = await AsyncStorage.getItem("user");
      console.log(response.data);
      const user = JSON.parse(userdata);
      console.log("user is ", user);
      console.log("constants are : ", trqConstants.data);
      console.log("kyc data is : ", KYCstatus.data);
      await handleGetProgress();
      setKycStatus(KYCstatus?.data?.status);
      setTorqConstants(trqConstants?.data?.constantTerms);
      setPhotoUrl(user.photo);
      setInvitaitonCode(user.invitationCode);
      console.log("photo is here ");
      console.log(user.photo);

      setLoading(false);
    }
  };

  const handleGetProgress = async () => {
    const response = await getProgress();
    if (response == 404) {
      console.log("error is : 404");
    } else {
      console.log("response for get progress : ");
      console.log(response.data);
      setUserProgress(response?.data?.progress);
      let totalpoints = 0;
      let photo = response?.data?.progress?.addedPhoto;
      let earning = response?.data?.progress?.startedEarning;
      let twitterF = response?.data?.progress?.followedOnTwitter;
      let teleF = response?.data?.progress?.followedOnTelegram;
      let instaF = response?.data?.progress?.followedOnInstagram;
      let whatsappJ = response?.data?.progress?.joinOnWhatsApp;
      let invite5 = response?.data?.progress?.invitedFriends;
      let reviewOnPlayStore = response?.data?.progress?.reviewOnPlayStore;

      // if (
      //   photo ||
      //   earning ||
      //   twitterF ||
      //   teleF ||
      //   invite5 ||
      //   instaF ||
      //   whatsappJ ||
      //   reviewOnPlayStore
      // ) {
      //   totalpoints = 2;
      // }

      // if (
      //   (photo && earning) ||
      //   (photo && twitterF) ||
      //   (photo && teleF) ||
      //   (photo && invite5)
      // ) {
      //   totalpoints = 4;
      // }

      // if (
      //   (photo && earning && twitterF) ||
      //   (photo && earning && teleF) ||
      //   (photo && earning && invite5)
      // ) {
      //   totalpoints = 6;
      // }

      // if (
      //   (photo && earning && twitterF && teleF) ||
      //   (photo && earning && twitterF && invite5)
      // ) {
      //   totalpoints = 8;
      // }

      // if (
      //   (photo && earning && twitterF && teleF && invite5) ||
      //   (photo && earning && teleF && invite5 && instaF) ||
      //   (photo && earning && invite5 && instaF && whatsappJ) ||
      //   (photo && earning && instaF && whatsappJ && reviewOnPlayStore)
      // ) {
      //   totalpoints = 10;
      // }

      // if (
      //   (photo && earning && twitterF && teleF && invite5 && instaF) ||
      //   (photo && earning && teleF && invite5 && instaF && whatsappJ) ||
      //   (photo &&
      //     earning &&
      //     invite5 &&
      //     instaF &&
      //     whatsappJ &&
      //     reviewOnPlayStore)
      // ) {
      //   totalpoints = 12;
      // }

      // if (
      //   (photo &&
      //     earning &&
      //     twitterF &&
      //     teleF &&
      //     invite5 &&
      //     instaF &&
      //     whatsappJ) ||
      //   (photo &&
      //     earning &&
      //     teleF &&
      //     invite5 &&
      //     instaF &&
      //     whatsappJ &&
      //     reviewOnPlayStore)
      // ) {
      //   totalpoints = 14;
      // }

      // if (
      //   photo &&
      //   earning &&
      //   twitterF &&
      //   teleF &&
      //   invite5 &&
      //   instaF &&
      //   whatsappJ &&
      //   reviewOnPlayStore
      // ) {
      //   totalpoints = 16;
      // }

      // setProgressPoint(totalpoints);

      // return;

      // Count the number of completed tasks
      let completedTasks = 0;
      if (photo) completedTasks++;
      if (earning) completedTasks++;
      if (twitterF) completedTasks++;
      if (teleF) completedTasks++;
      if (invite5) completedTasks++;
      if (instaF) completedTasks++;
      if (whatsappJ) completedTasks++;
      if (reviewOnPlayStore) completedTasks++;

      // Calculate total points based on completed tasks
      totalpoints = completedTasks * 2;

      setProgressPoint(totalpoints);

      return;

      // if (response?.data?.progress?.addedPhoto && response?.data?.progress?.startedEarning &&  && response?.data?.progress.followedOnTelegram && response?.data?.progress.followedOnTwitter) {
      //   setProgressPoint(10);
      // }
    }
  };

  const {
    popupClicked,
    setGlobalRank,
    torqConstants,
    setTorqConstants,
    kycStatus,
    setKycStatus,
  } = useUser();

  useEffect(() => {
    // console.log("context value is : ", popupClicked);
    getHomeDeatils();
  }, [popupClicked]);

  const [mode, setMode] = React.useState("horizontal");
  const [snapDirection, setSnapDirection] = React.useState("left");

  const animationConfig = React.useMemo(() => {
    const basic = {
      mode,
      snapDirection,
    };
    if (mode === "vertical") {
      return {
        ...basic,
        stackInterval: 8,
      };
    }
    return basic;
  }, [mode, snapDirection]);

  const labels = [
    "Cart",
    "Delivery Address",
    "Order Summary",
    "Payment Method",
    "Track",
  ];
  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: "#fe7013",
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: "#fe7013",
    stepStrokeUnFinishedColor: "#aaaaaa",
    separatorFinishedColor: "#fe7013",
    separatorUnFinishedColor: "#aaaaaa",
    stepIndicatorFinishedColor: "#fe7013",
    stepIndicatorUnFinishedColor: "#ffffff",
    stepIndicatorCurrentColor: "#ffffff",
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: "#fe7013",
    stepIndicatorLabelFinishedColor: "#ffffff",
    stepIndicatorLabelUnFinishedColor: "#aaaaaa",
    labelColor: "#999999",
    labelSize: 13,
    currentStepLabelColor: "#fe7013",
  };

  const data = [
    { value: 50, label: "12/12" },
    { value: 80, label: "12/12" },
    { value: 90, label: "12/12" },
    { value: 70, label: "12/12" },
    { value: 50, label: "12/12" },
    { value: 70, label: "12/12" },
    { value: 80, label: "12/12" },
  ];

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Join Torq Network with this invitation code and get early access!\n Code: ${invitationCode}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const Overview = () => {
    return (
      <View>
        <SuperText
          value="OVERVIEW"
          mSemiBold
          color={colors.BLACK}
          size={wp(4)}
        />
        <Carousel
          style={{
            height: wp(70),
            width: PAGE_WIDTH,
            alignSelf: "center",
            justifyContent: "center",
          }}
          pagingEnabled={true}
          loop={true}
          width={wp(85)}
          autoPlay={false}
          autoPlayReverse={false}
          modeConfig={{
            showLength: 4,
            opacityInterval: 0.2,
          }}
          data={[...new Array(3).keys()]}
          animationConfig={animationConfig}
          defaultIndex={2}
          renderItem={({ index }) => {
            return (
              <View style={{ marginVertical: wp(12), flex: 1 }}>
                <View style={[styles.sliderContainer, global.shadow]}>
                  {index == 0 ? (
                    <>
                      <Spacer space={wp(3)} />
                      <SuperText
                        value="REFERRALS"
                        mSemiBold
                        color={colors.BLACK}
                        size={wp(3.5)}
                      />
                      <Spacer space={wp(2)} />
                      <View style={[global.row]}>
                        <View style={{ alignItems: "center" }}>
                          <SuperText
                            value={tier1Referrals}
                            mBold
                            color={colors.BLACK}
                            size={wp(8)}
                          />
                          <SuperText
                            value={`USERS TIER 1`}
                            mRegular
                            color={colors.BLACK3}
                            size={wp(4)}
                          />
                        </View>
                        <Spacer row={wp(2)} />
                        <View style={{ alignItems: "center" }}>
                          <SuperText
                            value={tier2Referrals}
                            mBold
                            color={colors.BLACK}
                            size={wp(8)}
                          />
                          <SuperText
                            value="USERS TIER 2"
                            mRegular
                            color={colors.BLACK3}
                            size={wp(4)}
                          />
                        </View>
                      </View>
                      <Spacer space={wp(2)} />
                      <SuperText
                        value="Referral stats for the previous 5 days."
                        mSemiBold
                        color={colors.BLUE4}
                        size={wp(3.5)}
                      />
                    </>
                  ) : index == 1 ? (
                    <>
                      <Spacer space={wp(3)} />
                      <SuperText
                        value="TORQ STAR"
                        mSemiBold
                        color={colors.BLACK}
                        size={wp(3.5)}
                      />
                      <Spacer space={wp(1)} />
                      <SuperText
                        value={`${rank}`}
                        mBold
                        color={colors.BLACK}
                        size={wp(8)}
                      />
                      <Spacer space={wp(1)} />
                      <SuperText
                        value="GLOBAL RANK"
                        mRegular
                        color={colors.BLACK3}
                        size={wp(3.5)}
                      />
                      <Spacer space={wp(2)} />
                      <SuperText
                        value="Refer more users and earn more Torq"
                        mSemiBold
                        color={colors.ORANGE}
                        size={wp(3.5)}
                      />
                    </>
                  ) : (
                    <>
                      <Spacer space={wp(3)} />
                      <SuperText
                        value="GROWTH"
                        mSemiBold
                        color={colors.BLACK}
                        size={wp(3.5)}
                      />
                      <Spacer space={wp(1)} />
                      <BarChart
                        data={data}
                        hideRules
                        frontColor={colors.GRADIENT1}
                        yAxisThickness={0}
                        xAxisThickness={0}
                        barBorderRadius={wp(4)}
                        barWidth={wp(3)}
                        noOfSections={3}
                        height={wp(20)}
                        spacing={wp(5.8)}
                        yAxisTextStyle={styles.text}
                        xAxisLabelTextStyle={styles.text}
                        initialSpacing={wp(4)}
                        disableScroll
                      />
                    </>
                  )}
                </View>
                <Image
                  source={
                    index == 0
                      ? images.trophy
                      : index == 1
                      ? images.torqStar
                      : images.growth
                  }
                  style={styles.torqStar}
                />
              </View>
            );
          }}
        />
      </View>
    );
  };

  const ProgressView = () => {
    return (
      <View>
        <SuperText value="TASKS" mSemiBold color={colors.BLACK} size={wp(4)} />
        <Spacer space={wp(2)} />
        <View style={[global.row]}>
          <View style={{ alignItems: "center" }}>
            <Progress.Circle
              thickness={wp(2)}
              unfilledColor={colors.GRAY11}
              progress={progressPoint / 16}
              size={wp(20)}
              color={colors.GRADIENT1}
              borderWidth={0}
            />
            <View style={{ position: "absolute", marginTop: wp(8) }}>
              <SuperText
                value={`${progressPoint / 2} of 8`}
                mSemiBold
                color={colors.BLACK}
                size={wp(3)}
              />
            </View>
          </View>
          <Spacer row={wp(2)} />
          <View>
            <SuperText
              value="Your progress"
              mSemiBold
              color={colors.BLACK}
              size={wp(4.5)}
            />
            <Spacer space={wp(0.5)} />
            <SuperText
              value="Complete the tasks below and level up!"
              mMedium
              color={colors.GRAY7}
              size={wp(3)}
            />
          </View>
        </View>
        <Spacer space={wp(2)} />
        <VerticalStepIndicator progress={userProgress} props={props} setactiveIndex={setactiveIndex}  />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {activeIndex == 1 ? (
        <>
          <LinearGradient
            colors={[colors.GRADIENT1, colors.GRADIENT2]}
            style={styles.gradient}
            start={{ x: 0, y: 0.4 }}
            end={{ x: 1.6, y: 0 }}
          >
            <Header
              screenName="home"
              onChangeIndex={(index) => {
                setactiveIndex(index);
              }}
              profile={photoUrl}
            />
            <Spacer space={wp(2)} />
          </LinearGradient>
          <GestureHandlerRootView style={styles.subView}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled
            >
              <Spacer space={isIphoneX() ? hp(8) : hp(10)} />
              <Overview />
              <View style={[global.row, { justifyContent: "space-between" }]}>
                <SuperText
                  value="EARNINGS"
                  mSemiBold
                  color={colors.BLACK}
                  size={wp(4)}
                />
                <TouchableOpacity
                  onPress={() => {
                    setactiveIndex(6);
                  }}
                >
                  <SuperText
                    value="view all"
                    mRegular
                    color={colors.BLUE5}
                    size={wp(3.5)}
                  />
                </TouchableOpacity>
              </View>
              <Spacer space={wp(2)} />

              {hourlyEarnings.map((item) => {
                const timestamp = item.time;
                const localdate = new Date(timestamp).toLocaleString();
                // console.log("local date is : ", localdate);
                let time = localdate.split(",");
                // let time = localdate.split('T')[1];
                // time = time.substring(0, 5);
                // let mode = time.substring(0, 2);
                // if (mode > 12) {
                //   console.log('yes ');
                //   mode = mode - 12;
                //   time = `${mode}:${time.substring(0, 2)} Pm`;
                // } else {
                //   time = `${time} Am`;
                // }

                return (
                  <View
                    style={[global.shadow, styles.earningWrapper]}
                    key={item.time}
                  >
                    <Image source={images.bulb} />
                    <SuperText
                      value={`${item.earning}         Torq`}
                      medium
                      color={colors.BLACK}
                      size={wp(4)}
                    />
                    <SuperText
                      value={`+${item.percentage}%`}
                      medium
                      color={colors.BLUE3}
                      size={wp(4)}
                    />
                    <View style={global.row}>
                      <Image source={images.clock} />
                      <Spacer row={wp(1)} />
                      <View style={{}}>
                        <SuperText
                          value={`${time[0]}`}
                          regular
                          color={colors.BLACK}
                          size={wp(3.5)}
                        />
                        <SuperText
                          value={`${time[1]}`}
                          regular
                          color={colors.BLACK}
                          size={wp(3.5)}
                        />
                      </View>
                    </View>
                  </View>
                );
              })}
              <Spacer space={wp(4)} />
              <TouchableOpacity
                // onPress={onShare}
                onPress={() => navigation.navigate("Share")}
                style={[global.shadow, styles.inviteWraper]}
              >
                <Image source={images.invite} style={{ marginTop: -wp(8) }} />
                <Spacer space={wp(2)} />
                <SuperText
                  value="INVITE FRIENDS"
                  mSemiBold
                  color={colors.BLACK}
                  size={wp(4)}
                />
                <Spacer space={wp(1)} />
                <SuperText
                  value="Earn extra Torq by inviting your friends."
                  mMedium
                  color={colors.GRAY7}
                  size={wp(3.5)}
                />
              </TouchableOpacity>
              <Spacer space={wp(4)} />
              <ProgressView />
              <Spacer space={wp(6)} />
            </ScrollView>
          </GestureHandlerRootView>
          <SliderView
            onBalanceClick={() => {
              setactiveIndex(6);
            }}
            onStakingClick={() => {
              setactiveIndex(7);
            }}
            onPress={() => {
              setactiveIndex(6);
            }}
            loading={loading}
            availableBalance={availableBalance}
            streak={streak}
            daysOff={daysOff}
            currentEarningRate={currentEarningRate}
            stakingBalance={stakingBalance}
            coins={coins}
            bonusWheelBonus={bonusWheelBonus}
            bonusOfReferral={bonusOfReferral}
          />
        </>
      ) : activeIndex == 2 ? (
        <Search
          setactiveIndex={(index) => {
            setactiveIndex(index);
          }}
        />
      ) : activeIndex == 3 ? (
        <Markets
          navigation={props.navigation}
          setactiveIndex={(index) => {
            setactiveIndex(index);
          }}
        />
      ) : activeIndex == 4 ? (
        <Notifications
          setactiveIndex={(index) => {
            setactiveIndex(index);
          }}
        />
      ) : activeIndex == 5 ? (
        <Profile
          onPress={() => {
            setactiveIndex(6);
          }}
          navigation={props.navigation}
          setactiveIndex={(index) => {
            setactiveIndex(index);
          }}
        />
      ) : activeIndex == 6 ? (
        <BalanceHistory
          navigation={props.navigation}
          setactiveIndex={(index) => {
            setactiveIndex(index);
          }}
        />
      ) : (
        <StakingHistory
          navigation={props.navigation}
          setactiveIndex={(index) => {
            setactiveIndex(index);
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default Home;
