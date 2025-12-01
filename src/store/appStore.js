import { create } from "zustand";
import { toast } from "sonner";

const API_URL = "http://localhost:5001";

const useAppStore = create((set, get) => ({
    isLoggedIn: false,
    user: null, 

    products: [],
    categories: [],
    isLoading: false,
    error: null,

    cartItems: [],
    login: async (email, password) => {
        try {
            const response = await fetch(`${API_URL}/users?email=${encodeURIComponent(email)}`);
            const users = await response.json();

            if (users.length === 0) {
                toast.error("User not found. Please sign up.");
                return false; 
            }

            const user = users[0];

            if (user.password !== password) {
                toast.error("Incorrect password.");
                return false;
            }

            set({ isLoggedIn: true, user: user });
            toast.success(`Welcome back, ${user.name}!`);
            return true; 

        } catch (error) {
            console.error("Login Error:", error);
            toast.error("Login failed due to server error.");
            return false;
        }
    },
    register: async (name, email, password) => {
        try {
            const checkResponse = await fetch(`${API_URL}/users?email=${encodeURIComponent(email)}`);
            const existingUsers = await checkResponse.json();

            if (existingUsers.length > 0) {
                toast.error("An account with this email already exists.");
                return false;
            }

            const newUser = {
                name,
                email,
                password,
                joined: new Date().toLocaleDateString("en-in", { year: 'numeric', month: 'long', day: 'numeric' }) 
            };

            const response = await fetch(`${API_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });

            if (!response.ok) {
                throw new Error("Failed to create user");
            }

            const savedUser = await response.json();
            set({ isLoggedIn: true, user: savedUser });
            toast.success("Account created successfully!");
            return true;

        } catch (error) {
            console.error("Register Error:", error);
            toast.error("Registration failed. Please try again.");
            return false;
        }
    },

    fetchProducts: async () => {
        set({ isLoading: true });
        try {
            const response = await fetch(`${API_URL}/products`);
            if (!response.ok) throw new Error("Failed to fetch products");
            const data = await response.json();
            set({ products: data, isLoading: false });
        } catch (error) {
            console.error(error);
            set({ error: error.message, isLoading: false });
            toast.error("Could not load products.");
        }
    },
    fetchCategories: async () => {
        try {
            const response = await fetch(`${API_URL}/categories`);
            if (!response.ok) throw new Error("Failed to fetch categories");
            const data = await response.json();
            set({ categories: data });
        } catch (error) {
            console.error("Category fetch error:", error);
        }
    },


    logout: () => set({ isLoggedIn: false, user: null }),

    addToCart: (product) => {
        try {
            if (!product || !product.id) {
                throw new Error("Invalid product data");
            }

            const { cartItems } = get();

            const existingItem = cartItems.find((item) => item.id === product.id);

            const newCart = existingItem
                ? cartItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
                : [...cartItems, { ...product, quantity: 1 }];

            set({ cartItems: newCart });
            toast.success(`${product.name} added to cart!`);

        } catch (error) {
            console.error("Cart update failed:", error);
            toast.error("Could not add item to cart.");
        }
    },

    removeFromCart: (productId) => {
        try {
            const { cartItems } = get();
            const newCart = cartItems.filter((item) => item.id !== productId);

            set({ cartItems: newCart });
            toast.error("Item removed from cart.");
        } catch (error) {
            console.error("Failed to remove item:", error);
        }
    },

    clearCart: () => {
        try {
            set({ cartItems: [] });
        } catch (error) {
            console.error("Failed to clear cart:", error);
        }
    },

    incrementQuantity: (productId) => {
        try {
            const { cartItems } = get();

            const newCart = cartItems.map((item) =>
                item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
            );

            set({ cartItems: newCart });
        } catch (error) {
            console.error("Failed to increment quantity:", error);
        }
    },

    decrementQuantity: (productId) => {
        try {
            const { cartItems } = get();

            const existingItem = cartItems.find((item) => item.id === productId);

            if (!existingItem) return; 
            const newCart =
                existingItem.quantity === 1
                    ? cartItems.filter((item) => item.id !== productId)
                    : cartItems.map((item) =>
                        item.id === productId
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                    );

            set({ cartItems: newCart });
        } catch (error) {
            console.error("Failed to decrement quantity:", error);
        }
    },
}));

export default useAppStore;