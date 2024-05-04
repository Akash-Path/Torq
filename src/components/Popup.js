import {
  Alert,
  Image,
  ImageBackground,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactNativeModal from "react-native-modal";
import { colors } from "../res/colors";
import { hp, wp } from "../res/constants";
import { images } from "../res/images";
import { isIphoneX } from "react-native-iphone-x-helper";
import { global } from "../res/global";
import SuperText from "./SuperText";
import Spacer from "./Spacer";
import { useNavigation } from "@react-navigation/native";
import { getInfo, homeDetails } from "../api/homePageApi";
import { useUser } from "../../context/UserContext";
import { Animated } from "react-native";
import Svg, { Circle } from "react-native-svg";
import Rotate360 from "./RotateLogo";

function Menu(props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[global.row, styles.listWrapper]}
    >
      <Image source={props.icon} />
      <Spacer row={wp(3)} />
      <SuperText
        value={props.label}
        mMedium
        color={colors.BLACK}
        size={wp(3.8)}
      />
    </TouchableOpacity>
  );
}
let timer;
const Popup = (props) => {
  const navigation = useNavigation();
  const { popupClicked } = useUser();

  const openWeb = useCallback(async (url) => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);
    await Linking.openURL(url);
  });

  const [stakedBalance, setstakedBalance] = useState(0);
  const [stakedPeriod, setstakedPeriod] = useState(0);
  const [timeRemaining, settimeRemaining] = useState("");
  const [currentEarningRate, setcurrentEarningRate] = useState(0);
  function convertToSeconds(timeString) {
    const parts = timeString.split(/\s+/);
    let totalSeconds = 0;
    for (const part of parts) {
      if (part.includes("h")) {
        const hours = parseInt(part.replace("h", ""));
        totalSeconds += hours * 3600;
      } else if (part.includes("m")) {
        const minutes = parseInt(part.replace("m", ""));
        totalSeconds += minutes * 60;
      }
    }

    return totalSeconds;
  }

  function convertToTimeFormat(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    let timeFormat = "";
    if (hours !== 0) {
      timeFormat += `${hours}h`;
    }
    if (minutes !== 0) {
      timeFormat += ` ${minutes}m`;
    }

    return timeFormat.trim();
  }

  const timeReduceFunction = () => {
    timer = setInterval(async () => {
      settimeRemaining((prevSeconds) => {
        if (prevSeconds <= -3600) {
          clearInterval(timer);
          return prevSeconds;
        }
        return prevSeconds - 1;
      });
    }, 1000);
  };

  const handleGetInfo = async () => {
    try {
      const response = await getInfo();
      if (response == 404) {
        console.log("Error while getting response!");
      } else {
        setstakedBalance(response?.data?.stakedBalance);
        setstakedPeriod(response?.data?.stakings);

        //settimeRemaining(convertToSeconds('4h'))
        settimeRemaining(convertToSeconds(response?.data?.timeRemaining));
        timeReduceFunction();

        console.log(response?.data?.timeRemaining, "time");
        const response2 = await homeDetails();
        if (response2 == 404) {
          setcurrentEarningRate(0);
          console.log("error getting current earning rate in popup component");
        } else {
          setcurrentEarningRate(response2?.data?.currentEarningRate);
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    handleGetInfo();
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    //handleGetInfo();

    return () => clearInterval(timer);
  }, [popupClicked]);

  return (
    <ReactNativeModal
      isVisible={props.isModalVisible}
      onDismiss={props.onDismiss}
      avoidKeyboard
      backdropOpacity={0.5}
      onBackdropPress={() => {
        props.onDismiss();
      }}
      animationIn="fadeIn"
      animationOut="fadeOut"
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
      style={{ margin: 0, flex: 1, justifyContent: "flex-end" }}
    >
      {props.type == "menu" ? (
        <ImageBackground
          source={images.popupBg}
          style={styles.container}
          resizeMode="contain"
        >
          <Rotate360 timeRemaining={timeRemaining} />

          <View
            style={{
              height: wp(62),
              justifyContent: "space-between",
              paddingVertical: wp(1),
              alignSelf: "center",
            }}
          >
            <View
              style={[
                global.row,
                {
                  justifyContent: "space-between",
                  width: wp(65),
                  alignSelf: "center",
                },
              ]}
            >
              <View style={{ alignItems: "center", width: wp(25) }}>
                <Image source={images.time} />
                <Spacer space={wp(0.5)} />
                {/* <SuperText
                  value="Time Left"
                  regular
                  color={colors.BLACK}
                  size={wp(3.2)}
                /> */}
                {/* <CircularGreenAnimation/> */}
                <SuperText
                  // value={`${timeRemaining.replaceAll("-", "")}`}
                  value={`${convertToTimeFormat(timeRemaining)}`}
                  medium
                  color={colors.BLACK}
                  size={wp(3.5)}
                />
              </View>
              <View style={styles.border} />
              <View style={{ alignItems: "center", width: wp(25) }}>
                <Image source={images.earning} />
                <Spacer space={wp(0.5)} />
                <SuperText
                  value="Earning Rate"
                  regular
                  color={colors.BLACK}
                  size={wp(3.2)}
                />
                <SuperText
                  value={`+${currentEarningRate} Torq`}
                  medium
                  color={colors.BLACK}
                  size={wp(3.5)}
                />
              </View>
            </View>
            <View
              style={[
                global.row,
                {
                  justifyContent: "space-between",
                  width: wp(65),
                  alignSelf: "center",
                },
              ]}
            >
              <View style={{ alignItems: "center", width: wp(25) }}>
                <Image source={images.time} />
                <Spacer space={wp(0.5)} />
                <SuperText
                  value="Stakings"
                  regular
                  color={colors.BLACK}
                  size={wp(3.2)}
                />
                <SuperText
                  value={`${stakedPeriod}`}
                  medium
                  color={colors.BLACK}
                  size={wp(3.5)}
                />
              </View>
              <View style={styles.border} />
              <TouchableOpacity
                onPress={() => {
                  // navigation.navigate("");
                }}
              >
                <View style={{ alignItems: "center", width: wp(25) }}>
                  <Image source={images.staked} />
                  <Spacer space={wp(0.5)} />
                  <SuperText
                    value="Staked Balance"
                    regular
                    color={colors.BLACK}
                    size={wp(3.2)}
                  />
                  <SuperText
                    value={`${(stakedBalance / 1).toFixed(3)} torq`}
                    medium
                    color={colors.BLACK}
                    size={wp(3.5)}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            onPress={props.onDismiss}
            style={{
              position: "absolute",
              width: wp(16),
              height: wp(16),
              alignSelf: "center",
              bottom: 0,
            }}
          ></TouchableOpacity>
        </ImageBackground>
      ) : props.type == "leftMenu" ? (
        <View style={styles.leftMenuWrapper}>
          <TouchableOpacity
            style={{ alignSelf: "flex-end" }}
            onPress={() => {
              props.onDismiss();
            }}
          >
            <Image source={images.cross} />
          </TouchableOpacity>
          <Menu
            onPress={() => {
              navigation.navigate("EarningCal");
              props.onDismiss();
            }}
            label="Earning Calculator"
            icon={images.leftMenu1}
          />
          <Menu
            onPress={() => {
              navigation.navigate("DailyBonus");
              props.onDismiss();
            }}
            label="Bonus"
            icon={images.leftMenu2}
          />
          <Menu
            onPress={() => {
              navigation.navigate("States");
              props.onDismiss();
            }}
            label="Stats"
            icon={images.leftMenu3}
          />
          <Menu
            onPress={() => {
              navigation.navigate("PreStalking");
              props.onDismiss();
            }}
            label="Staking"
            icon={images.leftMenu4}
          />
          <Menu
            onPress={() => {
              navigation.navigate("Share");
              props.onDismiss();
            }}
            label="QR"
            icon={images.leftMenu5}
          />
        </View>
      ) : (
        <View style={styles.rightMenuWrapper}>
          <TouchableOpacity
            style={{ alignSelf: "flex-end" }}
            onPress={() => {
              props.onDismiss();
            }}
          >
            <Image source={images.cross} />
          </TouchableOpacity>
          <Menu
            onPress={() => {
              openWeb("https://twitter.com/TheTorqNetwork");
            }}
            label="X"
            icon={images.rightMenu1}
          />
          <Menu
            onPress={() => {
              openWeb("https://t.me/TheTorqNetwork");
            }}
            label="Telegram"
            icon={images.rightMenu2}
          />
          <Menu
            onPress={() => {
              openWeb("https://instagram.com/TheTorqNetwork");
            }}
            label="Instagram"
            icon={images.rightMenu3}
          />
          <Menu
            onPress={() => {
              openWeb("https://whatsapp.com/channel/0029VaTd019C1Fu2d0rFtq2n");
            }}
            label="WhatsApp"
            icon={images.whatsapp1}
          />
          <Menu
            onPress={() => {
              openWeb("https://torqnetwork.com/");
            }}
            label="Website"
            icon={images.rightMenu4}
          />
          <Menu
            onPress={() => {
              openWeb("");
            }}
            label="LinkedIn"
            icon={images.rightMenu5}
          />
        </View>
      )}
    </ReactNativeModal>
  );
};

export default Popup;

const styles = StyleSheet.create({
  container: {
    width: wp(100),
    height: wp(100),
    marginBottom: isIphoneX() ? hp(4) : hp(3),
    padding: wp(5),
  },
  border: {
    width: 1,
    height: wp(20),
    backgroundColor: colors.GRAY6,
  },
  leftMenuWrapper: {
    backgroundColor: colors.WHITE,
    borderRadius: wp(4),
    padding: wp(7),
    borderBottomLeftRadius: 0,
    marginBottom: isIphoneX() ? hp(4) : hp(3),
    alignSelf: "flex-start",
    marginLeft: wp(4),
  },
  rightMenuWrapper: {
    backgroundColor: colors.WHITE,
    borderRadius: wp(4),
    padding: wp(7),
    borderBottomRightRadius: 0,
    marginBottom: isIphoneX() ? hp(4) : hp(3),
    alignSelf: "flex-end",
    marginRight: wp(4),
  },
  listWrapper: {
    borderBottomWidth: 1,
    borderColor: colors.GRAY11,
    paddingVertical: wp(3),
    width: wp(40),
  },
  menu: {
    width: 100, // Adjust width as needed
    height: 50, // Adjust height as needed
  },
});

// const CircularGreenAnimation = ({ radius }) => {
//   const animation = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.loop(
//       Animated.timing(animation, {
//         toValue: 1,
//         duration: 2000,
//         useNativeDriver: true,
//       })
//     ).start();
//   }, []);

//   const strokeWidth = 10;

//   return (
//     <Svg height={2 * radius} width={2 * radius}>
//       <Circle
//         cx={radius}
//         cy={radius}
//         r={radius - strokeWidth / 2}
//         fill="none"
//         stroke="green"
//         strokeWidth={strokeWidth}
//         strokeDasharray={`${Math.PI * (radius - strokeWidth / 2) * 2}, ${Math.PI * (radius - strokeWidth / 2) * 2}`}
//         strokeDashoffset={animation.interpolate({
//           inputRange: [0, 1],
//           outputRange: [0, Math.PI * (radius - strokeWidth / 2) * 2],
//         })}
//       />
//     </Svg>
//   );
// };
