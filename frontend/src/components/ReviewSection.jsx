import { useState } from 'react';
import { FaStar, FaUserCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export default function ReviewSection() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://sap-backend-two.vercel.app/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, review, rating })
      });
      if (response.ok) {
        setSubmitted(true);
      } else {
        alert('Failed to send feedback. Please try again.');
      }
    } catch (err) {
      alert('An error occurred. Please try again.');
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
              <button type="submit" className="review-submit review-submit-premium" disabled={review.length === 0 || name.trim().length === 0}>
                Submit Review
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
