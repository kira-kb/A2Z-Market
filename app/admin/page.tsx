"use client";

import AdminSidebar from "@/components/adminSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";
import React, { useEffect } from "react";
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
import { useCategoryStore, useOrderStore, useUserStore } from "@/store";
import { useUser } from "@clerk/nextjs";
import ImgLoader from "@/components/imgLoader";
import { format } from "date-fns";

function AdminPage() {
  // const totalCategories = 15;
  // const totalOrders = 120;
  // const totalUsers = 55;
  // const recentOrders = [
  //   { id: 1, customer: "John Doe", date: "2023-10-27", total: "$150" },
  //   { id: 2, customer: "Jane Smith", date: "2023-10-26", total: "$200" },
  //   { id: 3, customer: "Peter Jones", date: "2023-10-25", total: "$75" },
  //   { id: 4, customer: "Alice Brown", date: "2023-10-24", total: "$300" },
  //   { id: 5, customer: "Bob Wilson", date: "2023-10-23", total: "$100" },
  // ];

  const user = useUser();
  const userId = user.user?.id;

  const { allUsers, fetchUsers, isLoadding: isLoaddingUsers } = useUserStore();
  const { orders, fetchOrders, loading: isLoaddingOrders } = useOrderStore();
  const {
    categories,
    fetchCategories,
    isLoadding: isLoaddingCategories,
  } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    if (!userId) return;
    fetchOrders(userId, true);
  }, [fetchOrders, userId]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <SidebarProvider>
      <div className="">
        <AdminSidebar className="z-0 my-16" />

        <SidebarTrigger className="fixed left-0 top-0 mt-16" />
      </div>
      <div className="p-0 flex-1 mx-8 text-left">
        {/* Main Content */}
        <div className="flex-1 p-4">
          <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Total Categories</CardTitle>
                <CardDescription>Manage all product categories</CardDescription>
              </CardHeader>
              {isLoaddingCategories ? (
                <ImgLoader />
              ) : (
                <CardContent className="flex items-center justify-between">
                  <span className="text-3xl font-semibold">
                    {categories.length}
                  </span>
                  <Link
                    href="/admin/categories"
                    className="text-blue-500 hover:underline"
                  >
                    View all
                  </Link>
                </CardContent>
              )}
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Total Orders</CardTitle>
                <CardDescription>
                  View and manage all customer orders
                </CardDescription>
              </CardHeader>
              {isLoaddingOrders ? (
                <ImgLoader />
              ) : (
                <CardContent className="flex items-center justify-between">
                  <span className="text-3xl font-semibold">
                    {orders.length}
                  </span>
                  <Link
                    href="/admin/orders"
                    className="text-blue-500 hover:underline"
                  >
                    View all
                  </Link>
                </CardContent>
              )}
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Total Users</CardTitle>
                <CardDescription>Manage all registered users</CardDescription>
              </CardHeader>
              {isLoaddingUsers ? (
                <ImgLoader />
              ) : (
                <CardContent className="flex items-center justify-between">
                  <span className="text-3xl font-semibold">
                    {allUsers.length}
                  </span>
                  <Link
                    href="/admin/users"
                    className="text-blue-500 hover:underline"
                  >
                    View all
                  </Link>
                </CardContent>
              )}
            </Card>
          </div>

          {/* Recent Orders Table */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>
                A list of the most recent customer orders.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="">Order ID</TableHead>
                    <TableHead>email</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoaddingOrders && (
                    <TableRow>
                      <TableCell>
                        <ImgLoader />
                      </TableCell>
                    </TableRow>
                  )}
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.user.email}</TableCell>
                      <TableCell>
                        {format(new Date(order.createdAt), "PPpp")}
                      </TableCell>
                      <TableCell className="text-right">
                        $ {order.totalAmount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {!isLoaddingOrders && (
                <div className="p-4">
                  <Button variant="link" asChild>
                    <Link href="/admin/orders">View All Orders</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default AdminPage;
