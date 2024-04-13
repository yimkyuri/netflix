import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import "./MovieCard.style.css"
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';

const MovieCard = ({ movie }) => {
  const pointAvarage = movie.vote_average.toFixed(1);
  const navigate = useNavigate();
  const {data:genreData} = useMovieGenreQuery();
  const showGenre = (genreIdList)  => {
    if (!genreData) return [];
    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id);
      return genreObj.name;
    })
    return genreNameList;
  }
  return (
    <div className='movie-card'>
      <div className="card-thumb">
        {movie.poster_path ? (
          <img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`} alt="" />
        ) : (
          <div className="card_noimage">이미지 준비중</div>
        )}
      </div>
      <div className='overlay' onClick={() => navigate(`/movies/${movie.id}`)}>
        <h1>{movie.title}</h1>
        <div className='genre'>
            {showGenre(movie.genre_ids).map((id) => (
                <Badge bg='danger'>{id}</Badge>
            ))}
        </div>
        <div className='vote_averge'>{movie.vote_averge}</div>
        <div className="card-point">
          {pointAvarage}
          <span>/10</span>
        </div>
        <div className={movie.adult?'adult over18':'adult under18'}>
            {movie.adult?'over18':'under18'}
        </div>
      </div>
    </div>
  )
}

export default MovieCard
