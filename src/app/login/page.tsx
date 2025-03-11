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
import { Icon } from "@iconify/react";
import { signIn } from "next-auth/react";
import { Separator } from "@/components/ui/separator";

const Login = () => {
  const router = useRouter();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginformSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const res = await loginUser(data);
      console.log(res);
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
      <div className="absolute inset-0 bg-gray-950/80 backdrop-blur-sm"></div>
      <div className="relative z-10 flex items-center justify-center">
        <Card className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-6">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-semibold ">
              Welcome Back 
            </CardTitle>
            <p className="text-gray-300 text-sm mt-1">
              Log in to continue exploring.
            </p>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Email</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="email"
                          placeholder="Enter email"
                          className="bg-gray-900 text-white border-gray-700 focus:border-indigo-500 focus:ring-indigo-500"
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
                      <FormLabel className="text-gray-300">Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          autoComplete="password"
                          placeholder="Enter password"
                          className="bg-gray-900 text-white border-gray-700 focus:border-indigo-500 focus:ring-indigo-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white"
                >
                  Login
                </Button>
              </form>
            </Form>

            <p className="text-center text-gray-300 mt-4">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-indigo-400 font-semibold hover:underline"
              >
                Register
              </Link>
            </p>

            <div className="flex items-center gap-2 my-6">
              <Separator className="flex-1 bg-gray-600" />
              <p className="text-gray-400 text-sm">OR</p>
              <Separator className="flex-1 bg-gray-600" />
            </div>

            {/* Social Login Buttons */}
            <div className="flex flex-col gap-3">
              <Button
                onClick={() =>
                  signIn("google", {
                    callbackUrl: "http://localhost:3000/dashboard",
                  })
                }
                className="w-full flex items-center gap-3 bg-gray-800 hover:bg-gray-700 text-white"
              >
                <Icon icon="flat-color-icons:google" width="22" height="22" />
                Sign in with Google
              </Button>

              <Button
                onClick={() =>
                  signIn("github", {
                    callbackUrl: "http://localhost:3000/dashboard",
                  })
                }
                className="w-full flex items-center gap-3 bg-gray-800 hover:bg-gray-700 text-white"
              >
                <Icon icon="mdi:github" width="22" height="22" />
                Sign in with GitHub
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
