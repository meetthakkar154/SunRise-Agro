import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaCheck } from 'react-icons/fa';

const stepImages = [
  '/s1.webp',
  '/s2.webp',
  '/s3.webp',
  '/s4.webp',
  '/s5.webp',
];

export default function Process() {
  const { t } = useTranslation();
  const steps = t('process.steps', { returnObjects: true });
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section className="section" id="process">
      <div className="container">
        <p className="section-label">{t('process.label') || 'Processing Excellence'}</p>
        <h2 className="section-title">{t('process.title')}</h2>
        <p className="section-subtitle">{t('process.subtitle')}</p>

        <div className="ptl" ref={ref}>
          {/* Vertical center line */}
          <div className="ptl-line" />

          {steps.map((step, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={i}
                className={`ptl-row ${isLeft ? 'ptl-row--left' : 'ptl-row--right'}`}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.2, duration: 0.5 }}
              >
                {/* Left side */}
                <div className="ptl-left">
                  {isLeft ? (
                    <div className="ptl-card">
                      <div className="ptl-num">{i + 1}</div>
                      <h3 className="ptl-name">{step.name}</h3>
                      <p className="ptl-desc">{step.desc}</p>
                    </div>
                  ) : (
                    <div className="ptl-img">
                      <img src={stepImages[i]} alt={step.name} loading="lazy" />
                    </div>
                  )}
                </div>

                {/* Center check dot */}
                <div className="ptl-center">
                  <div className="ptl-dot">
                    <FaCheck />
                  </div>
                </div>

                {/* Right side */}
                <div className="ptl-right">
                  {isLeft ? (
                    <div className="ptl-img">
                      <img src={stepImages[i]} alt={step.name} loading="lazy" />
                    </div>
                  ) : (
                    <div className="ptl-card">
                      <div className="ptl-num">{i + 1}</div>
                      <h3 className="ptl-name">{step.name}</h3>
                      <p className="ptl-desc">{step.desc}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
