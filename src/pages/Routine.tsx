import { routineSteps, products } from "@/data/mockData";
import { SafetyBadge } from "@/components/SafetyBadge";
import { Droplets, FlaskRound, Sparkles, Cloud, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SafetyStatus } from "@/data/mockData";

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
  safe: "shadow-[0_0_8px_hsl(145,35%,74%,0.4)]",
  caution: "shadow-[0_0_8px_hsl(40,80%,80%,0.4)]",
  conflict: "shadow-[0_0_8px_hsl(0,55%,77%,0.4)]",
};

export default function Routine() {
  return (
    <div className="min-h-screen pb-24">
      <div className="px-5 pt-8 space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Routine Builder</h1>
          <p className="text-sm text-muted-foreground mt-1">Your morning skincare routine</p>
        </div>

        {/* Timeline */}
        <div className="relative space-y-0">
          {routineSteps.map((step, index) => {
            const product = products.find((p) => p.id === step.productId);
            const Icon = stepIcons[step.icon] || Sparkles;
            const isLast = index === routineSteps.length - 1;

            return (
              <div key={step.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                {/* Connector line */}
                {step.connectionSafety && (
                  <div className="flex items-center justify-center py-1">
                    <div className={cn(
                      "w-1 h-8 rounded-full transition-all",
                      connectorColors[step.connectionSafety],
                      connectorGlow[step.connectionSafety],
                      step.connectionSafety === "safe" && "animate-breathe",
                      step.connectionSafety === "caution" && "animate-pulse-warning",
                      step.connectionSafety === "conflict" && "animate-pulse-warning",
                    )} />
                  </div>
                )}

                {/* Step Card */}
                <div className={cn(
                  "glass rounded-2xl p-4 flex items-center gap-4 hover-lift",
                  step.connectionSafety === "conflict" && "border-conflict/30",
                )}>
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                    "bg-gradient-to-br from-skin-peach to-skin-pink"
                  )}>
                    <Icon size={22} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
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
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="glass rounded-2xl p-5 space-y-3">
          <h3 className="font-display font-semibold text-foreground">Routine Summary</h3>
          <div className="flex gap-3">
            <div className="flex-1 bg-safe/10 rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-safe-foreground">3</p>
              <p className="text-xs text-muted-foreground">Safe</p>
            </div>
            <div className="flex-1 bg-caution/10 rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-caution-foreground">1</p>
              <p className="text-xs text-muted-foreground">Caution</p>
            </div>
            <div className="flex-1 bg-conflict/10 rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-conflict-foreground">1</p>
              <p className="text-xs text-muted-foreground">Conflict</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
