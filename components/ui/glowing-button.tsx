import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function hexToRgba(hex: string, alpha: number = 1): string {
  let hexValue = hex.replace("#", "");

  if (hexValue.length === 3) {
    hexValue = hexValue
      .split("")
      .map((char) => char + char)
      .join("");
  }

  const r = parseInt(hexValue.substring(0, 2), 16);
  const g = parseInt(hexValue.substring(2, 4), 16);
  const b = parseInt(hexValue.substring(4, 6), 16);

  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    console.error("Invalid hex color:", hex);
    return "rgba(0, 0, 0, 1)";
  }

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function GlowingButton({
  children,
  className,
  glowColor = "#a3e635",
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}) {
  const glowColorRgba = hexToRgba(glowColor);
  const glowColorVia = hexToRgba(glowColor, 0.075);
  const glowColorTo = hexToRgba(glowColor, 0.2);

  return (
    <Button
      style={
        {
          "--glow-color": glowColorRgba,
          "--glow-color-via": glowColorVia,
          "--glow-color-to": glowColorTo,
        } as React.CSSProperties
      }
      className={cn(
        "w-min h-10 !px-5 text-sm rounded-lg border flex items-center justify-center relative transition-colors overflow-hidden bg-gradient-to-t border-r-0 duration-200",
        "from-zinc-900 to-neutral-800 text-white hover:text-white/80 border-zinc-800",
        "after:inset-0 after:absolute after:rounded-[inherit] after:bg-gradient-to-r after:from-transparent after:from-40% after:via-[var(--glow-color-via)] after:to-[var(--glow-color-to)] after:via-70% after:shadow-[rgba(255,_255,_255,_0.15)_0px_1px_0px_inset] z-20",
        "before:absolute before:w-[5px] hover:before:translate-x-full before:transition-all before:duration-200 before:h-[60%] before:bg-[var(--glow-color)] before:right-0 before:rounded-l before:shadow-[-2px_0_10px_var(--glow-color)] z-10",
        className
      )}
    >
      {children}
    </Button>
  );
}
