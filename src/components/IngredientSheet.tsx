import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { ingredientEncyclopedia, ingredientConflicts, products } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { AlertTriangle, Check, FlaskConical, Leaf, Shield, Sparkles } from "lucide-react";
import { type ReactNode } from "react";

const categoryIcons: Record<string, ReactNode> = {
  active: <FlaskConical size={14} />,
  hydrator: <Sparkles size={14} />,
  exfoliant: <Leaf size={14} />,
  antioxidant: <Shield size={14} />,
  emollient: <Sparkles size={14} />,
  spf: <Shield size={14} />,
};

const categoryLabels: Record<string, string> = {
  active: "Active",
  hydrator: "Hydrator",
  exfoliant: "Exfoliant",
  antioxidant: "Antioxidant",
  emollient: "Emollient",
  spf: "SPF Filter",
};

interface IngredientSheetProps {
  ingredientName: string;
  children: ReactNode;
}

export function IngredientSheet({ ingredientName, children }: IngredientSheetProps) {
  const info = ingredientEncyclopedia[ingredientName];
  const conflicts = ingredientConflicts[ingredientName];
  const foundInCount = products.filter((p) =>
    p.ingredients.some((i) => i.name === ingredientName)
  ).length;

  if (!info) return <>{children}</>;

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="rounded-t-3xl border-0 max-h-[85vh]">
        <div className="px-6 pt-4 pb-8 space-y-5 overflow-y-auto">
          {/* Handle */}
          <div className="w-10 h-1 rounded-full bg-border mx-auto" />

          {/* Header */}
          <div className="space-y-2 animate-slide-up">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                {categoryIcons[info.category]}
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium">
                {categoryLabels[info.category]}
              </span>
            </div>
            <h2 className="text-2xl font-display font-bold text-foreground">{ingredientName}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{info.description}</p>
          </div>

          {/* Found in */}
          <div className="glass-rose rounded-2xl p-4 flex items-center gap-3">
            <span className="text-lg font-bold font-display text-primary">{foundInCount}</span>
            <span className="text-xs text-muted-foreground">of your products contain this ingredient</span>
          </div>

          {/* Benefits */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">Benefits</h3>
            <div className="flex flex-wrap gap-2">
              {info.benefits.map((b) => (
                <span key={b} className="text-[11px] px-3 py-1.5 rounded-full bg-safe/10 text-foreground font-medium flex items-center gap-1.5">
                  <Check size={10} className="text-safe" /> {b}
                </span>
              ))}
            </div>
          </div>

          {/* Skin types */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">Best For</h3>
            <div className="flex flex-wrap gap-2">
              {info.skinTypes.map((st) => (
                <span key={st} className="text-[11px] px-3 py-1.5 rounded-full glass-rose text-foreground font-medium">
                  {st}
                </span>
              ))}
            </div>
          </div>

          {/* Conflicts */}
          {conflicts && (
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle size={12} className="text-conflict" /> Conflicts With
              </h3>
              <div className="flex flex-wrap gap-2">
                {conflicts.conflicts.map((c) => (
                  <span
                    key={c}
                    className={cn(
                      "text-[11px] px-3 py-1.5 rounded-full font-medium",
                      conflicts.level === "red" ? "bg-conflict/10 text-conflict" : "bg-caution/10 text-caution"
                    )}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Caution */}
          <div className="bg-caution/5 rounded-2xl p-4 border border-caution/10">
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">⚠️ Note:</span> {info.caution}
            </p>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
