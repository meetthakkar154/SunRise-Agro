import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaSun, FaMoon } from 'react-icons/fa';

const sections = ['home', 'about', 'products', 'process', 'gallery', 'services', 'quality', 'partners', 'contact'];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { dark, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handle);
    return () => window.removeEventListener('scroll', handle);
  }, []);

  const scrollTo = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="container">
        <a className="nav-logo" href="#home" onClick={() => scrollTo('home')}>
          <img src="/logo.png" alt="SAP Logo" />
          SAP
        </a>

        <div className={`nav-links${open ? ' open' : ''}`}>
          {sections.map((s) => (
            <a key={s} href={`#${s}`} onClick={() => scrollTo(s)}>
              {t(`nav.${s}`)}
            </a>
          ))}
        </div>

        <div className="nav-controls">
          <select value={i18n.language} onChange={(e) => i18n.changeLanguage(e.target.value)}>
            <option value="en">EN</option>
            <option value="gu">ગુ</option>
          </select>
          <button onClick={toggle} title="Toggle theme">
            {dark ? <FaSun /> : <FaMoon />}
          </button>
          <button className="hamburger" onClick={() => setOpen(!open)}>
            {open ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>
    </nav>
  );
}
