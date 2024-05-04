import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  Alert,
  Linking,
  ImageBackground,
} from "react-native";
import StepIndicator from "react-native-step-indicator";
import { hp, wp } from "../res/constants";
import SuperText from "./SuperText";
import { colors } from "../res/colors";
import Spacer from "./Spacer";
import { images } from "../res/images";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  followOnTelegram,
  followOnTwitter,
  followOnInstagram,
  invite5Friends,
  reviewOnPlayStore,
  joinOnWhatsApp,
} from "../api/progressApi";
import { useUser } from "../../context/UserContext";
import ProgressPopup from "./ProgressPopup";
import { useNavigation } from "@react-navigation/native";

const stepIndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 5,
  stepStrokeCurrentColor: "#38D488",
  separatorFinishedColor: "#38D488",
  separatorUnFinishedColor: "#aaaaaa",
  stepIndicatorFinishedColor: "#38D488",
  stepIndicatorUnFinishedColor: "#aaaaaa",
  stepIndicatorCurrentColor: "#ffffff",
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: "#000000",
  stepIndicatorLabelFinishedColor: "#ffffff",
  stepIndicatorLabelUnFinishedColor: "rgba(255,255,255,0.5)",
  labelColor: "#666666",
  labelSize: 15,
  currentStepLabelColor: "#38D488",
};

