import type { ReactNode } from "react";
import { CountUp } from "./motion";

export type Stat = {
  value: number;
  label: string;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  /** Extra figure rendered after a slash in the accent colour, e.g. "43% / 93%". */
  compare?: ReactNode;
};

type Props = {
  stats: readonly Stat[];
  className?: string;
};

export function StatBand({ stats, className = "" }: Props) {
  const halves = [stats.slice(0, 2), stats.slice(2, 4)];

  return (
    <div className={`grid md:grid-cols-2 ${className}`}>
      {halves.map((half, index) => (
        <div
          key={index}
          className={`grid grid-cols-2 gap-8 py-12 md:py-16 ${index === 0 ? "md:border-r md:border-rule md:pr-10" : "border-t border-rule md:border-t-0 md:pl-10"}`}
        >
          {half.map((stat) => (
            <div key={stat.label}>
              <p className="stat">
                <CountUp value={stat.value} decimals={stat.decimals} prefix={stat.prefix} suffix={stat.suffix} />
                {stat.compare && (
                  <>
                    <span className="text-faint"> / </span>
                    <span className="text-accent">{stat.compare}</span>
                  </>
                )}
              </p>
              <p className="body-sm mt-3 max-w-[26ch] !leading-[1.55]">{stat.label}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
