"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

type PageWrapperProps = {
  children: ReactNode;
};

export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="editorial-shell relative flex-1 pt-20"
    >
      {children}
    </motion.main>
  );
}
