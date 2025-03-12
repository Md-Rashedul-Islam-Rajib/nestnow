import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role || "tenant";
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role || "tenant";
        session.user.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },

  providers: [], 
} satisfies NextAuthConfig;
