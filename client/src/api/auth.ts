import {api} from "./axios";
import {AxiosError} from "axios";

type Credentials = {
  username: string;
  password: string;
};

const logIn = async (credentials: Credentials) => {
  try {
    const response = await api.post("/sessions", credentials);
    return response.data; // returns the user object
  } catch (err) {
    if (err instanceof AxiosError) {
      const serverMessage =
        err.response?.data?.error || err.response?.data?.message;
      throw new Error(serverMessage || "Failed to log in.");
    }
    throw new Error("An unexpected error occurred during login.");
  }
};

const checkSession = async () => {
  try {
    const response = await api.get("/sessions/current");
    return response.data; // returns the user object if authenticated
  } catch (err) {
    if (err instanceof AxiosError) {
      const serverMessage =
        err.response?.data?.error || err.response?.data?.message;
      throw new Error(serverMessage || "Not authenticated.");
    }
    throw new Error("An unexpected error occurred while checking session.");
  }
};

const logOut = async () => {
  try {
    const response = await api.delete("/sessions/current");
    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      const serverMessage =
        err.response?.data?.error || err.response?.data?.message;
      throw new Error(serverMessage || "Failed to log out.");
    }
    throw new Error("An unexpected error occurred during logout.");
  }
};

export {logIn, checkSession, logOut};
