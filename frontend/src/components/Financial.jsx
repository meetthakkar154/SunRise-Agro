import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { FaChartLine, FaArrowUp, FaRupeeSign } from 'react-icons/fa';

const data = [
  { year: '2021-22', amount: 11794700, growth: null },
  { year: '2022-23', amount: 16395127, growth: 39.0 },
  { year: '2023-24', amount: 72020572, growth: 339.28 },
  { year: '2024-25', amount: 180520629, growth: 150.65 },
  { year: '2025-26', amount: 218453689, growth: 21.01 },
];

const maxAmount = Math.max(...data.map((d) => d.amount));

function formatINR(n) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)} L`;
  return `₹${n.toLocaleString('en-IN')}`;
}

function AnimatedNumber({ value, suffix = '', prefix = '', inView }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = value;
    const duration = 1800;
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setDisplay(end); clearInterval(timer); }
      else setDisplay(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);
  return <span>{prefix}{display.toFixed(suffix === '%' ? 2 : 0).replace(/\B(?=(\d{2})+(\d)(?!\d))/g, ',')}{suffix}</span>;
}

export default function Financial() {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const [hoveredBar, setHoveredBar] = useState(null);

  const totalGrowth = (((data[data.length - 1].amount - data[0].amount) / data[0].amount) * 100).toFixed(0);

  return (
    <section className="section fin-section" id="financial">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="section-label">{t('financial.label')}</p>
          <h2 className="section-title">{t('financial.title')}</h2>
          <p className="section-subtitle">{t('financial.subtitle')}</p>
        </motion.div>

        <div className="fin-content" ref={ref}>
          {/* Summary Cards */}
          <motion.div
            className="fin-summary"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="fin-summary-card fin-summary-card--turnover">
              <div className="fin-summary-icon"><FaRupeeSign /></div>
              <div>
                <span className="fin-summary-label">{t('financial.currentTurnover')}</span>
                <strong className="fin-summary-value">₹21,84,53,689</strong>
                <span className="fin-summary-year">FY 2025-26</span>
              </div>
            </div>
            <div className="fin-summary-card fin-summary-card--growth">
              <div className="fin-summary-icon fin-summary-icon--green"><FaArrowUp /></div>
              <div>
                <span className="fin-summary-label">{t('financial.totalGrowth')}</span>
                <strong className="fin-summary-value">{totalGrowth}%</strong>
                <span className="fin-summary-year">{t('financial.sinceInception')}</span>
              </div>
            </div>
            <div className="fin-summary-card fin-summary-card--trend">
              <div className="fin-summary-icon fin-summary-icon--amber"><FaChartLine /></div>
              <div>
                <span className="fin-summary-label">{t('financial.peakGrowth')}</span>
                <strong className="fin-summary-value">339.28%</strong>
                <span className="fin-summary-year">FY 2023-24</span>
              </div>
            </div>
          </motion.div>

          {/* Bar Chart */}
          <motion.div
            className="fin-chart"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="fin-chart-title">{t('financial.chartTitle')}</h3>
            <div className="fin-chart-area">
              {/* Y-axis labels */}
              <div className="fin-y-axis">
                {[20, 15, 10, 5, 0].map((v) => (
                  <span key={v}>₹{v} Cr</span>
                ))}
              </div>
              {/* Bars */}
              <div className="fin-bars">
                {data.map((d, i) => {
                  const pct = (d.amount / maxAmount) * 100;
                  return (
                    <div
                      key={d.year}
                      className={`fin-bar-col${hoveredBar === i ? ' hovered' : ''}`}
                      onMouseEnter={() => setHoveredBar(i)}
                      onMouseLeave={() => setHoveredBar(null)}
                    >
                      <div className="fin-bar-tooltip">
                        <strong>{formatINR(d.amount)}</strong>
                        {d.growth !== null && <span className="fin-bar-growth">+{d.growth}%</span>}
                      </div>
                      <motion.div
                        className={`fin-bar fin-bar--${i}`}
                        initial={{ height: 0 }}
                        animate={inView ? { height: `${pct}%` } : { height: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 + i * 0.15, ease: 'easeOut' }}
                      />
                      <span className="fin-bar-label">{d.year}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Table */}
          <motion.div
            className="fin-table-wrap"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h3 className="fin-table-title">{t('financial.tableTitle')}</h3>
            <div className="fin-table-scroll">
              <table className="fin-table">
                <thead>
                  <tr>
                    <th>{t('financial.year')}</th>
                    <th>{t('financial.turnover')}</th>
                    <th>{t('financial.growthPct')}</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((d, i) => (
                    <motion.tr
                      key={d.year}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.7 + i * 0.1 }}
                    >
                      <td><strong>{d.year}</strong></td>
                      <td>₹{d.amount.toLocaleString('en-IN')}/-</td>
                      <td>
                        {d.growth !== null ? (
                          <span className={`fin-growth-pill${d.growth > 100 ? ' fin-growth-pill--hot' : ''}`}>
                            <FaArrowUp /> {d.growth}%
                          </span>
                        ) : (
                          <span className="fin-growth-pill fin-growth-pill--base">—</span>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
