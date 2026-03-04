import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const fallback = [
  { id: 'rice-chokha', name: 'Rice (Chokha)', description: 'Premium milled rice.', qualityGrade: 'A', packaging: '10kg, 25kg, 50kg', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31d?auto=format&fit=crop&w=800&q=80' },
  { id: 'basmati', name: 'Basmati Rice', description: 'Long-grain aromatic basmati.', qualityGrade: 'A+', packaging: '5kg, 10kg, 25kg', image: 'https://images.unsplash.com/photo-1603046891726-36bfd957e0bf?auto=format&fit=crop&w=800&q=80' },
  { id: 'sona-masuri', name: 'Sona Masuri', description: 'Lightweight and soft-textured rice.', qualityGrade: 'A', packaging: '10kg, 25kg, 50kg', image: 'https://images.unsplash.com/photo-1615486363972-f79e0f2b4f2b?auto=format&fit=crop&w=800&q=80' },
  { id: 'broken-rice', name: 'Broken Rice', description: 'Economical broken rice.', qualityGrade: 'B+', packaging: '25kg, 50kg', image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=800&q=80' },
  { id: 'raw-rice', name: 'Raw Rice', description: 'Naturally processed raw rice.', qualityGrade: 'A', packaging: '10kg, 25kg, 50kg', image: 'https://images.unsplash.com/photo-1516683037151-9f1e3d6e1c9f?auto=format&fit=crop&w=800&q=80' },
  { id: 'steam-rice', name: 'Steam Rice', description: 'Uniform steamed rice.', qualityGrade: 'A+', packaging: '10kg, 25kg, 50kg', image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80' },
];

export default function Products() {
  const { t } = useTranslation();
  const [products, setProducts] = useState(fallback);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: .1 });

  useEffect(() => {
    fetch(`${API}/products`)
      .then((r) => r.json())
      .then(setProducts)
      .catch(() => {});
  }, []);

  return (
    <section className="section" id="products" style={{ background: 'var(--bg-alt)' }}>
      <div className="container">
        <h2 className="section-title">{t('products.title')}</h2>
        <p className="section-subtitle">{t('products.subtitle')}</p>
        <div className="products-grid" ref={ref}>
          {products.map((p, i) => (
            <motion.div
              key={p.id}
              className="product-card"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * .1, duration: .5 }}
            >
              <div className="product-card-inner">
                <div className="product-front">
                  <img src={p.image} alt={p.name} loading="lazy" />
                  <div className="product-info">
                    <h3>{p.name}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '.9rem' }}>{p.description}</p>
                  </div>
                </div>
                <div className="product-back">
                  <h3>{p.name}</h3>
                  <p><strong>{t('products.quality')}:</strong> {p.qualityGrade}</p>
                  <p><strong>{t('products.packaging')}:</strong> {p.packaging}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
