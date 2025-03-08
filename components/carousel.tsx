import {
  Carousel,
  CarouselContent,
  CarouselNavigation,
  CarouselIndicator,
  CarouselItem,
} from "@/components/ui/carousel";
import CarouselCard from "./CarouselCard";

export function AppCarousel() {
  return (
    <div className="relative w-[80%]">
      <Carousel>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center my-2">
          New Products
        </h2>
        <CarouselContent>
          <CarouselItem className="p-4">
            <CarouselCard />
          </CarouselItem>
          <CarouselItem className="p-4">
            <CarouselCard />
          </CarouselItem>
          <CarouselItem className="p-4">
            <CarouselCard />
          </CarouselItem>
          <CarouselItem className="p-4">
            <CarouselCard />
          </CarouselItem>
        </CarouselContent>
        <CarouselNavigation alwaysShow />
        <CarouselIndicator />
      </Carousel>
    </div>
  );
}
