import React from 'react';
import { Badge } from 'react-bootstrap';
import "./MovieCard.style.css"

const MovieCard = ({ movie }) => {
  return (
    <div style={{        
        backgroundImage:`url(https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster_path})`
    }} className='movie-card'>
      <div className='overlay'>
        <h1>{movie.title}</h1>
        <div className='genre'>
            {movie.genre_ids.map((id) => (
                <Badge bg='danger'>{id}</Badge>
            ))}
        </div>
        <div className='vote_averge'>{movie.vote_averge}</div>
        <div className='popularity'>{movie.popularity}</div>
        <div className={movie.adult?'adult over18':'adult under18'}>
            {movie.adult?'over18':'under18'}
        </div>
      </div>
    </div>
  )
}

export default MovieCard
