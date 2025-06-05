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
// import { Button } from "@/components/ui/button";
import { LucideBadgeCheck, UserCog2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
// import { toast } from "sonner";

import { useUserStore } from "@/store";
import ImgLoader from "@/components/imgLoader";
import { format } from "date-fns";
import { LoadingButton } from "@/components/loaddingButton";
import { useUser } from "@clerk/nextjs";

function AdminUsersPage() {
  // const [users, setUsers] = useState<User[]>([]);
  // const [editUser, setEditUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    allUsers: users,
    fetchUsers,
    isLoadding,
    isChangingPrevillage,
    changePervillage,
  } = useUserStore();

  const user = useUser();
  const adminId = user.user?.id;

  useEffect(() => {
    if (!adminId) return;
    fetchUsers();
  }, [fetchUsers, adminId]);

  const [change, setChange] = useState("");

  const handlePrevilegeChange = (
    adminId: string,
    userId: string,
    userEmail: string
  ) => {
    setChange(userId);
    changePervillage(adminId, userId, userEmail);
  };

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                    <TableHead className="w-[100px] text-center">ID</TableHead>
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
                        className={`font-medium flex flex-nowrap text-sm items-center justify-center ${
                          !user.isAdmin ? "ml-6" : ""
                        }`}
                        title={user.id}
                      >
                        {user.isAdmin && (
                          <LucideBadgeCheck
                            xlinkTitle="Admin"
                            className="h-4 w-4 text-green-600 mr-2 rounded"
                          />
                        )}
                        {user.id.slice(0, 12)}...
                      </TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        {format(new Date(user.createdAt), "PPpp")}
                      </TableCell>
                      <TableCell className="text-right">
                        <LoadingButton
                          loading={isChangingPrevillage && change === user.id}
                          onClick={() =>
                            adminId
                              ? handlePrevilegeChange(
                                  adminId,
                                  user.id,
                                  user.email
                                )
                              : alert("something went wrong refresh the page")
                          }
                          LoadingText="👨‍💼..."
                          variant="ghost"
                          size="icon"
                        >
                          <UserCog2 className="h-4 w-4" />
                        </LoadingButton>
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
