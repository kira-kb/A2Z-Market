import { create } from "zustand";
import { toast } from "sonner";

interface ICartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface ICart {
  cartItems: ICartItem[];
  addCartItem: (item: ICartItem) => void;
  removeCartItem: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  totalPrice: () => number;
}

interface IDataItem {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string[];
  categories: { name: string }[];
  type: string;
  subCategory: string;
  brands: string;
  conditions: string;
}

interface LatestTrending {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

interface IData {
  data: IDataItem[];
  latestProducts: LatestTrending[];
  trendingItems: LatestTrending[];
  isLoadding: boolean;
  isDeleting: boolean;
  isUpdating: boolean;
  isAdding: boolean;
  fetchData: () => void;
  addProduct: (data: {
    name: string;
    description: string;
    price: number;
    image: FileList;
    categories: string;
    type: string;
    subCategory: string;
    brands: string;
    conditions: string;
  }) => void;
  updateProduct: (data: {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string[];
    categories: string;
    type: string;
    subCategory: string;
    brands: string;
    conditions: string;
  }) => void;
  deleteProduct: (id: string, deleteOnTelegram: boolean) => void;
}

interface ICategoryData {
  id: string;
  name: string;
  type?: string;
  subCategory?: string;
  brands?: string;
  conditions?: string;
  image?: string;
}

interface ICategory {
  isLoadding: boolean;
  isDeleting: boolean;
  isUpdating: boolean;
  isAdding: boolean;
  fetchCategories: () => void;
  addCategory: (data: {
    name: string;
    type: string;
    subCategories: string;
    brands: string;
    conditions: string;
    image: string;
  }) => void;
  updateCategory: (data: {
    id: string;
    name: string;
    type: string;
    subCategories: string;
    brands: string;
    conditions: string;
    image: string;
  }) => void;
  deleteCategory: (id: string) => void;
  categories: {
    id: string;
    name: string;
    type?: string[];
    subCategories?: string[];
    brands?: { label: string; value: string }[];
    conditions?: string[];
    image?: string;
  }[];
}

const sanitizeInput = (input: string) => {
  const regex = /^[a-zA-Z0-9 !@#$%&*()+\-\/"',|=]*$/; // Allowed characters
  const sanitizedData = regex.test(input);
  return sanitizedData ? input : "";
};

const sanitizeUnsplashUrl = (url: string): string => {
  if (url.length <= 1) return "";

  const parsedUrl = new URL(url);

  if (
    parsedUrl.hostname === "images.unsplash.com" ||
    parsedUrl.hostname === "www.images.unsplash.com"
  ) {
    return parsedUrl.href;
  } else {
    toast.error("All images should be from unsplash.com");
    return "";
  }
};

function sanitizeTelegramImageURLs(imageURLs: string[]) {
  // Define a regex for a valid URL structure
  const urlRegex = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-./?%&=]*)?$/;

  // Filter and sanitize the image URLs
  const sanitizedURLs = imageURLs.filter((url) => {
    // Check if the URL matches a valid structure and contains "telegram" domain
    return urlRegex.test(url) && url.includes("telegram");
  });

  return sanitizedURLs;
}

export const useCartStore = create<ICart>((set, get) => ({
  cartItems: [],
  addCartItem: (item) => {
    set((state) => {
      const existingItem = state.cartItems.find((data) => data.id === item.id);
      if (existingItem) {
        toast.warning(`${existingItem.name} is already in the cart.`);
        return {
          cartItems: state.cartItems.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
              : cartItem
          ),
        };
      }
      toast.success(`${item.name} has been added to the cart.`);
      return {
        cartItems: [item, ...state.cartItems],
      };
    });
  },

  removeCartItem: (id) => {
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    }));
  },

  increaseQuantity: (id) => {
    set((state) => ({
      cartItems: state.cartItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      }),
    }));
  },
  decreaseQuantity: (id) => {
    set((state) => ({
      cartItems: state.cartItems.map((item) => {
        if (item.id === id && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      }),
    }));
  },
  totalPrice: () => {
    return get().cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  },
}));

