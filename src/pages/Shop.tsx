import { marketplaceProducts } from "@/data/mockData";
import { SafetyBadge } from "@/components/SafetyBadge";
import { Search, Plus, ExternalLink, Star, ShoppingBag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";

const concerns = ["All", "Oily Skin", "Acne", "Hyperpigmentation", "Anti-aging", "Sensitive", "Dryness"];

export default function Shop() {
  const [search, setSearch] = useState("");
  const [activeConcern, setActiveConcern] = useState("All");

  const filtered = marketplaceProducts.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase());
    const matchConcern = activeConcern === "All" || p.concerns.includes(activeConcern);
    return matchSearch && matchConcern;
  });

  return (
    <div className="min-h-screen pb-24 md:pb-8 relative overflow-hidden">
      {/* Decorative bokeh */}
      <div className="deco-circle w-[300px] h-[300px] top-[-50px] left-[-80px] fixed opacity-40" />

      {/* Split Hero */}
      <div className="relative min-h-[48vh] md:min-h-[45vh] overflow-hidden md:rounded-b-3xl">
        {/* Image — full on mobile, right half on desktop */}
        <div className="absolute inset-0 md:left-[45%]">
          <img
            src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&h=800&fit=crop"
            alt=""
            className="w-full h-full object-cover animate-gentle-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/10 md:bg-gradient-to-r md:from-background md:via-background/20 md:to-transparent" />
        </div>

        {/* Left content */}
        <div className="relative z-10 flex flex-col justify-end md:justify-center px-6 pb-8 pt-20 md:px-10 md:max-w-[45%] md:py-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground">Care for Your Skin</h1>
          <p className="text-sm text-muted-foreground mt-2 max-w-[300px] leading-relaxed">Products matched to your molecular profile with AI-powered compatibility scores</p>
          
          <div className="flex gap-3 mt-5">
            <button className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity shadow-lg flex items-center gap-2">
              <ShoppingBag size={14} /> Browse All
            </button>
          </div>
        </div>

        {/* Special Offer floating card */}
        <div className="absolute bottom-4 right-6 md:bottom-8 md:right-10 z-10 animate-float">
          <div className="glass-rose rounded-2xl p-4 shadow-xl max-w-[180px]">
            <p className="text-[10px] font-semibold text-primary uppercase tracking-wider">Special Offer</p>
            <p className="text-sm font-display font-bold text-foreground mt-1">20% off Barrier Repair</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Limited time only</p>
          </div>
        </div>
      </div>

      <div className="px-5 md:px-10 space-y-5 mt-4 relative z-10">
        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search marketplace..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-11 rounded-2xl border-border/40 bg-card/60 backdrop-blur-sm h-11 text-sm"
          />
        </div>

        {/* Concern pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {concerns.map((c) => (
            <button
              key={c}
              onClick={() => setActiveConcern(c)}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-300",
                activeConcern === c
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "glass-rose text-muted-foreground hover:text-foreground"
              )}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Top Matches Carousel */}
        <div className="space-y-3">
          <h2 className="font-display font-semibold text-lg text-foreground px-1">Top Matches</h2>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none -mx-1 px-1">
            {filtered.slice(0, 3).map((product, i) => (
              <div key={product.id} className="shrink-0 w-64 md:w-72 group cursor-pointer" style={{ marginLeft: i > 0 ? "-12px" : 0 }}>
                <div className={cn("rounded-2xl overflow-hidden relative h-72 hover-lift", i % 2 === 0 ? "glass-rose" : "")}>
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-skin-pink/10 to-transparent" />
                  
                  {/* Match score badge */}
                  <div className="absolute top-3 right-3 glass-rose rounded-full px-2.5 py-1 text-[10px] font-bold text-primary flex items-center gap-1">
                    <Star size={10} className="fill-primary" /> {product.matchScore}%
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{product.brand}</p>
                    <h3 className="font-display font-semibold text-foreground text-base leading-snug">{product.name}</h3>
                    <div className="flex items-center justify-between pt-1">
                      <span className="font-display font-bold text-foreground text-lg">${product.price}</span>
                      <div className="flex gap-2">
                        <button className="glass-rose rounded-full w-8 h-8 flex items-center justify-center text-primary hover:bg-primary/10 transition-colors">
                          <Plus size={14} />
                        </button>
                        <button className="rounded-full w-8 h-8 flex items-center justify-center bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
                          <ExternalLink size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Products — staggered */}
        <div className="space-y-3">
          <h2 className="font-display font-semibold text-lg text-foreground px-1">All Products</h2>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            {filtered.map((product, i) => (
              <div
                key={product.id}
                className={cn(
                  "break-inside-avoid rounded-2xl overflow-hidden card-tilt group animate-slide-up",
                  i % 3 === 0 ? "glass-rose" : "glass"
                )}
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-skin-pink/5 to-transparent" />
                  <div className="absolute top-3 right-3 glass-rose rounded-full px-2.5 py-1 text-[10px] font-bold text-primary flex items-center gap-1">
                    <Star size={10} className="fill-primary" /> {product.matchScore}%
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{product.brand}</p>
                    <h3 className="font-semibold text-foreground text-sm leading-snug mt-0.5">{product.name}</h3>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {product.concerns.map((c) => (
                      <span key={c} className="text-[9px] px-2 py-0.5 rounded-full gradient-blush text-foreground font-medium">{c}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-foreground text-lg">${product.price}</span>
                    <div className="flex gap-2">
                      <button className="px-3 py-1.5 rounded-full text-[10px] font-semibold glass-rose border border-primary/20 text-primary hover:bg-primary/10 transition-colors flex items-center gap-1">
                        <Plus size={10} /> Add
                      </button>
                      <button className="px-3 py-1.5 rounded-full text-[10px] font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
                        Buy
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
