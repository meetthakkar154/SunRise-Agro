const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const { initGoogleSheets } = require('./src/services/googleSheets');
const { initMailer } = require('./src/services/mailer');
const productsRouter = require('./src/routes/products.routes');
const contactRouter = require('./src/routes/contact.routes');
const partnerRouter = require('./src/routes/partners.routes');
const reviewRouter = require('./src/routes/review.routes');

dotenv.config();

const app = express();
app.set('trust proxy', 1); // Fix for express-rate-limit behind proxy (Vercel, etc.)
const port = process.env.PORT || 5000;

app.use(helmet());
app.use(cors({ origin: (process.env.CLIENT_URL || '*').trim() }));
app.use(morgan('dev'));
app.use(express.json({ limit: '1mb' }));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api', apiLimiter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'Sun Agro Process API' });
});

app.use('/api/products', productsRouter);
app.use('/api/contact', contactRouter);
app.use('/api/partners', partnerRouter);
app.use('/api/review', reviewRouter);

app.use((err, _req, res, _next) => {
  res.status(500).json({ message: err.message || 'Server error' });
});

initGoogleSheets();
initMailer();

if (require.main === module) {
  app.listen(port, () => {
    console.log(`SAP backend running on port ${port}`);
  });
}

module.exports = app;