export const useDataStore = create<IData>((set, get) => ({
  data: [],
  latestProducts: [],
  trendingItems: [],

  isLoadding: true,
  isAdding: false,
  isUpdating: false,
  isDeleting: false,
  fetchData: async () => {
    set({ isLoadding: true });

    const response = await fetch("/api/product");
    const data: IDataItem[] = await response.json();

    // console.log("idataItem: ", data);

    if (!data)
      return set({
        data: [],
        latestProducts: [],
        trendingItems: [],
        isLoadding: false,
      });

    const latestProducts = data.slice(0, 5).map((item) => {
      return {
        ...item,
        image: typeof item.image === "string" ? item.image : item.image[0],
      };
    });

    const trendingItems = data.slice(0, 20).map((item) => {
      return {
        ...item,
        image: typeof item.image === "string" ? item.image : item.image[0],
      };
    });

    set({
      data,
      latestProducts,
      trendingItems,
      isLoadding: false,
    });
  },

  // addProduct: async ({
  //   name,
  //   description,
  //   price,
  //   stock,
  //   image,
  //   categories,
  //   type,
  //   subCategory,
  //   brands,
  //   conditions,
  // }) => {
  //   set({
  //     isAdding: true,
  //   });

  //   const sanitizedName = sanitizeInput(name);
  //   const sanitizedType = sanitizeInput(type);
  //   const sanitizedSubCategories = sanitizeInput(subCategory);
  //   const sanitizedBrands = sanitizeInput(brands);
  //   const sanitizedConditions = sanitizeInput(conditions);

  //   const sanitizedDescription = sanitizeInput(description);
  //   const sanitizedprice = price;
  //   const sanitizedStock = stock;
  //   const sanitizedCategory = sanitizeInput(categories);

  //   const sanitizedImage = sanitizeTelegramImageURLs(image);

  //   if (
  //     !name ||
  //     name !== sanitizedName ||
  //     type !== sanitizedType ||
  //     subCategory !== sanitizedSubCategories ||
  //     brands !== sanitizedBrands ||
  //     conditions !== sanitizedConditions ||
  //     description !== sanitizedDescription ||
  //     price !== sanitizedprice ||
  //     stock !== sanitizedStock ||
  //     categories !== sanitizedCategory
  //   ) {
  //     toast.error("Invalid input");
  //     return set({
  //       isAdding: false,
  //     });
  //   }

  //   // console.log(
  //   //   "sanitized name: **  ",
  //   //   sanitizedName,
  //   //   "sanitized type: **  ",
  //   //   sanitizedType,
  //   //   "sanitized sub cat...: **  ",
  //   //   sanitizedSubCategories,
  //   //   "sanitized brands: **  ",
  //   //   sanitizedBrands
  //   // );

  //   // console.log(
  //   //   JSON.stringify({
  //   //     name: sanitizedName,
  //   //     type: sanitizedType,
  //   //     subCategories: sanitizedSubCategories,
  //   //     brands: sanitizedBrands,
  //   //   })
  //   // );

  //   try {
  //     const response = await fetch("/api/categories", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         name: sanitizedName,
  //         type: sanitizedType,
  //         subCategories: sanitizedSubCategories,
  //         brands: sanitizedBrands,
  //         conditions: sanitizedConditions,
  //         image: sanitizedImage,
  //       }),
  //     });

  //     if (response.ok) {
  //       toast.success("Category added successfully");
  //       // await get().fetchData(); // Refetch to update categories
  //     } else {
  //       toast.error("Error adding category");
  //     }
  //   } catch (error) {
  //     toast.error("Server Error adding category");
  //     console.error("Server Error adding category:", error);
  //   }
  //   set({ isAdding: false });
  // },

  addProduct: async ({
    name,
    description,
    price,
    image, // Images inputted by file input
    categories, // Product categories
    subCategory,
    brands,
    conditions,
    type,
  }) => {
    set({
      isAdding: true,
    });

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedDescription = sanitizeInput(description);
    const sanitizedPrice = price;
    // const sanitizedStock = stock;
    const sanitizedCategory = sanitizeInput(categories); // Category related to products
    const sanitizedSubCategory = sanitizeInput(subCategory);
    const sanitizedBrand = sanitizeInput(brands);
    const sanitizedType = sanitizeInput(type);
    const sanitizedCondition = sanitizeInput(conditions);

    // Validation check for invalid inputs
    // if (
    //   !name ||
    //   name !== sanitizedName ||
    //   description !== sanitizedDescription ||
    //   price !== sanitizedPrice ||
    //   categories !== sanitizedCategory ||
    //   subCategory !== sanitizedSubCategory ||
    //   brands !== sanitizedBrand ||
    //   conditions !== sanitizedCondition
    // ) {
    //   toast.error("Invalid input");
    //   return set({
    //     isAdding: false,
    //   });
    // }

    if (!name) {
      toast.error("Name is missing");
      return set({ isAdding: false });
    }

    if (name !== sanitizedName) {
      toast.error("Invalid name input");
      return set({ isAdding: false });
    }

    if (type !== sanitizedType) {
      toast.error("Invalid type input");
      return set({ isAdding: false });
    }

    if (categories !== sanitizedCategory) {
      toast.error("Invalid category input");
      return set({ isAdding: false });
    }

    if (subCategory !== sanitizedSubCategory) {
      toast.error("Invalid subcategories input");
      return set({ isAdding: false });
    }

    if (brands !== sanitizedBrand) {
      toast.error("Invalid brands input");
      return set({ isAdding: false });
    }

    if (conditions !== sanitizedCondition) {
      toast.error("Invalid conditions input");
      return set({ isAdding: false });
    }

    // if (image !== sanitizedImage) {
    //   // toast.error("Invalid image input");
    //   return set({ isUpdating: false });
    // }

    // if (id !== sanitizedId) {
    //   toast.error("ID mismatch or invalid");
    //   return set({ isUpdating: false });
    // }

    // Create FormData to send images and other product details
    const formData = new FormData();

    Array.from(image).forEach((file) => formData.append("file", file));

    formData.append("name", sanitizedName);
    formData.append("description", sanitizedDescription);
    formData.append("price", `${sanitizedPrice}`);
    formData.append("category", sanitizedCategory);
    formData.append("subCategory", sanitizedSubCategory);
    formData.append("brand", sanitizedBrand);
    formData.append("condition", sanitizedCondition);
    formData.append("type", sanitizedType);

    // Append images to FormData

    try {
      // Send product data (including images) to the backend
      const response = await fetch("/api/product", {
        method: "POST",
        body: formData, // Using FormData to send files
      });

      // Handle response from the backend
      if (response.ok) {
        get().fetchData();
        toast.success("Product added successfully");
        // Optionally fetch updated data (like products list) here
      } else {
        toast.error("Error adding product");
      }
    } catch (error) {
      toast.error("Server Error adding product");
      console.error("Server Error adding product:", error);
    }

    // Reset the loading state
    set({ isAdding: false });
  },

  updateProduct: async ({
    id,
    name,
    type,
    subCategory,
    brands,
    conditions,
    image,
  }) => {
    set({
      isUpdating: true,
    });

    const sanitizedId = sanitizeInput(id);
    const sanitizedName = sanitizeInput(name);
    const sanitizedType = sanitizeInput(type);
    const sanitizedSubCategories = sanitizeInput(subCategory);
    const sanitizedBrands = sanitizeInput(brands);
    const sanitizedConditions = sanitizeInput(conditions);
    const sanitizedImage = sanitizeTelegramImageURLs(image);

    // console.log("normal value");
    // console.log(
    //   "name: ",
    //   name,
    //   "id: ",
    //   id,
    //   "type: ",
    //   type,
    //   "subCategories: ",
    //   subCategories,
    //   "brands: ",
    //   brands,
    //   "conditions: ",
    //   conditions,
    //   "image: ",
    //   image
    // );

    // console.log(
    //   "sanitized id: **  ",
    //   sanitizedId,
    //   "sanitized name: **  ",
    //   sanitizedName,
    //   "sanitized type: **  ",
    //   sanitizedType,
    //   "sanitized sub cat...: **  ",
    //   sanitizedSubCategories,
    //   "sanitized brands: **  ",
    //   sanitizedBrands,
    //   "sanitized conditions: **  ",
    //   sanitizedConditions,
    //   "sanitized image: **  ",
    //   sanitizedImage
    // );

    if (!id) {
      toast.error("ID is missing");
      return set({ isUpdating: false });
    }

    if (!name) {
      toast.error("Name is missing");
      return set({ isUpdating: false });
    }

    if (name !== sanitizedName) {
      toast.error("Invalid name input");
      return set({ isUpdating: false });
    }

    if (type !== sanitizedType) {
      toast.error("Invalid type input");
      return set({ isUpdating: false });
    }

    if (subCategory !== sanitizedSubCategories) {
      toast.error("Invalid subcategories input");
      return set({ isUpdating: false });
    }

    if (brands !== sanitizedBrands) {
      toast.error("Invalid brands input");
      return set({ isUpdating: false });
    }

    if (conditions !== sanitizedConditions) {
      toast.error("Invalid conditions input");
      return set({ isUpdating: false });
    }

    if (image !== sanitizedImage) {
      // toast.error("Invalid image input");
      return set({ isUpdating: false });
    }

    if (id !== sanitizedId) {
      toast.error("ID mismatch or invalid");
      return set({ isUpdating: false });
    }

    // console.log("updatind data");
    // console.log(
    //   JSON.stringify({
    //     id: sanitizedId,
    //     name: sanitizedName,
    //     type: sanitizedType,
    //     subCategories: sanitizedSubCategories,
    //     brands: sanitizedBrands,
    //     conditions: sanitizedConditions,
    //     image: sanitizedImage,
    //   })
    // );

    try {
      const response = await fetch("/api/categories", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: sanitizedId,
          name: sanitizedName,
          type: sanitizedType,
          subCategories: sanitizedSubCategories,
          brands: sanitizedBrands,
          conditions: sanitizedConditions,
          image: sanitizedImage,
        }),
      });

      if (response.ok) {
        toast.success("Category updated successfully");
        // await get().fetchCategories(); // Refetch to update categories
      } else {
        toast.error("Error updating category");
      }
    } catch (error) {
      toast.error("Server Error updating category");
      console.error("Server Error updating category:", error);
    }
    set({ isUpdating: false });
  },

  deleteProduct: async (id, deleteOnTelegram = true) => {
    // if (!confirm("Are you sure you want to delete this product?")) return;
    set({ isDeleting: true });
    try {
      const response = await fetch(
        `/api/product?id=${id}&deleteOnTelegram=${deleteOnTelegram}`,
        {
          method: "DELETE",
        }
      );

      set({ isDeleting: false });

      if (response.ok) {
        get().fetchData();
        toast.success("Product deleted successfully");
      } else {
        toast.error("Error deleting Product");
      }
    } catch (error) {
      toast.error("Server Error deleting Product");
      console.error("Server Error deleting Product:", error);
    }
  },
}));

