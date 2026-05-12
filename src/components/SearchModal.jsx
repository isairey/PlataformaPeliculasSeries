import React, { useState, useRef, useEffect, useCallback } from 'react';
import MovieCard from './MovieCard';

const SearchModal = ({ searchResults, onSearch, onClose, onItemClick, isSearching }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const debounceTimer = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const debouncedSearch = useCallback((value) => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(() => {
      onSearch(value);
    }, 300);
  }, [onSearch]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  const handleItemSelect = (item) => {
    onItemClick(item);
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleClose = () => {
    setQuery('');
    onClose();
  };

  return (
    <div 
      className="search-modal-overlay" 
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
    >
      <div className="search-modal-content">
        <button className="search-close" onClick={handleClose}>×</button>
        
        <div className="search-input-container">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for movies, TV shows..."
            value={query}
            onChange={handleInputChange}
            className="search-input"
            autoComplete="off"
          />
        </div>

        <div className="search-results">
          {searchResults.length > 0 ? (
            <div className="results-grid">
              {searchResults.map(item => (
                <MovieCard 
                  key={`${item.id}-${item.media_type}`}
                  item={item}
                  onClick={() => handleItemSelect(item)}
                />
              ))}
            </div>
          ) : query && !isSearching ? (
            <div className="no-results">
              <p>No results found for "{query}"</p>
            </div>
          ) : query && isSearching ? (
            <div className="search-loading">
              <p>Searching...</p>
            </div>
          ) : (
            <div className="search-placeholder">
              <p>Start typing to search for movies and TV shows</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;