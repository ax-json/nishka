"use client";

import { useState } from "react";

type Stage = {
  key: string;
  title: string;
  detail: string;
};

// Stages 2, 4 and 6 were never expanded in the source recording; their text is written in the same voice.
const STAGES: readonly Stage[] = [
  {
    key: "data",
    title: "Data",
    detail:
      "Assemble a borrower-level dataset that combines conventional credit variables with alternative indicators of financial behaviour. Nothing is modelled before the data is understood — coverage, missingness and how each field was produced.",
  },
  {
    key: "descriptive",
    title: "Descriptive analysis",
    detail:
      "Describe each variable on its own terms — distributions, gaps and how borrowers who repaid differ from those who defaulted — before any model is asked to explain anything.",
  },
  {
    key: "univariate",
    title: "Univariate logistic regression",
    detail:
      "Test each alternative variable individually against loan default — a first screen for signals with a measurable association with repayment outcomes.",
  },
  {
    key: "multivariate",
    title: "Multivariate logistic regression",
    detail:
      "Model the promising signals together, alongside conventional credit variables, to see which relationships hold once the others are accounted for.",
  },
  {
    key: "lasso",
    title: "Lasso logistic regression",
    detail:
      "Apply L1 regularisation to guard against overfitting and help identify which variables deserve the most careful attention.",
  },
  {
    key: "interpretation",
    title: "Interpretation",
    detail:
      "Read the results with caution: report what the evidence supports, what it does not, and where the data is too thin to say anything at all.",
  },
];

export function StagesAccordion() {
  const [openKey, setOpenKey] = useState<string | null>(STAGES[0].key);
  const openIndex = STAGES.findIndex((stage) => stage.key === openKey);
  const progress = openIndex < 0 ? 0 : ((openIndex + 1) / STAGES.length) * 100;

  return (
    <div className="relative">
      <span className="absolute top-0 bottom-0 left-[3px] w-px bg-rule" aria-hidden="true" />
      <span
        className="absolute top-0 left-[3px] w-px bg-accent-soft transition-[height] duration-700 ease-out"
        style={{ height: `${progress}%` }}
        aria-hidden="true"
      />
      <ol>
        {STAGES.map((stage) => {
          const isOpen = stage.key === openKey;
          const panelId = `stage-panel-${stage.key}`;
          return (
            <li key={stage.key} className="relative pl-12">
              <span
                className={`absolute top-[34px] left-0 h-[7px] w-[7px] border transition-colors ${isOpen ? "border-accent bg-accent" : "border-faint bg-paper"}`}
                aria-hidden="true"
              />
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenKey(isOpen ? null : stage.key)}
                className="flex w-full items-start justify-between gap-6 py-7 text-left"
              >
                <span>
                  <span className="mono-label block !text-[10px]">{stage.title}</span>
                  <span
                    className={`mt-2 block font-serif text-[clamp(22px,2.2vw,30px)] transition-colors ${isOpen ? "text-accent italic" : "text-ink"}`}
                  >
                    {stage.title}
                  </span>
                </span>
                <span className="mt-6 font-light text-[24px] leading-none text-muted" aria-hidden="true">
                  {isOpen ? "–" : "+"}
                </span>
              </button>
              <div
                id={panelId}
                className={`grid transition-[grid-template-rows] duration-500 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
              >
                <div className="overflow-hidden">
                  <p className="body mb-8 max-w-[68ch] border-l border-rule pl-7">{stage.detail}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

type SignalGroup = {
  name: string;
  variables: readonly string[];
};

// Only Income and Financial behaviour chips were visible in the recording; the rest follow the home-page signal list.
const SIGNAL_GROUPS: readonly SignalGroup[] = [
  { name: "Income", variables: ["income patterns", "income sources"] },
  { name: "Employment", variables: ["employment stability"] },
  { name: "Financial behaviour", variables: ["rent & utility histories"] },
  { name: "Digital behaviour", variables: ["upi activity", "phone tenure", "e-commerce behaviour"] },
  { name: "Payment behaviour", variables: ["bill payment regularity"] },
  { name: "Borrower characteristics", variables: ["enterprise type", "years in business"] },
];

export function SignalsExplorer() {
  const [activeName, setActiveName] = useState(SIGNAL_GROUPS[0].name);
  const active = SIGNAL_GROUPS.find((group) => group.name === activeName) ?? SIGNAL_GROUPS[0];

  return (
    <div className="mt-14 grid gap-12 lg:grid-cols-12">
      <ul className="lg:col-span-5" aria-label="Signal groups">
        {SIGNAL_GROUPS.map((group) => {
          const isActive = group.name === activeName;
          return (
            <li key={group.name} className="border-b border-rule last:border-b-0">
              <button
                type="button"
                aria-pressed={isActive}
                onMouseEnter={() => setActiveName(group.name)}
                onFocus={() => setActiveName(group.name)}
                onClick={() => setActiveName(group.name)}
                className="flex w-full items-center gap-5 py-5 text-left"
              >
                <span className={`h-[5px] w-[5px] rounded-full ${isActive ? "bg-accent" : "bg-faint"}`} />
                <span
                  className={`font-serif text-[20px] transition-colors ${isActive ? "text-ink" : "text-ink-soft/60"}`}
                >
                  {group.name}
                </span>
                <span className="ml-auto font-mono text-[11px] text-muted">{group.variables.length}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <div className="lg:col-span-6 lg:col-start-7" aria-live="polite">
        <p className="mono-label !text-[10px]">Exploring</p>
        <div key={active.name} className="mt-5 flex flex-wrap gap-3">
          {active.variables.map((variable, index) => (
            <span
              key={variable}
              className="fade-in border border-rule bg-card px-5 py-3 font-mono text-[11.5px] text-ink-soft"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {variable}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
