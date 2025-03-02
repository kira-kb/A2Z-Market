import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
// import Link from 'next/link';
import Image from "next/image";

import gen from "@/assets/images/cosmotics.png";

const ProductDetailsPage: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="flex flex-row space-x-8">
        {/* Product Image and Thumbnail Section */}
        <div className="flex flex-col items-center justify-center space-y-4 md:min-h-[300px]">
          <div className=" flex-1 flex items-center justify-center">
            <Image
              src={gen}
              alt="Redmi 9 Prime"
              width={300}
              height={400}
              className="rounded-lg object-contain"
            />
          </div>

          <div className="flex space-x-2">
            <Image
              src={gen}
              alt="Redmi 9 Prime"
              width={60}
              height={60}
              className="rounded-md border"
            />
            <Image
              src={gen}
              alt="Redmi 9 Prime"
              width={60}
              height={60}
              className="rounded-md border"
            />
            <Image
              src={gen}
              alt="Redmi 9 Prime"
              width={60}
              height={60}
              className="rounded-md border"
            />
          </div>
        </div>

        {/* Product Details Section */}
        <div className="w-96">
          <h1 className="text-2xl font-bold mb-2">
            Redmi 9 Prime (Space Blue, 64 GB) (4 GB RAM)
          </h1>
          <p className="text-xl text-gray-700 mb-2">
            $360.00 <span className="line-through">$400.00</span>
          </p>
          <p className="text-green-600 mb-4">Free delivery</p>
          <p className="text-sm text-gray-500 mb-4">
            Shipping Speed to Delivery. EMIs from $100/month. Bank Offer: Extra
            5% off* with Axis Bank Buzz Credit Card
          </p>
          <Card className="mb-4">
            <CardContent>
              <p className="font-semibold mb-2">1 Year Manufacturer Warranty</p>
              <ul className="text-sm list-disc list-inside text-gray-600">
                <li>
                  Handset, Power Adapter, USB Type-C Cable, SIM Eject Tool,
                  Simple Protective Cover, Warranty Card, User Guide
                </li>
                <li>Full HD+ IPS Display</li>
                <li>13MP Rear Camera | 8MP Front Camera</li>
                <li>5020 mAh Battery</li>
                <li>2340 x 1080 Pixels</li>
              </ul>
            </CardContent>
          </Card>

          <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold">
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Footer Section with Payment Methods */}
      <div className="mt-8 text-center text-sm text-gray-600">
        <p>Net banking &amp; Credit/ Debit/ ATM card</p>
        <p>Cash on Delivery Eligible</p>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
