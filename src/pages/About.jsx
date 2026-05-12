import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="static-page">
      <div className="static-container">
        <h1>About MStream</h1>
        
        <div className="about-content">
          <section className="about-section">
            <h2>Welcome to MStream</h2>
            <p>
              Welcome to MStream, your favorite destination for exploring the vast world of Movies and TV shows. 
              Our mission is to provide an elegant and user-friendly interface for discovering new content, 
              tracking trending titles, and enjoying a seamless viewing experience.
            </p>
          </section>

          <section className="about-section">
            <h2>Our Technology</h2>
            <p>
              This project was built using modern web technologies including React.js, Vite, and Cloudflare Pages 
              to demonstrate a responsive and dynamic front-end application. We source our data from The Movie Database (TMDB) 
              API to ensure up-to-date and accurate information about movies and TV shows.
            </p>
          </section>

          <section className="about-section">
            <h2>Features</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🎯</div>
                <h3>Trending Content</h3>
                <p>Discover the most popular movies and TV shows updated weekly</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">🔍</div>
                <h3>Smart Search</h3>
                <p>Find your favorite content with our powerful search functionality</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">📱</div>
                <h3>Responsive Design</h3>
                <p>Enjoy seamless experience across all your devices</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <h3>Fast Performance</h3>
                <p>Optimized for speed with modern web technologies</p>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>Our Commitment</h2>
            <p>
              We are committed to providing the best user experience while respecting content creators. 
              We encourage our users to support the entertainment industry by watching content through 
              official platforms and services.
            </p>
            <p>
              MStream is developed as a demonstration of modern web development practices and is intended 
              for educational and entertainment purposes.
            </p>
          </section>

          <section className="about-section contact-section">
            <h2>Get In Touch</h2>
            <p>
              Have questions, suggestions, or feedback? We'd love to hear from you!
            </p>
            <div className="contact-info">
              <p>🐙 GitHub: <a href="https://github.com/cd-Crypton/mstream" target="_blank" rel="noopener noreferrer">github.com/cd-Crypton/mstream</a></p>
            </div>
          </section>
        </div>

        <div className="static-links">
          <Link to="/disclaimer" className="static-link">View Disclaimer</Link>
          <Link to="/" className="static-link">Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default About;