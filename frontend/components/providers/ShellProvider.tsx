"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { LayoutGroup } from "framer-motion";
import { Product } from "@/lib/site-data";
import { AuthUser, CartItem, useReaderStore } from "@/lib/store/reader-store";

type AuthMode = "sign-in" | "sign-up";

type ShellContextValue = {
  authMode: AuthMode;
  authOpen: boolean;
  cartItems: CartItem[];
  cartOpen: boolean;
  searchOpen: boolean;
  user: AuthUser | null;
  addToCart: (product: Product) => void;
  closeAuth: () => void;
  closeCart: () => void;
  closeSearch: () => void;
  clearCart: () => void;
  decrementCartItem: (productSlug: string) => void;
  incrementCartItem: (productSlug: string) => void;
  openAuth: (mode?: AuthMode) => void;
  openCart: () => void;
  openSearch: () => void;
  removeFromCart: (productSlug: string) => void;
  setAuthMode: (mode: AuthMode) => void;
  signOut: () => void;
};

const ShellContext = createContext<ShellContextValue | null>(null);

export function ShellProvider({ children }: { children: ReactNode }) {
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("sign-in");
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const cartItems = useReaderStore((state) => state.cartItems);
  const user = useReaderStore((state) => state.user);
  const addToCart = useReaderStore((state) => state.addToCart);
  const clearCart = useReaderStore((state) => state.clearCart);
  const decrementCartItem = useReaderStore((state) => state.decrementCartItem);
  const incrementCartItem = useReaderStore((state) => state.incrementCartItem);
  const removeFromCart = useReaderStore((state) => state.removeFromCart);
  const setHasHydrated = useReaderStore((state) => state.setHasHydrated);
  const storeSignOut = useReaderStore((state) => state.signOut);

  useEffect(() => {
    setHasHydrated(true);
  }, [setHasHydrated]);

  // CMD+K shortcut for search
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const value = useMemo<ShellContextValue>(
    () => ({
      authMode,
      authOpen,
      cartItems,
      cartOpen,
      searchOpen,
      user,
      addToCart(product) {
        addToCart(product);
        setCartOpen(true);
      },
      closeAuth() {
        setAuthOpen(false);
      },
      closeCart() {
        setCartOpen(false);
      },
      closeSearch() {
        setSearchOpen(false);
      },
      clearCart() {
        clearCart();
      },
      decrementCartItem(productSlug) {
        decrementCartItem(productSlug);
      },
      incrementCartItem(productSlug) {
        incrementCartItem(productSlug);
      },
      openAuth(mode = "sign-in") {
        setAuthMode(mode);
        setAuthOpen(true);
      },
      openCart() {
        setCartOpen(true);
      },
      openSearch() {
        setSearchOpen(true);
      },
      removeFromCart(productSlug) {
        removeFromCart(productSlug);
      },
      setAuthMode(mode) {
        setAuthMode(mode);
      },
      signOut() {
        storeSignOut();
        setCartOpen(false);
      },
    }),
    [
      addToCart,
      authMode,
      authOpen,
      cartItems,
      cartOpen,
      clearCart,
      decrementCartItem,
      incrementCartItem,
      removeFromCart,
      searchOpen,
      storeSignOut,
      user,
    ],
  );

  return (
    <ShellContext.Provider value={value}>
      <LayoutGroup id="lens-and-lore-shell">{children}</LayoutGroup>
    </ShellContext.Provider>
  );
}

export function useShell() {
  const context = useContext(ShellContext);

  if (!context) {
    throw new Error("useShell must be used within ShellProvider");
  }

  return context;
}
