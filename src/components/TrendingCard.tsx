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
        "flex items-center gap-4 rounded-2xl overflow-hidden cursor-pointer hover-lift group",
        variant === "blush" ? "glass-rose" : "gradient-warm",
        "p-3",
        className
      )}
    >
      <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden shrink-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-display font-semibold text-foreground text-sm md:text-base leading-snug">{title}</h4>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">{description}</p>
      </div>
      <ArrowRight size={16} className="text-muted-foreground shrink-0 group-hover:text-primary transition-colors" />
    </div>
  );
}
