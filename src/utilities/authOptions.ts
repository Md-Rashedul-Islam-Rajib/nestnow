/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from "jsonwebtoken";
import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "./actions/loginUser";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", required: true },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Email and password are required.");
        }

        try {
          const result = await loginUser(credentials);

          if (result?.success && result.data) {
            const decoded: any = jwt.decode(result?.data?.token)
            return {
              id: decoded.id, 
              name: decoded.name,
              email: decoded.email,
              role: decoded.role || "tenant", 
            };
          }

          throw new Error("Invalid email or password.");
        } catch (error: any) {
          throw new Error(
            error?.message || "An error occurred while logging in."
          );
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user}) {
      if (user) {
        token.email = user.email;
        token.role = user.role || "tenant"; 
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.email = token.email as string;
        session.user.role = token.role as string;
      }
      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider === "google" || account?.provider === "github") {
        user.role = "tenant"; 
      }
      return true;
    },
  },
  session: {
    strategy: "jwt",
  },
};
