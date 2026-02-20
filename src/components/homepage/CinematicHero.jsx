'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './CinematicHero.module.css';

export default function CinematicHero() {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 500], [0, 120]);
  const yText = useTransform(scrollY, [0, 500], [0, 90]);

  return (
    <section className={styles.heroContainer}>
      <motion.div className={styles.heroBackground} style={{ y: yBg }}>
        <div className={styles.gradientOverlay} />
      </motion.div>

      <motion.div className={styles.heroContent} style={{ y: yText }} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
        <p className={styles.kicker}>Elite Tendency • UK Luxury Rentals</p>
        <h1 className={styles.mainHeadline}>
          {['A', 'Cinematic', 'Rental', 'Experience'].map((word, idx) => (
            <motion.span key={word + idx} className={styles.word} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + idx * 0.1, duration: 0.6 }}>
              {word}
            </motion.span>
          ))}
        </h1>
        <p className={styles.subHeadline}>Designed to convert high-value landlords and premium tenants across the UK.</p>

        <div className={styles.ctaContainer}>
          <motion.button className={styles.ctaPrimary} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} data-cursor="pointer">Find Your Property</motion.button>
          <motion.button className={styles.ctaSecondary} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} data-cursor="pointer">Manage Your Investment</motion.button>
        </div>
      </motion.div>
    </section>
  );
}
