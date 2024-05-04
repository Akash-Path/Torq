import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
// const baseURL = "http://ec2-13-235-248-149.ap-south-1.compute.amazonaws.com:3000"
// const baseURL = "http://192.168.18.49:3000"
// const baseURL = "192.168.0.178:3000";
const baseURL = "http://digimonk.net:2737";

export const activeTiers = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    const response = await axios.get(`${baseURL}/activeTiers`, {
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
