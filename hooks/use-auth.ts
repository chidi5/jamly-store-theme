// hooks/useAuth.js on website B (localhost:3001)
import { useState } from "react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const useAuth = () => {
  const [auth, setAuth] = useState({ user: null });

  const checkAuth = async () => {
    try {
      const response = await axios.get(`${API_URL}/customer/auth/check-auth`, {
        withCredentials: true,
      });
      setAuth({ user: response.data.user });
    } catch (error) {
      setAuth({ user: null });
    }
  };

  const signup = async (
    email: string,
    password: string,
    name: string,
    storeId: string
  ) => {
    try {
      const response = await axios.post(
        `${API_URL}/customer/auth/signup`,
        { email, password, name, storeId },
        { withCredentials: true }
      );
      setAuth({ user: response.data.user });
    } catch (error) {
      console.error("Signup failed", error);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        `${API_URL}/customer/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      setAuth({ user: response.data.user });
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const logout = async () => {
    await axios.post(
      `${API_URL}/customer/auth/logout`,
      {},
      { withCredentials: true }
    );
    setAuth({ user: null });
  };

  return { auth, checkAuth, signup, login, logout };
};
