import axios from "axios";

const { API_URL: apiUrl } = import.meta.env;

const API = axios.create({
  baseURL: apiUrl,
});

export default API;
