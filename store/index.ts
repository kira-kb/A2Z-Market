import { create } from "zustand";

// import tool from "@/assets/images/robotics.avif";
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
  fetchData: () => void;
  isLoadding: boolean;
}

export const useCartStore = create<ICart>((set, get) => ({
  cartItems: [
    // {
    //   id: "1",
    //   name: "Item 1",
    //   price: 10,
    //   quantity: 1,
    //   image: tool.src, // Replace with actual image path
    // },
    // {
    //   id: "2",
    //   name: "Item 2",
    //   price: 15,
    //   quantity: 2,
    //   image: tool.src, // Replace with actual image path
    // },
  ],
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
  isLoadding: true,
  fetchData: async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();

    set({ data, isLoadding: false }); // Updates the store with the fetched data
  },
}));

// 15.1.7
