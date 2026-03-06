import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaCheck, FaCertificate } from 'react-icons/fa';

const percentages = [99, 98, 97, 96, 98];

export default function Quality() {
  const { t } = useTranslation();
  const items = t('quality.items', { returnObjects: true });
  const certs = t('quality.certifications', { returnObjects: true }) || [];
  const [ref, inView] = useInView({ triggerOnce: true, threshold: .2 });

  return (
    <section className="section" id="quality" style={{ background: 'var(--bg-alt)' }}>
      <div className="container">
        <h2 className="section-title">{t('quality.title')}</h2>
        <p className="section-subtitle">{t('quality.subtitle')}</p>

        {/* Certifications */}
        {certs.length > 0 && (
          <div className="quality-certs">
            <h3 className="quality-certs-title">{t('quality.certTitle')}</h3>
            <div className="quality-certs-grid">
              {certs.map((cert, i) => (
                <motion.div
                  key={i}
                  className="quality-cert-card"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                >
                  <FaCertificate className="cert-icon" />
                  <span>{cert}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        <div className="quality-list" ref={ref}>
          {items.map((item, i) => (
            <motion.div
              key={i}
              className="quality-item"
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * .15, duration: .5 }}
            >
              <div className="quality-check"><FaCheck /></div>
              <div className="quality-bar-wrap">
                <h4>{item}</h4>
                <div className="quality-bar">
                  <div
                    className="quality-bar-fill"
                    style={{ width: inView ? `${percentages[i]}%` : '0%' }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
