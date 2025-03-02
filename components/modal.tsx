"use client";

import Image, { StaticImageData } from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import React from "react";

// import img from "@/assets/images/kurt.jpg";
import { Button } from "./ui/button";
import { Eye } from "lucide-react";

function Modal({ img, alt }: { img: StaticImageData; alt: string }) {
  return (
    <Dialog>
      <DialogTrigger className="bg-primary hover:bg-primary/80 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-full p-1 h-9 w-9 sm:w-9 sm:h-9 border border-input shadow-sm hover:text-accent-foreground flex justify-center items-center">
        <Eye className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Product Name</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center">
          <Image
            src={img}
            alt={alt}
            className="w-64 h-64 object-cover rounded-lg"
          />
          <div className="mt-4 text-lg font-semibold">
            Product Price: $99.99
          </div>
          <div className="mt-2 text-sm text-gray-600 text-center">
            This is a detailed description of the product, highlighting its
            features, benefits, and why it s perfect for you.
          </div>
          <Button
            className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={() => alert("Product added to cart!")}
          >
            Add to Cart
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default Modal;
