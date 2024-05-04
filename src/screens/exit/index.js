import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  NativeModules,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  View,
  BackHandler,
  Linking,
} from "react-native";
import React, { useEffect, useId, useState } from "react";
import { styles } from "./style";
import LinearGradient from "react-native-linear-gradient";
import { colors } from "../../res/colors";
import SuperText from "../../components/SuperText";
import { hp, wp } from "../../res/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import Spacer from "../../components/Spacer";
import { images } from "../../res/images";
import { isIphoneX } from "react-native-iphone-x-helper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { global } from "../../res/global";
import { login, loginGoogle, loginGoogleCallback } from "../../api/authApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getApp, setLogLevel } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import "../../../firebase.config";
import { GetFCMToken, getNotifications } from "../../api/notifications";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { LoginManager, AccessToken } from "react-native-fbsdk-next";
import Loader from "../../components/Loader";
import auth from "@react-native-firebase/auth";
import { applyActionCode } from "firebase/auth";
// import { TwitterSignIn } from "react-native-twitter-signin";

// const { RNTwitterSignIn } = NativeModules;

// const { RNTwitterSignIn } = NativeModules;

const Exit = (props) => {
  const [secureTextEntry, setScureTextEntry] = useState(true);

  const [loading, setIsLoading] = useState(false);

  // const handleLogin = async () => {
  //   try {
  //     if (email && password) {
  //       setIsLoading(true);
  //       const token = await GetFCMToken();
  //       console.log("got the fcm token : ", token);
  //       const data = {
  //         email: email.toLowerCase(),
  //         password,
  //         provider: "email",
  //         fcmToken: token ? token : "",
  //       };
  //       const response = await login(data);
  //       if (response == 404) {
  //         console.log("error in login take some actions here!");
  //         Alert.alert(
  //           "Cannot login",
  //           "Please check you credentials and try again"
  //         );
  //         setIsLoading(false);
  //       } else {
  //         console.log("user data is : ", response.data);
  //         await AsyncStorage.setItem(
  //           "user",
  //           JSON.stringify(response?.data?.user)
  //         );
  //         await AsyncStorage.setItem(
  //           "pushNotificationStatus",
  //           JSON.stringify(response?.data?.user?.enableNotification)
  //         );
  //         await AsyncStorage.setItem(
  //           "emailNotificationStatus",
  //           JSON.stringify(response?.data?.user?.enableEmailNotification)
  //         );
  //         await AsyncStorage.setItem("token", response?.data?.token);
  //         await AsyncStorage.setItem("profilepic", response?.data?.user?.photo);
  //         await AsyncStorage.setItem("provider", "email");
  //         setIsLoading(false);
  //         props.navigation.replace("AppNavigation");
  //       }
  //     } else {
  //       Alert.alert("Fill all fields first");
  //     }
  //   } catch (error) {
  //     console.log("error in login method in screen login");
  //     console.log(error);
  //   }
  // };

  const handleExitApp = () => {
    BackHandler.exitApp();
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.GRADIENT1, colors.GRADIENT2]}
        style={styles.gradient}
        start={{ x: 0, y: 0.4 }}
        end={{ x: 1.6, y: 0 }}
      >
        {!isIphoneX() && <Spacer space={wp(2)} />}
        <SafeAreaView style={{ alignItems: "center" }}>
          <SuperText value="" medium color={colors.WHITE} size={wp(5)} />
        </SafeAreaView>
        <Spacer space={isIphoneX() ? wp(2) : wp(5)} />
      </LinearGradient>

      <KeyboardAwareScrollView
        contentContainerStyle={{ flex: 1 }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        style={styles.subView}
      >
        <View
          style={{
            alignItems: "center",
            paddingHorizontal: 5,
            // backgroundColor: "red",
          }}
        >
          <Spacer space={wp(2)} />
          <Image source={images.logo} style={styles.logo} />
          <Spacer space={wp(1)} />
          <SuperText
            value="Maintenance & Launch Update"
            semiBold
            color={colors.BLACK}
            size={hp(2.5)}
          />
          {/* <SuperText
            value="Application under maintenance, Our app testing was a hit, thanks to your feedback. We’re now fine-tuning for the big launch. Stay tuned!"
            regular
            color={colors.GRAY}
            size={hp(1.8)}
          /> */}
          <Spacer space={wp(1)} />
          <SuperText
            value={`We’re thrilled to announce the successful completion of our pre-release application testing phase, thanks to the invaluable feedback from our dedicated users. The Torq Network is now entering a brief maintenance period to implement your suggestions and enhance our platform. Your patience is appreciated as we perfect our service for the official launch. Stay tuned for the big reveal!\n\nIf you've any questions or want to stay updated about our official release date which is coming very soon, JUST FOLLOW US ON TWITTER`}
            regular
            color={colors.GRAY}
            size={hp(2.0)}
            style={{
              textAlign: "center", // Center text horizontally
              alignSelf: "center", // Center text vertically
            }}
          />
        </View>
        {/* <Input
          label="Email"
          placeholder="Enter Your Email"
          icon={images.mail}
          stateHandler={setEmail}
        />
        <Input
          stateHandler={setPassword}
          onRightClick={() => {
            setScureTextEntry(!secureTextEntry);
          }}
          secureTextEntry={secureTextEntry}
          label="Password"
          placeholder="Enter Your Password"
          icon={images.ic_password}
          rightIcon={secureTextEntry ? images.eyeHide : images.eyeOpen}
        />
        <Spacer space={wp(1)} />
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("ForgotPassword");
          }}
          style={{ alignSelf: "flex-end", marginRight: wp(5) }}
        >
          <SuperText
            value="Forgot Password?"
            semiBold
            color={colors.YELLOW}
            size={wp(3.2)}
          />
        </TouchableOpacity> */}
        <View
          style={{
            // flex: 1,
            paddingVertical: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              width: hp(6),
              height: hp(6),
              backgroundColor: "#f6f6f6",
              borderRadius: hp(2),
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => Linking.openURL("https://x.com/TheTorqNetwork")}
          >
            <Image
              source={images.x_logo}
              style={[
                styles.socialIcon,
                { width: hp(3), height: hp(3), borderRadius: 100 },
              ]}
            />
          </TouchableOpacity>
        </View>

        <Spacer space={hp(1)} />

        {loading ? (
          <ActivityIndicator size={"large"} color={colors.GRADIENT1} />
        ) : (
          <Button
            onPress={() => {
              handleExitApp();
            }}
            label="Exit"
          />
        )}

        {/* <Spacer space={hp(2)} />
        <View
          style={[
            global.row,
            {
              justifyContent: "space-between",
              width: wp(80),
              alignSelf: "center",
            },
          ]}
        >
          <View style={styles.border} />
          <SuperText
            value="OR LOGIN WITH"
            medium
            color={colors.GRAY}
            size={wp(3)}
          />
          <View style={styles.border} />
        </View>
        <Spacer space={hp(2)} />
        <View
          style={[
            global.row,
            {
              justifyContent: "space-around",
              width: wp(70),
              alignSelf: "center",
            },
          ]}
        >
          {googleLoading ? (
            <ActivityIndicator size={"large"} color={colors.GRADIENT1} />
          ) : (
            <TouchableOpacity onPress={handleGoogle}>
              <Image source={images.google} style={styles.socialIcon} />
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={handleFacebook}>
            <Image source={images.fb} style={styles.socialIcon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: hp(6),
              height: hp(6),
              backgroundColor: "#f6f6f6",
              borderRadius: hp(2),
              justifyContent: "center",
              alignItems: "center",
            }}
            // onPress={handleTwitter}
          >
            <Image
              source={images.x_logo}
              style={[
                styles.socialIcon,
                { width: hp(3), height: hp(3), borderRadius: 100 },
              ]}
            />
          </TouchableOpacity>
        </View>
        <Spacer space={hp(2)} />
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("SignUp");
          }}
          style={[global.row, { alignSelf: "center" }]}
        >
          <SuperText
            value="Don’t have an account?"
            medium
            color={colors.BLACK}
            size={wp(3.4)}
          />
          <Spacer row={wp(0.5)} />
          <SuperText
            value="Sign Up"
            medium
            color={colors.BLUE}
            size={wp(3.4)}
          />
        </TouchableOpacity> */}
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Exit;
