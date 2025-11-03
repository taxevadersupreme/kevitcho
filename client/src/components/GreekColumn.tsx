export default function GreekColumn() {
  return (
    <div className="flex flex-col items-center">
      {/* Capital (Capitel) */}
      <div className="w-16 h-8 border-2 border-foreground bg-background relative">
        <div className="absolute inset-0 flex flex-col justify-around">
          <div className="h-px bg-foreground mx-1"></div>
          <div className="h-px bg-foreground mx-1"></div>
          <div className="h-px bg-foreground mx-1"></div>
        </div>
      </div>
      
      {/* Shaft (Fuste) */}
      <div className="w-12 h-64 border-2 border-l-foreground border-r-foreground border-t-0 border-b-0 bg-background relative">
        <div className="absolute inset-0 flex flex-col justify-around">
          <div className="h-px bg-foreground/20"></div>
          <div className="h-px bg-foreground/20"></div>
          <div className="h-px bg-foreground/20"></div>
          <div className="h-px bg-foreground/20"></div>
          <div className="h-px bg-foreground/20"></div>
        </div>
      </div>
      
      {/* Base */}
      <div className="w-16 h-6 border-2 border-foreground bg-background"></div>
    </div>
  );
}
