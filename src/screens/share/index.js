import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Share,
  Alert,
} from "react-native";
import React, { Suspense, useEffect, useState } from "react";
import { styles } from "./style";
import LinearGradient from "react-native-linear-gradient";
import { colors } from "../../res/colors";
import Header from "../../components/Header";
import Spacer from "../../components/Spacer";
import { hp, wp } from "../../res/constants";
import { global } from "../../res/global";
import { images } from "../../res/images";
import SuperText from "../../components/SuperText";
import { SafeAreaView } from "react-native-safe-area-context";
import QRCode from "react-native-qrcode-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseURL } from "../../api/authApi";
import { useUser } from "../../../context/UserContext";

const ShareScreen = (props) => {
  const [email, setemail] = useState("");
  const [qrCodePath, setqrCodePath] = useState("");
  const [profile, setProfile] = useState("");
  const [code, setCode] = useState("");

  const getuser = async () => {
    const data = await AsyncStorage.getItem("user");

    let pic = await AsyncStorage.getItem("profilepic");
    console.log(pic);
    if (pic.includes('"')) {
      pic = pic.replaceAll('"', "");
    }
    console.log(pic);
    setProfile(pic);

    const user = JSON.parse(data);
    console.log("user from async is : ", user);
    if (user) {
      setemail(user.email);
      console.log(user.qrCodePath);
      const qrpath = user.qrCodePath.split("public")[1];
      // console.log(qrpath.split("public")[1])
      console.log(`${baseURL}${qrpath}`);
      console.log("UserInvitationCode:", user.invitationCode);
      setCode(user.invitationCode);
      setqrCodePath(qrpath);
    }
  };
  const { popupClicked } = useUser();

  useEffect(() => {
    getuser();
  }, [popupClicked]);

  const onShare = async () => {
    try {
      const result = await Share.share({
        // message: 'Share your QR code to mine with friends and get bonus!',
        // message: `Join Torq Network with this invitation code and get early access! code: ${code}`,
        message: `Mine Torq coins for free just by tapping one button daily. Register using my invitation code to get 25% extra bonus: ${code}. Click here to download the Torq Network Mining App Now: https://play.google.com/store/apps/details?id=com.torqnetwork`,
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

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.GRADIENT1, colors.GRADIENT2]}
        style={[styles.container]}
        start={{ x: 0, y: 0.4 }}
        end={{ x: 1.6, y: 0 }}
      >
        <Spacer space={wp(4)} />
        {/* <Header onChangeIndex={(index) => { props.navigation.goBack() }} /> */}
        <SafeAreaView>
          <View
            style={[
              global.row,
              { justifyContent: "space-between", paddingHorizontal: wp(5) },
            ]}
          >
            <TouchableOpacity
              onPress={() => {
                props.navigation.goBack();
              }}
              style={{ width: wp(20) }}
            >
              <Image source={images.back} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        <View
          style={{ justifyContent: "center", flex: 1, alignItems: "center" }}
        >
          <View style={styles.subView}>
            <View style={styles.profileWrapper}>
              <Image
                source={
                  profile
                    ? {
                        uri: profile && `${baseURL}/photoUploads/${profile}`,
                      }
                    : images.profile
                }
                style={styles.profle}
              />
            </View>
            <Spacer space={wp(1)} />
            <SuperText value={email} medium color={colors.BLACK} size={wp(4)} />
            <Spacer space={wp(2)} />
            <Image
              source={{
                uri: `${
                  qrCodePath
                    ? `${baseURL}${qrCodePath}`
                    : "public\\qrCodes\\65b5290099fc48e12282f9ce_qr.png"
                }`,
              }}
              style={{ width: 200, height: 200 }}
            />
            {/* <QRCode
                        // public\\qrCodes\\65b5290099fc48e12282f9ce_qr.png
                            value={`${qrCodePath? `${baseURL}${qrCodePath}`:"public\\qrCodes\\65b5290099fc48e12282f9ce_qr.png" }`}
                            // value="http://awesome.link.qr"
                            size={hp(25)}
                        /> */}
            <Spacer space={wp(2)} />
            <SuperText
              value="Scan QR code to join my team."
              medium
              color={colors.BLACK}
              size={wp(4)}
            />
            <Spacer space={wp(1)} />
            <View style={global.row}>
              <Image source={images.logo} style={styles.logo} />
              <Spacer row={wp(1)} />
              <SuperText
                value="TORQ"
                medium
                color={colors.BLACK}
                size={wp(7)}
              />
            </View>
          </View>
          <Spacer space={wp(4)} />
          <Image source={images.socialMedia} />
          <Spacer space={wp(4)} />

          <TouchableOpacity
            onPress={() => {
              onShare();
            }}
            style={[styles.btn]}
          >
            <Image source={images.share} />
            <Spacer row={wp(1)} />
            <SuperText value="Share" color={colors.BLACK} size={wp(4)} medium />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

export default ShareScreen;
