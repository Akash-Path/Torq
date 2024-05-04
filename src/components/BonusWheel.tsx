import React, { FC, useEffect, useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
  runOnJS,
} from "react-native-reanimated";
import { images } from "../res/images";
import { hp, legalSettings, wp } from "../res/constants";
import { colors } from "../res/colors";
import SuperText from "./SuperText";
import LinearGradient from "react-native-linear-gradient";
import { fonts } from "../res/fonts";
import Spacer from "./Spacer";
import { bonusWheelReward, checkEligibilyForBonusWheel } from "../api/wheelApi";
import { useUser } from "../../context/UserContext";
import { setEnabled } from "react-native/Libraries/Performance/Systrace";
import { sendNotification } from "../api/notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TrackPlayer from "react-native-track-player";

let whelValue = "";

const Wheel = () => {
  return (
    <>
      <View style={styles.circleRow}>
        <View style={[styles.pizza, styles.pizzaRed]}>
          <Text style={[styles.colorText, { color: colors.BLACK }]}>100%</Text>
        </View>
        <View style={[styles.pizza, styles.pizzaBlue]}>
          <Text style={[styles.colorText, { color: colors.BLACK }]}>25%</Text>
        </View>
      </View>
      <View style={styles.circleRow}>
        <View style={[styles.pizza, styles.pizzaGreen]}>
          <Text style={[styles.colorText, { color: colors.BLACK }]}>75%</Text>
        </View>
        <View style={[styles.pizza, styles.pizzaYellow]}>
          <Text style={[styles.colorText, { color: colors.BLACK }]}>50%</Text>
        </View>
      </View>
      <View style={styles.logoWrapper}>
        <Image source={images.logo} style={styles.logo} />
      </View>
    </>
  );
};

const Info: FC<{ currentColor: string; currentAngle: number }> = ({
  currentAngle,
  currentColor,
}) => {
  console.log("current wheel percentage in info component is : ", currentColor);
  whelValue = currentColor;
  return (
    <View style={styles.infoBox}>
      <Text style={styles.text}>Current Value: {currentColor}</Text>
      {/* <Text style={styles.text}>Helloo</Text> */}
    </View>
  );
};

