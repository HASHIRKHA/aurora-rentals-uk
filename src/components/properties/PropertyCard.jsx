'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './PropertyCard.module.css';

export default function PropertyCard({ property }) {
  const img = property.images?.[0] || 'https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&w=1600&q=80';

  return (
    <motion.article className={styles.propertyCard} initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} data-cursor="grab">
      <div className={styles.imageContainer}>
        <Image src={img} alt={property.title} fill className={styles.image} sizes="(max-width: 768px) 100vw, 33vw" />
        <div className={styles.priceBadge}>£{Number(property.price_pcm).toLocaleString()} pcm</div>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{property.title}</h3>
        <p className={styles.location}>📍 {property.city}, {property.postcode}</p>
        <div className={styles.features}>
          <span>🛏️ {property.bedrooms} Beds</span>
          <span>🚿 {property.bathrooms} Baths</span>
          <span>📏 {property.total_sqft} sqft</span>
        </div>
      </div>
    </motion.article>
  );
}
