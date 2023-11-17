import axios from "axios";

const AxiosClient = axios.create();

AxiosClient.defaults.baseURL = "https://internship-43hq.onrender.com";

export default AxiosClient;
