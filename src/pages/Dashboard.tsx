import { SafetyScoreRing } from "@/components/SafetyScoreRing";
import { SafetyBadge } from "@/components/SafetyBadge";
import { CategoryCircle } from "@/components/CategoryCircle";
import { TrendingCard } from "@/components/TrendingCard";
import { TimeNudge } from "@/components/TimeNudge";
import { Scene3D } from "@/components/Scene3D";
import { skinTips, products, calculateSafetyScore, amRoutineSteps, pmRoutineSteps, ingredientConflicts } from "@/data/mockData";
import { ArrowRight, Sparkles, AlertTriangle, Shield, Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

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
  const hasProfile = !!localStorage.getItem("cosmetiq-profile");

  const nudgeRef = useScrollReveal();
  const catRef = useScrollReveal();
  const statusRef = useScrollReveal();
  const trendRef = useScrollReveal();
  const amRef = useScrollReveal();
  const pmRef = useScrollReveal();
  const ctaRef = useScrollReveal();

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
    if (!hasProfile) {
      navigate("/onboarding");
    }
  }, [hasProfile, navigate]);

  useEffect(() => {
    const interval = setInterval(() => setTipIndex((i) => (i + 1) % skinTips.length), 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen pb-24 md:pb-8 relative overflow-hidden">
      {/* Ambient gradient blobs */}
      <div className="deco-circle w-[350px] h-[350px] top-[-120px] right-[-100px] fixed opacity-40" />
      <div className="deco-glow-peach w-[300px] h-[300px] top-[45vh] left-[-120px] fixed opacity-25" />
      <div className="deco-glow-pink w-[200px] h-[200px] bottom-[20vh] right-[-60px] fixed opacity-20" />

      {/* Split Hero */}
      <div className="relative min-h-[58vh] md:min-h-[52vh] overflow-hidden md:rounded-b-[2rem]">
        <div className="absolute inset-0 md:left-1/2">
          <img
            src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1200&h=800&fit=crop"
            alt=""
            className="w-full h-full object-cover animate-gentle-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/10 md:bg-gradient-to-r md:from-background md:via-background/30 md:to-transparent" />
        </div>

        {/* 3D product — desktop only */}
        <div className="hidden lg:block absolute right-[5%] top-1/2 -translate-y-1/2 z-10 w-[200px] h-[280px]">
          <Scene3D variant="product" className="w-full h-full" />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-end md:justify-center px-6 pb-12 pt-20 md:px-10 md:max-w-[50%] md:py-20">
          <p className="text-[11px] text-muted-foreground font-medium tracking-[0.2em] uppercase">{getGreeting()}</p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-foreground mt-2 tracking-tight leading-[0.95]">Sarah</h1>
          <p className="text-muted-foreground text-sm md:text-base mt-3 font-light max-w-[320px] leading-relaxed">
            Your skin deserves molecular intelligence. Let's perfect your routine.
          </p>
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => navigate("/routine")}
              className="px-6 py-3 rounded-full bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-all duration-300 shadow-lg btn-press"
            >
              Today's Routine
            </button>
            <button
              onClick={() => navigate("/compare")}
              className="px-6 py-3 rounded-full glass-rose text-foreground text-xs font-semibold hover-lift btn-press"
            >
              Compare Products
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 right-6 md:top-1/2 md:-translate-y-1/2 md:right-[25%] lg:right-[28%] animate-float z-10">
          <div className="glass-strong rounded-3xl p-5 shadow-2xl">
            <SafetyScoreRing score={safetyScore} size={100} strokeWidth={6} />
            <p className="text-[9px] text-muted-foreground text-center mt-2 font-medium uppercase tracking-[0.15em]">Safety Score</p>
          </div>
        </div>
      </div>

      <div className="px-5 md:px-10 space-y-10 md:space-y-14 mt-8 relative z-10">
        {/* Time-Aware Nudge */}
        <div ref={nudgeRef}>
          <TimeNudge />
        </div>

        {/* Category Circles */}
        <div ref={catRef} className="flex gap-5 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1">
          {quickCategories.map((cat) => (
            <CategoryCircle key={cat.label} image={cat.image} label={cat.label} onClick={() => navigate(cat.path)} />
          ))}
        </div>

        {/* Conflict Alert */}
        {activeConflicts.length > 0 && (
          <div className="glass-rose rounded-2xl p-5 flex items-start gap-3">
            <AlertTriangle size={18} className="text-conflict shrink-0 mt-0.5 animate-shake" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">Conflict detected in routine</p>
              <p className="text-xs text-muted-foreground mt-0.5">{activeConflicts.slice(0, 2).join(" · ")}</p>
            </div>
            <button onClick={() => navigate("/conflicts")} className="text-[10px] font-semibold text-primary uppercase tracking-[0.15em] shrink-0 btn-press">View</button>
          </div>
        )}

        <div className="divider-elegant" />

        {/* Skin Status + Daily Tip */}
        <div ref={statusRef} className="flex flex-col md:flex-row gap-5">
          <div className="glass-rose rounded-3xl p-7 flex items-center justify-between flex-1 md:flex-[2] card-tilt">
            <div className="space-y-4 flex-1">
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-primary" />
                <h2 className="font-display font-semibold text-xl text-foreground">Skin Status</h2>
              </div>
              <SafetyBadge status={safetyScore >= 75 ? "safe" : safetyScore >= 45 ? "caution" : "conflict"} size="lg" />
              <p className="text-sm text-muted-foreground max-w-[260px] leading-relaxed">
                {safetyScore >= 75 ? "Your routine is well-balanced with minimal conflicts." : "Some ingredient conflicts detected in your routine."}
              </p>
            </div>
          </div>
          <div className="gradient-blush rounded-3xl p-6 space-y-3 flex-1 card-tilt">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-primary" />
              <h3 className="font-display font-semibold text-foreground text-lg">Daily Insight</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed transition-all duration-700">{skinTips[tipIndex]}</p>
          </div>
        </div>

        {/* Trending */}
        <div ref={trendRef} className="space-y-4">
          <h2 className="font-display font-semibold text-xl text-foreground px-1">Trending for You</h2>
          <div className="space-y-3">
            {trendingProducts.map((item, i) => (
              <TrendingCard key={i} image={item.image} title={item.title} description={item.desc} variant={i % 2 === 0 ? "blush" : "warm"} onClick={() => navigate("/shelf")} />
            ))}
          </div>
        </div>

        <div className="divider-elegant" />

        {/* AM Routine */}
        <div ref={amRef} className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="font-display font-semibold text-xl text-foreground flex items-center gap-2"><Sun size={16} className="text-caution" /> AM Routine</h2>
            <button onClick={() => navigate("/routine")} className="text-xs text-primary font-medium flex items-center gap-1 btn-press">Edit <ArrowRight size={12} /></button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none -mx-1 px-1">
            {amRoutineSteps.map((step, i) => {
              const product = products.find(p => p.id === step.productId);
              if (!product) return null;
              return (
                <div key={step.id} className="relative shrink-0 w-40 md:w-48 group cursor-pointer" style={{ marginLeft: i > 0 ? "-8px" : 0 }}>
                  <div className="rounded-3xl overflow-hidden h-52 md:h-60 relative hover-lift shadow-lg">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                    <div className="absolute top-3 left-3"><span className="glass-rose rounded-full px-2.5 py-1 text-[9px] font-semibold">Step {step.order}</span></div>
                    <div className="absolute top-3 right-3"><SafetyBadge status={product.safety} size="sm" showLabel={false} /></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-[9px] text-muted-foreground font-medium uppercase tracking-[0.15em]">{step.label}</p>
                      <p className="text-sm font-semibold text-foreground mt-0.5 leading-snug">{product.name}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* PM Routine */}
        <div ref={pmRef} className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="font-display font-semibold text-xl text-foreground flex items-center gap-2"><Moon size={16} className="text-skin-rose" /> PM Routine</h2>
            <button onClick={() => navigate("/routine")} className="text-xs text-primary font-medium flex items-center gap-1 btn-press">Edit <ArrowRight size={12} /></button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none -mx-1 px-1">
            {pmRoutineSteps.map((step, i) => {
              const product = products.find(p => p.id === step.productId);
              if (!product) return null;
              return (
                <div key={step.id} className="relative shrink-0 w-40 md:w-48 group cursor-pointer" style={{ marginLeft: i > 0 ? "-8px" : 0 }}>
                  <div className="rounded-3xl overflow-hidden h-52 md:h-60 relative hover-lift shadow-lg">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                    <div className="absolute top-3 left-3"><span className="glass-rose rounded-full px-2.5 py-1 text-[9px] font-semibold">Step {step.order}</span></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-[9px] text-muted-foreground font-medium uppercase tracking-[0.15em]">{step.label}</p>
                      <p className="text-sm font-semibold text-foreground mt-0.5 leading-snug">{product.name}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="divider-elegant" />

        {/* Shelf CTA */}
        <div ref={ctaRef}>
          <button onClick={() => navigate("/shelf")} className="glass-rose rounded-3xl p-6 w-full flex items-center justify-between hover-lift group btn-press">
            <div>
              <h3 className="font-display font-semibold text-foreground text-left text-lg">Your Digital Shelf</h3>
              <p className="text-sm text-muted-foreground mt-1">{products.length} products tracked</p>
            </div>
            <ArrowRight size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
          </button>
        </div>
      </div>
    </div>
  );
}
