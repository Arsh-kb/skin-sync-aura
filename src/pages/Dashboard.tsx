import { SafetyScoreRing } from "@/components/SafetyScoreRing";
import { SafetyBadge } from "@/components/SafetyBadge";
import { AddProductModal } from "@/components/AddProductModal";
import { skinTips } from "@/data/mockData";
import { ArrowRight, GitCompare, FlaskRound, Sparkles, Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((i) => (i + 1) % skinTips.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const quickActions = [
    { label: "Add Product", icon: Sparkles, action: () => {}, isModal: true },
    { label: "Check Routine", icon: FlaskRound, action: () => navigate("/routine") },
    { label: "Compare", icon: GitCompare, action: () => navigate("/compare") },
  ];

  return (
    <div className="min-h-screen pb-24">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-b-[2.5rem] mb-6">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1200&h=600&fit=crop"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-skin-cream/80 via-skin-peach/60 to-background" />
        </div>
        <div className="relative px-5 pt-10 pb-8">
          <p className="text-muted-foreground font-medium text-sm">{getGreeting()},</p>
          <h1 className="text-3xl font-display font-bold text-foreground mt-1">Sarah ✨</h1>
          <p className="text-muted-foreground text-sm mt-1">Your skin is looking great today</p>
        </div>
      </div>

      <div className="px-5 space-y-5">
        {/* Skin Status + Score */}
        <div className="glass rounded-2xl p-5 flex items-center justify-between animate-fade-in">
          <div className="space-y-3">
            <h2 className="font-display font-semibold text-lg text-foreground">Skin Status</h2>
            <SafetyBadge status="safe" size="lg" />
            <p className="text-sm text-muted-foreground max-w-[180px]">
              Your routine is well-balanced with no major conflicts.
            </p>
          </div>
          <SafetyScoreRing score={82} />
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h2 className="font-display font-semibold text-lg text-foreground px-1">Quick Actions</h2>
          <div className="grid grid-cols-3 gap-3">
            {quickActions.map((action) => (
              action.isModal ? (
                <AddProductModal
                  key={action.label}
                  trigger={
                    <button className="glass rounded-2xl p-4 flex flex-col items-center gap-2 hover-lift text-center">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-skin-rose/20 flex items-center justify-center">
                        <action.icon size={20} className="text-primary" />
                      </div>
                      <span className="text-xs font-medium text-foreground">{action.label}</span>
                    </button>
                  }
                />
              ) : (
                <button
                  key={action.label}
                  onClick={action.action}
                  className="glass rounded-2xl p-4 flex flex-col items-center gap-2 hover-lift text-center"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-skin-rose/20 flex items-center justify-center">
                    <action.icon size={20} className="text-primary" />
                  </div>
                  <span className="text-xs font-medium text-foreground">{action.label}</span>
                </button>
              )
            ))}
          </div>
        </div>

        {/* Skin Insight */}
        <div className="glass rounded-2xl p-5 space-y-3 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center gap-2">
            <Lightbulb size={18} className="text-caution" />
            <h3 className="font-display font-semibold text-foreground">Daily Insight</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed transition-all duration-500">
            {skinTips[tipIndex]}
          </p>
        </div>

        {/* Explore */}
        <button
          onClick={() => navigate("/shelf")}
          className="glass rounded-2xl p-5 w-full flex items-center justify-between hover-lift group"
        >
          <div>
            <h3 className="font-display font-semibold text-foreground text-left">Your Digital Shelf</h3>
            <p className="text-sm text-muted-foreground">6 products tracked</p>
          </div>
          <ArrowRight size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
        </button>
      </div>
    </div>
  );
}
