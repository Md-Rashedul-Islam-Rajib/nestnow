/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { LoginFormValues } from "@/types/globals.types";

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
    return userInfo;
  } catch (error:any) {
    throw new Error(error.message)
  }
    
}