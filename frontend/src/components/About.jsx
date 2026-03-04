import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const images = [
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1530836176759-510f58baebf4?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1586201375761-83865001e31d?auto=format&fit=crop&w=600&q=80',
];

const slideIn = { hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0, transition: { duration: .6 } } };
const slideRight = { hidden: { opacity: 0, x: 60 }, visible: { opacity: 1, x: 0, transition: { duration: .6 } } };

export default function About() {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: .2 });

  return (
    <section className="section" id="about">
      <div className="container">
        <h2 className="section-title">{t('about.title')}</h2>
        <div className="about-grid" ref={ref}>
          <motion.div variants={slideIn} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>{t('about.intro')}</p>
            <div className="about-card">
              <h3>{t('about.mission')}</h3>
              <p>{t('about.missionText')}</p>
            </div>
            <div className="about-card">
              <h3>{t('about.vision')}</h3>
              <p>{t('about.visionText')}</p>
            </div>
            <div className="about-card">
              <h3>{t('about.values')}</h3>
              <p>{t('about.valuesText')}</p>
            </div>
          </motion.div>
          <motion.div className="about-images" variants={slideRight} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            {images.map((src, i) => (
              <img key={i} src={src} alt={`About ${i + 1}`} loading="lazy" />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
