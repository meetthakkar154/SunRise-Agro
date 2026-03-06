import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GiWheat, GiCardboardBoxClosed } from 'react-icons/gi';
import { FaTruckMoving, FaWarehouse, FaShieldAlt, FaChartBar, FaTimes, FaCheckCircle, FaArrowRight, FaHandshake } from 'react-icons/fa';
import { MdCleaningServices } from 'react-icons/md';

const serviceIcons = [MdCleaningServices, GiCardboardBoxClosed, FaHandshake, FaChartBar, FaWarehouse, FaShieldAlt];
const cardAccents = [
  ['#2e7d32', '#66bb6a'],
  ['#1565c0', '#42a5f5'],
  ['#e65100', '#ff9800'],
  ['#6a1b9a', '#ab47bc'],
  ['#00838f', '#26c6da'],
  ['#c62828', '#ef5350'],
];

export default function Services() {
  const { t } = useTranslation();
  const services = t('services.list', { returnObjects: true });
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [selected, setSelected] = useState(null);

  const openModal = useCallback((i) => {
    setSelected(i);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setSelected(null);
    document.body.style.overflow = '';
  }, []);

  return (
    <section className="section" id="services">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {t('services.title')}
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {t('services.subtitle')}
        </motion.p>

        <div className="services-grid" ref={ref}>
          {services.map((s, i) => {
            const Icon = serviceIcons[i] || GiWheat;
            const [c1, c2] = cardAccents[i] || cardAccents[0];
            return (
              <motion.div
                key={i}
                className="service-card"
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5, ease: 'easeOut' }}
                onClick={() => openModal(i)}
                style={{ '--accent': c1, '--accent-light': c2 }}
              >
                <div className="service-card-accent" style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }} />
                <div className="service-card-body">
                  <div className="service-icon-wrap" style={{ background: `linear-gradient(135deg, ${c1}18, ${c2}25)` }}>
                    <Icon style={{ color: c1 }} />
                  </div>
                  <h3>{s.name}</h3>
                  <p>{s.desc}</p>
                  <span className="service-learn-more" style={{ color: c1 }}>
                    {t('services.learnMore')} <FaArrowRight />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            className="service-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeModal}
          >
            <motion.div
              className="service-modal"
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const s = services[selected];
                const Icon = serviceIcons[selected] || GiWheat;
                const [c1, c2] = cardAccents[selected] || cardAccents[0];
                return (
                  <>
                    <div className="service-modal-header" style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}>
                      <div className="service-modal-icon">
                        <Icon />
                      </div>
                      <h3>{s.name}</h3>
                      <button className="service-modal-close" onClick={closeModal}>
                        <FaTimes />
                      </button>
                    </div>
                    <div className="service-modal-content">
                      <p className="service-modal-desc">{s.details}</p>
                      {s.highlights && (
                        <div className="service-modal-highlights">
                          <h4>{t('services.highlights')}</h4>
                          <ul>
                            {s.highlights.map((h, hi) => (
                              <li key={hi}>
                                <FaCheckCircle style={{ color: c1, flexShrink: 0 }} />
                                <span>{h}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
