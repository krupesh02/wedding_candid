import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import MarqueeText from '../MarqueeText.jsx';
import TestimonialSlider from '../TestimonialSlider.jsx';
import FadeUp from '../animations/FadeUp.jsx';
import ClipReveal from '../animations/ClipReveal.jsx';
import TextReveal from '../animations/TextReveal.jsx';
import ScrollScale from '../animations/ScrollScale.jsx';

// Static fallback data
const staticPortfolios = [
  {
    slug: 'riya-and-arjun-udaipur',
    couple_names: 'Riya & Arjun',
    location: 'Udaipur, Rajasthan',
    date: 'February 2026',
    category: 'destination',
    excerpt: 'A magnificent celebration at the City of Lakes, where royalty met romance under the Rajasthani sky.',
    cover_image: '/images/WC__7232.jpg',
    featured: true,
  },
  {
    slug: 'priya-and-vikram-goa',
    couple_names: 'Priya & Vikram',
    location: 'Goa',
    date: 'December 2025',
    category: 'destination',
    excerpt: 'Where the Arabian Sea whispered blessings and the sunset painted their love in hues of gold and amber.',
    cover_image: '/images/WC__8428.jpg',
    featured: true,
  },
  {
    slug: 'ananya-and-karan-delhi',
    couple_names: 'Ananya & Karan',
    location: 'New Delhi',
    date: 'November 2025',
    category: 'intimate',
    excerpt: 'A love letter written in flowers, fairy lights, and the warmth of family.',
    cover_image: '/images/IMG_4312.jpg',
    featured: true,
  },
  {
    slug: 'meera-and-sahil-jaipur',
    couple_names: 'Meera & Sahil',
    location: 'Jaipur, Rajasthan',
    date: 'January 2026',
    category: 'indian',
    excerpt: 'Where centuries-old haveli walls echoed with the music of a love that\'s timeless.',
    cover_image: '/images/MBJ_5953.jpg',
    featured: true,
  },
  {
    slug: 'nina-and-rohan-tuscany',
    couple_names: 'Nina & Rohan',
    location: 'Tuscany, Italy',
    date: 'September 2025',
    category: 'destination',
    excerpt: 'Indian hearts, Italian soul — a destination wedding that blended two cultures.',
    cover_image: '/images/CB8A0155.jpg',
    featured: false,
  },
];

const staticTestimonials = [
  {
    couple_names: 'Krishna & Omar',
    location: 'Jaipur',
    review: 'Aside from being absurdly good photographers, the team at Reverie quickly became our friends, our personal assistants, and even our firefighters when something didn\'t go as planned. They kept our energy up during long days, they moved with empathy, and they made it so easy for us to be ourselves in front of the camera.',
    image: '/images/WC__7232.jpg',
  },
  {
    couple_names: 'Priyanka & Rishab',
    location: 'Mumbai',
    review: 'Reverie was absolutely amazing! We are beyond thrilled with how our wedding pictures, trailers, and videos turned out. Their professionalism and ability to adapt to the chaos around the events was truly impressive. They captured both the big and small moments so beautifully.',
    image: '/images/CB8A0155.jpg',
  },
  {
    couple_names: 'Meera & Aditya',
    location: 'Udaipur',
    review: 'Working with Reverie was an absolute dream. They captured our wedding in a way that felt effortless and natural. The team blended seamlessly into the celebrations, never intrusive, yet always in the right place at the right time. They turned our memories into magic.',
    image: '/images/WC__8428.jpg',
  },
  {
    couple_names: 'Fagun & Heer',
    location: 'Delhi',
    review: 'Despite it being a small gathering, the photographer personally came to photograph the event — a gesture that really stood out. They were warm, courteous, and instantly understood the kind of moments we wanted captured. Every single image was beautifully shot.',
    image: '/images/IMG_4312.jpg',
  },
];

