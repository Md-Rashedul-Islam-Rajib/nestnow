/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerformSchema, RegisterFormValues } from "@/types/globals.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { registerUser } from "@/utilities/actions/registerUser";
import Link from "next/link";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Register = () => {
  const router = useRouter();
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerformSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      role: "tenant",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    // console.log(data);
    // form.reset();
    try {
      const res = await registerUser(data);
      if (res?.success) {
        toast.success(res?.message || "User registered successfully");
        router.push("/login");
      }
    } catch (error:any) {
      toast.error(error?.message || "Something went wrong");
    }
  };

  return (
    <div className="relative min-h-screen bg-[url('/assets/register.jpg')] bg-cover bg-center flex justify-center items-center text-white px-6">
      <div className="absolute inset-0 bg-gray-950/70"></div>
      <div className="relative z-10 my-6 md:my-0 grid grid-cols-1 rounded-xl items-center">
        <div className="flex items-center justify-center">
          <Card className="w-full max-w-lg shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">
                Create an Account
              </CardTitle>
              <p className="text-gray-500 text-sm">Sign up to get started</p>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            autoComplete="name"
                            placeholder="Your Name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            autoComplete="email"
                            placeholder="Enter email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone" // ✅ Fixed: Changed from "email" to "phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            autoComplete="phone"
                            placeholder="Your phone"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <FormControl>
                          <RadioGroup
                            defaultValue="tenant"
                            className="flex gap-4"
                            onValueChange={field.onChange}
                          >
                            <FormItem className="flex items-center space-x-2">
                              <RadioGroupItem value="tenant" id="tenant" />
                              <FormLabel htmlFor="tenant">Tenant</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2">
                              <RadioGroupItem value="landlord" id="landlord" />
                              <FormLabel htmlFor="landlord">Landlord</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            autoComplete="password"
                            placeholder="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2"
                  >
                    Register
                  </Button>
                </form>
              </Form>
              <p className="text-center text-sm text-gray-600 mt-4">
                Already have an account?
                <Link href={"/login"}>
                  <span className="text-indigo-600 cursor-pointer">
                    {" "}
                    Log in
                  </span>
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register;
