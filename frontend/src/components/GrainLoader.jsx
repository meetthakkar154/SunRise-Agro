import { useEffect, useState } from 'react';

/* 3D-ish rotating grain SVG loader */
export default function GrainLoader() {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHide(true), 800);
    return () => clearTimeout(timer);
  }, []);

  if (hide) return null;

  return (
    <div className={`grain-loader${hide ? ' fade-out' : ''}`}>
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="32" cy="32" rx="14" ry="24" fill="#e65100" opacity=".85" />
        <ellipse cx="32" cy="32" rx="10" ry="20" fill="#ff9800" opacity=".75" />
        <ellipse cx="32" cy="32" rx="5" ry="14" fill="#ffe082" />
      </svg>
      <p style={{ fontWeight: 600, color: 'var(--primary)' }}>Sunrise Agro Process</p>
    </div>
  );
}
