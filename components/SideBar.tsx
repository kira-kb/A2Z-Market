"use client";

import { Search } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "./ui/sidebar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { DoubleSlider } from "./slider";
import MultipleSelector, { Option } from "./ui/multiple-selector";
// import { useRouter } from "next/router";

// Example filter categories.
const categories = [
  { title: "Electronics", value: "electronics" },
  { title: "Clothing", value: "clothing" },
  { title: "Home Appliances", value: "home-appliances" },
  { title: "Books", value: "books" },
  { title: "Sports", value: "sports" },
];

const brands: Option[] = [
  { label: "Apple", value: "Apple" },
  { label: "Samsung", value: "Samsung" },
  { label: "Techno", value: "Techno" },
  { label: "Motorolla", value: "Motorolla" },
  { label: "Blu", value: "Blu" },
];

// const priceRanges = [
//   { label: "Under $50", value: "under-50" },
//   { label: "$50 - $100", value: "50-100" },
//   { label: "$100 - $500", value: "100-500" },
//   { label: "Above $500", value: "above-500" },
// ];

export function AppSidebar() {
  // State for selected filters.
  // const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  // const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(
  //   null
  // );

  // const router = useRouter();

  // console.log("path: ** ", router.pathname);

  return (
    <Sidebar title="Filters" className="my-16 z-0">
      <SidebarContent>
        {/* Search Filter */}
        <SidebarGroup>
          <SidebarGroupLabel>Search</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <div className="flex items-center p-2">
                  <Search className="mr-2" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Filter by Category */}
        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Select>
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
                </Select>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Filter by Price Range */}
        <SidebarGroup>
          <SidebarGroupLabel>Price Range</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <DoubleSlider min={10} max={1000} step={10} />
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

        {/* Filter by Brands */}
        <SidebarGroup>
          <SidebarGroupLabel>Brands</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <div className="w-full">
                <MultipleSelector
                  defaultOptions={brands}
                  placeholder="Select Brands..."
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

        {/* Filter by Condition */}
        <SidebarGroup className="mb-20">
          <SidebarGroupLabel>Condition</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <div>
                  <RadioGroup defaultValue="comfortable">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="default" id="r1" />
                      <Label htmlFor="r1">Brand new</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="comfortable" id="r2" />
                      <Label htmlFor="r2">Refubrished</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="compact" id="r3" />
                      <Label htmlFor="r3">Used</Label>
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
