import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth;

export const config = {

  matcher: [
    "/((?!register|login|forgot-password|account-verification|.*\\.[\\w]+$|_next).*)",
  ],
};
