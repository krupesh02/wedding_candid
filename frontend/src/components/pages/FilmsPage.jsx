import { useState, useEffect } from 'react';

const staticFilms = [
  { slug: 'love-in-second-innings', title: 'Love In Second Innings', couple_names: 'Deepal & Nishant', location: 'Mumbai', category: 'classic', excerpt: 'Second marriage, for many, is still a taboo. This story illustrates why it shouldn\'t be.', story: 'It\'s a treatise on how the past doesn\'t come in the way of love and respect. It\'s a heroic tale of victory over stereotypes and archaic customs. Every moment that we spent with Deepal and Nishant convinced us that life can be made beautiful.', cover_image: '/images/WC__7232.jpg', video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { slug: 'twenty-years-in-the-making', title: 'Twenty Years in the Making', couple_names: 'Hiba & Akbar', location: 'Bhopal', category: 'cinematic', excerpt: 'An India-Pakistan love story that transcends borders, politics, and time itself.', story: 'This one is special, very special. Hiba and Akbar\'s story took us on a journey all the way from Hiba\'s childhood till their reception in Bhopal.', cover_image: '/images/IMG_4312.jpg', video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { slug: 'whispers-of-forever', title: 'Whispers of Forever', couple_names: 'Aisha & Dev', location: 'Udaipur', category: 'modern', excerpt: 'A modern love story told through the lens of ancient Rajasthani grandeur.', story: 'When Aisha and Dev first reached out to us, they said something that stuck — "We don\'t want a wedding video, we want a film about us."', cover_image: '/images/MBJ_5953.jpg', video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
];

export default function FilmsPage() {
  const [films, setFilms] = useState(staticFilms);
  const [filter, setFilter] = useState('all');
  const [activeFilm, setActiveFilm] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/films/')
      .then(r => r.json())
      .then(data => { if (data.length) setFilms(data); })
      .catch(() => {});
  }, []);

  const filtered = filter === 'all' ? films : films.filter(f => f.category === filter);

  return (
    <div className="page-enter" style={{ paddingTop: 'calc(var(--header-height) + 40px)' }}>
      <div className="section" style={{ textAlign: 'center' }}>
        <p className="section-label">Cinematic Stories</p>
        <h1 className="section-title">Our <em>Films</em></h1>
        <p className="section-subtitle" style={{ margin: '0 auto 20px' }}>
          Every wedding is unique and so are our films. For the past years we have set new benchmarks of storytelling within the wedding realm and beyond.
        </p>
        <div className="section-divider" style={{ margin: '20px auto 40px' }}></div>

        <div className="portfolio-filters" style={{ justifyContent: 'center' }}>
          {['all', 'classic', 'modern', 'cinematic'].map(cat => (
            <button
              key={cat}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat === 'all' ? 'All Films' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="films-grid" style={{ padding: 'clamp(0px, 3vw, 40px) clamp(16px, 4vw, 40px) 80px', maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        {filtered.map((film, i) => (
          <div
            key={i}
            className="film-card"
            onClick={() => setActiveFilm(activeFilm === i ? null : i)}
          >
            <div className="film-card-image">
              {activeFilm === i ? (
                <iframe
                  src={film.video_url + '?autoplay=1'}
                  style={{ width: '100%', height: '100%', border: 'none' }}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title={film.title}
                />
              ) : (
                <>
                  <img src={film.cover_image} alt={film.couple_names} />
                  <div className="film-play-btn"></div>
                </>
              )}
            </div>
            <div className="film-card-info">
              <h3 className="film-card-title">{film.title}</h3>
              <p className="film-card-meta">{film.couple_names} — {film.location}</p>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '8px', lineHeight: '1.7' }}>
                {film.excerpt}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
