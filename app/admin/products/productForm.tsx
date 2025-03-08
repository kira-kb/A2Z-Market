import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";

interface ProductDialogProps {
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (data: ProductFormData) => void;
  product?: ProductFormData | null;
}

interface ProductFormData {
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
}

const ProductDialog = ({
  open,
  onOpenChange,
  onSubmit,
  product = null,
}: ProductDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    defaultValues: product || {
      name: "",
      category: "",
      price: 0,
      stock: 0,
      description: "",
    },
  });

  const handleFormSubmit = (data: ProductFormData) => {
    onSubmit(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {product ? "Update Product" : "Add Product"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Product Name
            </label>
            <Input
              id="name"
              type="text"
              {...register("name", { required: "Product name is required" })}
              className="mt-1"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium">
              Category
            </label>
            <Input
              id="category"
              type="text"
              {...register("category", { required: "Category is required" })}
              className="mt-1"
            />
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium">
              Price
            </label>
            <Input
              id="price"
              type="number"
              {...register("price", {
                required: "Price is required",
                min: { value: 0, message: "Price must be at least 0" },
              })}
              className="mt-1"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="stock" className="block text-sm font-medium">
              Stock
            </label>
            <Input
              id="stock"
              type="number"
              {...register("stock", {
                required: "Stock is required",
                min: { value: 0, message: "Stock must be at least 0" },
              })}
              className="mt-1"
            />
            {errors.stock && (
              <p className="text-red-500 text-sm">{errors.stock.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              {...register("description", {
                required: "Description is required",
              })}
              className="mt-1"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button type="submit">
              {product ? "Update Product" : "Add Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;
