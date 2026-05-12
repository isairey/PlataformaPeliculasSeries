import React from 'react';

const TrendingSidebar = ({ 
  trendingMovies, 
  trendingTV, 
  timeWindow, 
  onTimeWindowToggle, 
  onItemClick 
}) => {
  const getPosterUrl = (posterPath) => {
    if (!posterPath) return null;
    return `https://image.tmdb.org/t/p/w92${posterPath}`;
  };

  return (
    <div className="trending-sidebar">
      <div className="trending-header">
        <div className="time-toggle-container">
          <button 
            className={`time-toggle-btn ${timeWindow === 'week' ? 'active' : ''}`}
            onClick={() => onTimeWindowToggle('week')}
          >
            Week
          </button>
          <button 
            className={`time-toggle-btn ${timeWindow === 'day' ? 'active' : ''}`}
            onClick={() => onTimeWindowToggle('day')}
          >
            Day
          </button>
        </div>
      </div>

      <div className="trending-columns">
        <div className="trending-column">
          <h3 className="column-title">Trending Movies</h3>
          <div className="trending-list">
            {trendingMovies.slice(0, 5).map(movie => (
              <div 
                key={movie.id} 
                className="trending-item"
                onClick={() => onItemClick(movie)}
              >
                <div className="trending-poster">
                  {getPosterUrl(movie.poster_path) ? (
                    <img 
                      src={getPosterUrl(movie.poster_path)} 
                      alt={movie.title}
                      loading="lazy"
                    />
                  ) : (
                    <div className="poster-placeholder">
                      <span>No Image</span>
                    </div>
                  )}
                </div>
                <div className="trending-info">
                  <div className="trending-name">{movie.title}</div>
                  <div className="trending-meta">
                    <span className="trending-rating">⭐ {movie.vote_average?.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="trending-column">
          <h3 className="column-title">Trending TV Shows</h3>
          <div className="trending-list">
            {trendingTV.slice(0, 5).map(tvShow => (
              <div 
                key={tvShow.id} 
                className="trending-item"
                onClick={() => onItemClick(tvShow)}
              >
                <div className="trending-poster">
                  {getPosterUrl(tvShow.poster_path) ? (
                    <img 
                      src={getPosterUrl(tvShow.poster_path)} 
                      alt={tvShow.name}
                      loading="lazy"
                    />
                  ) : (
                    <div className="poster-placeholder">
                      <span>No Image</span>
                    </div>
                  )}
                </div>
                <div className="trending-info">
                  <div className="trending-name">{tvShow.name}</div>
                  <div className="trending-meta">
                    <span className="trending-rating">⭐ {tvShow.vote_average?.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingSidebar;