"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import avatarImg from "@/assets/images/avatar_placeholder.png";
import { useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function UserMenu() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return isLoggedIn ? (
    <div className="flex items-center mr-2">
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="cursor-pointer hover:shadow-slate-400 dark:hover:shadow-slate-600 shadow-md"
        >
          <div className="flex items-center p-0 ring-1 ring-slate-200 dark:ring-slate-600 rounded-full">
            <span className="sr-only">Open user menu</span>
            <Avatar className="w-8 h-8">
              <AvatarImage src={avatarImg.src} alt="user photo" />
              <AvatarFallback>K</AvatarFallback>
            </Avatar>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="mt-2 rounded-lg shadow-sm bg-white dark:bg-gray-700"
        >
          <div className="px-4 py-3">
            <span className="block text-sm text-gray-900 dark:text-white">
              kira
            </span>
            <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
              kirubelbewket@gmail.com
            </span>
          </div>
          <DropdownMenuItem>My Account</DropdownMenuItem>
          <Link href="/settings">
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </Link>
          <DropdownMenuItem onClick={() => setIsLoggedIn(false)}>
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ) : (
    <Button className="p-2" onClick={() => setIsLoggedIn(true)}>
      Sign in
    </Button>
  );
}
