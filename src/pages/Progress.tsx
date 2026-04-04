import { progressData } from "@/data/mockData";
import { SafetyScoreRing } from "@/components/SafetyScoreRing";
import { Camera, Star, Flame, TrendingUp, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useMemo } from "react";

const motivationalQuotes = [
  "Your skin is a reflection of your commitment to self-care ✨",
  "Consistency is the secret to radiant skin 🌸",
  "Every day you show up for your routine, your skin thanks you 💫",
  "Beautiful skin requires commitment, not a miracle 🌿",
];

export default function Progress() {
  const [dailyRating, setDailyRating] = useState(0);
  const quote = useMemo(() => motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)], []);

  return (
    <div className="min-h-screen pb-24 md:pb-8 relative overflow-hidden">
      {/* Decorative bokeh */}
      <div className="deco-circle w-[280px] h-[280px] top-[50vh] left-[-100px] fixed opacity-30" />

      {/* Hero */}
      <div className="relative h-[40vh] min-h-[280px] overflow-hidden md:rounded-b-3xl">
        <img
          src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1200&h=600&fit=crop"
          alt=""
          className="w-full h-full object-cover animate-gentle-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/50 to-background" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 md:px-10 flex items-end justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">Your Journey</h1>
            <p className="text-xs text-muted-foreground mt-1">Track your skin's transformation</p>
          </div>
          <div className="flex items-center gap-2 glass-rose rounded-full px-3 py-1.5">
            <Flame size={14} className="text-primary" />
            <span className="text-sm font-bold text-foreground">{progressData.currentStreak}</span>
            <span className="text-[10px] text-muted-foreground">day streak</span>
          </div>
        </div>
      </div>

      <div className="px-5 md:px-10 -mt-6 space-y-6 relative z-10">
        {/* Motivational Quote */}
        <div className="glass-rose rounded-2xl p-4 flex items-center gap-3 animate-slide-up">
          <Heart size={16} className="text-skin-rose shrink-0" />
          <p className="text-sm text-foreground font-light italic leading-relaxed">{quote}</p>
        </div>

        {/* Weekly Photo Journal */}
        <div className="space-y-3 animate-slide-up" style={{ animationDelay: "0.05s" }}>
          <h2 className="font-display font-semibold text-lg text-foreground px-1">Weekly Photo Journal</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none -mx-1 px-1">
            {progressData.weeks.map((week, i) => (
              <div
                key={week.week}
                className={cn(
                  "shrink-0 w-36 md:w-44 h-48 md:h-56 rounded-2xl overflow-hidden hover-lift cursor-pointer group relative",
                  i % 2 === 0 ? "glass-rose" : "gradient-warm"
                )}
                style={{ marginLeft: i > 0 ? "-6px" : 0 }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 gradient-rose-soft">
                  <div className="w-14 h-14 rounded-full gradient-blush flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Camera size={22} className="text-primary/60" />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-semibold text-foreground">Week {week.week}</p>
                    {week.rating && (
                      <div className="flex items-center gap-0.5 justify-center mt-1">
                        {[...Array(5)].map((_, j) => (
                          <Star
                            key={j}
                            size={10}
                            className={cn(
                              j < Math.floor(week.rating!) ? "text-primary fill-primary" : "text-muted-foreground/30"
                            )}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Skin Rating */}
        <div className="glass-rose rounded-2xl p-6 space-y-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <h3 className="font-display font-semibold text-foreground text-lg">How does your skin feel today?</h3>
          <div className="flex items-center gap-3 justify-center">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => setDailyRating(rating)}
                className="transition-all duration-300 hover:scale-125"
              >
                <Star
                  size={32}
                  className={cn(
                    "transition-colors duration-300",
                    rating <= dailyRating
                      ? "text-primary fill-primary"
                      : "text-muted-foreground/30 hover:text-primary/50"
                  )}
                />
              </button>
            ))}
          </div>
          {dailyRating > 0 && (
            <p className="text-xs text-muted-foreground text-center animate-fade-in">
              {dailyRating >= 4 ? "Great! Your routine is working ✨" : dailyRating >= 3 ? "Good progress! Keep going 💪" : "Let's adjust your routine for better results 🔬"}
            </p>
          )}
        </div>

        {/* Routine Streak Grid */}
        <div className="space-y-3 animate-slide-up" style={{ animationDelay: "0.15s" }}>
          <h2 className="font-display font-semibold text-foreground text-lg px-1">Routine Streak</h2>
          <div className="glass-rose rounded-2xl p-5">
            <div className="grid grid-cols-7 gap-1.5">
              {progressData.streakDays.map((day, i) => (
                <div
                  key={i}
                  className={cn(
                    "aspect-square rounded-md transition-colors duration-300",
                    day === 1
                      ? i < 7 ? "bg-champagne" : i < 14 ? "bg-skin-peach" : i < 21 ? "bg-skin-rose" : "bg-primary"
                      : "bg-muted/30"
                  )}
                />
              ))}
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-[9px] text-muted-foreground">Less</span>
              <div className="flex gap-1">
                <div className="w-2.5 h-2.5 rounded-sm bg-muted/30" />
                <div className="w-2.5 h-2.5 rounded-sm bg-champagne" />
                <div className="w-2.5 h-2.5 rounded-sm bg-skin-peach" />
                <div className="w-2.5 h-2.5 rounded-sm bg-skin-rose" />
                <div className="w-2.5 h-2.5 rounded-sm bg-primary" />
              </div>
              <span className="text-[9px] text-muted-foreground">More</span>
            </div>
          </div>
        </div>

        {/* Effectiveness */}
        <div className="flex flex-col md:flex-row gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <div className="glass-rose rounded-2xl p-6 flex items-center gap-5 flex-1 card-tilt">
            <SafetyScoreRing score={progressData.effectivenessScore} size={90} strokeWidth={6} />
            <div>
              <h3 className="font-display font-semibold text-foreground text-lg">Routine Effectiveness</h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Based on {progressData.totalDays} days of tracking. Average daily rating: {(progressData.weeks.reduce((a, w) => a + (w.rating || 0), 0) / progressData.weeks.length).toFixed(1)}/5
              </p>
            </div>
          </div>
          <div className="gradient-blush rounded-2xl p-5 flex items-center gap-3 md:w-48 card-tilt">
            <TrendingUp size={20} className="text-safe shrink-0" />
            <div>
              <p className="text-lg font-bold font-display text-foreground">+12%</p>
              <p className="text-[10px] text-muted-foreground">improvement this month</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