export const useCategoryStore = create<ICategory>((set, get) => ({
  // categories: [
  //   {
  //     id: "1",
  //     label: "clothing",
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
  //     id: "3",
  //     label: "laptop",
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
  //     label: "books",
  //   },
  // ],

  categories: [],
  isLoadding: true,
  isAdding: false,
  isUpdating: false,
  isDeleting: false,

  fetchCategories: async () => {
    set({ isLoadding: true });

    const response = await fetch("/api/categories");

    if (!response.ok)
      return set({
        categories: [],
        isLoadding: false,
      });

    const data: ICategoryData[] = await response.json();

    if (!data)
      return set({
        categories: [],
        isLoadding: false,
      });

    console.log("incomming data: ", data);

    const categories = data.map((item) => {
      const subCategories =
        (item.subCategory &&
          item.subCategory?.split(", ").map((sub) => sub.trim())) ||
        [];

      // console.log("subCategories: ", item.subCategory);
      const brands =
        (item.brands &&
          item.brands?.split(", ").map((brand) => ({
            label: brand.trim(),
            value: brand.trim(),
          }))) ||
        [];
      const conditions =
        (item.conditions &&
          item.conditions?.split(", ").map((cond) => cond.trim())) ||
        [];
      const type = item.type?.split(", ").map((t) => t.trim()) || [];

      // console.log("conditions: ", conditions);

      return {
        ...item,
        subCategories: subCategories,
        brands,
        conditions: conditions,
        type,
      };
    });

    // console.log("categories from state: **  ", categories);

    set({
      categories,
      isLoadding: false,
    });
  },

  addCategory: async ({
    name,
    type,
    subCategories,
    brands,
    conditions,
    image,
  }) => {
    set({
      isAdding: true,
    });

    const sanitizedName = sanitizeInput(name);
    const sanitizedType = sanitizeInput(type);
    const sanitizedSubCategories = sanitizeInput(subCategories);
    const sanitizedBrands = sanitizeInput(brands);
    const sanitizedConditions = sanitizeInput(conditions);
    const sanitizedImage = sanitizeUnsplashUrl(image);

    if (
      !name ||
      name !== sanitizedName ||
      type !== sanitizedType ||
      subCategories !== sanitizedSubCategories ||
      brands !== sanitizedBrands ||
      conditions !== sanitizedConditions ||
      image !== sanitizedImage
    ) {
      toast.error("Invalid input");
      return set({
        isAdding: false,
      });
    }

    // console.log(
    //   "sanitized name: **  ",
    //   sanitizedName,
    //   "sanitized type: **  ",
    //   sanitizedType,
    //   "sanitized sub cat...: **  ",
    //   sanitizedSubCategories,
    //   "sanitized brands: **  ",
    //   sanitizedBrands
    // );

    // console.log(
    //   JSON.stringify({
    //     name: sanitizedName,
    //     type: sanitizedType,
    //     subCategories: sanitizedSubCategories,
    //     brands: sanitizedBrands,
    //   })
    // );

    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: sanitizedName,
          type: sanitizedType,
          subCategories: sanitizedSubCategories,
          brands: sanitizedBrands,
          conditions: sanitizedConditions,
          image: sanitizedImage,
        }),
      });

      if (response.ok) {
        toast.success("Category added successfully");
        await get().fetchCategories(); // Refetch to update categories
      } else {
        toast.error("Error adding category");
      }
    } catch (error) {
      toast.error("Server Error adding category");
      console.error("Server Error adding category:", error);
    }
    set({ isAdding: false });
  },

  updateCategory: async ({
    id,
    name,
    type,
    subCategories,
    brands,
    conditions,
    image,
  }) => {
    set({
      isUpdating: true,
    });

    const sanitizedId = sanitizeInput(id);
    const sanitizedName = sanitizeInput(name);
    const sanitizedType = sanitizeInput(type);
    const sanitizedSubCategories = sanitizeInput(subCategories);
    const sanitizedBrands = sanitizeInput(brands);
    const sanitizedConditions = sanitizeInput(conditions);
    const sanitizedImage = sanitizeUnsplashUrl(image);

    // console.log("normal value");
    // console.log(
    //   "name: ",
    //   name,
    //   "id: ",
    //   id,
    //   "type: ",
    //   type,
    //   "subCategories: ",
    //   subCategories,
    //   "brands: ",
    //   brands,
    //   "conditions: ",
    //   conditions,
    //   "image: ",
    //   image
    // );

    // console.log(
    //   "sanitized id: **  ",
    //   sanitizedId,
    //   "sanitized name: **  ",
    //   sanitizedName,
    //   "sanitized type: **  ",
    //   sanitizedType,
    //   "sanitized sub cat...: **  ",
    //   sanitizedSubCategories,
    //   "sanitized brands: **  ",
    //   sanitizedBrands,
    //   "sanitized conditions: **  ",
    //   sanitizedConditions,
    //   "sanitized image: **  ",
    //   sanitizedImage
    // );

    if (!id) {
      toast.error("ID is missing");
      return set({ isUpdating: false });
    }

    if (!name) {
      toast.error("Name is missing");
      return set({ isUpdating: false });
    }

    if (name !== sanitizedName) {
      toast.error("Invalid name input");
      return set({ isUpdating: false });
    }

    if (type !== sanitizedType) {
      toast.error("Invalid type input");
      return set({ isUpdating: false });
    }

    if (subCategories !== sanitizedSubCategories) {
      toast.error("Invalid subcategories input");
      return set({ isUpdating: false });
    }

    if (brands !== sanitizedBrands) {
      toast.error("Invalid brands input");
      return set({ isUpdating: false });
    }

    if (conditions !== sanitizedConditions) {
      toast.error("Invalid conditions input");
      return set({ isUpdating: false });
    }

    if (image !== sanitizedImage) {
      // toast.error("Invalid image input");
      return set({ isUpdating: false });
    }

    if (id !== sanitizedId) {
      toast.error("ID mismatch or invalid");
      return set({ isUpdating: false });
    }

    // console.log("updatind data");
    // console.log(
    //   JSON.stringify({
    //     id: sanitizedId,
    //     name: sanitizedName,
    //     type: sanitizedType,
    //     subCategories: sanitizedSubCategories,
    //     brands: sanitizedBrands,
    //     conditions: sanitizedConditions,
    //     image: sanitizedImage,
    //   })
    // );

    try {
      const response = await fetch("/api/categories", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: sanitizedId,
          name: sanitizedName,
          type: sanitizedType,
          subCategories: sanitizedSubCategories,
          brands: sanitizedBrands,
          conditions: sanitizedConditions,
          image: sanitizedImage,
        }),
      });

      if (response.ok) {
        toast.success("Category updated successfully");
        await get().fetchCategories(); // Refetch to update categories
      } else {
        toast.error("Error updating category");
      }
    } catch (error) {
      toast.error("Server Error updating category");
      console.error("Server Error updating category:", error);
    }
    set({ isUpdating: false });
  },

  deleteCategory: async (id) => {
    set({ isDeleting: true });
    try {
      const response = await fetch(`/api/categories?id=${id}`, {
        method: "DELETE",
      });

      set({ isDeleting: false });

      if (response.ok) {
        await get().fetchCategories(); // Refetch to update categories
        toast.success("Category deleted successfully");
      } else {
        toast.error("Error deleting category");
      }
    } catch (error) {
      toast.error("Server Error deleting category");
      console.error("Server Error deleting category:", error);
    }
  },
}));

