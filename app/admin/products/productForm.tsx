import { FC, useState } from "react";
import CategoryFilter from "./categoryFilter";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
// import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { PlusCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useDataStore } from "@/store";
import { LoadingButton } from "@/components/loaddingButton";

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

const ProductForm: FC = () => {
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

  const { addProduct, isAdding } = useDataStore();

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

    addProduct({
      name: product.name,
      price: product.price,
      description: product.description,
      categories: category.category,
      subCategory: category.subCategory,
      brands: category.brands,
      conditions: category.condition,
      type: category.types,
      image: selectedFiles,
    });

    // const formData = new FormData();
    // Array.from(selectedFiles).forEach((file) => formData.append("file", file));

    // formData.append("name", product.name);
    // formData.append("price", product.price.toString());
    // formData.append("description", product.description);
    // formData.append("category", category.category);
    // formData.append("subCategory", category.subCategory);
    // formData.append("brand", category.brands);
    // formData.append("condition", category.condition);
    // formData.append("type", category.types);

    // // name, price, description, category, subCategory, brand, condition, type

    // // console.log(
    // //   formData.entries().forEach((data) => console.log(data.keys, data.values))
    // // );
    // // return;

    // try {
    //   const res = await fetch("http://localhost:3000/api/product", {
    //     method: "POST",
    //     body: formData,
    //   });
    //   if (!res.ok) {
    //     const errt = await res.text();
    //     console.log(errt);
    //     throw new Error("Failed to submit product");
    //   }

    //   // toast({ title: "Success", description: "Product submitted successfully!" });
    //   toast.success("Product submitted successfully!");
    // } catch (error) {
    //   console.log(error);
    //   toast.error("Failed to upload files.");
    //   // toast({ title: "Error", description: "Failed to upload files.", variant: "destructive" });
    // }
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
          <Label
            htmlFor="image-upload"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-secondary text-secondary-foreground shadow hover:bg-secondary/90 h-9 px-4 py-2 cursor-pointer mt-2"
          >
            <PlusCircle className="h-4 w-4 text-red-500" /> Add Image
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
        <div className="w-[45%]">
          <Label>Category</Label>
          <CategoryFilter category={category} setCategories={setCategory} />
        </div>
      </div>
      {/* <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-md w-full"
      >
        Add Product
      </button> */}
      <LoadingButton
        type="submit"
        loading={isAdding}
        LoadingText="Adding Product..."
        title="Add Product"
        className="w-full"
        variant="secondary"
      >
        <PlusCircle className="h-4 w-4 text-green-500 mr-2" /> Add Product
      </LoadingButton>
    </form>
  );
};

export default ProductForm;
