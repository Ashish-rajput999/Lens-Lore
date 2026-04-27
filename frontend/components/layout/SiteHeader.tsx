"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, useScroll } from "framer-motion";
import { Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useShell } from "@/components/providers/ShellProvider";
import { useReaderStore } from "@/lib/store/reader-store";
import { navLinks } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const reduceMotion = useReducedMotion();
  const { openAuth, openCart, openSearch, signOut, user } = useShell();
  const cartCount = useReaderStore((state) =>
    state.cartItems.reduce((total, item) => total + item.quantity, 0),
  );
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return scrollY.on("change", (value) => setScrolled(value > 36));
  }, [scrollY]);

  // Close user menu on outside click
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    if (userMenuOpen) {
      document.addEventListener("mousedown", onClickOutside);
    }
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [userMenuOpen]);

  const userInitials = user
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : null;

  return (
    <>
      <motion.header
        initial={reduceMotion ? false : { y: -30, opacity: 0 }}
        animate={reduceMotion ? undefined : { y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-40 border-b transition-colors duration-500",
          scrolled
            ? "border-ivory/10 bg-black/45 backdrop-blur-2xl"
            : "border-transparent bg-black/20 backdrop-blur-xl",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
          <Link
            href="/"
            className="font-display text-2xl tracking-[0.25em] text-ivory"
            aria-label="LENS & LORE home"
          >
            L&L
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={reduceMotion ? false : { y: -12, opacity: 0 }}
                animate={reduceMotion ? undefined : { y: 0, opacity: 1 }}
                transition={{ delay: 0.1 + index * 0.06, duration: 0.6 }}
              >
                <Link
                  href={link.href}
                  className="font-mono text-[0.68rem] uppercase tracking-[0.35em] text-ivory/70 transition-colors hover:text-ivory"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            {/* Search */}
            <button
              type="button"
              id="header-search-btn"
              onClick={openSearch}
              className="flex h-10 w-10 items-center justify-center border border-ivory/12 text-ivory transition-colors hover:border-gold hover:text-gold"
              aria-label="Open search (Cmd+K)"
              title="Search (⌘K)"
            >
              <Search className="h-4 w-4" />
            </button>

            {/* Cart */}
            <button
              type="button"
              id="header-cart-btn"
              onClick={openCart}
              className="relative flex h-10 w-10 items-center justify-center border border-ivory/12 text-ivory transition-colors hover:border-gold hover:text-gold"
              aria-label="Open cart"
            >
              <ShoppingBag className="h-4 w-4" />
              {cartCount > 0 ? (
                <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full border border-gold/60 bg-black px-1 font-mono text-[0.58rem] text-gold">
                  {cartCount}
                </span>
              ) : null}
            </button>

            {/* User / Account */}
            {user ? (
              <div ref={userMenuRef} className="relative">
                <button
                  type="button"
                  id="header-user-btn"
                  onClick={() => setUserMenuOpen((v) => !v)}
                  className="flex h-10 w-10 items-center justify-center border border-gold/60 bg-gold/10 font-mono text-[0.65rem] font-bold text-gold transition-colors hover:bg-gold/20"
                  aria-label="User menu"
                >
                  {userInitials}
                </button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.97 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 top-12 w-48 border border-ivory/12 bg-black/95 backdrop-blur-xl"
                    >
                      <div className="border-b border-ivory/10 px-4 py-3">
                        <p className="truncate font-mono text-[0.65rem] uppercase tracking-[0.3em] text-ivory/50">
                          {user.name}
                        </p>
                      </div>
                      <Link
                        href="/saved"
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-4 py-3 font-mono text-[0.68rem] uppercase tracking-[0.3em] text-ivory/70 transition-colors hover:bg-ivory/5 hover:text-ivory"
                      >
                        Saved Stories
                      </Link>
                      <button
                        type="button"
                        onClick={() => { signOut(); setUserMenuOpen(false); }}
                        className="w-full px-4 py-3 text-left font-mono text-[0.68rem] uppercase tracking-[0.3em] text-blood/80 transition-colors hover:bg-blood/10 hover:text-blood"
                      >
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                type="button"
                id="header-account-btn"
                onClick={() => openAuth("sign-in")}
                className="flex h-10 w-10 items-center justify-center border border-ivory/12 text-ivory transition-colors hover:border-gold hover:text-gold"
                aria-label="Open profile"
              >
                <UserRound className="h-4 w-4" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="flex h-11 w-11 items-center justify-center border border-ivory/12 text-ivory md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.aside
            id="mobile-menu"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={reduceMotion ? undefined : { opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            className="fixed inset-0 z-30 bg-black/96 px-5 pt-28 md:hidden"
          >
            <div className="space-y-5">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={reduceMotion ? false : { y: 20, opacity: 0 }}
                  animate={reduceMotion ? undefined : { y: 0, opacity: 1 }}
                  transition={{ delay: 0.08 * index, duration: 0.45 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-ivory/10 py-4 font-display text-4xl text-ivory"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="grid grid-cols-3 gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => { setOpen(false); openSearch(); }}
                  className="border border-ivory/12 px-3 py-4 font-mono text-xs uppercase tracking-[0.22em] text-ivory"
                >
                  Search
                </button>
                <button
                  type="button"
                  onClick={() => { setOpen(false); openCart(); }}
                  className="relative border border-ivory/12 px-3 py-4 font-mono text-xs uppercase tracking-[0.22em] text-ivory"
                >
                  Cart
                  {cartCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border border-gold/60 bg-black font-mono text-[0.55rem] text-gold">
                      {cartCount}
                    </span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    if (user) { signOut(); } else { openAuth("sign-in"); }
                  }}
                  className="border border-ivory/12 px-3 py-4 font-mono text-xs uppercase tracking-[0.22em] text-ivory"
                >
                  {user ? "Sign Out" : "Account"}
                </button>
              </div>
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </>
  );
}
