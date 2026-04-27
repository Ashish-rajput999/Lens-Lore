"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Product } from "@/lib/site-data";

export type CartItem = {
  product: Product;
  quantity: number;
};

export type LookbookDraftItem = {
  id: string;
  product: Product;
  x: number;
  y: number;
};

export type LookbookDraft = {
  description: string;
  items: LookbookDraftItem[];
  title: string;
};

export type AuthUser = {
  email: string;
  name: string;
};

type ReaderState = {
  cartItems: CartItem[];
  hasHydrated: boolean;
  lookbookDraft: LookbookDraft;
  savedStorySlugs: string[];
  user: AuthUser | null;
  addToCart: (product: Product) => void;
  addToLookbookDraft: (product: Product) => void;
  clearCart: () => void;
  decrementCartItem: (productSlug: string) => void;
  incrementCartItem: (productSlug: string) => void;
  isStorySaved: (storySlug: string) => boolean;
  removeFromCart: (productSlug: string) => void;
  removeFromLookbookDraft: (itemId: string) => void;
  setHasHydrated: (value: boolean) => void;
  toggleSavedStory: (storySlug: string) => void;
  updateLookbookDraftItemPosition: (
    itemId: string,
    position: { x: number; y: number },
  ) => void;
  updateLookbookDraftMeta: (payload: Partial<Omit<LookbookDraft, "items">>) => void;
  signUp: (email: string, password: string, name: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => void;
};

const defaultLookbookDraft: LookbookDraft = {
  title: "Midnight Kit Study",
  description: "A compact carry system for rain, transit, and quick portraits.",
  items: [],
};

function upsertCartItem(cartItems: CartItem[], product: Product) {
  const existing = cartItems.find((item) => item.product.slug === product.slug);

  if (!existing) {
    return [...cartItems, { product, quantity: 1 }];
  }

  return cartItems.map((item) =>
    item.product.slug === product.slug
      ? { ...item, quantity: item.quantity + 1 }
      : item,
  );
}

// Mock user storage helpers
function getMockUsers(): Record<string, { name: string; passwordHash: string }> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem("lens-and-lore-users") ?? "{}");
  } catch {
    return {};
  }
}

function saveMockUsers(users: Record<string, { name: string; passwordHash: string }>) {
  if (typeof window === "undefined") return;
  localStorage.setItem("lens-and-lore-users", JSON.stringify(users));
}

// Simple hash (not for real security — demo only)
function hashPassword(password: string): string {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    hash = (hash << 5) - hash + password.charCodeAt(i);
    hash |= 0;
  }
  return String(hash);
}

export const useReaderStore = create<ReaderState>()(
  persist(
    (set, get) => ({
      cartItems: [],
      hasHydrated: false,
      lookbookDraft: defaultLookbookDraft,
      savedStorySlugs: [],
      user: null,
      addToCart(product) {
        set((state) => ({
          cartItems: upsertCartItem(state.cartItems, product),
        }));
      },
      addToLookbookDraft(product) {
        set((state) => ({
          lookbookDraft: {
            ...state.lookbookDraft,
            items: [
              ...state.lookbookDraft.items,
              {
                id: `${product.slug}-${state.lookbookDraft.items.length + 1}`,
                product,
                x: 48 + state.lookbookDraft.items.length * 18,
                y: 48 + state.lookbookDraft.items.length * 18,
              },
            ],
          },
        }));
      },
      clearCart() {
        set({ cartItems: [] });
      },
      decrementCartItem(productSlug) {
        set((state) => ({
          cartItems: state.cartItems.flatMap((item) => {
            if (item.product.slug !== productSlug) {
              return item;
            }

            if (item.quantity <= 1) {
              return [];
            }

            return [{ ...item, quantity: item.quantity - 1 }];
          }),
        }));
      },
      incrementCartItem(productSlug) {
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.product.slug === productSlug
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        }));
      },
      isStorySaved(storySlug) {
        return get().savedStorySlugs.includes(storySlug);
      },
      removeFromCart(productSlug) {
        set((state) => ({
          cartItems: state.cartItems.filter(
            (item) => item.product.slug !== productSlug,
          ),
        }));
      },
      removeFromLookbookDraft(itemId) {
        set((state) => ({
          lookbookDraft: {
            ...state.lookbookDraft,
            items: state.lookbookDraft.items.filter((item) => item.id !== itemId),
          },
        }));
      },
      setHasHydrated(value) {
        set({ hasHydrated: value });
      },
      toggleSavedStory(storySlug) {
        set((state) => ({
          savedStorySlugs: state.savedStorySlugs.includes(storySlug)
            ? state.savedStorySlugs.filter((slug) => slug !== storySlug)
            : [...state.savedStorySlugs, storySlug],
        }));
      },
      updateLookbookDraftItemPosition(itemId, position) {
        set((state) => ({
          lookbookDraft: {
            ...state.lookbookDraft,
            items: state.lookbookDraft.items.map((item) =>
              item.id === itemId ? { ...item, ...position } : item,
            ),
          },
        }));
      },
      updateLookbookDraftMeta(payload) {
        set((state) => ({
          lookbookDraft: {
            ...state.lookbookDraft,
            ...payload,
          },
        }));
      },
      async signUp(email, password, name) {
        const users = getMockUsers();
        if (users[email]) {
          return { error: "An account with this email already exists." };
        }
        users[email] = { name, passwordHash: hashPassword(password) };
        saveMockUsers(users);
        set({ user: { email, name } });
        return { error: null };
      },
      async signIn(email, password) {
        const users = getMockUsers();
        const record = users[email];
        if (!record) {
          return { error: "No account found with this email." };
        }
        if (record.passwordHash !== hashPassword(password)) {
          return { error: "Incorrect password." };
        }
        set({ user: { email, name: record.name } });
        return { error: null };
      },
      signOut() {
        set({ user: null });
      },
    }),
    {
      name: "lens-and-lore-reader",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      partialize: (state) => ({
        cartItems: state.cartItems,
        lookbookDraft: state.lookbookDraft,
        savedStorySlugs: state.savedStorySlugs,
        user: state.user,
      }),
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export function useReaderHydrated() {
  return useReaderStore((state) => state.hasHydrated);
}
