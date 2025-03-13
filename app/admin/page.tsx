import AdminSidebar from "@/components/adminSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";
import React from "react";
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

function AdminPage() {
  const totalCategories = 15;
  const totalOrders = 120;
  const totalUsers = 55;
  const recentOrders = [
    { id: 1, customer: "John Doe", date: "2023-10-27", total: "$150" },
    { id: 2, customer: "Jane Smith", date: "2023-10-26", total: "$200" },
    { id: 3, customer: "Peter Jones", date: "2023-10-25", total: "$75" },
    { id: 4, customer: "Alice Brown", date: "2023-10-24", total: "$300" },
    { id: 5, customer: "Bob Wilson", date: "2023-10-23", total: "$100" },
  ];

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
              <CardContent className="flex items-center justify-between">
                <span className="text-3xl font-semibold">
                  {totalCategories}
                </span>
                <Link
                  href="/admin/categories"
                  className="text-blue-500 hover:underline"
                >
                  View all
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Total Orders</CardTitle>
                <CardDescription>
                  View and manage all customer orders
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <span className="text-3xl font-semibold">{totalOrders}</span>
                <Link
                  href="/admin/orders"
                  className="text-blue-500 hover:underline"
                >
                  View all
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Total Users</CardTitle>
                <CardDescription>Manage all registered users</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <span className="text-3xl font-semibold">{totalUsers}</span>
                <Link
                  href="/admin/users"
                  className="text-blue-500 hover:underline"
                >
                  View all
                </Link>
              </CardContent>
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
                    <TableHead className="w-[100px]">Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell className="text-right">
                        {order.total}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="p-4">
                <Button variant="link" asChild>
                  <Link href="/admin/orders">View All Orders</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default AdminPage;
