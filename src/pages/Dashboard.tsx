import { SafetyScoreRing } from "@/components/SafetyScoreRing";
import { SafetyBadge } from "@/components/SafetyBadge";
import { CategoryCircle } from "@/components/CategoryCircle";
import { TrendingCard } from "@/components/TrendingCard";
import { skinTips, products, calculateSafetyScore, amRoutineSteps, pmRoutineSteps, ingredientConflicts } from "@/data/mockData";
import { ArrowRight, Sparkles, AlertTriangle, Shield, Sun, Wind, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

const quickCategories = [
  { label: "Routine", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&h=200&fit=crop", path: "/routine" },
  { label: "Shelf", image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=200&h=200&fit=crop", path: "/shelf" },
  { label: "Compare", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=200&h=200&fit=crop", path: "/compare" },
  { label: "Guardian", image: "https://images.unsplash.com/photo-1570194065650-d99fb4a38c5f?w=200&h=200&fit=crop", path: "/assistant" },
  { label: "Progress", image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=200&h=200&fit=crop", path: "/progress" },
];

const trendingProducts = [
  { image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&h=300&fit=crop", title: "Vitamin C Serum", desc: "Brightens & evens tone with L-ascorbic acid" },
  { image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=300&h=300&fit=crop", title: "Retinol Night Cream", desc: "Accelerates cell renewal while you sleep" },
  { image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop", title: "SPF 50 Shield", desc: "Mineral protection with zero white cast" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [tipIndex, setTipIndex] = useState(0);

  const safetyScore = useMemo(() => {
    const ids = amRoutineSteps.map(s => s.productId).filter(Boolean) as string[];
    return calculateSafetyScore(ids);
  }, []);

  const activeConflicts = useMemo(() => {
    const conflicts: string[] = [];
    const routineProducts = amRoutineSteps
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
    const interval = setInterval(() => setTipIndex((i) => (i + 1) % skinTips.length), 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen pb-24 md:pb-8 relative overflow-hidden">
      {/* Decorative bokeh */}
      <div className="deco-circle w-[300px] h-[300px] top-[-100px] right-[-80px] fixed opacity-50" />
      <div className="deco-circle w-[250px] h-[250px] top-[40vh] left-[-100px] fixed opacity-30" />

      {/* Split Hero — desktop: side-by-side, mobile: full-bleed */}
      <div className="relative min-h-[55vh] md:min-h-[50vh] overflow-hidden md:rounded-b-3xl">
        {/* Background image — full bleed on mobile, right half on desktop */}
        <div className="absolute inset-0 md:left-1/2">
          <img
            src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1200&h=800&fit=crop"
            alt=""
            className="w-full h-full object-cover animate-gentle-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/10 md:bg-gradient-to-r md:from-background md:via-background/30 md:to-transparent" />
        </div>

        {/* Desktop left content */}
        <div className="relative z-10 h-full flex flex-col justify-end md:justify-center px-6 pb-10 pt-20 md:px-10 md:max-w-[50%] md:py-16">
          <div className="flex items-center gap-2 mb-2">
            <span className="glass-rose rounded-full px-3 py-1 text-[10px] font-medium flex items-center gap-1.5">
              <Sun size={12} className="text-caution" /> UV 6 — High
            </span>
            <span className="glass-rose rounded-full px-3 py-1 text-[10px] font-medium flex items-center gap-1.5">
              <Wind size={12} className="text-muted-foreground" /> AQI 42
            </span>
          </div>
          <p className="text-sm text-muted-foreground font-medium tracking-wide uppercase">{getGreeting()}</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mt-1 tracking-tight">Sarah</h1>
          <p className="text-muted-foreground text-sm md:text-base mt-2 font-light max-w-[320px] leading-relaxed">
            Your skin deserves molecular intelligence. Let's perfect your routine.
          </p>

          {/* CTA pills */}
          <div className="flex gap-3 mt-5">
            <button
              onClick={() => navigate("/routine")}
              className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity shadow-lg"
            >
              Today's Routine
            </button>
            <button
              onClick={() => navigate("/compare")}
              className="px-5 py-2.5 rounded-full glass-rose text-foreground text-xs font-semibold hover-lift"
            >
              Compare Products
            </button>
          </div>
        </div>

        {/* Floating safety ring — desktop right, mobile bottom-right */}
        <div className="absolute bottom-8 right-6 md:top-1/2 md:-translate-y-1/2 md:right-[12%] animate-float z-10">
          <div className="glass-strong rounded-3xl p-4 shadow-xl">
            <SafetyScoreRing score={safetyScore} size={90} strokeWidth={5} />
            <p className="text-[9px] text-muted-foreground text-center mt-1 font-medium">Safety Score</p>
          </div>
        </div>
      </div>

      <div className="px-5 md:px-10 space-y-7 mt-6 relative z-10">
        {/* Category Circles */}
        <div className="flex gap-4 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1 animate-slide-up">
          {quickCategories.map((cat) => (
            <CategoryCircle
              key={cat.label}
              image={cat.image}
              label={cat.label}
              onClick={() => navigate(cat.path)}
            />
          ))}
        </div>

        {/* Conflict Alert */}
        {activeConflicts.length > 0 && (
          <div className="glass-rose rounded-2xl p-4 flex items-start gap-3 animate-slide-up border border-conflict/10">
            <AlertTriangle size={18} className="text-conflict shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">Conflict detected in routine</p>
              <p className="text-xs text-muted-foreground mt-0.5">{activeConflicts.slice(0, 2).join(" · ")}</p>
            </div>
            <button
              onClick={() => navigate("/conflicts")}
              className="text-[10px] font-semibold text-primary uppercase tracking-wider shrink-0"
            >
              View
            </button>
          </div>
        )}

        {/* Staggered: Skin Status + Daily Tip */}
        <div className="flex flex-col md:flex-row gap-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <div className="glass-rose rounded-2xl p-6 flex items-center justify-between flex-1 md:flex-[2] card-tilt">
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-primary" />
                <h2 className="font-display font-semibold text-lg text-foreground">Skin Status</h2>
              </div>
              <SafetyBadge status={safetyScore >= 75 ? "safe" : safetyScore >= 45 ? "caution" : "conflict"} size="lg" />
              <p className="text-sm text-muted-foreground max-w-[240px] leading-relaxed">
                {safetyScore >= 75
                  ? "Your routine is well-balanced with minimal conflicts."
                  : "Some ingredient conflicts detected in your routine."}
              </p>
            </div>
          </div>

          <div className="gradient-blush rounded-2xl p-5 space-y-3 flex-1 card-tilt">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-primary" />
              <h3 className="font-display font-semibold text-foreground">Daily Insight</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed transition-all duration-700">
              {skinTips[tipIndex]}
            </p>
          </div>
        </div>

        {/* Trending for You */}
        <div className="space-y-3 animate-slide-up" style={{ animationDelay: "0.15s" }}>
          <h2 className="font-display font-semibold text-lg text-foreground px-1">Trending for You</h2>
          <div className="space-y-3">
            {trendingProducts.map((item, i) => (
              <TrendingCard
                key={i}
                image={item.image}
                title={item.title}
                description={item.desc}
                variant={i % 2 === 0 ? "blush" : "warm"}
                onClick={() => navigate("/shelf")}
              />
            ))}
          </div>
        </div>

        {/* AM Routine Carousel */}
        <div className="space-y-3 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center justify-between px-1">
            <h2 className="font-display font-semibold text-lg text-foreground flex items-center gap-2">
              <Sun size={16} className="text-caution" /> AM Routine
            </h2>
            <button onClick={() => navigate("/routine")} className="text-xs text-primary font-medium flex items-center gap-1">
              Edit <ArrowRight size={12} />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none -mx-1 px-1">
            {amRoutineSteps.map((step, i) => {
              const product = products.find(p => p.id === step.productId);
              if (!product) return null;
              return (
                <div key={step.id} className="relative shrink-0 w-36 md:w-44 group cursor-pointer" style={{ marginLeft: i > 0 ? "-8px" : 0 }}>
                  <div className="rounded-2xl overflow-hidden h-48 md:h-56 relative hover-lift">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                    <div className="absolute top-2 left-2">
                      <span className="glass-rose rounded-full px-2 py-0.5 text-[9px] font-semibold">Step {step.order}</span>
                    </div>
                    <div className="absolute top-2 right-2">
                      <SafetyBadge status={product.safety} size="sm" showLabel={false} />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-[9px] text-muted-foreground font-medium uppercase tracking-wider">{step.label}</p>
                      <p className="text-xs font-semibold text-foreground mt-0.5 leading-snug">{product.name}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* PM Routine Carousel */}
        <div className="space-y-3 animate-slide-up" style={{ animationDelay: "0.25s" }}>
          <div className="flex items-center justify-between px-1">
            <h2 className="font-display font-semibold text-lg text-foreground flex items-center gap-2">
              <Moon size={16} className="text-skin-rose" /> PM Routine
            </h2>
            <button onClick={() => navigate("/routine")} className="text-xs text-primary font-medium flex items-center gap-1">
              Edit <ArrowRight size={12} />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none -mx-1 px-1">
            {pmRoutineSteps.map((step, i) => {
              const product = products.find(p => p.id === step.productId);
              if (!product) return null;
              return (
                <div key={step.id} className="relative shrink-0 w-36 md:w-44 group cursor-pointer" style={{ marginLeft: i > 0 ? "-8px" : 0 }}>
                  <div className="rounded-2xl overflow-hidden h-48 md:h-56 relative hover-lift">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                    <div className="absolute top-2 left-2">
                      <span className="glass-rose rounded-full px-2 py-0.5 text-[9px] font-semibold">Step {step.order}</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-[9px] text-muted-foreground font-medium uppercase tracking-wider">{step.label}</p>
                      <p className="text-xs font-semibold text-foreground mt-0.5 leading-snug">{product.name}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Shelf CTA */}
        <button
          onClick={() => navigate("/shelf")}
          className="glass-rose rounded-2xl p-5 w-full flex items-center justify-between hover-lift group animate-slide-up"
          style={{ animationDelay: "0.3s" }}
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
