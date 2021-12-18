// import axios
import axios from "axios";

// create a new axios instance with /api as the base URL
const axiosInstance = axios.create({
  baseURL: "/api/",
});

// add centralized error handling on receiving a response from the server
axiosInstance.interceptors.response.use(
  (res) => res,
  (e) => {
    const defaultMessage = "Возникла ошибка при выполнении запроса к серверу";
    // debugger;
    axiosInstance.$notifier.error(
      e?.response?.data?.error?.message || defaultMessage
    );
    return Promise.reject(e);
  }
);

export default axiosInstance;
