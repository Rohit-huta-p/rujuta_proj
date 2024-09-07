import axios from "axios";

axios.defaults.withCredentials = true;
const axiosInstance = axios.create({
    baseURL: "http://localhost:8000",
})

export default axiosInstance;