import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiZoomIn, FiX } from 'react-icons/fi';

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80', alt: 'Factory' },
  { src: 'https://images.unsplash.com/photo-1530836176759-510f58baebf4?auto=format&fit=crop&w=800&q=80', alt: 'Milling machines' },
  { src: 'https://images.unsplash.com/photo-1586201375761-83865001e31d?auto=format&fit=crop&w=800&q=80', alt: 'Rice grains' },
  { src: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80', alt: 'Rice fields' },
  { src: 'https://images.unsplash.com/photo-1603046891726-36bfd957e0bf?auto=format&fit=crop&w=800&q=80', alt: 'Warehouse' },
  { src: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80', alt: 'Grain storage' },
  { src: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=800&q=80', alt: 'Processing' },
  { src: 'https://images.unsplash.com/photo-1615486363972-f79e0f2b4f2b?auto=format&fit=crop&w=800&q=80', alt: 'Farmers' },
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
