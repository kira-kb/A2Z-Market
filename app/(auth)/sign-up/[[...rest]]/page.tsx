import ImgLoader from "@/components/imgLoader";
import { SignUp } from "@clerk/nextjs";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="flex justify-center items-center p-4 w-screen">
      <Suspense fallback={<ImgLoader />}>
        <SignUp />
      </Suspense>
    </div>
  );
}
