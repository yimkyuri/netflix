import React, { useState } from 'react';
import './Review.style.css';

const Review = ({ review }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <h5 className='review-author'>{review.author}</h5>
      <p className={`review-text-box ${expanded ? 'expanded' : 'fold'}`}>
        {review.content}
      </p>
      <button className='more-button' onClick={() => setExpanded(!expanded)}>
        {review.content.length > 600 && (expanded ? '접기' : '더보기')}
      </button>
    </div>
  );
};

export default Review;