// ????????????????????????????????????????????????????????????

// import { create } from "zustand";
// import { toast } from "sonner";

// interface ICartItem {
//   id: string;
//   name: string;
//   price: number;
//   quantity: number;
//   image: string;
// }

// interface ICart {
//   cartItems: ICartItem[];
//   addCartItem: (item: ICartItem) => void;
//   removeCartItem: (id: string) => void;
//   increaseQuantity: (id: string) => void;
//   decreaseQuantity: (id: string) => void;
//   totalPrice: () => number;
// }

// interface IDataItem {
//   id: string;
//   title: string;
//   price: number;
//   // image: string;
//   image: string[];
//   description: string;
// }

// interface LatestTrending {
//   id: string;
//   title: string;
//   price: number;
//   image: string;
//   description: string;
// }

// interface IData {
//   data: IDataItem[];
//   latestProducts: LatestTrending[];
//   trendingItems: LatestTrending[];
//   fetchData: () => void;
//   isLoadding: boolean;
// }

// interface ICategoryData {
//   label: string;
//   type?: string;
//   subCategories?: string;
//   brands?: string;
//   condition?: string;
//   image?: string;
// }

// interface ICategory {
//   isLoadding: boolean;
//   fetchData: () => void;
//   categories: {
//     label: string;
//     type?: string[];
//     subCategories?: string[];
//     brands?: { label: string; value: string }[];
//     condition?: string[];
//     image?: string;
//   }[];
// }

