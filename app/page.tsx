import { AppCarousel } from "@/components/carousel";
import { InfiniteSliderHoverSpeed } from "@/components/InfinityScroll";
import Link from "next/link";
import Image from "next/image";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";

import defaultImage from "@/assets/images/default_categories.png";
import Subscription from "@/components/subscription";
// import { useCategoryStore } from "@/store";
// import { useEffect } from "react";

interface ICategoryData {
  id: string;
  name: string;
  image?: string | null;
}

async function fetchCategories(): Promise<ICategoryData[] | undefined> {
  try {
    // const response = await fetch("/api/categories");

    // if (!response.ok) throw new Error("Something went wrong");

    // const data: ICategoryData[] = await response.json();

    // if (!data) return;

    // return data.slice(0, 2);
    const categories = await prisma.category.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });
    return categories.slice(0, 3);
  } catch (error) {
    console.log("error happend while fetching categories: ", error);
  }
}

export default async function Home() {
  const categories: ICategoryData[] | undefined = await fetchCategories();

  return (
    <div
      className={`min-h-screen dark:bg-gray-900 dark:text-white bg-gray-100 text-gray-800 pb-12 relative z-0 transition-colors duration-300`}
    >
      {/* Hero Section */}
      <section className="relative p-4">
        <div
          className={`absolute inset-0 dark:bg-gradient-to-r dark:from-indigo-800 dark:to-gray-800 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-70 mix-blend-multiply transition-colors duration-300`}
        ></div>
        <div className="container mx-auto px-4 text-center relative z-10 py-24">
          <h1
            className={`text-5xl md:text-7xl font-bold text-white mb-6 transition-colors duration-300`}
          >
            Discover Your Desire
          </h1>
          <p
            className={`text-lg md:text-xl dark:text-gray-300 text-gray-200 mb-10 transition-colors duration-300`}
          >
            Explore our curated collection of fashion, accessories, and more.
          </p>

          <Link href="/shop">
            <button
              className={`bg-white text-purple-600 font-semibold px-6 py-3 rounded-full hover:bg-gray-200 transition-colors`}
            >
              Shop Now
            </button>
          </Link>
        </div>
        <div className="container flex items-stretch justify-center mx-auto px-4 py-6">
          <AppCarousel />
        </div>
      </section>

      {/* Featured Categories */}
      {categories && categories?.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <h2
            className={`text-3xl font-bold text-center mb-12 dark:text-gray-100 text-gray-800 transition-colors duration-300`}
          >
            Featured Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories &&
              categories.length > 0 &&
              categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/shop?category=${category.name.toLowerCase()}`}
                  className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
                >
                  <div className="relative">
                    <Image
                      src={category.image || defaultImage}
                      width={600}
                      height={600}
                      alt="Clothing"
                      className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div
                      className={`absolute inset-0 dark:bg-gray-900 bg-black opacity-20 transition-colors duration-300`}
                    ></div>
                    <h3 className="absolute bottom-4 left-4 text-white text-xl font-semibold">
                      {category.name}
                    </h3>
                  </div>
                </Link>
              ))}
            {/* <Link
              href="/shop?category="
              className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="relative">
                <Image
                  src={clothes}
                  alt="Clothing"
                  className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
                />
                <div
                  className={`absolute inset-0 dark:bg-gray-900 bg-black opacity-20 transition-colors duration-300`}
                ></div>
                <h3 className="absolute bottom-4 left-4 text-white text-xl font-semibold">
                  Clothing
                </h3>
              </div>
            </Link> */}
            {/* <Link
              href="/shop?category="
              className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="relative">
                <Image
                  src={accessories}
                  alt="Accessories"
                  className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
                />
                <div
                  className={`absolute inset-0 dark:bg-gray-900 bg-black opacity-20 transition-colors duration-300`}
                ></div>
                <h3 className="absolute bottom-4 left-4 text-white text-xl font-semibold">
                  Accessories
                </h3>
              </div>
            </Link>
            <Link
              href="/shop?category="
              className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="relative">
                <Image
                  src={shoes}
                  alt="Shoes"
                  className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
                />
                <div
                  className={`absolute inset-0 dark:bg-gray-900 bg-black opacity-20 transition-colors duration-300`}
                ></div>
                <h3 className="absolute bottom-4 left-4 text-white text-xl font-semibold">
                  Shoes
                </h3>
              </div>
            </Link> */}
          </div>
        </section>
      )}

      {/* Infinite Slider Section */}
      <section
        className={`py-16 dark:bg-gray-800 bg-gray-200 transition-colors duration-300`}
      >
        <h2
          className={`text-3xl font-bold text-center mb-8 dark:text-gray-100 text-gray-800 transition-colors duration-300`}
        >
          Trending Now
        </h2>
        <InfiniteSliderHoverSpeed />
      </section>

      {/* Call to Action */}
      <section
        className={`py-16 dark:bg-indigo-800 bg-purple-600 text-white transition-colors duration-300`}
      >
        <Subscription />
        {/* <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Stay in the Loop</h2>
          <p className="mb-8">
            Sign up for our newsletter to get exclusive deals and the latest
            updates.
          </p>
          <form action="">
            <div className="flex w-full items-center justify-center text-center space-x-2">
              <Input
                type="email"
                placeholder="Email"
                className="max-w-sm placeholder:text-white dark:placeholder:text-gray-300 border-gray-200"
              />
              <Button type="submit">Subscribe</Button>
            </div>
          </form>
        </div> */}
      </section>
    </div>
  );
}
