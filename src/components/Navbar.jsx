import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ onSearch, searchResults, onItemClick, isSearching }) => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to get poster image URL
  const getPosterUrl = (posterPath) => {
    if (!posterPath) return null;
    return `https://image.tmdb.org/t/p/w92${posterPath}`; // w92 is small poster size
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleInputFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchBlur = (e) => {
    setTimeout(() => {
      setIsSearchFocused(false);
    }, 200);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleItemSelect = (item) => {
    if (onItemClick) {
      onItemClick(item);
    }
    setSearchQuery('');
    setIsSearchFocused(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img 
            src="/logo/mstream-new.png" 
            alt="MSTREAM Logo" 
            className="logo-image"
          />
        </Link>

        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/tv-shows" className="nav-link">TV Shows</Link>
          <Link to="/movies" className="nav-link">Movies</Link>
          <Link to="/popular" className="nav-link">Popular</Link>
        </div>

        <div className="navbar-search-container">
          <div className="search-bar-wrapper">
            <input
              type="text"
              placeholder="Search movies and TV shows..."
              value={searchQuery}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleSearchBlur}
              className="navbar-search-input"
            />
            
            {/* Inline Search Results Dropdown */}
            {isSearchFocused && searchQuery && (
              <div className="search-results-dropdown">
                <div className="search-results-list">
                  {searchResults && searchResults.length > 0 ? (
                    searchResults.map(item => (
                      <div 
                        key={`${item.id}-${item.media_type}`}
                        className="search-result-item"
                        onClick={() => handleItemSelect(item)}
                      >
                        {/* Poster Image */}
                        <div className="search-result-poster">
                          {getPosterUrl(item.poster_path) ? (
                            <img 
                              src={getPosterUrl(item.poster_path)} 
                              alt={item.title || item.name}
                              loading="lazy"
                            />
                          ) : (
                            <div className="poster-placeholder">
                              <span>No Image</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="search-result-info">
                          <div className="search-result-title">
                            {item.title || item.name}
                          </div>
                          <div className="search-result-meta">
                            <span className="search-result-type">
                              {item.media_type}
                            </span>
                            {item.release_date && (
                              <span className="search-result-year">
                                ({new Date(item.release_date).getFullYear()})
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : isSearching ? (
                    <div className="search-loading">
                      <p>Searching...</p>
                    </div>
                  ) : (
                    <div className="search-no-results">
                      <p>No results found for "{searchQuery}"</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <button 
          className={`menu-toggle ${isMenuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`side-menu ${isMenuOpen ? 'open' : ''}`}>
          <div className="side-menu-header">
            <h3>Menu</h3>
          </div>
          <div className="side-menu-links">
            <Link to="/" className="nav-link" onClick={closeMenu}>Home</Link>
            <Link to="/tv-shows" className="nav-link" onClick={closeMenu}>TV Shows</Link>
            <Link to="/movies" className="nav-link" onClick={closeMenu}>Movies</Link>
            <Link to="/popular" className="nav-link" onClick={closeMenu}>Popular</Link>
          </div>
        </div>

        {isMenuOpen && <div className="menu-overlay" onClick={closeMenu}></div>}
      </div>
    </nav>
  );
};

export default Navbar;