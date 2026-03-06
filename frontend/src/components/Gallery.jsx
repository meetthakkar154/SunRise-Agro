import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiZoomIn, FiX } from 'react-icons/fi';

const galleryImages = [
  { src: '/sap1.webp', alt: 'Sunrise Agro Process 1' },
  { src: '/sap2.webp', alt: 'Sunrise Agro Process 2' },
  { src: '/sap3.webp', alt: 'Sunrise Agro Process 3' },
  { src: '/sap4.webp', alt: 'Sunrise Agro Process 4' },
  { src: '/sap5.webp', alt: 'Sunrise Agro Process 5' },
  { src: '/sap6.webp', alt: 'Sunrise Agro Process 6' },
  { src: '/sap7.webp', alt: 'Sunrise Agro Process 7' },
  { src: '/sap8.webp', alt: 'Sunrise Agro Process 8' },
];

export default function Gallery() {
  const { t } = useTranslation();
  const [lightbox, setLightbox] = useState(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: .1 });

  return (
    <section className="section" id="gallery" style={{ background: 'var(--bg-alt)' }}>
      <div className="container">
        <h2 className="section-title">{t('gallery.title')}</h2>
        <p className="section-subtitle">{t('gallery.subtitle')}</p>
        <div className="gallery-grid" ref={ref}>
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              className="gallery-item"
              initial={{ opacity: 0, scale: .9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * .08, duration: .4 }}
              onClick={() => setLightbox(img.src)}
            >
              <img src={img.src} alt={img.alt} loading="lazy" />
              <div className="gallery-overlay"><FiZoomIn /></div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <button className="lightbox-close" onClick={() => setLightbox(null)}><FiX /></button>
            <img src={lightbox} alt="Gallery preview" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
