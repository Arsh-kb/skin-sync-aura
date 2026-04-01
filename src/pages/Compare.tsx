import { products, ingredientConflicts } from "@/data/mockData";
import { ProductCard } from "@/components/ProductCard";
import { SafetyBadge } from "@/components/SafetyBadge";
import { ArrowLeftRight, Check, AlertTriangle, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { SafetyStatus } from "@/data/mockData";

export default function Compare() {
  const [productA, setProductA] = useState(products[0]);
  const [productB, setProductB] = useState(products[2]);
  const [selectingSlot, setSelectingSlot] = useState<"A" | "B" | null>(null);

  const conflicts: string[] = [];
  const overlaps: string[] = [];

  productA.ingredients.forEach((a) => {
    productB.ingredients.forEach((b) => {
      if (a.name === b.name) overlaps.push(a.name);
      if (ingredientConflicts[a.name]?.includes(b.name)) {
        conflicts.push(`${a.name} × ${b.name}`);
      }
    });
  });

  const result: SafetyStatus = conflicts.length > 0 ? "conflict" : overlaps.length > 0 ? "caution" : "safe";
  const resultLabels = { safe: "Compatible", caution: "Shared Ingredients", conflict: "Conflict Detected" };
  const resultIcons = { safe: Check, caution: AlertTriangle, conflict: X };
  const ResultIcon = resultIcons[result];

  return (
    <div className="min-h-screen pb-24">
      <div className="px-5 pt-8 space-y-5">
        <h1 className="text-2xl font-display font-bold text-foreground">Compare Products</h1>

        {selectingSlot ? (
          <div className="space-y-3 animate-fade-in">
            <p className="text-sm text-muted-foreground">Select product for Slot {selectingSlot}:</p>
            <div className="grid grid-cols-2 gap-3">
              {products.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onClick={() => {
                    if (selectingSlot === "A") setProductA(p);
                    else setProductB(p);
                    setSelectingSlot(null);
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Side by side */}
            <div className="grid grid-cols-2 gap-3">
              <div onClick={() => setSelectingSlot("A")} className="cursor-pointer">
                <ProductCard product={productA} />
              </div>
              <div onClick={() => setSelectingSlot("B")} className="cursor-pointer">
                <ProductCard product={productB} />
              </div>
            </div>

            <div className="flex justify-center">
              <ArrowLeftRight size={20} className="text-muted-foreground" />
            </div>

            {/* Result Card */}
            <div className={cn(
              "glass rounded-2xl p-5 space-y-4 animate-scale-in",
              result === "safe" && "safety-glow-safe",
              result === "caution" && "safety-glow-caution",
              result === "conflict" && "safety-glow-conflict",
            )}>
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center",
                  result === "safe" && "bg-safe/20",
                  result === "caution" && "bg-caution/20",
                  result === "conflict" && "bg-conflict/20",
                )}>
                  <ResultIcon size={20} className={cn(
                    result === "safe" && "text-safe-foreground",
                    result === "caution" && "text-caution-foreground",
                    result === "conflict" && "text-conflict-foreground",
                  )} />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground">{resultLabels[result]}</h3>
                  <SafetyBadge status={result} size="sm" />
                </div>
              </div>

              {conflicts.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-medium text-conflict-foreground uppercase tracking-wider">Conflicts</p>
                  {conflicts.map((c) => (
                    <div key={c} className="text-sm bg-conflict/10 rounded-xl px-3 py-2 text-conflict-foreground">{c}</div>
                  ))}
                </div>
              )}

              {overlaps.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Shared Ingredients</p>
                  <div className="flex flex-wrap gap-2">
                    {overlaps.map((o) => (
                      <span key={o} className="text-xs bg-skin-peach rounded-full px-3 py-1 text-foreground">{o}</span>
                    ))}
                  </div>
                </div>
              )}

              {result === "safe" && conflicts.length === 0 && overlaps.length === 0 && (
                <p className="text-sm text-muted-foreground">These products have no ingredient conflicts and can be used together safely.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
