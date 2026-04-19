"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, useScroll } from "framer-motion";
import { Menu, ShoppingBag, UserRound, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    return scrollY.on("change", (value) => setScrolled(value > 36));
  }, [scrollY]);

  return (
    <>
      <motion.header
        initial={reduceMotion ? false : { y: -30, opacity: 0 }}
        animate={reduceMotion ? undefined : { y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-40 border-b transition-colors duration-500",
          scrolled
            ? "border-ivory/10 bg-black/92 backdrop-blur-xl"
            : "border-transparent bg-transparent",
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
            <Link
              href="/cart"
              className="flex h-10 w-10 items-center justify-center border border-ivory/12 text-ivory transition-colors hover:border-gold hover:text-gold"
              aria-label="Open cart"
            >
              <ShoppingBag className="h-4 w-4" />
            </Link>
            <Link
              href="/profile"
              className="flex h-10 w-10 items-center justify-center border border-ivory/12 text-ivory transition-colors hover:border-gold hover:text-gold"
              aria-label="Open profile"
            >
              <UserRound className="h-4 w-4" />
            </Link>
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
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </>
  );
}
