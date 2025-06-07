import { FC } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface ICategories {
  name: string;
  type?: string[];
  subCategories?: string[];
}

interface ICategory {
  category: string;
  subCategory: string;
  types: string[];
}

interface ICategoryFilter {
  categories: ICategories[];
  category: ICategory;
  setCategories: React.Dispatch<React.SetStateAction<ICategory>>;
}

const CategoryFilter: FC<ICategoryFilter> = ({
  categories,
  category,
  setCategories,
}) => {
  const handleTypeChange = (type: string) => {
    setCategories((prev) => ({
      ...prev,
      types: prev.types.includes(type)
        ? prev.types.filter((t) => t !== type)
        : [...prev.types, type],
    }));
  };

  const selectedCategoryData = categories.find(
    (cat) => cat.name === category.category
  );

  return (
    <div className="space-y-4 border-gray-600 border-[1px] rounded-sm p-2">
      {/* Category Dropdown */}
      <div>
        <label className="block mb-2 text-sm font-medium">Category</label>
        <Select
          onValueChange={(value) =>
            setCategories({ subCategory: "", types: [], category: value })
          }
        >
          <SelectTrigger className="w-full">
            <span>{category.category || "Select Category"}</span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="no value">---</SelectItem>
            <SelectItem value="Multiple">Select Multiple Category</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.name} value={category.name}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Subcategory Dropdown (if available) */}
      {selectedCategoryData?.subCategories &&
        selectedCategoryData?.subCategories.length > 0 &&
        selectedCategoryData?.subCategories && (
          <div>
            <label className="block mb-2 text-sm font-medium">
              Subcategory
            </label>
            <Select
              onValueChange={(value) =>
                setCategories((prev) => ({ ...prev, subCategory: value }))
              }
            >
              <SelectTrigger className="w-full">
                <span>{category.subCategory || "Select Subcategory"}</span>
              </SelectTrigger>
              <SelectContent>
                {selectedCategoryData.subCategories.map((subCat) => (
                  <SelectItem key={subCat} value={subCat}>
                    {subCat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

      {/* Types Filter (if available) */}
      {selectedCategoryData?.type &&
        selectedCategoryData?.type.length > 0 &&
        selectedCategoryData?.type[0].length > 0 &&
        selectedCategoryData?.type && (
          <div>
            <label className="block mb-2 text-sm font-medium flex-1 w-full mx-auto">
              Types
            </label>
            <div className="flex flex-row flex-wrap justify-between gap-2">
              {selectedCategoryData.type.map((type) => (
                <div
                  key={type}
                  className="flex items-center border-b-[1px] border-gray-600 cursor-pointer"
                >
                  <Checkbox
                    id={type}
                    checked={category.types.includes(type)}
                    onCheckedChange={() => handleTypeChange(type)}
                  />
                  <label htmlFor={type} className="ml-2 text-sm cursor-pointer">
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
    </div>
  );
};

export default CategoryFilter;
