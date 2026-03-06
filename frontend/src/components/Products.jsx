import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import { FaArrowRight, FaBoxOpen, FaTimes } from 'react-icons/fa';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const RICE_IMG = 'https://images.pexels.com/photos/4110251/pexels-photo-4110251.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';
const WHEAT_IMG = 'https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';
const BAJRI_IMG = 'https://images.pexels.com/photos/2252584/pexels-photo-2252584.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';

const fallback = [
  // Rice (standard milled)
  { id: 'wadakolam-rice', name: 'Wadakolam Rice', category: 'Rice', description: 'Premium Wadakolam rice with soft texture and great taste.', qualityGrade: 'AAA', packaging: '30kg, 50kg PP bags', features: ['Sortex Cleaned', 'Soft Texture', 'Natural Aroma', 'Daily Use'], image: RICE_IMG },
  { id: 'wadakolam-old', name: 'Wadakolam Old Rice', category: 'Rice', description: 'Aged Wadakolam rice — extra fluffy after cooking.', qualityGrade: 'AAA', packaging: '30kg, 50kg PP bags', features: ['Sortex Cleaned', 'Aged Quality', 'Extra Fluffy', 'Premium'], image: RICE_IMG },
  { id: 'kali-muchh-rice', name: 'Kali Muchh Rice', category: 'Rice', description: 'Distinctive Kali Muchh rice known for unique appearance and rich flavor.', qualityGrade: 'AAA', packaging: '30kg, 50kg PP bags', features: ['Sortex Cleaned', 'Rich Flavor', 'Unique Grain'], image: RICE_IMG },
  { id: 'gujarat-13-rice', name: 'Gujarat-13 Rice', category: 'Rice', description: 'Reliable Gujarat-13 rice for everyday cooking.', qualityGrade: 'AA', packaging: '30kg, 50kg PP bags', features: ['Sortex Cleaned', 'Durable Grain', 'Economical'], image: RICE_IMG },
  { id: 'gujarat-17-rice', name: 'Gujarat-17 Rice', category: 'Rice', description: 'High-yield Gujarat-17 with excellent milling quality.', qualityGrade: 'AA', packaging: '30kg, 50kg PP bags', features: ['Sortex Cleaned', 'High Yield', 'Uniform Size'], image: RICE_IMG },
  { id: 'krishna-kamod-rice', name: 'Krishna Kamod Rice', category: 'Rice', description: 'Premium aromatic Krishna Kamod rice with distinctive taste.', qualityGrade: 'AAA', packaging: '30kg, 50kg PP bags', features: ['Sortex Cleaned', 'Natural Aroma', 'Premium Grain'], image: RICE_IMG },
  { id: 'lachkari-rice', name: 'Lachkari Rice', category: 'Rice', description: 'Lachkari rice known for slender grains and delicate flavor.', qualityGrade: 'AAA', packaging: '30kg, 50kg PP bags', features: ['Sortex Cleaned', 'Slender Grain', 'Delicate Flavor'], image: RICE_IMG },
  // Poniya
  { id: 'wadakolam-poniya', name: 'Wadakolam Poniya', category: 'Poniya', description: 'Poniya variant of Wadakolam with quick cooking properties.', qualityGrade: 'AA', packaging: '30kg, 50kg PP bags', features: ['Sortex Cleaned', 'Quick Cook', 'Soft Texture'], image: RICE_IMG },
  { id: 'kali-muchh-poniya', name: 'Kali Muchh Poniya', category: 'Poniya', description: 'Poniya variant with quick cooking and soft texture.', qualityGrade: 'AA', packaging: '30kg, 50kg PP bags', features: ['Sortex Cleaned', 'Quick Cook', 'Soft'], image: RICE_IMG },
  { id: 'gujarat-13-poniya', name: 'Gujarat-13 Poniya', category: 'Poniya', description: 'Poniya variant of Gujarat-13 with quick cooking.', qualityGrade: 'AA', packaging: '30kg, 50kg PP bags', features: ['Sortex Cleaned', 'Quick Cook'], image: RICE_IMG },
  { id: 'gujarat-17-poniya', name: 'Gujarat-17 Poniya', category: 'Poniya', description: 'Poniya variant of Gujarat-17 for quick preparation.', qualityGrade: 'AA', packaging: '30kg, 50kg PP bags', features: ['Sortex Cleaned', 'Quick Cook'], image: RICE_IMG },
  { id: 'krishna-kamod-poniya', name: 'Krishna Kamod Poniya', category: 'Poniya', description: 'Poniya variant for quick, soft cooked rice.', qualityGrade: 'AAA', packaging: '30kg, 50kg PP bags', features: ['Sortex Cleaned', 'Quick Cook', 'Aromatic'], image: RICE_IMG },
  { id: 'lachkari-poniya', name: 'Lachkari Poniya', category: 'Poniya', description: 'Poniya variant of Lachkari — quick cooking, soft results.', qualityGrade: 'AAA', packaging: '30kg, 50kg PP bags', features: ['Sortex Cleaned', 'Quick Cook', 'Soft'], image: RICE_IMG },
  // Vatla
  { id: 'wadakolam-vatla', name: 'Wadakolam Vatla', category: 'Vatla', description: 'Vatla variant for extra absorption and fluffy results.', qualityGrade: 'AA', packaging: '30kg, 50kg PP bags', features: ['Sortex Cleaned', 'High Absorption', 'Fluffy'], image: RICE_IMG },
  { id: 'kali-muchh-vatla', name: 'Kali Muchh Vatla', category: 'Vatla', description: 'Vatla variant with excellent water absorption.', qualityGrade: 'AA', packaging: '30kg, 50kg PP bags', features: ['Sortex Cleaned', 'High Absorption'], image: RICE_IMG },
  { id: 'gujarat-13-vatla', name: 'Gujarat-13 Vatla', category: 'Vatla', description: 'Vatla variant of Gujarat-13 — extra fluffy.', qualityGrade: 'AA', packaging: '30kg, 50kg PP bags', features: ['Sortex Cleaned', 'Fluffy'], image: RICE_IMG },
  { id: 'gujarat-17-vatla', name: 'Gujarat-17 Vatla', category: 'Vatla', description: 'Vatla variant of Gujarat-17 with great absorption.', qualityGrade: 'AA', packaging: '30kg, 50kg PP bags', features: ['Sortex Cleaned', 'High Absorption'], image: RICE_IMG },
  { id: 'krishna-kamod-vatla', name: 'Krishna Kamod Vatla', category: 'Vatla', description: 'Vatla variant — extra fluffy with natural fragrance.', qualityGrade: 'AAA', packaging: '30kg, 50kg PP bags', features: ['Sortex Cleaned', 'Fluffy', 'Aromatic'], image: RICE_IMG },
  { id: 'lachkari-vatla', name: 'Lachkari Vatla', category: 'Vatla', description: 'Vatla variant of Lachkari with great absorption.', qualityGrade: 'AAA', packaging: '30kg, 50kg PP bags', features: ['Sortex Cleaned', 'Fluffy', 'High Absorption'], image: RICE_IMG },
  { id: 'kasturi-rice', name: 'Kasturi Rice', category: 'Rice', description: 'Aromatic Kasturi rice with long grains and rich fragrance.', qualityGrade: 'AAA', packaging: '30kg, 50kg PP bags', features: ['Sortex Cleaned', 'Long Grain', 'Rich Aroma', 'Premium'], image: RICE_IMG },
  // Wheat
  { id: 'mp-sharbati-wheat', name: 'MP Sharbati Wheat', category: 'Wheat', description: 'Premium MP Sharbati wheat — high protein, golden grains.', qualityGrade: 'AAA', packaging: '30kg, 50kg PP bags', features: ['Sortex Cleaned', 'High Protein', 'Golden Grain'], image: WHEAT_IMG },
  { id: 'bhaliya-wheat', name: 'Bhaliya Wheat', category: 'Wheat', description: 'Gujarat Bhaliya wheat known for superior roti quality.', qualityGrade: 'AA', packaging: '30kg, 50kg PP bags', features: ['Sortex Cleaned', 'Superior Flour', 'Pure & Natural'], image: WHEAT_IMG },
  // White Pearl (Bajri)
  { id: 'green-gold-bajri', name: 'Green Gold Bajri', category: 'White Pearl', description: 'Nutritious pearl millet (Bajri) processed with care.', qualityGrade: 'AA', packaging: '30kg, 50kg PP bags', features: ['Sortex Cleaned', 'High Nutrition', 'Traditional Grain'], image: BAJRI_IMG },
];

