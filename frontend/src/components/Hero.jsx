import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useMemo, useState, useEffect, useRef } from 'react';

function GrainParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 5}s`,
        duration: `${5 + Math.random() * 4}s`,
        size: 4 + Math.random() * 10,
        glow: Math.random() > 0.7,
      })),
    []
  );

  return particles.map((p) => (
    <span
      key={p.id}
      className={`grain-particle${p.glow ? ' grain-glow' : ''}`}
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

const HERO_VIDEO = 'https://videos.pexels.com/video-files/8542775/8542775-hd_1920_1080_25fps.mp4';
const HERO_FALLBACK = 'https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1920';

const textVariants = {
  hidden: { opacity: 0, y: 60, filter: 'blur(8px)' },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { delay: 0.8 + i * 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  }),
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { delay: 2, duration: 0.6, type: 'spring', stiffness: 200 },
  },
};

export default function Hero() {
  const { t } = useTranslation();
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const handleCanPlay = () => setVideoLoaded(true);
    vid.addEventListener('canplaythrough', handleCanPlay);
    return () => vid.removeEventListener('canplaythrough', handleCanPlay);
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="hero" id="home">
      {/* Fallback image shown while video loads */}
      <div className={`hero-bg${videoLoaded ? ' hero-bg-fade' : ''}`}>
        <img
          src={HERO_FALLBACK}
          alt="Rice paddy fields"
          loading="eager"
        />
      </div>

      {/* Background video */}
      <div className={`hero-video-wrap${videoLoaded ? ' hero-video-visible' : ''}`}>
        <video
          ref={videoRef}
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
      </div>

      <div className="hero-overlay" />
      <div className="hero-scanlines" />
      <GrainParticles />

      <div className="hero-content">
        <motion.img
          className="hero-logo"
          src="/logo.webp"
          alt="Sunrise Agro Process logo"
          initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />

        <motion.h1
          custom={0}
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          {t('hero.taglineLine1')}
          <br />
          {t('hero.taglineLine2')}
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          custom={1}
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          Sunrise Agro Process — Premium Sortex Rice Milling
        </motion.p>

        <motion.div
          className="hero-badges"
          variants={badgeVariants}
          initial="hidden"
          animate="visible"
        >
          <span className="hero-badge">🌾 Sortex Cleaned</span>
          <span className="hero-badge">✅ FSSAI Certified</span>
          <span className="hero-badge">📦 35 Tons/Day Capacity</span>
        </motion.div>

        <motion.div
          className="hero-buttons"
          custom={2}
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          <button className="btn btn-accent hero-btn-glow" onClick={() => scrollTo('products')}>
            {t('hero.viewProducts')}
          </button>
          <button className="btn btn-outline hero-btn-outline" onClick={() => scrollTo('contact')}>
            {t('hero.contactUs')}
          </button>
        </motion.div>

        <motion.div
          className="hero-scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          onClick={() => scrollTo('about')}
        >
          <span className="hero-scroll-mouse">
            <span className="hero-scroll-wheel" />
          </span>
          <span className="hero-scroll-text">Scroll Down</span>
        </motion.div>
      </div>
    </section>
  );
}
