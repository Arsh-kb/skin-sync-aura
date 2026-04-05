import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { skinProfileOptions } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { ArrowRight, Sparkles } from "lucide-react";

const stepBackgrounds = [
  "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1400&h=900&fit=crop",
  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1400&h=900&fit=crop",
  "https://images.unsplash.com/photo-1570194065650-d99fb4a38c5f?w=1400&h=900&fit=crop",
];

const stepTitles = ["What's your skin type?", "What are your concerns?", "What's your goal?"];
const stepSubtitles = [
  "Help us personalize your molecular routine",
  "Select all that apply to you",
  "Choose what matters most right now",
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [skinType, setSkinType] = useState<string | null>(null);
  const [concerns, setConcerns] = useState<string[]>([]);
  const [goal, setGoal] = useState<string | null>(null);

  const toggleConcern = (id: string) => {
    setConcerns((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const canProceed =
    (step === 0 && skinType) ||
    (step === 1 && concerns.length > 0) ||
    (step === 2 && goal);

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      localStorage.setItem(
        "cosmetiq-profile",
        JSON.stringify({ skinType, concerns, goal })
      );
      navigate("/");
    }
  };

  const handleSkip = () => {
    localStorage.setItem("cosmetiq-profile", JSON.stringify({ skipped: true }));
    navigate("/");
  };

  return (
    <div className="fixed inset-0 z-50 bg-background overflow-hidden">
      {/* Background image with transition */}
      <div className="absolute inset-0">
        {stepBackgrounds.map((bg, i) => (
          <img
            key={bg}
            src={bg}
            alt=""
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-opacity duration-700",
              i === step ? "opacity-100" : "opacity-0"
            )}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-12 px-6 md:px-10 md:max-w-lg md:mx-auto">
        {/* Skip */}
        <button
          onClick={handleSkip}
          className="absolute top-6 right-6 text-xs text-muted-foreground/80 font-medium hover:text-foreground transition-colors"
        >
          Skip
        </button>

        {/* Step indicators */}
        <div className="flex gap-2 mb-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={cn(
                "h-1 rounded-full transition-all duration-500",
                i === step ? "w-8 bg-primary" : i < step ? "w-4 bg-primary/50" : "w-4 bg-muted-foreground/20"
              )}
            />
          ))}
        </div>

        {/* Title */}
        <div className="mb-6 animate-slide-up" key={step}>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={16} className="text-primary" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium">
              Step {step + 1} of 3
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">{stepTitles[step]}</h1>
          <p className="text-sm text-muted-foreground mt-2">{stepSubtitles[step]}</p>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-8 animate-fade-in-scale" key={`opts-${step}`}>
          {step === 0 && (
            <div className="grid grid-cols-2 gap-3">
              {skinProfileOptions.types.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSkinType(type.id)}
                  className={cn(
                    "relative rounded-2xl overflow-hidden h-28 group transition-all duration-300",
                    skinType === type.id
                      ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-[1.02]"
                      : "hover:scale-[1.01]"
                  )}
                >
                  <img src={type.image} alt={type.label} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-background/10" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-left">
                    <span className="text-lg mr-1">{type.emoji}</span>
                    <span className="font-display font-semibold text-foreground text-sm">{type.label}</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {step === 1 && (
            <div className="flex flex-wrap gap-2">
              {skinProfileOptions.concerns.map((c) => (
                <button
                  key={c.id}
                  onClick={() => toggleConcern(c.id)}
                  className={cn(
                    "px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                    concerns.includes(c.id)
                      ? "bg-primary text-primary-foreground shadow-lg scale-105"
                      : "glass-rose text-foreground hover:scale-105"
                  )}
                >
                  <span className="mr-1.5">{c.emoji}</span>
                  {c.label}
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="grid grid-cols-2 gap-3">
              {skinProfileOptions.goals.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setGoal(g.id)}
                  className={cn(
                    "glass-rose rounded-2xl p-5 text-center transition-all duration-300 space-y-2",
                    goal === g.id
                      ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-[1.02]"
                      : "hover:scale-[1.01]"
                  )}
                >
                  <span className="text-2xl block">{g.emoji}</span>
                  <span className="font-display font-semibold text-foreground">{g.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <button
          onClick={handleNext}
          disabled={!canProceed}
          className={cn(
            "w-full py-3.5 rounded-full text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300",
            canProceed
              ? "bg-primary text-primary-foreground shadow-lg hover:opacity-90"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          )}
        >
          {step === 2 ? "Complete Setup" : "Continue"}
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
