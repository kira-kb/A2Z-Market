"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Loader2, PackageCheck, PackageX, Truck } from "lucide-react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string[];
}

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  product: Product;
}

interface Order {
  id: string;
  createdAt: string;
  status: string;
  totalAmount: number;
  items: OrderItem[];
}

interface OrderStatusBadgeProps {
  status: Order["status"];
}

const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
  let badgeText = "";
  let badgeColor = "";
  let badgeIcon;

  switch (status) {
    case "pending":
      badgeText = "Pending";
      badgeColor = "bg-yellow-500 text-yellow-900";
      badgeIcon = <Truck className="h-4 w-4" />;
      break;
    case "shipped":
      badgeText = "Shipped";
      badgeColor = "bg-indigo-500 text-indigo-900";
      badgeIcon = <Truck className="h-4 w-4" />;
      break;
    case "delivered":
      badgeText = "Delivered";
      badgeColor = "bg-green-500 text-green-900";
      badgeIcon = <PackageCheck className="h-4 w-4" />;
      break;
    case "cancelled":
      badgeText = "Cancelled";
      badgeColor = "bg-red-500 text-red-900";
      badgeIcon = <PackageX className="h-4 w-4" />;
      break;
    default:
      badgeText = "Unknown";
      badgeColor = "bg-gray-500 text-gray-900";
      break;
  }

  return (
    <div
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeColor}`}
    >
      {badgeIcon}
      <span className="ml-2">{badgeText}</span>
    </div>
  );
};

export default function CustomerOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  // const userId = "user_xxxx"; // Replace with actual Clerk or auth userId

  const user = useUser();
  const userId = user.user?.id;

  useEffect(() => {
    async function fetchOrders() {
      try {
        // const res = await fetch(`api/orders?userId=${userId}`);
        const res = await fetch(
          `api/orders?userId=user_2w4wJDt6S3bWrvQDfbc3urVLuDr`
        );
        const data = await res.json();

        console.log("from account order data: ", data);
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders", err);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="animate-spin h-6 w-6 text-primary" />
      </div>
    );

  if (orders.length === 0)
    return (
      <div className="text-center mt-10 text-gray-500">No orders yet.</div>
    );

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader className="flex flex-col sm:flex-row sm:justify-between">
              <div>
                <CardTitle className="text-lg">Order ID: {order.id}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Placed on {format(new Date(order.createdAt), "PPPpp")}
                </p>
              </div>
              {/* badgeText = "Pending";
      badgeColor = "bg-yellow-500 text-yellow-900";
      badgeIcon = <Truck className="h-4 w-4" />; */}
              {/* <Badge
                variant={
                  order.status === "pending"
                    ? "outline"
                    : order.status === "shipped"
                      ? "secondary"
                      : "default"
                }
                className="mt-2 sm:mt-0"
              >
                {order.status.toUpperCase()}
              </Badge> */}
              <OrderStatusBadge status={order.status} />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b pb-2"
                  >
                    <div className="flex gap-4 items-center">
                      <Image
                        // src={item.product.image[0]}
                        src={`/api/telegram-file?fileId=${item.product.image[0]}`}
                        width={1000}
                        height={1000}
                        alt={item.product.name}
                        className="w-16 h-16 rounded object-cover"
                      />
                      <div>
                        <p className="font-medium">{item.product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">ETB {item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-semibold text-primary">
                  ETB {order.totalAmount.toFixed(2)}
                </span>
              </div>
              {order.status === "pending" && (
                <div className="mt-4 flex gap-2">
                  <Button variant="destructive">Cancel Order</Button>
                  {/* Add remove product from order here if needed */}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ?????????????????????????????????????????????????????????
// ?????????????????????????????????????????????????????????

// "use client";

// import Image from "next/image";

// export default function TelegramImage() {
//   return (
//     <Image
//       src={`/api/telegram-file?fileId=AgACAgQAAyEGAASJB5gVAAIBMWfxCGUcEFzyaNI6o8dPt-kXk_AYAAIoxTEbKZGIUw51YthLK7XEAQADAgADeAADNgQ`}
//       alt="Secure Telegram Image"
//       width={400}
//       height={400}
//     />
//   );
// }
