import React, { useState } from 'react';
import './MovieDetailInfo.style.css';
import { Badge, Modal } from 'react-bootstrap';
import { useMovieTrailerQuery } from '../../../../hooks/useMovieTrailer';
import YouTube from 'react-youtube';

const MovieDetailInfo = ({ movie, id }) => {
  const [show, setShow] = useState(false);
  const { data: video } = useMovieTrailerQuery({ id });

  const priceToString = (price) => {
    if (price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  };

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className='detail-info'>
      <div className='detail-img'>
        <img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie?.poster_path}`} alt='' />
      </div>
      <div className='detail-text-wrap'>
        <div className='detail-text-genre'>
        {movie?.genres.map((item, index) => (
            <Badge bg='danger' key={index}>
              {item.name}
            </Badge>
          ))}
        </div>
        <p className='detail-text-title'>{movie?.title}</p>
        <p className='detail-text-tagline'>{movie?.tagline}</p>
        <div className="detail-text-social">
          <span><img src='https://cdn-icons-png.flaticon.com/512/7073/7073905.png' alt='' />{movie?.vote_average}</span>
          <span><img src='https://cdn-icons-png.flaticon.com/512/6005/6005837.png' alt='' />{movie?.vote_count}</span>
        </div>
        <ul className='detail-text-info'>

        {movie && movie.budget ? (
          <li>
            <strong>Budget</strong>
              $ {priceToString(movie.budget)}
          </li>
          ) : (
            <span></span>
          )}


        {movie && movie.revenue ? (
          <li>
            <strong>Revenue</strong>
            $ {priceToString(movie.revenue)}
          </li>
          ) : (
            <span></span>
          )}

          <li>
            <strong>Release Date</strong>
            {movie?.release_date}
          </li>
          <li>
            <strong>Run time</strong>
            {movie?.runtime} min
          </li>
        </ul>
        <p className='detail-text-overview'>{movie?.overview}</p>
        <button className='btn-video' onClick={() => setShow(true)}>
          <img src='https://cdn-icons-png.flaticon.com/512/260/260446.png' alt='' /> 영화 예고편 보기
        </button>

      </div>
      <Modal
        show={show}
        centered={true}
        onHide={() => setShow(false)}
        dialogClassName='modal-style'
      >
        <Modal.Header closeButton />
        <Modal.Body>
          <YouTube
            videoId={video && video[0]?.key}
            opts={opts}
            onReady={(event) => event.target.mute()}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MovieDetailInfo;