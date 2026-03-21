import { useState } from 'react';
import { FaStar, FaUserCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const API = import.meta.env.VITE_API_URL || '/api';

export default function ReviewSection() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          review: review.trim(),
          rating: rating || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error || 'Failed to submit feedback. Please try again.');
        return;
      }

      setSubmitted(true);
      setName('');
      setReview('');
      setRating(0);
      setHover(0);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section" id="review">
      <div className="container">
        <h2 className="section-title gradient-text">Share Your Feedback</h2>
        <p className="section-subtitle">Your insights help us grow and serve you better. Please leave a professional review and rating below.</p>
        <AnimatePresence>
          {submitted ? (
            <motion.div 
              className="review-success"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5 }}
            >
              <FaUserCircle size={48} style={{ color: '#4caf50', marginBottom: 8 }} />
              <div>Thank you for your valuable feedback!</div>
            </motion.div>
          ) : (
            <motion.form 
              className="review-form review-form-premium"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.7 }}
            >
              <div className="review-avatar-row">
                <FaUserCircle size={44} className="review-avatar" />
                <input
                  className="review-name"
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  maxLength={40}
                  required
                />
              </div>
              <label className="review-label" htmlFor="review-stars">Your Rating</label>
              <div className="review-stars" id="review-stars">
                {[1,2,3,4,5].map((star) => (
                  <FaStar
                    key={star}
                    size={40}
                    className={star <= (hover || rating) ? 'star active' : 'star'}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => setRating(star)}
                    aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                  />
                ))}
              </div>
              <label className="review-label" htmlFor="review-textarea">Your Feedback</label>
              <textarea
                className="review-textarea"
                id="review-textarea"
                placeholder="Write your review here..."
                value={review}
                onChange={e => setReview(e.target.value)}
                required
                maxLength={500}
              />
              <button type="submit" className="review-submit review-submit-premium" disabled={loading || review.length === 0 || name.trim().length === 0}>
                {loading ? 'Submitting...' : 'Submit Review'}
              </button>
              {error && <p style={{ color: '#d32f2f', fontWeight: 600 }}>{error}</p>}
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
