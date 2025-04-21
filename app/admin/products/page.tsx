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
import { useEffect, useState } from "react";
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
// import { toast } from "sonner";

interface EditProduct {
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
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string[];
  categories: { name: string }[];
  type: string;
  subCategory: string;
  brands: string;
  conditions: string;
}

// import pic from "@/assets/images/cosmotics.png";
// import pic2 from "@/assets/images/robotics.avif";
import Image from "next/image";
import EditProductForm from "./editProductForm";
import { useDataStore } from "@/store";
import { LoadingButton } from "@/components/loaddingButton";
import ImgLoader from "@/components/imgLoader";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

// const initialProducts: Product[] = [
//   {
//     id: "1",
//     name: "Product A",
//     category: "Electronics",
//     subCategory: "Electronics",
//     brands: "Electronics",
//     types: "Electronics",
//     condition: "Electronics",
//     price: 199.99,
//     stock: 50,
//     description: "This is product A description.",
//     imageUrls: [pic.src, pic2.src, pic.src, pic2.src], // Changed to array
//   },
//   {
//     id: "2",
//     name: "Product B",
//     category: "Clothing",
//     subCategory: "Clothing",
//     brands: "Clothing",
//     types: "Clothing",
//     condition: "Clothing",
//     price: 49.99,
//     stock: 100,
//     description: "This is product B description.",
//     imageUrls: [pic2.src, pic.src], // Changed to array
//   },
//   {
//     id: "3",
//     name: "Product C",
//     category: "Home",
//     subCategory: "Home",
//     brands: "Home",
//     types: "Home",
//     condition: "Home",
//     price: 79.99,
//     stock: 25,
//     description: "This is product C description.",
//     imageUrls: [pic2.src, pic.src], // Changed to array
//   },
//   {
//     id: "4",
//     name: "Product D",
//     category: "Electronics",
//     subCategory: "Electronics",
//     brands: "Electronics",
//     types: "Electronics",
//     condition: "Electronics",
//     price: 299.99,
//     stock: 30,
//     description: "This is product D description.",
//     imageUrls: [pic2.src, pic.src], // Changed to array
//   },
//   {
//     id: "5",
//     name: "Product E",
//     category: "Books",
//     subCategory: "Books",
//     brands: "Books",
//     types: "Books",
//     condition: "Books",
//     price: 19.99,
//     stock: 75,
//     description: "This is product E description.",
//     imageUrls: [pic.src, pic2.src], // Changed to array
//   },
// ];

