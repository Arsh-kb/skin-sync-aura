import type { Product } from "@/data/mockData";
import { SafetyBadge } from "./SafetyBadge";
import { IngredientSheet } from "./IngredientSheet";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
  onClick?: () => void;
  variant?: "default" | "compact";
}

export function ProductCard({ product, className, onClick, variant = "default" }: ProductCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn("rounded-3xl overflow-hidden hover-lift cursor-pointer group relative shadow-lg", "glass", className)}
    >
      <div className={cn("relative overflow-hidden", variant === "compact" ? "h-44" : "h-56 md:h-64")}>
        <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/15 to-transparent" />
        <div className="absolute top-3 right-3">
          <SafetyBadge status={product.safety} size="sm" showLabel={false} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="text-[9px] text-muted-foreground font-medium uppercase tracking-[0.15em]">{product.brand}</p>
          <h3 className="font-display font-semibold text-foreground leading-snug text-sm mt-0.5">{product.name}</h3>
          <div className="flex flex-wrap gap-1 mt-2.5">
            {product.ingredients.slice(0, 2).map((ing) => (
              <IngredientSheet key={ing.name} ingredientName={ing.name}>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="text-[8px] px-2 py-0.5 rounded-full bg-background/50 backdrop-blur-sm text-foreground font-medium hover:bg-primary/20 transition-colors"
                >
                  {ing.name}
                </button>
              </IngredientSheet>
            ))}
            {product.ingredients.length > 2 && (
              <span className="text-[8px] px-2 py-0.5 rounded-full bg-background/50 backdrop-blur-sm text-muted-foreground">
                +{product.ingredients.length - 2}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
