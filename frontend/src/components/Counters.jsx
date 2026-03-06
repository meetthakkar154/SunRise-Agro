import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';

const data = [
  { end: 15, key: 'yearsExp', suffix: '+' },
  { end: 35, key: 'dailyCapacity', suffix: ' Tons' },
  { end: 20, key: 'riceVarieties', suffix: '+' },
  { end: 500, key: 'happyClients', suffix: '+' },
];

function AnimatedNumber({ end, suffix, started }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = Math.ceil(end / 60);
    ref.current = setInterval(() => {
      start += step;
      if (start >= end) {
        start = end;
        clearInterval(ref.current);
      }
      setVal(start);
    }, 25);
    return () => clearInterval(ref.current);
  }, [end, started]);

  return <>{val.toLocaleString()}{suffix}</>;
}

export default function Counters() {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: .3 });

  return (
    <section className="counters" ref={ref}>
      <div className="container">
        <div className="counters-grid">
          {data.map((d) => (
            <div key={d.key} className="counter-item">
              <h2><AnimatedNumber end={d.end} suffix={d.suffix} started={inView} /></h2>
              <p>{t(`counters.${d.key}`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
