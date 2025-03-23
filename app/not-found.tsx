import Image from "next/image";
import Link from "next/link";

import err404 from "@/assets/images/404 2.avif";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function Custom404() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <Image
          src={err404}
          alt="404 Illustration"
          className="mx-auto w-80 h-auto mb-8"
          priority
        />
        <h1 className="text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
          Oops! Lost your way?
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
          {`We can't seem to find the page you're looking for.`}
        </p>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-lg">
          Error code:{" "}
          <span className="font-semibold">404 - Page Not Found</span>
        </p>

        <div className="flex justify-center">
          <Link href="/">
            <Button>
              <ArrowLeft /> Go Back Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
