import React from 'react';
import { Link } from 'react-router-dom';

const Disclaimer = () => {
  return (
    <div className="static-page">
      <div className="static-container">
        <h1>Disclaimer</h1>
        
        <div className="disclaimer-content">
          <section className="disclaimer-section">
            <h2>Content Disclaimer</h2>
            <p>
              <strong>MStream does not host any files on its server.</strong> All content provided on this platform 
              is sourced from non-affiliated third parties. The application acts as an interface to access 
              publicly available content from various sources on the internet.
            </p>
          </section>

          <section className="disclaimer-section">
            <h2>Liability Disclaimer</h2>
            <p>
              We do not accept responsibility for content hosted on third-party websites and shall have 
              no liability in respect of any such content. All content available through MStream remains 
              the intellectual property of their respective owners, production companies, and distributors.
            </p>
            <p>
              The copyrights and trademarks for all movies, TV shows, and other media displayed on this 
              site belong to their respective owners. MStream makes no claims to own or control the 
              content accessed through its interface.
            </p>
          </section>

          <section className="disclaimer-section">
            <h2>Entertainment Purpose Only</h2>
            <p>
              This site is provided for entertainment and educational purposes only. MStream is a 
              demonstration of modern web development practices and is not intended as a commercial 
              streaming service.
            </p>
            <p>
              <strong>We strongly encourage users to support the creators and the entertainment industry 
              by watching content through official platforms and services.</strong> Purchasing or renting 
              content through legitimate sources ensures that creators are properly compensated for their work.
            </p>
          </section>

          <section className="disclaimer-section">
            <h2>User Responsibility</h2>
            <p>
              Users of MStream are solely responsible for:
            </p>
            <ul className="responsibility-list">
              <li>Complying with their local laws and regulations regarding online content consumption</li>
              <li>Ensuring they have the legal right to access content in their region</li>
              <li>Supporting content creators through official channels when possible</li>
              <li>Understanding that content availability may vary based on geographical location</li>
            </ul>
          </section>

          <section className="disclaimer-section">
            <h2>Technical Information</h2>
            <p>
              MStream utilizes The Movie Database (TMDB) API for movie and TV show information, including:
            </p>
            <ul className="tech-list">
              <li>Movie and TV show metadata (titles, descriptions, ratings)</li>
              <li>Cast and crew information</li>
              <li>Poster images and backdrop artwork</li>
              <li>Genre classifications and release information</li>
            </ul>
            <p>
              This data is used under the terms of the TMDB API and is subject to their terms of service.
            </p>
          </section>

          <section className="disclaimer-section warning-section">
            <div className="warning-banner">
              <h3>⚠️ Important Notice</h3>
              <p>
                The developers of MStream are not responsible for any legal issues that may arise from 
                the use of this application. Users are advised to ensure their streaming activities 
                comply with applicable laws in their jurisdiction.
              </p>
            </div>
          </section>

          <section className="disclaimer-section support-section">
            <h2>Supporting Content Creators</h2>
            <p>
              We believe in supporting the creative community. Here are some official platforms where 
              you can legally stream content and support creators:
            </p>
            <div className="platform-list">
              <a href="https://netflix.com" target="_blank" rel="noopener noreferrer" className="platform-link">
                Netflix
              </a>
              <a href="https://hulu.com" target="_blank" rel="noopener noreferrer" className="platform-link">
                Hulu
              </a>
              <a href="https://disneyplus.com" target="_blank" rel="noopener noreferrer" className="platform-link">
                Disney+
              </a>
              <a href="https://hbomax.com" target="_blank" rel="noopener noreferrer" className="platform-link">
                HBO Max
              </a>
              <a href="https://amazon.com/primevideo" target="_blank" rel="noopener noreferrer" className="platform-link">
                Amazon Prime Video
              </a>
            </div>
          </section>
        </div>

        <div className="static-links">
          <Link to="/about" className="static-link">About Us</Link>
          <Link to="/" className="static-link">Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;