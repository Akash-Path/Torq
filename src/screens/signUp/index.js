import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
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
import { register, verifyOTPAPI } from "../../api/authApi";
import { GetFCMToken } from "../../api/notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignUp = (props) => {
  const [secureTextEntry, setScureTextEntry] = useState(true);
  const [secureTextEntry2, setScureTextEntry2] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isOTPSend, setIsOTPSend] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const VerifyOTP = async () => {
    if (otp.length <= 6) {
      setLoading(true);
      const data = {
        email: email.toLowerCase(),
        otp: otp,
      };
      let res = await verifyOTPAPI(data);
      Alert.alert("Sign Up successfully");
      setLoading(false);
      props.navigation.navigate("Login");
    } else {
      Alert.alert("Please enter 6 digits OTP");
    }
  };

  // const handleSignup = async () => {
  //   try {
  //     if ((email, password, name, confirmPassword)) {
  //       if (confirmPassword == password) {
  //         if (password.length >= 6) {
  //           let notifyStat = await AsyncStorage.getItem("notifyStatus");
  //           let status = JSON.parse(notifyStat);
  //           setLoading(true);
  //           const fcmToken = await GetFCMToken();
  //           const data = {
  //             email: email.toLowerCase(),
  //             name,
  //             password,
  //             invitationCode: code,
  //             fcmToken,
  //             enableNotification: status,
  //           };
  //           console.log(data);
  //           const response = await register(data);
  //           console.log("response is : ", response);
  //           if (response == 404) {
  //             console.log("Error in register");
  //             setLoading(false);
  //             Alert.alert("Cannot Register at this time!");
  //           } else if (response == 400) {
  //             Alert.alert("Invalid Invitation Code!");
  //             setLoading(false);
  //           } else if (response == 409) {
  //             Alert.alert("User with this email already exists!");
  //             setLoading(false);
  //           } else {
  //             console.log("data is : ", response.data);
  //             await AsyncStorage.setItem(
  //               "user",
  //               JSON.stringify(response?.data?.user)
  //             );
  //             Alert.alert("OTP sent successfully!");
  //             setLoading(false);
  //             setIsOTPSend(true);
  //             //props.navigation.navigate('Login');
  //           }
  //         } else {
  //           Alert.alert(
  //             "Inavlid Password",
  //             "Password should be atleast 6 characters"
  //           );
  //         }
  //       } else {
  //         Alert.alert("Error!", "Password and confirm password does not match");
  //       }
  //     } else {
  //       Alert.alert("Invalid info!", "Flease fill all fileds first");
  //     }
  //   } catch (error) {
  //     console.log("error in sign up user : ", error);
  //     Alert.alert("Error in signing you up", "please try again later!");
  //   }
  // };

  const handleSignup = async () => {
    try {
      if (email && password && name && confirmPassword) {
        if (confirmPassword === password) {
          if (password.length >= 6) {
            const notifyStat = await AsyncStorage.getItem("notifyStatus");
            const status = JSON.parse(notifyStat);
            setLoading(true);
            const fcmToken = await GetFCMToken();
            const data = {
              email: email.toLowerCase(),
              name,
              password,
              invitationCode: code,
              fcmToken,
              enableNotification: status,
            };
            console.log(data);
            const response = await register(data);
            console.log("response is : ", response);
            if (response === 404) {
              const isPublicDomain = isPublicEmailDomain(email);
              if (isPublicDomain) {
                console.log("Error in register");
                setLoading(false);
                Alert.alert("Cannot get your data!");
              } else {
                console.log("Error in register");
                setLoading(false);
                Alert.alert(
                  "Invalid Email",
                  "Please enter a public domain email address."
                );
              }
            } else if (response === 400) {
              Alert.alert("Invalid Invitation Code!");
              setLoading(false);
            } else if (response === 409) {
              Alert.alert("User with this email already exists!");
              setLoading(false);
            } else {
              console.log("data is : ", response.data);
              await AsyncStorage.setItem(
                "user",
                JSON.stringify(response?.data?.user)
              );
              Alert.alert("OTP sent successfully!");
              setLoading(false);
              setIsOTPSend(true);
              //props.navigation.navigate('Login');
            }
          } else {
            Alert.alert(
              "Invalid Password",
              "Password should be at least 6 characters"
            );
          }
        } else {
          Alert.alert("Error!", "Password and confirm password do not match");
        }
      } else {
        Alert.alert("Invalid info!", "Please fill all fields first");
      }
    } catch (error) {
      console.log("error in sign up user : ", error);
      Alert.alert("Error in signing you up", "Please try again later!");
    }
  };

  // Function to check if the email domain is public
  const isPublicEmailDomain = (email) => {
    const publicDomains = [
      "gmail.com",
      "yahoo.com",
      "outlook.com",
      "rediffmail.com",
    ];
    const domain = email.split("@")[1];
    return publicDomains.includes(domain);
  };

  // const handleSignup = async () => {
  //   try {
  //     if (email && password && name && confirmPassword) {
  //       if (confirmPassword === password) {
  //         if (password.length >= 6) {
  //           const notifyStat = await AsyncStorage.getItem("notifyStatus");
  //           const status = JSON.parse(notifyStat);
  //           setLoading(true);
  //           const fcmToken = await GetFCMToken();
  //           const data = {
  //             email: email.toLowerCase(),
  //             name,
  //             password,
  //             invitationCode: code,
  //             fcmToken,
  //             enableNotification: status,
  //           };
  //           console.log(data);
  //           const response = await register(data);
  //           console.log("response is : ", response);

  //           // Check response status
  //           if (response.status === 200) {
  //             console.log("data is : ", response.data);
  //             await AsyncStorage.setItem(
  //               "user",
  //               JSON.stringify(response?.data?.user)
  //             );
  //             Alert.alert("OTP sent successfully!");
  //             setLoading(false);
  //             setIsOTPSend(true);
  //             //props.navigation.navigate('Login');
  //           } else if (response.status === 404) {
  //             const isPublicDomain = isPublicEmailDomain(email);
  //             if (isPublicDomain) {
  //               console.log("Error in register");
  //               setLoading(false);
  //               Alert.alert("Cannot get your data!");
  //             } else {
  //               console.log("Error in register");
  //               setLoading(false);
  //               Alert.alert(
  //                 "Invalid Email",
  //                 response.message ||
  //                   "Please enter a public domain email address."
  //               );
  //             }
  //           } else if (response.status === 400) {
  //             Alert.alert("Invalid Invitation Code!");
  //             setLoading(false);
  //           } else if (response.status === 409) {
  //             Alert.alert("User with this email already exists!");
  //             setLoading(false);
  //           } else {
  //             // Handle other status codes if necessary
  //           }
  //         } else {
  //           Alert.alert(
  //             "Invalid Password",
  //             "Password should be at least 6 characters"
  //           );
  //         }
  //       } else {
  //         Alert.alert("Error!", "Password and confirm password do not match");
  //       }
  //     } else {
  //       Alert.alert("Invalid info!", "Please fill all fields first");
  //     }
  //   } catch (error) {
  //     console.log("error in sign up user : ", error);
  //     Alert.alert("Error in signing you up", "Please try again later!");
  //   }
  // };

  useEffect(() => {
    GetFCMToken();
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
          <SuperText value="Signup" medium color={colors.WHITE} size={wp(5)} />
        </SafeAreaView>
        <Spacer space={isIphoneX() ? wp(2) : wp(5)} />
      </LinearGradient>

      <KeyboardAwareScrollView style={styles.subView}>
        <View style={{ alignItems: "center" }}>
          <Spacer space={wp(2)} />
          <Image source={images.logo} style={styles.logo} />
          <Spacer space={wp(1)} />
          <SuperText
            value="Create Account"
            semiBold
            color={colors.BLACK}
            size={hp(2.5)}
          />
        </View>
        <Input
          stateHandler={setName}
          label="Name"
          placeholder="Enter Name"
          icon={images.ic_user}
        />
        <Input
          stateHandler={setEmail}
          label="Email"
          placeholder="Enter Email"
          icon={images.email}
        />
        <Input
          stateHandler={setCode}
          label="Invitation code (Optional)"
          placeholder="Enter Code"
          icon={images.blockchain}
        />
        <Input
          stateHandler={setPassword}
          onRightClick={() => {
            setScureTextEntry(!secureTextEntry);
          }}
          secureTextEntry={secureTextEntry}
          label="Password"
          placeholder="Enter Password"
          icon={images.ic_password}
          rightIcon={secureTextEntry ? images.eyeHide : images.eyeOpen}
        />
        <Input
          stateHandler={setConfirmPassword}
          onRightClick={() => {
            setScureTextEntry2(!secureTextEntry2);
          }}
          secureTextEntry={secureTextEntry2}
          label="Confirm Password"
          placeholder="Enter Password"
          icon={images.ic_password}
          rightIcon={secureTextEntry2 ? images.eyeHide : images.eyeOpen}
        />
        {isOTPSend ? (
          <Input
            stateHandler={setOtp}
            label="Enter OTP"
            placeholder="Enter OTP"
          />
        ) : null}

        <Spacer space={hp(2)} />
        {loading ? (
          <ActivityIndicator size={"large"} color={colors.GRADIENT1} />
        ) : (
          <Button
            onPress={() => {
              if (isOTPSend) {
                VerifyOTP();
              } else {
                handleSignup();
              }
            }}
            label={isOTPSend ? "Verify OTP" : "Send OTP "}
          />
        )}
        <Spacer space={hp(1)} />
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("Login");
          }}
          style={[global.row, { alignSelf: "center" }]}
        >
          <SuperText
            value="Already have an account?"
            medium
            color={colors.BLACK}
            size={wp(3.4)}
          />
          <Spacer row={wp(0.5)} />
          <SuperText
            value="Sign In"
            medium
            color={colors.BLUE}
            size={wp(3.4)}
          />
        </TouchableOpacity>
        <Spacer space={hp(4)} />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default SignUp;
