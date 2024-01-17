import axios from "axios";

const instance = axios.create({
  baseURL: "http://159.223.71.166:5010"
});
instance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("user"))?.jwt_token;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  }, 
  (error) => {
    console.log(error);
    console.log("error"); 
   // remove token from local storage
    if(error.response.status === 401){
      localStorage.removeItem("user");
    }
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // remove token from local storage
    if(error.response.status === 401){
      localStorage.removeItem("user");
      window.location.href = "/auth";
    }
    return Promise.reject(error);
  }
);

export default instance;
