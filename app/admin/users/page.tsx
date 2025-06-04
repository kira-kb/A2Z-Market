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
import { LucideBadgeCheck, UserCog2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
// import { toast } from "sonner";

import { useUserStore } from "@/store";
import ImgLoader from "@/components/imgLoader";
import { format } from "date-fns";

// interface User {
//   id: number;
//   phone: string;
//   email: string;
//   isAdmin: boolean;
//   createdAt: string;
// }

// const initialUsers: User[] = [
//   {
//     id: 1,
//     phone: "John Doe",
//     email: "john.doe@example.com",
//     role: "admin",
//     createdAt: "2023-01-15",
//   },
//   {
//     id: 2,
//     phone: "Jane Smith",
//     email: "jane.smith@example.com",
//     role: "customer",
//     createdAt: "2023-03-22",
//   },
//   {
//     id: 3,
//     phone: "Peter Jones",
//     email: "peter.jones@example.com",
//     role: "customer",
//     createdAt: "2023-05-10",
//   },
//   {
//     id: 4,
//     phone: "Alice Brown",
//     email: "alice.brown@example.com",
//     role: "customer",
//     createdAt: "2023-07-01",
//   },
//   {
//     id: 5,
//     phone: "Bob Wilson",
//     email: "bob.wilson@example.com",
//     role: "customer",
//     createdAt: "2023-09-18",
//   },
// ];

function AdminUsersPage() {
  // const [users, setUsers] = useState<User[]>([]);
  // const [editUser, setEditUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { allUsers: users, fetchUsers, isLoadding } = useUserStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  console.log("users from users: ", users);

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handleEditUser = (user: User) => {
  //   setEditUser(user);
  //   // setOpen(true);
  // };

  // const handleDeleteUser = (userId: number) => {
  //   setUsers(users.filter((user) => user.id !== userId));
  //   // Use sonner's toast
  //   toast.success("User deleted successfully.");
  // };

  return (
    <SidebarProvider>
      {/* Add the Toaster component here */}
      <div className="">
        <AdminSidebar className="z-0 my-16" />
        <SidebarTrigger className="fixed left-0 top-0 mt-16" />
      </div>
      <div className="p-0 flex-1 mx-8 text-left">
        <div className="flex-1 p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">Manage Users</h1>
          </div>

          {/* Search Bar */}
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md"
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>User List</CardTitle>
              <CardDescription>
                A list of all registered users in the system.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>phone</TableHead>
                    <TableHead>Email</TableHead>
                    {/* <TableHead>Role</TableHead> */}
                    <TableHead>Created At</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoadding && (
                    <TableRow>
                      <TableCell>
                        <ImgLoader />
                      </TableCell>
                    </TableRow>
                  )}
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell
                        className="font-medium flex flex-nowrap items-center justify-center"
                        title={user.id}
                      >
                        {user.id.slice(0, 12)}...
                        {user.isAdmin && (
                          <LucideBadgeCheck
                            xlinkTitle="Admin"
                            className="h-4 w-4 text-green-600 ml-2 rounded"
                          />
                        )}
                      </TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        {format(new Date(user.createdAt), "PPpp")}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          // onClick={() => handleDeleteUser(user.id)}
                        >
                          <UserCog2 className="h-4 w-4" />
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
    </SidebarProvider>
  );
}

export default AdminUsersPage;
