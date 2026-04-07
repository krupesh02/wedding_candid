
export default function AboutPage() {
  return (
    <div className="page-enter">
      <div className="about-hero">
        <p className="section-label">About Us</p>
        <h1 className="about-tagline">
          &ldquo;You Feel. I Focus. <em>We Frame.</em>&rdquo;
        </h1>
        <p className="section-subtitle" style={{ margin: '0 auto', maxWidth: '700px' }}>
          A wedding is a validation coupled with the showcase of Love — what if it could never be recorded?
          A chronology of a couple&apos;s journey where they vow together to be One.
        </p>
      </div>


      <div className="about-content">
        <div className="about-image">
          <img src="/images/1M4A8828.jpg" alt="Reverie Photographer" />
        </div>
        <div className="about-text-content">
          <p className="section-label">The Storyteller</p>
          <h3>We are creating fiction<br />out of <em style={{ color: 'var(--accent)', fontStyle: 'italic', fontFamily: 'var(--font-serif)' }}>reality.</em></h3>
          <p>
            Wedding Candids is a destination wedding photography and films studio capturing
            timeless love tales across the globe. From intimate moments to grand celebrations,
            we craft visual poetry that feels personal, poetic, and unforgettable.
          </p>
          <p>
            Considered to be at the forefront of Modern Wedding Photography and Filmmaking,
            Wedding Candids has transformed the way wedding stories are told. For almost a decade,
            we have been creating photographs and films which are timeless and have been etched
            in the memories of thousands of people forever.
          </p>
          <p>
            Awarded as the Wedding Filmmaker of the year at multiple prestigious platforms,
            our work spans across 25 countries and documents stories that continuously overwhelm us.
          </p>
        </div>
      </div>

      <div className="about-philosophy">
        <p className="section-label" style={{ marginBottom: '30px' }}>Our Philosophy</p>
        <blockquote>
          &ldquo;We celebrate the wild ones, the rule breakers, the travellers, the new age modern
          couple who are not afraid to experiment. We believe the ultimate goal of a wedding
          photographer is to justify the vibe of the wedding and the personalities of the couple.
          And this approach has helped us experience weddings in two-bedroom apartments to
          weddings spread over 2 continents.&rdquo;
        </blockquote>
      </div>

      <div className="section" style={{ textAlign: 'center' }}>
        <p className="section-label">The Eyes Behind The Lens</p>
        <h2 className="section-title">Meet <em>Wedding Candids</em></h2>
        <p className="section-subtitle" style={{ margin: '0 auto', maxWidth: '700px' }}>
          We&apos;re a team of heart-winning storytellers. We&apos;re smile-searchers, light-catchers,
          love-whisperers, story-spinners, colour-painters. And we can&apos;t wait to hear your story.
        </p>
      </div>

      <div className="featured-in">
        <p className="section-label" style={{ textAlign: 'center', marginBottom: '40px' }}>Featured In</p>
        <div className="featured-in-logos">
          <span className="featured-logo">Vogue India</span>
          <span className="featured-logo">WedMeGood</span>
          <span className="featured-logo">ShaadiSaga</span>
          <span className="featured-logo">Wedding Sutra</span>
          <span className="featured-logo">Femina</span>
        </div>
      </div>

    </div>
  );
}
