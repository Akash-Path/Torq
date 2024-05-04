/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import messaging from "@react-native-firebase/messaging";
import "./firebase.config";
import TrackPlayer from "react-native-track-player";
import { PlaybackService } from "./service";

messaging().setBackgroundMessageHandler(async (msg) => {
  console.log("gb handler : ", msg);
});
TrackPlayer.registerPlaybackService(() => PlaybackService);
// TrackPlayer.registerPlaybackService(() => events);

AppRegistry.registerComponent(appName, () => App);
