"use client";

import { FC, useEffect } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useCategoryStore } from "@/store";

interface ICategory {
  category: string;
  subCategory: string;
  types: string;
  brands: string;
  condition: string;
}

interface ICategoryFilter {
  category: ICategory;
  setCategories: React.Dispatch<React.SetStateAction<ICategory>>;
}

// const categories = [
//   {
//     id: "1",
//     name: "clothing",
//     type: ["mens", "womens", "unisex"],
//     subCategories: [
//       "top wears",
//       "bottom wears",
//       "underwears",
//       "dress",
//       "skirt",
//     ],
//     brands: [
//       { label: "Nike", value: "Nike" },
//       { label: "Adidas", value: "Adidas" },
//       { label: "Crux", value: "Crux" },
//     ],
//   },
//   {
//     id: "2",
//     name: "mobiles",
//     type: ["button", "smart"],
//     brands: [
//       { label: "Apple", value: "Apple" },
//       { label: "Samsung", value: "Samsung" },
//       { label: "Techno", value: "Techno" },
//       { label: "Motorolla", value: "Motorolla" },
//       { label: "Blu", value: "Blu" },
//     ],
//     condition: ["new", "refurbished", "used"],
//   },
//   {
//     id: "3",
//     name: "laptop",
//     type: ["gaming", "office", "budget"],
//     brands: [
//       { label: "Hp", value: "Hp" },
//       { label: "Toshiba", value: "Toshiba" },
//       { label: "Dell", value: "Dell" },
//       { label: "Vivo", value: "Vivo" },
//       { label: "Microsoft", value: "Microsoft" },
//       { label: "Acer", value: "Acer" },
//     ],
//     condition: ["new", "refurbished", "used"],
//   },
//   {
//     id: "4",
//     name: "books",
//   },
// ];

