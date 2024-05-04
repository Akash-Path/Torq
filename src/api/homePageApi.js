import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Alert } from "react-native";
// const baseURL = "http://ec2-13-235-248-149.ap-south-1.compute.amazonaws.com:3000"
// const baseURL = "http://192.168.18.49:3000"
// const baseURL = "192.168.0.178:3000";
const baseURL = "http://digimonk.net:2737";

export const startMining = async (data) => {
  try {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    const response = await axios.post(`${baseURL}/startMining`, data, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.log("error code in start mining : ", error.response.status);
    return 404;
  }
};

export const startStaking = async (data) => {
  try {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    console.log(data);
    const response = await axios.post(`${baseURL}/startStaking`, data, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.log(error.response);
    console.log("error code in start staking : ", error.response.status);
    if (error.response.status == 409) {
      return 409;
    }
    if (error.response.status == 404) {
      return 404;
    }
    if (error.response.status == 500) {
      return 500;
    }
    return 404;
  }
};

export const homeDetails = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    const response = await axios.get(`${baseURL}/home`, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.log("error code in Home details : ", error.response.status);
    if (error.response.status == 401) {
      return 401;
    }
    return 404;
  }
};

export const getConstants = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    const response = await axios.get(`${baseURL}/earningCalculator`, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.log(
      "error code in getting the constants : ",
      error.response.status
    );
    if (error.response.status == 401) {
      return 401;
    }
    return 404;
  }
};

export const getProfile = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    const response = await axios.get(`${baseURL}/getProfile`, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.log("error code in Home details : ", error.response.status);
    return 404;
  }
};

export const deleteAccount = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    const response = await axios.delete(`${baseURL}/deleteAccount`, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.log("error code in delete account : ", error.response.status);
    return 404;
  }
};

export const getInfo = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    const response = await axios.get(`${baseURL}/getInfo`, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.log("error code in getInfo : ", error.response.status);
    return 404;
  }
};

export const balanceHistory = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    const response = await axios.get(`${baseURL}/balanceHistory`, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.log("error code in balanceHistory : ", error.response.status);
    return 404;
  }
};

export const getUserBurningCards = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    const response = await axios.get(`${baseURL}/getUserBurningCards `, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.log("error code in balanceHistory : ", error.response.status);
    return 404;
  }
};

export const stakingHistory = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    const response = await axios.get(`${baseURL}/getStakingInfo`, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.log("error code in staking history : ", error.response.status);
    return 404;
  }
};

export const balanceHistoryOfSpecificDate = async (data) => {
  try {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    // const response = await axios.post(`${baseURL}/balanceHistoryOfSpecificDate`,data, {
    //     headers:{
    //         Authorization: token,
    //         'Content-Type': 'application/json',
    //     }
    // });
    // console.log("data is  : ", data);
    // console.log('resp is : ,', response);
    // return response;

    const response = await fetch(`${baseURL}/balanceHistoryOfSpecificDate`, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(response);
    let dat = await response.json();
    return dat;
  } catch (error) {
    console.log("error is : ", error);
    console.log(
      "error code in balanceHistory specific date : ",
      error.response.status
    );
    return 404;
  }
};

export const uploadPhoto = async (data) => {
  try {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    const response = await axios.post(`${baseURL}/uploadPhoto`, data, {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.log(error.response);
    console.log("error code in photo upload : ", error.response.status);
    if (error.response.status == 413) {
      return 413;
    }
    return 404;
  }
};
