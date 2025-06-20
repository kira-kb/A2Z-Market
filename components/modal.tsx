"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import React, { Suspense } from "react";

// import img from "@/assets/images/kurt.jpg";
import { Button } from "./ui/button";
import { Eye } from "lucide-react";
import ImgLoader from "./imgLoader";
import { useCartStore } from "@/store";
import Image from "next/image";

interface IData {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string[];
  categories: { name: string }[];
  type: string;
  subCategory: string;
  brands: string;
  conditions: string;
}

function Modal({
  id,
  img,
  name,
  description,
  price,
  productId,
  product,
}: {
  id: string;
  img: string;
  name: string;
  description: string;
  price: number;
  productId: string;
  product: IData;
}) {
  const { addCartItem } = useCartStore();

  return (
    <Dialog>
      {/* <DialogTrigger className="bg-primary hover:bg-primary/80 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-full p-1 h-9 w-9 sm:w-9 sm:h-9 border border-input shadow-sm hover:text-accent-foreground flex justify-center items-center"> */}
      <DialogTrigger className="flex justify-center items-center dark:bg-primary dark:hover:bg-primary/80 bg-slate-200 hover:bg-slate-300 shadow-sm dark:bg-slate-700 dark:hover:bg-slate-600 rounded-full p-1 w-7 h-7 sm:w-9 sm:h-9">
        <Eye className="h-4 w-4 dark:text-white text-slate-700" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center">
          <Suspense fallback={<ImgLoader />}>
            <Image
              src={`/api/telegram-file?fileId=${img}`}
              width={1000}
              height={1000}
              alt={name}
              className="w-64 h-64 object-cover rounded-lg"
            />
          </Suspense>
          <div className="mt-4 text-lg font-semibold">
            Product Price: ${price}
          </div>
          <div className="mt-2 text-sm text-gray-600 text-center">
            {description}
          </div>
          <Button
            className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={() =>
              addCartItem({
                id,
                name,
                image: img,
                price,
                quantity: 1,
                productId,
                product,
              })
            }
          >
            Add to Cart
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default Modal;
