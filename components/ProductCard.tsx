"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  // CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Image from "next/image";
import { Minus, Plus, ShoppingBasket } from "lucide-react";
import Modal from "./modal";
import Link from "next/link";
import { useCartStore } from "@/store";

interface IDataItem {
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

interface IProduct {
  layout?: "col" | "row";
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  product: IDataItem;
}

export default function ProductCard({
  layout = "col",
  id,
  name,
  description,
  price,
  image,
  product,
}: IProduct) {
  const [quantity, setQuantity] = useState(1);
  const { addCartItem } = useCartStore();

  const handleIncrement = () => setQuantity((q) => q + 1);
  const handleDecrement = () => setQuantity((q) => (q > 1 ? q - 1 : q));

  return (
    <Card
      className={`flex ${
        layout === "row" ? "flex-row min-w-xl w-full" : "flex-col max-w-[220px]"
      } bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm`}
    >
      {/* Image section */}
      <div
        className={`relative ${
          layout === "row" ? "w-40 h-40" : "w-full h-[180px]"
        } bg-[#f9f4ec] dark:bg-slate-800 shrink-0`}
      >
        <Link href={`/shop/${id}`} className="block w-full h-full">
          <Image
            src={`/api/telegram-file?fileId=${image}`}
            alt={name || "image"}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 640px) 100vw, 220px"
          />
        </Link>

        {/* Condition badge */}
        {product.conditions && (
          <div className="absolute top-2 left-2 bg-primary text-white dark:text-slate-700 text-xs px-2 py-1 rounded-md shadow">
            {product.conditions}
          </div>
        )}
      </div>

      {/* Info section */}
      <div className="flex flex-col justify-between p-3 flex-1 gap-2">
        <div>
          <CardHeader className="p-0">
            <CardTitle className="text-sm sm:text-base font-semibold dark:text-white">
              {name}
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm line-clamp-2 dark:text-gray-300">
              {description}
            </CardDescription>
          </CardHeader>
        </div>

        <div className="">
          {/* Price */}
          <div className="text-sm sm:text-base text-right font-bold text-primary dark:text-primary">
            ${price.toFixed(2)}
          </div>

          {/* Quantity controls + actions */}
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1 rounded-full border border-primary px-2 py-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5 p-0"
                onClick={handleDecrement}
              >
                <Minus className="h-4 w-4 dark:text-white" />
              </Button>
              <span className="text-sm dark:text-white select-none">
                {quantity}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5 p-0"
                onClick={handleIncrement}
              >
                <Plus className="h-4 w-4 text-primary" />
              </Button>
            </div>

            <Modal
              id={id}
              img={image}
              name={name}
              description={description}
              price={price}
              product={product}
              productId={id}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                addCartItem({
                  id,
                  name,
                  price,
                  image,
                  quantity,
                  productId: id,
                  product,
                })
              }
              // className="bg-primary hover:bg-primary/80 dark:text-white rounded-full h-8 w-8"
              className="dark:bg-primary dark:hover:bg-primary/80 bg-slate-200 hover:bg-slate-300 shadow-sm dark:bg-slate-700 dark:hover:bg-slate-600 rounded-full p-1 w-7 h-7 sm:w-9 sm:h-9"
            >
              <ShoppingBasket className="h-4 w-4 dark:text-white text-slate-700" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

// ???????????????????????????????????
// ???????????????????????????????????

// "use client";

// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import Image from "next/image";
// import { Minus, Plus, ShoppingBasket } from "lucide-react";
// import Modal from "./modal";
// import Link from "next/link";
// import { useCartStore } from "@/store";

// interface IDataItem {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   stock: number;
//   image: string[];
//   categories: { name: string }[];
//   type: string;
//   subCategory: string;
//   brands: string;
//   conditions: string;
// }

// interface IProduct {
//   layout?: "col" | "row";
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   image: string;
//   product: IDataItem;
// }

// export default function ProductCard({
//   layout = "col",
//   id,
//   name,
//   description,
//   price,
//   image,
//   product,
// }: IProduct) {
//   const [quantity, setQuantity] = useState(1);
//   const { addCartItem } = useCartStore();

//   const handleIncrement = () => setQuantity((q) => q + 1);
//   const handleDecrement = () => setQuantity((q) => (q > 1 ? q - 1 : q));

//   return (
//     <Card
//       className={`w-full mx-auto sm:flex ${
//         layout === "col" ? "sm:flex-col" : "sm:flex-row"
//       } gap-4 p-4 rounded-2xl shadow-slate-900/5 dark:shadow-none bg-white dark:bg-slate-900`}
//     >
//       {/* Image Container */}
//       <Link
//         href={`/shop/${id}`}
//         className="w-full sm:w-52 h-52 relative rounded-xl overflow-hidden bg-[#f9f4ec] dark:bg-slate-800"
//       >
//         <Image
//           src={`/api/telegram-file?fileId=${image}`}
//           alt={name || "image"}
//           fill
//           style={{ objectFit: "cover" }}
//           sizes="(max-width: 640px) 100vw, 220px"
//         />
//       </Link>

//       {/* Details */}
//       <div className="flex flex-1 flex-col justify-between">
//         {/* Title */}
//         <CardHeader className="p-0 pb-2">
//           <CardTitle className="text-base sm:text-lg font-semibold dark:text-white">
//             {name}
//           </CardTitle>
//         </CardHeader>

//         {/* Description */}
//         <CardContent className="p-0 text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
//           {description}
//         </CardContent>

//         {/* Price */}
//         <div className="text-right mt-2">
//           <span className="text-base sm:text-lg font-bold text-primary dark:text-primary">
//             ${price.toFixed(2)}
//           </span>
//         </div>

//         {/* Quantity and Buttons */}
//         <div className="flex justify-between items-center mt-4">
//           {/* Quantity Buttons */}
//           <div className="inline-flex gap-1.5 rounded-full ring-1 ring-primary dark:ring-gray-600 p-[3px]">
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={handleDecrement}
//               className="hover:bg-gray-200/70 dark:hover:bg-gray-700/50 rounded-full p-1 w-6 h-6 sm:w-8 sm:h-8"
//             >
//               <Minus className="h-3 w-3 sm:h-4 sm:w-4 dark:text-white" />
//             </Button>
//             <span className="px-2 text-sm sm:text-base dark:text-white select-none">
//               {quantity}
//             </span>
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={handleIncrement}
//               className="bg-primary hover:bg-primary/80 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-full p-1 w-6 h-6 sm:w-8 sm:h-8"
//             >
//               <Plus className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
//             </Button>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex gap-2">
//             <Modal
//               id={id}
//               img={image}
//               name={name}
//               description={description}
//               price={price}
//             />
//             <Button
//               variant="outline"
//               size="icon"
//               className="bg-primary hover:bg-primary/80 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-full p-1 w-7 h-7 sm:w-9 sm:h-9"
//               onClick={() =>
//                 addCartItem({
//                   id,
//                   name,
//                   price,
//                   image,
//                   quantity,
//                   productId: id,
//                   product,
//                 })
//               }
//             >
//               <ShoppingBasket className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
//             </Button>
//           </div>
//         </div>
//       </div>
//     </Card>
//   );
// }

// // ???????????????????????????????
// // ???????????????????????????????

// // "use client";

// // import React, { useState } from "react";
// // import { Button } from "@/components/ui/button";
// // import {
// //   Card,
// //   CardContent,
// //   CardHeader,
// //   CardTitle,
// //   CardDescription,
// // } from "@/components/ui/card";
// // import Image from "next/image";
// // import { Minus, Plus, ShoppingBasket } from "lucide-react";
// // import Modal from "./modal";
// // import Link from "next/link";
// // import { useCartStore } from "@/store";

// // interface IDataItem {
// //   id: string;
// //   name: string;
// //   description: string;
// //   price: number;
// //   stock: number;
// //   image: string[];
// //   categories: { name: string }[];
// //   type: string;
// //   subCategory: string;
// //   brands: string;
// //   conditions: string;
// // }

// // interface IProduct {
// //   layout?: "col" | "row";
// //   id: string;
// //   name: string;
// //   description: string;
// //   price: number;
// //   image: string;
// //   product: IDataItem;
// // }

// // export default function ProductCard({
// //   layout = "col",
// //   id,
// //   name,
// //   description,
// //   price,
// //   image,
// //   product,
// // }: IProduct) {
// //   const [quantity, setQuantity] = useState(1);
// //   const { addCartItem } = useCartStore();

// //   const handleIncrement = () => setQuantity((q) => q + 1);
// //   const handleDecrement = () => setQuantity((q) => (q > 1 ? q - 1 : q));

// //   return (
// //     <Card
// //       className={`w-full mx-auto sm:flex ${
// //         layout === "col" ? "sm:flex-col" : "sm:flex-row"
// //       } gap-3 p-4 rounded-2xl shadow-slate-900/5 flex-wrap dark:shadow-none bg-white dark:bg-slate-900`}
// //     >
// //       <Link
// //         href={`/shop/${id}`}
// //         className="relative w-full max-w-64 max-h-72 aspect-square sm:w-auto sm:aspect-auto overflow-hidden rounded-xl bg-[#f9f4ec] dark:bg-slate-800"
// //       >
// //         <Image
// //           src={`/api/telegram-file?fileId=${image}`}
// //           alt={name || "image"}
// //           width={1000}
// //           height={1000}
// //           style={{ objectFit: "cover" }}
// //           sizes="(max-width: 640px) 100vw, 220px"
// //         />
// //       </Link>

// //       <div className="flex flex-1 flex-col">
// //         <CardHeader className="p-0 pt-2 sm:pt-0">
// //           <CardTitle className="mb-1 dark:text-white text-base sm:text-xl">
// //             {name}
// //           </CardTitle>
// //           <CardDescription className="text-sm sm:text-lg dark:text-gray-400">
// //             ${price}
// //           </CardDescription>
// //         </CardHeader>

// //         <CardContent className="p-0 text-xs sm:text-sm flex-1 dark:text-gray-300 mt-1 sm:mt-0">
// //           {description.slice(0, 50)}...
// //         </CardContent>

// //         <div className="flex justify-between items-center mt-2">
// //           <div className="inline-flex gap-1.5 rounded-full ring-1 ring-primary dark:ring-gray-600 p-[3px]">
// //             <Button
// //               variant="outline"
// //               size="icon"
// //               onClick={handleDecrement}
// //               className="hover:bg-gray-200/70 dark:hover:bg-gray-700/50 rounded-full p-1 ring-1 ring-primary/30 dark:ring-gray-600/50 w-6 h-6 sm:w-8 sm:h-8"
// //             >
// //               <Minus className="h-3 w-3 sm:h-4 sm:w-4 dark:text-white" />
// //             </Button>
// //             <span className="select-none dark:text-white px-1 text-xs sm:text-base flex items-center justify-center">
// //               {quantity}
// //             </span>
// //             <Button
// //               variant="outline"
// //               size="icon"
// //               onClick={handleIncrement}
// //               className="bg-primary hover:bg-primary/80 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-full p-1 ring-1 ring-primary dark:ring-slate-600 w-6 h-6 sm:w-8 sm:h-8"
// //             >
// //               <Plus className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
// //             </Button>
// //           </div>

// //           <div className="flex flex-row justify-center items-center">
// //             <Modal
// //               id={id}
// //               img={image}
// //               name={name}
// //               description={description}
// //               price={price}
// //             />
// //             &nbsp;&nbsp;
// //             <Button
// //               variant="outline"
// //               size="icon"
// //               className="bg-primary hover:bg-primary/80 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-full p-1 w-7 h-7 sm:w-9 sm:h-9"
// //               onClick={() =>
// //                 addCartItem({
// //                   id,
// //                   name,
// //                   price,
// //                   image,
// //                   quantity,
// //                   productId: id,
// //                   product,
// //                 })
// //               }
// //             >
// //               <ShoppingBasket className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
// //             </Button>
// //           </div>
// //         </div>
// //       </div>
// //     </Card>
// //   );
// // }

// // // ??????????????????????????????????????????????
// // // ??????????????????????????????????????????????
// // // ??????????????????????????????????????????????

// // // "use client";

// // // import React, { useState } from "react";
// // // import { Button } from "@/components/ui/button";
// // // import {
// // //   Card,
// // //   CardContent,
// // //   CardHeader,
// // //   CardTitle,
// // //   CardDescription,
// // // } from "@/components/ui/card";
// // // import Image from "next/image";
// // // import { Minus, Plus, ShoppingBasket } from "lucide-react";
// // // import Modal from "./modal";
// // // // import ImgLoader from "./imgLoader";
// // // import Link from "next/link";
// // // import { useCartStore } from "@/store";

// // // interface IDataItem {
// // //   id: string;
// // //   name: string;
// // //   description: string;
// // //   price: number;
// // //   stock: number;
// // //   image: string[];
// // //   categories: { name: string }[];
// // //   type: string;
// // //   subCategory: string;
// // //   brands: string;
// // //   conditions: string;
// // // }

// // // interface IProduct {
// // //   layout?: "col" | "row";
// // //   id: string;
// // //   name: string;
// // //   description: string;
// // //   price: number;
// // //   image: string;
// // //   product: IDataItem;
// // // }

// // // export default function ProductCard({
// // //   layout = "col",
// // //   id,
// // //   name,
// // //   description,
// // //   price,
// // //   image,
// // //   product,
// // // }: IProduct) {
// // //   const [quantity, setQuantity] = useState(1);
// // //   const { addCartItem } = useCartStore();

// // //   const handleIncrement = () => {
// // //     setQuantity(quantity + 1);
// // //   };

// // //   const handleDecrement = () => {
// // //     if (quantity > 1) {
// // //       setQuantity(quantity - 1);
// // //     }
// // //   };

// // //   return (
// // //     <Card
// // //       className={`w-full mx-auto sm:flex ${
// // //         layout === "col" ? "sm:flex-col" : "sm:flex-row"
// // //       } gap-3 p-4 rounded-2xl shadow-slate-900/5  flex-wrap dark:shadow-none bg-white dark:bg-slate-900`}
// // //     >
// // //       <Link
// // //         href={`/shop/${id}`}
// // //         className="relative w-full max-w-64 max-h-72 aspect-square sm:w-auto sm:aspect-auto overflow-hidden rounded-xl bg-[#f9f4ec] dark:bg-slate-800"
// // //       >
// // //         {/* <Suspense fallback={<ImgLoader />}> */}
// // //         <Image
// // //           src={`/api/telegram-file?fileId=${image}`}
// // //           alt={name || "image"}
// // //           width={1000000}
// // //           height={1000000}
// // //           fill={false}
// // //           style={{ objectFit: "cover" }}
// // //           // className="max-w[200px] max-h-[220px]"
// // //           // className="w-full h-full"
// // //           sizes="(max-width: 640px) 100vw, 220px"
// // //         />
// // //         {/* </Suspense> */}
// // //       </Link>
// // //       <div className="flex flex-1 flex-col">
// // //         <CardHeader className="p-0 pt-2 sm:pt-0">
// // //           <CardTitle className="mb-1 dark:text-white text-base sm:text-xl">
// // //             {name}
// // //           </CardTitle>
// // //           <CardDescription className="text-sm sm:text-lg dark:text-gray-400">
// // //             ${price}
// // //           </CardDescription>
// // //         </CardHeader>
// // //         <CardContent className="p-0 text-xs sm:text-sm flex-1 dark:text-gray-300 mt-1 sm:mt-0">
// // //           {description.slice(0, 50)}...
// // //         </CardContent>
// // //         <div className="flex justify-between items-center mt-2">
// // //           <div className="inline-flex gap-1.5 rounded-full ring-1 ring-primary dark:ring-gray-600 p-[3px]">
// // //             <Button
// // //               variant="outline"
// // //               size="icon"
// // //               onClick={handleDecrement}
// // //               className="hover:bg-gray-200/70 dark:hover:bg-gray-700/50 rounded-full p-1 ring-1 ring-primary/30 dark:ring-gray-600/50 w-6 h-6 sm:w-8 sm:h-8"
// // //             >
// // //               <Minus className="h-3 w-3 sm:h-4 sm:w-4 dark:text-white" />
// // //             </Button>
// // //             <span className="select-none dark:text-white px-1 text-xs sm:text-base flex items-center justify-center">
// // //               {quantity}
// // //             </span>
// // //             <Button
// // //               variant="outline"
// // //               size="icon"
// // //               onClick={handleIncrement}
// // //               className="bg-primary hover:bg-primary/80 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-full p-1 ring-1 ring-primary dark:ring-slate-600 w-6 h-6 sm:w-8 sm:h-8"
// // //             >
// // //               <Plus className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
// // //             </Button>
// // //           </div>

// // //           <div className="flex flex-row justify-center items-center">
// // //             <Modal
// // //               id={id}
// // //               img={image}
// // //               name={name}
// // //               description={description}
// // //               price={price}
// // //             />
// // //             &nbsp;&nbsp;
// // //             <Button
// // //               variant="outline"
// // //               size="icon"
// // //               className="bg-primary hover:bg-primary/80 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-full p-1 w-7 h-7 sm:w-9 sm:h-9"
// // //               onClick={() =>
// // //                 addCartItem({
// // //                   id,
// // //                   name,
// // //                   price,
// // //                   image,
// // //                   quantity,
// // //                   productId: id,
// // //                   product,
// // //                 })
// // //               }
// // //             >
// // //               <ShoppingBasket className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
// // //             </Button>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </Card>
// // //   );
// // // }

// // // // "use client";

// // // // import React, { Suspense, useState } from "react";
// // // // import { Button } from "@/components/ui/button";
// // // // import {
// // // //   Card,
// // // //   CardContent,
// // // //   CardHeader,
// // // //   CardTitle,
// // // //   CardDescription,
// // // // } from "@/components/ui/card";
// // // // import Image from "next/image";
// // // // import { Minus, Plus, ShoppingBasket } from "lucide-react";

// // // // <<<<<<< HEAD
// // // // // import cartImg from "../assets/images/mobile.png"; // Ensure correct path
// // // // import Modal from "./modal";
// // // // import ImgLoader from "./imgLoader";
// // // // import Link from "next/link";
// // // // import { useCartStore } from "@/store";

// // // // interface IProduct {
// // // //   layout?: "col" | "row";
// // // //   id: string;
// // // //   name: string;
// // // //   description: string;
// // // //   price: number;
// // // //   image: string;
// // // // }

// // // // export default function ProductCard({
// // // //   layout,
// // // //   name,
// // // //   id,
// // // //   description,
// // // //   price,
// // // //   image,
// // // // }: IProduct) {
// // // //   const [quantity, setQuantity] = useState(1);

// // // //   const { addCartItem } = useCartStore();

// // // // =======
// // // // import cartImg from "../assets/images/mobile.png"; // Ensure correct path
// // // // import Modal from "./modal";
// // // // import ImgLoader from "./imgLoader";
// // // // import Link from "next/link";

// // // // export default function ProductCard({
// // // //   layout = "col",
// // // // }: {
// // // //   layout?: "col" | "row";
// // // // }) {
// // // //   const [quantity, setQuantity] = useState(1);

// // // // >>>>>>> 93711592d52a3dc1c44be694419ae8fd9560faa4
// // // //   const handleIncrement = () => {
// // // //     setQuantity(quantity + 1);
// // // //   };

// // // //   const handleDecrement = () => {
// // // //     if (quantity > 1) {
// // // //       setQuantity(quantity - 1);
// // // //     }
// // // //   };

// // // // <<<<<<< HEAD
// // // //   // const isInCart = (id: string): boolean => {
// // // //   //   return cartItems.filter((item) => item.id === id) ? true : false;
// // // //   // }

// // // // =======
// // // // >>>>>>> 93711592d52a3dc1c44be694419ae8fd9560faa4
// // // //   return (
// // // //     <Card
// // // //       className={`w-full mx-auto sm:flex ${
// // // //         layout === "col" ? "sm:flex-col" : "sm:flex-row"
// // // // <<<<<<< HEAD
// // // //       } gap-3 p-4 rounded-2xl shadow-slate-900/5 min-w-[230px] flex-wrap dark:shadow-none bg-white dark:bg-slate-900`}
// // // //     >
// // // //       <Link
// // // //         href={`/shop/${id}`}
// // // // =======
// // // //       } gap-3 p-4 rounded-2xl shadow-slate-900/5 dark:shadow-none bg-white dark:bg-slate-900`}
// // // //     >
// // // //       <Link
// // // //         href="/shop/kira"
// // // // >>>>>>> 93711592d52a3dc1c44be694419ae8fd9560faa4
// // // //         className="relative w-full max-w-64 max-h-72 aspect-square sm:w-auto sm:aspect-auto  overflow-hidden rounded-xl bg-[#f9f4ec] dark:bg-slate-800"
// // // //       >
// // // //         <Suspense fallback={<ImgLoader />}>
// // // //           <Image
// // // // <<<<<<< HEAD
// // // //             src={image}
// // // //             alt={name || "image"}
// // // //             width={1000000}
// // // //             height={1000000}
// // // // =======
// // // //             src={cartImg}
// // // //             alt="V-Neck Slim Fit T-Shirt"
// // // // >>>>>>> 93711592d52a3dc1c44be694419ae8fd9560faa4
// // // //             fill={false}
// // // //             style={{ objectFit: "cover" }}
// // // //             className="w-full h-full"
// // // //             sizes="(max-width: 640px) 100vw, 220px"
// // // //           />
// // // //         </Suspense>
// // // //       </Link>
// // // //       {/* <div className="flex flex-1 flex-col max-w-96"> */}
// // // //       <div className="flex flex-1 flex-col">
// // // //         <CardHeader className="p-0 pt-2 sm:pt-0">
// // // //           <CardTitle className="mb-1 dark:text-white text-base sm:text-xl">
// // // // <<<<<<< HEAD
// // // //             {name}
// // // //           </CardTitle>
// // // //           <CardDescription className="text-sm sm:text-lg dark:text-gray-400">
// // // //             ${price}
// // // //           </CardDescription>
// // // //         </CardHeader>
// // // //         <CardContent className="p-0 text-xs sm:text-sm flex-1 dark:text-gray-300 mt-1 sm:mt-0">
// // // //           {description.slice(0, 50)}...
// // // // =======
// // // //             V-Neck Slim Fit T-Shirt
// // // //           </CardTitle>
// // // //           <CardDescription className="text-sm sm:text-lg dark:text-gray-400">
// // // //             $15.99
// // // //           </CardDescription>
// // // //         </CardHeader>
// // // //         <CardContent className="p-0 text-xs sm:text-sm flex-1 dark:text-gray-300 mt-1 sm:mt-0">
// // // //           Elevate your casual wardrobe with this versatile V-neck tee, crafted
// // // //           from breathable, soft-touch fabric. Ideal for layering or wearing on
// // // //           its own for a sleek, effortless look.
// // // // >>>>>>> 93711592d52a3dc1c44be694419ae8fd9560faa4
// // // //         </CardContent>
// // // //         <div className="flex justify-between items-center mt-2">
// // // //           <div className="inline-flex gap-1.5 rounded-full ring-1 ring-primary dark:ring-gray-600 p-[3px]">
// // // //             <Button
// // // //               variant="outline"
// // // //               size="icon"
// // // //               onClick={handleDecrement}
// // // //               className="hover:bg-gray-200/70 dark:hover:bg-gray-700/50 rounded-full p-1 ring-1 ring-primary/30 dark:ring-gray-600/50 w-6 h-6 sm:w-8 sm:h-8"
// // // //             >
// // // //               <Minus className="h-3 w-3 sm:h-4 sm:w-4 dark:text-white" />
// // // //             </Button>
// // // //             <span className="select-none dark:text-white px-1 text-xs sm:text-base flex items-center justify-center">
// // // //               {quantity}
// // // //             </span>
// // // //             <Button
// // // //               variant="outline"
// // // //               size="icon"
// // // //               onClick={handleIncrement}
// // // //               className="bg-primary hover:bg-primary/80 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-full p-1 ring-1 ring-primary dark:ring-slate-600 w-6 h-6 sm:w-8 sm:h-8"
// // // //             >
// // // //               <Plus className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
// // // //             </Button>
// // // //           </div>

// // // //           <div className="flex flex-row justify-center items-center">
// // // // <<<<<<< HEAD
// // // //             <Modal
// // // //               id={id}
// // // //               img={image}
// // // //               name={name}
// // // //               description={description}
// // // //               price={price}
// // // //             />
// // // // =======
// // // //             <Modal img={cartImg} alt="img" />
// // // // >>>>>>> 93711592d52a3dc1c44be694419ae8fd9560faa4
// // // //             {/* <Button
// // // //               variant="outline"
// // // //               size="icon"
// // // //               className="bg-primary hover:bg-primary/80 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-full p-1 w-7 h-7 sm:w-9 sm:h-9"
// // // //             >
// // // //               <Eye className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
// // // //             </Button> */}
// // // //             &nbsp;&nbsp;
// // // //             <Button
// // // //               variant="outline"
// // // //               size="icon"
// // // //               className="bg-primary hover:bg-primary/80 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-full p-1 w-7 h-7 sm:w-9 sm:h-9"
// // // // <<<<<<< HEAD
// // // //               onClick={() => addCartItem({ id, name, price, image, quantity })}
// // // // =======
// // // // >>>>>>> 93711592d52a3dc1c44be694419ae8fd9560faa4
// // // //             >
// // // //               <ShoppingBasket className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
// // // //             </Button>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </Card>
// // // //   );
// // // // }
