interface DoricColumnProps {
  height?: number;
  className?: string;
}

export default function DoricColumn({ height = 400, className = "" }: DoricColumnProps) {
  const width = height / 8; // Proporção dórica clássica
  const capitalHeight = width * 0.8;
  const baseHeight = width * 0.6;
  const shaftHeight = height - capitalHeight - baseHeight;
  
  return (
    <div className={`flex flex-col items-center ${className}`} style={{ height: `${height}px` }}>
      {/* Capitel Dórico (Ábaco + Équino) */}
      <div style={{ width: `${width * 1.3}px`, height: `${capitalHeight}px` }} className="relative">
        {/* Ábaco */}
        <div 
          className="absolute top-0 left-0 right-0 border-2 border-foreground bg-card"
          style={{ height: `${capitalHeight * 0.3}px` }}
        >
          <div className="absolute inset-0 border-t-4 border-foreground"></div>
        </div>
        {/* Équino */}
        <div 
          className="absolute bottom-0 left-0 right-0 border-2 border-l-foreground border-r-foreground border-b-0 bg-card"
          style={{ 
            height: `${capitalHeight * 0.7}px`,
            clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)'
          }}
        ></div>
      </div>
      
      {/* Fuste com caneluras */}
      <div 
        style={{ width: `${width}px`, height: `${shaftHeight}px` }} 
        className="relative border-2 border-l-foreground border-r-foreground border-t-0 border-b-0 bg-card"
      >
        {/* Caneluras (20 caneluras típicas de coluna dórica) */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 border-l border-foreground/30"
            style={{
              left: `${(i / 20) * 100}%`,
              width: '5%'
            }}
          ></div>
        ))}
        {/* Entasis (ligeiro alargamento no meio) */}
        <div 
          className="absolute left-0 right-0 bg-card/50"
          style={{
            top: '40%',
            height: '20%',
            transform: 'scaleX(1.05)'
          }}
        ></div>
      </div>
      
      {/* Base simplificada */}
      <div 
        style={{ width: `${width * 1.2}px`, height: `${baseHeight}px` }} 
        className="border-2 border-foreground bg-card relative"
      >
        <div className="absolute inset-0 flex flex-col justify-around">
          <div className="h-px bg-foreground mx-1"></div>
          <div className="h-px bg-foreground mx-1"></div>
        </div>
      </div>
    </div>
  );
}
