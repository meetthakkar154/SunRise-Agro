import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaCheck, FaBullseye, FaIndustry, FaMicrochip, FaUsers, FaSeedling } from 'react-icons/fa';

const images = [
  'https://images.pexels.com/photos/5538162/pexels-photo-5538162.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  'https://images.pexels.com/photos/4110251/pexels-photo-4110251.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  'https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  'https://images.pexels.com/photos/2889440/pexels-photo-2889440.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
];

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
});

export default function About() {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const valuesList = t('about.valuesList', { returnObjects: true });

  return (
    <section className="section" id="about">
      <div className="container">
        <h2 className="section-title">{t('about.title')}</h2>

        {/* Top: Intro + Images */}
        <div className="about-top" ref={ref}>
          <motion.div className="about-text" variants={fadeUp(0)} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <p>{t('about.intro')}</p>
            <p>{t('about.intro2')}</p>
          </motion.div>
          <motion.div className="about-images" variants={fadeUp(0.2)} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            {images.map((src, i) => (
              <img key={i} src={src} alt={`About ${i + 1}`} loading="lazy" />
            ))}
          </motion.div>
        </div>

        {/* Stats Row */}
        <motion.div className="about-stats-row" variants={fadeUp(0.15)} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          <div className="about-stat">
            <div className="about-stat-icon"><FaIndustry /></div>
            <div>
              <strong>35 Tons / Day</strong>
              <span>Daily Milling Capacity</span>
            </div>
          </div>
          <div className="about-stat">
            <div className="about-stat-icon"><FaMicrochip /></div>
            <div>
              <strong>Milltech + QED Sortex</strong>
              <span>Advanced Technology</span>
            </div>
          </div>
          <div className="about-stat">
            <div className="about-stat-icon"><FaUsers /></div>
            <div>
              <strong>15+ Years</strong>
              <span>Industry Experience</span>
            </div>
          </div>
          <div className="about-stat">
            <div className="about-stat-icon"><FaSeedling /></div>
            <div>
              <strong>20+ Varieties</strong>
              <span>Rice, Wheat & Bajri</span>
            </div>
          </div>
        </motion.div>

        {/* Mission + Values Cards */}
        <div className="about-cards-row">
          <motion.div className="about-card about-card--mission" variants={fadeUp(0.25)} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <div className="about-card-header">
              <FaBullseye />
              <h3>{t('about.mission')}</h3>
            </div>
            <p>{t('about.missionText')}</p>
          </motion.div>

          <motion.div className="about-card about-card--values" variants={fadeUp(0.35)} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <h3>{t('about.values')}</h3>
            <div className="about-values-grid">
              {valuesList.map((val, i) => (
                <div key={i} className="about-value-item">
                  <FaCheck />
                  <span>{val}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Our Story */}
        <motion.div className="about-story" variants={fadeUp(0.4)} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          <h3 className="about-story-title">{t('about.storyTitle')}</h3>
          <p>{t('about.story')}</p>
        </motion.div>
      </div>
    </section>
  );
}
