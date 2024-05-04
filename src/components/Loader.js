import {StyleSheet, Text, View, Animated, Easing} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
// import {Audio} from 'react-loader-spinner';
// import {Bubbles} from "react-native-loader";
// import AnimatedLoader from 'react-native-animated-loader';
// import { CirclesLoader } from 'react-native-indicator';

const Loader = ({color, durationMs}) => {
  const rotationDegree = useRef(new Animated.Value(0)).current;

  const startRotationAnimation = (durationMs, rotationDegree) => {
    Animated.loop(
      Animated.timing(rotationDegree, {
        toValue: 360,
        duration: durationMs,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  };

  useEffect(() => {
    startRotationAnimation(durationMs, rotationDegree);
  }, [durationMs, rotationDegree]);

  return (
    <View style={styles.container} accessibilityRole="progressbar">
      <View style={[styles.background, {borderColor: color}]} />
      <Animated.View
      testID={'loading'}
        style={[
          styles.progress,
          {borderTopColor: color},
          {
            transform: [
              {
                rotateZ: rotationDegree.interpolate({
                  inputRange: [0, 360],
                  outputRange: ['0deg', '360deg'],
                }),
              },
            ],
          },
        ]}
      />
    </View>
  );
};

export default Loader;

const height = 40;
const styles = StyleSheet.create({
  container: {
    width: height,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    width: '100%',
    height: '100%',
    borderRadius: height / 2,
    borderWidth: 4,
    opacity: 0.25,
  },
  progress: {
    width: '100%',
    height: '100%',
    borderRadius: height / 2,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderWidth: 4,
    position: 'absolute',
  },
});
