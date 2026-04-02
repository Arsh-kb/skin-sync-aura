import { routineSteps, products, calculateSafetyScore } from "@/data/mockData";
import { SafetyBadge } from "@/components/SafetyBadge";
import { SafetyScoreRing } from "@/components/SafetyScoreRing";
import { Droplets, FlaskRound, Sparkles, Cloud, Sun, ArrowDownUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SafetyStatus } from "@/data/mockData";
import { useMemo } from "react";

const stepIcons: Record<string, React.ElementType> = {
  droplets: Droplets,
  "flask-round": FlaskRound,
  sparkles: Sparkles,
  cloud: Cloud,
  sun: Sun,
};

const connectorColors: Record<SafetyStatus, string> = {
  safe: "bg-safe",
  caution: "bg-caution",
  conflict: "bg-conflict",
};

const connectorGlow: Record<SafetyStatus, string> = {
  safe: "shadow-[0_0_10px_hsl(145,30%,62%,0.35)]",
  caution: "shadow-[0_0_10px_hsl(38,65%,68%,0.35)]",
  conflict: "shadow-[0_0_10px_hsl(0,50%,65%,0.35)]",
};

export default function Routine() {
  const safetyScore = useMemo(() => {
    const ids = routineSteps.map(s => s.productId).filter(Boolean) as string[];
    return calculateSafetyScore(ids);
  }, []);

  return (
    <div className="min-h-screen pb-24">
      {/* Hero */}
      <div className="relative h-40 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&h=400&fit=crop"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 to-background" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-4 flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Routine Builder</h1>
            <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
              <ArrowDownUp size={12} />
              Auto-ordered thin → thick
            </p>
          </div>
          <SafetyScoreRing score={safetyScore} size={72} strokeWidth={5} />
        </div>
      </div>

      <div className="px-5 space-y-5 mt-4">
        {/* Timeline */}
        <div className="relative space-y-0">
          {routineSteps.map((step, index) => {
            const product = products.find((p) => p.id === step.productId);
            const Icon = stepIcons[step.icon] || Sparkles;

            return (
              <div key={step.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.08}s` }}>
                {/* Connector */}
                {step.connectionSafety && (
                  <div className="flex items-center justify-center py-1">
                    <div className={cn(
                      "w-0.5 h-8 rounded-full transition-all duration-500",
                      connectorColors[step.connectionSafety],
                      connectorGlow[step.connectionSafety],
                      step.connectionSafety === "safe" && "animate-breathe",
                      step.connectionSafety === "conflict" && "animate-pulse-warning",
                    )} />
                  </div>
                )}

                {/* Step Card */}
                <div className={cn(
                  "glass rounded-2xl p-4 flex items-center gap-4 hover-lift",
                  step.connectionSafety === "conflict" && "border-conflict/25 ring-1 ring-conflict/10",
                )}>
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                    "bg-gradient-to-br from-champagne to-skin-pink"
                  )}>
                    <Icon size={20} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-[0.15em]">
                      Step {step.order} · {step.label}
                    </p>
                    {product ? (
                      <div className="flex items-center gap-2 mt-1">
                        <p className="font-semibold text-foreground text-sm truncate">{product.name}</p>
                        <SafetyBadge status={product.safety} size="sm" showLabel={false} />
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground italic mt-1">Tap to assign product</p>
                    )}
                    {product && (
                      <p className="text-[10px] text-muted-foreground mt-0.5">Viscosity: {product.viscosity}/5</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="glass-strong rounded-2xl p-5 space-y-3 animate-slide-up" style={{ animationDelay: "0.5s" }}>
          <h3 className="font-display font-semibold text-foreground text-lg">Routine Analysis</h3>
          <div className="grid grid-cols-3 gap-2.5">
            <div className="bg-safe/8 rounded-xl p-3 text-center border border-safe/15">
              <p className="text-xl font-bold text-safe-foreground font-display">3</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">Safe</p>
            </div>
            <div className="bg-caution/8 rounded-xl p-3 text-center border border-caution/15">
              <p className="text-xl font-bold text-caution-foreground font-display">1</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">Caution</p>
            </div>
            <div className="bg-conflict/8 rounded-xl p-3 text-center border border-conflict/15">
              <p className="text-xl font-bold text-conflict-foreground font-display">1</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">Conflict</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
