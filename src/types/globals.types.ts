import { z } from "zod";

export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: number | string;
  role: "admin" | "landlord" | "tenant";
  accessToken?: string;
  isBlocked?: boolean;
  isDeleted?: boolean;
};



export const rentalHouseSchema = z.object({
  location: z.string().nonempty({ message: "Location is required" }),
  description: z.string().nonempty({ message: "Description is required" }),
  rent_amount: z
    .number()
    .int()
    .positive({ message: "Rent amount is required" }),
  number_of_bedrooms: z
    .number()
    .int()
    .positive({ message: "Number of bedrooms is required" }),
  amenities: z.array(z.string()).nonempty({ message: "Amenities is required" }),
  landlord_ID: z.string().optional(),
  isDeleted: z.boolean().optional(),
  images: z.array(z.any().nullable()),
});
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

export type CreateRentalHouseFormValues = {
  location: string;
  description: string;
  rent_amount: number;
  number_of_bedrooms: number;
  amenities: [string, ...string[]];
  images: File[]; 
  landlord_ID?: string;
  isDeleted?: boolean;
};
export type RegisterFormValues = z.infer<typeof registerformSchema>;
export type LoginFormValues = z.infer<typeof loginformSchema>;