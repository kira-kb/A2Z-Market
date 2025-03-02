"use client";

import ProductCard from "@/components/ProductCard";
import { AppSidebar } from "@/components/SideBar";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { LayoutGrid, LayoutList } from "lucide-react";
import { useState } from "react";

function Shop() {
  const [flow, setFlow] = useState<"flex" | "grid">("grid");

  return (
    <SidebarProvider>
      <div>
        <SidebarTrigger className="fixed block md:hidden" />
        <AppSidebar />
      </div>
      <div className="flex-1">
        <div className="flex gap-2 justify-start p-4 px-6">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setFlow("grid")}
            className={flow === "grid" ? "bg-gray-200 dark:bg-gray-700" : ""}
          >
            <LayoutGrid />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setFlow("flex")}
            className={flow === "flex" ? "bg-gray-200 dark:bg-gray-700" : ""}
          >
            <LayoutList />
          </Button>
        </div>

        <div
          className={`p-4 gap-3 grid ${
            flow === "grid"
              ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              : "flex flex-col"
          }`}
        >
          <ProductCard layout={`${flow === "flex" ? "row" : "col"}`} />
          <ProductCard layout={`${flow === "flex" ? "row" : "col"}`} />
          <ProductCard layout={`${flow === "flex" ? "row" : "col"}`} />
          <ProductCard layout={`${flow === "flex" ? "row" : "col"}`} />
          <ProductCard layout={`${flow === "flex" ? "row" : "col"}`} />
          <ProductCard layout={`${flow === "flex" ? "row" : "col"}`} />
          <ProductCard layout={`${flow === "flex" ? "row" : "col"}`} />
          <ProductCard layout={`${flow === "flex" ? "row" : "col"}`} />
          <ProductCard layout={`${flow === "flex" ? "row" : "col"}`} />
          <ProductCard layout={`${flow === "flex" ? "row" : "col"}`} />
          <ProductCard layout={`${flow === "flex" ? "row" : "col"}`} />
          <ProductCard layout={`${flow === "flex" ? "row" : "col"}`} />
          <ProductCard layout={`${flow === "flex" ? "row" : "col"}`} />
        </div>
      </div>
    </SidebarProvider>
  );
}

export default Shop;
