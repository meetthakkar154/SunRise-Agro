import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaSun, FaMoon, FaChevronDown } from 'react-icons/fa';

/* Navigation structure — grouped for a clean header */
const navItems = [
  { id: 'home', type: 'link' },
  {
    id: 'company',
    type: 'dropdown',
    children: ['about', 'quality', 'infrastructure'],
  },
  { id: 'products', type: 'link' },
  {
    id: 'operations',
    type: 'dropdown',
    children: ['process', 'services', 'gallery'],
  },
  { id: 'contact', type: 'link' },
];

/* Labels for the dropdown parent items (not section ids) */
const dropdownLabels = {
  company: { en: 'Company', gu: 'કંપની', hi: 'कंपनी' },
  operations: { en: 'Our Facilities', gu: 'અમારી સુવિધાઓ', hi: 'हमारी सुविधाएं' },
};

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { dark, toggle } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownTimeout = useRef(null);

  /* Scroll shadow */
  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handle);
    return () => window.removeEventListener('scroll', handle);
  }, []);

  /* Track which section is in view */
  useEffect(() => {
    const ids = ['home','about','products','process','gallery','services','quality','infrastructure','contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    setMobileOpen(false);
    setOpenDropdown(null);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  /* Dropdown hover helpers (desktop) */
  const handleDropEnter = (id) => { clearTimeout(dropdownTimeout.current); setOpenDropdown(id); };
  const handleDropLeave = () => { dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 200); };

  /* Does this dropdown contain the active section? */
  const dropdownIsActive = (children) => children.some((c) => c === activeSection);

  const lang = i18n.language?.startsWith('gu') ? 'gu' : i18n.language?.startsWith('hi') ? 'hi' : 'en';

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="container">
          {/* Logo */}
          <a className="nav-logo" href="#home" onClick={() => scrollTo('home')}>
            <img src="/logo.webp" alt="Sunrise Agro Process Logo" />
            <span>SUNRISE AGRO PROCESS</span>
          </a>

          {/* Desktop + Mobile links */}
          <div className={`nav-links${mobileOpen ? ' open' : ''}`}>
            {/* Close button inside mobile drawer */}
            <button className="mobile-close" onClick={() => setMobileOpen(false)}><HiX /></button>

            {navItems.map((item) =>
              item.type === 'link' ? (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={activeSection === item.id ? 'active' : ''}
                  onClick={() => scrollTo(item.id)}
                >
                  {t(`nav.${item.id}`)}
                </a>
              ) : (
                <div
                  key={item.id}
                  className={`nav-dropdown${openDropdown === item.id ? ' open' : ''}${dropdownIsActive(item.children) ? ' active' : ''}`}
                  onMouseEnter={() => handleDropEnter(item.id)}
                  onMouseLeave={handleDropLeave}
                >
                  <button
                    className="nav-dropdown-toggle"
                    onClick={() => setOpenDropdown(openDropdown === item.id ? null : item.id)}
                  >
                    {dropdownLabels[item.id][lang]}
                    <FaChevronDown className="chevron" />
                  </button>
                  <div className="nav-dropdown-menu">
                    {item.children.map((child) => (
                      <a
                        key={child}
                        href={`#${child}`}
                        className={activeSection === child ? 'active' : ''}
                        onClick={() => scrollTo(child)}
                      >
                        {t(`nav.${child}`)}
                      </a>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>

          {/* Controls */}
          <div className="nav-controls">
            <select value={i18n.language} onChange={(e) => i18n.changeLanguage(e.target.value)}>
              <option value="en">EN</option>
              <option value="hi">हि</option>
              <option value="gu">ગુ</option>
            </select>
            <button onClick={toggle} title="Toggle theme" className="theme-btn">
              {dark ? <FaSun /> : <FaMoon />}
            </button>
            <button className="hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
              <HiMenu />
            </button>
          </div>
        </div>
      </nav>

      {/* Overlay behind mobile drawer */}
      {mobileOpen && <div className="nav-overlay" onClick={() => setMobileOpen(false)} />}
    </>
  );
}