const BonusWheel = () => {
  const rotation = useSharedValue(0);
  const [currentAngle, setCurrentAngle] = useState(rotation.value);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${rotation.value}deg` }],
    };
  });

  const handleAngle = async (value: number) => {
    AsyncStorage.setItem("CurrentAngle", value.toString());
    setCurrentAngle(parseInt(value.toFixed(), 10));
  };

  let currentAmount = "";
  const [iseligible, setIsEligible] = useState(true);

  const hnadleCheckEligibility = async () => {
    const response = await checkEligibilyForBonusWheel();
    if (response == 404) {
      setIsEligible(false);
      console.log("Not eliglble! not available");
    } else {
      if (response.message == "Bonus wheel not available") {
        console.log("actually not availbale");
        setIsEligible(false);
      } else if (
        response.message == "Start a new session to earn bonus wheel!"
      ) {
        console.log("respo is : ");
        console.log(response);
        setIsEligible(false);
      } else {
        console.log("respo is : ");
        console.log(response);
        setIsEligible(true);
      }
    }
  };

  const { popupClicked, togglePopupClicked } = useUser();

  const handleSpinWheel = async () => {
    spinWheel();
    setIsEligible(false);
    setTimeout(async () => {
      const amount = currentAmount;
      // console.log(currentAngle)
      // console.log(amount)
      const data = { amount: whelValue.split("%")[0] };
      console.log("data is : ", data);
      const resp = await bonusWheelReward(data);
      const user: any = await AsyncStorage.getItem("user");
      const userData = await JSON.parse(user);
      if (resp == 404) {
        console.log("cannot spin wheel");
      } else {
        const notifyResp = await sendNotification({
          userId: userData._id,
          notificationType: "wheel",
          data: whelValue.split("%")[0],
        });
        console.log("notification Response : ", notifyResp);
        console.log("reward is : ");
        // console.log(resp);
        console.log(resp.data);
        setIsEligible(false);
        await togglePopupClicked();
      }
    }, 7000);
  };

  const spinWheel = async () => {
    try {
      await TrackPlayer.play();

      const randomAngle = Math.floor(Math.random() * 360) + 3600; // Rotate at least 10 circles (3600 degrees)
      rotation.value = withTiming(
        rotation.value + randomAngle,
        {
          duration: 7000, // Adjust the duration as needed
          easing: Easing.bezier(0.32, 1, 0.32, 1),
        },
        () => runOnJS(handleAngle)(rotation.value % 360)
      );
    } catch (error) {
      console.log("error in track player v1 :" + error);
    }
  };

  const getCurrentColor = () => {
    if (currentAngle < 91) {
      currentAmount = "100%";
      return "100%";
    }
    if (currentAngle < 181) {
      currentAmount = "75%";
      return "75%";
    }
    if (currentAngle < 271) {
      currentAmount = "50%";
      return "50%";
    }
    currentAmount = "25%";
    return "25%";
  };
  const getLocalStrg = async () => {
    let storageAngle = await AsyncStorage.getItem("CurrentAngle");
    setCurrentAngle(parseInt(storageAngle || "0"));
  };

  const fun = async () => {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.add({
      id: "trackId",
      url: require("../assets/sound.mp3"),
      title: "Track Title",
      artist: "Track Artist",
    });
  };

  useEffect(() => {
    fun();
    hnadleCheckEligibility();
    getLocalStrg();
  }, [popupClicked]);

  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ImageBackground
          style={styles.bg}
          source={images.bg}
          resizeMode="contain"
        >
          <ImageBackground style={styles.circleBg} source={images.spinner}>
            <View style={styles.pointer} />
            <View style={{ backgroundColor: "white", borderRadius: wp(32) }}>
              <Animated.View style={[styles.circle, animatedStyles]}>
                <Wheel />
              </Animated.View>
            </View>
          </ImageBackground>
        </ImageBackground>
        <Info currentAngle={currentAngle} currentColor={getCurrentColor()} />
        <TouchableOpacity
          disabled={!iseligible}
          onPress={() => handleSpinWheel()}
        >
          <LinearGradient
            colors={[
              iseligible ? colors.GRADIENT3 : colors.BLACK,
              iseligible ? colors.GRADIENT4 : colors.BLACK,
            ]}
            style={styles.btn}
          >
            <SuperText
              //onPress={() => Alert.alert("hii")}
              value={iseligible ? "Bonus Wheel" : "Not available"}
              medium
              color={colors.WHITE}
              size={wp(4)}
            />
          </LinearGradient>
        </TouchableOpacity>
        {/* {iseligible ? <Text style={{ color: "white" }}>hello</Text> :
                    <SuperText value={"Not eliglble! not available"} medium color={colors.WHITE} size={wp(4)} />
                } */}
        <Text style={{ color: "white" }}>hello</Text>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 16,
    alignSelf: "center",
  },
  infoBox: {
    marginTop: 15,
    height: 28,
    justifyContent: "space-between",
  },
  circleRow: { width: "100%", height: "50%", flexDirection: "row" },
  pizza: { width: "50%", height: "100%", justifyContent: "center" },
  pizzaRed: { backgroundColor: "#FFBF72" },
  pizzaBlue: { backgroundColor: "#F7F7F7" },
  pizzaYellow: { backgroundColor: "#2BB8F5" },
  pizzaGreen: { backgroundColor: "#E712D1" },
  circle: {
    width: wp(64),
    height: wp(64),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: wp(40),
    borderWidth: 2,
    overflow: "hidden",
    borderColor: "#ced4da",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  circleContainer: {
    // width: 300,
    // height: 300,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  pointer: {
    width: 10,
    height: 30,
    backgroundColor: "black",
    position: "absolute",
    top: wp(8),
    borderWidth: 2,
    borderColor: "white",
    zIndex: 6000,
  },
  logoWrapper: {
    position: "absolute",
    backgroundColor: colors.WHITE,
    borderRadius: wp(20),
  },
  logo: {
    width: wp(20),
    height: wp(20),
  },
  circleBg: {
    width: wp(100),
    height: wp(100),
    // justifyContent: 'center',
    paddingTop: wp(11),
    alignItems: "center",
  },
  bg: {
    width: wp(100),
    height: wp(120),
    // justifyContent: 'center',
    paddingTop: wp(17),
    alignItems: "center",
  },
  btn: {
    width: wp(40),
    height: wp(12),
    borderRadius: wp(20),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  colorText: {
    fontSize: wp(4),
    textAlign: "center",
    fontFamily: fonts.MEDIUM,
  },
});

export default BonusWheel;
