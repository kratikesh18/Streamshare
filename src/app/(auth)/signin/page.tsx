"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { credentialsSchema } from "@/schemas/credentialsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import z from "zod";

const SigninPage = () => {
  const form = useForm<z.infer<typeof credentialsSchema>>({
    resolver: zodResolver(credentialsSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [loading, setLoading] = React.useState(false);
  const handleLogin = async (email: string, password: string) => {
    // console.log(email, password);
    try {
      setLoading(true);
      const res = await signIn("credentials", {
        redirect: false, // IMPORTANT: prevent automatic redirect
        email,
        password,
      });

      console.log(res);
      if (res?.error) {
        throw new Error(res.error);
      }
    } catch (error: any) {
      toast.error(error.message);
      // console.error("Error signing in:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-[#ededed]">
      <div className="w-full max-w-md p-8 rounded-xl bg-[#18181b] shadow-2xl border border-[#232323]">
        <h2 className="text-3xl font-extrabold mb-2 text-center tracking-tight">
          Welcome back
        </h2>
        <p className="mb-8 text-center text-[#a3a3a3] text-base">
          Sign in to your StreamShare account
        </p>

        {/* Google Sign In */}
        <div className="mb-6">
          <Button
            className="w-full flex items-center justify-center gap-2 py-2 rounded-md bg-white text-[#18181b] font-semibold hover:bg-gray-200 transition shadow"
            onClick={() => signIn("google")}
            type="button"
            aria-label="Sign in with Google"
          >
            <FcGoogle className="h-5 w-5" />
            Sign in with Google
          </Button>
        </div>

        {/* Divider */}
        <div className="flex items-center mb-6">
          <span className="flex-1 h-px bg-[#232323]" />
          <span className="px-3 text-[#a3a3a3] text-sm">
            or sign in with credentials
          </span>
          <span className="flex-1 h-px bg-[#232323]" />
        </div>

        {/* Credentials Sign In */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) =>
              handleLogin(values.email, values.password)
            )}
            className="flex flex-col gap-5"
            autoComplete="off"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#ededed]">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="tyrion.lannister@got.com"
                      {...field}
                      className="bg-[#232323] text-[#ededed] border border-[#333] focus:border-[#60a5fa]"
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
                  <FormLabel className="text-[#ededed]">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password"
                      {...field}
                      className="bg-[#232323] text-[#ededed] border border-[#333] focus:border-[#60a5fa]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between mb-2">
              <a
                href="/forgot-password"
                className="text-sm text-[#60a5fa] hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <Button
              className="w-full py-2 rounded-md bg-[#2563eb] text-white font-semibold hover:bg-[#1d4ed8] transition shadow"
              type="submit"
              aria-label="Sign in"
            >
              Login
            </Button>
          </form>
        </Form>
        <div className="mt-6 text-center">
          <span className="text-[#a3a3a3]">Don't have an account?</span>
          <Link href="/signup" className="ml-2 text-[#60a5fa] hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
