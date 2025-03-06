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
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// Import toast from sonner instead of shadcn/ui
import { toast } from "sonner";
// We also need to add the Toaster component
import { Toaster } from "sonner";

interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "customer";
  createdAt: string;
}

const initialUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "admin",
    createdAt: "2023-01-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "customer",
    createdAt: "2023-03-22",
  },
  {
    id: 3,
    name: "Peter Jones",
    email: "peter.jones@example.com",
    role: "customer",
    createdAt: "2023-05-10",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice.brown@example.com",
    role: "customer",
    createdAt: "2023-07-01",
  },
  {
    id: 5,
    name: "Bob Wilson",
    email: "bob.wilson@example.com",
    role: "customer",
    createdAt: "2023-09-18",
  },
];

function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [open, setOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddUser = (user: User) => {
    setUsers([...users, { ...user, id: users.length + 1 }]);
    // Use sonner's toast
    toast.success("User added successfully.");
  };

  const handleEditUser = (user: User) => {
    setEditUser(user);
    setOpen(true);
  };

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter((user) => user.id !== userId));
    // Use sonner's toast
    toast.success("User deleted successfully.");
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUsers(
      users.map((user) =>
        user.id === updatedUser.id ? { ...user, ...updatedUser } : user
      )
    );
    setOpen(false);
    // Use sonner's toast
    toast.success("User updated successfully.");
  };

  return (
    <SidebarProvider>
      {/* Add the Toaster component here */}
      <Toaster richColors position="top-center" />
      <div className="">
        <AdminSidebar className="z-0 my-16" />
        <SidebarTrigger className="fixed left-0 top-0 mt-16" />
      </div>
      <div className="p-0 flex-1 mx-8 text-left">
        <div className="flex-1 p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">Manage Users</h1>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center">
                  <Plus className="mr-2 h-4 w-4" /> Add User
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>
                    {editUser ? "Edit User" : "Add User"}
                  </DialogTitle>
                  <DialogDescription>
                    {editUser
                      ? "Make changes to your user here."
                      : "Add a new user to your system."}
                  </DialogDescription>
                </DialogHeader>
                <UserForm
                  user={editUser}
                  onAddUser={handleAddUser}
                  onUpdateUser={handleUpdateUser}
                  setOpen={setOpen}
                />
              </DialogContent>
            </Dialog>
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
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{user.createdAt}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditUser(user)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash2 className="h-4 w-4" />
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

interface UserFormProps {
  user: User | null;
  onAddUser: (user: User) => void;
  onUpdateUser: (user: User) => void;
  setOpen: (isOpen: boolean) => void;
}
const UserForm = ({
  user,
  onAddUser,
  onUpdateUser,
  setOpen,
}: UserFormProps) => {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [role, setRole] = useState<"admin" | "customer">(
    user?.role || "customer"
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      id: user?.id || 0,
      name,
      email,
      role,
      createdAt: user?.createdAt || new Date().toISOString().split("T")[0],
    };
    if (user) {
      onUpdateUser(newUser);
    } else {
      onAddUser(newUser);
    }
    setName("");
    setEmail("");
    setRole("customer");
    setOpen(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="role" className="text-right">
            Role
          </Label>
          <Select
            onValueChange={setRole}
            defaultValue={user?.role || "customer"}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="customer">Customer</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">{user ? "Update" : "Add"}</Button>
      </DialogFooter>
    </form>
  );
};

export default AdminUsersPage;

// ?????????????????????????????????????????????????????????

// "use client";

// import AdminSidebar from "@/components/adminSidebar";
// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { Plus, Pencil, Trash2 } from "lucide-react";
// import { useState } from "react";
// import { Input } from "@/components/ui/input";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useToast } from "@/components/ui/use-toast";

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   role: "admin" | "customer";
//   createdAt: string;
// }

// const initialUsers: User[] = [
//   {
//     id: 1,
//     name: "John Doe",
//     email: "john.doe@example.com",
//     role: "admin",
//     createdAt: "2023-01-15",
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     email: "jane.smith@example.com",
//     role: "customer",
//     createdAt: "2023-03-22",
//   },
//   {
//     id: 3,
//     name: "Peter Jones",
//     email: "peter.jones@example.com",
//     role: "customer",
//     createdAt: "2023-05-10",
//   },
//   {
//     id: 4,
//     name: "Alice Brown",
//     email: "alice.brown@example.com",
//     role: "customer",
//     createdAt: "2023-07-01",
//   },
//   {
//     id: 5,
//     name: "Bob Wilson",
//     email: "bob.wilson@example.com",
//     role: "customer",
//     createdAt: "2023-09-18",
//   },
// ];

// function AdminUsersPage() {
//   const [users, setUsers] = useState<User[]>(initialUsers);
//   const [open, setOpen] = useState(false);
//   const [editUser, setEditUser] = useState<User | null>(null);
//   const { toast } = useToast();
//   const [searchQuery, setSearchQuery] = useState("");

//   const filteredUsers = users.filter((user) =>
//     user.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleAddUser = (user: User) => {
//     setUsers([...users, { ...user, id: users.length + 1 }]);
//     toast({
//       title: "Success",
//       description: "User added successfully.",
//     });
//   };

//   const handleEditUser = (user: User) => {
//     setEditUser(user);
//     setOpen(true);
//   };

//   const handleDeleteUser = (userId: number) => {
//     setUsers(users.filter((user) => user.id !== userId));
//     toast({
//       title: "Success",
//       description: "User deleted successfully.",
//     });
//   };

//   const handleUpdateUser = (updatedUser: User) => {
//     setUsers(
//       users.map((user) =>
//         user.id === updatedUser.id ? { ...user, ...updatedUser } : user
//       )
//     );
//     setOpen(false);
//     toast({
//       title: "Success",
//       description: "User updated successfully.",
//     });
//   };

//   return (
//     <SidebarProvider>
//       <div className="">
//         <AdminSidebar className="z-0 my-16" />
//         <SidebarTrigger className="fixed left-0 top-0 mt-16" />
//       </div>
//       <div className="p-0 flex-1 mx-8 text-left">
//         <div className="flex-1 p-4">
//           <div className="flex justify-between items-center mb-4">
//             <h1 className="text-3xl font-bold">Manage Users</h1>
//             <Dialog open={open} onOpenChange={setOpen}>
//               <DialogTrigger asChild>
//                 <Button className="flex items-center">
//                   <Plus className="mr-2 h-4 w-4" /> Add User
//                 </Button>
//               </DialogTrigger>
//               <DialogContent className="sm:max-w-[425px]">
//                 <DialogHeader>
//                   <DialogTitle>
//                     {editUser ? "Edit User" : "Add User"}
//                   </DialogTitle>
//                   <DialogDescription>
//                     {editUser
//                       ? "Make changes to your user here."
//                       : "Add a new user to your system."}
//                   </DialogDescription>
//                 </DialogHeader>
//                 <UserForm
//                   user={editUser}
//                   onAddUser={handleAddUser}
//                   onUpdateUser={handleUpdateUser}
//                   setOpen={setOpen}
//                 />
//               </DialogContent>
//             </Dialog>
//           </div>

//           {/* Search Bar */}
//           <div className="mb-4">
//             <Input
//               type="text"
//               placeholder="Search by name..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="max-w-md"
//             />
//           </div>

//           <Card>
//             <CardHeader>
//               <CardTitle>User List</CardTitle>
//               <CardDescription>
//                 A list of all registered users in the system.
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="p-0">
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead className="w-[100px]">ID</TableHead>
//                     <TableHead>Name</TableHead>
//                     <TableHead>Email</TableHead>
//                     <TableHead>Role</TableHead>
//                     <TableHead>Created At</TableHead>
//                     <TableHead className="text-right">Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {filteredUsers.map((user) => (
//                     <TableRow key={user.id}>
//                       <TableCell className="font-medium">{user.id}</TableCell>
//                       <TableCell>{user.name}</TableCell>
//                       <TableCell>{user.email}</TableCell>
//                       <TableCell>{user.role}</TableCell>
//                       <TableCell>{user.createdAt}</TableCell>
//                       <TableCell className="text-right">
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           onClick={() => handleEditUser(user)}
//                         >
//                           <Pencil className="h-4 w-4" />
//                         </Button>
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           onClick={() => handleDeleteUser(user.id)}
//                         >
//                           <Trash2 className="h-4 w-4" />
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </SidebarProvider>
//   );
// }

// interface UserFormProps {
//   user: User | null;
//   onAddUser: (user: User) => void;
//   onUpdateUser: (user: User) => void;
//   setOpen: (isOpen: boolean) => void;
// }
// const UserForm = ({
//   user,
//   onAddUser,
//   onUpdateUser,
//   setOpen,
// }: UserFormProps) => {
//   const [name, setName] = useState(user?.name || "");
//   const [email, setEmail] = useState(user?.email || "");
//   const [role, setRole] = useState<"admin" | "customer">(
//     user?.role || "customer"
//   );

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const newUser: User = {
//       id: user?.id || 0,
//       name,
//       email,
//       role,
//       createdAt: user?.createdAt || new Date().toISOString().split("T")[0],
//     };
//     if (user) {
//       onUpdateUser(newUser);
//     } else {
//       onAddUser(newUser);
//     }
//     setName("");
//     setEmail("");
//     setRole("customer");
//     setOpen(false);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="grid gap-4 py-4">
//         <div className="grid grid-cols-4 items-center gap-4">
//           <Label htmlFor="name" className="text-right">
//             Name
//           </Label>
//           <Input
//             id="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="col-span-3"
//             required
//           />
//         </div>
//         <div className="grid grid-cols-4 items-center gap-4">
//           <Label htmlFor="email" className="text-right">
//             Email
//           </Label>
//           <Input
//             id="email"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="col-span-3"
//             required
//           />
//         </div>
//         <div className="grid grid-cols-4 items-center gap-4">
//           <Label htmlFor="role" className="text-right">
//             Role
//           </Label>
//           <Select
//             onValueChange={setRole}
//             defaultValue={user?.role || "customer"}
//           >
//             <SelectTrigger className="col-span-3">
//               <SelectValue placeholder="Select a role" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="admin">Admin</SelectItem>
//               <SelectItem value="customer">Customer</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>
//       <DialogFooter>
//         <Button type="submit">{user ? "Update" : "Add"}</Button>
//       </DialogFooter>
//     </form>
//   );
// };

// export default AdminUsersPage;
