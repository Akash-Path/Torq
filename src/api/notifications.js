import messaging from "@react-native-firebase/messaging";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PermissionsAndroid } from "react-native";
import axios from "axios";
// const baseURL = "http://ec2-13-235-248-149.ap-south-1.compute.amazonaws.com:3000";
// const baseURL = 'http://192.168.18.49:3000';
// const baseURL = "192.168.0.178:3000";
const baseURL = "http://digimonk.net:2737";

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    console.log("Authorization status:", authStatus);
  }
};

export const GetFCMToken = async () => {
  // PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS)
  let fcmToken = await messaging().getToken();
  console.log("FCM is : ", fcmToken);
  return fcmToken;
};

export const notificatonListener = async () => {
  messaging().onNotificationOpenedApp((msg) => {
    console.log("caursed app to open from bg state");
    console.log(msg.notification);
  });

  messaging()
    .getInitialNotification()
    .then((msg) => {
      if (msg) {
        console.log("caused app to open from quit state");
        console.log(msg.notification);
      }

      messaging().onMessage(async (msg) => {
        console.log("notification on forground screen state");
        console.log(msg.notification);
      });
    });
};

export const sendNotification = async (data) => {
  try {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    console.log(data);
    const response = await axios.post(`${baseURL}/sendNotification`, data, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.log(
      "error code from send ping to one route : ",
      error.response.status
    );
    return 404;
  }
};

export const sendNotificationToAll = async (data) => {
  try {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    console.log(data);
    const response = await axios.post(
      `${baseURL}/sendNotificationToAll`,
      data,
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.log("error code from ping to all route : ", error.response.status);
    return 404;
  }
};

export const getNotifications = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    const response = await axios.get(`${baseURL}/getNotifications`, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    // const response = await fetch(`${baseURL}/getNotifications`, {
    //   method: 'GET',
    //   headers: {
    //     Authorization: token,
    //     'Content-Type': 'application/json',
    //   },
    // });
    // console.log("response from api direct is : ", response)
    // const data = await response.json();
    // console.log("notifications are : ", data);
    // return data;
    return response;
  } catch (error) {
    console.log(error);
    console.log(error.response);
    console.log(
      "error code from get notifications route : ",
      error.response.status
    );
    return 404;
  }
};

export const toggleNotification = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    // console.log(data);
    const response = await axios.post(
      `${baseURL}/toggleNotification`,
      {},
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.log("first is : ", error.response);
    console.log("error code from get stats route : ", error.response.status);
    return 404;
  }
};

export const toggleEmailNotification = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    // console.log(data);
    const response = await axios.post(
      `${baseURL}/toggleEmailNotification`,
      {},
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.log("first is : ", error.response);
    console.log("error code from get stats route : ", error.response.status);
    return 404;
  }
};
