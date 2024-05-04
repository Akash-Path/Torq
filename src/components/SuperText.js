import { Text } from "react-native";
import React from "react";
import { global } from "../res/global";

const SuperText = ({
  numberOfLines,
  value,
  style,
  bold,
  regular,
  medium,
  semiBold,
  color,
  size,
  light,
  mSemiBold,
  mMedium,
  mBold,
  mRegular,
  onPress,
}) => {
  return (
    <Text
      onPress={onPress}
      numberOfLines={numberOfLines}
      style={[
        style,
        bold && global.bold,
        regular && global.regular,
        mRegular && global.mRegular,
        mBold && global.mBold,
        mMedium && global.mMedium,
        mSemiBold && global.mSemiBold,
        light && global.light,
        medium && global.medium,
        semiBold && global.semiBold,
        color && { color: color },
        size && { fontSize: size },
      ]}
    >
      {value}
    </Text>
  );
};

export default SuperText;
