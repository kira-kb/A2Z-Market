"use client";

import ProductCard from "@/components/ProductCard";
import { AppSidebar } from "@/components/SideBar";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { LayoutGrid, LayoutList } from "lucide-react";
import { useEffect, useState } from "react";

import { useDataStore } from "@/store";
import LoadingAnimation from "../loading";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

function Shop() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const layoutFromURL = searchParams.get("layout") as "grid" | "flex";
  const [flow, setFlow] = useState<"grid" | "flex">(layoutFromURL || "grid");

  const { data, isLoadding, fetchData } = useDataStore();

  const category = searchParams.get("category") || "";
  const subCategory = searchParams.get("subCategory") || "";
  const type = searchParams.get("types") || "";
  const price = searchParams.get("price") || "";
  const brands = searchParams.get("brands") || "";
  const condition = searchParams.get("condition") || "";
  const name = searchParams.get("query") || "";

  // Update URL when layout changes
  const updateLayoutInURL = (layout: "grid" | "flex") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("layout", layout);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleFlowChange = (layout: "grid" | "flex") => {
    setFlow(layout);
    updateLayoutInURL(layout);
  };

  useEffect(() => {
    const prc = price?.split(",").map(Number);
    const minPrice = prc[0] || 0;
    const maxPrice = prc[1] || 999999;

    fetchData({
      name,
      category,
      subCategory,
      type,
      price: { maxPrice, minPrice },
      brands,
      condition,
    });
  }, [fetchData, category, subCategory, type, price, brands, condition, name]);

  return (
    <SidebarProvider>
      <div>
        <SidebarTrigger className="fixed block md:hidden" />
        <AppSidebar />
      </div>

      {isLoadding ? (
        <div className="flex-1">
          <LoadingAnimation />
        </div>
      ) : (
        <div className="flex-1">
          {/* Layout toggle */}
          <div className="flex gap-2 justify-start p-4 px-6">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleFlowChange("grid")}
              className={flow === "grid" ? "bg-gray-200 dark:bg-gray-700" : ""}
            >
              <LayoutGrid />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleFlowChange("flex")}
              className={flow === "flex" ? "bg-gray-200 dark:bg-gray-700" : ""}
            >
              <LayoutList />
            </Button>
          </div>

          {/* Product list */}
          <div
            className={`p-4 gap-3 ${
              flow === "grid"
                ? "grid grid-cols-[repeat(auto-fit,_minmax(180px,_1fr))]"
                : "flex flex-col justify-center items-center"
            }`}
          >
            {data.length === 0 ? (
              <p className="text-center w-full py-12 text-muted-foreground">
                No products found.
              </p>
            ) : (
              data.map((item) => (
                <ProductCard
                  key={item.id}
                  layout={flow === "flex" ? "row" : "col"}
                  name={item.name}
                  id={item.id}
                  price={item.price}
                  description={item.description}
                  image={item.image[0]}
                  product={item}
                />
              ))
            )}
          </div>
        </div>
      )}
    </SidebarProvider>
  );
}

export default Shop;

// ?????????????????????????????????????????
// ?????????????????????????????????????????

// "use client";

// import ProductCard from "@/components/ProductCard";
// import { AppSidebar } from "@/components/SideBar";
// import { Button } from "@/components/ui/button";
// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// import { LayoutGrid, LayoutList } from "lucide-react";
// import { useEffect, useState } from "react";

// import { useDataStore } from "@/store";
// import LoadingAnimation from "../loading";
// import { useSearchParams } from "next/navigation";

// function Shop() {
//   const [flow, setFlow] = useState<"flex" | "grid">("grid");

//   const { data, isLoadding, fetchData } = useDataStore();

//   const searchParams = useSearchParams();

//   const category = searchParams.get("category") || "";
//   const subCategory = searchParams.get("subCategory") || "";
//   const type = searchParams.get("types") || "";
//   const price = searchParams.get("price") || "";
//   const brands = searchParams.get("brands") || "";
//   const condition = searchParams.get("condition") || "";
//   const name = searchParams.get("query") || "";

//   useEffect(() => {
//     const prc = price?.split(",").map(Number);
//     const minPrice = prc[0] || 0;
//     const maxPrice = prc[1] || 999999;

//     fetchData({
//       name,
//       category,
//       subCategory,
//       type,
//       price: { maxPrice, minPrice },
//       brands,
//       condition,
//     });
//   }, [fetchData, category, subCategory, type, price, brands, condition, name]);

