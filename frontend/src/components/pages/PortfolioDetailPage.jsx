import { useState, useEffect } from 'react';

const staticStories = {
  'riya-and-arjun-udaipur': {
    title: 'A Royal Affair in Udaipur',
    couple_names: 'Riya & Arjun',
    location: 'Udaipur, Rajasthan',
    date: 'February 2026',
    story: 'Riya and Arjun\'s love story is one that spans continents. Meeting at a coffee shop in London, their journey brought them back to India for a celebration that honored their roots while embracing the grandeur of their love. The Oberoi Udaivilas served as the canvas for three days of festivities — from a sunset mehndi by the lake to a ceremony under a thousand stars. Every moment was steeped in tradition, yet felt refreshingly modern. As photographers, we found ourselves constantly in awe — the way Riya\'s eyes lit up during the pheras, the quiet tears of joy from Arjun\'s mother, the unbridled energy of the baraat. This wedding reminded us why we do what we do.',
    cover_image: '/images/WC__7232.jpg',
    images: ['/images/WC__7232.jpg', '/images/CB8A0155.jpg', '/images/WC__8428.jpg', '/images/IMG_4312.jpg', '/images/MBJ_5953.jpg', '/images/CB8A0325.jpg', '/images/SSP01330.JPG', '/images/WC__6391.jpg'],
    credits: [
      { label: 'Venue', value: 'Oberoi Udaivilas, Udaipur' },
      { label: 'Wedding Planner', value: 'The Wedding Design Co.' },
      { label: 'Bride\'s Outfit', value: 'Sabyasachi Mukherjee' },
      { label: 'Groom\'s Outfit', value: 'Anita Dongre' },
      { label: 'Decor', value: 'Devika Narain & Co.' },
      { label: 'Makeup', value: 'Namrata Soni' },
    ],
  },
  'priya-and-vikram-goa': {
    title: 'Coastal Dreams in Goa',
    couple_names: 'Priya & Vikram',
    location: 'Goa',
    date: 'December 2025',
    story: 'Priya and Vikram wanted something different — no grand palace, no thousand-guest extravaganza. Instead, they chose a cliff-side villa in South Goa where the crashing waves would be their wedding orchestra. The intimacy of 80 guests meant every moment felt personal, every embrace was genuine, every tear was seen. The ceremony at golden hour, with the sun dipping into the Arabian Sea behind them, remains one of the most breathtaking scenes we\'ve ever captured.',
    cover_image: '/images/WC__8428.jpg',
    images: ['/images/WC__8428.jpg', '/images/WC__7232.jpg', '/images/MBJ_5953.jpg', '/images/CB8A0155.jpg', '/images/WC_13299.jpg', '/images/WC_17354.JPG'],
    credits: [
      { label: 'Venue', value: 'Ahilya by the Sea, Goa' },
      { label: 'Bride\'s Outfit', value: 'Tarun Tahiliani' },
      { label: 'Groom\'s Outfit', value: 'Shantanu & Nikhil' },
    ],
  },
};

// Add defaults for all slugs
['ananya-and-karan-delhi', 'meera-and-sahil-jaipur', 'nina-and-rohan-tuscany'].forEach(slug => {
  if (!staticStories[slug]) {
    staticStories[slug] = {
      title: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      couple_names: slug.split('-and-')[0]?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') + ' & ' + slug.split('-and-')[1]?.split('-')[0]?.charAt(0).toUpperCase() + slug.split('-and-')[1]?.split('-')[0]?.slice(1),
      location: 'India',
      date: '2025',
      story: 'A beautiful celebration of love, captured through our lens. Every moment, every glance, every tear of joy — preserved as visual poetry for generations to come.',
      cover_image: '/images/CB8A0155.jpg',
      images: ['/images/WC__7232.jpg', '/images/CB8A0155.jpg', '/images/WC__8428.jpg', '/images/IMG_4312.jpg', '/images/WC_17407.JPG', '/images/WC_19833.jpg', '/images/DJI_20241209172706_0093_D_FLYCAPTURE.jpg'],
      credits: [{ label: 'Venue', value: 'India' }],
    };
  }
});

export default function PortfolioDetailPage({ slug }) {
  const [story, setStory] = useState(null);

  useEffect(() => {
    if (!slug) return;

    fetch(`http://localhost:8000/api/portfolios/${slug}`)
      .then(r => r.json())
      .then(data => setStory(data))
      .catch(() => {
        setStory(staticStories[slug] || staticStories['riya-and-arjun-udaipur']);
      });
  }, [slug]);

  if (!story) {
    return (
      <div style={{ marginTop: 'var(--header-height)', padding: '200px 40px', textAlign: 'center' }}>
        <p className="section-label">Loading...</p>
      </div>
    );
  }

  return (
    <div className="page-enter">
      <div className="story-hero">
        <img src={story.cover_image} alt={story.couple_names} />
        <div className="story-hero-overlay">
          <h1 className="story-hero-title">{story.couple_names}</h1>
          <p className="story-hero-meta">{story.location} — {story.date}</p>
        </div>
      </div>

      <div className="story-content">
        {story.title && (
          <h2 className="section-title" style={{ marginBottom: '30px' }}>{story.title}</h2>
        )}
        <p className="story-narrative">{story.story}</p>

        {story.credits && story.credits.length > 0 && (
          <div className="story-credits">
            <h3 className="story-credits-title">Credits</h3>
            {story.credits.map((c, i) => (
              <div className="credit-item" key={i}>
                <span className="credit-label">{c.label}</span>
                <span className="credit-value">{c.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {story.images && story.images.length > 0 && (
        <div className="story-gallery">
          {story.images.map((img, i) => (
            <img src={img} alt={`${story.couple_names} ${i + 1}`} key={i} />
          ))}
        </div>
      )}

      <div style={{ textAlign: 'center', padding: '0 40px 80px' }}>
        <a href="/portfolio" className="cta-btn" style={{
          color: 'var(--text-primary)',
          borderColor: 'var(--border)',
        }}>
          ← Back to Portfolio
        </a>
      </div>
    </div>
  );
}
