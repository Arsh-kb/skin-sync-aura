import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Home, Package, FlaskRound, GitCompare, Bot, ShoppingBag, BookOpen, TrendingUp, AlertOctagon } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { path: "/", label: "Home", icon: Home },
  { path: "/shelf", label: "Shelf", icon: Package },
  { path: "/routine", label: "Routine", icon: FlaskRound },
  { path: "/compare", label: "Compare", icon: GitCompare },
  { path: "/conflicts", label: "Conflicts", icon: AlertOctagon },
  { path: "/shop", label: "Shop", icon: ShoppingBag },
  { path: "/advisory", label: "Advisory", icon: BookOpen },
  { path: "/assistant", label: "Guardian", icon: Bot },
  { path: "/progress", label: "Progress", icon: TrendingUp },
];

export default function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-linen/40 backdrop-blur-md fixed inset-y-0 left-0 z-40 shadow-xl">
        <div className="px-7 pt-9 pb-7">
          <h1 className="font-display text-2xl font-bold text-foreground tracking-tight">CosmetiQ AI</h1>
          <p className="text-[10px] text-muted-foreground uppercase tracking-[0.25em] mt-1.5">Molecular Safety</p>
        </div>
        <div className="divider-elegant mx-4" />
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto mt-4">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path;
            return (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm transition-all duration-300 btn-press",
                  isActive
                    ? "bg-primary/10 text-primary font-semibold shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-champagne/40"
                )}
              >
                <tab.icon size={18} strokeWidth={isActive ? 2.2 : 1.5} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
        <div className="p-5 mx-4 mb-5 rounded-3xl glass-rose shadow-lg">
          <p className="text-xs font-semibold text-foreground">Skin Guardian</p>
          <p className="text-[10px] text-muted-foreground mt-1">AI is monitoring your routine</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Tab Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        <div className="mx-3 mb-3 glass-strong rounded-3xl px-1 py-2.5 flex justify-around items-center shadow-2xl overflow-x-auto scrollbar-none">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path;
            return (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className={cn(
                  "flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-2xl transition-all duration-300 shrink-0 btn-press",
                  isActive
                    ? "text-primary bg-primary/8"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <tab.icon size={18} strokeWidth={isActive ? 2.2 : 1.6} />
                <span className={cn(
                  "text-[9px] font-medium tracking-wide",
                  isActive && "font-semibold"
                )}>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
