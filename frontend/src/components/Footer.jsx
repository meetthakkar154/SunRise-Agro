import { useTranslation } from 'react-i18next';
import { FaWhatsapp, FaDownload } from 'react-icons/fa';

const sections = ['home', 'about', 'products', 'process', 'infrastructure', 'services', 'quality', 'contact'];

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
              <img src="/logo.webp" alt="Sunrise Agro Process Logo" />
              Sunrise Agro Process
            </div>
            <p style={{ fontSize: '.9rem', opacity: .8, marginBottom: '1rem', lineHeight: 1.7 }}>
              Sunrise Agro Process is a Khambhat, Gujarat based Sortex rice milling company specializing in premium rice, wheat, and bajri for wholesalers and bulk buyers across India.
            </p>
            <a
              href="/SAP_Catalog.pdf"
              download="SAP_Catalog.pdf"
              className="btn btn-download-catalog"
              style={{
                background: 'var(--footer-text)',
                color: 'var(--footer-bg)',
                fontWeight: 600,
                fontSize: '.95rem',
                padding: '.65rem 1.5rem',
                borderRadius: '2rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '.6rem',
                marginTop: '0.7rem',
                border: 'none',
                boxShadow: '0 2px 8px rgba(0,0,0,0.07)'
              }}
            >
              <FaDownload style={{ fontSize: '1.1em' }} />
              {t('footer.downloadCatalog', 'Download Catalog')}
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
              <li><a href="#products" onClick={() => scrollTo('products')}>Wadakolam Rice</a></li>
              <li><a href="#products" onClick={() => scrollTo('products')}>Kali Muchh Rice</a></li>
              <li><a href="#products" onClick={() => scrollTo('products')}>Krishna Kamod</a></li>
              <li><a href="#products" onClick={() => scrollTo('products')}>Gujarat-17 Rice</a></li>
              <li><a href="#products" onClick={() => scrollTo('products')}>Lachkari Rice</a></li>
              <li><a href="#products" onClick={() => scrollTo('products')}>MP Sharbati Wheat</a></li>
              <li><a href="#products" onClick={() => scrollTo('products')}>Green Gold Bajri</a></li>
            </ul>
          </div>

          {/* Contact + WhatsApp */}
          <div>
            <h4>{t('footer.contactInfo')}</h4>
            <ul>
              <li>{t('contact.address')}</li>
              <li><a href={`tel:${t('contact.phone').replace(/\s+/g, '')}`} style={{ color: 'inherit', textDecoration: 'underline' }}>{t('contact.phone')}</a></li>
              <li><a href={`tel:${t('contact.phone2').replace(/\s+/g, '')}`} style={{ color: 'inherit', textDecoration: 'underline' }}>{t('contact.phone2')}</a></li>
              <li><a href={`mailto:${t('contact.email')}`} style={{ color: 'inherit', textDecoration: 'underline' }}>{t('contact.email')}</a></li>
              <li>{t('contact.hours')}</li>
              <li><strong>{t('contact.gstLabel')}:</strong> {t('contact.gst')}</li>
            </ul>
            {/* <div className="footer-social" style={{ marginTop: '1.2rem' }}>
              <a href="https://wa.me/919898051994" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
            </div> */}
            {/* <h4 style={{ marginTop: '1.2rem' }}>{t('footer.followUs')}</h4>
            <div className="footer-social">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
            </div> */}
          </div>
        </div>

        <div className="footer-bottom">{t('footer.rights')}</div>
      </div>
    </footer>
  );
}
