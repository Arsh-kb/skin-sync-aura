import { SafetyScoreRing } from "@/components/SafetyScoreRing";
import { SafetyBadge } from "@/components/SafetyBadge";
import { AddProductModal } from "@/components/AddProductModal";
import { skinTips, products, calculateSafetyScore, routineSteps, ingredientConflicts } from "@/data/mockData";
import { ArrowRight, GitCompare, FlaskRound, Sparkles, Lightbulb, AlertTriangle, Scan, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [tipIndex, setTipIndex] = useState(0);

  const safetyScore = useMemo(() => {
    const ids = routineSteps.map(s => s.productId).filter(Boolean) as string[];
    return calculateSafetyScore(ids);
  }, []);

  // Detect active conflicts for proactive alert
  const activeConflicts = useMemo(() => {
    const conflicts: string[] = [];
    const routineProducts = routineSteps
      .map(s => products.find(p => p.id === s.productId))
      .filter(Boolean);
    for (let i = 0; i < routineProducts.length; i++) {
      for (let j = i + 1; j < routineProducts.length; j++) {
        const a = routineProducts[i]!;
        const b = routineProducts[j]!;
        a.ingredients.forEach(ingA => {
          b.ingredients.forEach(ingB => {
            const entry = ingredientConflicts[ingA.name];
            if (entry?.conflicts.includes(ingB.name)) {
              conflicts.push(`${ingA.name} + ${ingB.name}`);
            }
          });
        });
      }
    }
    return [...new Set(conflicts)];
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((i) => (i + 1) % skinTips.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const quickActions = [
    { label: "Add Product", icon: Sparkles, action: () => {}, isModal: true },
    { label: "Check Routine", icon: FlaskRound, action: () => navigate("/routine") },
    { label: "Compare", icon: GitCompare, action: () => navigate("/compare") },
    { label: "Scan Product", icon: Scan, action: () => navigate("/shelf") },
  ];

  return (
    <div className="min-h-screen pb-24">
      {/* Full-bleed Hero */}
      <div className="relative overflow-hidden h-[52vh] min-h-[380px]">
        <img
          src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1200&h=800&fit=crop"
          alt=""
          className="w-full h-full object-cover animate-gentle-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/50 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 to-transparent" />

        {/* Greeting overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8">
          <p className="text-sm text-muted-foreground font-medium tracking-wide uppercase">{getGreeting()}</p>
          <h1 className="text-4xl font-display font-bold text-foreground mt-1 tracking-tight">Sarah</h1>
          <p className="text-muted-foreground text-sm mt-1.5 font-light">Your molecular skin analysis is ready</p>
        </div>
      </div>

      <div className="px-5 -mt-6 space-y-5 relative z-10">
        {/* Skin Status + Score — Floating glass card */}
        <div className="glass-strong rounded-2xl p-6 flex items-center justify-between animate-slide-up">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-primary" />
              <h2 className="font-display font-semibold text-lg text-foreground">Skin Status</h2>
            </div>
            <SafetyBadge status={safetyScore >= 75 ? "safe" : safetyScore >= 45 ? "caution" : "conflict"} size="lg" />
            <p className="text-sm text-muted-foreground max-w-[200px] leading-relaxed">
              {safetyScore >= 75
                ? "Your routine is well-balanced with minimal conflicts."
                : "Some ingredient conflicts detected in your routine."}
            </p>
          </div>
          <SafetyScoreRing score={safetyScore} />
        </div>

        {/* Proactive Alert */}
        {activeConflicts.length > 0 && (
          <div className="rounded-2xl p-4 bg-conflict/10 border border-conflict/20 flex items-start gap-3 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <AlertTriangle size={18} className="text-conflict shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-semibold text-foreground">Conflict detected in routine</p>
              <p className="text-xs text-muted-foreground">
                {activeConflicts.slice(0, 2).join(" · ")}
                {activeConflicts.length > 2 && ` · +${activeConflicts.length - 2} more`}
              </p>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="space-y-3 animate-slide-up" style={{ animationDelay: "0.15s" }}>
          <h2 className="font-display font-semibold text-lg text-foreground px-1">Quick Actions</h2>
          <div className="grid grid-cols-4 gap-2.5">
            {quickActions.map((action) =>
              action.isModal ? (
                <AddProductModal
                  key={action.label}
                  trigger={
                    <button className="glass rounded-2xl p-3.5 flex flex-col items-center gap-2 hover-lift text-center w-full">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/15 to-skin-rose/20 flex items-center justify-center">
                        <action.icon size={19} className="text-primary" />
                      </div>
                      <span className="text-[10px] font-medium text-foreground leading-tight">{action.label}</span>
                    </button>
                  }
                />
              ) : (
                <button
                  key={action.label}
                  onClick={action.action}
                  className="glass rounded-2xl p-3.5 flex flex-col items-center gap-2 hover-lift text-center"
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/15 to-skin-rose/20 flex items-center justify-center">
                    <action.icon size={19} className="text-primary" />
                  </div>
                  <span className="text-[10px] font-medium text-foreground leading-tight">{action.label}</span>
                </button>
              )
            )}
          </div>
        </div>

        {/* Daily Insight */}
        <div className="glass rounded-2xl p-5 space-y-3 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center gap-2">
            <Lightbulb size={16} className="text-caution" />
            <h3 className="font-display font-semibold text-foreground">Daily Insight</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed transition-all duration-700">
            {skinTips[tipIndex]}
          </p>
        </div>

        {/* Shelf CTA */}
        <button
          onClick={() => navigate("/shelf")}
          className="glass rounded-2xl p-5 w-full flex items-center justify-between hover-lift group animate-slide-up"
          style={{ animationDelay: "0.25s" }}
        >
          <div>
            <h3 className="font-display font-semibold text-foreground text-left">Your Digital Shelf</h3>
            <p className="text-sm text-muted-foreground">{products.length} products tracked</p>
          </div>
          <ArrowRight size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
        </button>
      </div>
    </div>
  );
}
