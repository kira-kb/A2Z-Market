"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function SyncUser() {
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;

    const registerUser = async () => {
      try {
        await fetch("/api/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: user.id,
            email: user.emailAddresses[0]?.emailAddress,
            phone: user.phoneNumbers[0]?.phoneNumber,
          }),
        });
      } catch (err) {
        console.error("Error registering user:", err);
      }
    };

    registerUser();
  }, [user]);

  return null;
}
