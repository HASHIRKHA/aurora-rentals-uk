'use client';

import { motion } from 'framer-motion';

export default function StaggerContainer({ children, delay = 0, className = '' }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: delay } }
  };

  return (
    <motion.div className={className} variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
      {children}
    </motion.div>
  );
}
