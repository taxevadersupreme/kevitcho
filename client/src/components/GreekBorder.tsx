interface GreekBorderProps {
  className?: string;
}

export default function GreekBorder({ className = "" }: GreekBorderProps) {
  return (
    <div className={`w-full h-4 relative overflow-hidden ${className}`}>
      <svg className="w-full h-full" viewBox="0 0 1000 40" preserveAspectRatio="none">
        <pattern id="greek-key" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path
            d="M 0 0 L 0 10 L 10 10 L 10 30 L 30 30 L 30 0 L 20 0 L 20 20 L 0 20 Z M 30 10 L 40 10 L 40 40 L 10 40 L 10 30"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </pattern>
        <rect width="1000" height="40" fill="url(#greek-key)" />
      </svg>
    </div>
  );
}
