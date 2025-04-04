import { FC, useState } from "react";
import CategoryFilter from "./categoryFilter";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Trash2 } from "lucide-react";

interface IProduct {
  name: string;
  price: number;
  description: string;
  category: string;
  subCategory: string;
  types: string;
  brands: string;
  condition: string;
  imageUrls: string[];
}

interface ICategory {
  category: string;
  subCategory: string;
  types: string;
  brands: string;
  condition: string;
}

interface IProductForm {
  product: IProduct;
  onSubmit: (product: IProduct) => void;
}

const EditProductForm: FC<IProductForm> = ({ product, onSubmit }) => {
  const [initialProduct, setProduct] = useState<IProduct>(product);
  const [category, setCategory] = useState<ICategory>({
    category: product.category,
    subCategory: product.subCategory,
    types: product.types,
    brands: product.brands,
    condition: product.condition,
  });

  const [imageUrls, setImageUrls] = useState(initialProduct?.imageUrls || []);
  const [imagePreviews, setImagePreviews] = useState<string[]>(
    initialProduct?.imageUrls || []
  );

  // Handle text input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload and preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImageUrls = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImageUrls((prev) => [...prev, ...newImageUrls]);
      setImagePreviews((prev) => [...prev, ...newImageUrls]);
    }
  };

  // Handle image removal
  const handleRemoveImage = (index: number) => {
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...initialProduct, imageUrls });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-row flex-wrap justify-between gap-4">
        <div className="w-[45%]">
          {/* Product Name */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Product Name
            </label>
            <Input
              type="text"
              name="name"
              value={initialProduct.name}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Product Price */}
          <div>
            <label className="block mb-2 text-sm font-medium">Price</label>
            <Input
              type="number"
              name="price"
              value={initialProduct.price}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Product Description */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Description
            </label>
            <Textarea
              placeholder="Product Description"
              name="description"
              value={initialProduct.description}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Image Previews with Remove Icons */}
          <div className="grid grid-cols-4 items-center gap-4 mt-2">
            <Label className="text-right">Images</Label>
            <div className="col-span-3 flex items-center gap-4 flex-wrap">
              {imagePreviews.map((image, index) => (
                <div key={index} className="relative">
                  <Image
                    width={100}
                    height={100}
                    src={image}
                    alt={`Preview ${index}`}
                    className="w-16 h-16 object-cover rounded-md cursor-pointer"
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

        {/* Category Filter */}
        <div className="w-[45%]">
          <label className="block mb-2 text-sm font-medium">Category</label>
          <CategoryFilter category={category} setCategories={setCategory} />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-md w-full"
      >
        Update Product
      </button>
    </form>
  );
};

export default EditProductForm;
