import { useState, useEffect } from 'react';
import countryCodes from '../i18n/countryCodes.json';
import phoneLengths from '../constants/phoneLengths';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaHandshake, FaChevronDown } from 'react-icons/fa';

const API = import.meta.env.VITE_API_URL || '/api';

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
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [form, setForm] = useState({ name: '', countryCode: '+91', phone: '', email: '', city: '', pincode: '', products: [], message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

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

  useEffect(() => {
    if (!dropdownOpen) return undefined;

    const scrollY = window.scrollY;
    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyPosition = document.body.style.position;
    const previousBodyTop = document.body.style.top;
    const previousBodyWidth = document.body.style.width;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.position = previousBodyPosition;
      document.body.style.top = previousBodyTop;
      document.body.style.width = previousBodyWidth;
      window.scrollTo(0, scrollY);
    };
  }, [dropdownOpen]);

  const getPhoneMaxLength = (code) => phoneLengths[code] || 10;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, getPhoneMaxLength(form.countryCode));
      setForm({ ...form, phone: digitsOnly });
      return;
    }

    if (name === 'pincode') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 6);
      setForm({ ...form, pincode: digitsOnly });
      return;
    }

    setForm({ ...form, [name]: value });
  };

  const toggleProduct = (name) => {
    setForm((prev) => ({
      ...prev,
      products: prev.products.includes(name)
        ? prev.products.filter((product) => product !== name)
        : [...prev.products, name],
    }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = t('partners.validation.name');
    if (!form.countryCode) errs.countryCode = 'Country code required';

    const phoneLen = getPhoneMaxLength(form.countryCode);
    const phoneRegex = new RegExp(`^[0-9]{${phoneLen}}$`);
    if (!phoneRegex.test(form.phone.trim())) errs.phone = `${t('partners.validation.phone')} (${phoneLen} digits required)`;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errs.email = t('partners.validation.email');
    if (!form.city.trim()) errs.city = t('partners.validation.city');
    if (!/^[0-9]{6}$/.test(form.pincode.trim())) errs.pincode = t('partners.validation.pincode');
    if (form.products.length === 0) errs.products = t('partners.validation.products');
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const errs = validate();
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
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
      setForm({ name: '', countryCode: '+91', phone: '', email: '', city: '', pincode: '', products: [], message: '' });
      setFieldErrors({});
      setTimeout(() => setSent(false), 4000);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
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
            transition={{ duration: 0.6 }}
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
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {showForm && (
              <form className="form" onSubmit={handleSubmit}>
                <div className="form-field">
                  <input name="name" placeholder={t('partners.formName')} value={form.name} onChange={handleChange} />
                  {fieldErrors.name && <span className="field-error">{fieldErrors.name}</span>}
                </div>
                <div className="form-field" style={{ display: 'flex', gap: '8px' }}>
                  <div style={{ display: 'flex', width: '100%' }}>
                    <select
                      name="countryCode"
                      value={form.countryCode}
                      onChange={handleChange}
                      style={{
                        border: '1px solid var(--border)',
                        borderRadius: '12px',
                        padding: '0 12px',
                        height: '48px',
                        fontSize: '16px',
                        marginRight: '8px',
                        minWidth: '140px',
                        background: 'var(--bg)',
                        color: 'var(--text)',
                        outline: 'none',
                      }}
                    >
                      {countryCodes.map((c) => (
                        <option key={c.code} value={c.code}>{c.name} ({c.code})</option>
                      ))}
                    </select>
                    <input
                      name="phone"
                      type="tel"
                      inputMode="numeric"
                      placeholder={t('partners.formPhone')}
                      value={form.phone}
                      onChange={handleChange}
                      maxLength={getPhoneMaxLength(form.countryCode)}
                      style={{
                        border: '1px solid var(--border)',
                        borderRadius: '12px',
                        padding: '0 12px',
                        height: '48px',
                        fontSize: '16px',
                        flex: 1,
                        background: 'var(--bg)',
                        color: 'var(--text)',
                        outline: 'none',
                      }}
                    />
                  </div>
                  {fieldErrors.countryCode && <span className="field-error">{fieldErrors.countryCode}</span>}
                  {fieldErrors.phone && <span className="field-error">{fieldErrors.phone}</span>}
                </div>
                <div className="form-field">
                  <input name="email" type="email" placeholder={t('partners.formEmail')} value={form.email} onChange={handleChange} />
                  {fieldErrors.email && <span className="field-error">{fieldErrors.email}</span>}
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <input name="city" placeholder={t('partners.formCity')} value={form.city} onChange={handleChange} />
                    {fieldErrors.city && <span className="field-error">{fieldErrors.city}</span>}
                  </div>
                  <div className="form-field">
                    <input name="pincode" inputMode="numeric" placeholder={t('partners.formPincode')} value={form.pincode} onChange={handleChange} maxLength={6} />
                    {fieldErrors.pincode && <span className="field-error">{fieldErrors.pincode}</span>}
                  </div>
                </div>

                <div className={`product-multiselect${dropdownOpen ? ' open' : ''}`}>
                  <button type="button" className="product-multiselect-toggle" onClick={() => setDropdownOpen(!dropdownOpen)}>
                    <span>
                      {form.products.length > 0
                        ? `${form.products.length} ${t('partners.productsSelected')}`
                        : t('partners.formProducts')}
                    </span>
                    <FaChevronDown className="pms-chevron" />
                  </button>
                  {dropdownOpen && <button type="button" className="pms-backdrop" aria-label="Close product selector" onClick={() => setDropdownOpen(false)} />}
                  {dropdownOpen && (
                    <div className="product-multiselect-menu">
                      <div className="pms-mobile-header">
                        <strong>{t('partners.formProducts')}</strong>
                        <button type="button" className="pms-close-btn" onClick={() => setDropdownOpen(false)}>
                          Done
                        </button>
                      </div>
                      <div className="pms-options-list">
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
                    </div>
                  )}
                  {form.products.length > 0 && (
                    <div className="pms-selected-tags">
                      {form.products.map((name) => (
                        <span key={name} className="pms-tag" onClick={() => toggleProduct(name)}>
                          {name} x
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {fieldErrors.products && <span className="field-error" style={{ marginTop: '-0.5rem' }}>{fieldErrors.products}</span>}

                <div className="form-field">
                  <textarea name="message" placeholder={t('partners.formMessage')} value={form.message} onChange={handleChange} />
                  {fieldErrors.message && <span className="field-error">{fieldErrors.message}</span>}
                </div>
                <div style={{ textAlign: 'center' }}>
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? <span className="spinner" /> : t('partners.formSubmit')}
                  </button>
                </div>
                {sent && <p style={{ color: 'var(--primary)', fontWeight: 600 }}>Success: {t('partners.submitted') || 'Submitted!'}</p>}
                {error && <p style={{ color: '#d32f2f', fontWeight: 600 }}>{error}</p>}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
