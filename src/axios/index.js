import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://untitled-twkmuar27a-uc.a.run.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const getToken = () => {
  return localStorage.getItem("authToken");
};

axiosInstance.interceptors.request.use(
  function (config) {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
