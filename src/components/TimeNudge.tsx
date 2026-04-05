import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Sun, CloudSun, Moon, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface NudgeConfig {
  icon: typeof Sun;
  title: string;
  subtitle: string;
  cta: string;
  path: string;
  gradient: string;
  iconClass: string;
}

function getNudgeConfig(hour: number): NudgeConfig {
  if (hour >= 6 && hour < 11) {
    return {
      icon: Sun,
      title: "Start your AM routine",
      subtitle: "Morning light is perfect for Vitamin C",
      cta: "Begin",
      path: "/routine",
      gradient: "from-caution/10 via-skin-peach/20 to-transparent",
      iconClass: "text-caution",
    };
  }
  if (hour >= 11 && hour < 15) {
    return {
      icon: CloudSun,
      title: "UV is high — reapply SPF",
      subtitle: "Your sunscreen protection fades after 2 hours",
      cta: "Details",
      path: "/shelf",
      gradient: "from-caution/15 via-champagne/20 to-transparent",
      iconClass: "text-caution",
    };
  }
  if (hour >= 17 && hour < 22) {
    return {
      icon: Moon,
      title: "Wind down with your PM routine",
      subtitle: "Night is when retinol and peptides work best",
      cta: "Start PM",
      path: "/routine",
      gradient: "from-skin-rose/15 via-skin-pink/10 to-transparent",
      iconClass: "text-skin-rose",
    };
  }
  return {
    icon: Sparkles,
    title: "Rest mode — skin repairs overnight",
    subtitle: "Your skin barrier regenerates while you sleep",
    cta: "Learn more",
    path: "/advisory",
    gradient: "from-muted/20 via-skin-cream/10 to-transparent",
    iconClass: "text-muted-foreground",
  };
}

export function TimeNudge() {
  const navigate = useNavigate();
  const nudge = useMemo(() => getNudgeConfig(new Date().getHours()), []);
  const Icon = nudge.icon;

  return (
    <div
      className={cn(
        "glass-rose rounded-2xl p-4 flex items-center gap-3.5 cursor-pointer hover-lift animate-slide-up",
        `bg-gradient-to-r ${nudge.gradient}`
      )}
      onClick={() => navigate(nudge.path)}
    >
      <div className="w-11 h-11 rounded-2xl bg-background/50 flex items-center justify-center shrink-0">
        <Icon size={20} className={nudge.iconClass} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground">{nudge.title}</p>
        <p className="text-[11px] text-muted-foreground mt-0.5">{nudge.subtitle}</p>
      </div>
      <span className="text-[10px] font-semibold text-primary uppercase tracking-wider shrink-0">
        {nudge.cta}
      </span>
    </div>
  );
}
