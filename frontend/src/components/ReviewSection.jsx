import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

export default function ReviewSection() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would send the review/rating to your backend or API
  };

  return (
    <section className="section" id="review">
      <div className="container">
        <h2 className="section-title">Give Review & Rating</h2>
        <p className="section-subtitle">We value your professional feedback.</p>
        {submitted ? (
          <div className="review-success">Thank you for your review!</div>
        ) : (
          <form className="review-form" onSubmit={handleSubmit}>
            <div className="review-stars">
              {[1,2,3,4,5].map((star) => (
                <FaStar
                  key={star}
                  size={28}
                  className={star <= (hover || rating) ? 'star active' : 'star'}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => setRating(star)}
                  aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                />
              ))}
            </div>
            <textarea
              className="review-textarea"
              placeholder="Write your professional review here..."
              value={review}
              onChange={e => setReview(e.target.value)}
              required
              minLength={10}
              maxLength={500}
            />
            <button type="submit" className="review-submit" disabled={rating === 0 || review.length < 10}>
              Submit Review
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
