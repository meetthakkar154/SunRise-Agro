import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaIndustry, FaCogs, FaWarehouse, FaTruckMoving, FaSortAmountDown } from 'react-icons/fa';
import { GiWheat } from 'react-icons/gi';

const highlightIcons = [FaIndustry, GiWheat, FaCogs, FaSortAmountDown, FaWarehouse, FaTruckMoving];
const highlightColors = ['#2e7d32', '#e65100', '#1565c0', '#6a1b9a', '#00838f', '#c62828'];

export default function Infrastructure() {
  const { t } = useTranslation();
  const highlights = t('infrastructure.highlights', { returnObjects: true }) || [];
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section className="section" id="infrastructure">
      <div className="container">
        <h2 className="section-title">{t('infrastructure.title')}</h2>
        <p className="section-subtitle">{t('infrastructure.subtitle')}</p>
        <p className="infra-intro">{t('infrastructure.intro')}</p>

        <div className="infra-grid" ref={ref}>
          {highlights.map((item, i) => {
            const Icon = highlightIcons[i] || FaIndustry;
            const color = highlightColors[i] || '#2e7d32';
            return (
              <motion.div
                key={i}
                className="infra-card"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="infra-card-icon" style={{ background: `${color}15`, color }}>
                  <Icon />
                </div>
                <div>
                  <strong className="infra-card-label">{item.label}</strong>
                  <p>{item.value}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