const CategoryFilter: FC<ICategoryFilter> = ({ category, setCategories }) => {
  const handleTypeChange = (type: string) => {
    setCategories((prev) => ({
      ...prev,
      types: type,
    }));
  };

  const { categories, fetchCategories } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const selectedCategoryData = categories.find(
    (cat) => cat.name === category.category
  );

  return (
    <div className="space-y-4 border-gray-600 border-[1px] rounded-sm p-4">
      {/* Category Dropdown */}
      <div>
        <label className="block mb-2 text-sm font-medium text-red-600">
          *Category (required)
        </label>
        <Select
          required
          value={category.category}
          onValueChange={(value) =>
            setCategories({
              subCategory: "",
              types: "",
              brands: "",
              condition: "",
              category: value,
            })
          }
        >
          <SelectTrigger className="w-full border-[1px] border-gray-300 p-2">
            <span>{category.category || "Select Category"}</span>
          </SelectTrigger>
          <SelectContent defaultValue={category.category}>
            {categories.map((category) => (
              <SelectItem
                key={category.id}
                defaultValue={category.name}
                value={category.name}
              >
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Subcategory Dropdown (if available) */}
      {selectedCategoryData?.subCategories &&
        selectedCategoryData?.subCategories.length > 0 && (
          <div>
            <label className="block mb-2 text-sm font-medium text-red-600">
              *Subcategory (required)
            </label>
            <Select
              required
              value={category.subCategory}
              onValueChange={(value) =>
                setCategories((prev) => ({ ...prev, subCategory: value }))
              }
            >
              <SelectTrigger className="w-full border-[1px] border-gray-300 p-2">
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
        selectedCategoryData?.type[0].length > 0 && (
          <div>
            <label className="block mb-2 text-sm font-medium text-red-600">
              *Types (required)
            </label>
            <RadioGroup
              onValueChange={handleTypeChange}
              required
              className="flex flex-wrap flex-row gap-2 justify-between"
            >
              {selectedCategoryData.type.map((radioType) => (
                <div
                  className="flex items-center space-x-2 cursor-pointer"
                  key={radioType}
                >
                  <RadioGroupItem
                    value={radioType}
                    checked={radioType === category.types}
                    id={radioType}
                  />
                  <Label className="cursor-pointer" htmlFor={radioType}>
                    {radioType}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}

      {/* Brands Filter (if available) */}
      {selectedCategoryData?.brands &&
        selectedCategoryData?.brands.length > 0 && (
          <div>
            <label className="block mb-2 text-sm font-medium text-red-600">
              *Brands (required)
            </label>
            <Select
              required
              value={category.brands}
              onValueChange={(value) =>
                setCategories((prev) => ({ ...prev, brands: value }))
              }
            >
              <SelectTrigger className="w-full border-[1px] border-gray-300 p-2">
                <span>{category.brands || "Select Brands"}</span>
              </SelectTrigger>
              <SelectContent>
                {selectedCategoryData.brands.map((brands) => (
                  <SelectItem key={brands.label} value={brands.value}>
                    {brands.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

      {/* Condition Filter (if available) */}
      {selectedCategoryData?.conditions &&
        selectedCategoryData?.conditions.length > 0 && (
          <div>
            <label className="block mb-2 text-sm font-medium text-red-600">
              *Condition (required)
            </label>
            <Select
              required
              value={category.condition}
              onValueChange={(value) =>
                setCategories((prev) => ({ ...prev, condition: value }))
              }
            >
              <SelectTrigger className="w-full border-[1px] border-gray-300 p-2">
                <span>{category.condition || "Select Condition"}</span>
              </SelectTrigger>
              <SelectContent>
                {selectedCategoryData.conditions.map((condition) => (
                  <SelectItem key={condition} value={condition}>
                    {condition}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
    </div>
  );
};

export default CategoryFilter;

// ??????????????????????????????????????????????????
// ??????????????????????????????????????????????????
// ??????????????????????????????????????????????????

// import { FC } from "react";
// import {
//   Select,
//   SelectTrigger,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
// import { Checkbox } from "@/components/ui/checkbox";

// // interface ICategories {
// //   id: string;
// //   name: string;
// //   type?: string[];
// //   subCategories?: string[];
// //   brands?: { label: string; value: string }[];
// //   condition?: string[];
// // }

// interface ICategory {
//   category: string;
//   subCategory: string;
//   types: string;
//   brands: string;
//   condition: string;
// }

// interface ICategoryFilter {
//   category: ICategory;
//   setCategories: React.Dispatch<React.SetStateAction<ICategory>>;
// }

// const categories = [
//   {
//     id: "1",
//     name: "clothing",
//     type: ["mens", "womens", "unisex"],
//     subCategories: [
//       "top wears",
//       "bottom wears",
//       "underwears",
//       "dress",
//       "skirt",
//     ],
//     brands: [
//       { label: "Nike", value: "Nike" },
//       { label: "Adidas", value: "Adidas" },
//       { label: "Crux", value: "Crux" },
//     ],
//   },
//   {
//     id: "2",
//     name: "mobiles",
//     type: ["button", "smart"],
//     brands: [
//       { label: "Apple", value: "Apple" },
//       { label: "Samsung", value: "Samsung" },
//       { label: "Techno", value: "Techno" },
//       { label: "Motorolla", value: "Motorolla" },
//       { label: "Blu", value: "Blu" },
//     ],
//     condition: ["new", "refurbished", "used"],
//   },
//   {
//     id: "3",
//     name: "laptop",
//     type: ["gaming", "office", "budget"],
//     brands: [
//       { label: "Hp", value: "Hp" },
//       { label: "Toshiba", value: "Toshiba" },
//       { label: "Dell", value: "Dell" },
//       { label: "Vivo", value: "Vivo" },
//       { label: "Microsoft", value: "Microsoft" },
//       { label: "Acer", value: "Acer" },
//     ],
//     condition: ["new", "refurbished", "used"],
//   },
//   {
//     id: "4",
//     name: "books",
//   },
// ];

// const CategoryFilter: FC<ICategoryFilter> = ({ category, setCategories }) => {
//   const handleTypeChange = (type: string) => {
//     setCategories((prev) => ({
//       ...prev,
//       types: type,
//     }));
//   };

//   const handleBrandChange = (brand: string) => {
//     setCategories((prev) => ({
//       ...prev,
//       brands: brand,
//     }));
//   };

//   const selectedCategoryData = categories.find(
//     (cat) => cat.name === category.category
//   );

//   return (
//     <div className="space-y-4 border-gray-600 border-[1px] rounded-sm p-2">
//       {/* Category Dropdown */}
//       <div>
//         <label className="block mb-2 text-sm font-medium">Category</label>
//         <Select
//           onValueChange={(value) =>
//             setCategories({
//               subCategory: "",
//               types: "",
//               brands: "",
//               condition: "",
//               category: value,
//             })
//           }
//         >
//           <SelectTrigger className="w-full">
//             <span>{category.category || "Select Category"}</span>
//           </SelectTrigger>
//           <SelectContent>
//             {categories.map((category) => (
//               <SelectItem key={category.id} value={category.name}>
//                 {category.name}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>

//       {/* Subcategory Dropdown (if available) */}
//       {selectedCategoryData?.subCategories && (
//         <div>
//           <label className="block mb-2 text-sm font-medium">Subcategory</label>
//           <Select
//             onValueChange={(value) =>
//               setCategories((prev) => ({ ...prev, subCategory: value }))
//             }
//           >
//             <SelectTrigger className="w-full">
//               <span>{category.subCategory || "Select Subcategory"}</span>
//             </SelectTrigger>
//             <SelectContent>
//               {selectedCategoryData.subCategories.map((subCat) => (
//                 <SelectItem key={subCat} value={subCat}>
//                   {subCat}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>
//       )}

//       {/* Types Filter (if available) */}
//       {selectedCategoryData?.type && (
//         <div>
//           <label className="block mb-2 text-sm font-medium flex-1 w-full mx-auto">
//             Types
//           </label>
//           <div className="flex flex-row flex-wrap justify-between gap-2">
//             {selectedCategoryData.type.map((type) => (
//               <div
//                 key={type}
//                 className="flex items-center border-b-[1px] border-gray-600 cursor-pointer"
//               >
//                 <Checkbox
//                   id={type}
//                   checked={category.types.includes(type)}
//                   onCheckedChange={() => handleTypeChange(type)}
//                 />
//                 <label htmlFor={type} className="ml-2 text-sm cursor-pointer">
//                   {type}
//                 </label>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Brands Filter (if available) */}
//       {selectedCategoryData?.brands && (
//         <div>
//           <label className="block mb-2 text-sm font-medium">Brands</label>
//           <div className="flex flex-row flex-wrap justify-between gap-2">
//             {selectedCategoryData.brands.map((brand) => (
//               <div
//                 key={brand.value}
//                 className="flex items-center border-b-[1px] border-gray-600 cursor-pointer"
//               >
//                 <Checkbox
//                   id={brand.value}
//                   checked={category.brands.includes(brand.value)}
//                   onCheckedChange={() => handleBrandChange(brand.value)}
//                 />
//                 <label
//                   htmlFor={brand.value}
//                   className="ml-2 text-sm cursor-pointer"
//                 >
//                   {brand.label}
//                 </label>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Condition Filter (if available) */}
//       {selectedCategoryData?.condition && (
//         <div>
//           <label className="block mb-2 text-sm font-medium">Condition</label>
//           <Select
//             onValueChange={(value) =>
//               setCategories((prev) => ({ ...prev, condition: value }))
//             }
//           >
//             <SelectTrigger className="w-full">
//               <span>{category.condition || "Select Condition"}</span>
//             </SelectTrigger>
//             <SelectContent>
//               {selectedCategoryData.condition.map((condition) => (
//                 <SelectItem key={condition} value={condition}>
//                   {condition}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CategoryFilter;
