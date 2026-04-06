import { products, ingredientConflicts } from "@/data/mockData";
import { ProductCard } from "@/components/ProductCard";
import { SafetyBadge } from "@/components/SafetyBadge";
import { ArrowLeftRight, Check, AlertTriangle, X, Zap } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { SafetyStatus } from "@/data/mockData";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Compare() {
  const [productA, setProductA] = useState(products[0]);
  const [productB, setProductB] = useState(products[2]);
  const [selectingSlot, setSelectingSlot] = useState<"A" | "B" | null>(null);
  const resultRef = useScrollReveal();

  const conflicts: { pair: string; level: "red" | "yellow" }[] = [];
  const overlaps: string[] = [];

  productA.ingredients.forEach((a) => {
    productB.ingredients.forEach((b) => {
      if (a.name === b.name) overlaps.push(a.name);
      const entry = ingredientConflicts[a.name];
      if (entry?.conflicts.includes(b.name)) {
        conflicts.push({ pair: `${a.name} × ${b.name}`, level: entry.level });
      }
    });
  });

  const hasRed = conflicts.some(c => c.level === "red");
  const result: SafetyStatus = hasRed ? "conflict" : conflicts.length > 0 ? "caution" : overlaps.length > 0 ? "caution" : "safe";
  const resultLabels = { safe: "Compatible", caution: "Use With Care", conflict: "Conflict Detected" };
  const resultDescriptions = {
    safe: "These products can be safely layered together.",
    caution: "Some ingredients may reduce each other's effectiveness.",
    conflict: "Direct contraindications found — avoid using together.",
  };
  const resultIcons = { safe: Check, caution: AlertTriangle, conflict: X };
  const ResultIcon = resultIcons[result];

  return (
    <div className="min-h-screen pb-24 md:pb-8 relative overflow-hidden">
      <div className="deco-glow-peach w-[250px] h-[250px] top-[40vh] right-[-80px] fixed opacity-20" />

      {/* Hero */}
      <div className="relative h-[42vh] min-h-[300px] overflow-hidden md:rounded-b-[2rem]">
        <img
          src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=1200&h=600&fit=crop"
          alt=""
          className="w-full h-full object-cover animate-gentle-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/50 to-background" />
        <div className="absolute bottom-0 left-0 px-6 pb-10 md:px-10">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground tracking-tight">Compare Products</h1>
          <p className="text-xs text-muted-foreground mt-1.5 tracking-wide">Tap a product to swap</p>
        </div>
      </div>

      <div className="px-5 md:px-10 space-y-6 -mt-6 relative z-10 md:max-w-3xl md:mx-auto">
        {selectingSlot ? (
          <div className="space-y-4 animate-fade-in-scale">
            <p className="text-sm text-muted-foreground">Select product for Slot {selectingSlot}:</p>
            <div className="columns-2 md:columns-3 gap-4 space-y-4">
              {products.map((p) => (
                <div key={p.id} className="break-inside-avoid">
                  <ProductCard
                    product={p}
                    variant="compact"
                    onClick={() => {
                      if (selectingSlot === "A") setProductA(p);
                      else setProductB(p);
                      setSelectingSlot(null);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Side by side */}
            <div className="grid grid-cols-2 gap-4">
              <div onClick={() => setSelectingSlot("A")} className="cursor-pointer">
                <ProductCard product={productA} variant="compact" />
              </div>
              <div onClick={() => setSelectingSlot("B")} className="cursor-pointer">
                <ProductCard product={productB} variant="compact" />
              </div>
            </div>

            <div className="flex justify-center py-2">
              <div className="w-11 h-11 rounded-full glass-rose flex items-center justify-center shadow-lg">
                <ArrowLeftRight size={16} className="text-muted-foreground" />
              </div>
            </div>

            {/* Result Card */}
            <div ref={resultRef} className={cn(
              "glass-strong rounded-3xl p-7 space-y-6 shadow-xl",
              result === "safe" && "safety-glow-safe",
              result === "caution" && "safety-glow-caution",
              result === "conflict" && "safety-glow-conflict",
            )}>
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-13 h-13 rounded-2xl flex items-center justify-center shadow-md",
                  result === "safe" && "bg-safe/15",
                  result === "caution" && "bg-caution/15",
                  result === "conflict" && "bg-conflict/15",
                )}>
                  <ResultIcon size={22} className={cn(
                    result === "safe" && "text-safe-foreground",
                    result === "caution" && "text-caution-foreground",
                    result === "conflict" && "text-conflict-foreground",
                  )} />
                </div>
                <div className="space-y-1">
                  <h3 className="font-display font-semibold text-foreground text-xl">{resultLabels[result]}</h3>
                  <p className="text-xs text-muted-foreground">{resultDescriptions[result]}</p>
                </div>
              </div>

              {conflicts.length > 0 && (
                <div className="space-y-3">
                  <p className="text-[10px] font-semibold text-conflict-foreground uppercase tracking-[0.15em]">Ingredient Conflicts</p>
                  {conflicts.map((c) => (
                    <div key={c.pair} className={cn(
                      "text-sm rounded-2xl px-4 py-3 flex items-center gap-2 shadow-sm",
                      c.level === "red" ? "bg-conflict/10 text-conflict-foreground" : "bg-caution/10 text-caution-foreground"
                    )}>
                      <Zap size={14} />
                      {c.pair}
                    </div>
                  ))}
                </div>
              )}

              {overlaps.length > 0 && (
                <div className="space-y-3">
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.15em]">Shared Ingredients</p>
                  <div className="flex flex-wrap gap-2">
                    {overlaps.map((o) => (
                      <span key={o} className="text-xs bg-champagne rounded-full px-3.5 py-1.5 text-foreground font-medium shadow-sm">{o}</span>
                    ))}
                  </div>
                </div>
              )}

              {result === "safe" && conflicts.length === 0 && overlaps.length === 0 && (
                <p className="text-sm text-muted-foreground leading-relaxed">No ingredient conflicts detected. These products complement each other well.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
