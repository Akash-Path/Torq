import axios from "axios";
// const baseURL = "http://ec2-13-235-248-149.ap-south-1.compute.amazonaws.com:3000"
// const baseURL = "http://192.168.43.211:3000"
// const baseURL = "http://192.168.18.49:3000"
// const baseURL = "192.168.0.178:3000";
const baseURL = "http://digimonk.net:2737";

export const marketsData = async () => {
  try {
    const response = await axios.get(`${baseURL}/marketsData`);
    return response;
  } catch (error) {
    console.log("error code in Market stats : ", error.response.status);
    return 404;
  }
};

export const globalStats = async () => {
  try {
    const response = await axios.get(`${baseURL}/globalStats`);
    return response;
  } catch (error) {
    console.log("error code in Globle stats : ", error.response.status);
    return 404;
  }
};
