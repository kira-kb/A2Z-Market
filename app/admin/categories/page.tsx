"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { useCategoryStore } from "@/store";
import { LoadingButton } from "@/components/loaddingButton";
import { PenTool, Trash2 } from "lucide-react";
import ImgLoader from "@/components/imgLoader";
import Image from "next/image";

type Category = {
  id: string;
  name: string;
  type?: string;
  subCategories?: string;
  brands?: string;
  conditions?: string;
  image?: string;
};

const AdminCategoriesPage = () => {
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [isOnDeleting, setIsOnDeleting] = useState("");
  const [newCategory, setNewCategory] = useState<Category>({
    id: "",
    name: "",
    type: "",
    subCategories: "",
    brands: "",
    conditions: "",
    image: "",
  });

  const {
    categories,
    fetchCategories,
    isLoadding,
    addCategory,
    isAdding,
    updateCategory,
    isUpdating,
    deleteCategory,
    isDeleting,
  } = useCategoryStore();

  // console.log("categories: ", categories);

  useEffect(() => {
    const getData = async () => {
      console.log("fetching categories....");
      await fetchCategories();

      setNewCategory({
        id: "",
        name: "",
        type: "",
        subCategories: "",
        brands: "",
        conditions: "",
        image: "",
      });
    };
    getData();
  }, [fetchCategories]);

  // Add new category
  const handleAddCategory = async () => {
    if (newCategory?.name.trim()) {
      console.log("newCategory: ", newCategory);
      addCategory({
        name: newCategory.name,
        type: newCategory.type || "",
        subCategories: newCategory.subCategories || "",
        brands: newCategory.brands || "",
        conditions: newCategory.conditions || "",
        image: newCategory.image || "",
      });
    }
  };

  // Delete category
  const handleDeleteCategory = async (id: string) => {
    deleteCategory(id);
  };

  // Update category
  const handleUpdateCategory = async () => {
    if (editCategory) {
      updateCategory({
        id: editCategory.id,
        name: editCategory.name,
        type: editCategory.type || "",
        subCategories: editCategory.subCategories || "",
        brands: editCategory.brands || "",
        conditions: editCategory.conditions || "",
        image: editCategory.image || "",
      });
    }
  };

  const handleEditCategory = (category: Category) => {
    setEditCategory(category);
    setEditDialogOpen(true);
  };

  // fetchData();

  return (
    <SidebarProvider>
      <Toaster richColors position="top-center" />
      <div className="flex">
        <AdminSidebar className="z-0 my-16" />
        <SidebarTrigger className="fixed left-0 top-0 mt-16" />
      </div>
      <div className="p-0 flex-1 mx-8 pt-4 text-left">
        <Card className="mb-4">
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">Manage Categories</h2>

            <div className="flex flex-wrap gap-2 mb-4">
              <Input
                placeholder="New category name"
                className="max-w-36"
                value={newCategory?.name}
                onChange={(e) =>
                  setNewCategory((prev) => ({ ...prev, name: e.target.value }))
                }
              />
              <Input
                placeholder="sub-categories (comma-separated)"
                value={newCategory.subCategories}
                className="max-w-48"
                onChange={(e) =>
                  setNewCategory((prev) => ({
                    ...prev,
                    subCategories: e.target.value,
                  }))
                }
              />
              <Input
                placeholder="Types (comma-separated)"
                value={newCategory.type}
                className="max-w-48"
                onChange={(e) =>
                  setNewCategory((prev) => ({ ...prev, type: e.target.value }))
                }
              />
              <Input
                placeholder="Brands (comma-separated)"
                value={newCategory.brands}
                className="max-w-48"
                onChange={(e) =>
                  setNewCategory((prev) => ({
                    ...prev,
                    brands: e.target.value,
                  }))
                }
              />
              <Input
                placeholder="Conditions (comma-separated)"
                value={newCategory.conditions}
                className="max-w-48"
                onChange={(e) =>
                  setNewCategory((prev) => ({
                    ...prev,
                    conditions: e.target.value,
                  }))
                }
              />
              <Input
                placeholder="Image URL"
                value={newCategory.image}
                className="max-w-36"
                onChange={(e) =>
                  setNewCategory((prev) => ({
                    ...prev,
                    image: e.target.value,
                  }))
                }
              />
              <LoadingButton
                onClick={handleAddCategory}
                loading={isAdding}
                LoadingText="Adding..."
                className="p-2 text-nowrap"
              >
                Add Category
              </LoadingButton>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>NO</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Sub-Categories</TableHead>
                  <TableHead>Brands</TableHead>
                  <TableHead>Conditions</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoadding && (
                  <TableRow>
                    <TableCell colSpan={-1}>
                      <ImgLoader />
                    </TableCell>
                  </TableRow>
                )}
                {categories.map((category, i) => (
                  <TableRow key={category.id}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>
                      {(category.type && category.type.join(", ")) || "--"}
                    </TableCell>
                    <TableCell>
                      {(category.subCategories &&
                        category.subCategories.join(", ")) ||
                        "--"}
                    </TableCell>
                    <TableCell>
                      {(category.brands &&
                        category.brands
                          .map((brand) => brand.value)
                          .join(", ")) ||
                        "--"}
                    </TableCell>
                    <TableCell>
                      {(category.conditions &&
                        category.conditions.join(", ")) ||
                        "--"}
                    </TableCell>
                    <TableCell>
                      {(category.image && (
                        <Image
                          src={category.image}
                          alt={category.name}
                          width={100}
                          height={100}
                          className="max-h-[70px] max-w-[100px] rounded-md object-cover"
                        />
                      )) ||
                        "--"}
                    </TableCell>
                    <TableCell className="flex gap-2 flex-wrap">
                      <Button
                        variant="secondary"
                        className="mr-2"
                        onClick={() => {
                          // console.log(category);

                          handleEditCategory({
                            name: category.name,
                            id: category.id,
                            type:
                              (category.type && category.type?.join(", ")) ||
                              "",
                            subCategories:
                              (category.subCategories &&
                                category.subCategories?.join(", ")) ||
                              "",
                            conditions:
                              (category.conditions &&
                                category.conditions.join(", ")) ||
                              "",
                            image: category.image || "",
                            brands:
                              (category.brands &&
                                category.brands
                                  .map((brand) => brand.value)
                                  .join(", ")) ||
                              "",
                          });
                        }}
                      >
                        <PenTool className="-rotate-90" />
                      </Button>
                      <LoadingButton
                        loading={isDeleting && isOnDeleting === category.id}
                        LoadingText="🗑️..."
                        variant="destructive"
                        onClick={() => {
                          setIsOnDeleting(category.id);
                          handleDeleteCategory(category.id);
                        }}
                      >
                        <Trash2 />
                      </LoadingButton>
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
                <DialogDescription></DialogDescription>
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
                  value={editCategory.type}
                  onChange={(e) =>
                    setEditCategory({
                      ...editCategory,
                      type: e.target.value,
                    })
                  }
                />
                <span>Sub-category</span>
                <Input
                  placeholder="Sub-categories (comma-separated)"
                  value={editCategory.subCategories}
                  onChange={(e) =>
                    setEditCategory({
                      ...editCategory,
                      subCategories: e.target.value,
                    })
                  }
                />
                <span>Brands</span>
                <Input
                  placeholder="Brands (comma-separated)"
                  value={editCategory.brands}
                  onChange={(e) =>
                    setEditCategory({
                      ...editCategory,
                      brands: e.target.value,
                    })
                  }
                />
                <span>Conditions</span>
                <Input
                  placeholder="Conditions (comma-separated)"
                  value={editCategory.conditions}
                  onChange={(e) =>
                    setEditCategory({
                      ...editCategory,
                      conditions: e.target.value,
                    })
                  }
                />
                <span>Image</span>
                <Input
                  placeholder="Image URL"
                  value={editCategory.image}
                  onChange={(e) =>
                    setEditCategory({
                      ...editCategory,
                      image: e.target.value,
                    })
                  }
                />
                <LoadingButton
                  LoadingText="Updating..."
                  loading={isUpdating}
                  onClick={handleUpdateCategory}
                >
                  Update Category
                </LoadingButton>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </SidebarProvider>
  );
};

export default AdminCategoriesPage;
