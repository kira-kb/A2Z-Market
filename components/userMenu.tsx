import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import avatarImg from "@/assets/images/avatar_placeholder.png";
import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  useUser,
} from "@clerk/nextjs";
import ImgLoader from "./imgLoader";

export default function UserMenu() {
  const auth = useUser();

  const { user } = auth;

  if (!auth.isLoaded) return <ImgLoader />;

  return (
    <div className="flex items-center mr-2">
      <SignedIn>
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className="cursor-pointer hover:shadow-slate-400 dark:hover:shadow-slate-600 shadow-md"
          >
            <div className="flex items-center p-0 ring-1 ring-slate-200 dark:ring-slate-600 rounded-full">
              <span className="sr-only">Open user menu</span>
              <Avatar className="w-8 h-8">
                <AvatarImage
                  src={user?.imageUrl || avatarImg.src}
                  alt="user photo"
                />
                <AvatarFallback>
                  {user?.firstName?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="mt-2 rounded-lg shadow-sm bg-white dark:bg-gray-700"
          >
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900 dark:text-white">
                {user?.firstName || "User"}
              </span>
              <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                {user?.emailAddresses[0]?.emailAddress || "user@A2Z-Market.com"}
              </span>
            </div>
            <Link href="/account">
              <DropdownMenuItem>My Account</DropdownMenuItem>
            </Link>
            <Link href="/settings">
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </Link>
            <DropdownMenuItem>
              <SignOutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SignedIn>

      <SignedOut>
        <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 p-2">
          <SignInButton />
        </div>
      </SignedOut>
    </div>
  );
}
