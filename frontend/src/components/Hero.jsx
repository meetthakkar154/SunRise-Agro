import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useMemo } from 'react';

function GrainParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 5}s`,
        duration: `${5 + Math.random() * 4}s`,
        size: 6 + Math.random() * 8,
      })),
    []
  );

  return particles.map((p) => (
    <span
      key={p.id}
      className="grain-particle"
      style={{
        left: p.left,
        animationDelay: p.delay,
        animationDuration: p.duration,
        width: p.size,
        height: p.size * 1.6,
      }}
    />
  ));
}

export default function Hero() {
  const { t } = useTranslation();

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="hero" id="home">
      <div className="hero-bg">
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80"
          alt="Rice fields"
          loading="eager"
        />
      </div>
      <div className="hero-overlay" />
      <GrainParticles />
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .8, ease: 'easeOut' }}
      >
        <img className="hero-logo" src="/logo.png" alt="Sun Agro Process logo" />
        <h1>{t('hero.tagline')}</h1>
        <p>Sun Agro Process (SAP)</p>
        <div className="hero-buttons">
          <button className="btn btn-accent" onClick={() => scrollTo('products')}>
            {t('hero.viewProducts')}
          </button>
          <button className="btn btn-outline" style={{ borderColor: '#fff', color: '#fff' }} onClick={() => scrollTo('contact')}>
            {t('hero.contactUs')}
          </button>
        </div>
      </motion.div>
    </section>
  );
}
