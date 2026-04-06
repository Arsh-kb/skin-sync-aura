import { products, ingredientConflicts } from "@/data/mockData";
import { SafetyBadge } from "@/components/SafetyBadge";
import { IngredientSheet } from "@/components/IngredientSheet";
import { Scene3D } from "@/components/Scene3D";
import { AlertOctagon, Check, AlertTriangle, Zap, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const conflictExamples = [
  {
    pair: "Retinol × Glycolic Acid",
    level: "red" as const,
    severity: "HIGH",
    explanation: "Both accelerate cell turnover. Together they can cause severe irritation, redness, and compromised barrier function.",
    fix: "Alternate nights: AHA on Day 1, Retinol on Day 2. Never layer in the same routine.",
  },
  {
    pair: "Vitamin C × Retinol",
    level: "red" as const,
    severity: "HIGH",
    explanation: "Vitamin C works at low pH; Retinol at higher pH. Combined, neither performs optimally and irritation risk spikes.",
    fix: "Use Vitamin C in AM routine and Retinol in PM routine.",
  },
  {
    pair: "Vitamin C × Niacinamide",
    level: "yellow" as const,
    severity: "MEDIUM",
    explanation: "Older research suggested conflict; modern formulations show they can coexist. Efficacy may reduce slightly.",
    fix: "Apply Vitamin C first, wait 1-2 minutes, then Niacinamide. Or use in separate routines.",
  },
  {
    pair: "Salicylic Acid × Glycolic Acid",
    level: "red" as const,
    severity: "HIGH",
    explanation: "Both are exfoliants. Layering doubles the exfoliation intensity, risking chemical burns and barrier damage.",
    fix: "Choose one exfoliant per routine. Use BHA for oily/acne skin, AHA for texture/dullness.",
  },
];

export default function Conflicts() {
  const matrixRef = useScrollReveal();
  const dbRef = useScrollReveal();

  const matrix = useMemo(() => {
    const results: { a: string; b: string; status: "safe" | "caution" | "conflict" }[] = [];
    for (let i = 0; i < products.length; i++) {
      for (let j = i + 1; j < products.length; j++) {
        let hasRed = false;
        let hasYellow = false;
        products[i].ingredients.forEach(ingA => {
          products[j].ingredients.forEach(ingB => {
            const entry = ingredientConflicts[ingA.name];
            if (entry?.conflicts.includes(ingB.name)) {
              if (entry.level === "red") hasRed = true;
              else hasYellow = true;
            }
          });
        });
        results.push({ a: products[i].name, b: products[j].name, status: hasRed ? "conflict" : hasYellow ? "caution" : "safe" });
      }
    }
    return results;
  }, []);

  const conflictCount = matrix.filter(m => m.status === "conflict").length;
  const cautionCount = matrix.filter(m => m.status === "caution").length;

  return (
    <div className="min-h-screen pb-24 md:pb-8 relative overflow-hidden">
      <div className="deco-glow-peach w-[300px] h-[300px] bottom-[20vh] left-[-100px] fixed opacity-20" />

      {/* Hero */}
      <div className="relative h-[42vh] min-h-[300px] overflow-hidden md:rounded-b-[2rem]">
        <img src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=1200&h=600&fit=crop" alt="" className="w-full h-full object-cover animate-gentle-zoom" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/50 to-background" />

        <div className="hidden md:block absolute right-[8%] top-1/2 -translate-y-1/2 w-[180px] h-[180px] z-10">
          <Scene3D variant="molecule" className="w-full h-full" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 px-6 pb-10 md:px-10">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground tracking-tight">Ingredient Conflicts</h1>
          <p className="text-xs text-muted-foreground mt-1.5 tracking-wide">Molecular compatibility analysis of your shelf</p>
        </div>
      </div>

      <div className="px-5 md:px-10 -mt-6 space-y-8 relative z-10">
        {/* Status summary */}
        <div className={cn("glass-strong rounded-3xl p-6 flex items-center gap-5 shadow-xl", conflictCount > 0 && "animate-shake-once")}>
          <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-md", conflictCount > 0 ? "bg-conflict/15" : "bg-safe/15")}>
            {conflictCount > 0 ? <AlertOctagon size={26} className="text-conflict" /> : <Shield size={26} className="text-safe" />}
          </div>
          <div>
            <h2 className="font-display font-semibold text-xl text-foreground">
              {conflictCount > 0 ? `${conflictCount} Conflicts Detected` : "No Conflicts Found"}
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              {cautionCount > 0 ? `${cautionCount} caution-level interactions · ` : ""}{products.length} products analyzed
            </p>
          </div>
        </div>

        <div className="divider-elegant" />

        {/* Compatibility Matrix */}
        <div ref={matrixRef} className="space-y-4">
          <h2 className="font-display font-semibold text-foreground text-xl px-1">Compatibility Matrix</h2>
          <div className="glass rounded-3xl overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr>
                    <th className="p-4 text-left text-muted-foreground font-medium uppercase tracking-[0.12em] text-[10px]">Product Pair</th>
                    <th className="p-4 text-center text-muted-foreground font-medium uppercase tracking-[0.12em] text-[10px]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {matrix.map((m, i) => (
                    <tr key={i} className="border-t border-border/10 hover:bg-card/30 transition-colors">
                      <td className="p-4">
                        <span className="text-foreground font-medium">{m.a.split(' ').slice(0, 3).join(' ')}</span>
                        <span className="text-muted-foreground mx-2">×</span>
                        <span className="text-foreground font-medium">{m.b.split(' ').slice(0, 3).join(' ')}</span>
                      </td>
                      <td className="p-4 text-center">
                        <span className={cn(
                          "inline-block w-3.5 h-3.5 rounded-full shadow-sm",
                          m.status === "safe" && "bg-safe",
                          m.status === "caution" && "bg-caution",
                          m.status === "conflict" && "bg-conflict animate-pulse-warning",
                        )} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="divider-elegant" />

        {/* Conflict Examples */}
        <div ref={dbRef} className="space-y-4">
          <h2 className="font-display font-semibold text-foreground text-xl px-1">Common Conflicts Database</h2>
          <div className="space-y-5">
            {conflictExamples.map((item, i) => {
              const [ingA, ingB] = item.pair.split(" × ");
              return (
                <div
                  key={item.pair}
                  className={cn("glass rounded-3xl p-6 space-y-4 hover-lift", i % 2 === 0 ? "md:ml-0 md:mr-16" : "md:ml-16 md:mr-0")}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap size={14} className={item.level === "red" ? "text-conflict" : "text-caution"} />
                      <h3 className="font-semibold text-foreground text-sm flex items-center gap-1">
                        <IngredientSheet ingredientName={ingA}>
                          <button className="underline decoration-dotted underline-offset-2 hover:text-primary transition-colors">{ingA}</button>
                        </IngredientSheet>
                        <span className="text-muted-foreground">×</span>
                        <IngredientSheet ingredientName={ingB}>
                          <button className="underline decoration-dotted underline-offset-2 hover:text-primary transition-colors">{ingB}</button>
                        </IngredientSheet>
                      </h3>
                    </div>
                    <span className={cn(
                      "text-[9px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider",
                      item.level === "red" ? "bg-conflict/15 text-conflict" : "bg-caution/15 text-caution"
                    )}>{item.severity}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.explanation}</p>
                  <div className="flex items-start gap-2 bg-safe/8 rounded-2xl p-4">
                    <Check size={12} className="text-safe shrink-0 mt-0.5" />
                    <p className="text-[11px] text-foreground leading-relaxed">{item.fix}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
