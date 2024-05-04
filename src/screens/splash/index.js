import {
  View,
  Text,
  ImageBackground,
  Image,
  PermissionsAndroid,
} from "react-native";
import React, { useEffect } from "react";
import { styles } from "./style";
import { images } from "../../res/images";
import { loginGoogle } from "../../api/authApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Splash = (props) => {
  // const handlegetcontacs = async () => {
  //   // setLoading(true);
  //   console.log("handle get contacts");
  //   // setIsAllowed(true);
  //   const res = await PermissionsAndroid.check(
  //     "android.permission.POST_NOTIFICATIONS"
  //   );
  //   console.log("res is in  splash", res);
  //   await PermissionsAndroid.request(
  //     PermissionsAndroid.PERMISSIONS.READ_CONTACTS
  //   )
  //     .then((res) => {
  //       console.log("Permission: ", res);
  //     })
  //     .catch((error) => {
  //       console.error("Permission error: ", error);
  //       // setLoading(false);
  //     });
  // };

  const checkuser = async () => {
    const data = await AsyncStorage.getItem("user");
    if (data) {
      setTimeout(() => {
        props.navigation.replace("AppNavigation");
      }, 2000);
    } else {
      setTimeout(() => {
        // props.navigation.replace("Login");
        props.navigation.replace("Exit");
      }, 3000);
    }
  };

  useEffect(() => {
    // setTimeout(() => {
    //     props.navigation.navigate("Login");
    // }, 3000);
    // handleNotificationPermissions();
    // handlegetcontacs();
    checkuser();
  }, []);

  return (
    <ImageBackground source={images.splashBg} style={styles.container}>
      <Image source={images.loader} style={styles.loader} />
    </ImageBackground>
  );
};

export default Splash;
