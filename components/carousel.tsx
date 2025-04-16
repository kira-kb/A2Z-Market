"use client";

import {
  Carousel,
  CarouselContent,
  CarouselNavigation,
  CarouselIndicator,
  CarouselItem,
} from "@/components/ui/carousel";
import CarouselCard from "./CarouselCard";
import { useEffect } from "react";
import { useDataStore } from "@/store";
import LoadingAnimation from "@/app/loading";

export function AppCarousel() {
  const { latestProducts, isLoadding, fetchData } = useDataStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isLoadding) return <LoadingAnimation />;

  return (
    <div className="relative w-[80%]">
      <Carousel>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center my-2">
          New Products
        </h2>
        <CarouselContent>
          {latestProducts.map((item) => (
            <CarouselItem key={item.id} className="p-4">
              <CarouselCard data={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNavigation alwaysShow />
        <CarouselIndicator />
      </Carousel>
    </div>
  );
}
