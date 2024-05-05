import axios from "axios";
// import retrieveToken from "./authRequests/retrieveTokens";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true,
  timeout: 60000 * 5,
});

export default axiosInstance;
