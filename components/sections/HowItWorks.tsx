import type { Dictionary } from "@/app/[lang]/dictionaries";

interface Props {
  dict: Dictionary;
}

export default function HowItWorks({ dict }: Props) {
  const steps = [
    { title: dict.howItWorks.step1Title, desc: dict.howItWorks.step1Desc },
    { title: dict.howItWorks.step2Title, desc: dict.howItWorks.step2Desc },
    { title: dict.howItWorks.step3Title, desc: dict.howItWorks.step3Desc },
  ];

  return (
    <section className="py-20 bg-bone">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-charcoal font-bold text-3xl sm:text-4xl mb-14">
          {dict.howItWorks.title}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-sand-dark/60">
          {steps.map((step, i) => (
            <div
              key={i}
              className="sm:px-10 first:pl-0 last:pr-0 py-8 sm:py-0"
            >
              <span className="block font-serif text-[5rem] font-bold text-charcoal/[0.07] leading-[0.85] mb-5 select-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-semibold text-charcoal text-lg mb-2.5">
                {step.title}
              </h3>
              <p className="text-charcoal/50 text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
