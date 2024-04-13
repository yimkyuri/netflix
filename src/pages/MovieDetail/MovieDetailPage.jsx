import React from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Container, Row, Col } from 'react-bootstrap';
import { useMovieDetailQuery } from '../../hooks/useMovieDetail';
import MovieDetailInfo from './components/MovieDetailInfo/MovieDetailInfo.jsx';
import { useRelatedMoviesQuery } from '../../hooks/useRelatedMovies.js';
import RelatedMoviesBox from './components/RelatedMoviesBox/RelatedMoviesBox';
import ReviewBox from './components/ReviewBox/ReviewBox';
import { useMovieReviewQuery } from '../../hooks/useMovieReview';
import './MovieDetailPage.style.css';

import ScrollToTop from '../../ScrollToTop';

const MovieDetailPage = () => {
  const { id } = useParams();
  const {
    data: movie,
    isLoading,
    isError,
    error,
  } = useMovieDetailQuery({ id });
  const { data: relatedMovies } = useRelatedMoviesQuery({ id });
  const { data: review } = useMovieReviewQuery({ id });
  console.log("ddd",movie)

  if (isLoading) {
    <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant='danger'>{error.message}</Alert>;
  }

  return (
    <div>
      <ScrollToTop />
      <div className='detail-banner'>
        {movie && movie.backdrop_path ? (
          <img className='detail-banner-img' src={`https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${movie?.backdrop_path}`} alt="" />
        ) : (
          <img className='detail-banner-img' src={'https://images.unsplash.com/photo-1514483127413-f72f273478c3?q=80&w=1920&auto=format'} alt="" />
        )}
      </div>
      <MovieDetailInfo movie={movie} id={id} />
      <ReviewBox review={review} />
      <p className='related-movies-title'>RELATED MOVIES</p>
      <Container>
        <Row>
          <Col>
            <RelatedMoviesBox relatedMovies={relatedMovies} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MovieDetailPage;