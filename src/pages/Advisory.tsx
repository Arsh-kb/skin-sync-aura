import { advisoryItems } from "@/data/mockData";
import { TrendingCard } from "@/components/TrendingCard";
import { Apple, Leaf, Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const diyIngredients = [
  { name: "Honey", safe: true, note: "Antibacterial, hydrating. Safe for most skin types." },
  { name: "Lemon Juice", safe: false, note: "Highly acidic (pH ~2). Can cause burns, photosensitivity, and pigmentation." },
  { name: "Aloe Vera", safe: true, note: "Soothing, anti-inflammatory. Use pure gel from plant or verified products." },
  { name: "Baking Soda", safe: false, note: "pH ~9, far too alkaline. Disrupts skin barrier and acid mantle." },
  { name: "Turmeric", safe: true, note: "Anti-inflammatory. Mix with honey. Can temporarily stain skin yellow." },
  { name: "Apple Cider Vinegar", safe: false, note: "Too acidic undiluted. Can cause chemical burns. Dilute heavily if used." },
  { name: "Oatmeal", safe: true, note: "Colloidal oatmeal is FDA-approved for eczema relief. Very gentle." },
  { name: "Coconut Oil", safe: true, note: "Highly comedogenic (4/5). Best for body, avoid on acne-prone face." },
];

export default function Advisory() {
  const [tab, setTab] = useState<"nutrition" | "diy">("nutrition");
  const contentRef = useScrollReveal();

  return (
    <div className="min-h-screen pb-24 md:pb-8 relative overflow-hidden">
      <div className="deco-circle w-[200px] h-[200px] bottom-[20vh] right-[-60px] fixed opacity-25" />
      <div className="deco-glow-peach w-[250px] h-[250px] top-[50vh] left-[-100px] fixed opacity-20" />

      {/* Hero */}
      <div className="relative h-[42vh] min-h-[300px] overflow-hidden md:rounded-b-[2rem]">
        <img
          src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&h=600&fit=crop"
          alt=""
          className="w-full h-full object-cover animate-gentle-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/40 to-background" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-10 md:px-10">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground tracking-tight">Skin Nutrition</h1>
          <p className="text-xs text-muted-foreground mt-1.5 tracking-wide">Feed your skin from the inside out</p>
        </div>

        {/* Floating tab toggle */}
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-10">
          <div className="glass-strong rounded-full p-1.5 flex gap-1 shadow-xl">
            <button
              onClick={() => setTab("nutrition")}
              className={cn(
                "px-6 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 btn-press",
                tab === "nutrition" ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground"
              )}
            >
              <Apple size={12} /> Nutrition Guide
            </button>
            <button
              onClick={() => setTab("diy")}
              className={cn(
                "px-6 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 btn-press",
                tab === "diy" ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground"
              )}
            >
              <Leaf size={12} /> Safe DIY Filter
            </button>
          </div>
        </div>
      </div>

      <div ref={contentRef} className="px-5 md:px-10 space-y-6 mt-12">
        {tab === "nutrition" ? (
          <div className="space-y-5">
            {advisoryItems.map((item, i) => (
              <div key={item.id}>
                <TrendingCard
                  image={item.image}
                  title={`${item.emoji} ${item.concern}`}
                  description={item.description}
                  variant={i % 2 === 0 ? "blush" : "warm"}
                />
                <div className={cn(
                  "rounded-b-3xl px-5 py-4 -mt-2",
                  i % 2 === 0 ? "glass-rose" : "gradient-warm"
                )}>
                  <p className="text-[10px] font-semibold text-primary uppercase tracking-[0.15em] mb-2.5">Recommended Foods</p>
                  <div className="flex flex-wrap gap-2">
                    {item.foods.map((food) => (
                      <span key={food} className="text-xs px-3 py-1.5 rounded-full gradient-blush text-foreground font-medium shadow-sm">
                        {food}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground px-1">Check if a DIY ingredient is safe for your skin.</p>
            {diyIngredients.map((ing, i) => (
              <div
                key={ing.name}
                className={cn(
                  "rounded-3xl p-5 flex items-start gap-4 card-tilt shadow-md",
                  ing.safe ? "glass-rose" : "glass"
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 mt-0.5 shadow-sm",
                  ing.safe ? "gradient-blush" : "bg-conflict/15"
                )}>
                  {ing.safe
                    ? <Check size={16} className="text-safe" />
                    : <span className="text-conflict text-sm font-bold">✕</span>
                  }
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm">{ing.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{ing.note}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
