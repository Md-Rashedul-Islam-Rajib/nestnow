import { DefaultSession, DefaultUser } from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User extends DefaultUser {
    token?: string;
    role?: string; 
    id?: string;
  }

  interface Session extends DefaultSession {
    user: {
      token?: string;
      role: string; // Ensuring role exists in session
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    role?: string; // Optional role
  }
}
