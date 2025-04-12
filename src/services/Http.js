import axios from "axios";
import { BASE_API } from "../shared/constants/app";

const Http = axios.create({
  baseURL: BASE_API,
  withCredentials: true, // This is equivalent to credentials: 'include' in fetch
});

export default Http;
