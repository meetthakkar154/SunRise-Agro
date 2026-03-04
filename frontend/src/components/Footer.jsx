import { useTranslation } from 'react-i18next';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaDownload } from 'react-icons/fa';

const sections = ['home', 'about', 'products', 'process', 'gallery', 'services', 'quality', 'partners', 'contact'];

export default function Footer() {
  const { t } = useTranslation();
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <div className="footer-logo">
              <img src="/logo.png" alt="SAP Logo" />
              Sun Agro Process
            </div>
            <p style={{ fontSize: '.9rem', opacity: .8, marginBottom: '1rem', lineHeight: 1.7 }}>
              Trusted agro-processing company specializing in rice milling and agricultural product processing.
            </p>
            <a href="/catalog.pdf" download className="btn btn-outline" style={{ borderColor: 'var(--footer-text)', color: 'var(--footer-text)', fontSize: '.85rem', padding: '.5rem 1.2rem' }}>
              <FaDownload /> {t('catalog')}
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4>{t('footer.quickLinks')}</h4>
            <ul>
              {sections.slice(0, 5).map((s) => (
                <li key={s}><a href={`#${s}`} onClick={() => scrollTo(s)}>{t(`nav.${s}`)}</a></li>
              ))}
            </ul>
          </div>

          {/* Products link */}
          <div>
            <h4>{t('footer.ourProducts')}</h4>
            <ul>
              <li><a href="#products" onClick={() => scrollTo('products')}>Rice (Chokha)</a></li>
              <li><a href="#products" onClick={() => scrollTo('products')}>Basmati Rice</a></li>
              <li><a href="#products" onClick={() => scrollTo('products')}>Sona Masuri</a></li>
              <li><a href="#products" onClick={() => scrollTo('products')}>Broken Rice</a></li>
              <li><a href="#products" onClick={() => scrollTo('products')}>Steam Rice</a></li>
            </ul>
          </div>

          {/* Contact + Social */}
          <div>
            <h4>{t('footer.contactInfo')}</h4>
            <ul>
              <li>{t('contact.address')}</li>
              <li>{t('contact.phone')}</li>
              <li>{t('contact.email')}</li>
            </ul>
            <h4 style={{ marginTop: '1.2rem' }}>{t('footer.followUs')}</h4>
            <div className="footer-social">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">{t('footer.rights')}</div>
      </div>
    </footer>
  );
}
