import { InfiniteSlider } from "@/components/ui/infinite-slider";

import slideImg from "@/assets/images/mobile.png";
import Image from "next/image";
import Link from "next/link";

export function InfiniteSliderHoverSpeed() {
  return (
    <div className="my-16 max-w-[98dvw] overflow-hidden">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-4">
        Latest Mobile Phones
      </h2>
      <InfiniteSlider speedOnHover={1} gap={24} className="overflow-hidden">
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 flex items-center justify-center">
          <Link href="#">
            <Image
              className="p-2 w-[200px] rounded-t-lg object-cover"
              src={slideImg}
              alt="product image"
            />
          </Link>
          <div className="px-5 pb-5">
            <a href="#">
              <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white w-[220px]">
                Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport
              </h5>
            </a>

            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                $599
              </span>
            </div>
          </div>
        </div>

        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 flex items-center justify-center">
          <Link href="#">
            <Image
              className="p-2 w-[200px] rounded-t-lg object-cover"
              src={slideImg}
              alt="product image"
            />
          </Link>
          <div className="px-5 pb-5">
            <a href="#">
              <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white w-[220px]">
                Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport
              </h5>
            </a>

            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                $599
              </span>
            </div>
          </div>
        </div>

        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 flex items-center justify-center">
          <Link href="#">
            <Image
              className="p-2 w-[200px] rounded-t-lg object-cover"
              src={slideImg}
              alt="product image"
            />
          </Link>
          <div className="px-5 pb-5">
            <a href="#">
              <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white w-[220px]">
                Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport
              </h5>
            </a>

            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                $599
              </span>
            </div>
          </div>
        </div>

        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 flex items-center justify-center">
          <Link href="#">
            <Image
              className="p-2 w-[200px] rounded-t-lg object-cover"
              src={slideImg}
              alt="product image"
            />
          </Link>
          <div className="px-5 pb-5">
            <a href="#">
              <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white w-[220px]">
                Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport
              </h5>
            </a>

            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                $599
              </span>
            </div>
          </div>
        </div>

        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 flex items-center justify-center">
          <Link href="#">
            <Image
              className="p-2 w-[200px] rounded-t-lg object-cover"
              src={slideImg}
              alt="product image"
            />
          </Link>
          <div className="px-5 pb-5">
            <a href="#">
              <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white w-[220px]">
                Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport
              </h5>
            </a>

            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                $599
              </span>
            </div>
          </div>
        </div>

        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 flex items-center justify-center">
          <Link href="#">
            <Image
              className="p-2 w-[200px] rounded-t-lg object-cover"
              src={slideImg}
              alt="product image"
            />
          </Link>
          <div className="px-5 pb-5">
            <a href="#">
              <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white w-[220px]">
                Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport
              </h5>
            </a>

            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                $599
              </span>
            </div>
          </div>
        </div>
      </InfiniteSlider>
    </div>
  );
}
