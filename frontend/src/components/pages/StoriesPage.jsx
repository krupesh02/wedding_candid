import { useState, useEffect } from 'react';

const staticPosts = [
  { slug: 'art-of-candid-moments', title: 'The Art of Capturing Candid Moments', excerpt: 'Why the unscripted moments at your wedding are the ones you\'ll treasure most.', cover_image: '/images/CB8A0155.jpg', tags: ['photography', 'tips', 'candid'] },
  { slug: 'choosing-dream-destination', title: 'Choosing Your Dream Wedding Destination', excerpt: 'From Udaipur palaces to Goan beaches — how to find the perfect backdrop for your love story.', cover_image: '/images/WC__8428.jpg', tags: ['destination', 'planning', 'venues'] },
  { slug: 'behind-the-lens-creative-process', title: 'Behind the Lens: Our Creative Process', excerpt: 'A peek into how we approach each wedding as a unique story waiting to be told.', cover_image: '/images/WC__7232.jpg', tags: ['behind-the-scenes', 'process', 'photography'] },
];

export default function StoriesPage() {
  const [posts, setPosts] = useState(staticPosts);

  useEffect(() => {
    fetch('http://localhost:8000/api/blog/')
      .then(r => r.json())
      .then(data => { if (data.length) setPosts(data); })
      .catch(() => {});
  }, []);

  return (
    <div className="page-enter" style={{ marginTop: 'var(--header-height)' }}>
      <div className="section">
        <p className="section-label">From Our Journal</p>
        <h1 className="section-title">Love <em>Stories</em></h1>
        <p className="section-subtitle">
          Thoughts, tips, and tales from behind the lens.
        </p>
        <div className="section-divider"></div>

        <div className="blog-grid" style={{ marginTop: '50px' }}>
          {posts.map((post, i) => (
            <a href={`/stories/${post.slug}`} key={i} className="blog-card">
              <div className="blog-card-image">
                <img src={post.cover_image} alt={post.title} />
              </div>
              <div className="blog-card-tags">
                {post.tags?.map((tag, ti) => (
                  <span key={ti} className="blog-tag">{tag}</span>
                ))}
              </div>
              <h3 className="blog-card-title">{post.title}</h3>
              <p className="blog-card-excerpt">{post.excerpt}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
