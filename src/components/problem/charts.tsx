"use client";

import type { CSSProperties } from "react";
import { useInView } from "@/components/ui/motion";

const DOT_STAGGER_MS = 4;

type DotGridProps = {
  dots: number;
  label: string;
};

export function DotGrid({ dots, label }: DotGridProps) {
  const { ref, isInView } = useInView<HTMLDivElement>(0.25);

  return (
    <div ref={ref} role="img" aria-label={label} className="grid grid-cols-[repeat(26,minmax(0,1fr))] gap-[5px]">
      {Array.from({ length: dots }, (_, index) => (
        <span
          key={index}
          className="aspect-square rounded-full bg-accent-soft transition-[opacity,transform] duration-500 ease-out"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "scale(1)" : "scale(0.4)",
            transitionDelay: `${index * DOT_STAGGER_MS}ms`,
          }}
        />
      ))}
    </div>
  );
}

export type Bar = {
  label: string;
  value: number;
  tone: "accent" | "ink";
};

type RatioBarsProps = {
  bars: readonly Bar[];
};

export function RatioBars({ bars }: RatioBarsProps) {
  const { ref, isInView } = useInView<HTMLDivElement>(0.3);

  return (
    <div ref={ref} className="space-y-8">
      {bars.map((bar, index) => {
        const fill = { width: isInView ? `${bar.value}%` : "0%", transitionDelay: `${index * 200}ms` } as CSSProperties;
        return (
          <div key={bar.label}>
            <div className="flex items-baseline justify-between text-[13.5px] text-ink-soft">
              <span>{bar.label}</span>
              <span className="font-mono text-[12px]">{bar.value}%</span>
            </div>
            <div className="mt-3 h-[7px] bg-paper-deep">
              <div
                className={`h-full transition-[width] duration-[1400ms] ease-out ${bar.tone === "accent" ? "bg-accent-soft" : "bg-ink"}`}
                style={fill}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
