import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3001/api",
  timeout: 10000,
  withCredentials: true, // this makes it so the session cookies are sent
  headers: {
    "Content-Type": "application/json",
  },
});
