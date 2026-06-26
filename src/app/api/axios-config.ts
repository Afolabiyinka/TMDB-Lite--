import axios from "axios";
import { prodEndpoint, testingEndpoint, } from "../constants/api-data";

export const apiClient = axios.create({
   baseURL: testingEndpoint,
   headers: {
      "Content-Type": "application/json",
   },
   withCredentials: true,
});


