# Sun Agro Process (SAP) – MERN Website

A modern, responsive website for **Sun Agro Process** — an agricultural processing and rice milling company. Built with the **MERN stack** (MongoDB, Express, React, Node.js).

---

## Features

| Category | Details |
|---|---|
| **Pages/Sections** | Home (Hero), About, Products, Process, Gallery, Services, Quality, Farmers & Partners, Contact, Footer |
| **Animations** | Floating grain particles, slide-in blocks, flip cards, hover zoom, animated counters, 3D grain loader, parallax-ready |
| **Theme** | Dark / Light mode toggle with persistent preference |
| **Language** | English & Gujarati (i18next) |
| **SEO** | Meta tags, OG tags, semantic HTML, Poppins font preload |
| **Responsive** | Mobile-first, hamburger nav, adaptive grids |
| **Integrations** | Google Maps embed, WhatsApp floating button, downloadable PDF catalog slot |
| **Backend** | REST API for Products, Contact form, Partner leads with MongoDB persistence (optional) |
| **Security** | Helmet, CORS, rate limiting, express-validator |

---

## Tech Stack

- **Frontend:** React 19 + Vite 7, Framer Motion, react-icons, react-intersection-observer, i18next, Swiper
- **Backend:** Express 5, Mongoose 9, Nodemailer, Helmet, Morgan
- **Database:** MongoDB (optional — runs without it)

---

## Project Structure

```
SAP/
├── backend/
│   ├── server.js              # Express entry point
│   ├── .env.example           # Environment template
│   └── src/
│       ├── config/db.js       # MongoDB connection
│       ├── controllers/       # Route handlers
│       ├── data/products.js   # Static product data
│       ├── middleware/         # Validation middleware
│       ├── models/            # Mongoose schemas
│       └── routes/            # API routes
├── frontend/
│   ├── index.html             # SEO-optimized HTML shell
│   ├── vite.config.js         # Vite + API proxy
│   ├── public/
│   │   └── logo.png           # ← Replace with your logo
│   └── src/
│       ├── App.jsx            # Root component (all sections)
│       ├── main.jsx           # Entry (theme + i18n providers)
│       ├── index.css          # Global styles + theme variables
│       ├── context/           # ThemeContext
│       ├── i18n/              # en.json, gu.json, index.js
│       └── components/        # All section components
├── package.json               # Root scripts (concurrently)
└── README.md
```

---

## Quick Start

### 1. Install dependencies

```bash
# Root (concurrently)
npm install

# Backend
cd backend && npm install

# Frontend
cd ../frontend && npm install
```

### 2. Configure environment (optional)

```bash
cp backend/.env.example backend/.env
# Edit backend/.env to set MONGO_URI if you want database persistence
```

### 3. Run in development

```bash
# From project root — starts both backend (port 5000) and frontend (port 5173)
npm run dev
```

Or separately:
```bash
npm run server   # Backend only
npm run client   # Frontend only
```

### 4. Build for production

```bash
npm run build    # Creates frontend/dist/
npm start        # Starts backend serving the API
```

---

## Customization

### Replace Logo
Drop your logo file as `frontend/public/logo.png`. It's used in:
- Navbar
- Hero section
- Footer
- (Set a `favicon.ico` in `frontend/public/` for browser tab icon)

### Replace Product Images
Edit `backend/src/data/products.js` — swap Unsplash URLs with your own hosted images.

### Add Product Catalog PDF
Place your catalog at `frontend/public/catalog.pdf` — the "Download Catalog" button in the footer already links to it.

### Update Contact Info
Edit `frontend/src/i18n/en.json` and `gu.json` — update `contact.address`, `contact.phone`, `contact.email`.

### Update Google Maps
In `frontend/src/components/Contact.jsx`, replace the `<iframe src="...">` URL with your actual Google Maps embed link.

### Update WhatsApp Number
In `frontend/src/components/WhatsAppFab.jsx`, change the phone number in the `wa.me` URL.

### Add MongoDB
Set `MONGO_URI=mongodb://localhost:27017/sap` in `backend/.env`. Contact and partner form submissions will be persisted automatically.

---

## API Endpoints

| Method | Route | Description |
|---|---|---|
| GET | `/api/health` | Health check |
| GET | `/api/products` | List all products |
| POST | `/api/contact` | Submit contact form |
| POST | `/api/partners` | Submit partner request |

---

## License

ISC
