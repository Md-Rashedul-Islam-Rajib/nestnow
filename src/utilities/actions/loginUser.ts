/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { signIn } from "@/auth";

export async function socialLogin(formData:any) {
  const action = formData.get('action');
  await signIn(action, { redirectTo: "/" });
}