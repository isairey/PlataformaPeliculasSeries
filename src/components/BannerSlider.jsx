import React, { useState, useEffect } from 'react';
import { useTMDB } from '../hooks/useTMDB';

const BannerSlider = ({ movies, onItemClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { BACKDROP_URL } = useTMDB();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % movies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [movies.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  if (!movies.length) return null;

  const currentMovie = movies[currentSlide];

  return (
    <div className="banner-slider">
      <div 
        className="banner-slide"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7) 30%, transparent 70%), 
                           linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%),
                           url(${BACKDROP_URL}${currentMovie.backdrop_path})`
        }}
      >
        <div className="banner-content">
          {/* Add Now Playing overlay */}
          <div className="now-playing-overlay">
            <span className="now-playing-badge">Now Playing in Theater</span>
          </div>
          
          <h1 className="banner-title">{currentMovie.title || currentMovie.name}</h1>
          
          <div className="banner-meta">
            <span className="rating">⭐ {currentMovie.vote_average?.toFixed(1)}</span>
            <span className="year">
              {currentMovie.release_date?.substring(0, 4) || 
               currentMovie.first_air_date?.substring(0, 4)}
            </span>
          </div>

          <p className="banner-description">
            {currentMovie.overview?.length > 150 
              ? `${currentMovie.overview.substring(0, 150)}...`
              : currentMovie.overview
            }
          </p>

          <div className="banner-buttons">
            <a
              href={`/watch?type=${currentMovie.media_type || 'movie'}&id=${currentMovie.id}`}
              className="btn btn-primary"
            >
              <span className="play-icon">▶</span>
              Play
            </a>
            <button
              className="btn btn-secondary"
              onClick={() => onItemClick(currentMovie)}
            >
              <span className="info-icon">ⓘ</span>
              More Info
            </button>
          </div>
        </div>
      </div>

      <div className="banner-dots">
        {movies.map((_, index) => (
          <button
            key={index}
            className={`banner-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;