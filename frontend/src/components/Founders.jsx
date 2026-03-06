import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaBriefcase, FaClock } from 'react-icons/fa';

const founders = [
  {
    key: 'rajesh',
    initials: 'RT',
    exp: '15+',
    tags: ['Quality Assessment', 'Sales', 'Milling Operations', '3 Trading Companies'],
  },
  {
    key: 'kinjal',
    initials: 'KF',
    exp: '10+',
    tags: ['Procurement', 'Supplier Coordination', 'Business Management', 'Operations'],
  },
];

export default function Founders() {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section" id="founders" style={{ background: 'var(--bg-alt)' }}>
      <div className="container">
        <p className="section-label">{t('founders.label')}</p>
        <h2 className="section-title">{t('founders.title')}</h2>
        <p className="section-subtitle">{t('founders.subtitle')}</p>

        <div className="fdr-grid" ref={ref}>
          {founders.map((f, i) => (
            <motion.div
              key={f.key}
              className="fdr-card"
              initial={{ opacity: 0, x: i === 0 ? -40 : 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.2, duration: 0.6 }}
            >
              <div className="fdr-top">
                <div className="fdr-avatar">{f.initials}</div>
                <div className="fdr-meta">
                  <h3 className="fdr-name">{t(`founders.${f.key}.name`)}</h3>
                  <span className="fdr-role"><FaBriefcase /> {t(`founders.${f.key}.role`)}</span>
                </div>
                <div className="fdr-exp-pill">
                  <FaClock />
                  <strong>{f.exp}</strong> {t('founders.yearsExp')}
                </div>
              </div>

              <p className="fdr-desc">{t(`founders.${f.key}.desc`)}</p>

              <div className="fdr-tags">
                {f.tags.map((tag, ti) => (
                  <span key={ti} className="fdr-tag">{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
