"use client";

import React, { Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Image from "next/image";
import { Minus, Plus, ShoppingBasket } from "lucide-react";

// import cartImg from "../assets/images/mobile.png"; // Ensure correct path
import Modal from "./modal";
import ImgLoader from "./imgLoader";
import Link from "next/link";
import { useCartStore } from "@/store";

interface IProduct {
  layout?: "col" | "row";
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export default function ProductCard({
  layout,
  name,
  id,
  description,
  price,
  image,
}: IProduct) {
  const [quantity, setQuantity] = useState(1);

  const { addCartItem } = useCartStore();

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // const isInCart = (id: string): boolean => {
  //   return cartItems.filter((item) => item.id === id) ? true : false;
  // }

  return (
    <Card
      className={`w-full mx-auto sm:flex ${
        layout === "col" ? "sm:flex-col" : "sm:flex-row"
      } gap-3 p-4 rounded-2xl shadow-slate-900/5 min-w-[230px] flex-wrap dark:shadow-none bg-white dark:bg-slate-900`}
    >
      <Link
        href={`/shop/${id}`}
        className="relative w-full max-w-64 max-h-72 aspect-square sm:w-auto sm:aspect-auto  overflow-hidden rounded-xl bg-[#f9f4ec] dark:bg-slate-800"
      >
        <Suspense fallback={<ImgLoader />}>
          <Image
            src={image}
            alt={name || "image"}
            width={1000000}
            height={1000000}
            fill={false}
            style={{ objectFit: "cover" }}
            className="w-full h-full"
            sizes="(max-width: 640px) 100vw, 220px"
          />
        </Suspense>
      </Link>
      {/* <div className="flex flex-1 flex-col max-w-96"> */}
      <div className="flex flex-1 flex-col">
        <CardHeader className="p-0 pt-2 sm:pt-0">
          <CardTitle className="mb-1 dark:text-white text-base sm:text-xl">
            {name}
          </CardTitle>
          <CardDescription className="text-sm sm:text-lg dark:text-gray-400">
            ${price}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 text-xs sm:text-sm flex-1 dark:text-gray-300 mt-1 sm:mt-0">
          {description.slice(0, 50)}...
        </CardContent>
        <div className="flex justify-between items-center mt-2">
          <div className="inline-flex gap-1.5 rounded-full ring-1 ring-primary dark:ring-gray-600 p-[3px]">
            <Button
              variant="outline"
              size="icon"
              onClick={handleDecrement}
              className="hover:bg-gray-200/70 dark:hover:bg-gray-700/50 rounded-full p-1 ring-1 ring-primary/30 dark:ring-gray-600/50 w-6 h-6 sm:w-8 sm:h-8"
            >
              <Minus className="h-3 w-3 sm:h-4 sm:w-4 dark:text-white" />
            </Button>
            <span className="select-none dark:text-white px-1 text-xs sm:text-base flex items-center justify-center">
              {quantity}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={handleIncrement}
              className="bg-primary hover:bg-primary/80 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-full p-1 ring-1 ring-primary dark:ring-slate-600 w-6 h-6 sm:w-8 sm:h-8"
            >
              <Plus className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
            </Button>
          </div>

          <div className="flex flex-row justify-center items-center">
            <Modal
              id={id}
              img={image}
              name={name}
              description={description}
              price={price}
            />
            {/* <Button
              variant="outline"
              size="icon"
              className="bg-primary hover:bg-primary/80 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-full p-1 w-7 h-7 sm:w-9 sm:h-9"
            >
              <Eye className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
            </Button> */}
            &nbsp;&nbsp;
            <Button
              variant="outline"
              size="icon"
              className="bg-primary hover:bg-primary/80 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-full p-1 w-7 h-7 sm:w-9 sm:h-9"
              onClick={() => addCartItem({ id, name, price, image, quantity })}
            >
              <ShoppingBasket className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
