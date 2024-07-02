import axios from "axios";
import { parseCookies } from "nookies";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const SignUp = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  storeId: string
) => {
  try {
    const response = await axios.post(
      `${API_URL}/${storeId}/customers/auth/sign-up`,
      {
        email,
        password,
        firstName,
        lastName,
        storeId,
      }
    );

    if (response.data.error) {
      return { error: response.data.error };
    }

    return { data: response.data, success: response.data.success };
  } catch (error) {
    console.error("Sign-up error:", error);
    if (axios.isAxiosError(error) && error.response) {
      return {
        error: error.response.data.error || "An unknown error occurred.",
      };
    }
    return { error: "An unknown error occurred." };
  }
};

export const SignIn = async (
  email: string,
  password: string,
  storeId: string
) => {
  try {
    const response = await axios.post(
      `${API_URL}/${storeId}/customers/auth/sign-in`,
      { email, password },
      {
        withCredentials: true, // Include credentials with requests
      }
    );

    if (response.data.error) {
      return { error: response.data.error };
    }

    //document.cookie = `auth-session=${response.data.token}; path=/; sameSite=none; secure;`;

    return { data: response.data, success: response.data.success };
  } catch (error) {
    console.error("Sign-in error:", error);
    if (axios.isAxiosError(error) && error.response) {
      return {
        error: error.response.data.error || "An unknown error occurred.",
      };
    }
    return { error: "An unknown error occurred." };
  }
};

export const getSession = () => {
  const cookies = parseCookies();
  const sessionToken = cookies["auth-session"];

  if (!sessionToken) {
    return null;
  }

  return sessionToken;
};
