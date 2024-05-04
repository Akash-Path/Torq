import axios from "axios";
// export const baseURL = "http://ec2-13-235-248-149.ap-south-1.compute.amazonaws.com:3000"
// export const baseURL = "http://192.168.18.49:3000"
// const baseURL = "https://torqnetwork.vercel.app/"
// export const baseURL = "192.168.0.178:3000";
export const baseURL = "http://digimonk.net:2737";

export const login = async (data) => {
  try {
    console.log(data);
    const response = await axios.post(`${baseURL}/login`, data);
    return response;
  } catch (error) {
    console.log("error is : ", error);
    // console.log("error code in login : ", error.response.status)
    return 404;
  }
};
export const register = async (data) => {
  try {
    const response = await axios.post(`${baseURL}/signUp`, data);
    return response;
  } catch (error) {
    if (error.response.data.message == "Invalid Invitation Code!") {
      return 400;
    }
    if (error.response.status == 409) {
      return 409;
    }
    console.log(error.response.data);
    console.log("error code in register : ", error.response.status);
    // console.log("first : ", error.response)
    return 404;
  }
};
// export const register = async (data) => {
//   try {
//     const response = await axios.post(`${baseURL}/signUp`, data);
//     return response;
//   } catch (error) {
//     return {
//       status: error.response.status,
//       message: error.response.data,
//     };
//   }
// };
export const verifyOTPAPI = async (data) => {
  try {
    const response = await axios.post(`${baseURL}/verify`, data);
    return response;
  } catch (error) {
    console.log(error, "error from verifyOTPAPI");
  }
};

export const forgotPassword = async (data) => {
  try {
    const response = await axios.post(`${baseURL}/requestResetPassword`, data);
    return response;
  } catch (error) {
    console.log("error code in requestResetPassword : ", error.response.status);
    return 404;
  }
};

export const resetPassword = async (data) => {
  try {
    const response = await axios.post(`${baseURL}/resetPassword`, data);
    return response;
  } catch (error) {
    console.log("error code in resetPassword : ", error.response.status);
    return 404;
  }
};

export const loginGoogle = async (data) => {
  try {
    const response = await axios.post(`${baseURL}/googleAuth`, data);

    console.log("---------------------------------------:", response, data);
    return response;
  } catch (error) {
    console.log(error.response);
    console.log("error code in login : ", error.response.status);
    return 404;
  }
};

export const loginGoogleCallback = async () => {
  try {
    const response = await axios.get(`${baseURL}/google/callback`);
    return response;
  } catch (error) {
    console.log("error code in login : ", error.response.status);
    return 404;
  }
};
