import { products } from "@/data/mockData";
import { ProductCard } from "@/components/ProductCard";
import { AddProductModal } from "@/components/AddProductModal";
import { CategoryCircle } from "@/components/CategoryCircle";
import { Search, Package } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";

const filters = ["All", "Cleanser", "Toner", "Serum", "Moisturizer", "Sunscreen"];

const categoryImages: Record<string, string> = {
  All: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=200&fit=crop",
  Cleanser: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=200&h=200&fit=crop",
  Toner: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=200&h=200&fit=crop",
  Serum: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&h=200&fit=crop",
  Moisturizer: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=200&h=200&fit=crop",
  Sunscreen: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop",
};

export default function Shelf() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === "All" || p.category === activeFilter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="min-h-screen pb-24 md:pb-8 relative overflow-hidden">
      {/* Decorative bokeh */}
      <div className="deco-circle w-[250px] h-[250px] top-[30vh] right-[-80px] fixed opacity-40" />

      {/* Hero */}
      <div className="relative h-[40vh] min-h-[280px] overflow-hidden md:rounded-b-3xl">
        <img
          src="https://images.unsplash.com/photo-1570194065650-d99fb4a38c5f?w=1200&h=600&fit=crop"
          alt=""
          className="w-full h-full object-cover animate-gentle-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 md:px-10 flex items-end justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">Your Collection</h1>
            <p className="text-xs text-muted-foreground mt-1">{products.length} products in your digital shelf</p>
          </div>
          <AddProductModal />
        </div>
      </div>

      <div className="px-5 md:px-10 space-y-5 mt-6">
        {/* Category Circles */}
        <div className="flex gap-4 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1 animate-slide-up">
          {filters.map((f) => (
            <CategoryCircle
              key={f}
              image={categoryImages[f]}
              label={f}
              active={activeFilter === f}
              onClick={() => setActiveFilter(f)}
            />
          ))}
        </div>

        {/* Search */}
        <div className="relative animate-slide-up" style={{ animationDelay: "0.05s" }}>
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products or ingredients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-11 rounded-2xl border-border/40 bg-card/50 backdrop-blur-sm h-11 text-sm"
          />
        </div>

        {/* Popular Products Horizontal Scroll */}
        {activeFilter === "All" && (
          <div className="space-y-3 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <h2 className="font-display font-semibold text-foreground px-1">Popular Products</h2>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none -mx-1 px-1">
              {products.slice(0, 4).map((product, i) => (
                <div
                  key={product.id}
                  className={cn(
                    "shrink-0 w-44 md:w-52 rounded-2xl overflow-hidden hover-lift cursor-pointer group relative h-56 md:h-64",
                    i % 2 === 0 ? "glass-rose" : "gradient-warm"
                  )}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-skin-pink/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3.5">
                    <p className="text-[9px] text-muted-foreground font-medium uppercase tracking-[0.15em]">{product.brand}</p>
                    <h3 className="font-display font-semibold text-foreground leading-snug text-sm mt-0.5">{product.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Staggered Masonry Grid */}
        {filtered.length > 0 ? (
          <div className="columns-2 md:columns-3 gap-3.5 space-y-3.5">
            {filtered.map((product, i) => (
              <div
                key={product.id}
                className="break-inside-avoid animate-slide-up"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <ProductCard
                  product={product}
                  variant={i % 3 === 0 ? "default" : "compact"}
                  className={i % 4 === 1 ? "glass-rose" : undefined}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-20 h-20 rounded-full gradient-blush flex items-center justify-center">
              <Package size={30} className="text-primary/40" />
            </div>
            <h3 className="font-display font-semibold text-foreground text-lg">No products found</h3>
            <p className="text-sm text-muted-foreground text-center max-w-[220px]">
              Start building your shelf by adding your first product
            </p>
            <AddProductModal />
          </div>
        )}
      </div>
    </div>
  );
}
