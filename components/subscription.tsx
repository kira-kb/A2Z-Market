"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { LoadingButton } from "./loaddingButton";
import { useSubscriptionStore } from "@/store";

function Subscription() {
  const [email, setEmail] = useState("");
  const { isLoading, addSubscriber } = useSubscriptionStore();

  return (
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold mb-6">Stay in the Loop</h2>
      <p className="mb-8">
        Sign up for our newsletter to get exclusive deals and the latest
        updates.
      </p>
      <form action="" method="post" onSubmit={(e) => e.preventDefault()}>
        <div className="flex w-full items-center justify-center text-center space-x-2">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="max-w-sm placeholder:text-white dark:placeholder:text-gray-300 border-gray-200"
          />
          <LoadingButton
            loading={isLoading}
            LoadingText="subscribing..."
            onClick={() => addSubscriber(email)}
            type="submit"
          >
            Subscribe
          </LoadingButton>
        </div>
      </form>
    </div>
  );
  //   41318636
}

export default Subscription;