const INITIAL_SHOW = 6;
const categories = ['All', 'Rice', 'Poniya', 'Vatla', 'Wheat', 'White Pearl'];

function ProductCard({ p, i, inView }) {
  const { t } = useTranslation();
  const handleQuote = () => {
    const productName = t(`products.items.${p.id}.name`, { defaultValue: p.name });
    window.dispatchEvent(new CustomEvent('requestQuote', { detail: productName }));
    document.getElementById('partners')?.scrollIntoView({ behavior: 'smooth' });
  };
  const name = t(`products.items.${p.id}.name`, { defaultValue: p.name });
  const desc = t(`products.items.${p.id}.desc`, { defaultValue: p.description });
  const features = t(`products.items.${p.id}.features`, { returnObjects: true, defaultValue: p.features });
  const catLabel = t(`products.cat.${p.category}`, { defaultValue: p.category });

  return (
    <motion.div
      className="product-card-v2"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: i * 0.05, duration: 0.4 }}
      layout
    >
      <div className="pc-img-wrap">
        <img src={p.image} alt={name} loading="lazy" />
        <div className="pc-label-overlay">
          <div className="pc-label">
            <span className="pc-veg-mark" />
            <div className="pc-label-header">
              <span className="pc-label-sun">☀</span>
              <span className="pc-label-brand">SAP</span>
            </div>
            <div className="pc-label-premium">— Premium —</div>
            <div className="pc-label-name-wrap">
              <span className="pc-label-name">{name}</span>
            </div>
            <div className="pc-label-tagline">with Sortex Quality</div>
          </div>
        </div>
        <span className="pc-badge">{catLabel}</span>
      </div>
      <div className="pc-body">
        <h3 className="pc-name">{name}</h3>
        <p className="pc-desc">{desc}</p>
        {Array.isArray(features) && features.length > 0 && (
          <div className="pc-tags">
            {features.map((f, fi) => (
              <span key={fi} className="pc-tag">{f}</span>
            ))}
          </div>
        )}
        <div className="pc-divider" />
        <div className="pc-packaging">
          <FaBoxOpen />
          <span>{t('products.availableIn')}</span>
        </div>
        <div className="pc-sizes">
          <span className="pc-size">{t('products.size30')}</span>
          <span className="pc-size">{t('products.size50')}</span>
        </div>
        <button className="pc-quote-btn" onClick={handleQuote}>
          {t('products.requestQuote')} <FaArrowRight />
        </button>
      </div>
    </motion.div>
  );
}

