import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Home, Package, FlaskRound, GitCompare, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { path: "/", label: "Home", icon: Home },
  { path: "/shelf", label: "Shelf", icon: Package },
  { path: "/routine", label: "Routine", icon: FlaskRound },
  { path: "/compare", label: "Compare", icon: GitCompare },
  { path: "/assistant", label: "Guardian", icon: Bot },
];

export default function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto relative min-h-screen bg-background">
      <Outlet />
      {/* Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-50">
        <div className="glass-strong rounded-t-2xl px-2 py-2 flex justify-around items-center">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path;
            return (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className={cn(
                  "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all",
                  isActive
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <tab.icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
                <span className="text-[10px] font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
