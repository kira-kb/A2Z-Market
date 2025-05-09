// "use client";

// import { SignUp, useUser } from "@clerk/nextjs";
// import { Suspense, useEffect, useState } from "react";
// import ImgLoader from "@/components/imgLoader";

// export default function Page() {
//   const { user, isSignedIn } = useUser();
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     // When user is signed in, sync the user data to the server
//     if (isSignedIn && user) {
//       const syncUserData = async () => {
//         try {
//           setLoading(true);
//           // Send user data to your API to store it in the database
//           await fetch("/api/sync-user", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               userId: user.id,
//               email: user.emailAddresses[0]?.emailAddress,
//               firstName: user.firstName,
//               lastName: user.lastName,
//               phone: user.phoneNumbers[0]?.phoneNumber || "",
//             }),
//           });
//         } catch (error) {
//           console.error("Error syncing user data:", error);
//         } finally {
//           setLoading(false);
//         }
//       };

//       syncUserData();
//     }
//   }, [isSignedIn, user]);

//   return (
//     <div className="flex justify-center items-center p-4 w-screen">
//       <Suspense fallback={<ImgLoader />}>
//         <SignUp />
//       </Suspense>
//       {loading && <div>Syncing user data...</div>}
//     </div>
//   );
// }

// ???????????????????????????????????????????????

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
