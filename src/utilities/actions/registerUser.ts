/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { TUser } from "@/types/globals.types";

export const registerUser = async (data: TUser) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER!}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        cache: "no-store",
      }
    );
    const userInfo = await res.json();
    return userInfo;
  } catch (error: any) {
    throw new Error(error.message)
    
  }
    
} 