"use client";

import React from "react";
import { motion } from "framer-motion";

interface ButtonBlankProps {
  name: string;
  icon?: React.ReactNode;
  background?: string;
  color?: string;
  border?: string;
  action: string;
}

function ButtonBlank({
  name,
  background = "var(--color-bg)",
  border,
  color,
  icon,
  action = `#`,
}: ButtonBlankProps) {
  return (
    <>
      <motion.button
        onClick={() => {
          window.open(
            action,
            "_blank"
          );
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          background: background,
          color: color,
          border,
        }}
        className="border rounded-lg gap-2 hover:bg-primary hover:border-[yellow] hover:text-white sm:text-xs p-2 md:px-4 md:py-2 flex items-center justify-center"
      >
        
        {name}<p>{icon && icon}</p>
      </motion.button>
    </>
  );
}
export default ButtonBlank;