export default function VerticalStepIndicator(props: any) {
  const navigation = useNavigation();
  const [session1st, setsession1st] = React.useState(false);
  const [profile, setprofile] = React.useState(false);
  const [isTwitter, setIsTwitter] = React.useState(false);
  const [isTelegram, setIsTelegram] = React.useState(false);
  const [isWhatsApp, setIsWhatsApp] = React.useState(false);
  const [isInstagram, setIsInstagram] = React.useState(false);
  const [fiveFriends, setFiveFriends] = React.useState(false);

  const [modalVisible, setModalVisible] = React.useState(false);
  const [inputText, setInputText] = React.useState<String>("");

  const handleInputChange = (text: String) => {
    setInputText(text);
  };

  const onSubmit = () => {
    console.log("user name is : ", inputText);
  };
  const onCancel = () => {
    console.log("cancelled");
  };

  const openWeb = React.useCallback(async (url: any) => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);
    const resp = await Linking.openURL(url);
    console.log("inside : ", resp);
    return resp;
  }, []);

  const { togglePopupClicked } = useUser();

  const twitterUsernameSubmit = async () => {
    setModalVisible(true);
    if (inputText) {
      const data = { username: inputText };
      console.log("twitter name is : ", inputText);
      const resp = await openWeb("https://twitter.com/TheTorqNetwork");
      console.log(resp);
      const followTwitter: any = await followOnTwitter(data);
      console.log(followTwitter.data);
      setInputText("");
      await togglePopupClicked();
    }
    setIsTwitter(false);
    setModalVisible(false);
  };

  const cancelUsername = () => {
    setIsTwitter(false);
    setIsTelegram(false);
    setIsInstagram(false);
    setModalVisible(false);
  };

  const telegramUsernameSubmit = async () => {
    setModalVisible(true);
    if (inputText) {
      const data = { username: inputText };
      console.log("telegram name is : ", inputText);
      const resp = await openWeb("https://t.me/TheTorqNetwork");
      console.log("tele : ", resp);
      const followTele: any = await followOnTelegram(data);
      console.log(followTele.data);
      setInputText("");
      await togglePopupClicked();
    }
    setModalVisible(false);
    setIsTelegram(false);
  };

  const instagramUsernameSubmit = async () => {
    setModalVisible(true);
    if (inputText) {
      const data = { username: inputText };
      console.log("instagram name is : ", inputText);
      const resp = await openWeb("https://www.instagram.com/thetorqnetwork/");
      console.log("insta : ", resp);
      const followInsta: any = await followOnInstagram(data);
      console.log(followInsta.data);
      setInputText("");
      await togglePopupClicked();
    }
    setModalVisible(false);
    setIsInstagram(false);
  };

  const handleJoinWhatsApp = async () => {
    const data = {};
    try {
      const response: any = await joinOnWhatsApp(data);
      if (response.status === 200) {
        const whatsAppLink =
          "https://whatsapp.com/channel/0029VaTd019C1Fu2d0rFtq2n";
        await Linking.openURL(whatsAppLink);
      } else {
        console.error("API error:", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleReviewOnPlayStore = async () => {
    const data = {};
    try {
      const response: any = await reviewOnPlayStore(data);
      if (response.status === 200) {
        const playStoreLink =
          "https://play.google.com/store/apps/details?id=com.torqnetwork";
        await Linking.openURL(playStoreLink);
      } else {
        console.error("API error:", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const dummyData = [
    {
      title: "Start earning",
      body: "Your first check-in session.",
      icon: props?.progress?.startedEarning
        ? images.startEarning
        : images.startEarning,
        onPress: async () => {
          console.log("earning press");
        },
      status: props?.progress?.startedEarning,
    },
    {
      title: "Profile picture",
      body: "Upload you profile image.",
      icon: props?.progress?.addedPhoto ? images.profilePic : images.profilePic,
      onPress: async () => {
        props.setactiveIndex(5);
      },
      status: props?.progress?.addedPhoto,
    },
    {
      title: "Follow us on Twitter",
      body: "Let’s keep in touch, follow us on Twitter.",
      icon: props?.progress?.followedOnTwitter
        ? images.twitterunlock
        : images.twitter,
      onPress: async () => {
        console.log("twitter press");
        setIsTwitter(true);
        // twitterUsernameSubmit();
      },
      status: props?.progress?.followedOnTwitter,
    },
    {
      title: "Join Telegram",
      body: "Be part of our community and join now.",
      icon: props?.progress?.followedOnTelegram
        ? images.telegramunlock
        : images.telegram,
      onPress: async () => {
        console.log("telegram press");
        setIsTelegram(true);
        // telegramUsernameSubmit();
      },
      status: props?.progress?.followedOnTelegram,
    },
    {
      title: "Follow us on Instagram",
      body: "Stay updated with our latest posts and stories on Instagram.",
      icon: props?.progress?.followedOnInstagram
        ? images.instagramUnlock
        : images.instagramLock,
      onPress: async () => {
        console.log("instagram press");
        setIsInstagram(true);
      },
      status: props?.progress?.followedOnInstagram,
    },
    {
      title: "Join WhatsApp",
      body: "Connect with us on WhatsApp and be part of our community.",
      icon: props?.progress?.joinOnWhatsApp
        ? images.whatsAppUnlock
        : images.whatsApplock,
      onPress: handleJoinWhatsApp,
      status: props?.progress?.joinOnWhatsApp,
    },
    {
      title: "Invite 5 Friends",
      body: "Grow your team and increase your earnings.",
      icon: props?.progress?.invitedFriends
        ? images.friendsunlock
        : images.invite5friends,
      onPress: () => {
        navigation.navigate("Share");
      },
      status: props?.progress?.invitedFriends,
    },
    {
      title: "Review us on Play Store",
      body: "Enjoying our app? Show your support by leaving a review on the Play Store!",
      icon: props?.progress?.reviewOnPlayStore
        ? images.playstoreUnlock
        : images.playstorelock,
      onPress: handleReviewOnPlayStore,
      status: props?.progress?.reviewOnPlayStore,
    },
  ];

  React.useEffect(() => {
    console.log("props are  :", props);
  }, []);

  const handleTaskProgress = async () => {
    const userProfile = await AsyncStorage.getItem("profilePic");
    if (userProfile) {
      setprofile(true);
      setCurrentPage(1);
    }
  };

  const [currentPage, setCurrentPage] = React.useState<number>(2);
  const viewabilityConfig = React.useRef({
    itemVisiblePercentThreshold: 40,
  }).current;

  const renderPage = (rowData: any) => {
    const item = rowData.item;
    console.log(item, "iiiii");
    return (
      <View style={[styles.listWrapper, styles.rowItem]}>
        <View style={{ width: wp(14) }}>
          {item.title == "Start earning" || item.title == "Profile picture" ? (
            <TouchableOpacity onPress={item.onPress}>
              <ImageBackground
                source={item.icon}
                style={{
                  width: hp(7),
                  height: hp(7),
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                }}
              >
                {item.status ? (
                  <></>
                ) : (
                  <Image
                    source={images.lockicon}
                    style={{
                      width: hp(3),
                      height: hp(3),
                      marginBottom: -10,
                      marginRight: -5,
                      backgroundColor: "transparent",
                      borderRadius: 100,
                    }}
                  />
                )}
              </ImageBackground>
            </TouchableOpacity>
          ) : item.title == "Follow us on Twitter" ||
            item.title == "Join Telegram" ||
            item.title == "Follow us on Instagram" ? (
            <>
              <TouchableOpacity onPress={item.onPress}>
                <Image
                  source={item.icon}
                  style={{ height: hp(7), width: hp(7), objectFit: "cover" }}
                />
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity style={{}} onPress={item.onPress}>
                <Image
                  source={item.icon}
                  style={{ height: hp(7), width: hp(7), objectFit: "cover" }}
                />
              </TouchableOpacity>
            </>
          )}
        </View>

        <Spacer row={wp(1)} />

        <View>
          <SuperText
            value={item.title}
            mSemiBold
            color={colors.BLACK}
            size={wp(4)}
          />
          <SuperText
            style={{ width: wp(50) }}
            value={item.body}
            mRegular
            color={colors.BLUE6}
            size={wp(3)}
          />
        </View>
      </View>
    );
  };

  // const onViewableItemsChanged = React.useCallback(({ viewableItems }) => {
  //     const visibleItemsCount = viewableItems.length;
  //     if (visibleItemsCount !== 0) {
  //         setCurrentPage(viewableItems[visibleItemsCount - 1].index);
  //     }
  // }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.stepIndicator}>
          {/* <StepIndicator
                    customStyles={{
                        stepIndicatorLabelUnFinishedColor: colors.WHITE,
                        separatorUnFinishedColor: colors.GRAY4,
                        stepStrokeUnFinishedColor: colors.GRAY4,
                        stepIndicatorUnFinishedColor: colors.WHITE,
                        stepStrokeWidth: 1,
                        currentStepStrokeWidth: 1,
                        separatorStrokeWidth: 1,
                    }}
                    stepCount={5}
                    direction="vertical"
                    currentPosition={currentPage}
                    renderStepIndicator={(item) => {
                        return (
                            <View>
                                {item.stepStatus == 'finished' ? <Image source={images.check} /> : <View style={[styles.dot, item.stepStatus == 'unfinished' && { backgroundColor: colors.GRAY }]} />}
                                </View>
                        )
                    }}
                /> */}

          <FlatList
            data={dummyData}
            style={{ marginTop: 10 }}
            renderItem={({ item }) => {
              console.log("Items shown on console:", item);
              return (
                <View style={{ height: hp(9) }}>
                  <Image
                    source={
                      item.status ? images.greencheck : images.pendingcheck
                    }
                    style={{
                      width: hp(4),
                      height: hp(4),
                      objectFit: "contain",
                    }}
                  />
                </View>
              );
            }}
          />
        </View>

        <FlatList
          style={{ flexGrow: 1 }}
          data={dummyData}
          renderItem={renderPage}
          // onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
        />
      </View>

      {isTwitter ? (
        <ProgressPopup
          changeHandler={setInputText}
          visible={true}
          type={"Twitter"}
          onSubmit={twitterUsernameSubmit}
          onCancel={cancelUsername}
        />
      ) : (
        <></>
      )}

      {isTelegram ? (
        <ProgressPopup
          changeHandler={setInputText}
          visible={isTelegram}
          type={"Telegram"}
          onSubmit={telegramUsernameSubmit}
          onCancel={cancelUsername}
        />
      ) : (
        <></>
      )}

      {isInstagram ? (
        <ProgressPopup
          changeHandler={setInputText}
          visible={isInstagram}
          type={"Instagram"}
          onSubmit={instagramUsernameSubmit}
          onCancel={cancelUsername}
        />
      ) : (
        <></>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#ffffff",
  },
  stepIndicator: {
    paddingHorizontal: wp(4),
    marginLeft: wp(1),
  },
  rowItem: {
    flex: 3,
    // paddingVertical: wp(4),
  },
  title: {
    flex: 1,
    fontSize: 20,
    color: "#333333",
    paddingVertical: 16,
    fontWeight: "600",
  },
  body: {
    flex: 1,
    fontSize: 15,
    color: "#606060",
    lineHeight: 24,
    marginRight: 8,
  },
  listWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: wp(2),
    // backgroundColor: "red"
  },
  dot: {
    width: wp(2.5),
    height: wp(2.5),
    borderRadius: wp(2),
    backgroundColor: colors.GREEN,
  },
});
