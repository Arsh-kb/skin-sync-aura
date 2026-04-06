import { marketplaceProducts } from "@/data/mockData";
import { SafetyBadge } from "@/components/SafetyBadge";
import { Search, Plus, ExternalLink, Star, ShoppingBag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const concerns = ["All", "Oily Skin", "Acne", "Hyperpigmentation", "Anti-aging", "Sensitive", "Dryness"];

export default function Shop() {
  const [search, setSearch] = useState("");
  const [activeConcern, setActiveConcern] = useState("All");
  const topRef = useScrollReveal();
  const allRef = useScrollReveal();

  const filtered = marketplaceProducts.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase());
    const matchConcern = activeConcern === "All" || p.concerns.includes(activeConcern);
    return matchSearch && matchConcern;
  });

  return (
    <div className="min-h-screen pb-24 md:pb-8 relative overflow-hidden">
      <div className="deco-circle w-[300px] h-[300px] top-[-50px] left-[-80px] fixed opacity-35" />
      <div className="deco-glow-pink w-[250px] h-[250px] bottom-[25vh] right-[-80px] fixed opacity-20" />

      {/* Split Hero */}
      <div className="relative min-h-[50vh] md:min-h-[48vh] overflow-hidden md:rounded-b-[2rem]">
        <div className="absolute inset-0 md:left-[45%]">
          <img
            src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&h=800&fit=crop"
            alt=""
            className="w-full h-full object-cover animate-gentle-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/10 md:bg-gradient-to-r md:from-background md:via-background/20 md:to-transparent" />
        </div>

        <div className="relative z-10 flex flex-col justify-end md:justify-center px-6 pb-10 pt-20 md:px-10 md:max-w-[45%] md:py-20">
          <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-medium">CURATED FOR YOU</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mt-2 tracking-tight">Care for Your Skin</h1>
          <p className="text-sm text-muted-foreground mt-3 max-w-[300px] leading-relaxed">Products matched to your molecular profile with AI-powered compatibility scores</p>
          
          <div className="flex gap-3 mt-6">
            <button className="px-6 py-3 rounded-full bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-all duration-300 shadow-lg flex items-center gap-2 btn-press">
              <ShoppingBag size={14} /> Browse All
            </button>
          </div>
        </div>

        {/* Special Offer */}
        <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-10 animate-float">
          <div className="glass-rose rounded-3xl p-5 shadow-2xl max-w-[200px]">
            <p className="text-[10px] font-semibold text-primary uppercase tracking-[0.15em]">Special Offer</p>
            <p className="text-base font-display font-bold text-foreground mt-1.5">20% off Barrier Repair</p>
            <p className="text-[10px] text-muted-foreground mt-1">Limited time only</p>
          </div>
        </div>
      </div>

      <div className="px-5 md:px-10 space-y-8 mt-6 relative z-10">
        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search marketplace..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-11 rounded-2xl border-none bg-card/60 backdrop-blur-sm h-12 text-sm shadow-md"
          />
        </div>

        {/* Concern pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {concerns.map((c) => (
            <button
              key={c}
              onClick={() => setActiveConcern(c)}
              className={cn(
                "px-5 py-2.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-300 btn-press",
                activeConcern === c
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "glass-rose text-muted-foreground hover:text-foreground"
              )}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Top Matches */}
        <div ref={topRef} className="space-y-4">
          <h2 className="font-display font-semibold text-xl text-foreground px-1">Top Matches</h2>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none -mx-1 px-1">
            {filtered.slice(0, 3).map((product, i) => (
              <div key={product.id} className="shrink-0 w-68 md:w-76 group cursor-pointer" style={{ marginLeft: i > 0 ? "-12px" : 0 }}>
                <div className={cn("rounded-3xl overflow-hidden relative h-76 hover-lift shadow-lg", i % 2 === 0 ? "glass-rose" : "")}>
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-skin-pink/5 to-transparent" />
                  
                  <div className="absolute top-3 right-3 glass-rose rounded-full px-3 py-1.5 text-[10px] font-bold text-primary flex items-center gap-1 shadow-md">
                    <Star size={10} className="fill-primary" /> {product.matchScore}%
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-5 space-y-2">
                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-[0.15em]">{product.brand}</p>
                    <h3 className="font-display font-semibold text-foreground text-lg leading-snug">{product.name}</h3>
                    <div className="flex items-center justify-between pt-1">
                      <span className="font-display font-bold text-foreground text-xl">${product.price}</span>
                      <div className="flex gap-2">
                        <button className="glass-rose rounded-full w-9 h-9 flex items-center justify-center text-primary hover:bg-primary/10 transition-colors btn-press shadow-md">
                          <Plus size={14} />
                        </button>
                        <button className="rounded-full w-9 h-9 flex items-center justify-center bg-primary text-primary-foreground hover:opacity-90 transition-opacity btn-press shadow-md">
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

        <div className="divider-elegant" />

        {/* All Products */}
        <div ref={allRef} className="space-y-4">
          <h2 className="font-display font-semibold text-xl text-foreground px-1">All Products</h2>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
            {filtered.map((product, i) => (
              <div
                key={product.id}
                className={cn(
                  "break-inside-avoid rounded-3xl overflow-hidden card-tilt group shadow-lg",
                  i % 3 === 0 ? "glass-rose" : "glass"
                )}
              >
                <div className="relative h-52 overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-skin-pink/5 to-transparent" />
                  <div className="absolute top-3 right-3 glass-rose rounded-full px-3 py-1.5 text-[10px] font-bold text-primary flex items-center gap-1 shadow-md">
                    <Star size={10} className="fill-primary" /> {product.matchScore}%
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-[0.15em]">{product.brand}</p>
                    <h3 className="font-semibold text-foreground text-sm leading-snug mt-0.5">{product.name}</h3>
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {product.concerns.map((c) => (
                      <span key={c} className="text-[9px] px-2.5 py-0.5 rounded-full gradient-blush text-foreground font-medium">{c}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-foreground text-xl">${product.price}</span>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 rounded-full text-[10px] font-semibold glass-rose text-primary hover:bg-primary/10 transition-colors flex items-center gap-1 btn-press">
                        <Plus size={10} /> Add
                      </button>
                      <button className="px-4 py-2 rounded-full text-[10px] font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity btn-press shadow-md">
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
