import ImgLoader from "@/components/imgLoader";
import { SignIn } from "@clerk/nextjs";
import { Suspense } from "react";

function page() {
  return (
    <div className="flex justify-center items-center p-4 w-screen">
      <Suspense fallback={<ImgLoader />}>
        <SignIn />
      </Suspense>
    </div>
  );
}

export default page;
