'use client'

import { motion } from 'framer-motion';

interface AnimatedTitleProps {
  children: React.ReactNode;
}

export default function AnimatedTitle({ children }: AnimatedTitleProps) {
  return (
    <motion.h1 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-5xl font-extrabold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400"
    >
      {children}
    </motion.h1>
  );
}