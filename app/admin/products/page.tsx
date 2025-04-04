"use client";

import AdminSidebar from "@/components/adminSidebar";
import ProductForm from "./productForm";
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
  // DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { toast, Toaster } from "sonner";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  imageUrls: string[];
  subCategory: string;
  types: string;
  brands: string;
  condition: string;
}

import pic from "@/assets/images/cosmotics.png";
import pic2 from "@/assets/images/robotics.avif";
import Image from "next/image";
import EditProductForm from "./editProductForm";

const initialProducts: Product[] = [
  {
    id: "1",
    name: "Product A",
    category: "Electronics",
    subCategory: "Electronics",
    brands: "Electronics",
    types: "Electronics",
    condition: "Electronics",
    price: 199.99,
    stock: 50,
    description: "This is product A description.",
    imageUrls: [pic.src, pic2.src, pic.src, pic2.src], // Changed to array
  },
  {
    id: "2",
    name: "Product B",
    category: "Clothing",
    subCategory: "Clothing",
    brands: "Clothing",
    types: "Clothing",
    condition: "Clothing",
    price: 49.99,
    stock: 100,
    description: "This is product B description.",
    imageUrls: [pic2.src, pic.src], // Changed to array
  },
  {
    id: "3",
    name: "Product C",
    category: "Home",
    subCategory: "Home",
    brands: "Home",
    types: "Home",
    condition: "Home",
    price: 79.99,
    stock: 25,
    description: "This is product C description.",
    imageUrls: [pic2.src, pic.src], // Changed to array
  },
  {
    id: "4",
    name: "Product D",
    category: "Electronics",
    subCategory: "Electronics",
    brands: "Electronics",
    types: "Electronics",
    condition: "Electronics",
    price: 299.99,
    stock: 30,
    description: "This is product D description.",
    imageUrls: [pic2.src, pic.src], // Changed to array
  },
  {
    id: "5",
    name: "Product E",
    category: "Books",
    subCategory: "Books",
    brands: "Books",
    types: "Books",
    condition: "Books",
    price: 19.99,
    stock: 75,
    description: "This is product E description.",
    imageUrls: [pic.src, pic2.src], // Changed to array
  },
];

function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [open, setOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  const [currentProductId, setCurrentProductId] = useState<string | null>(null);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handleAddProduct = (product: Product) => {
  //   setProducts([...products, { ...product, id: `${products.length + 1}` }]);
  //   toast.success("Product added successfully.");
  // };

  const handleEditProduct = (product: Product) => {
    setEditProduct(product);
    setOpen(true);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter((product) => product.id !== productId));
    toast.success("Product deleted successfully.");
  };

  // const handleUpdateProduct = (updatedProduct: Product) => {
  //   setProducts(
  //     products.map((product) =>
  //       product.id === updatedProduct.id
  //         ? { ...product, ...updatedProduct }
  //         : product
  //     )
  //   );
  //   setOpen(false);
  //   toast.success("Product updated successfully.");
  // };

  // const handleImageClick = (image: string) => {
  //   setCurrentImage(image);
  //   setOpenImageDialog(true);
  // };

  const handleImageClick = (image: string, productId: string) => {
    setCurrentImage(image);
    setCurrentProductId(productId);
    setOpenImageDialog(true);
  };

  return (
    <SidebarProvider>
      <Toaster richColors position="top-center" />
      <div className="">
        <AdminSidebar className="z-0 my-16" />
        <SidebarTrigger className="fixed left-0 top-0 mt-16" />
      </div>
      <div className="p-0 flex-1 mx-8 text-left">
        <div className="flex-1 p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">Manage Products</h1>
            <ProductDialog
              open={open}
              onOpenChange={setOpen}
              product={editProduct}
              setEditProduct={setEditProduct}
              // onAddProduct={handleAddProduct}
              // onUpdateProduct={handleUpdateProduct}
              // handleImageClick={handleImageClick}
              // setOpenImageDialog={setOpenImageDialog}
            />
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
              <CardTitle>Product List</CardTitle>
              <CardDescription>
                A list of all products in the system.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>NO</TableHead>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Sub-Category</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>brand</TableHead>
                    <TableHead>condition</TableHead>
                    <TableHead>price</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">
                        {product.id}
                      </TableCell>
                      <TableCell>
                        {product.imageUrls.length > 0 && (
                          // <Image
                          //   width={100}
                          //   height={100}
                          //   src={product.imageUrls[0]} // Display the first image
                          //   alt={product.name}
                          //   className="w-12 h-12 object-cover rounded-md cursor-pointer"
                          //   onClick={() =>
                          //     handleImageClick(product.imageUrls[0])
                          //   }
                          // />
                          <Image
                            width={100}
                            height={100}
                            src={product.imageUrls[0]} // Display the first image
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded-md cursor-pointer"
                            onClick={() =>
                              handleImageClick(product.imageUrls[0], product.id)
                            }
                          />
                        )}
                      </TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell className="text-green-700 dark:text-green-400 font-bold">
                        ${product.price.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditProduct(product)}
                        >
                          <Pencil className="h-4 w-4 text-orange-600 dark:text-orange-500" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-700 dark:text-red-400" />
                        </Button>
                        {/* <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button> */}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* <ImageDialog
        open={openImageDialog}
        onOpenChange={setOpenImageDialog}
        image={currentImage}
      /> */}
      <ImageDialog
        open={openImageDialog}
        onOpenChange={setOpenImageDialog}
        images={
          filteredProducts.find((p) => p.id === currentProductId)?.imageUrls ||
          null
        }
        currentImage={currentImage}
        setCurrentImage={setCurrentImage}
      />
    </SidebarProvider>
  );
}

// ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
// ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
// ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????

interface ProductDialogProps {
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
  product: Product | null;
  setEditProduct: (product: Product | null) => void;
}

const ProductDialog = ({
  open,
  onOpenChange,
  product,
  setEditProduct,
}: ProductDialogProps) => {
  // console.log("product **  ", product);
  // console.log("open **  ", open);
  // if (!open) product = null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          className="flex items-center"
          onClick={() => setEditProduct(null)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        {product ? (
          <>
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
              <DialogDescription>
                Make changes to your product here.{" "}
              </DialogDescription>
            </DialogHeader>
            <EditProductForm
              product={product}
              onSubmit={(e) => console.log(e)}
            />
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Add Product</DialogTitle>
              <DialogDescription>
                Add a new product to your system.
              </DialogDescription>
            </DialogHeader>
            {/* <ProductForm onSubmit={(e) => console.log(e)} /> */}
            <ProductForm />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

interface ImageDialogProps {
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
  images: string[] | null;
  currentImage: string | null;
  setCurrentImage: (image: string) => void;
}

const ImageDialog = ({
  open,
  onOpenChange,
  images,
  currentImage,
  setCurrentImage,
}: ImageDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTitle className="hidden"></DialogTitle>
      <DialogContent>
        {/* Main Image */}
        {currentImage && (
          <Image
            width={10000}
            height={10000}
            src={currentImage}
            alt="Full Size"
            className="w-full h-auto mb-4"
          />
        )}

        {/* Thumbnails */}
        {images && images.length > 1 && (
          <div className="flex gap-2">
            {images.map((image, index) => (
              <Image
                key={index}
                width={100}
                height={100}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className={`w-16 h-16 object-cover cursor-pointer rounded ${
                  currentImage === image ? "border-2 border-blue-500" : ""
                }`}
                onClick={() => setCurrentImage(image)}
              />
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

// };

export default AdminProductsPage;