// export const useCartStore = create<ICart>((set, get) => ({
//   cartItems: [],
//   addCartItem: (item) => {
//     set((state) => {
//       const existingItem = state.cartItems.find((data) => data.id === item.id);
//       if (existingItem) {
//         toast.warning(`${existingItem.name} is already in the cart.`);
//         return {
//           cartItems: state.cartItems.map((item) =>
//             item.id === item.id
//               ? { ...item, quantity: item.quantity + item.quantity }
//               : item
//           ),
//         };
//       }
//       toast.success(`${item.name} has been added to the cart.`);
//       return {
//         cartItems: [item, ...state.cartItems],
//       };
//     });
//   },

//   removeCartItem: (id) => {
//     set((state) => ({
//       cartItems: state.cartItems.filter((item) => item.id !== id),
//     }));
//   },

//   increaseQuantity: (id) => {
//     set((state) => ({
//       cartItems: state.cartItems.map((item) => {
//         if (item.id === id) {
//           return { ...item, quantity: item.quantity + 1 };
//         }
//         return item;
//       }),
//     }));
//   },
//   decreaseQuantity: (id) => {
//     set((state) => ({
//       cartItems: state.cartItems.map((item) => {
//         if (item.id === id && item.quantity > 1) {
//           return { ...item, quantity: item.quantity - 1 };
//         }
//         return item;
//       }),
//     }));
//   },
//   totalPrice: () => {
//     return get().cartItems.reduce((total, item) => {
//       return total + item.price * item.quantity;
//     }, 0);
//   },
// }));

