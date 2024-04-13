import React, { useState } from 'react';
import './MovieDetailInfo.style.css';
import { Badge, Modal } from 'react-bootstrap';
import { useMovieTrailerQuery } from '../../../../hooks/useMovieTrailer';
import YouTube from 'react-youtube';

const MovieDetailInfo = ({ movie, id }) => {
  const [show, setShow] = useState(false);
  const { data: video } = useMovieTrailerQuery({ id });

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
          <li>
            <strong>Budget</strong>
            $ {movie?.budget}
          </li>
          <li>
            <strong>Revenue</strong>
            $ {movie?.revenue}
          </li>
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
        dialogClassName='modal-90w'
        contentClassName='modal-style'
      >
        <Modal.Header closeVariant='white' closeButton />
        <Modal.Body>
          <YouTube
            videoId={video && video[0]?.key}
            opts={opts}
            style={{ height: '100%' }}
            onReady={(event) => event.target.mute()}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MovieDetailInfo;