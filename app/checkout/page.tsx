"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

const cartItems: CartItem[] = [
  { id: 1, name: "T-Shirt (Men's)", price: 20, quantity: 2 },
  { id: 2, name: "Sneakers (Women's)", price: 50, quantity: 1 },
];

const CheckoutPage = () => {
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    phone: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("");

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleShippingInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = () => {
    // Handle order submission logic
    console.log("Order Submitted", { shippingInfo, paymentMethod });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Shipping Information */}
        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            <div className="flex flex-col gap-4">
              <Input
                placeholder="Full Name"
                name="name"
                value={shippingInfo.name}
                onChange={handleShippingInfoChange}
              />
              <Input
                placeholder="Address"
                name="address"
                value={shippingInfo.address}
                onChange={handleShippingInfoChange}
              />
              <Input
                placeholder="City"
                name="city"
                value={shippingInfo.city}
                onChange={handleShippingInfoChange}
              />
              <Input
                placeholder="Country"
                name="country"
                value={shippingInfo.country}
                onChange={handleShippingInfoChange}
              />
              <Input
                placeholder="Postal Code"
                name="postalCode"
                value={shippingInfo.postalCode}
                onChange={handleShippingInfoChange}
              />
              <Input
                placeholder="Phone Number"
                name="phone"
                value={shippingInfo.phone}
                onChange={handleShippingInfoChange}
              />
            </div>
          </CardContent>
        </Card>

        {/* Payment Information */}
        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
            <div className="flex flex-col gap-4">
              <Select onValueChange={setPaymentMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Payment Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Credit Card">Credit Card</SelectItem>
                  <SelectItem value="PayPal">PayPal</SelectItem>
                  <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card className="col-span-1 lg:col-span-2">
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>${item.price}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>${item.price * item.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex justify-between mt-4">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-lg font-semibold">${totalPrice}</span>
            </div>
            <Button className="mt-6 w-full" onClick={handleSubmitOrder}>
              Place Order
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CheckoutPage;
