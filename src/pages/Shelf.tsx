import { products } from "@/data/mockData";
import { ProductCard } from "@/components/ProductCard";
import { AddProductModal } from "@/components/AddProductModal";
import { Search, SlidersHorizontal, Package } from "lucide-react";
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
      <div className="px-5 pt-8 space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-display font-bold text-foreground">Digital Shelf</h1>
          <AddProductModal />
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-11 rounded-2xl border-border/50 bg-card/60 backdrop-blur-sm h-11"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                activeFilter === f
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card text-muted-foreground hover:bg-secondary"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {filtered.map((product, i) => (
              <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 space-y-4">
            <div className="w-20 h-20 rounded-full bg-skin-pink/50 flex items-center justify-center">
              <Package size={32} className="text-primary/50" />
            </div>
            <h3 className="font-display font-semibold text-foreground">No products found</h3>
            <p className="text-sm text-muted-foreground text-center max-w-[200px]">
              Start building your shelf by adding your first product
            </p>
            <AddProductModal />
          </div>
        )}
      </div>
    </div>
  );
}
