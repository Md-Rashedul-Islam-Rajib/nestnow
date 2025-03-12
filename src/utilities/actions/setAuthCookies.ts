'use server'

import { cookies } from "next/headers";

export async function setAuthCookies(token: string) {
  const cookieStore = await cookies();
  cookieStore.set("accessToken", token, {
    maxAge: 24 * 60 * 60,
  });
}
