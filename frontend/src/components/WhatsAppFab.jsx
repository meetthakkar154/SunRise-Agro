import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppFab() {
  return (
    <a
      className="whatsapp-fab"
      href="https://wa.me/919876543210?text=Hello%20SAP%2C%20I%20would%20like%20to%20know%20more%20about%20your%20products."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp />
    </a>
  );
}
