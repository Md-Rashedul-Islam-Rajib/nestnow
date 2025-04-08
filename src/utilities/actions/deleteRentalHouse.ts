'use server'

import { auth } from "@/auth";

/* eslint-disable @typescript-eslint/no-explicit-any */


export const deleteRentalHouse = async (id:string) => {
    const session = await auth();
    const token = session?.user?.token;
    try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER!}/landlords/listings/${
            id
          }`,
          {
            method: "DELETE",
            headers: {
              Authorization: `${token}`,
            },
            
          }
        );

        if (!res.ok) {
            throw new Error("Failed to delete rental houses");
        }
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error: any) {
        throw new Error(error.message)
    }
}