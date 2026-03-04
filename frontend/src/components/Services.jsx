import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GiWheat, GiWaterMill, GiCardboardBoxClosed } from 'react-icons/gi';
import { FaTruckMoving, FaWarehouse } from 'react-icons/fa';

const serviceIcons = [GiWaterMill, GiWheat, GiCardboardBoxClosed, FaWarehouse, FaTruckMoving];

export default function Services() {
  const { t } = useTranslation();
  const services = t('services.list', { returnObjects: true });
  const [ref, inView] = useInView({ triggerOnce: true, threshold: .15 });

  return (
    <section className="section" id="services">
      <div className="container">
        <h2 className="section-title">{t('services.title')}</h2>
        <p className="section-subtitle">{t('services.subtitle')}</p>
        <div className="services-grid" ref={ref}>
          {services.map((s, i) => {
            const Icon = serviceIcons[i] || GiWheat;
            return (
              <motion.div
                key={i}
                className="service-card"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * .12, duration: .5 }}
              >
                <div className="service-icon"><Icon /></div>
                <h3>{s.name}</h3>
                <p>{s.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
