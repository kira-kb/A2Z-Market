"use client";

import { CircleDashedIcon, SlidersHorizontal } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "./ui/sidebar";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { PriceRangeInput } from "./slider";
import MultipleSelector from "./ui/multiple-selector";
import { useEffect, useState } from "react";
import CategoryFilter from "./categoryFilter";
import { useRouter } from "next/navigation";
import { useCategoryStore } from "@/store";

interface ICategory {
  category: string;
  subCategory: string;
  types: string[];
}

// Example filter categories.
// const categories = [
//   {
//     label: "clothing",
//     type: ["mens", "womens", "unsexy"],
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
//     label: "mobiles",
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
//     label: "laptop",
//     type: ["gaming", "office", "budget"],
//     // subCategories: ["hp", "toshiba", "dell", "vivo", "microsoft", "acer"],
//     brands: [
//       { label: "Hp", value: "Hp" },
//       { label: "Toshiba", value: "Toshiba" },
//       { label: "Dell", value: "Dell" },
//       { label: "Vivo", value: "Vivo" },
//       { label: "Microsoft", value: "Microsoft" },
//       { label: "Acer", value: "Acer" },
//       { label: "Dell1", value: "Dell1" },
//       { label: "Vivo1", value: "Vivo1" },
//       { label: "Microsoft1", value: "1Microsoft" },
//       { label: "Acer1", value: "Acer1" },
//     ],
//     condition: ["new", "refurbished", "used"],
//   },
//   {
//     label: "books",
//   },
// ];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { categories, fetchCategories, isLoadding } = useCategoryStore();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<ICategory>({
    category: "",
    subCategory: "",
    types: [],
  });
  const [selector, setSelector] = useState<string[]>([]);
  const [multiple, setMultiple] = useState<string[]>([]);
  const [radio, setRadio] = useState("");
  const [slider, setSlider] = useState<[number, number]>([0, 0]);

  // const [searchParams, setSearchParams] = useState({});

  // const params = useSearchParams();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // console.log("search param: **  ", searchParams);

  const router = useRouter();
  //  && category.category != "Multiple"

  // category.category == "Multiple" ? category=${multiple}& : category.category && category.category != "no value" ? `category=${category.category}&` : ""`

  // const handleFiltterClick = () => {
  //   const generateQueryString = `?${search ? `search=${search}&` : ""}${
  //     category.category == "Multiple"
  //       ? `category=${multiple}&`
  //       : category.category && category.category != "no value"
  //         ? `category=${category.category}&`
  //         : ""
  //   }
  //     ${category.subCategory ? `subCategory=${category.subCategory}&` : ""}${
  //       category.types.length ? `types=${category.types.join(",")}&` : ""
  //     }${slider.length ? `price=${slider.join(",")}&` : ""}${
  //       selector.length ? `brands=${selector.join(",")}&` : ""
  //     }${radio ? `condition=${radio}` : ""}`;
  //   // const generateQueryString = `?${search ? `search=${search}&` : ""}${
  //   //   category.category && category.category != "no value"
  //   //     ? `category=${category.category}&`
  //   //     : ""
  //   // }${category.subCategory ? `subCategory=${category.subCategory}&` : ""}${
  //   //   category.types.length ? `types=${category.types.join(",")}&` : ""
  //   // }${slider.length ? `price=${slider.join(",")}&` : ""}${
  //   //   selector.length ? `brands=${selector.join(",")}&` : ""
  //   // }${radio ? `condition=${radio}` : ""}`;

  //   const queryString =
  //     generateQueryString.at(-1) === "&"
  //       ? generateQueryString.slice(0, -1)
  //       : generateQueryString;

  //   router.push(queryString);
  // };

  const handleFiltterClick = () => {
    const queryParams = [];

    if (search) queryParams.push(`search=${search}`);

    if (category.category === "Multiple" && multiple) {
      queryParams.push(`category=${multiple}`);
    } else if (category.category && category.category !== "no value") {
      queryParams.push(`category=${category.category}`);
    }

    if (category.subCategory) {
      queryParams.push(`subCategory=${category.subCategory}`);
    }

    if (category.types.length) {
      queryParams.push(`types=${category.types.join(",")}`);
    }

    if (slider.length) {
      if(slider[1] > 0) queryParams.push(`price=${slider.join(",")}`);
    }

    if (selector.length) {
      queryParams.push(`brands=${selector.join(",")}`);
    }

    if (radio) {
      queryParams.push(`condition=${radio}`);
    }

    const queryString = queryParams.length ? `?${queryParams.join("&")}` : "";

    router.push(queryString);
  };

  const selectedCategory = categories.find(
    (cat) => cat.name === category.category
  );

  // console.log("selected category: **  ", selectedCategory);

  return (
    <Sidebar {...props} title="Filters" className="my-16 z-0 min-h-screen">
      <SidebarContent className="overflow-y-auto h-full">
        {/* Search Filter */}
        <SidebarGroup>
          <SidebarGroupLabel>Search</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <div className="flex items-center p-2">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full p-2 border border-gray-300 rounded"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <div
                    className="ml-2 bg-blue-700 text-white hover:bg-blue-600 hover:border-blue-700 border-blue-500 transition-colors border-2 p-1 rounded cursor-pointer"
                    title="Click to Filter"
                    onClick={handleFiltterClick}
                  >
                    {isLoadding ? (
                      <CircleDashedIcon className="animate-spin" />
                    ) : (
                      <SlidersHorizontal />
                    )}
                  </div>
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Filter by Category */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <CategoryFilter
                  categories={categories}
                  category={category}
                  setCategories={setCategory}
                />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Filter by multiple Categoriey */}
        {category.category == "Multiple" && (
          <SidebarGroup>
            <SidebarGroupLabel>Categories</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <div className="w-full">
                  <MultipleSelector
                    options={categories.map((cat) => ({
                      label: cat.name,
                      value: cat.name,
                    }))}
                    placeholder="Select Categories..."
                    onChange={(e) => setMultiple(e.map((item) => item.value))}
                  />
                </div>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Filter by Brands */}
        {selectedCategory?.brands &&
          selectedCategory?.brands.length > 0 &&
          selectedCategory?.brands && (
            <SidebarGroup>
              <SidebarGroupLabel>Brands</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <div className="w-full">
                    <MultipleSelector
                      options={selectedCategory.brands}
                      placeholder="Select Brands..."
                      onChange={(e) => setSelector(e.map((item) => item.value))}
                    />
                  </div>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )}

        {/* Filter by Price Range */}
        <SidebarGroup>
          <SidebarGroupLabel>Price Range</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <PriceRangeInput
                // min={1}
                // max={10000}
                // step={10}
                values={slider}
                setValues={setSlider}
              />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Filter by Condition */}
        {selectedCategory?.conditions &&
          selectedCategory?.conditions.length > 0 &&
          selectedCategory?.conditions && (
            <SidebarGroup className="mb-20">
              <SidebarGroupLabel>Condition</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <div>
                      <RadioGroup
                        defaultValue="comfortable"
                        value={radio}
                        onValueChange={(e) => setRadio(e)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="" id="r1" />
                          <Label htmlFor="r1">All</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="new" id="r2" />
                          <Label htmlFor="r2">Brand new</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Refurbished" id="r3" />
                          <Label htmlFor="r3">Refurbished</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="used" id="r4" />
                          <Label htmlFor="r4">Used</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )}
      </SidebarContent>
    </Sidebar>
  );
}
