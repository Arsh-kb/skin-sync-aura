import { products } from "@/data/mockData";
import { ProductCard } from "@/components/ProductCard";
import { AddProductModal } from "@/components/AddProductModal";
import { Search, Package } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";

const filters = ["All", "Cleanser", "Toner", "Serum", "Moisturizer", "Sunscreen"];

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
    <div className="min-h-screen pb-24">
      {/* Hero */}
      <div className="relative h-36 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1570194065650-d99fb4a38c5f?w=800&h=300&fit=crop"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 to-background" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-4 flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Digital Shelf</h1>
            <p className="text-xs text-muted-foreground mt-0.5">{products.length} products in your collection</p>
          </div>
          <AddProductModal />
        </div>
      </div>

      <div className="px-5 space-y-4 mt-4">
        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products or ingredients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-11 rounded-2xl border-border/40 bg-card/50 backdrop-blur-sm h-11 text-sm"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-300",
                activeFilter === f
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card/60 backdrop-blur-sm text-muted-foreground hover:bg-secondary border border-border/30"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 gap-3.5">
            {filtered.map((product, i) => (
              <div key={product.id} className="animate-slide-up" style={{ animationDelay: `${i * 0.06}s` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-20 h-20 rounded-full bg-skin-pink/40 flex items-center justify-center">
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