const staticFilms = [
  {
    slug: 'love-in-second-innings',
    couple_names: 'Deepal & Nishant',
    location: 'Mumbai',
    excerpt: 'Second marriage, for many, is still a taboo. This story illustrates why it shouldn\'t be.',
    cover_image: '/images/WC__7232.jpg',
    video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    slug: 'twenty-years-in-the-making',
    couple_names: 'Hiba & Akbar',
    location: 'Bhopal',
    excerpt: 'An India-Pakistan love story that transcends borders, politics, and time itself.',
    cover_image: '/images/IMG_4312.jpg',
    video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    slug: 'whispers-of-forever',
    couple_names: 'Aisha & Dev',
    location: 'Udaipur',
    excerpt: 'A modern love story told through the lens of ancient Rajasthani grandeur.',
    cover_image: '/images/MBJ_5953.jpg',
    video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
];

/* ---- Hero with Parallax ---- */
function HeroSection({ image }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);

  return (
    <section className="hero-fullscreen" ref={ref} id="hero-section">
      <div className="hero-image-wrapper">
        <motion.img
          src={image}
          alt="Wedding Photography"
          style={{ y, scale }}
        />
        <div className="hero-overlay" />
      </div>
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 3.2, ease: [0.33, 1, 0.68, 1] }}
      >
        <h1 className="hero-tagline">
          Capturing your love&apos;s legacy with an elegant, editorial, and <em>Indian</em> flair.
        </h1>
        <div className="hero-cta-wrapper">
          <a href="/enquire" className="hero-cta">
            Check Availability
          </a>
        </div>
      </motion.div>
    </section>
  );
}