// export const useDataStore = create<IData>((set) => ({
//   data: [],
//   latestProducts: [],
//   trendingItems: [],

//   isLoadding: true,
//   fetchData: async () => {
//     const response = await fetch("https://fakestoreapi.com/products");
//     const data: IDataItem[] = await response.json();

//     if (!data)
//       return set({
//         data: [],
//         latestProducts: [],
//         trendingItems: [],
//         isLoadding: false,
//       });

//     const latestProducts = data.slice(0, 5).map((item) => {
//       return {
//         ...item,
//         image: typeof item.image === "string" ? item.image : item.image[0],
//       };
//     });

//     const trendingItems = data.slice(5).map((item) => {
//       return {
//         ...item,
//         image: typeof item.image === "string" ? item.image : item.image[0],
//       };
//     });

//     set({
//       data,
//       latestProducts,
//       trendingItems,
//       isLoadding: false,
//     });
//   },
// }));

// export const useCategoryStore = create<ICategory>((set) => ({
//   categories: [
//     {
//       label: "clothing",
//       type: ["mens", "womens", "unsexy"],
//       subCategories: [
//         "top wears",
//         "bottom wears",
//         "underwears",
//         "dress",
//         "skirt",
//       ],
//       brands: [
//         { label: "Nike", value: "Nike" },
//         { label: "Adidas", value: "Adidas" },
//         { label: "Crux", value: "Crux" },
//       ],
//     },
//     {
//       label: "mobiles",
//       type: ["button", "smart"],
//       brands: [
//         { label: "Apple", value: "Apple" },
//         { label: "Samsung", value: "Samsung" },
//         { label: "Techno", value: "Techno" },
//         { label: "Motorolla", value: "Motorolla" },
//         { label: "Blu", value: "Blu" },
//       ],
//       condition: ["new", "refurbished", "used"],
//     },
//     {
//       label: "laptop",
//       type: ["gaming", "office", "budget"],
//       brands: [
//         { label: "Hp", value: "Hp" },
//         { label: "Toshiba", value: "Toshiba" },
//         { label: "Dell", value: "Dell" },
//         { label: "Vivo", value: "Vivo" },
//         { label: "Microsoft", value: "Microsoft" },
//         { label: "Acer", value: "Acer" },
//       ],
//       condition: ["new", "refurbished", "used"],
//     },
//     {
//       label: "books",
//     },
//   ],
//   isLoadding: true,
//   fetchData: async () => {
//     // const response = await fetch("/api/categories");
//     // const data: ICategoryData[] = await response.json();

