import { Shield, AlertTriangle, XCircle } from "lucide-react";
import type { SafetyStatus } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface SafetyBadgeProps {
  status: SafetyStatus;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

const config = {
  safe: { label: "Safe", icon: Shield, bg: "bg-safe/20", text: "text-safe-foreground", border: "border-safe/30", glow: "safety-glow-safe" },
  caution: { label: "Caution", icon: AlertTriangle, bg: "bg-caution/20", text: "text-caution-foreground", border: "border-caution/30", glow: "safety-glow-caution" },
  conflict: { label: "Conflict", icon: XCircle, bg: "bg-conflict/20", text: "text-conflict-foreground", border: "border-conflict/30", glow: "safety-glow-conflict" },
};

const sizes = {
  sm: "px-2 py-0.5 text-xs gap-1",
  md: "px-3 py-1 text-sm gap-1.5",
  lg: "px-4 py-1.5 text-base gap-2",
};

const iconSizes = { sm: 12, md: 14, lg: 16 };

export function SafetyBadge({ status, size = "md", showLabel = true }: SafetyBadgeProps) {
  const c = config[status];
  const Icon = c.icon;

  return (
    <span className={cn(
      "inline-flex items-center rounded-full border font-medium",
      c.bg, c.text, c.border, sizes[size],
      status === "safe" && "animate-breathe",
      status === "caution" && "animate-pulse-warning",
    )}>
      <Icon size={iconSizes[size]} />
      {showLabel && c.label}
    </span>
  );
}
