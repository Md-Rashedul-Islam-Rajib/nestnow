'use server'


/* eslint-disable @typescript-eslint/no-explicit-any */


export const getUserInfo = async () => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER!}/auth`,);

        if (!res.ok) {
            throw new Error("Failed to fetch rental houses");
        }
    const data = await res.json();
        return data;
    }catch (error: any) {
        throw new Error(error.message)
    }

              
     

  
}
