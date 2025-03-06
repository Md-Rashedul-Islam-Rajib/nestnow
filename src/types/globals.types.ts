import { z } from "zod";

export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: number | string;
  role: "admin" | "landlord" | "tenant";
  isBlocked?: boolean;
  isDeleted?: boolean;
};

export const registerformSchema = z.object({
    name: z.string().nonempty({ message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().nonempty({ message: "Phone number is required" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    role: z.enum(['landlord','tenant', 'admin']),
})
export const loginformSchema = z.object({
  email: z.string().email({message: "Invalid email address"}),
  password: z.string()
})

  
export type RegisterFormValues = z.infer<typeof registerformSchema>;
export type LoginFormValues = z.infer<typeof loginformSchema>;