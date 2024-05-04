import React, { useCallback, useEffect, useState } from "react";
import { styles } from "./style";
import LinearGradient from "react-native-linear-gradient";
import { colors } from "../../res/colors";
import Spacer from "../../components/Spacer";
import { hp, profileSettings, wp } from "../../res/constants";
import SuperText from "../../components/SuperText";
import {
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import { global } from "../../res/global";
import { images } from "../../res/images";
import { SafeAreaView } from "react-native-safe-area-context";
import { BarChart } from "react-native-gifted-charts";
import { getStats } from "../../api/statsApi";
import { baseURL } from "../../api/authApi";
import { useNavigation } from "@react-navigation/native";

const States = (props) => {
  const [activeIndex, setactiveIndex] = useState(1);
  const [loading, setLoading] = useState(false);

  const [onlineUsers, setonlineUsers] = useState(0);
  const [topUsers, settopUsers] = useState([]);
  const [totalUsers, settotalUsers] = useState(0);

  const handleGetStats = async () => {
    setLoading(true);
    const response = await getStats();
    console.log("RESPONSE FROM STATS:", response);
    if (response == 404) {
      console.log("No data found on stats");
    } else {
      settopUsers(response?.data?.topUsers);
      setonlineUsers(response?.data?.onlineUsers);
      settotalUsers(response?.data?.totalUsers);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleGetStats();
  }, []);

  function Switch(props) {
    return (
      <TouchableOpacity onPress={props.onPress}>
        <LinearGradient
          colors={
            props.activeIndex == props.id
              ? [colors.GRADIENT1, colors.GRADIENT2]
              : [colors.WHITE, colors.WHITE]
          }
          style={[styles.btn, global.row]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <SuperText
            value={props.label}
            medium
            color={props.activeIndex == props.id ? colors.WHITE : colors.GRAY5}
            size={wp(3.5)}
          />
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  const data = [
    { value: 50, label: "12/12" },
    { value: 80, label: "12/12" },
    { value: 90, label: "12/12" },
  ];

  const navigation = useNavigation();

  const handleGetUserDetails = (user) => {
    navigation.navigate("UserDetails", { user });
    console.log("click user Details");
  };

  return (
    <>
      <LinearGradient
        colors={[colors.GRADIENT1, colors.GRADIENT2]}
        style={styles.gradient}
        start={{ x: 0, y: 0.4 }}
        end={{ x: 1.6, y: 0 }}
      >
        <Spacer space={wp(4)} />
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
            <SuperText
              value="Stats"
              medium
              color={colors.WHITE}
              size={wp(5)}
              style={{ alignSelf: "center" }}
            />
            <View style={{ width: wp(20) }}></View>
          </View>
          <Spacer space={wp(3)} />
          <View
            style={[
              global.row,
              { justifyContent: "space-between", marginHorizontal: wp(4) },
            ]}
          >
            <View style={global.row}>
              <Image source={images.logo_white} style={styles.logo} />
              <Spacer row={wp(1)} />
              <View>
                <SuperText
                  value="Online users"
                  regular
                  color={colors.WHITE}
                  size={wp(3)}
                />
                <SuperText
                  value={onlineUsers}
                  semiBold
                  color={colors.WHITE}
                  size={wp(3)}
                />
              </View>
            </View>
            <View style={styles.line} />
            <View style={global.row}>
              <Image source={images.totalUsers} style={styles.totalUsers} />
              <Spacer row={wp(1)} />
              <View>
                <SuperText
                  value="Total users"
                  regular
                  color={colors.WHITE}
                  size={wp(3)}
                />
                <SuperText
                  value={totalUsers}
                  semiBold
                  color={colors.WHITE}
                  size={wp(3)}
                />
              </View>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
      <View style={styles.subView}>
        <Spacer space={wp(2)} />
        <View style={[styles.mainWrapper, global.shadow]}>
          <Switch
            id={1}
            activeIndex={activeIndex}
            label="Total users"
            onPress={() => {
              setactiveIndex(1);
            }}
          />
          <Switch
            id={2}
            activeIndex={activeIndex}
            label="Active users"
            onPress={() => {
              setactiveIndex(2);
            }}
          />
        </View>
        <Spacer space={wp(4)} />
        <View style={{ marginHorizontal: wp(4) }}>
          <View style={[global.row, { justifyContent: "space-between" }]}>
            <SuperText
              value="USER GROWTH"
              semiBold
              color={colors.BLUE2}
              size={wp(3.8)}
            />
            <SuperText
              value="see all"
              regular
              color={colors.BLUE2}
              size={wp(3.5)}
            />
          </View>
        </View>
        <View height={wp(48)} minHeight={wp(48)} style={{ marginTop: -wp(10) }}>
          <BarChart
            data={data}
            horizontal
            hideRules
            frontColor={colors.BLUE3}
            yAxisThickness={0}
            xAxisThickness={0}
            barBorderRadius={wp(4)}
            barWidth={wp(5.4)}
            width={wp(80)}
            height={wp(23)}
            spacing={wp(2)}
            shiftX={-wp(2)}
            yAxisTextStyle={styles.text}
            xAxisLabelTextStyle={styles.text}
            disableScroll
          />
        </View>
        <View style={{ marginHorizontal: wp(4) }}>
          <View style={[global.row, { justifyContent: "space-between" }]}>
            <SuperText
              value="TOP USERS"
              semiBold
              color={colors.BLUE2}
              size={wp(3.8)}
            />
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("TopUsers", { topUsers });
              }}
            >
              <SuperText
                value="see all"
                regular
                color={colors.BLUE2}
                size={wp(3.5)}
              />
            </TouchableOpacity>
          </View>
          {loading ? (
            <ActivityIndicator size={"large"} color={colors.GRADIENT1} />
          ) : (
            <FlatList
              style={{ marginBottom: 20 }}
              data={topUsers}
              keyExtractor={(item) => item.id}
              renderItem={(item) => {
                return (
                  <View
                    style={[
                      global.row,
                      {
                        justifyContent: "space-between",
                        marginVertical: wp(3),
                      },
                    ]}
                  >
                    <Image
                      source={
                        item.item.photo
                          ? {
                              uri: `${baseURL}/photoUploads/${item.item.photo}`,
                            }
                          : images.profile
                      }
                      style={styles.tempmail}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        handleGetUserDetails(item);
                      }}
                    >
                      <SuperText
                        value={item.item.name}
                        medium
                        color={colors.BLUE2}
                        size={wp(3.5)}
                        style={{ width: wp(50) }}
                      />
                      <SuperText
                        value={`Rank: ${item.item.rank}`}
                        medium
                        color={colors.BLUE2}
                        size={wp(3.5)}
                        style={{ width: wp(50) }}
                      />
                    </TouchableOpacity>

                    <SuperText
                      value={`${item.item.availableBalance}`}
                      regular
                      color={colors.GRAY5}
                      size={wp(3)}
                    />
                    <SuperText
                      value="Torq"
                      regular
                      color={colors.GRAY5}
                      size={wp(3)}
                    />
                  </View>
                );
              }}
            />
          )}
        </View>
      </View>
    </>
  );
};

export default States;
