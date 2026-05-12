import React, { useCallback, memo } from 'react';
import { useTMDB } from '../hooks/useTMDB';

const Modal = memo(({ item, onClose }) => {
  const { POSTER_URL } = useTMDB();

  const handleBackdropClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  const playButtonClick = useCallback(() => {
    // Handle navigation or play action
    window.location.href = `/watch?type=${item.type}&id=${item.id}`;
  }, [item.type, item.id]);

  return (
    <div className="modal-overlay" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="modal-body">
          <img 
            src={`${POSTER_URL}${item.poster_path}`} 
            alt={item.title || item.name}
            className="modal-poster"
            loading="lazy"
          />
          
          <div className="modal-details">
            <h2 className="modal-title">{item.title || item.name}</h2>
            
            <div className="modal-meta">
              <div className="rating-stars">
                {'★'.repeat(Math.round(item.vote_average / 2))}
                <span className="rating-text">({item.vote_average?.toFixed(1)})</span>
              </div>
            </div>

            <p className="modal-description">{item.overview}</p>

            <div className="modal-extra-info">
              <div className="info-row">
                <strong>Genres:</strong>
                <span>{item.genres?.join(', ') || 'N/A'}</span>
              </div>
              <div className="info-row">
                <strong>Cast:</strong>
                <span>{item.cast}</span>
              </div>
            </div>

            <div className="modal-actions">
              <button
                onClick={playButtonClick}
                className="watch-btn primary"
              >
                <span className="play-icon">▶</span>
                Play
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

Modal.displayName = 'Modal';
export default Modal;