import Image from "next/image";
import Link from "next/link";

import clothing from "@/assets/images/clothings.avif";
import electronics from "@/assets/images/electronics.jpg";
import cosmotics from "@/assets/images/cosmotics.png";
import home from "@/assets/images/home.jpg";
import sport from "@/assets/images/sports.avif";
import books from "@/assets/images/books.avif";

export default function CategoriesPage() {
  const categories = [
    {
      name: "Clothing",
      image: clothing,
      href: "/category/clothing",
      description: "Find the perfect outfit for any occasion.",
    },
    {
      name: "Electronics",
      image: electronics,
      href: "/category/electronics",
      description: "Shop the latest gadgets and tech.",
    },
    {
      name: "Beauty & Personal Care",
      image: cosmotics,
      href: "/category/beauty",
      description: "Discover your new favorite beauty products.",
    },
    {
      name: "Home & Garden",
      image: home,
      description: "Everything you need for your home and garden.",
    },
    {
      name: "Sports",
      image: sport,
      description: "Gear up for your next adventure.",
    },
    {
      name: "Books",
      image: books,
      description: "Find your next great read.",
    },
    // {
    //   name: "Toys & Games",
    //   image:
    //     "https://images.unsplash.com/photo-1511367461989-f814173ae22a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //   href: "/category/toys",
    //   description: "Fun for the whole family!",
    // },
  ];

  return (
    <div className="container mx-auto bg-transparent px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">
        Browse Categories
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {categories.map((category) => (
          <Link
            href={`/shop?category=${category.name.toLowerCase()}`}
            key={category.name}
            className="group"
          >
            <div className="relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow bg-white dark:bg-gray-700">
              <Image
                src={category.image}
                alt={category.name}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 dark:bg-gray-900/40"></div>
              <div className="absolute bottom-0 left-0 w-full p-4 bg-white/90 dark:bg-gray-800/90">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {category.name}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {category.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
