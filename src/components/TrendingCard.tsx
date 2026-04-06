import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrendingCardProps {
  image: string;
  title: string;
  description: string;
  className?: string;
  onClick?: () => void;
  variant?: "blush" | "warm";
}

export function TrendingCard({ image, title, description, className, onClick, variant = "blush" }: TrendingCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center gap-4 rounded-3xl overflow-hidden cursor-pointer hover-lift group shadow-md",
        variant === "blush" ? "glass-rose" : "gradient-warm",
        "p-4",
        className
      )}
    >
      <div className="w-22 h-22 md:w-26 md:h-26 rounded-2xl overflow-hidden shrink-0 shadow-md">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-display font-semibold text-foreground text-base md:text-lg leading-snug">{title}</h4>
        <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed">{description}</p>
      </div>
      <ArrowRight size={16} className="text-muted-foreground shrink-0 group-hover:text-primary transition-colors" />
    </div>
  );
}
