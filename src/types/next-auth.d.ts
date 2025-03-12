import { DefaultSession, DefaultUser } from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User extends DefaultUser {
    accessToken?: string;
    role?: string; // Optional role
  }

  interface Session extends DefaultSession {
    user: {
      accessToken?: string;
      role: string; // Ensuring role exists in session
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    role?: string; // Optional role
  }
}
