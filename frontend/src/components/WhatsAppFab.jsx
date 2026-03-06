import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppFab() {
  return (
    <a
      className="whatsapp-fab"
      href="https://wa.me/918200101235?text=Hello%20Sunrise%20Agro%20Process%2C%20I%20would%20like%20to%20know%20more%20about%20your%20products."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp />
    </a>
  );
}
