import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GiWheat, GiRiceCooker, GiWaterMill, GiGemChain, GiCardboardBoxClosed } from 'react-icons/gi';
import { MdCleaningServices } from 'react-icons/md';

const icons = [MdCleaningServices, GiWheat, GiWaterMill, GiRiceCooker, GiGemChain, GiCardboardBoxClosed];

export default function Process() {
  const { t } = useTranslation();
  const steps = t('process.steps', { returnObjects: true });
  const [ref, inView] = useInView({ triggerOnce: true, threshold: .15 });

  return (
    <section className="section" id="process">
      <div className="container">
        <h2 className="section-title">{t('process.title')}</h2>
        <p className="section-subtitle">{t('process.subtitle')}</p>
        <div className="process-timeline" ref={ref}>
          {steps.map((step, i) => {
            const Icon = icons[i] || GiWheat;
            return (
              <motion.div
                key={i}
                className="process-step"
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * .15, duration: .5 }}
              >
                <div className="process-icon"><Icon /></div>
                <div className="process-content">
                  <h3>{step.name}</h3>
                  <p>{step.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
