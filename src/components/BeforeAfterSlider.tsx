import { useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

const beforeImage = "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&h=800&fit=crop&q=80";
const afterImage = "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=600&h=800&fit=crop&q=80";

export function BeforeAfterSlider() {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e: React.MouseEvent) => { if (isDragging) updatePosition(e.clientX); };
  const handleTouchMove = (e: React.TouchEvent) => { updatePosition(e.touches[0].clientX); };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <h2 className="font-display font-semibold text-lg text-foreground">Your Transformation</h2>
        <div className="flex gap-2">
          <span className="text-[10px] px-2.5 py-1 rounded-full glass-rose font-medium text-foreground">Week 1</span>
          <span className="text-[10px] px-2.5 py-1 rounded-full bg-primary/10 font-medium text-primary">Week 4</span>
        </div>
      </div>
      <p className="text-xs text-muted-foreground px-1 -mt-2">Drag the slider to compare your progress</p>

      <div
        ref={containerRef}
        className="relative rounded-2xl overflow-hidden h-72 md:h-96 cursor-col-resize select-none glass"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        {/* After (full) */}
        <img src={afterImage} alt="After" className="absolute inset-0 w-full h-full object-cover" />

        {/* Before (clipped) */}
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
          <img
            src={beforeImage}
            alt="Before"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : "100vw" }}
          />
        </div>

        {/* Slider line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white/80 z-10"
          style={{ left: `${position}%` }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        >
          {/* Handle */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-xl flex items-center justify-center cursor-grab active:cursor-grabbing">
            <div className="flex gap-0.5">
              <div className="w-0.5 h-4 bg-primary/60 rounded-full" />
              <div className="w-0.5 h-4 bg-primary/60 rounded-full" />
            </div>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-4 z-20">
          <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full">
            Before
          </span>
        </div>
        <div className="absolute top-4 right-4 z-20">
          <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full">
            After
          </span>
        </div>
      </div>
    </div>
  );
}
