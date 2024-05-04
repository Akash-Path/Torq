import React, { useCallback, useEffect, useState } from "react";
import { styles } from "./style";
import LinearGradient from "react-native-linear-gradient";
import { colors } from "../../res/colors";
import Spacer from "../../components/Spacer";
import { data, hp, wp } from "../../res/constants";
import SuperText from "../../components/SuperText";
import { Alert, Image, TouchableOpacity, View } from "react-native";
import { global } from "../../res/global";
import { images } from "../../res/images";
import { SafeAreaView } from "react-native-safe-area-context";
import RnRangeSlider from "rn-range-slider";
import CheckBox from "@react-native-community/checkbox";
import Button from "../../components/Button";
import { getProfile, startStaking } from "../../api/homePageApi";
import { useUser } from "../../../context/UserContext";

const PreStalking = (props) => {
  const [low1, setLow1] = useState(2);
  const [low2, setLow2] = useState(75);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);

  const { popupClicked, togglePopupClicked } = useUser();

  const getuser = async () => {
    setLoading(true);
    const response = await getProfile();
    if (response == 404) {
      console.log("error in getting the profile in profile screen");
    } else {
      console.log("response in profile screen is here ");
      console.log(response.data);
      setBalance(response?.data?.balance);
    }
    setLoading(false);
  };
  let perentBalance = balance * (low2 / 100);
  let totalEarningsafterInterestCalculation =
    low1 == 1
      ? perentBalance * 0.25
      : low1 == 2
      ? perentBalance * 0.65
      : low1 == 3
      ? perentBalance * 1.2
      : low1 == 4
      ? perentBalance * 1.9
      : low1 == 5
      ? perentBalance * 2.75
      : 0;

  // console.log("total perent balance :: ", perentBalance);
  // console.log("total earning after interest calcultaion : ", (totalEarningsafterInterestCalculation + perentBalance));
  // let handleStakingRate =   16 + ((totalEarningsafterInterestCalculation + perentBalance)/(low1 * 8760));
  let handleStakingRate = totalEarningsafterInterestCalculation;
  // let handleStakingRate =   16 + ((totalEarningsafterInterestCalculation)/(low1 * 8760));
  handleStakingRate = low1 == 0 || low2 == 0 ? 0 : handleStakingRate;
  // (totalEarningsafter interest calculation)/(no.Of years * 8760);

  const renderRail = useCallback(() => <View style={styles.rail} />, []);
  const renderRailSelected = useCallback(
    () => <View style={styles.railSelected} />,
    []
  );
  const renderThumb = useCallback(() => <View style={styles.root}></View>, []);

  const handlePrestaking = async () => {
    if (toggleCheckBox) {
      const data = {
        percentage: low2,
        years: low1,
      };
      console.log(data);
      const response = await startStaking(data);
      if (response == 409) {
        Alert.alert(
          "Cannot start staking!",
          "Staking deposit can not be created. Wait for cool down period"
        );
        return;
      }
      if (response == 500) {
        Alert.alert("Cannot start staking!", "Server Error! Please");
      }
      if (response == 404) {
        Alert.alert(
          "Cannot start staking!",
          "Inactive users can't stake deposit"
        );
        return;
        // Alert.alert('Cannot start staking!', "You already staked you balance so wait for cool down period of 10 days");
      } else {
        await togglePopupClicked();
        console.log(response.data);
        Alert.alert("Started staking!");
        props.navigation.navigate("Home");
      }
    } else {
      Alert.alert("Please accept terms and conditions first!");
    }
  };

  useEffect(() => {
    getuser();
  }, []);

  const showLowBalancePopup = () => {
    Alert.alert("Low Balance", "You cannot Pre-Stake as you balance is 0!");
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
              // value="Pre-Staking"
              value="Staking"
              medium
              color={colors.WHITE}
              size={wp(5)}
              style={{ alignSelf: "center" }}
            />
            <View style={{ width: wp(20) }}></View>
          </View>
          <Spacer space={wp(2)} />
          <SuperText
            value={`Stake our Torq rewards for up to 5 years and\nearn torq up to 275%.`}
            regular
            color={colors.WHITE}
            size={wp(3.4)}
            style={{ textAlign: "center" }}
          />
        </SafeAreaView>
      </LinearGradient>
      <View style={styles.subView}>
        <Spacer space={wp(2)} />
        <View style={[styles.mainWrapper, global.shadow]}>
          <SuperText
            value="You will earn:"
            mSemiBold
            color={colors.BLACK}
            size={wp(3.5)}
            style={{ alignSelf: "center" }}
          />
          <Spacer space={wp(2.5)} />
          <View style={[global.row, { justifyContent: "center" }]}>
            <SuperText
              value={`${(handleStakingRate / 1).toFixed(2)}`}
              mBold
              color={colors.BLACK}
              size={wp(7)}
            />
            <Image source={images.logo} style={styles.logo} />
            <SuperText value="Torq" mBold color={colors.BLACK} size={wp(7)} />
          </View>
          <Spacer space={wp(2.5)} />
          <SuperText
            value={`INTEREST RATE: ${
              low1 == 1
                ? 25
                : low1 == 2
                ? 65
                : low1 == 3
                ? 120
                : low1 == 4
                ? 190
                : low1 == 5
                ? 275
                : 0
            }%`}
            mSemiBold
            color={colors.BLACK}
            size={wp(3.5)}
            style={{ alignSelf: "center" }}
          />

          <Spacer space={wp(3)} />
          <View
            style={[
              global.row,
              { justifyContent: "space-between", marginHorizontal: wp(4.5) },
            ]}
          >
            <Image source={images.years} />
            <SuperText
              value="Years"
              regular
              color={colors.GRAY5}
              size={wp(3.5)}
              style={{ width: wp(62) }}
            />
            <SuperText
              value={low1}
              regular
              color={colors.BLACK}
              size={wp(4)}
              style={{ width: wp(10), textAlign: "right" }}
            />
          </View>
          <RnRangeSlider
            style={styles.slider}
            low={low1}
            min={0}
            max={5}
            step={1}
            disableRange
            renderThumb={renderThumb}
            renderRail={renderRail}
            renderRailSelected={renderRailSelected}
            onValueChanged={(low, high) => {
              setLow1(low);
            }}
          />
          <Spacer space={wp(2)} />
          <View
            style={[
              global.row,
              { justifyContent: "space-between", marginHorizontal: wp(4.5) },
            ]}
          >
            <Image source={images.allocation} />
            <SuperText
              value="Allocation"
              regular
              color={colors.GRAY5}
              size={wp(3.5)}
              style={{ width: wp(62) }}
            />
            <SuperText
              value={low2 + "%"}
              regular
              color={colors.BLACK}
              size={wp(4)}
              style={{ width: wp(10), textAlign: "right" }}
            />
          </View>
          <RnRangeSlider
            style={styles.slider}
            low={low2}
            min={0}
            max={100}
            step={1}
            disableRange
            renderThumb={renderThumb}
            renderRail={renderRail}
            renderRailSelected={renderRailSelected}
            onValueChanged={(low, high) => {
              setLow2(low);
            }}
          />
          <Spacer space={wp(3)} />
          <SuperText
            value={`Staking is a process that involves committing your crypto assets to support a blockain network and confirmtransactions.`}
            regular
            color={colors.BLACK}
            size={wp(3.4)}
            style={{ textAlign: "center", paddingHorizontal: wp(4) }}
          />
        </View>
        <Spacer space={wp(3)} />
        <View style={[global.row, { width: wp(80), alignSelf: "center" }]}>
          <TouchableOpacity
            style={{
              width: wp(5),
              height: wp(5),
              borderWidth: 1,
              borderColor: "black",
            }}
          >
            <CheckBox
              disabled={false}
              boxType="square"
              style={{
                width: wp(6),
                height: wp(6),
                marginLeft: -8,
                marginTop: -3,
                borderColor: "black",
              }}
              value={toggleCheckBox}
              onValueChange={(newValue) => setToggleCheckBox(newValue)}
            />
          </TouchableOpacity>
          <Spacer row={wp(1)} />
          <SuperText
            style={{ width: wp(70) }}
            value="I agree to the Torq Staking Terms. Your Torq holdings will be locked for the selected period."
            regular
            color={colors.BLACK}
            size={wp(3)}
          />
        </View>
        {/* <View style={[global.row, {width: wp(100), justifyContent:"center", alignSelf: 'center', marginTop:10}]}>

          {balance == 0? 
          <SuperText
          style={{width: wp(70)}}
          value="Cannot prestake now! As you balance is 0"
          regular
          color={"red"}
          size={wp(3)}
          />
          : <></> }
          </View> */}
        <Spacer space={hp(2)} />
        <Button
          onPress={() => {
            balance == 0 ? showLowBalancePopup() : handlePrestaking();
          }}
          label={"Stake Now!"}
        />
      </View>
    </>
  );
};

export default PreStalking;
