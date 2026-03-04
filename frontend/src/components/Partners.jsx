import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaHandshake } from 'react-icons/fa';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function Partners() {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: .2 });
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${API}/partners`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    } catch { /* handled */ }
    setSent(true);
    setForm({ name: '', phone: '', email: '', message: '' });
    setTimeout(() => setSent(false), 4000);
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
                <textarea name="message" placeholder={t('partners.formMessage')} value={form.message} onChange={handleChange} required />
                <button type="submit" className="btn btn-primary">{t('partners.formSubmit')}</button>
                {sent && <p style={{ color: 'var(--primary)', fontWeight: 600 }}>✓ Submitted!</p>}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
