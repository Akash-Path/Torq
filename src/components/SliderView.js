import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState, useSyncExternalStore } from "react";
import Carousel from "react-native-reanimated-carousel";
import { hp, wp } from "../res/constants";
import { colors } from "../res/colors";
import SuperText from "./SuperText";
import LinearGradient from "react-native-linear-gradient";
import { images } from "../res/images";
import { global } from "../res/global";
import Spacer from "./Spacer";
import { homeDetails } from "../api/homePageApi";

const window = Dimensions.get("window");
const PAGE_WIDTH = window.width;

const SliderView = (props) => {
  const [mode, setMode] = React.useState("horizontal");
  const [snapDirection, setSnapDirection] = React.useState("left");

  const animationConfig = React.useMemo(() => {
    const basic = {
      mode,
      snapDirection,
    };
    if (mode === "vertical") {
      return {
        ...basic,
        stackInterval: 8,
      };
    }
    return basic;
  }, [mode, snapDirection]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // console.log("props are : ", props)
    props.availableBalance ? setLoading(false) : setLoading(true);
  }, []);

  return (
    <View style={styles.container}>
      <Carousel
        style={{
          height: wp(60),
          width: PAGE_WIDTH,
          alignSelf: "center",
          justifyContent: "center",
        }}
        pagingEnabled={true}
        mode="vertical-stack"
        loop={true}
        width={wp(90)}
        height={wp(55)}
        autoPlay={false}
        autoPlayReverse={false}
        modeConfig={{
          showLength: 4,
          opacityInterval: 0.2,
        }}
        data={[...new Array(3).keys()]}
        animationConfig={animationConfig}
        defaultIndex={1}
        renderItem={({ index }) => {
          return (
            <View style={[styles.sliderContainer, global.shadow]}>
              {index == 0 ? (
                <>
                  <View style={global.row}>
                    <Image source={images.star} style={styles.star} />
                    <SuperText
                      value="EARNING RATE"
                      mSemiBold
                      color={colors.BLACK}
                      size={wp(4)}
                    />
                  </View>
                  <Spacer space={wp(2)} />
                  <LinearGradient
                    colors={[colors.GRADIENT1, colors.GRADIENT2]}
                    style={[styles.gradientBtn, { width: wp(50) }]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <SuperText
                      value={props.currentEarningRate}
                      mMedium
                      color={colors.WHITE}
                      size={wp(6)}
                    />
                    <Spacer row={wp(0.5)} />
                    {/* <SuperText
                      value={props.currentEarningRate}
                      mRegular
                      color={colors.WHITE}
                      size={wp(3)}
                      style={{alignSelf: 'flex-start', marginTop: wp(1.5)}}
                    /> */}
                    <Spacer row={wp(2)} />
                    <Image
                      source={images.logo_white}
                      style={{
                        width: wp(8),
                        height: wp(8),
                        borderRadius: 100,
                        backgroundColor: "transparent",
                      }}
                    />
                    <SuperText
                      value="Torq/h"
                      mMedium
                      color={colors.WHITE}
                      size={wp(5)}
                    />
                  </LinearGradient>
                  <Spacer space={wp(2)} />
                  <View style={global.row}>
                    <SuperText
                      value="Base 16.00"
                      mSemiBold
                      color={colors.BLACK}
                      size={wp(4)}
                    />
                    <Spacer row={wp(2)} />
                    <SuperText
                      value="Torq/h"
                      mSemiBold
                      color={colors.BLACK}
                      size={wp(4)}
                    />
                  </View>
                  <Spacer space={wp(2)} />
                  <View style={global.row}>
                    <Image source={images.people} />
                    <Spacer row={wp(1)} />
                    <SuperText
                      value={`${
                        props?.bonusOfReferral ? props.bonusOfReferral : "0"
                      }%`}
                      mSemiBold
                      color={colors.BLACK}
                      size={wp(4)}
                    />
                    <Spacer row={wp(3)} />
                    <Image source={images.rating} />
                    <Spacer row={wp(1)} />
                    <SuperText
                      value={`${
                        props?.bonusWheelBonus ? props.bonusWheelBonus : "0"
                      }%`}
                      mSemiBold
                      color={colors.BLACK}
                      size={wp(4)}
                    />
                    {/* <Spacer row={wp(3)} />
                    <Image source={images.db} />
                    <Spacer row={wp(1)} />
                    <SuperText
                      value={`+${props?.coins?props.coins:"0"}%`}
                      mSemiBold
                      color={colors.BLACK}
                      size={wp(4)}
                    /> */}
                  </View>
                  <Spacer space={wp(4)} />
                  <View
                    style={[
                      global.row,
                      { position: "absolute", bottom: wp(4) },
                    ]}
                  >
                    <View
                      style={[
                        styles.paggination,
                        { backgroundColor: colors.BLUE },
                      ]}
                    />
                    <View style={styles.paggination} />
                    <View style={styles.paggination} />
                  </View>
                </>
              ) : index == 1 ? (
                <>
                  <TouchableOpacity>
                    <SuperText
                      value="BALANCE"
                      mSemiBold
                      color={colors.BLACK}
                      size={wp(4)}
                    />
                  </TouchableOpacity>
                  <Spacer space={wp(0)} />
                  <View style={{ flexDirection: "column", gap: 3 }}>
                    <View>
                      <SuperText value={"Current"} color={colors.BLACK} />
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Image
                          source={images.down}
                          style={{ width: 16, height: 25 }}
                        />
                        <Spacer row={wp(1)} />
                        {props.loading ? (
                          <ActivityIndicator
                            size={"large"}
                            color={colors.GRADIENT1}
                          />
                        ) : (
                          <View style={{ flexDirection: "row" }}>
                            <SuperText
                              value={`${
                                (props.availableBalance / 1)
                                  .toFixed(2)
                                  .split(".")[0]
                              }.`}
                              mSemiBold
                              color={colors.BLACK}
                              size={wp(5)}
                            />
                            <SuperText
                              value={`${
                                (props.availableBalance / 1)
                                  .toFixed(2)
                                  .split(".")[1]
                              }`}
                              mMedium
                              color={colors.BLACK}
                              size={wp(3)}
                            />
                          </View>
                        )}
                        <Spacer row={wp(2)} />
                        <SuperText
                          value="TORQ"
                          mSemiBold
                          color={colors.BLACK}
                          size={wp(5)}
                        />
                        <Spacer row={wp(0.5)} />
                        <TouchableOpacity onPress={props.onBalanceClick}>
                          <Image source={images.info} />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View>
                      <SuperText value={"Staked"} color={colors.BLACK} />
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Image
                          source={images.down}
                          style={{ width: 16, height: 25 }}
                        />
                        <Spacer row={wp(0.5)} />
                        {props.loading ? (
                          <ActivityIndicator
                            size={"large"}
                            color={colors.GRADIENT1}
                          />
                        ) : (
                          <View style={{ flexDirection: "row" }}>
                            <SuperText
                              value={`${
                                (props.stakingBalance / 1)
                                  .toFixed(2)
                                  .split(".")[0]
                              }.`}
                              mSemiBold
                              color={colors.BLACK}
                              size={wp(5)}
                            />
                            <SuperText
                              value={`${
                                (props.stakingBalance / 1)
                                  .toFixed(2)
                                  .split(".")[1]
                              }`}
                              mMedium
                              color={colors.BLACK}
                              size={wp(3)}
                            />
                          </View>
                        )}
                        <Spacer row={wp(2)} />
                        <SuperText
                          value="TORQ"
                          mSemiBold
                          color={colors.BLACK}
                          size={wp(5)}
                        />
                        <Spacer row={wp(0.5)} />
                        <TouchableOpacity onPress={props.onStakingClick}>
                          <Image source={images.info} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <Spacer space={wp(2)} />
                  <View>
                    <LinearGradient
                      colors={[colors.GRADIENT1, colors.GRADIENT2]}
                      style={styles.gradientBtn}
                      start={{ x: 0, y: 0.4 }}
                      end={{ x: 1.6, y: 0 }}
                    >
                      <SuperText
                        value="EARNING RATE"
                        mBold
                        color={colors.WHITE}
                        size={wp(4)}
                      />
                      <Spacer row={wp(2)} />
                      {props.loading ? (
                        <ActivityIndicator
                          size={"large"}
                          color={colors.GRADIENT1}
                        />
                      ) : (
                        <>
                          <SuperText
                            value={`${
                              (props.currentEarningRate / 1)
                                .toFixed(1)
                                .split(".")[0]
                            }.`}
                            mMedium
                            color={colors.WHITE}
                            size={wp(6)}
                          />
                          <Spacer row={wp(0.5)} />
                          <SuperText
                            value={`${
                              (props.currentEarningRate / 1)
                                .toFixed(1)
                                .split(".")[1]
                            }`}
                            mRegular
                            color={colors.WHITE}
                            size={wp(3)}
                            style={{
                              alignSelf: "flex-start",
                              marginTop: wp(1.5),
                            }}
                          />
                        </>
                      )}
                      <Spacer row={wp(1)} />
                      <Image
                        source={images.logo_white}
                        style={{
                          height: wp(8),
                          width: wp(8),
                          borderRadius: 100,
                          backgroundColor: "transparent",
                        }}
                      />
                      <SuperText
                        value="Torq/h"
                        mMedium
                        color={colors.WHITE}
                        size={wp(5)}
                      />
                    </LinearGradient>
                  </View>
                  <Spacer space={wp(2)} />
                  <View
                    style={[
                      global.row,
                      { position: "absolute", bottom: wp(4) },
                    ]}
                  >
                    <View style={styles.paggination} />
                    <View
                      style={[
                        styles.paggination,
                        { backgroundColor: colors.BLUE },
                      ]}
                    />
                    <View style={styles.paggination} />
                  </View>
                </>
              ) : (
                <>
                  <View style={global.row}>
                    <Image source={images.streak} />
                    <Spacer row={wp(1)} />
                    <SuperText
                      value="STREAK & BREAKS"
                      mSemiBold
                      color={colors.BLACK}
                      size={wp(4)}
                    />
                  </View>
                  <Spacer space={wp(2)} />
                  <View
                    style={[
                      global.row,
                      { justifyContent: "space-between", width: wp(50) },
                    ]}
                  >
                    <View style={{ alignItems: "center" }}>
                      <SuperText
                        value="STREAK"
                        mSemiBold
                        color={colors.BLACK}
                        size={wp(3.6)}
                      />
                      <SuperText
                        value={`${props.streak}`}
                        mSemiBold
                        color={colors.BLACK}
                        size={wp(8)}
                      />
                    </View>
                    <View style={{ alignItems: "center" }}>
                      <SuperText
                        value="BREAK DAYS"
                        mSemiBold
                        color={colors.BLACK}
                        size={wp(3.6)}
                      />
                      <SuperText
                        value={`${props.daysOff}`}
                        mSemiBold
                        color={colors.BLACK}
                        size={wp(8)}
                      />
                    </View>
                  </View>
                  <Spacer space={wp(2)} />
                  <SuperText
                    style={{ textAlign: "center" }}
                    value="Streak refers to how many consecutive days you have checked-in. For each 6 consecutive days you receive one break day."
                    mRegular
                    color={colors.GRAY5}
                    size={wp(3)}
                  />
                  <Spacer space={wp(4)} />
                  <View
                    style={[
                      global.row,
                      { position: "absolute", bottom: wp(4) },
                    ]}
                  >
                    <View style={styles.paggination} />
                    <View style={styles.paggination} />
                    <View
                      style={[
                        styles.paggination,
                        { backgroundColor: colors.BLUE },
                      ]}
                    />
                  </View>
                </>
              )}
            </View>
          );
        }}
      />
    </View>
  );
};

export default SliderView;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: hp(15),
  },
  gradientBtn: {
    width: wp(80),
    height: wp(11),
    borderRadius: wp(10),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  sliderContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.WHITE,
    borderRadius: wp(5),
    padding: wp(4),
  },
  paggination: {
    backgroundColor: colors.GRAY4,
    width: wp(2),
    height: wp(2),
    borderRadius: wp(4),
    marginHorizontal: wp(1.5),
  },
});
