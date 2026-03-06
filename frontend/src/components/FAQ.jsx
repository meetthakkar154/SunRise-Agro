import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiChevronDown } from 'react-icons/fi';

export default function FAQ() {
  const { t } = useTranslation();
  const list = t('faq.list', { returnObjects: true });
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [open, setOpen] = useState(null);

  return (
    <section className="section" id="faq" style={{ background: 'var(--bg-alt)' }}>
      <div className="container">
        <h2 className="section-title">{t('faq.title')}</h2>
        <p className="section-subtitle">{t('faq.subtitle')}</p>
        <div className="faq-list" ref={ref}>
          {list.map((item, i) => (
            <motion.div
              key={i}
              className={`faq-item ${open === i ? 'faq-open' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <button
                className="faq-question"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span>{item.q}</span>
                <FiChevronDown className={`faq-chevron ${open === i ? 'faq-chevron-open' : ''}`} />
              </button>
              <div className={`faq-answer ${open === i ? 'faq-answer-open' : ''}`}>
                <p>{item.a}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
