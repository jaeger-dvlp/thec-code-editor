import axios from "axios";

const { VITE_API_URL: apiUrl, VITE_API_TOKEN: apiToken } = import.meta.env;

const API = axios.create({
  baseURL: apiUrl,
  headers: {
    authorization: `Bearer ${apiToken}`,
  },
});

export default API;
