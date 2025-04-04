import { FC, useState } from "react";
import CategoryFilter from "./categoryFilter";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
// import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

interface IProduct {
  name: string;
  price: number;
  description: string;
}

interface ICategory {
  category: string;
  subCategory: string;
  types: string;
  brands: string;
  condition: string;
}

// interface IProductForm {
//   onSubmit: (product: IProduct) => void;
// }

// const ProductForm: FC<IProductForm> = () => {
const ProductForm: FC = () => {
  // const { toast } = useToast();
  // toast
  const [product, setProduct] = useState<IProduct>({
    name: "",
    price: 0,
    description: "",
  });
  const [category, setCategory] = useState<ICategory>({
    category: "",
    subCategory: "",
    types: "",
    brands: "",
    condition: "",
  });
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(e.target.files);
      const newPreviews = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreviews(newPreviews);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    if (selectedFiles) {
      const newFiles = Array.from(selectedFiles).filter((_, i) => i !== index);
      setSelectedFiles(
        newFiles.length > 0 ? (newFiles as unknown as FileList) : null
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedFiles || selectedFiles.length === 0) {
      toast.error("Please select at least one image.");
      // toast({ title: "Error", description: "Please select at least one image.", variant: "destructive" });
      return;
    }

    const formData = new FormData();
    Array.from(selectedFiles).forEach((file) => formData.append("file", file));

    formData.append("name", product.name);
    formData.append("price", product.price.toString());
    formData.append("description", product.description);
    formData.append("category", category.category);
    formData.append("subCategory", category.subCategory);
    formData.append("brand", category.brands);
    formData.append("condition", category.condition);
    formData.append("type", category.types);

    // name, price, description, category, subCategory, brand, condition, type

    // console.log(
    //   formData.entries().forEach((data) => console.log(data.keys, data.values))
    // );
    // return;

    try {
      const res = await fetch("/api/product", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const errt = await res.text();
        console.log(errt);
        throw new Error("Failed to submit product");
      }

      // toast({ title: "Success", description: "Product submitted successfully!" });
      toast.success("Product submitted successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to upload files.");
      // toast({ title: "Error", description: "Failed to upload files.", variant: "destructive" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-row flex-wrap justify-between gap-4">
        <div className="w-[45%]">
          <Label>Product Name</Label>
          <Input
            type="text"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            required
          />
          <Label>Price</Label>
          <Input
            type="number"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            required
          />
          <Label>Description</Label>
          <Textarea
            name="description"
            value={product.description}
            onChange={handleInputChange}
            required
          />
          <Label>Images</Label>
          <div className="grid grid-cols-4 gap-4">
            {imagePreviews.map((image, index) => (
              <div key={index} className="relative">
                <Image
                  width={100}
                  height={100}
                  src={image}
                  alt={`Preview ${index}`}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                  onClick={() => handleRemoveImage(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          <Label htmlFor="image-upload">Upload Images</Label>
          <Input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            multiple
            className="hidden"
          />
        </div>
        <div className="w-[45%]">
          <Label>Category</Label>
          <CategoryFilter category={category} setCategories={setCategory} />
        </div>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-md w-full"
      >
        Add Product
      </button>
    </form>
  );
};

export default ProductForm;

// TODO ????????????????????????????????????????????????????
// TODO ????????????????????????????????????????????????????

// import { useState } from "react";

// export default function ImageUploadForm() {
//   const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
//   const [message, setMessage] = useState("");

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setSelectedFiles(e.target.files);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!selectedFiles || selectedFiles.length === 0) {
//       setMessage("Please select at least one Image.");
//       return;
//     }

//     const formData = new FormData();
//     Array.from(selectedFiles).forEach((file) => formData.append("file", file));

//     try {
//       const response = await fetch("/api/product", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setMessage("Files uploaded successfully!");
//       } else {
//         setMessage(`Error: ${data.msg}`);
//       }
//     } catch (error) {
//       console.log(error);
//       setMessage("Failed to upload files.");
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="file"
//           onChange={handleFileChange}
//           multiple
//           accept="image/*"
//         />
//         <button type="submit">Upload Images</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// }

// ????????????????????????????????????????????????????

// components/ImageUploadForm.tsx
// import { useState } from "react";

// export default function ImageUploadForm() {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [message, setMessage] = useState("");

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setSelectedFile(e.target.files[0]);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!selectedFile) {
//       setMessage("Please select a file.");
//       return;
//     }

//     const formData = new FormData();
//     formData.set("file", selectedFile);

//     try {
//       const response = await fetch("/api/product", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setMessage("File uploaded successfully!");
//       } else {
//         setMessage(`Error: ${data.message}`);
//       }
//     } catch (error) {
//       console.log(error);
//       setMessage("Failed to upload file.");
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="file"
//           onChange={handleFileChange}
//           multiple
//           accept="image/*"
//         />
//         <button type="submit">Upload Image</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// }

// ??????????????????????????????????????????????

// import { FC, useState } from "react";
// import CategoryFilter from "./categoryFilter";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import Image from "next/image";
// import { Trash2 } from "lucide-react";

// interface IProduct {
//   name: string;
//   price: number;
//   description: string;
//   category: string;
//   subCategory: string;
//   types: string;
//   brands: string;
//   condition: string;
//   imageUrls: string[];
// }

// interface ICategory {
//   category: string;
//   subCategory: string;
//   types: string;
//   brands: string;
//   condition: string;
// }

// interface IProductForm {
//   onSubmit: (product: IProduct) => void;
// }

// const ProductForm: FC<IProductForm> = ({ onSubmit }) => {
//   const [product, setProduct] = useState<IProduct>({
//     name: "",
//     price: 0,
//     description: "",
//     category: "",
//     subCategory: "",
//     types: "",
//     brands: "",
//     condition: "",
//     imageUrls: [],
//   });
//   const [category, setCategory] = useState<ICategory>({
//     category: "",
//     subCategory: "",
//     types: "",
//     brands: "",
//     condition: "",
//   });

//   const [imageUrls, setImageUrls] = useState(product?.imageUrls || []);
//   const [imagePreviews, setImagePreviews] = useState<string[]>(
//     product?.imageUrls || []
//   );

//   // Handle text input changes
//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setProduct((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle image upload and preview
//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (files) {
//       const newImageUrls = Array.from(files).map((file) =>
//         URL.createObjectURL(file)
//       );
//       setImageUrls((prev) => [...prev, ...newImageUrls]);
//       setImagePreviews((prev) => [...prev, ...newImageUrls]);
//     }
//   };

//   // Handle image removal
//   const handleRemoveImage = (index: number) => {
//     setImageUrls((prev) => prev.filter((_, i) => i !== index));
//     setImagePreviews((prev) => prev.filter((_, i) => i !== index));
//   };

//   // Handle form submission
//   // const handleSubmit = async (e: React.FormEvent) => {
//   //   e.preventDefault();
//   //   onSubmit({ ...product, imageUrls });
//   // };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const formData = new FormData(e.currentTarget);

//     // Append images
//     imageUrls.forEach((url, index) => {
//       const file = e.currentTarget["image-upload"].files[index];
//       if (file) {
//         formData.append("images", file);
//       }
//     });

//     try {
//       const res = await fetch("/api/product", {
//         method: "POST",
//         body: formData,
//       });

//       if (!res.ok) throw new Error("Failed to submit product");

//       const data = await res.json();
//       console.log("Product submitted successfully:", data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     // <form onSubmit={handleSubmit} className="space-y-6">
//     <form
//       action="/api/product"
//       method="POST"
//       encType="multipart/form-data"
//       className="space-y-6"
//     >
//       <div className="flex flex-row flex-wrap justify-between gap-4">
//         <div className="w-[45%]">
//           {/* Product Name */}
//           <div>
//             <label className="block mb-2 text-sm font-medium">
//               Product Name
//             </label>
//             <Input
//               type="text"
//               name="name"
//               value={product.name}
//               onChange={handleInputChange}
//               required
//             />
//           </div>

//           {/* Product Price */}
//           <div>
//             <label className="block mb-2 text-sm font-medium">Price</label>
//             <Input
//               type="number"
//               name="price"
//               value={product.price}
//               onChange={handleInputChange}
//               required
//             />
//           </div>

//           {/* Product Description */}
//           <div>
//             <label className="block mb-2 text-sm font-medium">
//               Description
//             </label>
//             <Textarea
//               placeholder="Product Description"
//               name="description"
//               value={product.description}
//               onChange={handleInputChange}
//               required
//             />
//           </div>

//           {/* Image Previews with Remove Icons */}
//           <div className="grid grid-cols-4 items-center gap-4 mt-2">
//             <Label className="text-right">Images</Label>
//             <div className="col-span-3 flex items-center gap-4 flex-wrap">
//               {imagePreviews.map((image, index) => (
//                 <div key={index} className="relative">
//                   <Image
//                     width={100}
//                     height={100}
//                     src={image}
//                     alt={`Preview ${index}`}
//                     className="w-16 h-16 object-cover rounded-md cursor-pointer"
//                   />
//                   <button
//                     type="button"
//                     className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
//                     onClick={() => handleRemoveImage(index)}
//                   >
//                     <Trash2 className="h-4 w-4" />
//                   </button>
//                 </div>
//               ))}
//               <Label htmlFor="image-upload" className="cursor-pointer">
//                 Upload Images
//               </Label>
//               <Input
//                 id="image-upload"
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 multiple
//                 className="hidden"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Category Filter */}
//         <div className="w-[45%]">
//           <label className="block mb-2 text-sm font-medium">Category</label>
//           <CategoryFilter category={category} setCategories={setCategory} />
//         </div>
//       </div>

//       {/* Submit Button */}
//       <button
//         type="submit"
//         className="bg-blue-500 text-white p-2 rounded-md w-full"
//       >
//         Add Product
//       </button>
//     </form>
//   );
// };

// export default ProductForm;

// // ???????????????????????????????????????????????????
// // ???????????????????????????????????????????????????
// // ???????????????????????????????????????????????????

// // import { FC, useState } from "react";
// // import CategoryFilter from "./categoryFilter";
// // import { Input } from "@/components/ui/input";
// // import { Textarea } from "@/components/ui/textarea";
// // import { Label } from "@/components/ui/label";
// // import Image from "next/image";
// // import { Trash2 } from "lucide-react";
// // // import CategoryFilter from "./CategoryFilter"; // Assuming CategoryFilter is in the same folder or update the path accordingly.

// // // interface ICategories {
// // //   name: string;
// // //   type?: string;
// // //   subCategories?: string;
// // //   brands?: string;
// // //   condition?: string;
// // // }

// // interface IProduct {
// //   name: string;
// //   price: number;
// //   description: string;
// //   category: string;
// //   subCategory: string;
// //   types: string;
// //   brands: string;
// //   condition: string;
// //   imageUrls: string[];
// // }

// // interface ICategory {
// //   category: string;
// //   subCategory: string;
// //   types: string;
// //   brands: string;
// //   condition: string;
// // }

// // interface IProductForm {
// //   //   categories: ICategories[];
// //   onSubmit: (product: IProduct) => void;
// // }

// // const ProductForm: FC<IProductForm> = ({ onSubmit }) => {
// //   const [product, setProduct] = useState<IProduct>({
// //     name: "",
// //     price: 0,
// //     description: "",
// //     category: "",
// //     subCategory: "",
// //     types: "",
// //     brands: "",
// //     condition: "",
// //     imageUrls: [],
// //   });
// //   const [category, setCategory] = useState<ICategory>({
// //     category: "",
// //     subCategory: "",
// //     types: "",
// //     brands: "",
// //     condition: "",
// //   });

// //   const [imageUrls, setImageUrls] = useState(product?.imageUrls || []);
// //   const [imagePreviews, setImagePreviews] = useState<string[]>(
// //     product?.imageUrls || []
// //   );

// //   const handleInputChange = (
// //     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
// //   ) => {
// //     const { name, value } = e.target;
// //     setProduct((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const files = e.target.files;
// //     if (files) {
// //       const newImageUrls = Array.from(files).map((file) =>
// //         URL.createObjectURL(file)
// //       );
// //       const newImagePreviews = Array.from(files).map((file) =>
// //         URL.createObjectURL(file)
// //       );

// //       setImageUrls((prev) => [...prev, ...newImageUrls]);
// //       setImagePreviews((prev) => [...prev, ...newImagePreviews]);
// //     }
// //   };

// //   const handleSubmit = (e: React.FormEvent) => {
// //     e.preventDefault();
// //     onSubmit(product);
// //   };

// //   return (
// //     <form onSubmit={handleSubmit} className="space-y-6">
// //       <div className="flex flex-row flex-wrap justify-between gap-4">
// //         <div className="w-[45%]">
// //           {/* Product Name */}
// //           <div>
// //             <label className="block mb-2 text-sm font-medium">
// //               Product Name
// //             </label>
// //             <Input
// //               type="text"
// //               name="name"
// //               value={product.name}
// //               onChange={handleInputChange}
// //               // className="w-full p-2 border rounded"
// //               required
// //             />
// //           </div>

// //           {/* Product Price */}
// //           <div>
// //             <label className="block mb-2 text-sm font-medium">Price</label>
// //             <Input
// //               type="number"
// //               name="price"
// //               value={product.price}
// //               onChange={handleInputChange}
// //               // className="w-full p-2 border rounded"
// //               required
// //             />
// //           </div>

// //           {/* Product Description */}
// //           <div>
// //             <label className="block mb-2 text-sm font-medium">
// //               Description
// //             </label>
// //             <Textarea
// //               placeholder="Product Description"
// //               name="description"
// //               value={product.description}
// //               onChange={handleInputChange}
// //               // className="w-full p-2 border rounded"
// //               required
// //             />
// //           </div>

// //           {/* Product image */}
// //           {/* <div>
// //           <Label htmlFor="image-upload" className="cursor-pointer">
// //                Upload Images
// //              </Label>
// //              <Input
// //               id="image-upload"
// //               type="file"
// //               accept="image/*"
// //               onChange={handleImageChange}
// //               multiple
// //               className="hidden"
// //             />
// //             {/* <label className="block mb-2 text-sm font-medium">Image</label>
// //             <Input type="file" placeholder="Upload Image" required multiple /> */}
// //           {/* </div>  */}
// //           {/* Image Previews with Remove Icons */}
// //           <div className="grid grid-cols-4 items-center gap-4">
// //             <Label className="text-right">Images</Label>
// //             <div className="col-span-3 flex items-center gap-4 flex-wrap">
// //               {imagePreviews.map((image, index) => (
// //                 <div key={index} className="relative">
// //                   <Image
// //                     width={100}
// //                     height={100}
// //                     src={image}
// //                     alt={`Preview ${index}`}
// //                     className="w-16 h-16 object-cover rounded-md cursor-pointer"
// //                     //  onClick={() => handleImageClick(image)}
// //                   />
// //                   <button
// //                     type="button"
// //                     className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
// //                     //  onClick={() => handleRemoveImage(index)}
// //                   >
// //                     <Trash2 className="h-4 w-4" />
// //                   </button>
// //                 </div>
// //               ))}
// //               <Label htmlFor="image-upload" className="cursor-pointer">
// //                 Upload Images
// //               </Label>
// //               <Input
// //                 id="image-upload"
// //                 type="file"
// //                 accept="image/*"
// //                 onChange={handleImageChange}
// //                 multiple
// //                 className="hidden"
// //               />
// //             </div>
// //           </div>
// //         </div>

// //         {/* Category Filter */}
// //         <div className="w-[45%]">
// //           <label className="block mb-2 text-sm font-medium">Category</label>
// //           <CategoryFilter category={category} setCategories={setCategory} />
// //         </div>
// //       </div>

// //       {/* Submit Button */}
// //       <button
// //         type="submit"
// //         className="bg-blue-500 text-white p-2 rounded-md w-full"
// //       >
// //         Submit Product
// //       </button>
// //     </form>
// //   );
// // };

// // export default ProductForm;

// // ???????????????????????????????????????????????
// // ???????????????????????????????????????????????
// // ???????????????????????????????????????????????

// // import { useState } from "react";
// // import { Input } from "@/components/ui/input";
// // import { DialogFooter } from "@/components/ui/dialog";
// // import { Label } from "@/components/ui/label";
// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from "@/components/ui/select";
// // import Image from "next/image";
// // import { Trash2 } from "lucide-react";
// // import { Button } from "@/components/ui/button";

// // interface Product {
// //   id: number;
// //   name: string;
// //   category: string;
// //   "sub-category"?: string;
// //   brand?: string;
// //   condition?: string;
// //   price: number;
// //   stock: number;
// //   description: string;
// //   imageUrls: string[]; // Changed to array of image URLs
// // }

// // interface ProductFormProps {
// //   product: Product | null;
// //   onAddProduct: (product: Product) => void;
// //   onUpdateProduct: (product: Product) => void;
// //   onOpenChange: (isOpen: boolean) => void;
// //   handleImageClick: (image: string) => void;
// //   setOpenImageDialog: (isOpen: boolean) => void;
// // }

// // const ProductForm = ({
// //   product,
// //   onAddProduct,
// //   onUpdateProduct,
// //   onOpenChange,
// //   handleImageClick,
// // }: ProductFormProps) => {
// //   const [name, setName] = useState(product?.name || "");
// //   const [category, setCategory] = useState(product?.category || "Electronics");
// //   const [price, setPrice] = useState(product?.price || 0);
// //   const [stock, setStock] = useState(product?.stock || 0);
// //   const [description, setDescription] = useState(product?.description || "");
// //   const [imageUrls, setImageUrls] = useState(product?.imageUrls || []);
// //   const [imagePreviews, setImagePreviews] = useState<string[]>(
// //     product?.imageUrls || []
// //   );

// //   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const files = e.target.files;
// //     if (files) {
// //       const newImageUrls = Array.from(files).map((file) =>
// //         URL.createObjectURL(file)
// //       );
// //       const newImagePreviews = Array.from(files).map((file) =>
// //         URL.createObjectURL(file)
// //       );

// //       setImageUrls((prev) => [...prev, ...newImageUrls]);
// //       setImagePreviews((prev) => [...prev, ...newImagePreviews]);
// //     }
// //   };

// //   const handleRemoveImage = (index: number) => {
// //     const updatedImageUrls = imageUrls.filter((_, i) => i !== index);
// //     const updatedImagePreviews = imagePreviews.filter((_, i) => i !== index);

// //     setImageUrls(updatedImageUrls);
// //     setImagePreviews(updatedImagePreviews);
// //   };

// //   const handleSubmit = (e: React.FormEvent) => {
// //     e.preventDefault();

// //     const newProduct: Product = {
// //       id: product?.id || 0,
// //       name,
// //       category,
// //       price,
// //       stock,
// //       description,
// //       imageUrls,
// //     };

// //     if (product) {
// //       onUpdateProduct(newProduct);
// //     } else {
// //       onAddProduct(newProduct);
// //     }

// //     onOpenChange(false);
// //   };

// //   return (
// //     <form onSubmit={handleSubmit}>
// //       <div className="grid gap-4 py-4">
// //         <div className="grid grid-cols-4 items-center gap-4">
// //           <Label htmlFor="name" className="text-right">
// //             Name
// //           </Label>
// //           <Input
// //             id="name"
// //             value={name}
// //             onChange={(e) => setName(e.target.value)}
// //             className="col-span-3"
// //             required
// //           />
// //         </div>
// //         <div className="grid grid-cols-4 items-center gap-4">
// //           <Label htmlFor="category" className="text-right">
// //             Category
// //           </Label>

// //         </div>
// //         <div className="grid grid-cols-4 items-center gap-4">
// //           <Label htmlFor="price" className="text-right">
// //             Price
// //           </Label>
// //           <Input
// //             id="price"
// //             type="number"
// //             value={price}
// //             onChange={(e) => setPrice(Number(e.target.value))}
// //             className="col-span-3"
// //             required
// //             min={0}
// //           />
// //         </div>
// //         <div className="grid grid-cols-4 items-center gap-4">
// //           <Label htmlFor="stock" className="text-right">
// //             Stock
// //           </Label>
// //           <Input
// //             id="stock"
// //             type="number"
// //             value={stock}
// //             onChange={(e) => setStock(Number(e.target.value))}
// //             className="col-span-3"
// //             required
// //             min={0}
// //           />
// //         </div>
// //         <div className="grid grid-cols-4 items-center gap-4">
// //           <Label htmlFor="description" className="text-right">
// //             Description
// //           </Label>
// //           <Input
// //             id="description"
// //             value={description}
// //             onChange={(e) => setDescription(e.target.value)}
// //             className="col-span-3"
// //           />
// //         </div>

// //         {/* Image Previews with Remove Icons */}
// //         <div className="grid grid-cols-4 items-center gap-4">
// //           <Label className="text-right">Images</Label>
// //           <div className="col-span-3 flex items-center gap-4 flex-wrap">
// //             {imagePreviews.map((image, index) => (
// //               <div key={index} className="relative">
// //                 <Image
// //                   width={100}
// //                   height={100}
// //                   src={image}
// //                   alt={`Preview ${index}`}
// //                   className="w-16 h-16 object-cover rounded-md cursor-pointer"
// //                   onClick={() => handleImageClick(image)}
// //                 />
// //                 <button
// //                   type="button"
// //                   className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
// //                   onClick={() => handleRemoveImage(index)}
// //                 >
// //                   <Trash2 className="h-4 w-4" />
// //                 </button>
// //               </div>
// //             ))}
// //             <Label htmlFor="image-upload" className="cursor-pointer">
// //               Upload Images
// //             </Label>
// //             <Input
// //               id="image-upload"
// //               type="file"
// //               accept="image/*"
// //               onChange={handleImageChange}
// //               multiple
// //               className="hidden"
// //             />
// //           </div>
// //         </div>
// //       </div>
// //       <DialogFooter>
// //         <Button type="submit">
// //           {product ? "Update Product" : "Add Product"}
// //         </Button>
// //       </DialogFooter>
// //     </form>
// //   );
// // };

// // export default ProductForm;

// // ?????????????????????????????????????????????????????????????????
// // ?????????????????????????????????????????????????????????????????
// // ?????????????????????????????????????????????????????????????????

// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogHeader,
// //   DialogTitle,
// //   DialogFooter,
// // } from "@/components/ui/dialog";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // // import { Textarea } from "@/components/ui/textarea";
// // import { useForm } from "react-hook-form";
// // import { useCategoryStore } from "@/store";
// // import { useEffect } from "react";

// // interface ProductDialogProps {
// //   open: boolean;
// //   onOpenChange: (isOpen: boolean) => void;
// //   onSubmit: (data: ProductFormData) => void;
// //   product?: ProductFormData | null;
// // }

// // interface ProductFormData {
// //   name: string;
// //   category: string;
// //   price: number;
// //   stock: number;
// //   description: string;
// // }

// // const ProductDialog = ({
// //   open,
// //   onOpenChange,
// //   onSubmit,
// //   product = null,
// // }: ProductDialogProps) => {
// //   const {
// //     register,
// //     handleSubmit,
// //     formState: { errors },
// //   } = useForm<ProductFormData>({
// //     defaultValues: product || {
// //       name: "",
// //       category: "",
// //       price: 0,
// //       stock: 0,
// //       description: "",
// //     },
// //   });

// //   const handleFormSubmit = (data: ProductFormData) => {
// //     onSubmit(data);
// //     onOpenChange(false);
// //   };

// //   const { fetchCategories } = useCategoryStore();

// //   useEffect(() => {
// //     fetchCategories();
// //   }, [fetchCategories]);

// //   return (
// //     <Dialog open={open} onOpenChange={onOpenChange}>
// //       <DialogContent className="sm:max-w-[600px]">
// //         <DialogHeader>
// //           <DialogTitle>
// //             {product ? "Update Product" : "Add Product"}
// //           </DialogTitle>
// //         </DialogHeader>

// //         <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
// //           <div>
// //             <label htmlFor="name" className="block text-sm font-medium">
// //               Product Name
// //             </label>
// //             <Input
// //               id="name"
// //               type="text"
// //               {...register("name", { required: "Product name is required" })}
// //               className="mt-1"
// //             />
// //             {errors.name && (
// //               <p className="text-red-500 text-sm">{errors.name.message}</p>
// //             )}
// //           </div>

// //           <div>
// //             <label htmlFor="category" className="block text-sm font-medium">
// //               Category
// //             </label>
// //             <Input
// //               id="category"
// //               type="text"
// //               {...register("category", { required: "Category is required" })}
// //               className="mt-1"
// //             />
// //             {errors.category && (
// //               <p className="text-red-500 text-sm">{errors.category.message}</p>
// //             )}
// //           </div>

// //           <div>
// //             <label htmlFor="price" className="block text-sm font-medium">
// //               Price
// //             </label>
// //             <Input
// //               id="price"
// //               type="number"
// //               {...register("price", {
// //                 required: "Price is required",
// //                 min: { value: 0, message: "Price must be at least 0" },
// //               })}
// //               className="mt-1"
// //             />
// //             {errors.price && (
// //               <p className="text-red-500 text-sm">{errors.price.message}</p>
// //             )}
// //           </div>

// //           <div>
// //             <label htmlFor="stock" className="block text-sm font-medium">
// //               Stock
// //             </label>
// //             <Input
// //               id="stock"
// //               type="number"
// //               {...register("stock", {
// //                 required: "Stock is required",
// //                 min: { value: 0, message: "Stock must be at least 0" },
// //               })}
// //               className="mt-1"
// //             />
// //             {errors.stock && (
// //               <p className="text-red-500 text-sm">{errors.stock.message}</p>
// //             )}
// //           </div>

// //           <div>
// //             <label htmlFor="description" className="block text-sm font-medium">
// //               Description
// //             </label>
// //             <textarea
// //               id="description"
// //               {...register("description", {
// //                 required: "Description is required",
// //               })}
// //               className="mt-1"
// //             />
// //             {errors.description && (
// //               <p className="text-red-500 text-sm">
// //                 {errors.description.message}
// //               </p>
// //             )}
// //           </div>

// //           <DialogFooter>
// //             <Button type="submit">
// //               {product ? "Update Product" : "Add Product"}
// //             </Button>
// //           </DialogFooter>
// //         </form>
// //       </DialogContent>
// //     </Dialog>
// //   );
// // };

// // export default ProductDialog;
