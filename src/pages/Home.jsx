import React, { useState, useEffect } from 'react';
import BannerSlider from '../components/BannerSlider';
import MovieRow from '../components/MovieRow';
import Modal from '../components/Modal';
import SearchModal from '../components/SearchModal';
import { useTMDB } from '../hooks/useTMDB';
import './Home.css';

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTV, setTrendingTV] = useState([]);
  const [trendingAnime, setTrendingAnime] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeWindow, setTimeWindow] = useState('week');

  const { 
    movieGenres, 
    tvGenres, 
    fetchTrending, 
    fetchTrendingAnime, 
    fetchNowPlaying, // Import the new function
    searchTMDB, 
    fetchCredits
  } = useTMDB();

  useEffect(() => {
    initializeData();
  }, []);

  useEffect(() => {
    if (!loading) {
      updateTrendingData();
    }
  }, [timeWindow]);

  const initializeData = async () => {
    try {
      setLoading(true);
      const [movies, tvShows, anime, nowPlaying] = await Promise.all([
        fetchTrending('movie', timeWindow),
        fetchTrending('tv', timeWindow),
        fetchTrendingAnime(),
        fetchNowPlaying() // Fetch now playing movies
      ]);

      setTrendingMovies(movies);
      setTrendingTV(tvShows);
      setTrendingAnime(anime);
      setNowPlayingMovies(nowPlaying);
    } catch (error) {
      console.error("Failed to initialize data:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateTrendingData = async () => {
    try {
      const [movies, tvShows] = await Promise.all([
        fetchTrending('movie', timeWindow),
        fetchTrending('tv', timeWindow)
      ]);

      setTrendingMovies(movies);
      setTrendingTV(tvShows);
    } catch (error) {
      console.error("Failed to update trending data:", error);
    }
  };

  const handleTimeWindowToggle = () => {
    setTimeWindow(prev => prev === 'week' ? 'day' : 'week');
  };

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const results = await searchTMDB(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    }
  };

  const handleItemClick = async (item) => {
    const type = item.media_type === "movie" || item.release_date ? "movie" : "tv";
    const genreMap = type === 'movie' ? movieGenres : tvGenres;
    const genreNames = item.genre_ids?.map(id => genreMap.get(id)).filter(Boolean) || [];
    
    const cast = await fetchCredits(type, item.id);

    setSelectedItem({
      ...item,
      type,
      genres: genreNames,
      cast: cast.join(', ') || 'N/A'
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchResults([]);
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading amazing content...</p>
      </div>
    );
  }

  return (
    <div className="home-page">
      {/* Use nowPlayingMovies for BannerSlider */}
      {nowPlayingMovies.length > 0 && (
        <BannerSlider 
          movies={nowPlayingMovies.slice(0, 10)} 
          onItemClick={handleItemClick}
        />
      )}
      
      <div className="time-window-toggle-container">
        <div className="time-window-toggle">
          <span className={`toggle-label ${timeWindow === 'week' ? 'active' : ''}`}>
            This Week
          </span>
          <button 
            className={`toggle-switch ${timeWindow === 'day' ? 'day' : 'week'}`}
            onClick={handleTimeWindowToggle}
            aria-label={`Switch to ${timeWindow === 'week' ? 'today' : 'this week'} trending`}
          >
            <div className="toggle-slider"></div>
          </button>
          <span className={`toggle-label ${timeWindow === 'day' ? 'active' : ''}`}>
            Today
          </span>
        </div>
      </div>

      <div className="content-rows">
        {/* Side by side trending movies and TV shows */}
        <div className="trending-side-by-side">
          {trendingMovies.length > 0 && (
            <div className="trending-column">
              <MovieRow 
                title={`Trending Movies ${timeWindow === 'day' ? 'Today' : 'This Week'}`} 
                items={trendingMovies.slice(0, 15)}
                onItemClick={handleItemClick}
                columns={3}
              />
            </div>
          )}
          
          {trendingTV.length > 0 && (
            <div className="trending-column">
              <MovieRow 
                title={`Trending TV Shows ${timeWindow === 'day' ? 'Today' : 'This Week'}`} 
                items={trendingTV.slice(0, 15)}
                onItemClick={handleItemClick}
                columns={3}
              />
            </div>
          )}
        </div>
        
        {/* Trending Anime below */}
        {trendingAnime.length > 0 && (
          <MovieRow 
            title="Trending Anime" 
            items={trendingAnime} 
            onItemClick={handleItemClick}
          />
        )}
      </div>

      {isModalOpen && selectedItem && (
        <Modal item={selectedItem} onClose={closeModal} />
      )}

      {isSearchOpen && (
        <SearchModal 
          searchResults={searchResults}
          onSearch={handleSearch}
          onClose={closeSearch}
          onItemClick={handleItemClick}
        />
      )}
    </div>
  );
};

export default Home;