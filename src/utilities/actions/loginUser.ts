/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { signIn } from "@/auth";

export async function socialLogin(formData:any) {
  const action = formData.get('action');
  await signIn(action, { redirectTo: "/" });
}


export const credSignIn = async (data: {email: string, password: string}) => {
  try {
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    return result;
  } catch (error) {
    throw error;
  }
};