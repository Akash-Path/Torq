import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./style";
import LinearGradient from "react-native-linear-gradient";
import { colors } from "../../res/colors";
import Header from "../../components/Header";
import Spacer from "../../components/Spacer";
import { data, hp, wp } from "../../res/constants";
import SuperText from "../../components/SuperText";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { global } from "../../res/global";
import { getNotifications } from "../../api/notifications";

const Notifications = (props) => {
  const [notifications, setNotifications] = useState([]);

  const handleGetNotifications = async () => {
    const resp = await getNotifications();
    // const notification = resp;
    const notification = resp.data;
    // console.log('notifications are : ', notification);
    console.log("notifications are : ", notification.notifications);
    setNotifications(notification?.notifications.reverse());
  };

  useEffect(() => {
    handleGetNotifications();
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
          screenName="notify"
          onChangeIndex={(index) => {
            props.setactiveIndex(index);
          }}
        />
        <Spacer space={wp(2)} />
        <SuperText
          value="Notification"
          medium
          color={colors.WHITE}
          size={wp(5)}
          style={{ alignSelf: "center" }}
        />
      </LinearGradient>
      <View style={styles.subView}>
        <Spacer space={wp(2)} />
        <SuperText
          value="NOTIFICATION"
          mSemiBold
          color={colors.BLACK}
          size={wp(4)}
          style={{ marginLeft: wp(4) }}
        />
        {notifications && notifications.length > 0 ? (
          <FlatList
            data={notifications}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const notificationTime = new Date(item.createdAt)
                .toLocaleString()
                .split(",");
              return (
                <TouchableOpacity
                  onPress={() => {}}
                  style={[styles.listWrapper, global.shadow]}
                >
                  <View style={styles.greenLine} />
                  <View
                    style={{
                      padding: wp(2),
                      width: wp(70),
                      paddingVertical: wp(4),
                    }}
                  >
                    {/* <SuperText
                      numberOfLines={3}
                      value={`${item.message.title}`}
                      regular
                      color={colors.BLACK2}
                      size={wp(2.8)}
                    /> */}
                    <SuperText
                      numberOfLines={3}
                      value={`${item.message.body}`}
                      regular
                      color={colors.BLACK2}
                      size={wp(2.8)}
                    />
                  </View>
                  <View>
                    <SuperText
                      value={`${notificationTime[0]}`}
                      regular
                      color={colors.GRAY}
                      size={wp(3.6)}
                    />

                    <SuperText
                      value={`${notificationTime[1]}`}
                      regular
                      color={colors.GRAY}
                      size={wp(3.6)}
                    />
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        ) : (
          <View style={{ marginTop: 10, marginHorizontal: 10 }}>
            <Text style={{ color: "black", fontWeight: "bold", fontSize: 24 }}>
              No Notifications to display
            </Text>
          </View>
        )}
      </View>
    </>
  );
};

export default Notifications;
