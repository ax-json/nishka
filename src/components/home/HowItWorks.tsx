"use client";

import { useState } from "react";

type Step = {
  id: string;
  title: string;
  detail: string;
};

const STEPS: readonly Step[] = [
  {
    id: "01",
    title: "Understand the gap",
    detail: "Map where formal credit fails to reach, and why existing data leaves so many borrowers invisible.",
  },
  {
    id: "02",
    title: "Study alternative signals",
    detail: "Identify the everyday financial behaviours that leave usable, verifiable traces.",
  },
  {
    id: "03",
    title: "Test statistically",
    detail: "Examine whether these signals have measurable relationships with repayment outcomes.",
  },
  {
    id: "04",
    title: "Listen to credit professionals",
    detail: "Ground the numbers in the judgement of people who assess borrowers for a living.",
  },
  {
    id: "05",
    title: "Translate findings into practical tools",
    detail: "Turn evidence into literacy material and frameworks practitioners can actually use.",
  },
  {
    id: "06",
    title: "Engage financial institutions",
    detail: "Share what we learn with the institutions whose decisions shape access to credit.",
  },
];

export function HowItWorks() {
  const [activeId, setActiveId] = useState(STEPS[0].id);
  const active = STEPS.find((step) => step.id === activeId) ?? STEPS[0];

  return (
    <div className="mt-14 border border-rule">
      <div role="tablist" aria-label="How Nishka works" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {STEPS.map((step) => {
          const isActive = step.id === activeId;
          return (
            <button
              key={step.id}
              type="button"
              role="tab"
              id={`step-${step.id}`}
              aria-selected={isActive}
              aria-controls="step-panel"
              onMouseEnter={() => setActiveId(step.id)}
              onFocus={() => setActiveId(step.id)}
              onClick={() => setActiveId(step.id)}
              className={`flex min-h-[148px] flex-col items-start border-r border-b border-rule px-6 pt-7 pb-6 text-left transition-colors duration-300 lg:border-b-0 ${isActive ? "bg-ink text-paper-light" : "bg-card text-ink hover:bg-paper-light"}`}
            >
              <span className={`font-mono text-[11px] ${isActive ? "text-accent-soft" : "text-muted"}`}>{step.id}</span>
              <span className="mt-4 font-serif text-[19px] leading-[1.3]">{step.title}</span>
              <span className={`mt-auto block h-px w-7 ${isActive ? "bg-accent-soft" : "bg-rule"}`} />
            </button>
          );
        })}
      </div>
      <div
        id="step-panel"
        role="tabpanel"
        aria-labelledby={`step-${active.id}`}
        className="border-t border-rule px-6 py-9 md:px-10"
      >
        <p key={active.id} className="body fade-in max-w-[70ch]">
          {active.detail}
        </p>
      </div>
    </div>
  );
}
