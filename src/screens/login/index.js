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

const Login = (props) => {
  const [secureTextEntry, setScureTextEntry] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setIsLoading] = useState(false);

  const [googleLoading, setGoogleLoading] = useState(false);
  const [fbLoading, setFbLoading] = useState(false);
  const [xLoading, setXLoading] = useState(false);

  // const handleNotificationPermissions = async () => {
  // await PermissionsAndroid.request(
  //   PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  //   {
  //     title: 'Notifications',
  //     message: 'This app would like to send you notifications.',
  //     buttonPositive: 'Please accept bare mortal',
  //     buttonNegative: 'Cancel',
  //   },
  // )
  //   .then(res => {
  //     console.log('Permission: ', res);
  //   })
  //   .catch(error => {
  //     console.error('Permission error: ', error);
  //   });

  // if(Platform.OS ==="android"){
  //   try {
  //     PermissionsAndroid.check('android.permission.POST_NOTIFICATIONS').then(
  //       async response => {
  //         console.log("response is post notifications is : ", response)
  //         if(!response){
  //           console.log("yes")
  //           const res = await PermissionsAndroid.request('android.permission.POST_NOTIFICATIONS')
  //         //   {
  //         //     title: 'Notification',
  //         //     message:
  //         //       'App needs access to your notification ' +
  //         //       'so you can get Updates',
  //         //     buttonNeutral: 'Ask Me Later',
  //         //     buttonNegative: 'Cancel',
  //         //     buttonPositive: 'OK',
  //         // }
  //           console.log("res is : ", res);
  //           if(res == "granted"){
  //             await AsyncStorage.setItem("notifyStatus", JSON.stringify(true));
  //           }else{
  //             await AsyncStorage.setItem("notifyStatus", JSON.stringify(false));
  //           }
  //         }
  //       }
  //     ).catch(
  //       err => {
  //         console.log("Notification Error=====>",err);
  //       }
  //     )
  //   } catch (err){
  //     console.log(err);
  //   }
  // }
  // };

  const handleLogin = async () => {
    try {
      if (email && password) {
        setIsLoading(true);
        const token = await GetFCMToken();
        console.log("got the fcm token : ", token);
        const data = {
          email: email.toLowerCase(),
          password,
          provider: "email",
          fcmToken: token ? token : "",
        };
        const response = await login(data);
        if (response == 404) {
          console.log("error in login take some actions here!");
          Alert.alert(
            "Cannot login",
            "Please check you credentials and try again"
          );
          setIsLoading(false);
        } else {
          console.log("user data is : ", response.data);
          await AsyncStorage.setItem(
            "user",
            JSON.stringify(response?.data?.user)
          );
          await AsyncStorage.setItem(
            "pushNotificationStatus",
            JSON.stringify(response?.data?.user?.enableNotification)
          );
          await AsyncStorage.setItem(
            "emailNotificationStatus",
            JSON.stringify(response?.data?.user?.enableEmailNotification)
          );
          await AsyncStorage.setItem("token", response?.data?.token);
          await AsyncStorage.setItem("profilepic", response?.data?.user?.photo);
          await AsyncStorage.setItem("provider", "email");
          setIsLoading(false);
          props.navigation.replace("AppNavigation");
        }
      } else {
        Alert.alert("Fill all fields first");
      }
    } catch (error) {
      console.log("error in login method in screen login");
      console.log(error);
    }
  };
  // Handle background notifications
  // const unsubscribe = onMessage(messaging, remoteMessage => {
  //     console.log('Received background message:', remoteMessage);
  //   });

  const handleGoogle = async () => {
    try {
      setGoogleLoading(true);
      await GoogleSignin.signOut();
      await GoogleSignin.hasPlayServices();
      const userinfo = await GoogleSignin.signIn();
      console.log("USER INFO:", userinfo);
      // Alert.alert("User data", `Email:${userinfo.user.email}, name:${userinfo.user.name}, id:${userinfo.user.id}`)
      // await GoogleSignin.signOut();
      const token = await GetFCMToken();
      console.log("got the fcm token in google : ", token);
      const data = {
        idToken: userinfo.idToken,
        fcmToken: token ? token : "",
      };
      console.log(data);
      const rsp = await loginGoogle(data);
      console.log("RSP:", rsp);
      if (rsp == 404) {
        console.log("error");
        Alert.alert("Error Signing you in");
        setGoogleLoading(false);
      } else {
        console.log("user data from google is : ", rsp.data);
        await AsyncStorage.setItem("user", JSON.stringify(rsp?.data?.user));

        await AsyncStorage.setItem(
          "pushNotificationStatus",
          JSON.stringify(rsp?.data?.user?.enableNotification)
        );
        await AsyncStorage.setItem(
          "emailNotificationStatus",
          JSON.stringify(rsp?.data?.user?.enableEmailNotification)
        );
        await AsyncStorage.setItem("token", rsp?.data?.token);
        await AsyncStorage.setItem("profilepic", rsp?.data?.user?.photo);
        await AsyncStorage.setItem("provider", "google");
        setGoogleLoading(false);
        props.navigation.replace("AppNavigation");
      }
    } catch (error) {
      console.log("eror is :  ", error);
      setGoogleLoading(false);
    }
  };

  const handleFacebook = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        "public_profile",
        "email",
      ]);
      if (result.isCancelled) {
        console.log("User cancelled the login process");
      } else {
        const accessToken = await AccessToken.getCurrentAccessToken();
        if (accessToken) {
          console.log("Access token:", accessToken.accessToken);
          // Perform actions with the access token, e.g., fetch user profile
        }
      }
    } catch (error) {
      console.log("Error occurred while logging in with Facebook:", error);
    }
  };

  // const Constants = {
  //   TWITTER_API_KEY: "bNojACkZ5S6kzFEBw5B2yNZnr",
  //   TWITTER_API_KEY_SECRET:
  //     "DY37p3NLXCIodwxm32ALdKqrQfItjAKhb6NRIAjZN1iRLvGwBs",
  // };

  // const handleTwitter = async () => {
  //   try {
  //     await RNTwitterSignIn.init(
  //       Constants.TWITTER_API_KEY,
  //       Constants.TWITTER_API_KEY_SECRET
  //     );
  //     const loginData = await RNTwitterSignIn.logIn();
  //     console.log("LOGINDATA:", loginData);
  //   } catch (error) {
  //     console.error("Error during Twitter login:", error);
  //     // Handle errors as needed
  //   }
  // };

  useEffect(() => {
    // handleNotificationPermissions();
    GoogleSignin.configure({
      webClientId:
        // GOOGLE_CLIENT_ID = 584309417173-2bo32ti7rnghurks911l66pusfc341f3.apps.googleusercontent.com
        // '584309417173-2bo32ti7rnghurks911l66pusfc341f3.apps.googleusercontent.com',
        "905609003076-96an5gftkrtl45p06qp6upfamd1b76ol.apps.googleusercontent.com",
      scopes: ["profile", "email"],
    });
    GetFCMToken();
    // Initialize Twitter sign-in when component mounts
    // RNTwitterSignIn.init(
    //   Constants.TWITTER_API_KEY,
    //   Constants.TWITTER_API_KEY_SECRET
    // );
  }, []);

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
          <SuperText value="Login" medium color={colors.WHITE} size={wp(5)} />
        </SafeAreaView>
        <Spacer space={isIphoneX() ? wp(2) : wp(5)} />
      </LinearGradient>

      <KeyboardAwareScrollView
        contentContainerStyle={{ flex: 1 }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        style={styles.subView}
      >
        <View style={{ alignItems: "center" }}>
          <Spacer space={wp(2)} />
          <Image source={images.logo} style={styles.logo} />
          <Spacer space={wp(1)} />
          <SuperText
            value="Welcome Back!"
            semiBold
            color={colors.BLACK}
            size={hp(2.5)}
          />
          <SuperText
            value="Please enter the details to continue"
            regular
            color={colors.GRAY}
            size={hp(1.8)}
          />
        </View>
        <Input
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
        </TouchableOpacity>
        <Spacer space={hp(2)} />
        {loading ? (
          <ActivityIndicator size={"large"} color={colors.GRADIENT1} />
        ) : (
          <Button
            onPress={() => {
              handleLogin();
            }}
            label="Login"
          />
        )}
        <Spacer space={hp(2)} />
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
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Login;
