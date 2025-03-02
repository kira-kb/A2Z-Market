import { AppCarousel } from "@/components/carousel";
import { InfiniteSliderHoverSpeed } from "@/components/InfinityScroll";
// import InfinityScroller from "@/components/InfinityScroll";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <AppCarousel />

      <InfiniteSliderHoverSpeed />

      <InfiniteSliderHoverSpeed />

      <InfiniteSliderHoverSpeed />
    </div>
  );
}
