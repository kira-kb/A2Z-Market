"use client";

import { InfiniteSlider } from "@/components/ui/infinite-slider";
import Image from "next/image";
import Link from "next/link";
import { useDataStore } from "@/store";
import { useEffect, useState } from "react";
import LoadingAnimation from "@/app/loading";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function InfiniteSliderHoverSpeed() {
  const { trendingItems, isLoadding, fetchData } = useDataStore();
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (!trendingItems) fetchData({});
  }, [fetchData, trendingItems]);

  if (isLoadding) return <LoadingAnimation />;

  return (
    <section className="my-16 w-full overflow-hidden">
      <div className="flex justify-center mb-4">
        <Button variant="outline" onClick={() => setReverse(!reverse)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Reverse
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <InfiniteSlider
        speedOnHover={1}
        reverse={reverse}
        gap={24}
        className="overflow-hidden"
      >
        {trendingItems.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </InfiniteSlider>
    </section>
  );
}

function ProductCard({
  item,
}: {
  item: {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
  };
}) {
  return (
    <div className="max-w-[280px] min-w-[240px] rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden">
      <Link href={`/shop/${item.id}`} className="relative w-full h-64">
        <Image
          src={`/api/telegram-file?fileId=${item.image}`}
          alt={item.name}
          fill
          className="object-cover rounded-t-xl"
        />
      </Link>

      <div className="p-4 flex flex-col justify-between flex-1">
        <Link href={`/shop/${item.id}`}>
          <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
            {item.name}
          </h3>
        </Link>
        <span className="text-xl font-bold text-gray-800 dark:text-white">
          ${item.price}
        </span>
      </div>
    </div>
  );
}

// ??????????????????????????????????????????????????????
// ??????????????????????????????????????????????????????

// "use client";

// import { InfiniteSlider } from "@/components/ui/infinite-slider";

// // import slideImg from "@/assets/images/mobile.png";
// import Image from "next/image";
// import Link from "next/link";
// import { useDataStore } from "@/store";
// import { useEffect, useState } from "react";
// import LoadingAnimation from "@/app/loading";
// import { Button } from "./ui/button";
// import { ArrowLeft, ArrowRight } from "lucide-react";

// export function InfiniteSliderHoverSpeed() {
//   const { trendingItems, isLoadding, fetchData } = useDataStore();

//   const [reverse, setReverse] = useState(false);

//   useEffect(() => {
//     if (!trendingItems) fetchData({});
//   }, [fetchData, trendingItems]);

//   if (isLoadding) return <LoadingAnimation />;

//   return (
//     <div className="my-16 max-w-[98dvw] overflow-hidden">
//       {/* <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-4">
//         Latest Mobile Phones
//       </h2> */}
//       <div className="w-full mb-2 flex justify-center items-center">
//         <Button variant="outline" onClick={() => setReverse(!reverse)}>
//           <ArrowLeft /> Reverse <ArrowRight />
//         </Button>
//       </div>
//       <InfiniteSlider
//         speedOnHover={1}
//         reverse={reverse}
//         gap={24}
//         className="overflow-hidden"
//       >
//         {trendingItems.map((item) => (
//           <div
//             key={item.id}
//             className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 flex items-center justify-center"
//           >
//             <Link href={`/shop/${item.id}`} className="h-full">
//               <Image
//                 // src={`api/telegram-file?fileId=${item.image}`}
//                 src={`/api/telegram-file?fileId=${item.image}`}
//                 alt="product image"
//                 width={400}
//                 height={400}
//                 className="p-2 rounded-t-lg object-cover h-full"
//               />
//             </Link>
//             <div className="px-5 pb-5">
//               <Link href={`/shop/${item.id}`}>
//                 <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white w-[220px]">
//                   {/* Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport */}
//                   {item.name.length > 33
//                     ? item.name.slice(0, 30) + "..."
//                     : item.name}
//                 </h5>
//               </Link>

//               <div className="flex items-center justify-between">
//                 <span className="text-3xl font-bold text-gray-900 dark:text-white">
//                   ${item.price}
//                 </span>
//               </div>
//             </div>
//           </div>
//         ))}

//         {/* <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 flex items-center justify-center">
//           <Link href="#">
//             <Image
//               className="p-2 w-[200px] rounded-t-lg object-cover"
//               src={slideImg}
//               alt="product image"
//             />
//           </Link>
//           <div className="px-5 pb-5">
//             <a href="#">
//               <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white w-[220px]">
//                 Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport
//               </h5>
//             </a>

//             <div className="flex items-center justify-between">
//               <span className="text-3xl font-bold text-gray-900 dark:text-white">
//                 $599
//               </span>
//             </div>
//           </div>
//         </div>

//         <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 flex items-center justify-center">
//           <Link href="#">
//             <Image
//               className="p-2 w-[200px] rounded-t-lg object-cover"
//               src={slideImg}
//               alt="product image"
//             />
//           </Link>
//           <div className="px-5 pb-5">
//             <a href="#">
//               <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white w-[220px]">
//                 Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport
//               </h5>
//             </a>

//             <div className="flex items-center justify-between">
//               <span className="text-3xl font-bold text-gray-900 dark:text-white">
//                 $599
//               </span>
//             </div>
//           </div>
//         </div>

//         <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 flex items-center justify-center">
//           <Link href="#">
//             <Image
//               className="p-2 w-[200px] rounded-t-lg object-cover"
//               src={slideImg}
//               alt="product image"
//             />
//           </Link>
//           <div className="px-5 pb-5">
//             <a href="#">
//               <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white w-[220px]">
//                 Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport
//               </h5>
//             </a>

//             <div className="flex items-center justify-between">
//               <span className="text-3xl font-bold text-gray-900 dark:text-white">
//                 $599
//               </span>
//             </div>
//           </div>
//         </div>

//         <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 flex items-center justify-center">
//           <Link href="#">
//             <Image
//               className="p-2 w-[200px] rounded-t-lg object-cover"
//               src={slideImg}
//               alt="product image"
//             />
//           </Link>
//           <div className="px-5 pb-5">
//             <a href="#">
//               <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white w-[220px]">
//                 Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport
//               </h5>
//             </a>

//             <div className="flex items-center justify-between">
//               <span className="text-3xl font-bold text-gray-900 dark:text-white">
//                 $599
//               </span>
//             </div>
//           </div>
//         </div>

//         <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 flex items-center justify-center">
//           <Link href="#">
//             <Image
//               className="p-2 w-[200px] rounded-t-lg object-cover"
//               src={slideImg}
//               alt="product image"
//             />
//           </Link>
//           <div className="px-5 pb-5">
//             <a href="#">
//               <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white w-[220px]">
//                 Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport
//               </h5>
//             </a>

//             <div className="flex items-center justify-between">
//               <span className="text-3xl font-bold text-gray-900 dark:text-white">
//                 $599
//               </span>
//             </div>
//           </div>
//         </div> */}
//       </InfiniteSlider>
//     </div>
//   );
// }
