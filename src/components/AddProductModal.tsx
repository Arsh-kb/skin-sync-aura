import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Upload, Sparkles } from "lucide-react";
import { useState } from "react";

interface AddProductModalProps {
  trigger?: React.ReactNode;
}

export function AddProductModal({ trigger }: AddProductModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="rounded-2xl bg-gradient-to-r from-primary to-skin-rose text-primary-foreground gap-2 shadow-lg hover:shadow-xl transition-shadow">
            <Plus size={18} />
            Add Product
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="glass-strong rounded-2xl border-white/30 max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">Add New Product</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Product Name</Label>
            <Input placeholder="e.g. Vitamin C Serum" className="rounded-xl border-border/50 bg-background/50" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Brand</Label>
            <Input placeholder="e.g. GlowLab" className="rounded-xl border-border/50 bg-background/50" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Ingredients</Label>
            <Textarea
              placeholder="Paste ingredients list here..."
              className="rounded-xl border-border/50 bg-background/50 min-h-[100px] resize-none"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Product Image (optional)</Label>
            <div className="border-2 border-dashed border-border/50 rounded-xl p-6 text-center cursor-pointer hover:border-primary/30 transition-colors">
              <Upload size={24} className="mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">Click to upload or drag & drop</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(false)}
            className="w-full rounded-2xl h-12 bg-gradient-to-r from-primary via-skin-rose to-primary text-primary-foreground font-semibold text-base shadow-lg hover:shadow-xl transition-all gap-2"
          >
            <Sparkles size={18} />
            Analyze & Add
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
