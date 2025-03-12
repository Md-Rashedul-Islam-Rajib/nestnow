/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { signIn } from "@/auth";

import { LoginFormValues } from "@/types/globals.types";
import { cookies } from "next/headers";
import {jwtDecode} from "jwt-decode"

export const loginUser = async (data: LoginFormValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER!}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      
    });
    const userInfo = await res.json();
    console.log(userInfo);
    const cookiesStore = await cookies();
    cookiesStore.set("accessToken", userInfo?.data?.token);
    const accessToken = cookiesStore.get("accessToken")?.value;
    const decodedData = jwtDecode(accessToken as string);
    return {userInfo,decodedData};
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export async function socialLogin(formData:any) {
  const action = formData.get('action');
  await signIn(action, { redirectTo: "/" });
}