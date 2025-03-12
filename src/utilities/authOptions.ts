// /* eslint-disable @typescript-eslint/no-explicit-any */
// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { NextAuthOptions, User } from "next-auth";
// import GithubProvider from "next-auth/providers/github";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { loginUser } from "./actions/loginUser";


// declare module "next-auth" {
//   interface User {
//     accessToken?: string;
//   }

//   interface Session {
//     user: {
//       accessToken?: string;
//       role: string;
//       email?: string | null;
//       name?: string | null;
//       image?: string | null;
//     };
//   }
// }

// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email", required: true },
//         password: { label: "Password", type: "password", required: true },
//       },
//       async authorize(credentials) {
//         if (!credentials || !credentials.email || !credentials.password) {
//           throw new Error("Email and password are required.");
//         }

//         try {
//           const result = await loginUser(credentials);
//           console.log(result);
//           if (result?.userInfo?.success && result?.userInfo?.data) {
           
//             return {
//               id: result.userInfo.data.id, 
//               name: result?.userInfo?.data.name,
//               email: result?.userInfo?.data.email,
//               role: result?.userInfo?.data.role, 
//               accessToken: result?.userInfo?.data.token
//             };
//           }

//           throw new Error("Invalid email or password.");
//         } catch (error: any) {
//           throw new Error(
//             error?.message || "An error occurred while logging in."
//           );
//         }
//       },
//     }),
//     GithubProvider({
//       clientId: process.env.GITHUB_ID as string,
//       clientSecret: process.env.GITHUB_SECRET as string,
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),
//   ],
//   pages: {
//     signIn: "/login",
//   },
//   secret: process.env.NEXTAUTH_SECRET,

//   callbacks: {
//     async jwt({ token, user}) {
//       if (user) {
//         token.email = user.email;
//         token.role = user.role || "tenant"; 
//         token.accessToken = user.accessToken
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (session?.user) {
//         session.user.email = token.email as string;
//         session.user.role = token.role as string;
//         session.user.accessToken = token.accessToken as string
//       }
//       return session;
//     },
//     async signIn({ user, account }) {
//       if (account?.provider === "google" || account?.provider === "github") {
//         user.role = "tenant"; 
//       }
//       return true;
//     },
//   },
//   session: {
//     strategy: "jwt",
//   },
// };
