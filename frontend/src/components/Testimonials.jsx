import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

export default function Testimonials() {
  const { t } = useTranslation();
  const list = t('testimonials.list', { returnObjects: true });
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section" id="testimonials">
      <div className="container">
        <h2 className="section-title">{t('testimonials.title')}</h2>
        <p className="section-subtitle">{t('testimonials.subtitle')}</p>
        <div className="testimonials-grid" ref={ref}>
          {list.map((item, i) => (
            <motion.div
              key={i}
              className="testimonial-card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              <FaQuoteLeft className="testimonial-quote" />
              <p className="testimonial-comment">{item.comment}</p>
              <div className="testimonial-stars">
                {Array.from({ length: item.rating }, (_, si) => (
                  <FaStar key={si} />
                ))}
              </div>
              <div className="testimonial-author">
                <div className="testimonial-avatar">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <h4>{item.name}</h4>
                  <p>{item.business}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
