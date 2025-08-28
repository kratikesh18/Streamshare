"use client";
import { signUpSchema } from "@/schemas/signUpSchema";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
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
import Link from "next/link";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

function Page() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/signup", values);
      if (res.status === 200) {
        toast.success("Account created successfully!");
        setError(null);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        const message = error.response.data?.message || "User already exists";
        setError(message);
        toast.error(message);
      } else {
        console.log("Error signing up:", error);
        toast.error("Internal Server Error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-[#ededed]">
      <div className="w-full max-w-md p-8 rounded-xl bg-[#18181b] shadow-2xl border border-[#232323]">
        <h2 className="text-3xl font-bold mb-2 text-center tracking-tight">
          Create your StreamShare account
        </h2>
        <p className="mb-8 text-center text-[#a3a3a3] text-base">
          Sign up to get started and join the community
        </p>

        {/* Google Sign Up Section */}
        <div className="mb-6">
          <Button
            className="w-full flex items-center justify-center gap-2 py-2 rounded-md bg-white text-[#18181b] font-semibold hover:bg-gray-200 transition shadow"
            onClick={() => signIn("google")}
            type="button"
            aria-label="Sign up with Google"
          >
            <FcGoogle className="h-5 w-5" />
            Sign up with Google
          </Button>
        </div>

        {/* Divider */}
        <div className="flex items-center mb-6">
          <span className="flex-1 h-px bg-[#232323]" />
          <span className="px-3 text-[#a3a3a3] text-sm">
            or sign up with credentials
          </span>
          <span className="flex-1 h-px bg-[#232323]" />
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
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
                      placeholder="tyrion.lannister@got.com"
                      {...field}
                      className="bg-[#232323] text-[#ededed] border border-[#333] focus:border-[#60a5fa]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4">
              <div className="w-1/2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#ededed]">
                        First Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Tyrion"
                          {...field}
                          className="bg-[#232323] text-[#ededed] border border-[#333] focus:border-[#60a5fa]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-1/2">
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#ededed]">
                        Last Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Lannister"
                          {...field}
                          className="bg-[#232323] text-[#ededed] border border-[#333] focus:border-[#60a5fa]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#ededed]">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      {...field}
                      className="bg-[#232323] text-[#ededed] border border-[#333] focus:border-[#60a5fa]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded-md bg-[#2563eb] text-white font-semibold hover:bg-[#1d4ed8] transition shadow"
              aria-label="Sign up"
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>
          </form>
        </Form>
        <div className="mt-6 text-center">
          <span className="text-[#a3a3a3]">Already registered?</span>
          <Link href="/signin" className="ml-2 text-[#60a5fa] hover:underline">
            Go to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Page;
