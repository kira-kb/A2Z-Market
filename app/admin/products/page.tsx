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
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
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
import { toast, Toaster } from "sonner";
// import Image from "next/image";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  imageUrls: string[]; // Changed to array of image URLs
}

import pic from "@/assets/images/cool gadgets.avif";
import pic2 from "@/assets/images/robotics.avif";

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Product A",
    category: "Electronics",
    price: 199.99,
    stock: 50,
    description: "This is product A description.",
    imageUrls: [pic.src, pic2.src], // Changed to array
  },
  {
    id: 2,
    name: "Product B",
    category: "Clothing",
    price: 49.99,
    stock: 100,
    description: "This is product B description.",
    imageUrls: [pic2.src, pic.src], // Changed to array
  },
  {
    id: 3,
    name: "Product C",
    category: "Home",
    price: 79.99,
    stock: 25,
    description: "This is product C description.",
    imageUrls: [pic2.src, pic.src], // Changed to array
  },
  {
    id: 4,
    name: "Product D",
    category: "Electronics",
    price: 299.99,
    stock: 30,
    description: "This is product D description.",
    imageUrls: [pic2.src, pic.src], // Changed to array
  },
  {
    id: 5,
    name: "Product E",
    category: "Books",
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

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddProduct = (product: Product) => {
    setProducts([...products, { ...product, id: products.length + 1 }]);
    toast.success("Product added successfully.");
  };

  const handleEditProduct = (product: Product) => {
    setEditProduct(product);
    setOpen(true);
  };

  const handleDeleteProduct = (productId: number) => {
    setProducts(products.filter((product) => product.id !== productId));
    toast.success("Product deleted successfully.");
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(
      products.map((product) =>
        product.id === updatedProduct.id
          ? { ...product, ...updatedProduct }
          : product
      )
    );
    setOpen(false);
    toast.success("Product updated successfully.");
  };

  const handleImageClick = (image: string) => {
    setCurrentImage(image);
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
              onAddProduct={handleAddProduct}
              onUpdateProduct={handleUpdateProduct}
              handleImageClick={handleImageClick}
              setOpenImageDialog={setOpenImageDialog}
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
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
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
                          <img
                            src={product.imageUrls[0]} // Display the first image
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded-md cursor-pointer"
                            onClick={() =>
                              handleImageClick(product.imageUrls[0])
                            }
                          />
                        )}
                      </TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditProduct(product)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
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
      <ImageDialog
        open={openImageDialog}
        onOpenChange={setOpenImageDialog}
        image={currentImage}
      />
    </SidebarProvider>
  );
}

interface ProductDialogProps {
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
  product: Product | null;
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  handleImageClick: (image: string) => void;
  setOpenImageDialog: (isOpen: boolean) => void;
}

const ProductDialog = ({
  open,
  onOpenChange,
  product,
  onAddProduct,
  onUpdateProduct,
  handleImageClick,
  setOpenImageDialog,
}: ProductDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="flex items-center">
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{product ? "Edit Product" : "Add Product"}</DialogTitle>
          <DialogDescription>
            {product
              ? "Make changes to your product here."
              : "Add a new product to your system."}
          </DialogDescription>
        </DialogHeader>
        <ProductForm
          product={product}
          onAddProduct={onAddProduct}
          onUpdateProduct={onUpdateProduct}
          onOpenChange={onOpenChange}
          handleImageClick={handleImageClick}
          setOpenImageDialog={setOpenImageDialog}
        />
      </DialogContent>
    </Dialog>
  );
};

interface ProductFormProps {
  product: Product | null;
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onOpenChange: (isOpen: boolean) => void;
  handleImageClick: (image: string) => void;
  setOpenImageDialog: (isOpen: boolean) => void;
}

