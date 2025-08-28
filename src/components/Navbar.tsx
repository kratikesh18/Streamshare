"use client";
import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { HiOutlinePlus } from "react-icons/hi";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

const Navbar = () => {
  const { status, data: session } = useSession();

  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 bg-[#18181b] shadow-sm border-b border-[#232323]">
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center gap-2 hover:opacity-90 transition-opacity"
      >
        <span className="text-2xl font-extrabold text-[#a560fa] tracking-tight">
          StreamShare
        </span>
      </Link>

      {/* Options */}
      {status === "loading" ? (
        <div className="flex gap-4">
          <Button className="px-4 py-2 rounded-md bg-[#232323] text-[#a3a3a3] animate-pulse">
            Loading...
          </Button>
        </div>
      ) : !session?.user ? (
        <div className="flex gap-4">
          <Link href="/signin">
            <Button className="px-5 py-2 rounded-md bg-[#7e25eb] text-white hover:bg-[#971dd8] transition-colors duration-200 font-semibold">
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="px-5 py-2 rounded-md border border-[#2563eb] text-[#60a5fa] hover:bg-[#1e1e22] transition-colors duration-200 font-semibold">
              Signup
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex gap-4 items-center">
          <Link href="/addMembership">
            <Button className="px-5 py-2 rounded-md bg-[#7e25eb] text-white hover:bg-[#971dd8] transition-colors duration-200 font-semibold">
              <HiOutlinePlus className="inline " />
              Add Membership
            </Button>
          </Link>
          {/* Profile Popover */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="relative p-1 rounded-full border border-[#2563eb]/40 hover:border-[#2563eb] bg-[#232323] hover:bg-[#1e1e22] transition-all duration-200 flex items-center justify-center hover:scale-105"
              >
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || "Profile"}
                    width={36}
                    height={36}
                    className="rounded-full object-cover ring-2 ring-[#2563eb]/30"
                    priority
                    sizes="36px"
                  />
                ) : (
                  <span className="text-[#60a5fa] font-bold text-sm">
                    {session.user.name?.charAt(0) || "P"}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40 bg-[#232323] border-[#2563eb]/40 text-[#ededed] p-2">
              <div className="flex flex-col gap-2">
                <Link href="/profile">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-left px-3 py-2 hover:bg-[#18181b] rounded-md"
                  >
                    Profile
                  </Button>
                </Link>
                <Link href="/api/auth/signout">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-left px-3 py-2 hover:bg-[#18181b] rounded-md"
                  >
                    Logout
                  </Button>
                </Link>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
