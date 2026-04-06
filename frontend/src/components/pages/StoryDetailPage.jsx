import { useState, useEffect } from 'react';

const staticPosts = {
  'art-of-candid-moments': {
    title: 'The Art of Capturing Candid Moments',
    content: 'In the world of wedding photography, there\'s a growing appreciation for the unscripted, the unplanned, the beautifully imperfect.\n\nThese are the stories we live to tell.',
    cover_image: '/images/CB8A0155.jpg',
    tags: ['photography', 'tips', 'candid'],
  },
  'choosing-dream-destination': {
    title: 'Choosing Your Dream Wedding Destination',
    content: 'India offers a treasure trove of wedding destinations, each with its own character and charm.\n\nThe key is to choose a destination that reflects who you are as a couple.',
    cover_image: '/images/WC__8428.jpg',
    tags: ['destination', 'planning', 'venues'],
  },
  'behind-the-lens-creative-process': {
    title: 'Behind the Lens: Our Creative Process',
    content: 'Every wedding we photograph begins long before the camera comes out.\n\nThe goal is always the same: to create images that don\'t just document a day, but tell a love story.',
    cover_image: '/images/WC__7232.jpg',
    tags: ['behind-the-scenes', 'process', 'photography'],
  },
};

export default function StoryDetailPage({ slug }) {
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (!slug) return;
    fetch(`http://localhost:8000/api/blog/${slug}`)
      .then(r => r.json())
      .then(data => setPost(data))
      .catch(() => {
        setPost(staticPosts[slug] || Object.values(staticPosts)[0]);
      });
  }, [slug]);

  if (!post) {
    return (
      <div style={{ marginTop: 'var(--header-height)', padding: '200px 40px', textAlign: 'center' }}>
        <p className="section-label">Loading...</p>
      </div>
    );
  }

  return (
    <div className="page-enter">
      <div className="story-hero" style={{ height: '50vh' }}>
        <img src={post.cover_image} alt={post.title} />
        <div className="story-hero-overlay">
          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
            {post.tags?.map((tag, i) => (
              <span key={i} className="blog-tag" style={{ color: 'rgba(255,255,255,0.7)' }}>{tag}</span>
            ))}
          </div>
          <h1 className="story-hero-title">{post.title}</h1>
        </div>
      </div>

      <div className="story-content">
        {post.content?.split('\n\n').map((paragraph, i) => (
          <p key={i} className="story-narrative">{paragraph}</p>
        ))}
      </div>

      <div style={{ textAlign: 'center', padding: '0 40px 80px' }}>
        <a href="/stories" className="cta-btn" style={{ color: 'var(--text-primary)', borderColor: 'var(--border)' }}>
          ← Back to Stories
        </a>
      </div>
    </div>
  );
}
