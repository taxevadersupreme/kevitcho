interface GreekMeanderProps {
  className?: string;
  variant?: 'simple' | 'complex' | 'wave';
}

export default function GreekMeander({ className = "", variant = 'simple' }: GreekMeanderProps) {
  if (variant === 'simple') {
    return (
      <div className={`w-full h-8 ${className}`}>
        <svg className="w-full h-full" viewBox="0 0 1200 80" preserveAspectRatio="none">
          <defs>
            <pattern id="meander-simple" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <path
                d="M 0,20 L 0,0 L 60,0 L 60,60 L 20,60 L 20,20 L 40,20 L 40,40 L 80,40 L 80,80 L 0,80 L 0,60"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="square"
                strokeLinejoin="miter"
              />
            </pattern>
          </defs>
          <rect width="1200" height="80" fill="url(#meander-simple)" />
        </svg>
      </div>
    );
  }
  
  if (variant === 'wave') {
    return (
      <div className={`w-full h-6 ${className}`}>
        <svg className="w-full h-full" viewBox="0 0 1200 60" preserveAspectRatio="none">
          <defs>
            <pattern id="wave-pattern" x="0" y="0" width="40" height="60" patternUnits="userSpaceOnUse">
              <path
                d="M 0,30 Q 10,10 20,30 T 40,30"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </pattern>
          </defs>
          <rect width="1200" height="60" fill="url(#wave-pattern)" />
        </svg>
      </div>
    );
  }
  
  // complex variant
  return (
    <div className={`w-full h-12 ${className}`}>
      <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <defs>
          <pattern id="meander-complex" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
            <path
              d="M 0,30 L 0,0 L 90,0 L 90,90 L 30,90 L 30,30 L 60,30 L 60,60 L 120,60 L 120,120 L 0,120 L 0,90"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
          </pattern>
        </defs>
        <rect width="1200" height="120" fill="url(#meander-complex)" />
        <line x1="0" y1="0" x2="1200" y2="0" stroke="currentColor" strokeWidth="3" />
        <line x1="0" y1="120" x2="1200" y2="120" stroke="currentColor" strokeWidth="3" />
      </svg>
    </div>
  );
}
