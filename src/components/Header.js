import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../res/colors";
import { hp, wp } from "../res/constants";
import { images } from "../res/images";
import { useNavigation } from "@react-navigation/native";
import { getProfile } from "../api/homePageApi";
import { baseURL } from "../api/authApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../../context/UserContext";

const Header = (props) => {
  const [profile, setProfile] = useState("");

  const [home, setHome] = useState(true);
  const [search, setSearch] = useState(false);
  const [market, setMarket] = useState(false);
  const [notify, setNofity] = useState(false);
  const [profileScreen, setProfileScreen] = useState(false);

  const handleClickProfileScreen = () => {
    setProfileScreen(true);
    setHome(false);
    setSearch(false);
    setMarket(false);
    setNofity(false);
  };

  const handleClickHome = () => {
    setProfileScreen(false);
    setHome(true);
    setSearch(false);
    setMarket(false);
    setNofity(false);
  };

  const handleClickSearch = () => {
    setProfileScreen(false);
    setHome(false);
    setSearch(true);
    setMarket(false);
    setNofity(false);
  };

  const handleClickMarket = () => {
    setProfileScreen(false);
    setHome(false);
    setSearch(false);
    setMarket(true);
    setNofity(false);
  };

  const handleClickNotify = () => {
    setProfileScreen(false);
    setHome(false);
    setSearch(false);
    setMarket(false);
    setNofity(true);
  };

  const { popupClicked } = useUser();

  const handleGetProfile = async () => {
    let pic = await AsyncStorage.getItem("profilepic");
    console.log(pic);
    if (pic.includes('"')) {
      pic = pic.replaceAll('"', "");
    }
    console.log(pic);
    // console.log(JSON.parse(pic));
    setProfile(pic);
  };

  useEffect(() => {
    handleGetProfile();
  }, [popupClicked]);

  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => {
          props.onChangeIndex(1);
        }}
      >
        <Image
          source={images.menuHome}
          style={[
            styles.logo,
            {
              tintColor:
                props.screenName == "home" ? colors.GRADIENT1 : "black",
            },
          ]}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          props.onChangeIndex(2);
        }}
      >
        <Image
          source={images.menuUser}
          style={[
            styles.logo,
            {
              tintColor:
                props.screenName == "search" ? colors.GRADIENT1 : "black",
            },
          ]}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          props.onChangeIndex(3);
        }}
      >
        <Image
          source={images.menuCenter}
          style={[
            styles.logo,
            {
              tintColor:
                props.screenName == "market" ? colors.GRADIENT1 : "black",
            },
          ]}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          props.onChangeIndex(4);
        }}
      >
        <Image
          source={images.menuLight}
          style={[
            styles.logo,
            {
              tintColor:
                props.screenName == "notify" ? colors.GRADIENT1 : "black",
            },
          ]}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor:
            props.screenName == "profile" ? colors.GRADIENT1 : "black",
          borderRadius: 30,
          tintColor: props.screenName == "profile" ? colors.GRADIENT1 : "black",
        }}
        onPress={() => {
          props.onChangeIndex(5);
        }}
      >
        <Image
          source={
            profile
              ? { uri: `${baseURL}/photoUploads/${profile}` }
              : images.profile
          }
          style={[styles.profile, {}]}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    borderTopWidth: 1,
    borderColor: colors.BORDER,
    borderBottomLeftRadius: wp(4),
    borderBottomRightRadius: wp(4),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: wp(4),
    backgroundColor: colors.WHITE,
  },
  logo: {
    width: wp(6.5),
    height: wp(6.5),
    resizeMode: "contain",
  },
  profile: {
    width: wp(6.5),
    height: hp(3.5),
    borderRadius: 200,
  },
});
