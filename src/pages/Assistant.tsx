import { SafetyBadge } from "@/components/SafetyBadge";
import { Bot, Send, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  from: "user" | "assistant";
}

const suggestions = [
  "Is retinol safe with AHA?",
  "Review my routine",
  "Best serum for dry skin?",
  "Can I mix Vitamin C & Niacinamide?",
];

const initialMessages: Message[] = [
  {
    id: "1",
    text: "Hello Sarah! I'm your Skin Guardian. I've been analyzing your routine and everything looks great. Your safety score is 82 — no major conflicts detected. How can I help today?",
    from: "assistant",
  },
];

export default function Assistant() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), text, from: "user" };
    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      text: getResponse(text),
      from: "assistant",
    };
    setMessages((m) => [...m, userMsg, botMsg]);
    setInput("");
  };

  return (
    <div className="min-h-screen pb-24 flex flex-col">
      <div className="px-5 pt-8 space-y-4 flex-1 flex flex-col">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-skin-rose flex items-center justify-center">
            <Bot size={20} className="text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-display font-bold text-foreground">Skin Guardian</h1>
            <p className="text-xs text-muted-foreground">AI-powered skincare assistant</p>
          </div>
        </div>

        {/* Status Insight Card */}
        <div className="glass rounded-2xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Current Status</p>
            <p className="text-sm font-semibold text-foreground mt-1">Routine is well-balanced</p>
          </div>
          <SafetyBadge status="safe" size="md" />
        </div>

        {/* Suggestion Pills */}
        <div className="flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => sendMessage(s)}
              className="px-3 py-1.5 rounded-full text-xs font-medium bg-skin-pink text-foreground hover:bg-skin-rose/40 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Messages */}
        <div className="flex-1 space-y-3 overflow-y-auto py-2">
          {messages.map((msg, i) => (
            <div
              key={msg.id}
              className={cn(
                "max-w-[85%] animate-fade-in",
                msg.from === "user" ? "ml-auto" : "mr-auto"
              )}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className={cn(
                "rounded-2xl px-4 py-3 text-sm leading-relaxed",
                msg.from === "user"
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "glass rounded-bl-md"
              )}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="sticky bottom-20 flex gap-2">
          <Input
            placeholder="Ask about your skincare..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            className="rounded-2xl border-border/50 bg-card/80 backdrop-blur-sm h-11 flex-1"
          />
          <button
            onClick={() => sendMessage(input)}
            className="w-11 h-11 rounded-2xl bg-gradient-to-r from-primary to-skin-rose flex items-center justify-center text-primary-foreground shadow-lg hover:shadow-xl transition-shadow shrink-0"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

function getResponse(q: string): string {
  const lower = q.toLowerCase();
  if (lower.includes("retinol") && lower.includes("aha"))
    return "⚠️ Retinol and AHAs (like glycolic acid) should not be used together. They can cause excessive irritation and compromise your skin barrier. I recommend alternating — use AHA in the morning and retinol at night, or alternate days.";
  if (lower.includes("routine"))
    return "I've reviewed your routine: your Cleanser → Toner step is safe ✅, but your Toner → Serum connection shows a conflict ❌ between glycolic acid and vitamin C. Consider swapping your toner to a non-exfoliating one on days you use vitamin C.";
  if (lower.includes("vitamin c") && lower.includes("niacinamide"))
    return "Recent research shows that Vitamin C and Niacinamide can actually be used together! The old concern about them canceling each other out has been largely debunked. Just apply Vitamin C first, let it absorb, then follow with Niacinamide.";
  if (lower.includes("dry skin"))
    return "For dry skin, look for serums with Hyaluronic Acid and Ceramides. Your Hydra Boost Gel Cream is an excellent choice! I'd also recommend applying it to slightly damp skin to maximize hydration.";
  return "Great question! Based on your current product shelf and routine, I'd recommend focusing on maintaining your skin barrier. Your safety score is 82, which is excellent. Would you like me to suggest any routine adjustments?";
}
