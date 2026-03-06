import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaHandshake, FaChevronDown } from 'react-icons/fa';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const productList = [
  'Wadakolam Rice', 'Wadakolam Old Rice', 'Kali Muchh Rice', 'Gujarat-13 Rice',
  'Gujarat-17 Rice', 'Krishna Kamod Rice', 'Lachkari Rice', 'Kasturi Rice',
  'Wadakolam Poniya', 'Kali Muchh Poniya', 'Gujarat-13 Poniya', 'Gujarat-17 Poniya',
  'Krishna Kamod Poniya', 'Lachkari Poniya',
  'Wadakolam Vatla', 'Kali Muchh Vatla', 'Gujarat-13 Vatla', 'Gujarat-17 Vatla',
  'Krishna Kamod Vatla', 'Lachkari Vatla',
  'MP Sharbati Wheat', 'Bhaliya Wheat', 'Green Gold Bajri',
];

export default function Partners() {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: .2 });
  const [form, setForm] = useState({ name: '', phone: '', email: '', city: '', pincode: '', products: [], message: '' });
  const [sent, setSent] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  /* Listen for product quote requests from ProductCard */
  useEffect(() => {
    const handler = (e) => {
      const productName = e.detail;
      setShowForm(true);
      setForm((prev) => ({
        ...prev,
        products: prev.products.includes(productName) ? prev.products : [...prev.products, productName],
      }));
    };
    window.addEventListener('requestQuote', handler);
    return () => window.removeEventListener('requestQuote', handler);
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const toggleProduct = (name) => {
    setForm((prev) => ({
      ...prev,
      products: prev.products.includes(name)
        ? prev.products.filter((p) => p !== name)
        : [...prev.products, name],
    }));
  };

  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${API}/partners`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, products: form.products.join(', ') }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.errors?.[0]?.msg || 'Something went wrong');
        return;
      }
      setSent(true);
      setForm({ name: '', phone: '', email: '', city: '', pincode: '', products: [], message: '' });
      setTimeout(() => setSent(false), 4000);
    } catch {
      setError('Network error. Please try again.');
    }
  };

  return (
    <section className="section" id="partners">
      <div className="container">
        <h2 className="section-title">{t('partners.title')}</h2>
        <p className="section-subtitle">{t('partners.subtitle')}</p>
        <div className="partners-wrapper" ref={ref}>
          <motion.div
            className="partner-text"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: .6 }}
          >
            <FaHandshake style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '1rem' }} />
            <p>{t('partners.text')}</p>
            {!showForm && (
              <button className="btn btn-primary" onClick={() => setShowForm(true)}>
                {t('partners.becomePartner')}
              </button>
            )}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: .6, delay: .2 }}
          >
            {showForm && (
              <form className="form" onSubmit={handleSubmit}>
                <input name="name" placeholder={t('partners.formName')} value={form.name} onChange={handleChange} required />
                <input name="phone" placeholder={t('partners.formPhone')} value={form.phone} onChange={handleChange} required />
                <input name="email" type="email" placeholder={t('partners.formEmail')} value={form.email} onChange={handleChange} required />

                {/* City & Pincode row */}
                <div className="form-row">
                  <input name="city" placeholder={t('partners.formCity')} value={form.city} onChange={handleChange} required />
                  <input name="pincode" placeholder={t('partners.formPincode')} value={form.pincode} onChange={handleChange} required pattern="[0-9]{6}" maxLength={6} />
                </div>

                {/* Multi-select Products */}
                <div className={`product-multiselect${dropdownOpen ? ' open' : ''}`}>
                  <button type="button" className="product-multiselect-toggle" onClick={() => setDropdownOpen(!dropdownOpen)}>
                    <span>
                      {form.products.length > 0
                        ? `${form.products.length} ${t('partners.productsSelected')}`
                        : t('partners.formProducts')}
                    </span>
                    <FaChevronDown className="pms-chevron" />
                  </button>
                  {dropdownOpen && (
                    <div className="product-multiselect-menu">
                      {productList.map((name) => (
                        <label key={name} className="pms-option">
                          <input
                            type="checkbox"
                            checked={form.products.includes(name)}
                            onChange={() => toggleProduct(name)}
                          />
                          <span>{name}</span>
                        </label>
                      ))}
                    </div>
                  )}
                  {form.products.length > 0 && (
                    <div className="pms-selected-tags">
                      {form.products.map((name) => (
                        <span key={name} className="pms-tag" onClick={() => toggleProduct(name)}>
                          {name} ×
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <textarea name="message" placeholder={t('partners.formMessage')} value={form.message} onChange={handleChange} required />
                <button type="submit" className="btn btn-primary">{t('partners.formSubmit')}</button>
                {sent && <p style={{ color: 'var(--primary)', fontWeight: 600 }}>✓ {t('partners.submitted') || 'Submitted!'}</p>}
                {error && <p style={{ color: '#d32f2f', fontWeight: 600 }}>{error}</p>}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
