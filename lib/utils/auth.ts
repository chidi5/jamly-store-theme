"use server";

import axios from "axios";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const PUBLIC_DOMAIN = process.env.NEXT_PUBLIC_DOMAIN!;

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

    //console.log(response.data.token);

    const twoDays = 24 * 60 * 60 * 1000 * 2;
    //document.cookie = `auth-session=${response.data.token}; path=/; sameSite=none; secure;`;
    cookies().set({
      name: "auth-session",
      value: response.data.token,
      domain: `.${PUBLIC_DOMAIN}`,
      path: "/",
      secure: true,
      expires: Date.now() + twoDays,
    });

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