export default function Products() {
  const { t } = useTranslation();
  const [products, setProducts] = useState(fallback);
  const [showAll, setShowAll] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    fetch(`${API}/products`)
      .then((r) => r.json())
      .then(setProducts)
      .catch(() => {});
  }, []);

  const filtered = activeCategory === 'All'
    ? products
    : products.filter((p) => p.category === activeCategory);

  const visible = showAll ? filtered : filtered.slice(0, INITIAL_SHOW);

  return (
    <section className="section" id="products" style={{ background: 'var(--bg-alt)' }}>
      <div className="container">
        <h2 className="section-title">{t('products.title')}</h2>
        <p className="section-subtitle">{t('products.subtitle')}</p>

        {/* Show filter tabs only when expanded */}
        {showAll && (
          <motion.div
            className="products-filter"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                className={`products-filter-btn${activeCategory === cat ? ' active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat === 'All' ? t('products.allProducts') : t(`products.cat.${cat}`, { defaultValue: cat })}
              </button>
            ))}
          </motion.div>
        )}

        <div className="products-grid-v2" ref={ref}>
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <ProductCard key={p.id} p={p} i={i} inView={inView} />
            ))}
          </AnimatePresence>
        </div>

        {/* View All / Show Less button */}
        <div className="products-toggle-wrap">
          {!showAll && filtered.length > INITIAL_SHOW && (
            <button className="products-toggle-btn" onClick={() => setShowAll(true)}>
              {t('products.viewAll')} ({filtered.length}) <FaArrowRight />
            </button>
          )}
          {showAll && (
            <button className="products-toggle-btn products-toggle-btn--less" onClick={() => { setShowAll(false); setActiveCategory('All'); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); }}>
              <FaTimes /> {t('products.showLess')}
            </button>
          )}
        </div>

        <p className="products-packaging-note">{t('products.packagingNote')}</p>
      </div>
    </section>
  );
}
