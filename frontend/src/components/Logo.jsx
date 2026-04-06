export default function Logo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'transparent' }}>
      {/* Sleek SVG Camera Iris/Diamond Icon */}
      <svg width="60" height="60" viewBox="0 0 100 100" fill="none" style={{ overflow: 'visible' }}>
        {/* Drop shadow circle */}
        <circle cx="51" cy="51" r="42" fill="#757575" />
        {/* Blue background circle */}
        <circle cx="47" cy="47" r="42" fill="#2C449B" />

        {/* Outer lens ring */}
        <circle cx="47" cy="47" r="14" stroke="white" strokeWidth="2" fill="none" />
        {/* Inner lens ring */}
        <circle cx="47" cy="47" r="5" fill="#2C449B" stroke="white" strokeWidth="1.5" />

        {/* Iris blades */}
        <line x1="47" y1="33" x2="52" y2="44" stroke="white" strokeWidth="1.5" />
        <line x1="59" y1="40" x2="51" y2="49" stroke="white" strokeWidth="1.5" />
        <line x1="56" y1="58" x2="44" y2="52" stroke="white" strokeWidth="1.5" />
        <line x1="47" y1="61" x2="42" y2="50" stroke="white" strokeWidth="1.5" />
        <line x1="35" y1="54" x2="43" y2="45" stroke="white" strokeWidth="1.5" />
        <line x1="38" y1="36" x2="48" y2="41" stroke="white" strokeWidth="1.5" />

        {/* Camera Outline Array */}
        <path d="M 33 34 
                 C 21 34 17 40 17 48 
                 L 17 62 
                 C 17 71 21 75 29 75 
                 L 36 75 
                 C 41 75 44 66 47 63 
                 C 50 66 53 75 58 75 
                 L 65 75 
                 C 73 75 77 71 77 62 
                 L 77 48 
                 C 77 40 73 34 61 34"
          stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />

        {/* Diamond on top edge */}
        <path d="M 42 20 L 52 20 L 55 24 L 47 32 L 39 24 Z" stroke="white" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
        <line x1="39" y1="24" x2="55" y2="24" stroke="white" strokeWidth="1.5" />
        <line x1="44" y1="20" x2="47" y2="32" stroke="white" strokeWidth="1" />
        <line x1="50" y1="20" x2="47" y2="32" stroke="white" strokeWidth="1" />
      </svg>

      {/* Styled Typography */}
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 0.8, marginTop: '6px' }}>
        <span style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: '44px',
          color: '#2C449B',
          position: 'relative',
          paddingRight: '10px',
          fontWeight: 'bold',
          letterSpacing: '1px'
        }}>
          Wedd
          <span style={{ position: 'relative' }}>i
            <svg style={{ position: 'absolute', top: '-4px', left: '2px', width: '10px', height: '10px' }} viewBox="0 0 24 24" fill="#757575">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </span>
          ng
        </span>

        <span style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: '38px',
          color: '#757575',
          marginTop: '-10px',
          marginLeft: '45px',
          position: 'relative',
          fontWeight: 'bold',
          letterSpacing: '1px'
        }}>
          Cand
          <span style={{ position: 'relative' }}>i
            <svg style={{ position: 'absolute', top: '-2px', left: '2px', width: '9px', height: '9px' }} viewBox="0 0 24 24" fill="#2C449B">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </span>
          d
        </span>
      </div>
    </div>
  );
}
