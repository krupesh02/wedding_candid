export default function MarqueeText({ texts }) {
  return (
    <div className="marquee-section">
      <div className="marquee-track">
        <span className="marquee-text">
          {texts.map((t, i) => (
            <span key={i}>
              {t}
              {i < texts.length - 1 && <span className="separator"></span>}
            </span>
          ))}
          <span className="separator"></span>
        </span>
        <span className="marquee-text">
          {texts.map((t, i) => (
            <span key={i}>
              {t}
              {i < texts.length - 1 && <span className="separator"></span>}
            </span>
          ))}
          <span className="separator"></span>
        </span>
        <span className="marquee-text">
          {texts.map((t, i) => (
            <span key={i}>
              {t}
              {i < texts.length - 1 && <span className="separator"></span>}
            </span>
          ))}
          <span className="separator"></span>
        </span>
      </div>
    </div>
  );
}
