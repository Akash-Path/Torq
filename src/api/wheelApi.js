import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
// const baseURL = "http://ec2-13-235-248-149.ap-south-1.compute.amazonaws.com:3000"
// const baseURL = "http://192.168.18.49:3000"
// const baseURL = "192.168.0.178:3000";
const baseURL = "http://digimonk.net:2737";

export const checkEligibilyForBonusWheel = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    // const response = await axios.get(`${baseURL}/checkEligibilyForBonusWheel`, {
    //     headers:{
    //         Authorization: token,
    //         'Content-Type': 'application/json',
    //     }
    // });

    // return response;

    const response = await fetch(`${baseURL}/checkEligibilyForBonusWheel`, {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log("resp is yes in eligibility for bonus wheel : ", data);
    return data;
  } catch (error) {
    console.log(error);
    console.log(
      "error code in checkEligibilyForBonusWheel : ",
      error.response.status
    );
    return 404;
  }
};

export const bonusWheelReward = async (data) => {
  try {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    const response = await axios.post(`${baseURL}/bonusWheelReward`, data, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    // const response = await fetch(`${baseURL}/bonusWheelReward`, {
    //     method: 'POST',
    //     headers: {
    //         'Authorization': token,
    //         'Content-Type': 'application/json'
    //     },
    //     body:JSON.stringify(data)
    // })
    // const resp = await response.json();
    // console.log("resp is : ", resp)
    // return resp;
    return response;
  } catch (error) {
    console.log(error.response);
    console.log("error code in bonusWheelReward : ", error.response.status);
    return 404;
  }
};