//     // if (!data)
//     //   return set({
//     //     categories: [],
//     //     isLoadding: false,
//     //   });

//     const data = [
//       {
//         label: "clothing",
//         type: "mens, womens, unsexy",
//         subCategories: " top wears, bottom wears, underwears, dress, skirt",
//         brands: "Nike, Addidas, Crux",
//       },
//       {
//         label: "mobiles",
//         type: "button, smart",
//         brands: "Apple, Samsung, Techno, Motorolla, Blu",

//         condition: "new, refurbished, used",
//       },
//       {
//         label: "laptop",
//         type: "gaming, office, budget",
//         brands: "Hp, Toshiba, Dell, Vivo, Microsoft, Acer",
//         condition: "new, refurbished, used",
//       },
//       {
//         label: "books",
//       },
//     ];

//     // const categories = data.map((item) => {
//     //   const subCategories =
//     //     item.subCategories?.split(", ").map((item) => item.trim()) || [];
//     //   const brands =
//     //     item.brands?.split(", ").map((brand) => ({
//     //       label: brand.trim(),
//     //       value: brand.trim(),
//     //     })) || [];
//     //   const condition =
//     //     item.condition?.split(", ").map((item) => item.trim()) || [];
//     //   const types = item.type?.split(", ").map((item) => item.trim()) || [];

//     //   console.log("brands: **  ", brands);

//     //   return { ...item, subCategories, brands, condition, types };
//     // });
//     const categories = data.map((item) => ({
//       label: item.label,
//       subCategories: item.subCategories
//         ? item.subCategories.split(", ").map((s) => s.trim())
//         : [],
//       brands: item.brands
//         ? item.brands
//             .split(", ")
//             .map((brand) => ({ label: brand.trim(), value: brand.trim() }))
//         : [],
//       condition: item.condition
//         ? item.condition.split(", ").map((c) => c.trim())
//         : [],
//       types: item.type ? item.type.split(", ").map((t) => t.trim()) : [],
//     }));
//     console.log("Categories: ** ", categories);

//     set({
//       categories,
//       isLoadding: false,
//     });
//   },
// }));