//   return (
//     <SidebarProvider>
//       <div>
//         <SidebarTrigger className="fixed block md:hidden" />
//         <AppSidebar />
//       </div>
//       {isLoadding ? (
//         <div className="flex-1">
//           <LoadingAnimation />
//         </div>
//       ) : (
//         <div className="flex-1">
//           <div className="flex gap-2 justify-start p-4 px-6">
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={() => setFlow("grid")}
//               className={flow === "grid" ? "bg-gray-200 dark:bg-gray-700" : ""}
//             >
//               <LayoutGrid />
//             </Button>
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={() => setFlow("flex")}
//               className={flow === "flex" ? "bg-gray-200 dark:bg-gray-700" : ""}
//             >
//               <LayoutList />
//             </Button>
//           </div>

//           <div
//             className={`p-4 gap-3 ${
//               flow === "grid"
//                 ? "grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
//                 : "flex flex-col"
//             }`}
//           >
//             {data.length === 0 ? (
//               <p className="text-center w-full py-12 text-muted-foreground">
//                 No products found.
//               </p>
//             ) : (
//               data.map((item) => (
//                 <ProductCard
//                   key={item.id}
//                   layout={flow === "flex" ? "row" : "col"}
//                   name={item.name}
//                   id={item.id}
//                   price={item.price}
//                   description={item.description}
//                   image={item.image[0]}
//                   product={item}
//                 />
//               ))
//             )}
//           </div>
//         </div>
//       )}
//     </SidebarProvider>
//   );
// }

// export default Shop;

// ????????????????????
// ????????????????????

// "use client";

// import ProductCard from "@/components/ProductCard";
// import { AppSidebar } from "@/components/SideBar";
// import { Button } from "@/components/ui/button";
// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// import { LayoutGrid, LayoutList } from "lucide-react";
// import { useEffect, useState } from "react";

// import { useDataStore } from "@/store";
// import LoadingAnimation from "../loading";
// import { useSearchParams } from "next/navigation";

// function Shop() {
//   const [flow, setFlow] = useState<"flex" | "grid">("grid");

//   const { data, isLoadding, fetchData } = useDataStore();

//   const searchParams = useSearchParams();

//   const category = searchParams.get("category") || "";
//   const subCategory = searchParams.get("subCategory") || "";
//   const type = searchParams.get("types") || "";
//   const price = searchParams.get("price") || ""; // You can split it by ","
//   const brands = searchParams.get("brands") || ""; // You can split it by ","
//   const condition = searchParams.get("condition") || "";
//   const name = searchParams.get("query") || "";
//   // const page = searchParams.get("page") || '';

//   useEffect(() => {
//     const prc = price?.split(",");
//     const maxPrice = +prc[1];
//     const minPrice = +prc[0];
//     // const maxPrice = +prc[0] > +prc[1] ? +prc[0] : +prc[1];
//     // const minPrice = +prc[0] < +prc[1] ? +prc[0] : +prc[1];
//     fetchData({
//       name,
//       category,
//       subCategory,
//       type,
//       price: { maxPrice, minPrice },
//       brands,
//       condition,
//     });
//   }, [fetchData, category, subCategory, type, price, brands, condition, name]);

//   return (
//     <SidebarProvider>
//       <div>
//         <SidebarTrigger className="fixed block md:hidden" />
//         <AppSidebar />
//       </div>
//       {isLoadding ? (
//         <div className="flex-1">
//           <LoadingAnimation />
//         </div>
//       ) : (
//         <div className="flex-1">
//           <div className="flex gap-2 justify-start p-4 px-6">
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={() => setFlow("grid")}
//               className={flow === "grid" ? "bg-gray-200 dark:bg-gray-700" : ""}
//             >
//               <LayoutGrid />
//             </Button>
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={() => setFlow("flex")}
//               className={flow === "flex" ? "bg-gray-200 dark:bg-gray-700" : ""}
//             >
//               <LayoutList />
//             </Button>
//           </div>

//           <div
//             className={`p-4 gap-3 grid ${
//               flow === "grid"
//                 ? "grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
//                 : "flex flex-col flex-wrap"
//             }`}
//           >
//             {data.map((item) => (
//               <ProductCard
//                 key={item.id}
//                 layout={`${flow === "flex" ? "row" : "col"}`}
//                 name={item.name}
//                 id={item.id}
//                 price={item.price}
//                 description={item.description}
//                 image={item.image[0]}
//                 product={item}
//               />
//             ))}
//           </div>
//         </div>
//       )}
//     </SidebarProvider>
//   );
// }

// export default Shop;
