import React, { useCallback, useEffect, useState } from "react";
import { styles } from "./style";
import LinearGradient from "react-native-linear-gradient";
import { colors } from "../../res/colors";
import Header from "../../components/Header";
import Spacer from "../../components/Spacer";
import {
  legalSettings,
  profileSettings,
  supportSettings,
  wp,
} from "../../res/constants";
import SuperText from "../../components/SuperText";
import {
  Alert,
  FlatList,
  Image,
  Linking,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { global } from "../../res/global";
import { images } from "../../res/images";
import { LinkingContext, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { deleteAccount } from "../../api/homePageApi";
import ToggleSwitch from "toggle-switch-react-native";
import {
  toggleEmailNotification,
  toggleNotification,
} from "../../api/notifications";
import { useUser } from "../../../context/UserContext";

const Settings = (props) => {
  const openWeb = useCallback(async (url) => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);
    await Linking.openURL(url);
  });

  const [isEnabledPushNotifications, setIsEnabledPushNotification] =
    useState(false);
  const [isEnabledEmailNotifications, setIsEnabledEmailNotification] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const logout = async () => {
    console.log("logout");
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("token");
    await toggleMiningStart(false);
    navigation.replace("Login");
  };

  const { kycStatus, toggleMiningStart } = useUser();

  const showConfirmation = async () => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to proceed?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            console.log("OK Pressed");
            await handleDeleteAccount();
          },
        },
      ]
      //   {cancelable: false},  ensures that the popup cannot be dismissed by tapping outside of it or by pressing the hardware back button (on Android)
    );
  };

  const handleDeleteAccount = async () => {
    console.log("delete account");
    await deleteAccount();
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("token");
    navigation.replace("Login");
  };

  const handleGotoKycScreen = async () => {
    console.log("go to kyc screen");
    Alert.alert("Kyc feature is coming soon.");
    // console.log('status is : ', kycStatus);
    // if (
    //   kycStatus == 'pending' ||
    //   kycStatus == 'rejected' ||
    //   kycStatus == 'verified'
    // ) {
    //   navigation.navigate('KycStatus', {kycStatus: kycStatus});
    // } else {
    //   navigation.navigate('PersonalDetails');
    // }
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          item.id == 8 && navigation.navigate("Share");
          item.id == 1 && handleGotoKycScreen();
          item.id == 5 && openWeb("https://torqnetwork.com/terms");
          item.id == 6 && openWeb("https://torqnetwork.com/privacy");
          item.id == 7 && openWeb(`mailto:feedback@torqnetwork.com`);
          item.id == 9 && showConfirmation();
          item.id == 10 && logout();
        }}
        style={styles.listWrapper}
      >
        <Image source={item.image} />
        <View style={{ width: wp(70) }}>
          <SuperText
            value={item.title}
            mBold
            color={colors.BLUE2}
            size={wp(4)}
          />
          <SuperText
            value={item.desc}
            regular
            color={colors.BLUE2}
            size={wp(3.5)}
          />
        </View>
        <Image source={images.arrowRight} />
      </TouchableOpacity>
    );
  };

  const checkNotificationStatus = async () => {
    const notify = await AsyncStorage.getItem("pushNotificationStatus");
    const notifyEmail = await AsyncStorage.getItem("emailNotificationStatus");
    const notifyEmailData = JSON.parse(notifyEmail);
    const notifydata = JSON.parse(notify);
    console.log("notify data is : ", notifydata);
    console.log("notify email data is : ", notifyEmailData);
    setIsEnabledEmailNotification(notifyEmailData);
    setIsEnabledPushNotification(notifydata);
  };

  const handleToggleNotifications = async () => {
    setLoading(true);
    console.log("here ");
    const response = await toggleNotification();
    console.log(response);
    console.log("here 2");
    if (response == 404) {
      console.log("resonse is 404 in toggle notifications");
      setLoading(false);
    } else {
      console.log("resp data from toggle notifications is : ");
      console.log(response.data);
      await AsyncStorage.setItem(
        "pushNotificationStatus",
        JSON.stringify(!isEnabledPushNotifications)
      );
      setIsEnabledPushNotification(!isEnabledPushNotifications);
      console.log("set to : ", !isEnabledPushNotifications);
      setLoading(false);
    }
  };
  const handleToggleEmailNotifications = async () => {
    setLoading(true);
    console.log("here ");
    const response = await toggleEmailNotification();
    console.log(response);
    console.log("here 2");
    if (response == 404) {
      console.log("resonse is 404 in toggle email notifications");
      setLoading(false);
    } else {
      console.log("resp data from toggle email notifications is : ");
      console.log(response.data);
      await AsyncStorage.setItem(
        "emailNotificationStatus",
        JSON.stringify(!isEnabledEmailNotifications)
      );
      console.log("set to : ", !isEnabledEmailNotifications);
      setIsEnabledEmailNotification(!isEnabledEmailNotifications);
      // setIsEnabledPushNotification(!isEnabledPushNotifications);
      setLoading(false);
    }
  };

  const ToggleItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => {}} style={styles.listWrapper}>
        <Image source={item.image} />
        <View style={{ width: wp(70) }}>
          <SuperText
            value={item.title}
            mBold
            color={colors.BLUE2}
            size={wp(4)}
          />
          <SuperText
            value={item.desc}
            regular
            color={colors.BLUE2}
            size={wp(3.5)}
          />
        </View>
        <ToggleSwitch
          isOn={
            item.title == "Push Notifications"
              ? isEnabledPushNotifications
              : isEnabledEmailNotifications
          }
          onColor="green"
          offColor="grey"
          size="medium"
          onToggle={async (isOn) => {
            item.title == "Push Notifications" ? (
              // Alert.alert(
              //   'Confirmation',
              //   'Are you sure you want to proceed?',
              //   [
              //     {
              //       text: 'Cancel',
              //       onPress: () => console.log('Cancel Pressed'),
              //       style: 'cancel',
              //     },
              //     {
              //       text: 'OK',
              //       onPress: async () => {
              //         console.log('OK Pressed');
              //         await handleToggleNotifications();
              //       },
              //     },
              //   ],
              //   //   {cancelable: false},  ensures that the popup cannot be dismissed by tapping outside of it or by pressing the hardware back button (on Android)
              // )
              await handleToggleNotifications()
            ) : (
              <>{await handleToggleEmailNotifications()}</>
            );
          }}
        />
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    checkNotificationStatus();
  }, []);

  return (
    <>
      <LinearGradient
        colors={[colors.GRADIENT1, colors.GRADIENT2]}
        style={styles.gradient}
        start={{ x: 0, y: 0.4 }}
        end={{ x: 1.6, y: 0 }}
      >
        <Header
          onChangeIndex={(index) => {
            props.setactiveIndex(index);
          }}
        />
        <Spacer space={wp(2)} />
        <View
          style={[
            global.row,
            { justifyContent: "space-between", paddingHorizontal: wp(5) },
          ]}
        >
          <TouchableOpacity onPress={props.onBack} style={{ width: wp(20) }}>
            <Image source={images.back} />
          </TouchableOpacity>
          <SuperText
            value="Settings"
            medium
            color={colors.WHITE}
            size={wp(5)}
            style={{ alignSelf: "center" }}
          />
          <TouchableOpacity
            style={[global.row, { width: wp(20), justifyContent: "flex-end" }]}
          >
            <Image source={images.us} />
            <SuperText
              value="EN"
              medium
              color={colors.WHITE}
              size={wp(4)}
              style={{ marginLeft: wp(1.5) }}
            />
            <Image source={images.arrowDown} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
      <ScrollView style={styles.subView}>
        <Spacer space={wp(2)} />
        <SuperText
          value="PROFILE"
          mSemiBold
          color={colors.BLACK}
          size={wp(4)}
          style={{ marginLeft: wp(4) }}
        />
        <Spacer space={wp(1)} />
        <FlatList
          data={profileSettings}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
        <ToggleItem
          item={{
            id: 2,
            title: "Push Notifications",
            desc: "Customize your push notification settings.",
            image: images.pushNoti,
          }}
        />
        <ToggleItem
          item={{
            id: 3,
            title: "Email Notifications",
            desc: "Customize your email notification settings.",
            image: images.emailNoti,
          }}
        />
        <Spacer space={wp(2)} />
        <SuperText
          value="LEGAL"
          mSemiBold
          color={colors.BLACK}
          size={wp(4)}
          style={{ marginLeft: wp(4) }}
        />
        <Spacer space={wp(1)} />
        <FlatList
          data={legalSettings}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
        <Spacer space={wp(2)} />
        <SuperText
          value="SUPPORT"
          mSemiBold
          color={colors.BLACK}
          size={wp(4)}
          style={{ marginLeft: wp(4) }}
        />
        <Spacer space={wp(1)} />
        <FlatList
          data={supportSettings}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </ScrollView>
    </>
  );
};

export default Settings;
