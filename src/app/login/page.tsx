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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginformSchema, LoginFormValues } from "@/types/globals.types";
import { loginUser } from "@/utilities/actions/loginUser";

const Login = () => {
  const router = useRouter();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginformSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    // console.log(data);
    // form.reset();
    try {
      const res = await loginUser(data);
      if (res?.success) {
        toast.success(res?.message || "User logged successfully");
        router.push("/");
      }
    } catch (error: any) {
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
                Welcome back
              </CardTitle>
              <p className="text-gray-500 text-sm">Please enter your details</p>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  
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
                    Login
                  </Button>
                </form>
              </Form>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                >
                  Register
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
