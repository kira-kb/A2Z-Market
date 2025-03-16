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
  title: string;
  price: number;
  image: string;
  // image: string[];
  description: string;
}

interface IData {
  data: IDataItem[];
  latestProducts: IDataItem[];
  trendingItems: IDataItem[];
  categories: {
    label: string;
    type?: string[];
    subCategories?: string[];
    brands?: { label: string; value: string }[];
    condition?: string[];
    image?: string;
  }[];
  fetchData: () => void;
  isLoadding: boolean;
}

export const useCartStore = create<ICart>((set, get) => ({
  cartItems: [],
  addCartItem: (item) => {
    set((state) => {
      const existingItem = state.cartItems.find((data) => data.id === item.id);
      if (existingItem) {
        toast.warning(`${existingItem.name} is already in the cart.`);
        return {
          cartItems: state.cartItems.map((item) =>
            item.id === item.id
              ? { ...item, quantity: item.quantity + item.quantity }
              : item
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

export const useDataStore = create<IData>((set) => ({
  data: [],
  latestProducts: [],
  trendingItems: [],
  categories: [
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
      brands: [
        { label: "Nike", value: "Nike" },
        { label: "Adidas", value: "Adidas" },
        { label: "Crux", value: "Crux" },
      ],
    },
    {
      label: "mobiles",
      type: ["button", "smart"],
      brands: [
        { label: "Apple", value: "Apple" },
        { label: "Samsung", value: "Samsung" },
        { label: "Techno", value: "Techno" },
        { label: "Motorolla", value: "Motorolla" },
        { label: "Blu", value: "Blu" },
      ],
      condition: ["new", "refurbished", "used"],
    },
    {
      label: "laptop",
      type: ["gaming", "office", "budget"],
      brands: [
        { label: "Hp", value: "Hp" },
        { label: "Toshiba", value: "Toshiba" },
        { label: "Dell", value: "Dell" },
        { label: "Vivo", value: "Vivo" },
        { label: "Microsoft", value: "Microsoft" },
        { label: "Acer", value: "Acer" },
      ],
      condition: ["new", "refurbished", "used"],
    },
    {
      label: "books",
    },
  ],
  isLoadding: true,
  fetchData: async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const data: IDataItem[] = await response.json();
    set({
      data,
      latestProducts: data.slice(0, 5),
      trendingItems: data.slice(5),
      isLoadding: false,
    });
  },
}));
