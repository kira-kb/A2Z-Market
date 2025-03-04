"use client";

import { Button } from "@/components/ui/button";
import { Menu, ShoppingCart, Trash2 } from "lucide-react";
// import { Menu, Search, ShoppingCart, Trash2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState, useMemo } from "react";
import { ThemeButton } from "./ThemeButton";
import Image from "next/image";
import Link from "next/link";

import bakilava from "@/assets/images/bakilava.png";
import siga from "@/assets/images/kurt.jpg";
import UserMenu from "./userMenu";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  // const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Item 1",
      price: 10,
      quantity: 1,
      image: siga, // Replace with actual image path
    },
    {
      id: 2,
      name: "Item 2",
      price: 15,
      quantity: 2,
      image: bakilava, // Replace with actual image path
    },
  ]);

  // Quantity increment
  const incrementQuantity = (itemId: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Quantity decrement
  const decrementQuantity = (itemId: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Remove item
  const removeItem = (itemId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  // Total price calculation
  const totalPrice = useMemo(
    () =>
      cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems]
  );

  return (
    <nav
      aria-describedby="Navigation bar"
      className="bg-white dark:bg-gray-900 shadow-md fixed w-full top-0 z-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl text-wrap font-bold text-gray-900 dark:text-white">
              A2Z Market
            </h1>
          </div>

          {/* Search Input - Desktop */}
          {/* <div className="hidden md:flex items-center space-x-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Search for products..."
            />
            <Button variant="ghost">
              <Search className="h-5 w-5 text-gray-900 dark:text-white" />
            </Button>
          </div> */}

          {/* Desktop Menu */}
          <div className="hidden md:flex">
            <Link href="/" passHref>
              <Button variant="ghost">Home</Button>
            </Link>
            <Link href="/shop" passHref>
              <Button variant="ghost">Shop</Button>
            </Link>
            <Link href="/categories" passHref>
              <Button variant="ghost">Categories</Button>
            </Link>
            <Link href="/admin" passHref>
              <Button variant="ghost">admin</Button>
            </Link>
          </div>

          {/* Cart with Popover */}
          <div className="relative flex items-center space-x-4">
            <div className="relative flex items-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost">
                    <ShoppingCart className="h-6 w-6 text-gray-900 dark:text-white" />
                    {cartItems.length > 0 && (
                      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                        {cartItems.length}
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-4">
                  <h3 className="text-lg font-semibold mb-2">Cart Items</h3>
                  {cartItems.length > 0 ? (
                    <ul className="space-y-4">
                      {cartItems.map((item) => (
                        <li
                          key={item.id}
                          className="flex items-center space-x-4 border-b-2 border-slate-300 py-1"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="text-sm font-semibold">
                              {item.name}
                            </h4>
                            <div className="flex items-center justify-between mt-2">
                              <span>${item.price}</span>
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => decrementQuantity(item.id)}
                                >
                                  -
                                </Button>
                                <span>{item.quantity}</span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => incrementQuantity(item.id)}
                                >
                                  +
                                </Button>
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>Your cart is empty.</p>
                  )}

                  {cartItems.length > 0 && (
                    <>
                      <div className="flex justify-between items-center mt-4">
                        <span className="text-lg font-semibold">Total:</span>
                        <span className="text-lg font-bold">${totalPrice}</span>
                      </div>
                      <div className="mt-4">
                        <Link href="/checkout" passHref>
                          <Button variant="default" className="w-full">
                            Go to Checkout
                          </Button>
                        </Link>
                      </div>
                    </>
                  )}
                </PopoverContent>
              </Popover>
            </div>

            <ThemeButton />

            <UserMenu />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-6 w-6 text-gray-900 dark:text-white" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-50 dark:bg-gray-900">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* Mobile Search */}
            {/* <div className="flex items-center space-x-2 px-2 mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                placeholder="Search..."
              />
              <Button variant="ghost">
                <Search className="h-5 w-5 text-gray-900 dark:text-white" />
              </Button>
            </div> */}
            {/* Mobile Navigation Links */}
            <Link href="/" passHref>
              <Button variant="ghost" className="w-full text-left">
                Home
              </Button>
            </Link>
            <Link href="/shop" passHref>
              <Button variant="ghost" className="w-full text-left">
                Shop
              </Button>
            </Link>
            <Link href="/categories" passHref>
              <Button variant="ghost" className="w-full text-left">
                Categories
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
