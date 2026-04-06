import { cn } from "@/lib/utils";

interface CategoryCircleProps {
  image: string;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export function CategoryCircle({ image, label, active, onClick }: CategoryCircleProps) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-2.5 group shrink-0">
      <div
        className={cn(
          "w-18 h-18 md:w-22 md:h-22 rounded-full overflow-hidden transition-all duration-400 shadow-md",
          "ring-2 ring-offset-2 ring-offset-background",
          active
            ? "ring-primary shadow-lg scale-105"
            : "ring-transparent group-hover:ring-skin-rose/40 group-hover:shadow-lg"
        )}
      >
        <img
          src={image}
          alt={label}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <span
        className={cn(
          "text-[10px] font-medium transition-colors uppercase tracking-[0.1em]",
          active ? "text-foreground" : "text-muted-foreground"
        )}
      >
        {label}
      </span>
    </button>
  );
}