const ProductForm = ({
  product,
  onAddProduct,
  onUpdateProduct,
  onOpenChange,
  handleImageClick,
  setOpenImageDialog,
}: ProductFormProps) => {
  const [name, setName] = useState(product?.name || "");
  const [category, setCategory] = useState(product?.category || "Electronics");
  const [price, setPrice] = useState(product?.price || 0);
  const [stock, setStock] = useState(product?.stock || 0);
  const [description, setDescription] = useState(product?.description || "");
  const [imageUrls, setImageUrls] = useState(product?.imageUrls || []);
  const [imagePreviews, setImagePreviews] = useState<string[]>(
    product?.imageUrls || []
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImageUrls = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      const newImagePreviews = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );

      setImageUrls((prev) => [...prev, ...newImageUrls]);
      setImagePreviews((prev) => [...prev, ...newImagePreviews]);
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImageUrls = imageUrls.filter((_, i) => i !== index);
    const updatedImagePreviews = imagePreviews.filter((_, i) => i !== index);

    setImageUrls(updatedImageUrls);
    setImagePreviews(updatedImagePreviews);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newProduct: Product = {
      id: product?.id || 0,
      name,
      category,
      price,
      stock,
      description,
      imageUrls,
    };

    if (product) {
      onUpdateProduct(newProduct);
    } else {
      onAddProduct(newProduct);
    }

    onOpenChange(false);
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
          <Label htmlFor="category" className="text-right">
            Category
          </Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Electronics">Electronics</SelectItem>
              <SelectItem value="Clothing">Clothing</SelectItem>
              <SelectItem value="Home">Home</SelectItem>
              <SelectItem value="Books">Books</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="price" className="text-right">
            Price
          </Label>
          <Input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="col-span-3"
            required
            min={0}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="stock" className="text-right">
            Stock
          </Label>
          <Input
            id="stock"
            type="number"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            className="col-span-3"
            required
            min={0}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description" className="text-right">
            Description
          </Label>
          <Input
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="col-span-3"
          />
        </div>

        {/* Image Previews with Remove Icons */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Images</Label>
          <div className="col-span-3 flex items-center gap-4 flex-wrap">
            {imagePreviews.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`Preview ${index}`}
                  className="w-16 h-16 object-cover rounded-md cursor-pointer"
                  onClick={() => handleImageClick(image)}
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  onClick={() => handleRemoveImage(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
            <Label htmlFor="image-upload" className="cursor-pointer">
              Upload Images
            </Label>
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              multiple
              className="hidden"
            />
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">
          {product ? "Update Product" : "Add Product"}
        </Button>
      </DialogFooter>
    </form>
  );
};

interface ImageDialogProps {
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
  image: string | null;
}

const ImageDialog = ({ open, onOpenChange, image }: ImageDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTitle className="hidden"></DialogTitle>
      <DialogContent>
        {image && <img src={image} alt="Full Size" className="w-full h-auto" />}
      </DialogContent>
    </Dialog>
  );
};

export default AdminProductsPage;

// ?????????????????????????????????????????????????????????????????????????????

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
// import { Plus, Pencil, Trash2, Eye } from "lucide-react";
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
// import { toast, Toaster } from "sonner";
// import Image from "next/image";

// interface Product {
//   id: number;
//   name: string;
//   category: string;
//   price: number;
//   stock: number;
//   description: string;
//   imageUrl: string;
// }

// const initialProducts: Product[] = [
//   {
//     id: 1,
//     name: "Product A",
//     category: "Electronics",
//     price: 199.99,
//     stock: 50,
//     description: "This is product A description.",
//     imageUrl: "/placeholder.png",
//   },
//   {
//     id: 2,
//     name: "Product B",
//     category: "Clothing",
//     price: 49.99,
//     stock: 100,
//     description: "This is product B description.",
//     imageUrl: "/placeholder.png",
//   },
//   {
//     id: 3,
//     name: "Product C",
//     category: "Home",
//     price: 79.99,
//     stock: 25,
//     description: "This is product C description.",
//     imageUrl: "/placeholder.png",
//   },
//   {
//     id: 4,
//     name: "Product D",
//     category: "Electronics",
//     price: 299.99,
//     stock: 30,
//     description: "This is product D description.",
//     imageUrl: "/placeholder.png",
//   },
//   {
//     id: 5,
//     name: "Product E",
//     category: "Books",
//     price: 19.99,
//     stock: 75,
//     description: "This is product E description.",
//     imageUrl: "/placeholder.png",
//   },
// ];

// function AdminProductsPage() {
//   const [products, setProducts] = useState<Product[]>(initialProducts);
//   const [open, setOpen] = useState(false);
//   const [editProduct, setEditProduct] = useState<Product | null>(null);
//   const [searchQuery, setSearchQuery] = useState("");

//   const filteredProducts = products.filter((product) =>
//     product.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleAddProduct = (product: Product) => {
//     setProducts([...products, { ...product, id: products.length + 1 }]);
//     toast.success("Product added successfully.");
//   };

//   const handleEditProduct = (product: Product) => {
//     setEditProduct(product);
//     setOpen(true);
//   };

//   const handleDeleteProduct = (productId: number) => {
//     setProducts(products.filter((product) => product.id !== productId));
//     toast.success("Product deleted successfully.");
//   };

//   const handleUpdateProduct = (updatedProduct: Product) => {
//     setProducts(
//       products.map((product) =>
//         product.id === updatedProduct.id
//           ? { ...product, ...updatedProduct }
//           : product
//       )
//     );
//     setOpen(false);
//     toast.success("Product updated successfully.");
//   };

//   return (
//     <SidebarProvider>
//       <Toaster richColors position="top-center" />
//       <div className="">
//         <AdminSidebar className="z-0 my-16" />
//         <SidebarTrigger className="fixed left-0 top-0 mt-16" />
//       </div>
//       <div className="p-0 flex-1 mx-8 text-left">
//         <div className="flex-1 p-4">
//           <div className="flex justify-between items-center mb-4">
//             <h1 className="text-3xl font-bold">Manage Products</h1>
//             <Dialog open={open} onOpenChange={setOpen}>
//               <DialogTrigger asChild>
//                 <Button className="flex items-center">
//                   <Plus className="mr-2 h-4 w-4" /> Add Product
//                 </Button>
//               </DialogTrigger>
//               <DialogContent className="sm:max-w-[425px]">
//                 <DialogHeader>
//                   <DialogTitle>
//                     {editProduct ? "Edit Product" : "Add Product"}
//                   </DialogTitle>
//                   <DialogDescription>
//                     {editProduct
//                       ? "Make changes to your product here."
//                       : "Add a new product to your system."}
//                   </DialogDescription>
//                 </DialogHeader>
//                 <ProductForm
//                   product={editProduct}
//                   onAddProduct={handleAddProduct}
//                   onUpdateProduct={handleUpdateProduct}
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
//               <CardTitle>Product List</CardTitle>
//               <CardDescription>
//                 A list of all products in the system.
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="p-0">
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead className="w-[100px]">ID</TableHead>
//                     <TableHead>Image</TableHead>
//                     <TableHead>Name</TableHead>
//                     <TableHead>Category</TableHead>
//                     <TableHead>Price</TableHead>
//                     <TableHead>Stock</TableHead>
//                     <TableHead className="text-right">Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {filteredProducts.map((product) => (
//                     <TableRow key={product.id}>
//                       <TableCell className="font-medium">
//                         {product.id}
//                       </TableCell>
//                       <TableCell>
//                         <img
//                           src={product.imageUrl}
//                           style={{ width: "auto", height: "auto" }}
//                           alt={product.name}
//                           className="w-12 h-12 object-cover rounded-md"
//                         />
//                       </TableCell>
//                       <TableCell>{product.name}</TableCell>
//                       <TableCell>{product.category}</TableCell>
//                       <TableCell>${product.price.toFixed(2)}</TableCell>
//                       <TableCell>{product.stock}</TableCell>
//                       <TableCell className="text-right">
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           onClick={() => handleEditProduct(product)}
//                         >
//                           <Pencil className="h-4 w-4" />
//                         </Button>
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           onClick={() => handleDeleteProduct(product.id)}
//                         >
//                           <Trash2 className="h-4 w-4" />
//                         </Button>
//                         <Button variant="ghost" size="icon">
//                           <Eye className="h-4 w-4" />
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

// interface ProductFormProps {
//   product: Product | null;
//   onAddProduct: (product: Product) => void;
//   onUpdateProduct: (product: Product) => void;
//   setOpen: (isOpen: boolean) => void;
// }

// const ProductForm = ({
//   product,
//   onAddProduct,
//   onUpdateProduct,
//   setOpen,
// }: ProductFormProps) => {
//   const [name, setName] = useState(product?.name || "");
//   const [category, setCategory] = useState(product?.category || "Electronics");
//   const [price, setPrice] = useState(product?.price || 0);
//   const [stock, setStock] = useState(product?.stock || 0);
//   const [description, setDescription] = useState(product?.description || "");
//   const [imageUrl, setImageUrl] = useState(product?.imageUrl || "");
//   const [imagePreview, setImagePreview] = useState(product?.imageUrl || "");

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//       // Use the file directly for the product object
//       setImageUrl(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     const newProduct: Product = {
//       id: product?.id || 0,
//       name,
//       category,
//       price,
//       stock,
//       description,
//       imageUrl: imageUrl,
//     };

//     if (product) {
//       onUpdateProduct(newProduct);
//     } else {
//       onAddProduct(newProduct);
//     }

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
//           <Label htmlFor="category" className="text-right">
//             Category
//           </Label>
//           <Select
//             value={category}
//             onValueChange={setCategory}
//             // className="col-span-3"
//           >
//             <SelectTrigger>
//               <SelectValue placeholder="Select a category" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="Electronics">Electronics</SelectItem>
//               <SelectItem value="Clothing">Clothing</SelectItem>
//               <SelectItem value="Home">Home</SelectItem>
//               <SelectItem value="Books">Books</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//         <div className="grid grid-cols-4 items-center gap-4">
//           <Label htmlFor="price" className="text-right">
//             Price
//           </Label>
//           <Input
//             id="price"
//             type="number"
//             value={price}
//             onChange={(e) => setPrice(Number(e.target.value))}
//             className="col-span-3"
//             required
//             min={0}
//           />
//         </div>
//         <div className="grid grid-cols-4 items-center gap-4">
//           <Label htmlFor="stock" className="text-right">
//             Stock
//           </Label>
//           <Input
//             id="stock"
//             type="number"
//             value={stock}
//             onChange={(e) => setStock(Number(e.target.value))}
//             className="col-span-3"
//             required
//             min={0}
//           />
//         </div>
//         <div className="grid grid-cols-4 items-center gap-4">
//           <Label htmlFor="description" className="text-right">
//             Description
//           </Label>
//           <Input
//             id="description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="col-span-3"
//           />
//         </div>
//         <div className="grid grid-cols-4 items-center gap-4">
//           <Label htmlFor="image" className="text-right">
//             Image
//           </Label>
//           <Input
//             id="image"
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//             className="col-span-3"
//           />
//         </div>
//         {imagePreview && (
//           <div className="grid grid-cols-4 items-center gap-4">
//             {/* <Label className="text-right">Preview</Label> */}
//             <img
//               src={imagePreview}
//               style={{ width: "auto", height: "auto" }}
//               alt="Preview"
//               className="col-span-3 object-cover w-16 h-16 rounded"
//               // className="col-span-3 h-32 object-cover rounded-md"
//             />
//           </div>
//         )}
//       </div>
//       <DialogFooter>
//         <Button type="submit">
//           {product ? "Update Product" : "Add Product"}
//         </Button>
//       </DialogFooter>
//     </form>
//   );
// };

// export default AdminProductsPage;

// ???????????????????????????????????????????????????????????
// ???????????????????????????????????????????????????????????

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
// import { Plus, Pencil, Trash2, Eye } from "lucide-react";
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
// import { toast, Toaster } from "sonner";

// interface Product {
//   id: number;
//   name: string;
//   category: string;
//   price: number;
//   stock: number;
//   description: string;
//   imageUrl: string;
// }

// const initialProducts: Product[] = [
//   {
//     id: 1,
//     name: "Product A",
//     category: "Electronics",
//     price: 199.99,
//     stock: 50,
//     description: "This is product A description.",
//     imageUrl: "/placeholder.png",
//   },
//   {
//     id: 2,
//     name: "Product B",
//     category: "Clothing",
//     price: 49.99,
//     stock: 100,
//     description: "This is product B description.",
//     imageUrl: "/placeholder.png",
//   },
//   {
//     id: 3,
//     name: "Product C",
//     category: "Home",
//     price: 79.99,
//     stock: 25,
//     description: "This is product C description.",
//     imageUrl: "/placeholder.png",
//   },
//   {
//     id: 4,
//     name: "Product D",
//     category: "Electronics",
//     price: 299.99,
//     stock: 30,
//     description: "This is product D description.",
//     imageUrl: "/placeholder.png",
//   },
//   {
//     id: 5,
//     name: "Product E",
//     category: "Books",
//     price: 19.99,
//     stock: 75,
//     description: "This is product E description.",
//     imageUrl: "/placeholder.png",
//   },
// ];

// function AdminProductsPage() {
//   const [products, setProducts] = useState<Product[]>(initialProducts);
//   const [open, setOpen] = useState(false);
//   const [editProduct, setEditProduct] = useState<Product | null>(null);
//   const [searchQuery, setSearchQuery] = useState("");

//   const filteredProducts = products.filter((product) =>
//     product.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleAddProduct = (product: Product) => {
//     setProducts([...products, { ...product, id: products.length + 1 }]);
//     toast.success("Product added successfully.");
//   };

//   const handleEditProduct = (product: Product) => {
//     setEditProduct(product);
//     setOpen(true);
//   };

//   const handleDeleteProduct = (productId: number) => {
//     setProducts(products.filter((product) => product.id !== productId));
//     toast.success("Product deleted successfully.");
//   };

//   const handleUpdateProduct = (updatedProduct: Product) => {
//     setProducts(
//       products.map((product) =>
//         product.id === updatedProduct.id
//           ? { ...product, ...updatedProduct }
//           : product
//       )
//     );
//     setOpen(false);
//     toast.success("Product updated successfully.");
//   };

//   return (
//     <SidebarProvider>
//       <Toaster richColors position="top-center" />
//       <div className="">
//         <AdminSidebar className="z-0 my-16" />
//         <SidebarTrigger className="fixed left-0 top-0 mt-16" />
//       </div>
//       <div className="p-0 flex-1 mx-8 text-left">
//         <div className="flex-1 p-4">
//           <div className="flex justify-between items-center mb-4">
//             <h1 className="text-3xl font-bold">Manage Products</h1>
//             <Dialog open={open} onOpenChange={setOpen}>
//               <DialogTrigger asChild>
//                 <Button className="flex items-center">
//                   <Plus className="mr-2 h-4 w-4" /> Add Product
//                 </Button>
//               </DialogTrigger>
//               <DialogContent className="sm:max-w-[425px]">
//                 <DialogHeader>
//                   <DialogTitle>
//                     {editProduct ? "Edit Product" : "Add Product"}
//                   </DialogTitle>
//                   <DialogDescription>
//                     {editProduct
//                       ? "Make changes to your product here."
//                       : "Add a new product to your system."}
//                   </DialogDescription>
//                 </DialogHeader>
//                 <ProductForm
//                   product={editProduct}
//                   onAddProduct={handleAddProduct}
//                   onUpdateProduct={handleUpdateProduct}
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
//               <CardTitle>Product List</CardTitle>
//               <CardDescription>
//                 A list of all products in the system.
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="p-0">
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead className="w-[100px]">ID</TableHead>
//                     <TableHead>Image</TableHead>
//                     <TableHead>Name</TableHead>
//                     <TableHead>Category</TableHead>
//                     <TableHead>Price</TableHead>
//                     <TableHead>Stock</TableHead>
//                     <TableHead className="text-right">Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {filteredProducts.map((product) => (
//                     <TableRow key={product.id}>
//                       <TableCell className="font-medium">
//                         {product.id}
//                       </TableCell>
//                       <TableCell>
//                         <img
//                           src={product.imageUrl}
//                           alt={product.name}
//                           className="w-12 h-12 object-cover rounded-md"
//                         />
//                       </TableCell>
//                       <TableCell>{product.name}</TableCell>
//                       <TableCell>{product.category}</TableCell>
//                       <TableCell>${product.price.toFixed(2)}</TableCell>
//                       <TableCell>{product.stock}</TableCell>
//                       <TableCell className="text-right">
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           onClick={() => handleEditProduct(product)}
//                         >
//                           <Pencil className="h-4 w-4" />
//                         </Button>
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           onClick={() => handleDeleteProduct(product.id)}
//                         >
//                           <Trash2 className="h-4 w-4" />
//                         </Button>
//                         <Button variant="ghost" size="icon">
//                           <Eye className="h-4 w-4" />
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

// interface ProductFormProps {
//   product: Product | null;
//   onAddProduct: (product: Product) => void;
//   onUpdateProduct: (product: Product) => void;
//   setOpen: (isOpen: boolean) => void;
// }

// const ProductForm = ({
//   product,
//   onAddProduct,
//   onUpdateProduct,
//   setOpen,
// }: ProductFormProps) => {
//   const [name, setName] = useState(product?.name || "");
//   const [category, setCategory] = useState(product?.category || "Electronics");
//   const [price, setPrice] = useState(product?.price || 0);
//   const [stock, setStock] = useState(product?.stock || 0);
//   const [description, setDescription] = useState(product?.description || "");
//   const [imageUrl, setImageUrl] = useState(product?.imageUrl || "");
//   const [imagePreview, setImagePreview] = useState(product?.imageUrl || "");

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//       setImageUrl(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     const newProduct: Product = {
//       id: product?.id || 0,
//       name,
//       category,
//       price,
//       stock,
//       description,
//       imageUrl,
//     };

//     if (product) {
//       onUpdateProduct(newProduct);
//     } else {
//       onAddProduct(newProduct);
//     }

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
//           />
//         </div>
//         <div className="grid grid-cols-4 items-center gap-4">
//           <Label htmlFor="category" className="text-right">
//             Category
//           </Label>
//           <Select
//             value={category}
//             onValueChange={setCategory}
//             className="col-span-3"
//           >
//             <SelectTrigger>
//               <SelectValue placeholder="Select a category" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="Electronics">Electronics</SelectItem>
//               <SelectItem value="Clothing">Clothing</SelectItem>
//               <SelectItem value="Home">Home</SelectItem>
//               <SelectItem value="Books">Books</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//         <div className="grid grid-cols-4 items-center gap-4">
//           <Label htmlFor="price" className="text-right">
//             Price
//           </Label>
//           <Input
//             id="price"
//             type="number"
//             value={price}
//             onChange={(e) => setPrice(Number(e.target.value))}
//             className="col-span-3"
//           />
//         </div>
//         <div className="grid grid-cols-4 items-center gap-4">
//           <Label htmlFor="stock" className="text-right">
//             Stock
//           </Label>
//           <Input
//             id="stock"
//             type="number"
//             value={stock}
//             onChange={(e) => setStock(Number(e.target.value))}
//             className="col-span-3"
//           />
//         </div>
//         <div className="grid grid-cols-4 items-center gap-4">
//           <Label htmlFor="description" className="text-right">
//             Description
//           </Label>
//           <Input
//             id="description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="col-span-3"
//           />
//         </div>
//         <div className="grid grid-cols-4 items-center gap-4">
//           <Label htmlFor="image" className="text-right">
//             Image
//           </Label>
//           <Input
//             id="image"
//             type="file"
//             accept="image/*"
//             multiple
//             onChange={handleImageChange}
//             className="col-span-3"
//           />
//         </div>
//         {imagePreview && (
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label className="text-right">Preview</Label>
//             <img
//               src={imagePreview}
//               alt="Preview"
//               className="col-span-3 h-32 object-cover rounded-md"
//             />
//           </div>
//         )}
//       </div>
//       <DialogFooter>
//         <Button type="submit">
//           {product ? "Update Product" : "Add Product"}
//         </Button>
//       </DialogFooter>
//     </form>
//   );
// };

// export default AdminProductsPage;

// ???????????????????????????????????????????????????????????

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
// import { Plus, Pencil, Trash2, Eye } from "lucide-react";
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
// import { toast, Toaster } from "sonner";

// interface Product {
//   id: number;
//   name: string;
//   category: string;
//   price: number;
//   stock: number;
//   description: string;
//   imageUrl: string;
// }

// const initialProducts: Product[] = [
//   {
//     id: 1,
//     name: "Product A",
//     category: "Electronics",
//     price: 199.99,
//     stock: 50,
//     description: "This is product A description.",
//     imageUrl: "/placeholder.png",
//   },
//   {
//     id: 2,
//     name: "Product B",
//     category: "Clothing",
//     price: 49.99,
//     stock: 100,
//     description: "This is product B description.",
//     imageUrl: "/placeholder.png",
//   },
//   {
//     id: 3,
//     name: "Product C",
//     category: "Home",
//     price: 79.99,
//     stock: 25,
//     description: "This is product C description.",
//     imageUrl: "/placeholder.png",
//   },
//   {
//     id: 4,
//     name: "Product D",
//     category: "Electronics",
//     price: 299.99,
//     stock: 30,
//     description: "This is product D description.",
//     imageUrl: "/placeholder.png",
//   },
//   {
//     id: 5,
//     name: "Product E",
//     category: "Books",
//     price: 19.99,
//     stock: 75,
//     description: "This is product E description.",
//     imageUrl: "/placeholder.png",
//   },
// ];

// function AdminProductsPage() {
//   const [products, setProducts] = useState<Product[]>(initialProducts);
//   const [open, setOpen] = useState(false);
//   const [editProduct, setEditProduct] = useState<Product | null>(null);
//   const [searchQuery, setSearchQuery] = useState("");

//   const filteredProducts = products.filter((product) =>
//     product.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleAddProduct = (product: Product) => {
//     setProducts([...products, { ...product, id: products.length + 1 }]);
//     toast.success("Product added successfully.");
//   };

//   const handleEditProduct = (product: Product) => {
//     setEditProduct(product);
//     setOpen(true);
//   };

//   const handleDeleteProduct = (productId: number) => {
//     setProducts(products.filter((product) => product.id !== productId));
//     toast.success("Product deleted successfully.");
//   };

//   const handleUpdateProduct = (updatedProduct: Product) => {
//     setProducts(
//       products.map((product) =>
//         product.id === updatedProduct.id
//           ? { ...product, ...updatedProduct }
//           : product
//       )
//     );
//     setOpen(false);
//     toast.success("Product updated successfully.");
//   };

//   return (
//     <SidebarProvider>
//       <Toaster richColors position="top-center" />
//       <div className="">
//         <AdminSidebar className="z-0 my-16" />
//         <SidebarTrigger className="fixed left-0 top-0 mt-16" />
//       </div>
//       <div className="p-0 flex-1 mx-8 text-left">
//         <div className="flex-1 p-4">
//           <div className="flex justify-between items-center mb-4">
//             <h1 className="text-3xl font-bold">Manage Products</h1>
//             <Dialog open={open} onOpenChange={setOpen}>
//               <DialogTrigger asChild>
//                 <Button className="flex items-center">
//                   <Plus className="mr-2 h-4 w-4" /> Add Product
//                 </Button>
//               </DialogTrigger>
//               <DialogContent className="sm:max-w-[425px]">
//                 <DialogHeader>
//                   <DialogTitle>
//                     {editProduct ? "Edit Product" : "Add Product"}
//                   </DialogTitle>
//                   <DialogDescription>
//                     {editProduct
//                       ? "Make changes to your product here."
//                       : "Add a new product to your system."}
//                   </DialogDescription>
//                 </DialogHeader>
//                 <ProductForm
//                   product={editProduct}
//                   onAddProduct={handleAddProduct}
//                   onUpdateProduct={handleUpdateProduct}
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
//               <CardTitle>Product List</CardTitle>
//               <CardDescription>
//                 A list of all products in the system.
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="p-0">
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead className="w-[100px]">ID</TableHead>
//                     <TableHead>Name</TableHead>
//                     <TableHead>Category</TableHead>
//                     <TableHead>Price</TableHead>
//                     <TableHead>Stock</TableHead>
//                     <TableHead className="text-right">Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {filteredProducts.map((product) => (
//                     <TableRow key={product.id}>
//                       <TableCell className="font-medium">
//                         {product.id}
//                       </TableCell>
//                       <TableCell>{product.name}</TableCell>
//                       <TableCell>{product.category}</TableCell>
//                       <TableCell>${product.price.toFixed(2)}</TableCell>
//                       <TableCell>{product.stock}</TableCell>
//                       <TableCell className="text-right">
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           onClick={() => handleEditProduct(product)}
//                         >
//                           <Pencil className="h-4 w-4" />
//                         </Button>
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           onClick={() => handleDeleteProduct(product.id)}
//                         >
//                           <Trash2 className="h-4 w-4" />
//                         </Button>
//                         <Button variant="ghost" size="icon">
//                           <Eye className="h-4 w-4" />
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

// interface ProductFormProps {
//   product: Product | null;
//   onAddProduct: (product: Product) => void;
//   onUpdateProduct: (product: Product) => void;
//   setOpen: (isOpen: boolean) => void;
// }

// const ProductForm = ({
//   product,
//   onAddProduct,
//   onUpdateProduct,
//   setOpen,
// }: ProductFormProps) => {
//   const [name, setName] = useState(product?.name || "");
//   const [category, setCategory] = useState(product?.category || "Electronics");
//   const [price, setPrice] = useState(product?.price || 0);
//   const [stock, setStock] = useState(product?.stock || 0);
//   const [description, setDescription] = useState(product?.description || "");
//   const [imageUrl, setImageUrl] = useState(product?.imageUrl || "");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const newProduct: Product = {
//       id: product?.id || 0,
//       name,
//       category,
//       price,
//       stock,
//       description,
//       imageUrl,
//     };
//     if (product) {
//       onUpdateProduct(newProduct);
//     } else {
//       onAddProduct(newProduct);
//     }
//     setName("");
//     setCategory("Electronics");
//     setPrice(0);
//     setStock(0);
//     setDescription("");
//     setImageUrl("");
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
//           <Label htmlFor="category" className="text-right">
//             Category
//           </Label>
//           <Select
//             onValueChange={setCategory}
//             defaultValue={product?.category || "Electronics"}
//           >
//             <SelectTrigger className="col-span-3">
//               <SelectValue placeholder="Select a category" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="Electronics">Electronics</SelectItem>
//               <SelectItem value="Clothing">Clothing</SelectItem>
//               <SelectItem value="Home">Home</SelectItem>
//               <SelectItem value="Books">Books</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//         <div className="grid grid-cols-4 items-center gap-4">
//           <Label htmlFor="price" className="text-right">
//             Price
//           </Label>
//           <Input
//             id="price"
//             type="number"
//             value={price}
//             onChange={(e) => setPrice(Number(e.target.value))}
//             className="col-span-3"
//             required
//             min="0"
//           />
//         </div>
//         <div className="grid grid-cols-4 items-center gap-4">
//           <Label htmlFor="stock" className="text-right">
//             Stock
//           </Label>
//           <Input
//             id="stock"
//             type="number"
//             value={stock}
//             onChange={(e) => setStock(Number(e.target.value))}
//             className="col-span-3"
//             required
//             min="0"
//           />
//         </div>
//         <div className="grid grid-cols-4 items-center gap-4">
//           <Label htmlFor="description" className="text-right">
//             Description
//           </Label>
//           <Input
//             id="description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="col-span-3"
//           />
//         </div>
//         <div className="grid grid-cols-4 items-center gap-4">
//           <Label htmlFor="imageUrl" className="text-right">
//             Image URL
//           </Label>
//           <Input
//             id="imageUrl"
//             value={imageUrl}
//             onChange={(e) => setImageUrl(e.target.value)}
//             className="col-span-3"
//           />
//         </div>
//       </div>
//       <DialogFooter>
//         <Button type="submit">{product ? "Update" : "Add"}</Button>
//       </DialogFooter>
//     </form>
//   );
// };

// export default AdminProductsPage;
