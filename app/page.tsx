// "use client";

// import { AppCarousel } from "@/components/carousel";
// import { InfiniteSliderHoverSpeed } from "@/components/InfinityScroll";
// import Link from "next/link";
// import { useTheme } from "next-themes";
// import { useEffect, useState } from "react";

// export default function Home() {
//   const { theme, setTheme } = useTheme();
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   const toggleTheme = () => {
//     setTheme(theme === "dark" ? "light" : "dark");
//   };

//   if (!mounted) {
//     return <div className="min-h-screen bg-gray-100 dark:bg-gray-900"></div>;
//   }

//   return (
//     <div
//       className={`min-h-screen ${
//         theme === "dark"
//           ? "bg-gray-900 text-white"
//           : "bg-gray-100 text-gray-800"
//       }  pb-12 relative z-0 transition-colors duration-300`}
//     >
//       {/* Theme Toggle Button */}
//       <div className="container mx-auto px-4 flex justify-end mb-8">
//         <button
//           onClick={toggleTheme}
//           className="bg-gray-300 dark:bg-gray-700 px-4 py-2 rounded-full hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
//         >
//           {theme === "dark" ? "Light Mode" : "Dark Mode"}
//         </button>
//       </div>

//       {/* Hero Section */}
//       <section className="relative">
//         <div
//           className={`absolute inset-0 ${
//             theme === "dark"
//               ? "bg-gradient-to-r from-indigo-800 to-gray-800"
//               : "bg-gradient-to-r from-purple-600 to-indigo-600"
//           } opacity-70 mix-blend-multiply transition-colors duration-300`}
//         ></div>
//         <div className="container mx-auto px-4 text-center relative z-10 py-24">
//           <h1
//             className={`text-5xl md:text-7xl font-bold ${
//               theme === "dark" ? "text-white" : "text-white"
//             } mb-6 transition-colors duration-300`}
//           >
//             Discover Your Style
//           </h1>
//           <p
//             className={`text-lg md:text-xl ${
//               theme === "dark" ? "text-gray-300" : "text-gray-200"
//             } mb-10 transition-colors duration-300`}
//           >
//             Explore our curated collection of fashion, accessories, and more.
//           </p>
//           <Link href="/products">
//             <button
//               className={`bg-white ${
//                 theme === "dark" ? "text-purple-600" : "text-purple-600"
//               } font-semibold px-6 py-3 rounded-full hover:bg-gray-200 transition-colors`}
//             >
//               Shop Now
//             </button>
//           </Link>
//         </div>
//         <div className="container mx-auto px-4">
//           <AppCarousel />
//         </div>
//       </section>

//       {/* Featured Categories */}
//       <section className="container mx-auto px-4 py-16">
//         <h2
//           className={`text-3xl font-bold text-center mb-12 ${
//             theme === "dark" ? "text-gray-100" : "text-gray-800"
//           } transition-colors duration-300`}
//         >
//           Featured Categories
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           <Link
//             href="/category/clothing"
//             className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
//           >
//             <div className="relative">
//               <img
//                 src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//                 alt="Clothing"
//                 className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
//               />
//               <div
//                 className={`absolute inset-0 ${
//                   theme === "dark" ? "bg-gray-900" : "bg-black"
//                 } opacity-20 transition-colors duration-300`}
//               ></div>
//               <h3 className="absolute bottom-4 left-4 text-white text-xl font-semibold">
//                 Clothing
//               </h3>
//             </div>
//           </Link>
//           <Link
//             href="/category/accessories"
//             className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
//           >
//             <div className="relative">
//               <img
//                 src="https://images.unsplash.com/photo-1523775633436-a0e60f79b46a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//                 alt="Accessories"
//                 className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
//               />
//               <div
//                 className={`absolute inset-0 ${
//                   theme === "dark" ? "bg-gray-900" : "bg-black"
//                 } opacity-20 transition-colors duration-300`}
//               ></div>
//               <h3 className="absolute bottom-4 left-4 text-white text-xl font-semibold">
//                 Accessories
//               </h3>
//             </div>
//           </Link>
//           <Link
//             href="/category/shoes"
//             className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
//           >
//             <div className="relative">
//               <img
//                 src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//                 alt="Shoes"
//                 className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
//               />
//               <div
//                 className={`absolute inset-0 ${
//                   theme === "dark" ? "bg-gray-900" : "bg-black"
//                 } opacity-20 transition-colors duration-300`}
//               ></div>
//               <h3 className="absolute bottom-4 left-4 text-white text-xl font-semibold">
//                 Shoes
//               </h3>
//             </div>
//           </Link>
//         </div>
//       </section>

//       {/* Infinite Slider Section */}
//       <section
//         className={`py-16 ${
//           theme === "dark" ? "bg-gray-800" : "bg-gray-200"
//         } transition-colors duration-300`}
//       >
//         <h2
//           className={`text-3xl font-bold text-center mb-8 ${
//             theme === "dark" ? "text-gray-100" : "text-gray-800"
//           } transition-colors duration-300`}
//         >
//           Trending Now
//         </h2>
//         <InfiniteSliderHoverSpeed />
//       </section>

//       {/* Call to Action */}
//       <section
//         className={`py-16 ${
//           theme === "dark" ? "bg-indigo-800" : "bg-purple-600"
//         } text-white transition-colors duration-300`}
//       >
//         <div className="container mx-auto px-4 text-center">
//           <h2 className="text-3xl font-bold mb-6">Stay in the Loop</h2>
//           <p className="mb-8">
//             Sign up for our newsletter to get exclusive deals and the latest
//             updates.
//           </p>
//           <Link href="/newsletter">
//             <button className="bg-white text-purple-600 font-semibold px-6 py-3 rounded-full hover:bg-gray-200 transition-colors">
//               Subscribe
//             </button>
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// }

// ????????????????????????????????????????????????????

import { AppCarousel } from "@/components/carousel";
import { InfiniteSliderHoverSpeed } from "@/components/InfinityScroll";
import Link from "next/link";

export default function Home() {
  return (
    <div
      className={`min-h-screen dark:bg-gray-900 dark:text-white bg-gray-100 text-gray-800 pb-12 relative z-0 transition-colors duration-300`}
    >
      {/* Hero Section */}
      <section className="relative">
        <div
          className={`absolute inset-0 dark:bg-gradient-to-r dark:from-indigo-800 dark:to-gray-800 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-70 mix-blend-multiply transition-colors duration-300`}
        ></div>
        <div className="container mx-auto px-4 text-center relative z-10 py-24">
          <h1
            className={`text-5xl md:text-7xl font-bold text-white mb-6 transition-colors duration-300`}
          >
            Discover Your Style
          </h1>
          <p
            className={`text-lg md:text-xl dark:text-gray-300 text-gray-200 mb-10 transition-colors duration-300`}
          >
            Explore our curated collection of fashion, accessories, and more.
          </p>
          <Link href="/products">
            <button
              className={`bg-white text-purple-600 font-semibold px-6 py-3 rounded-full hover:bg-gray-200 transition-colors`}
            >
              Shop Now
            </button>
          </Link>
        </div>
        <div className="container flex items-center justify-center mx-auto px-4">
          <AppCarousel />
        </div>
      </section>

      {/* Featured Categories */}
      <section className="container mx-auto px-4 py-16">
        <h2
          className={`text-3xl font-bold text-center mb-12 dark:text-gray-100 text-gray-800 transition-colors duration-300`}
        >
          Featured Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link
            href="/category/clothing"
            className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
          </Link>
          <Link
            href="/category/accessories"
            className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1523775633436-a0e60f79b46a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
            href="/category/shoes"
            className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
          </Link>
        </div>
      </section>

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
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Stay in the Loop</h2>
          <p className="mb-8">
            Sign up for our newsletter to get exclusive deals and the latest
            updates.
          </p>
          <Link href="/newsletter">
            <button className="bg-white text-purple-600 font-semibold px-6 py-3 rounded-full hover:bg-gray-200 transition-colors">
              Subscribe
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}

// ????????????????????????????????????????????????????

// import { AppCarousel } from "@/components/carousel";
// import { InfiniteSliderHoverSpeed } from "@/components/InfinityScroll";
// import Link from "next/link";

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-gray-100  pb-12 relative z-0n">
//       {/* Hero Section */}
//       <section className="relative">
//         <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-70 mix-blend-multiply"></div>
//         <div className="container mx-auto px-4 text-center relative z-10 py-24">
//           <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
//             Discover Your Style
//           </h1>
//           <p className="text-lg md:text-xl text-gray-200 mb-10">
//             Explore our curated collection of fashion, accessories, and more.
//           </p>
//           <Link href="/products">
//             <button className="bg-white text-purple-600 font-semibold px-6 py-3 rounded-full hover:bg-gray-200 transition-colors">
//               Shop Now
//             </button>
//           </Link>
//         </div>
//         <div className="container mx-auto px-4">
//           <AppCarousel />
//         </div>
//       </section>

//       {/* Featured Categories */}
//       <section className="container mx-auto px-4 py-16">
//         <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
//           Featured Categories
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           <Link
//             href="/category/clothing"
//             className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
//           >
//             <div className="relative">
//               <img
//                 src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//                 alt="Clothing"
//                 className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
//               />
//               <div className="absolute inset-0 bg-black opacity-20"></div>
//               <h3 className="absolute bottom-4 left-4 text-white text-xl font-semibold">
//                 Clothing
//               </h3>
//             </div>
//           </Link>
//           <Link
//             href="/category/accessories"
//             className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
//           >
//             <div className="relative">
//               <img
//                 src="https://images.unsplash.com/photo-1523775633436-a0e60f79b46a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//                 alt="Accessories"
//                 className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
//               />
//               <div className="absolute inset-0 bg-black opacity-20"></div>
//               <h3 className="absolute bottom-4 left-4 text-white text-xl font-semibold">
//                 Accessories
//               </h3>
//             </div>
//           </Link>
//           <Link
//             href="/category/shoes"
//             className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
//           >
//             <div className="relative">
//               <img
//                 src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//                 alt="Shoes"
//                 className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
//               />
//               <div className="absolute inset-0 bg-black opacity-20"></div>
//               <h3 className="absolute bottom-4 left-4 text-white text-xl font-semibold">
//                 Shoes
//               </h3>
//             </div>
//           </Link>
//         </div>
//       </section>

//       {/* Infinite Slider Section */}
//       <section className="py-16 bg-gray-200">
//         <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
//           Trending Now
//         </h2>
//         <InfiniteSliderHoverSpeed />
//       </section>

//       {/* Call to Action */}
//       <section className="bg-purple-600 text-white py-16">
//         <div className="container mx-auto px-4 text-center">
//           <h2 className="text-3xl font-bold mb-6">Stay in the Loop</h2>
//           <p className="mb-8">
//             Sign up for our newsletter to get exclusive deals and the latest
//             updates.
//           </p>
//           <Link href="/newsletter">
//             <button className="bg-white text-purple-600 font-semibold px-6 py-3 rounded-full hover:bg-gray-200 transition-colors">
//               Subscribe
//             </button>
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// }

// ???????????????????
// import { AppCarousel } from "@/components/carousel";
// import { InfiniteSliderHoverSpeed } from "@/components/InfinityScroll";

// export default function Home() {
//   return (
//     <div className="flex flex-col items-center justify-center">
//       <AppCarousel />

//       <InfiniteSliderHoverSpeed />

//       <InfiniteSliderHoverSpeed />

//       <InfiniteSliderHoverSpeed />
//     </div>
//   );
// }
