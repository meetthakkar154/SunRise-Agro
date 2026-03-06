import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaFileAlt } from 'react-icons/fa';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function Contact() {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: .2 });
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${API}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.errors?.[0]?.msg || 'Something went wrong');
        return;
      }
      setSent(true);
      setForm({ name: '', phone: '', email: '', message: '' });
      setTimeout(() => setSent(false), 4000);
    } catch {
      setError('Network error. Please try again.');
    }
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        <h2 className="section-title">{t('contact.title')}</h2>
        <p className="section-subtitle">{t('contact.subtitle')}</p>
        <div className="contact-wrapper" ref={ref}>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: .6 }}
          >
            <div className="contact-info-item">
              <span className="contact-icon"><FaMapMarkerAlt /></span>
              <div><strong>Address</strong><p>{t('contact.address')}</p></div>
            </div>
            <div className="contact-info-item">
              <span className="contact-icon"><FaPhoneAlt /></span>
              <div>
                <strong>Phone / WhatsApp</strong>
                <p>{t('contact.phone')}</p>
                <p>{t('contact.phone2')}</p>
              </div>
            </div>
            <div className="contact-info-item">
              <span className="contact-icon"><FaEnvelope /></span>
              <div><strong>Email</strong><p>{t('contact.email')}</p></div>
            </div>
            <div className="contact-info-item">
              <span className="contact-icon"><FaClock /></span>
              <div><strong>Working Hours</strong><p>{t('contact.hours')}</p></div>
            </div>
            <div className="contact-info-item">
              <span className="contact-icon"><FaFileAlt /></span>
              <div><strong>{t('contact.gstLabel')}</strong><p>{t('contact.gst')}</p></div>
            </div>
            <div className="map-wrapper">
              <iframe
                title="Sunrise Agro Process Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.4!2d72.663069!3d22.3496243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395f01ff53c0926b%3A0x840f447190ff7b93!2sSUNRISE%20AGRO%20PROCESS!5e0!3m2!1sen!2sin!4v1709654400000"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: .6, delay: .2 }}
          >
            <form className="form" onSubmit={handleSubmit}>
              <input name="name" placeholder={t('contact.formName')} value={form.name} onChange={handleChange} required />
              <input name="phone" placeholder={t('contact.formPhone')} value={form.phone} onChange={handleChange} required />
              <input name="email" type="email" placeholder={t('contact.formEmail')} value={form.email} onChange={handleChange} required />
              <textarea name="message" placeholder={t('contact.formMessage')} value={form.message} onChange={handleChange} required />
              <button type="submit" className="btn btn-primary">{t('contact.send')}</button>
              {sent && <p style={{ color: 'var(--primary)', fontWeight: 600 }}>{t('contact.success')}</p>}
              {error && <p style={{ color: '#d32f2f', fontWeight: 600 }}>{error}</p>}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
