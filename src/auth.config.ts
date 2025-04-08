import { NextAuthConfig } from "next-auth";

export const authConfig = {
  callbacks: {
    async jwt({ token, user }) {
      console.log("user in jwt callback", user);
      if (user) {
        token.role = user.role || "tenant";
        token.accessToken = user.token;
        token.userId = user.userId;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("token in session callback", token);
      if (session.user) {
        session.user.role = token.role || "tenant";
        session.user.token = token.accessToken as string;
        session.user.id = token.userId as string;
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
  providers: [
  ],
} satisfies NextAuthConfig;
