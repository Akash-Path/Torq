import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
// const baseURL = "192.168.0.178:3000";
const baseURL = "http://digimonk.net:2737";
// getKycStatus

export const getKycStatus = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    const response = await axios.get(`${baseURL}/getKycStatus`, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.log(error.response);
    console.log("error code in getKycStatus : ", error.response.status);
    return 404;
  }
};

export const personalInfo = async (data) => {
  try {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    const response = await axios.post(`${baseURL}/personalInfo`, data, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.log("error code in personal info api : ", error.response.status);
    return 404;
  }
};

export const panCardFront = async (data) => {
  try {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    const response = await axios.post(`${baseURL}/upload/panCardFront`, data, {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.log("error code in panCardFront upload : ", error.response.status);
    if (error.response.status == 413) {
      return 413;
    }
    return 404;
  }
};

export const panCardBack = async (data) => {
  try {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    const response = await axios.post(`${baseURL}/upload/panCardBack`, data, {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.log("error code in panCardBack upload : ", error.response.status);
    if (error.response.status == 413) {
      return 413;
    }
    return 404;
  }
};

export const govDocFront = async (data) => {
  try {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    const response = await axios.post(`${baseURL}/upload/govDocFront`, data, {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.log("error code in govDocFront upload : ", error.response.status);
    if (error.response.status == 413) {
      return 413;
    }
    return 404;
  }
};

export const govDocBack = async (data) => {
  try {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    const response = await axios.post(`${baseURL}/upload/govDocBack`, data, {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.log("error code in govDocBack upload : ", error.response.status);
    if (error.response.status == 413) {
      return 413;
    }
    return 404;
  }
};

export const selfieUpload = async (data) => {
  try {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    const response = await axios.post(`${baseURL}/upload/selfie`, data, {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.log("error form backend is : ", error.response);
    console.log("error code in selfie upload : ", error.response.status);
    if (error.response.status == 413) {
      return 413;
    }
    return 404;
  }
};
