import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaCheck } from 'react-icons/fa';

const percentages = [95, 98, 97, 96];

export default function Quality() {
  const { t } = useTranslation();
  const items = t('quality.items', { returnObjects: true });
  const [ref, inView] = useInView({ triggerOnce: true, threshold: .2 });

  return (
    <section className="section" id="quality" style={{ background: 'var(--bg-alt)' }}>
      <div className="container">
        <h2 className="section-title">{t('quality.title')}</h2>
        <p className="section-subtitle">{t('quality.subtitle')}</p>
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
