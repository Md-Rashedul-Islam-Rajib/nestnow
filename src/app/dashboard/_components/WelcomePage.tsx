"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getUserInfo } from "@/utilities/actions/getUserInfo";
import { jwtDecode } from "jwt-decode";
import { LoaderCircle } from "lucide-react";
// import { formatDate } from "date-fns";

const WelcomePage = () => {
const { data: session } = useSession();
    const [userInfo, setUserInfo] = useState<any>(null);
     useEffect(() => {
       const fetchUser = async () => {
         const token = session?.user?.token;
         if (!token) return;

         try {
           const decoded = jwtDecode<{ userId: string }>(token);
           const userId = decoded.userId;

             const data = await getUserInfo();
             const user = data?.data?.find((u: any)=> u._id === userId )
           setUserInfo(user);
         } catch (err) {
           console.error("Failed to decode or fetch user:", err);
         }
       };

       fetchUser();
     }, [session]);
    
  if (!userInfo) {
    <div className="flex size-full min-h-dvh items-center justify-center">
      <LoaderCircle className="animate-spin transition-all duration-300 ease-in-out" />
    </div>;
  }
    return (
      <div className="max-w-3xl mx-auto mt-20 p-8 rounded-2xl shadow-lg bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Welcome, {userInfo?.name} 🎉
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-zinc-500">Email</p>
            <p className="font-semibold">{userInfo?.email}</p>
          </div>
          <div>
            <p className="text-sm text-zinc-500">Phone</p>
            <p className="font-semibold">{userInfo?.phone}</p>
          </div>
          <div>
            <p className="text-sm text-zinc-500">Role</p>
            <p className="font-semibold capitalize">{userInfo?.role}</p>
          </div>
          <div>
            <p className="text-sm text-zinc-500">Account Status</p>
            <p
              className={`font-semibold ${
                userInfo?.isBlocked ? "text-red-500" : "text-green-500"
              }`}
            >
              {userInfo?.isBlocked ? "Blocked" : "Active"}
            </p>
          </div>
          {/* <div className="sm:col-span-2">
            <p className="text-sm text-zinc-500">Account Created</p>
            <p className="font-semibold">
              {formatDate(new Date(userInfo?.createdAt), "PPPpp")}
            </p>
          </div> */}
        </div>
      </div>
    );
}

export default WelcomePage
