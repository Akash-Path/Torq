import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { colors } from "../res/colors";
import { hp, wp } from "../res/constants";
import { images } from "../res/images";
import { isIphoneX } from "react-native-iphone-x-helper";
import Home from "../screens/home";
import { global } from "../res/global";
import EarningCal from "../screens/earningCal";
import Popup from "../components/Popup";
import { getInfo, startMining } from "../api/homePageApi";
import { useUser } from "../../context/UserContext";
import Rotate360 from "../components/RotateLogo";
import SuperText from "../components/SuperText";

const Tab = createBottomTabNavigator();

let timer;
export default function BottomNavigation(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLeftMenuVisible, setIsLeftMenuVisible] = useState(false);
  const [isRightMenuVisible, setIsRightMenuVisible] = useState(false);
  const [timeRemaining, settimeRemaining] = useState("");
  const [isTimeSet, setIsTimeSet] = useState(false);
  const { togglePopupClicked, toggleMiningStart } = useUser();

  function convertToSeconds(timeString) {
    const parts = timeString.split(/\s+/);
    let totalSeconds = 0;
    for (const part of parts) {
      if (part.includes("h")) {
        const hours = parseInt(part.replace("h", ""));
        totalSeconds += hours * 3600;
      } else if (part.includes("m")) {
        // Extract minutes and convert to seconds
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
    // Alert.alert('time reducer from bottom navigation')
    clearInterval(timer);
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
      console.log(
        "bottom navigation handle info**1 " + JSON.stringify(response)
      );
      if (response == 404) {
        console.log("Error while getting response!");
        toggleMiningStart(false);
      } else {
        let timeRemaining = response?.data?.timeRemaining;
        settimeRemaining(convertToSeconds(timeRemaining));
        //settimeRemaining(convertToSeconds('4h'))
        setIsTimeSet(true);
        timeReduceFunction();

        if (timeRemaining) {
          toggleMiningStart(true);
        } else {
          toggleMiningStart(false);
        }
      }
    } catch (error) {
      console.log("bottom navigation handle info**error1" + error);
      toggleMiningStart(false);
    }
  };

  const handleStartMining = async () => {
    const response = await startMining();
    await togglePopupClicked();
    await toggleMiningStart(true);
    if (response == 404) {
      //Alert.alert("cannot start mining session");
      handleGetInfo();
      setIsModalVisible(true);
    } else {
      console.log("started session");
      console.log(response.data);
      handleGetInfo();
      // setIsModalVisible(true);
    }
  };

  const options = {
    headerShown: false,
    tabBarStyle: styles.tab,
  };
  useEffect(() => {
    handleGetInfo();
    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* for testing time of pop up */}
      {/* <SuperText
                  value={`${convertToTimeFormat(timeRemaining)}`}
                  medium
                  color={colors.BLACK}
                  size={wp(3.5)}
                /> */}
      <Popup
        type="menu"
        isModalVisible={isModalVisible}
        onDismiss={() => {
          setIsModalVisible(false);
        }}
      />
      <Popup
        type="leftMenu"
        isModalVisible={isLeftMenuVisible}
        onDismiss={() => {
          setIsLeftMenuVisible(false);
        }}
      />
      <Popup
        type="rightMenu"
        isModalVisible={isRightMenuVisible}
        onDismiss={() => {
          setIsRightMenuVisible(false);
        }}
      />
      <Tab.Navigator screenOptions={options}>
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              <TouchableOpacity
                onPress={() => {
                  setIsLeftMenuVisible(true);
                }}
                style={{ alignItems: "center" }}
              >
                <Image source={images.menu1} style={styles.icon} />
              </TouchableOpacity>
            ),
          }}
          name="Home"
          component={Home}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              <TouchableOpacity
                onPress={() => {
                  handleStartMining();
                }}
                style={[styles.logoWrapper, global.shadow]}
              >
                {/* <Image source={images.logo}  /> */}
                <Rotate360
                  isDashboard={true}
                  timeRemaining={timeRemaining}
                  isTimeSet={isTimeSet}
                />
              </TouchableOpacity>
            ),
          }}
          name="Logo"
          component={Home}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              <TouchableOpacity
                onPress={() => {
                  setIsRightMenuVisible(true);
                }}
                style={{ alignItems: "center" }}
              >
                <Image source={images.menu2} style={styles.icon} />
              </TouchableOpacity>
            ),
          }}
          name="History"
          component={EarningCal}
        />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  tab: {
    height: hp(10),
    backgroundColor: colors.WHITE,
    paddingBottom: isIphoneX() ? hp(2) : 0,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 12.0,
    elevation: 24,
    borderTopLeftRadius: wp(4.5),
    borderTopRightRadius: wp(4.5),
  },
  icon: {
    width: wp(10),
    height: wp(10),
    resizeMode: "contain",
  },
  largeIcon: {
    width: wp(16),
    height: wp(16),
    resizeMode: "contain",
  },
  logoWrapper: {
    backgroundColor: colors.WHITE,
    padding: wp(1),
    borderRadius: wp(10),
    top: -hp(3),
  },
});
