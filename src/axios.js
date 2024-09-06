import axios from "axios";

const instance = axios.create({
  baseURL: "https://frontend-mentor-apis-6efy.onrender.com",
});

instance.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = "Bearer your_token";
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error: ", error.response);
    return Promise.reject(error);
  }
);

export default instance;
