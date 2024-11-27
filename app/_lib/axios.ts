import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: false,
  withXSRFToken: true,
  headers: {
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    type: "web",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    const locale = localStorage.getItem("NEXT_LOCALE") || "ar";

    if (config.headers) {
      config.headers["Accept-Language"] = locale;
    }
    const country = localStorage.getItem("detectedCountry");
    if (country) {
      config.headers["country"] = country;
    }

    return config;
  },
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
