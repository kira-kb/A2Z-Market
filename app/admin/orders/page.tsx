"use client";

import AdminSidebar from "@/components/adminSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, PackageCheck, PackageX, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import {  Toaster } from "sonner";
import { Label } from "@/components/ui/label";
import { useOrderStore } from "@/store";
import { useUser } from "@clerk/nextjs";
import ImgLoader from "@/components/imgLoader";

import { format } from "date-fns";
import Image from "next/image";
import { LoadingButton } from "@/components/loaddingButton";

// interface Order {
//   id: number;
//   customer: string;
//   date: string;
//   total: number;
//   status: "pending" | "shipped" | "delivered" | "cancelled";
//   // itemsCount: number;
// }
export interface OrderItem {
  id: string;
  productId: string;
  orderId: string;
  quantity: number;
  price: number;
  product: {
    name: string;
    image: string;
  };
}

interface User {
  id: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  city: string;
  postalCode: string;
}
interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  user: User;

  createdAt: string;
}

// const initialOrders: Order[] = [
//   {
//     id: 1,
//     customer: "John Doe",
//     date: "2023-10-27",
//     total: 150.0,
//     status: "processing",
//     itemsCount: 3,
//   },
//   {
//     id: 2,
//     customer: "Jane Smith",
//     date: "2023-10-26",
//     total: 200.0,
//     status: "shipped",
//     itemsCount: 2,
//   },
//   {
//     id: 3,
//     customer: "Peter Jones",
//     date: "2023-10-25",
//     total: 75.0,
//     status: "pending",
//     itemsCount: 1,
//   },
//   {
//     id: 4,
//     customer: "Alice Brown",
//     date: "2023-10-24",
//     total: 300.0,
//     status: "delivered",
//     itemsCount: 5,
//   },
//   {
//     id: 5,
//     customer: "Bob Wilson",
//     date: "2023-10-23",
//     total: 100.0,
//     status: "cancelled",
//     itemsCount: 2,
//   },
// ];

