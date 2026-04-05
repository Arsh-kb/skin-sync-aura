import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { scannerDemoProduct, ingredientConflicts } from "@/data/mockData";
import { SafetyScoreRing } from "@/components/SafetyScoreRing";
import { Camera, Plus, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const categoryColors: Record<string, string> = {
  active: "bg-primary/15 text-primary",
  hydrator: "bg-safe/15 text-safe-foreground",
  exfoliant: "bg-caution/15 text-caution-foreground",
  antioxidant: "bg-skin-rose/30 text-foreground",
  emollient: "bg-champagne text-foreground",
  spf: "bg-caution/15 text-caution-foreground",
};

export function ScannerModal() {
  const [isScanning, setIsScanning] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      setIsScanning(true);
      setShowResults(false);
      const timer = setTimeout(() => {
        setIsScanning(false);
        setShowResults(true);
      }, 2500);
      return () => clearTimeout(timer);
    } else {
      setIsScanning(false);
      setShowResults(false);
    }
  }, [open]);

  const conflictingIngredients = scannerDemoProduct.ingredients.filter(
    (ing) => ingredientConflicts[ing.name]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="fixed bottom-24 right-5 md:bottom-8 md:right-8 z-40 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-xl flex items-center justify-center hover:scale-110 transition-transform duration-300 animate-float">
          <Camera size={22} />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md p-0 overflow-hidden rounded-3xl border-0 bg-background">
        {isScanning && (
          <div className="relative h-80 bg-gradient-to-b from-background/50 to-background flex flex-col items-center justify-center">
            {/* Simulated viewfinder */}
            <div className="w-48 h-48 rounded-3xl border-2 border-primary/40 relative overflow-hidden">
              <img
                src={scannerDemoProduct.image}
                alt=""
                className="w-full h-full object-cover opacity-50"
              />
              {/* Scanning line */}
              <div className="absolute left-0 right-0 h-0.5 bg-primary/80 shadow-[0_0_12px_hsl(var(--primary))] animate-scan-line" />
              {/* Corner markers */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-primary rounded-tl-md" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-primary rounded-tr-md" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-primary rounded-bl-md" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-primary rounded-br-md" />
            </div>
            <p className="text-sm text-muted-foreground mt-4 animate-pulse">Analyzing ingredients…</p>
          </div>
        )}

        {showResults && (
          <div className="p-6 space-y-5 animate-slide-up">
            {/* Product header */}
            <div className="flex items-center gap-4">
              <img
                src={scannerDemoProduct.image}
                alt={scannerDemoProduct.name}
                className="w-16 h-16 rounded-2xl object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                  {scannerDemoProduct.brand}
                </p>
                <h3 className="font-display font-semibold text-foreground text-base leading-snug">
                  {scannerDemoProduct.name}
                </h3>
              </div>
            </div>

            {/* Safety score */}
            <div className="flex items-center justify-center py-2">
              <SafetyScoreRing score={scannerDemoProduct.safetyScore} size={110} strokeWidth={6} />
            </div>

            {/* Ingredients */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">Detected Ingredients</h4>
              <div className="flex flex-wrap gap-2">
                {scannerDemoProduct.ingredients.map((ing) => (
                  <span
                    key={ing.name}
                    className={cn(
                      "text-[11px] px-3 py-1.5 rounded-full font-medium transition-all",
                      categoryColors[ing.category] || "bg-muted text-foreground"
                    )}
                  >
                    {ing.name}
                    {ingredientConflicts[ing.name] && (
                      <Zap size={10} className="inline ml-1 text-caution" />
                    )}
                  </span>
                ))}
              </div>
            </div>

            {/* Conflicts warning */}
            {conflictingIngredients.length > 0 && (
              <div className="bg-caution/10 rounded-2xl p-3 border border-caution/15">
                <p className="text-[11px] text-foreground font-medium">
                  ⚠️ {conflictingIngredients.length} ingredient{conflictingIngredients.length > 1 ? "s" : ""} may conflict with products on your shelf
                </p>
              </div>
            )}

            {/* Add CTA */}
            <button
              onClick={() => setOpen(false)}
              className="w-full py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              <Plus size={16} /> Add to Shelf
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
