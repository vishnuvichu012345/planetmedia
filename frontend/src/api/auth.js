import axios from "axios";
import { API_BASE_URL, API_KEY } from "./config";

export const registerUser = async (data) => {
    try {
      return await axios.post(`/auth/local/register`, data, {
        headers: {
          "x-api-key": API_KEY,
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error registering user:", error.response?.data || error.message);
      throw error;
    }
  };
  

export const loginUser = async (data) => {
  try {
    return await axios.post(`/auth/local`, data, {
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json"
      },
    });
  } catch (error) {
    console.error("Error logging in user:", error.response?.data || error.message);
    throw error;
  }
};