function AdminProductsPage() {
  const { data, fetchData, isLoadding, deleteProduct, isDeleting } =
    useDataStore();

  // const [products, setProducts] = useState<Product[]>(data);
  const [open, setOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<EditProduct | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  const [deletingId, setDeletingId] = useState<string>("");
  const [deletingPName, setDeletingPName] = useState<string>("");
  const [deletingImg, setDeletingImg] = useState<string>("");
  const [deleteDialog, setDeleteDialog] = useState(false);

  const [currentProductId, setCurrentProductId] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // console.log("data:  ", data);
  // console.log("products:  ", products);

  const filteredProducts = data.filter((product) => {
    const nameMatch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    if (searchQuery) return nameMatch;
    // console.log("product: ", product);
    return product;
  });

  // console.log("filtered products:  ", filteredProducts);

  const handleEditProduct = (product: Product) => {
    const editProduct: EditProduct = {
      ...product,
      category: product.categories[0].name,
      condition: product.conditions,
      types: product.type,
      imageUrls: product.image,
    };
    setEditProduct(editProduct);
    setOpen(true);
  };

  const handleDeleteProduct = (
    productId: string,
    deleteOnTelegram: boolean
  ) => {
    setDeletingId(productId);
    deleteProduct(productId, deleteOnTelegram);
  };

  const handleImageClick = (image: string, productId: string) => {
    setCurrentImage(image);
    setCurrentProductId(productId);
    setOpenImageDialog(true);
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
            <h1 className="text-3xl font-bold">Manage Products</h1>
            <ProductDialog
              open={open}
              onOpenChange={setOpen}
              product={editProduct}
              setEditProduct={setEditProduct}
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
                    <TableHead>Description</TableHead>
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
                  {isLoadding && (
                    <TableRow>
                      <TableCell colSpan={-1}>
                        <ImgLoader />
                      </TableCell>
                    </TableRow>
                  )}
                  {filteredProducts.map((product, i) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">
                        {i + 1}
                        {/* {product.id} */}
                      </TableCell>
                      <TableCell>
                        {product.image.length > 0 && (
                          <Image
                            width={100}
                            height={100}
                            src={`/api/telegram-file?fileId=${product.image[0]}`} // Display the first image
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded-md cursor-pointer"
                            onClick={() =>
                              handleImageClick(product.image[0], product.id)
                            }
                          />
                        )}
                      </TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>
                        {product.description.length > 15
                          ? product.description.slice(0, 15) + "..."
                          : product.description}
                      </TableCell>
                      <TableCell>{product.categories[0].name}</TableCell>
                      <TableCell>{product.subCategory}</TableCell>
                      <TableCell>{product.type}</TableCell>
                      <TableCell>{product.brands}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell className="text-green-700 dark:text-green-400 font-bold">
                        ${product.price.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right flex flex-nowrap">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditProduct(product)}
                        >
                          <Pencil className="h-4 w-4 text-orange-600 dark:text-orange-500" />
                        </Button>
                        <LoadingButton
                          loading={isDeleting && deletingId === product.id}
                          variant="ghost"
                          // size="icon"
                          LoadingText="D..."
                          className="mx-3 p-2 text-red-700 dark:text-red-400"
                          onClick={() => {
                            // handleDeleteProduct(product.id)
                            setDeleteDialog(true);
                            setDeletingId(product.id);
                            setDeletingPName(product.name);
                            setDeletingImg(product.image[0]);
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-red-700 dark:text-red-400" />
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

      <ImageDialog
        open={openImageDialog}
        onOpenChange={setOpenImageDialog}
        images={
          filteredProducts.find((p) => p.id === currentProductId)?.image || null
        }
        currentImage={currentImage}
        setCurrentImage={setCurrentImage}
      />

      {deletingId && (
        <DeleteAlert
          open={deleteDialog}
          onOpenChange={setDeleteDialog}
          productId={deletingId}
          productName={deletingPName}
          img={deletingImg}
          onDelete={handleDeleteProduct}
        />
      )}
    </SidebarProvider>
  );
}

// ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
// ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
// ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????

interface ProductDialogProps {
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
  product: EditProduct | null;
  setEditProduct: (product: EditProduct | null) => void;
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
            <EditProductForm product={product} />
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
            // src={currentImage}
            src={`/api/telegram-file?fileId=${currentImage}`}
            alt="Full Size"
            // className="w-full h-auto mb-4 max-h[300px]"
            className="max-w-[70%] mx-auto h-auto mb-4"
            sizes="contain"
            loading="lazy"
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
                // src={image}
                src={`/api/telegram-file?fileId=${image}`}
                alt={`Thumbnail ${index + 1}`}
                className={`w-16 h-16 object-cover cursor-pointer rounded ${
                  currentImage === image ? "border-4 border-blue-500" : ""
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

// ????????????????????????????????????????????????????????????????

interface IDeleteAlert {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productId: string;
  productName?: string;
  img?: string;
  onDelete: (productId: string, deleteOnTelegram: boolean) => void;
}

const DeleteAlert = ({
  open,
  onOpenChange,
  productId,
  onDelete,
  productName,
  img,
}: IDeleteAlert) => {
  const [deleteOnTelegram, setDeleteOnTelegram] = useState(true);

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete This Product?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently remove this product and its media group.
            <strong className="text-red-600">
              This action cannot be undone.
            </strong>
            <br />
            <br />
            {productName && (
              <strong className="text-red-500 text-2xl">{productName}</strong>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Image Preview */}
        {img && (
          <div className="flex justify-center my-3 max-h-44">
            <Image
              width={400}
              height={400}
              src={`/api/telegram-file?fileId=${img}`}
              alt={productName || "Product Image"}
              className="resize-none object-contain rounded-lg border shadow-md"
            />
          </div>
        )}

        {/* Checkbox */}
        <div className="flex items-center space-x-2 my-4">
          <Checkbox
            id="delete-on-telegram"
            checked={deleteOnTelegram}
            onCheckedChange={(val) => setDeleteOnTelegram(!!val)}
          />
          <Label htmlFor="delete-on-telegram" className="cursor-pointer">
            Also delete on Telegram
          </Label>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => onDelete(productId, deleteOnTelegram)}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

// };

export default AdminProductsPage;
