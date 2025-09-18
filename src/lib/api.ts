import axios from "axios";

export const API_URL = "https://ursmartmonitoring.ur.ac.rw/api/v1";

// Configure base URL for axios
axios.defaults.baseURL = API_URL;

axios.interceptors.request.use(
  (config: any) => {
    // Add any security headers or tokens here
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Axios sending token:", token);
    } else {
      console.log("Axios: No token found in localStorage");
    }
    
    // Add CORS headers
    config.headers['Content-Type'] = 'application/json';
    config.headers['Accept'] = 'application/json';
    
    return config;
  },
  (error?: any) => {
    return Promise.reject(error);
  }
);

export default axios;

// Logout API call
export const logout = async () => {
  try {
    const response = await axios.post("/auth/logout");
    return response.data;
  } catch (error) {
    throw error;
  }
};
