import type { Product } from "@/data/mockData";
import { SafetyBadge } from "./SafetyBadge";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
  onClick?: () => void;
  variant?: "default" | "compact";
}

const categoryColors: Record<string, string> = {
  active: "bg-primary/10 text-primary",
  hydrator: "bg-safe/12 text-safe-foreground",
  exfoliant: "bg-caution/15 text-caution-foreground",
  antioxidant: "bg-skin-pink text-foreground",
  emollient: "bg-champagne text-foreground",
  spf: "bg-secondary text-secondary-foreground",
};

export function ProductCard({ product, className, onClick, variant = "default" }: ProductCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "glass rounded-2xl overflow-hidden hover-lift cursor-pointer group relative",
        className
      )}
    >
      <div className={cn("relative overflow-hidden", variant === "compact" ? "h-36" : "h-44")}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
        <div className="absolute top-3 right-3">
          <SafetyBadge status={product.safety} size="sm" />
        </div>
      </div>
      <div className="p-4 space-y-2">
        <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-[0.15em]">{product.brand}</p>
        <h3 className="font-display font-semibold text-foreground leading-snug text-[15px]">{product.name}</h3>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {product.ingredients.slice(0, 3).map((ing) => (
            <span
              key={ing.name}
              className={cn(
                "text-[9px] px-2 py-0.5 rounded-full font-medium",
                categoryColors[ing.category] || "bg-muted text-muted-foreground"
              )}
            >
              {ing.name}
            </span>
          ))}
          {product.ingredients.length > 3 && (
            <span className="text-[9px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
              +{product.ingredients.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