/* ---- Alternating Portfolio Grid ---- */
function PortfolioAlternating({ stories }) {
  const rows = [];
  let idx = 0;
  let rowType = 'full';

  while (idx < stories.length) {
    if (rowType === 'full') {
      rows.push({ type: 'full', items: [stories[idx]] });
      idx += 1;
      rowType = 'split';
    } else {
      const pair = stories.slice(idx, idx + 2);
      if (pair.length === 2) {
        rows.push({ type: 'split', items: pair });
        idx += 2;
      } else {
        rows.push({ type: 'full', items: pair });
        idx += 1;
      }
      rowType = 'full';
    }
  }

  return (
    <div className="portfolio-alternating">
      {rows.map((row, ri) => (
        <ScrollScale key={ri}>
          <div className={`portfolio-row ${row.type === 'full' ? 'portfolio-row-full' : 'portfolio-row-split'}`}>
            {row.items.map((story, si) => (
              <a
                href={`/portfolio/${story.slug}`}
                className="portfolio-item"
                key={si}
              >
                <img src={story.cover_image} alt={story.couple_names} />
                <div className="portfolio-item-overlay">
                  <div className="portfolio-item-info">
                    <h3 className="portfolio-item-title">{story.couple_names}</h3>
                    <p className="portfolio-item-subtitle">{story.location}</p>
                    <span className="portfolio-see-project">See Project</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </ScrollScale>
      ))}
    </div>
  );
}

export default function HomePage() {
  const [portfolios, setPortfolios] = useState(staticPortfolios);
  const [testimonials, setTestimonials] = useState(staticTestimonials);
  const [films, setFilms] = useState(staticFilms);

  useEffect(() => {
    fetch('http://localhost:8000/api/portfolios/?featured=true')
      .then(r => r.json())
      .then(data => { if (data.length) setPortfolios(data); })
      .catch(() => {});

    fetch('http://localhost:8000/api/testimonials/')
      .then(r => r.json())
      .then(data => { if (data.length) setTestimonials(data); })
      .catch(() => {});

    fetch('http://localhost:8000/api/films/?featured=true')
      .then(r => r.json())
      .then(data => { if (data.length) setFilms(data); })
      .catch(() => {});
  }, []);

  const featuredStories = portfolios.filter(p => p.featured);
  const instagramImages = ['/images/WC__7232.jpg', '/images/CB8A0155.jpg', '/images/WC__8428.jpg', '/images/IMG_4312.jpg'];

  return (
    <div className="page-enter">
      {/* ===== Full-Screen Hero ===== */}
      <HeroSection image={portfolios[0]?.cover_image || '/images/WC__7232.jpg'} />

      {/* ===== Mission Quote ===== */}
      <div className="mission-section">
        <TextReveal className="mission-text" delay={0.2}>
          "Where light meets legacy — we craft visual poetry from your most intimate moments, transforming fleeting emotions into heirlooms that transcend time."
        </TextReveal>
        <FadeUp delay={0.6} yOffset={15}>
          <p className="mission-author">— Wedding Candids</p>
        </FadeUp>
      </div>

      {/* ===== Portfolio — Alternating Grid ===== */}
      <div className="section" style={{ maxWidth: '100%', padding: '0' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px', padding: '0 var(--side-pad)' }}>
          <FadeUp yOffset={15}>
            <p className="section-label" style={{ textAlign: 'center' }}>Selected Work</p>
          </FadeUp>
          <TextReveal className="section-title" style={{ textAlign: 'center' }}>
            Real Love Stories
          </TextReveal>
        </div>

        <PortfolioAlternating stories={featuredStories} />

        <div style={{ textAlign: 'center', marginTop: '80px', paddingBottom: '40px' }}>
          <FadeUp delay={0.2}>
            <a href="/portfolio" className="cta-btn">
              View All Work
            </a>
          </FadeUp>
        </div>
      </div>

      {/* ===== Marquee ===== */}
      <MarqueeText texts={[
        'Smile-Searchers',
        'Light-Catchers',
        'Love-Whisperers',
        'Story-Spinners',
        'Colour-Painters'
      ]} />

      {/* ===== Films Teaser ===== */}
      <div className="films-teaser">
        <FadeUp yOffset={15}>
          <p className="section-label">Cinematic Stories</p>
        </FadeUp>
        <TextReveal className="section-title">Where Motion Meets Emotion</TextReveal>
        <FadeUp delay={0.3}>
          <p className="section-subtitle" style={{ margin: '0 auto 60px', textAlign: 'center' }}>
            Every wedding is unique and so are our films. We set new benchmarks of storytelling within the wedding realm and beyond.
          </p>
        </FadeUp>

        <div className="films-grid">
          {films.slice(0, 3).map((film, i) => (
            <FadeUp delay={0.2 + (i * 0.15)} key={i}>
              <a href="/films" className="film-card">
                <div className="film-card-image">
                  <img src={film.cover_image} alt={film.couple_names} />
                  <div className="film-play-btn"></div>
                </div>
                <div className="film-card-info">
                  <h3 className="film-card-title">{film.couple_names}</h3>
                  <p className="film-card-meta">{film.location}</p>
                </div>
              </a>
            </FadeUp>
          ))}
        </div>
      </div>

      {/* ===== Testimonials ===== */}
      <TestimonialSlider testimonials={testimonials} />

      {/* ===== Featured In ===== */}
      <div className="featured-in">
        <FadeUp>
          <p className="section-label" style={{ textAlign: 'center', marginBottom: '40px' }}>Featured In</p>
        </FadeUp>
        <FadeUp delay={0.2}>
          <div className="featured-in-logos">
            <span className="featured-logo">Vogue India</span>
            <span className="featured-logo">WedMeGood</span>
            <span className="featured-logo">ShaadiSaga</span>
            <span className="featured-logo">Wedding Sutra</span>
            <span className="featured-logo">Femina</span>
          </div>
        </FadeUp>
      </div>

      {/* ===== Instagram ===== */}
      <div className="instagram-section">
        <FadeUp>
          <p className="section-label">Follow Our Journey</p>
          <h2 className="section-title">On <em>Instagram</em></h2>
        </FadeUp>
        <div className="instagram-grid">
          {instagramImages.map((img, i) => (
            <ClipReveal delay={i * 0.1} key={i}>
              <a href="https://instagram.com/framestories.in" target="_blank" rel="noopener noreferrer" className="instagram-item">
                <img src={img} alt={`Instagram ${i + 1}`} />
              </a>
            </ClipReveal>
          ))}
        </div>
        <FadeUp delay={0.3}>
          <a href="https://instagram.com/weddingcandids" target="_blank" rel="noopener noreferrer" className="instagram-handle">
            @weddingcandids
          </a>
        </FadeUp>
      </div>

      {/* ===== Bottom CTA ===== */}
      <div className="cta-section">
        <TextReveal className="cta-title">Your story deserves timeless images. Reach out to see if your date is available.</TextReveal>
        <FadeUp delay={0.3}>
          <a href="/enquire" className="cta-btn">
            Check Availability
          </a>
        </FadeUp>
      </div>
    </div>
  );
}
