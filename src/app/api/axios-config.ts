import axios from "axios";
import { prodEndpoint, } from "../constants/api-data";

export const apiClient = axios.create({
   baseURL: prodEndpoint,
   headers: {
      "Content-Type": "application/json",
   },
   withCredentials: true,
});


