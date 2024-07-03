"use server";

import axios from "axios";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { deleteCookie, getCookie } from "../queries";
import { error } from "console";
import { Session } from "@/types";

const parseKey = (key: string) => {
  return key.split("\\n").join("\n");
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const PUBLIC_DOMAIN = process.env.NEXT_PUBLIC_DOMAIN!;
const production = process.env.NODE_ENV === "production";
const cert = parseKey(process.env.NEXT_PUBLIC_JWT_PUBLIC_KEY!);

export const signUp = async (
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

export const signIn = async (
  email: string,
  password: string,
  storeId: string
) => {
  try {
    const response = await axios.post(
      `${API_URL}/${storeId}/customers/auth/sign-in`,
      { email, password },
      {
        withCredentials: true,
      }
    );

    if (response.data.error) {
      return { error: response.data.error };
    }

    const twoDays = 24 * 60 * 60 * 1000 * 2;

    cookies().set({
      name: "auth-session-token",
      value: response.data.token,
      domain: production ? `.${PUBLIC_DOMAIN}` : "",
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

export const signOut = async () => {
  await deleteCookie("auth-session-token");
  return;
};

export const getSession = async (): Promise<{
  user: Session | null;
  error?: string;
  success?: boolean;
}> => {
  const cookie = await getCookie("auth-session-token");

  if (!cookie) {
    return { user: null, error: "Token is required!" };
  }

  const token = cookie.value;

  const decoded = jwt.verify(token, cert, {
    algorithms: ["RS256"],
  }) as JwtPayload & Session;

  if (!decoded) {
    return { user: null, error: "User not found!" };
  }

  return { user: decoded, success: true };
};
