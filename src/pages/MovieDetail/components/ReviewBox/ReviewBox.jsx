import React from 'react';
import Review from '../Review/Review';
import './ReviewBox.style.css';

const ReviewBox = ({ review }) => {
  const reviews = review || [];
  
  return (
    <div className='review-box-area'>
      <p className='title'>RELATED MOVIES</p>
      {reviews.length === 0 ? (
        <p className='no-contents'>리뷰가 없습니다.</p>
      ) : (
        <ul className='review-box'>
          {reviews?.slice(0,4).map((item, index) => (
            <li key={index} className={index !== reviews.length - 1 && 'border-style'} >
              <Review review={item} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewBox;