import { useState, useEffect, useMemo } from 'react';
import ParallaxColumn from '../animations/ParallaxColumn.jsx';
import ImageReveal from '../animations/ImageReveal.jsx';
import FadeUp from '../animations/FadeUp.jsx';

const staticPortfolios = [
  { slug: 'riya-and-arjun-udaipur', couple_names: 'Riya & Arjun', location: 'Udaipur, Rajasthan', date: 'February 2026', category: 'destination', excerpt: 'A magnificent celebration at the City of Lakes.', cover_image: '/images/WC__7232.jpg' },
  { slug: 'priya-and-vikram-goa', couple_names: 'Priya & Vikram', location: 'Goa', date: 'December 2025', category: 'destination', excerpt: 'Where the Arabian Sea whispered blessings.', cover_image: '/images/WC__8428.jpg' },
  { slug: 'ananya-and-karan-delhi', couple_names: 'Ananya & Karan', location: 'New Delhi', date: 'November 2025', category: 'intimate', excerpt: 'A love letter written in flowers and fairy lights.', cover_image: '/images/IMG_4312.jpg' },
  { slug: 'meera-and-sahil-jaipur', couple_names: 'Meera & Sahil', location: 'Jaipur, Rajasthan', date: 'January 2026', category: 'indian', excerpt: 'Where centuries-old haveli walls echoed with music.', cover_image: '/images/MBJ_5953.jpg' },
  { slug: 'nina-and-rohan-tuscany', couple_names: 'Nina & Rohan', location: 'Tuscany, Italy', date: 'September 2025', category: 'destination', excerpt: 'Indian hearts, Italian soul.', cover_image: '/images/CB8A0155.jpg' },
];

export default function PortfolioPage() {
  const [portfolios, setPortfolios] = useState(staticPortfolios);
  const [filter, setFilter] = useState('all');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    fetch('http://localhost:8000/api/portfolios/')
      .then(r => r.json())
      .then(data => { if (data.length) setPortfolios(data); })
      .catch(() => {});
  }, []);

  const filtered = useMemo(() =>
    filter === 'all'
      ? portfolios
      : portfolios.filter(p => p.category === filter)
  , [portfolios, filter]);

  const columns = useMemo(() => {
    const col1 = [], col2 = [], col3 = [];
    filtered.forEach((story, i) => {
      if (i % 3 === 0) col1.push(story);
      else if (i % 3 === 1) col2.push(story);
      else col3.push(story);
    });
    return [col1, col2, col3];
  }, [filtered]);

  return (
    <div className="portfolio-page-detroit" style={{ paddingTop: 'calc(var(--header-height) + 40px)', minHeight: '100vh' }}>

      <div className="section" style={{ textAlign: 'center', paddingBottom: '40px' }}>
        <p className="sub-ultra-title">Curated Stories</p>
        <h1 className="ultra-title">
          The<br />
          <em>Portfolio</em>
        </h1>
      </div>

      <div className="section" style={{ paddingTop: 0, paddingBottom: '40px' }}>
        <div className="portfolio-filters" style={{ justifyContent: 'center' }}>
          {['all', 'destination', 'indian', 'intimate'].map(cat => (
            <button
              key={cat}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile: flat single-column list */}
      {isMobile ? (
        <div style={{ padding: '0 16px 60px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {filtered.map((story, i) => (
            <FadeUp key={i} delay={i * 0.08}>
              <a href={`/portfolio/${story.slug}`} className="portfolio-item-detroit" style={{ display: 'block' }}>
                <div style={{ width: '100%', overflow: 'hidden', borderRadius: '4px', background: 'var(--bg-secondary)' }}>
                  <img
                    src={story.cover_image}
                    alt={story.couple_names}
                    style={{ width: '100%', height: 'auto', display: 'block', aspectRatio: '4/3', objectFit: 'cover', transition: 'transform 1.2s cubic-bezier(0.33, 1, 0.68, 1)' }}
                  />
                </div>
                <div className="portfolio-item-info" style={{ marginTop: '12px', paddingBottom: '0' }}>
                  <h3 className="portfolio-item-title" style={{ fontSize: '1.2rem' }}>{story.couple_names}</h3>
                  <p className="portfolio-item-category">{story.location} — {story.date}</p>
                </div>
              </a>
            </FadeUp>
          ))}
        </div>
      ) : (
        /* Desktop: 3-column masonry */
        <div className="masonry-container">
          <ParallaxColumn speed={0.1}>
            {columns[0].map((story, i) => (
              <a href={`/portfolio/${story.slug}`} key={i} className="portfolio-item-detroit">
                <ImageReveal delay={i * 0.1}>
                  <img src={story.cover_image} alt={story.couple_names} />
                </ImageReveal>
                <div className="portfolio-item-info">
                  <h3 className="portfolio-item-title">{story.couple_names}</h3>
                  <p className="portfolio-item-category">{story.location} — {story.date}</p>
                </div>
              </a>
            ))}
          </ParallaxColumn>

          <ParallaxColumn speed={0.25} className="col-center">
            {columns[1].map((story, i) => (
              <a href={`/portfolio/${story.slug}`} key={i} className="portfolio-item-detroit">
                <ImageReveal delay={i * 0.15}>
                  <img src={story.cover_image} alt={story.couple_names} />
                </ImageReveal>
                <div className="portfolio-item-info">
                  <h3 className="portfolio-item-title">{story.couple_names}</h3>
                  <p className="portfolio-item-category">{story.location} — {story.date}</p>
                </div>
              </a>
            ))}
          </ParallaxColumn>

          <ParallaxColumn speed={-0.05}>
            {columns[2].map((story, i) => (
              <a href={`/portfolio/${story.slug}`} key={i} className="portfolio-item-detroit">
                <ImageReveal delay={i * 0.2}>
                  <img src={story.cover_image} alt={story.couple_names} />
                </ImageReveal>
                <div className="portfolio-item-info">
                  <h3 className="portfolio-item-title">{story.couple_names}</h3>
                  <p className="portfolio-item-category">{story.location} — {story.date}</p>
                </div>
              </a>
            ))}
          </ParallaxColumn>
        </div>
      )}

      <div style={{ height: isMobile ? '20px' : '30vh' }}></div>
    </div>
  );
}
