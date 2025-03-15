"use client";

import { SlidersHorizontal } from "lucide-react";
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
import { DoubleSlider } from "./slider";
import MultipleSelector, { Option } from "./ui/multiple-selector";
import { useState } from "react";
import CategoryFilter from "./categoryFilter";
import { useRouter, useSearchParams } from "next/navigation";

interface ICategory {
  category: string;
  subCategory: string;
  types: string[];
}

// Example filter categories.
const categories = [
  {
    label: "clothing",
    type: ["mens", "womens", "unsexy"],
    subCategories: [
      "top wears",
      "bottom wears",
      "underwears",
      "dress",
      "skirt",
    ],
  },
  {
    label: "mobiles",
    type: ["button", "smart"],
  },
  {
    label: "laptop",
    type: ["gaming", "office", "budget"],
    subCategories: ["hp", "toshiba", "dell", "vivo", "microsoft", "acer"],
  },
  {
    label: "books",
  },
];

const brands: Option[] = [
  { label: "Apple", value: "Apple" },
  { label: "Samsung", value: "Samsung" },
  { label: "Techno", value: "Techno" },
  { label: "Motorolla", value: "Motorolla" },
  { label: "Blu", value: "Blu" },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<ICategory>({
    category: "",
    subCategory: "",
    types: [],
  });
  const [selector, setSelector] = useState<string[]>([]);
  const [radio, setRadio] = useState("");
  const [slider, setSlider] = useState<[number, number]>([10, 1000]);

  // const queryParams = `?query=${search}&category=${
  //   category.category
  // }&subCategory=${category.subCategory}&types=${category.types.join(
  //   ","
  // )}&price=${slider.join(",")}&brands=${selector.join(",")}&condition=${radio}`;

  const queryParams = `?${search ? `query=${search}&` : ""}${
    category.category ? `category=${category.category}&` : ""
  }${category.subCategory ? `subCategory=${category.subCategory}&` : ""}${
    category.types.length ? `types=${category.types.join(",")}&` : ""
  }${slider.length ? `price=${slider.join(",")}&` : ""}${
    selector.length ? `brands=${selector.join(",")}&` : ""
  }${radio ? `condition=${radio}` : ""}`.slice(0, -1);

  const router = useRouter();

  // console.log("queryParams: ", queryParams);
  // const queryString =
  useSearchParams().forEach((q) => console.log(q));
  // console.log("queryString: **  ", queryString);

  const handleFiltterClick = () => {
    router.push(queryParams);
  };

  return (
    <Sidebar {...props} title="Filters" className="my-16 z-0">
      <SidebarContent>
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
                    className="ml-2 bg-blue-500 text-white border-blue-600 border-[1px] p-1 rounded cursor-pointer"
                    title="Click to Filter"
                    onClick={handleFiltterClick}
                  >
                    <SlidersHorizontal />
                  </div>
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Filter by Category */}
        <SidebarGroup>
          {/* <SidebarGroupLabel>Categories</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <CategoryFilter
                  categories={categories}
                  category={category}
                  setCategories={setCategory}
                />
                {/* <Select value={category} onValueChange={(e) => setCategory(e)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Choose Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Choose Category</SelectLabel>
                      {categories.map((category) => (
                        <SelectItem
                          key={category.value}
                          value={`${category.value}`}
                        >
                          {category.title}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select> */}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Filter by Brands */}
        <SidebarGroup>
          <SidebarGroupLabel>Brands</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <div className="w-full">
                <MultipleSelector
                  defaultOptions={brands}
                  placeholder="Select Brands..."
                  onChange={(e) => setSelector(e.map((item) => item.value))}
                  // emptyIndicator={
                  //   <p className="text-center text-sm py-0 text-gray-600 dark:text-gray-400">
                  //     ...
                  //   </p>
                  // }
                />
              </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Filter by Price Range */}
        <SidebarGroup>
          <SidebarGroupLabel>Price Range</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <DoubleSlider
                min={10}
                max={1000}
                step={10}
                values={slider}
                setValues={setSlider}
              />
              {/* <RadioGroup defaultValue="comfortable">
                {priceRanges.map((range, i) => (
                  <SidebarMenuItem key={range.value}>
                    <div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={range.value} id={`r${i}`} />
                        <Label htmlFor={`r${i}`}>{range.label}</Label>
                      </div>
                    </div>
                  </SidebarMenuItem>
                ))}
              </RadioGroup> */}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Filter by Condition */}
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
                      <RadioGroupItem value="Refubrished" id="r3" />
                      <Label htmlFor="r3">Refubrished</Label>
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
      </SidebarContent>
    </Sidebar>
  );
}
