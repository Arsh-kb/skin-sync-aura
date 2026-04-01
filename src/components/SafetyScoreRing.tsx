import { useEffect, useState } from "react";
import type { SafetyStatus } from "@/data/mockData";

interface SafetyScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
}

function getStatus(score: number): SafetyStatus {
  if (score >= 75) return "safe";
  if (score >= 45) return "caution";
  return "conflict";
}

const statusColors = {
  safe: "hsl(145, 35%, 74%)",
  caution: "hsl(40, 80%, 80%)",
  conflict: "hsl(0, 55%, 77%)",
};

export function SafetyScoreRing({ score, size = 140, strokeWidth = 10 }: SafetyScoreRingProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedScore / 100) * circumference;
  const status = getStatus(score);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedScore(score), 100);
    return () => clearTimeout(timer);
  }, [score]);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth={strokeWidth}
          className="opacity-30"
        />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke={statusColors[status]}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
          style={{ filter: `drop-shadow(0 0 8px ${statusColors[status]}40)` }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-3xl font-bold font-display text-foreground">{Math.round(animatedScore)}</span>
        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Safety</span>
      </div>
    </div>
  );
}
