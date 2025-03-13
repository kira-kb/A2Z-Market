"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "sonner";
import AdminSidebar from "@/components/adminSidebar";

type Category = {
  id: number;
  name: string;
  type: string[];
  subCategories?: string[];
};

const initialCategories: Category[] = [
  {
    id: 1,
    name: "Clothes",
    type: ["Men's", "Women's", "Unisex"],
    subCategories: ["Top Wear", "Bottom Wear", "Underwear"],
  },
];

const AdminCategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [newCategory, setNewCategory] = useState("");
  const [newSubCategory, setNewSubCategory] = useState("");
  const [newType, setNewType] = useState("");
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<Category | null>(null);

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      const newCat = {
        id: categories.length + 1,
        name: newCategory,
        type: newType ? newType.split(",").map((type) => type.trim()) : [],
        subCategories: newSubCategory
          ? newSubCategory.split(",").map((sub) => sub.trim())
          : [],
      };
      setCategories([...categories, newCat]);
      setNewCategory("");
      setNewSubCategory("");
      setNewType("");
    }
  };

  const handleDeleteCategory = (id: number) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  const handleEditCategory = (category: Category) => {
    setEditCategory(category);
    setEditDialogOpen(true);
  };

  const handleUpdateCategory = () => {
    if (editCategory) {
      const updatedCategories = categories.map((cat) =>
        cat.id === editCategory.id ? editCategory : cat
      );
      setCategories(updatedCategories);
      setEditDialogOpen(false);
    }
  };

  return (
    <SidebarProvider>
      <Toaster richColors position="top-center" />
      <div className="">
        <AdminSidebar className="z-0 my-16" />
        <SidebarTrigger className="fixed left-0 top-0 mt-16" />
      </div>
      <div className="p-0 flex-1 mx-8 pt-4 text-left">
        {/* <div className="container mx-auto p-4"> */}
        <Card className="mb-4">
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">
              Manage Categories & Sub-Categories
            </h2>

            <div className="flex gap-2 mb-4">
              <Input
                placeholder="New category name"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
              <Input
                placeholder="sub-categories (comma-separated)"
                value={newSubCategory}
                onChange={(e) => setNewSubCategory(e.target.value)}
              />

              <Input
                placeholder="Types (comma-separated)"
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
              />
              <Button onClick={handleAddCategory}>Add Category</Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Sub-Categories</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>{category.id}</TableCell>
                    <TableCell>{category.name}</TableCell>
                    {/* <TableCell>{category.type}</TableCell> */}
                    <TableCell>
                      {category.type?.length ? category.type.join(", ") : "--"}
                    </TableCell>
                    <TableCell>
                      {category.subCategories?.length
                        ? category.subCategories.join(", ")
                        : "--"}
                    </TableCell>
                    <TableCell className="flex gap-2 flex-wrap">
                      <Button
                        variant="secondary"
                        className="mr-2"
                        onClick={() => handleEditCategory(category)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleDeleteCategory(category.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {editCategory && (
          <Dialog open={isEditDialogOpen} onOpenChange={setEditDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Category</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-2">
                <span>Category</span>
                <Input
                  placeholder="Category name"
                  value={editCategory.name}
                  onChange={(e) =>
                    setEditCategory({ ...editCategory, name: e.target.value })
                  }
                />

                <span>Type</span>
                <Input
                  placeholder="Type (comma-separated)"
                  value={editCategory.type?.join(", ")}
                  onChange={(e) =>
                    setEditCategory({
                      ...editCategory,
                      type: e.target.value.split(",").map((sub) => sub.trim()),
                    })
                  }
                />
                <span>Sub-category</span>
                <Input
                  placeholder="Sub-categories (comma-separated)"
                  value={editCategory.subCategories?.join(", ")}
                  onChange={(e) =>
                    setEditCategory({
                      ...editCategory,
                      subCategories: e.target.value
                        .split(",")
                        .map((sub) => sub.trim()),
                    })
                  }
                />
                <Button onClick={handleUpdateCategory}>Update Category</Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </SidebarProvider>
  );
};

export default AdminCategoriesPage;
