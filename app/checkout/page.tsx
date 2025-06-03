"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
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
import { useCartStore, useOrderStore, useUserStore } from "@/store";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Building2, Earth, Mail, MapPin, MapPinned, Phone } from "lucide-react";
import { LoadingButton } from "@/components/loaddingButton";
import ImgLoader from "@/components/imgLoader";

const CheckoutPage = () => {
  const { users, fetchUsers, isLoadding, updateUsers } = useUserStore();
  const {
    cartItems,
    totalPrice,
    isLoading: isCartLoading,
    fetchServerCart,
  } = useCartStore();
  const { addOrder, isAdding } = useOrderStore();

  const [shippingInfo, setShippingInfo] = useState({
    email: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");

  // Fetch user on mount
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Populate shipping info when user data loads
  useEffect(() => {
    if (users) {
      setShippingInfo({
        email: users.email || "",
        address: users.address || "",
        city: users.city || "",
        country: users.country || "",
        postalCode: users.postalCode || "",
        phone: users.phone || "",
      });
    }
  }, [users]);

  const handleShippingInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleUpdateInfo = async () => {
    if (!users?.id) return;
    try {
      await updateUsers({ ...shippingInfo, id: users.id });
      setUpdateStatus("Shipping info updated!");
      setTimeout(() => setUpdateStatus(""), 3000);
    } catch (error) {
      console.log(error);
      setUpdateStatus("Failed to update info.");
      setTimeout(() => setUpdateStatus(""), 3000);
    }
  };

  const handleSubmitOrder = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    await addOrder(users.id);
    await fetchServerCart();
    // console.log("Order Submitted", { shippingInfo, paymentMethod });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Shipping Information */}
        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold mb-4 flex mt-2">
              Shipping Information
              <LoadingButton
                className="ml-auto"
                loading={isLoadding}
                LoadingText="Updating..."
                onClick={handleUpdateInfo}
              >
                Update
              </LoadingButton>
            </h2>

            {updateStatus && (
              <p className="text-sm text-green-600 mb-2">{updateStatus}</p>
            )}

            <div className="flex flex-col gap-4">
              {[
                { icon: <Mail />, name: "email", disabled: true },
                { icon: <MapPinned />, name: "address" },
                { icon: <Building2 />, name: "city" },
                { icon: <Earth />, name: "country" },
                { icon: <MapPin />, name: "postalCode" },
                { icon: <Phone />, name: "phone" },
              ].map(({ icon, name, disabled }) => (
                <div
                  key={name}
                  className="w-full flex gap-2 flex-nowrap items-center justify-center"
                >
                  <Label className="text-gray-500" htmlFor={name}>
                    {icon}
                  </Label>
                  <Input
                    placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
                    name={name}
                    value={shippingInfo[name as keyof typeof shippingInfo]}
                    onChange={handleShippingInfoChange}
                    disabled={disabled}
                  />
                </div>
              ))}
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
                  {/* You can conditionally render this based on business logic */}
                  {/* <SelectItem value="POD">Pay on Delivery</SelectItem> */}
                  <SelectItem value="Telebirr">Telebirr</SelectItem>
                  <SelectItem value="CBE">CBE</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card className="col-span-1 lg:col-span-2">
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            {isCartLoading && <ImgLoader />}
            {cartItems.length === 0 ? (
              <p className="text-gray-600">Your cart is empty.</p>
            ) : (
              <>
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
                    {cartItems.map((item, i) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Link href={`/shop/${item.id}`}>
                            {i + 1}. {item.product.name}
                          </Link>
                        </TableCell>
                        <TableCell>${item.product.price.toFixed(2)}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="flex justify-between mt-4">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-lg font-semibold">
                    ${totalPrice().toFixed(2)}
                  </span>
                </div>
                <LoadingButton
                  loading={isAdding}
                  LoadingText="Placing Order..."
                  className="mt-6 w-full"
                  onClick={handleSubmitOrder}
                >
                  Place Order
                </LoadingButton>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CheckoutPage;

// ? ///////////////////////////////////////////////////////////
// ? ///////////////////////////////////////////////////////////
// "use client";

// import { useEffect, useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { useCartStore, useUserStore } from "@/store";
// import Link from "next/link";
// import { Label } from "@/components/ui/label";
// import { Building2, Earth, Mail, MapPin, MapPinned, Phone } from "lucide-react";
// import { LoadingButton } from "@/components/loaddingButton";

// const CheckoutPage = () => {
//   const { users, fetchUsers, isLoadding, updateUsers } = useUserStore();

//   const [shippingInfo, setShippingInfo] = useState({
//     email: "",
//     address: "",
//     city: "",
//     country: "",
//     postalCode: "",
//     phone: "",
//   });

//   useEffect(() => {
//     const loader = async () => {
//       console.log("fetching user");
//       await fetchUsers();

//       console.log(users);

//       if (users) {
//         setShippingInfo({
//           email: users.email,
//           address: users.address,
//           city: users.city,
//           country: users.country,
//           postalCode: users.postalCode,
//           phone: users.phone,
//         });
//       }
//     };
//     loader();
//   }, [fetchUsers]);

//   const [paymentMethod, setPaymentMethod] = useState("");

//   const { cartItems, totalPrice } = useCartStore();

//   const handleShippingInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
//   };

//   const handleUpdateInfo = () => {
//     updateUsers({ ...shippingInfo, id: users.id });
//   };

//   const handleSubmitOrder = () => {
//     // Handle order submission logic
//     console.log("Order Submitted", { shippingInfo, paymentMethod });
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-semibold mb-6">Checkout</h1>
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Shipping Information */}
//         <Card>
//           <CardContent>
//             <h2 className="text-xl font-semibold mb-4 flex mt-2">
//               Shipping Information{" "}
//               <LoadingButton
//                 className="ml-auto"
//                 loading={isLoadding}
//                 LoadingText="Updating..."
//                 onClick={handleUpdateInfo}
//               >
//                 Update
//               </LoadingButton>
//             </h2>
//             <div className="flex flex-col gap-4">
//               <div className="w-full flex gap-2 flex-nowrap items-center justify-center">
//                 <Label className="text-gray-500" htmlFor="email">
//                   <Mail />{" "}
//                 </Label>
//                 <Input
//                   placeholder="Email"
//                   name="email"
//                   disabled
//                   value={shippingInfo.email}
//                   onChange={handleShippingInfoChange}
//                 />
//               </div>

//               <div className="w-full flex gap-2 flex-nowrap items-center justify-center">
//                 <Label className="text-gray-500" htmlFor="address">
//                   <MapPinned />{" "}
//                 </Label>
//                 <Input
//                   placeholder="Address"
//                   name="address"
//                   value={shippingInfo.address}
//                   onChange={handleShippingInfoChange}
//                 />
//               </div>

//               <div className="w-full flex gap-2 flex-nowrap items-center justify-center">
//                 <Label className="text-gray-500" htmlFor="city">
//                   <Building2 />{" "}
//                 </Label>
//                 <Input
//                   placeholder="City"
//                   name="city"
//                   value={shippingInfo.city}
//                   onChange={handleShippingInfoChange}
//                 />
//               </div>

//               <div className="w-full flex gap-2 flex-nowrap items-center justify-center">
//                 <Label className="text-gray-500" htmlFor="country">
//                   <Earth />{" "}
//                 </Label>
//                 <Input
//                   placeholder="Country"
//                   name="country"
//                   value={shippingInfo.country}
//                   onChange={handleShippingInfoChange}
//                 />
//               </div>

//               <div className="w-full flex gap-2 flex-nowrap items-center justify-center">
//                 <Label className="text-gray-500" htmlFor="postalCode">
//                   <MapPin />{" "}
//                 </Label>
//                 <Input
//                   placeholder="Postal Code"
//                   name="postalCode"
//                   value={shippingInfo.postalCode}
//                   onChange={handleShippingInfoChange}
//                 />
//               </div>

//               <div className="w-full flex gap-2 flex-nowrap items-center justify-center">
//                 <Label className="text-gray-500" htmlFor="phone">
//                   <Phone />{" "}
//                 </Label>
//                 <Input
//                   placeholder="Phone Number"
//                   name="phone"
//                   value={shippingInfo.phone}
//                   onChange={handleShippingInfoChange}
//                 />
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Payment Information */}
//         <Card>
//           <CardContent>
//             <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
//             <div className="flex flex-col gap-4">
//               <Select onValueChange={setPaymentMethod}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select Payment Method" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem disabled value="POD">
//                     Pay on delivery
//                   </SelectItem>
//                   <SelectItem value="Telebirr">Telebirr</SelectItem>
//                   <SelectItem value="CBE">CBE</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Order Summary */}
//         <Card className="col-span-1 lg:col-span-2">
//           <CardContent>
//             <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Product</TableHead>
//                   <TableHead>Price</TableHead>
//                   <TableHead>Quantity</TableHead>
//                   <TableHead>Total</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {cartItems.map((item, i) => (
//                   <TableRow key={item.id}>
//                     <TableCell>
//                       <Link href={`/shop/${item.id}`}>
//                         {i + 1} &nbsp;{item.product.name}
//                       </Link>
//                     </TableCell>
//                     <TableCell>${item.product.price}</TableCell>
//                     <TableCell>{item.quantity}</TableCell>
//                     <TableCell>${item.product.price * item.quantity}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//             <div className="flex justify-between mt-4">
//               <span className="text-lg font-semibold">Total:</span>
//               <span className="text-lg font-semibold">${totalPrice()}</span>
//             </div>
//             <Button className="mt-6 w-full" onClick={handleSubmitOrder}>
//               Place Order
//             </Button>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;
