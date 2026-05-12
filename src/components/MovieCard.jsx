import React from 'react';
import { useTMDB } from '../hooks/useTMDB';

const MovieCard = ({ item, onClick }) => {
  const { POSTER_URL } = useTMDB();

  const title = item.title || item.name;
  const rating = item.vote_average ? item.vote_average.toFixed(1) : 'N/A';
  const year = item.release_date ? item.release_date.substring(0, 4) : 
                (item.first_air_date ? item.first_air_date.substring(0, 4) : '');

  const posterSrc = item.poster_path 
    ? `${POSTER_URL}${item.poster_path}`
    : '/placeholder-poster.jpg';

  return (
    <div className="movie-card" onClick={onClick}>
      <div className="card-image-container">
        {item.poster_path ? (
          <img 
            src={posterSrc} 
            alt={title}
            loading="lazy"
          />
        ) : (
          <div className="poster-placeholder">
            <span>{title}</span>
          </div>
        )}
        <div className="card-hover-overlay">
          <button className="play-hover-btn">
            <span className="play-icon">▶</span>
            Play
          </button>
        </div>
      </div>
      
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <div className="card-meta">
          <span className="rating">⭐ {rating}</span>
          <span className="year">{year}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;