function AdminOrdersPage() {
  // const { orders: ordersOnServer, fetchOrders } = useOrderStore();
  const { orders, fetchOrders, loading, updateOrder, isUpdating } =
    useOrderStore();

  // console.log("orders: ", orders);

  const user = useUser();
  const userId = user.user?.id;

  useEffect(() => {
    if (userId) {
      fetchOrders(userId, true);
    }
  }, [userId]);

  // useEffect(() => {
  //   fetchOrders("user_2w4wJDt6S3bWrvQDfbc3urVLuDr");
  // }, [fetchOrders]);

  // const [orders, setOrders] = useState<Order[]>(ordersOnServer);
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrders = orders.filter((order) => {
    if (!order) return [];
    return (
      order?.user?.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order?.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  const handleUpdateStatus = async (
    orderId: string,
    newStatus: Order["status"]
  ) => {
    // setOrders(
    //   orders.map((order) =>
    //     order.id === orderId ? { ...order, status: newStatus } : order
    //   )
    // );
    await updateOrder(orderId, userId!, newStatus, true);
    // toast.success(`Order ${orderId} status updated to ${newStatus}`);
    setOpen(false);
  };

  return (
    <SidebarProvider>
      {/* <Toaster richColors position="top-center" /> */}
      <div className="">
        <AdminSidebar className="z-0 my-16" />
        <SidebarTrigger className="fixed left-0 top-0 mt-16" />
      </div>
      <div className="p-0 flex-1 mx-8 text-left">
        <div className="flex-1 p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">Manage Orders</h1>
          </div>

          {/* Search Bar */}
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Search by customer name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md"
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Order List</CardTitle>
              <CardDescription>
                A list of all customer orders in the system.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Items Count</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading && (
                    <TableRow>
                      <TableCell>
                        <ImgLoader />
                      </TableCell>
                    </TableRow>
                  )}
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order?.user?.email.split("@")[0]}</TableCell>
                      {/* <TableCell>{order.createdAt}</TableCell> */}
                      <TableCell>
                        {format(new Date(order.createdAt), "PPPpp")}
                      </TableCell>
                      <TableCell>{order.items.length}</TableCell>
                      <TableCell>
                        ${order.totalAmount}
                        {/* {order.items
                          .reduce((acc, item) => acc + item.price, 0)
                          .toFixed(2)} */}
                      </TableCell>
                      <TableCell>
                        <OrderStatusBadge status={order.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleViewOrder(order)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* View Order Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="overflow-y-scroll max-h-[95dvh]">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              View and manage the details of this order.
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <ViewOrderForm
              order={selectedOrder}
              onUpdateStatus={handleUpdateStatus}
              setOpen={setOpen}
              isUpdating={isUpdating}
            />
          )}
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
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

interface ViewOrderFormProps {
  order: Order;
  onUpdateStatus: (orderId: string, newStatus: Order["status"]) => void;
  setOpen: (isOpen: boolean) => void;
  isUpdating: boolean;
}

const ViewOrderForm = ({
  order,
  onUpdateStatus,
  setOpen,
  isUpdating,
}: ViewOrderFormProps) => {
  const [status, setStatus] = useState<string>(order.status);
  const handleStatusChange = (newStatus: Order["status"]) => {
    // onUpdateStatus(order.id, newStatus);
    setStatus(newStatus);
    // setOpen(false);
  };

  // const updateOrder

  return (
    <div className="grid gap-4 py-4">
      {/* Order Info */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="id" className="text-right">
          Order ID
        </Label>
        <Input id="id" value={order.id} className="col-span-3" readOnly />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="customer" className="text-right">
          Customer
        </Label>
        <Input
          id="customer"
          value={order.user.email}
          className="col-span-3"
          readOnly
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="date" className="text-right">
          Date
        </Label>
        <Input
          id="date"
          value={new Date(order.createdAt).toLocaleString()}
          className="col-span-3"
          readOnly
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="itemsCount" className="text-right">
          Items Count
        </Label>
        <Input
          id="itemsCount"
          value={order.items.length}
          className="col-span-3"
          readOnly
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="total" className="text-right">
          Total
        </Label>
        <Input
          id="total"
          value={`$${order.totalAmount.toFixed(2)}`}
          className="col-span-3"
          readOnly
        />
      </div>

      {/* Shipping Address */}
      <div className="grid grid-cols-4 items-start gap-4">
        <Label htmlFor="address" className="text-right pt-2">
          Shipping Address
        </Label>
        <div className="col-span-3">
          <p className="text-sm border rounded-md p-2">
            {order.user?.email}
            <br />
            {/* {order.user?.street}<br /> */}
            {order.user?.city}, {order.user?.country} {order.user?.postalCode}
            <br />
            {order.user?.country}
          </p>
        </div>
      </div>

      {/* Ordered Items List */}
      <div className="grid grid-cols-4 items-start gap-4">
        <Label className="text-right pt-2">Items</Label>
        <div className="col-span-3 space-y-2">
          {order.items.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center border p-2 rounded-md text-sm"
            >
              <Image
                src={`/api/telegram-file?fileId=${item.product.image[0]}`}
                alt="Secure Telegram Image"
                width={400}
                height={400}
                className="w-16 h-16 rounded object-cover"
              />
              <span className="font-medium">{item.product.name}</span>
              <span>
                {item.quantity} × ${item.price.toFixed(2)}
              </span>
              <span className="text-muted-foreground">
                ${(item.quantity * item.price).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Status */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="status" className="text-right">
          Status
        </Label>
        {/* <Select onValueChange={handleStatusChange} defaultValue={order.status}> */}
        <Select onValueChange={handleStatusChange} defaultValue={status}>
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Select a status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DialogFooter>
        <LoadingButton
          LoadingText="Updating..."
          type="button"
          variant="default"
          loading={isUpdating}
          onClick={() => onUpdateStatus(order.id, status)}
        >
          Update
        </LoadingButton>
        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
          Close
        </Button>
      </DialogFooter>
    </div>
  );
};

// ???????????????????????????????????????????????
// ???????????????????????????????????????????????
// ???????????????????????????????????????????????

// const ViewOrderForm = ({
//   order,
//   onUpdateStatus,
//   setOpen,
// }: ViewOrderFormProps) => {
//   const handleStatusChange = (newStatus: Order["status"]) => {
//     onUpdateStatus(order.id, newStatus);
//     setOpen(false);
//   };

//   return (
//     <div className="grid gap-4 py-4">
//       <div className="grid grid-cols-4 items-center gap-4">
//         <Label htmlFor="id" className="text-right">
//           Order ID
//         </Label>
//         <Input id="id" value={order.id} className="col-span-3" readOnly />
//       </div>
//       <div className="grid grid-cols-4 items-center gap-4">
//         <Label htmlFor="customer" className="text-right">
//           Customer
//         </Label>
//         <Input
//           id="customer"
//           value={order.user.email}
//           className="col-span-3"
//           readOnly
//         />
//       </div>
//       <div className="grid grid-cols-4 items-center gap-4">
//         <Label htmlFor="date" className="text-right">
//           Date
//         </Label>
//         <Input
//           id="date"
//           value={order.createdAt}
//           className="col-span-3"
//           readOnly
//         />
//       </div>
//       <div className="grid grid-cols-4 items-center gap-4">
//         <Label htmlFor="itemsCount" className="text-right">
//           Items Count
//         </Label>
//         <Input
//           id="itemsCount"
//           value={order.items.length}
//           className="col-span-3"
//           readOnly
//         />
//       </div>
//       <div className="grid grid-cols-4 items-center gap-4">
//         <Label htmlFor="total" className="text-right">
//           Total
//         </Label>
//         <Input
//           id="total"
//           // value={`$${order.items
//           //   .reduce((acc, item) => acc + item.price, 0)
//           //   .toFixed(2)}`}
//           value={`$${order.totalAmount}`}
//           className="col-span-3"
//           readOnly
//         />
//       </div>
//       <div className="grid grid-cols-4 items-center gap-4">
//         <Label htmlFor="status" className="text-right">
//           Status
//         </Label>
//         <Select onValueChange={handleStatusChange} defaultValue={order.status}>
//           <SelectTrigger className="col-span-3">
//             <SelectValue placeholder="Select a status" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="pending">Pending</SelectItem>
//             {/* <SelectItem value="processing">Processing</SelectItem> */}
//             <SelectItem value="shipped">Shipped</SelectItem>
//             <SelectItem value="delivered">Delivered</SelectItem>
//             <SelectItem value="cancelled">Cancelled</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>
//       <DialogFooter>
//         <Button type="button" onClick={() => setOpen(false)}>
//           Close
//         </Button>
//       </DialogFooter>
//     </div>
//   );
// };

export default AdminOrdersPage;
