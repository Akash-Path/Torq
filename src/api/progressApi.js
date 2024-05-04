import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
// const baseURL = "192.168.0.178:3000";
const baseURL = "http://digimonk.net:2737";

export const getProgress = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    const response = await axios.get(`${baseURL}/getProgress`, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.log("error code in getProgress : ", error.response.status);
    return 404;
  }
};

export const followOnTwitter = async (data) => {
  try {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    const response = await axios.post(`${baseURL}/followOnTwitter`, data, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.log(error.response);
    console.log("error code in followOnTwitter : ", error.response.status);
    return 404;
  }
};

export const followOnTelegram = async (data) => {
  try {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    const response = await axios.post(`${baseURL}/followOnTelegram`, data, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.log("error code in followOnTelegram : ", error.response.status);
    return 404;
  }
};

// New APIs of followOnInstagram, followOnWhatsApp, invite5Friends, reviewOnPlayStore

export const followOnInstagram = async (data) => {
  try {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    const response = await axios.post(`${baseURL}/followOnInstagram`, data, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.log(error.response);
    console.log("error code in followOnInstagram : ", error.response.status);
    return 404;
  }
};

export const joinOnWhatsApp = async (data) => {
  try {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    const response = await axios.post(`${baseURL}/joinOnWhatsApp`, data, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.log(error.response);
    console.log("error code in joinOnWhatsApp : ", error.response.status);
    return 404;
  }
};

export const reviewOnPlayStore = async (data) => {
  try {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    const response = await axios.post(`${baseURL}/reviewOnPlayStore`, data, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.log(error.response);
    console.log("error code in reviewOnPlayStore: ", error.response.status);
    return 404;
  }
};
