import { motion } from "framer-motion";
import SectionReveal from "./SectionReveal.jsx";

const process = [
  {
    title: "Discover",
    description:
      "We map your workflows, data, and constraints to find where AI creates real leverage.",
  },
  {
    title: "Design",
    description:
      "We scope the architecture and interface together, so the system is usable from the first release.",
  },
  {
    title: "Build",
    description:
      "We ship in short, reviewable cycles with working software you can test at every stage.",
  },
  {
    title: "Deploy",
    description:
      "We launch with monitoring and handoff documentation, and stay close through the first weeks live.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern bg-[length:36px_36px] opacity-[0.04]" />
      <div className="container-page relative">
        <SectionReveal className="max-w-2xl">
          <p className="eyebrow">How it works</p>
          <h2 className="section-heading mt-3">
            A four-step process built for momentum.
          </h2>
        </SectionReveal>

        {/* Desktop: line runs through the vertical middle of every card */}
        <div className="relative mt-20 hidden lg:block">
          <div className="grid grid-cols-4 gap-6">
            {process.map((step, i) => (
              <SectionReveal
                key={step.title}
                delay={i * 0.1}
                className="relative z-10 rounded-xl border border-navy-100 bg-white p-6 shadow-card"
              >
                <p className="text-xs font-bold text-teal">{`0${i + 1}`}</p>
                <h3 className="mt-1 text-base font-semibold text-navy-800">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-navy-500">
                  {step.description}
                </p>
              </SectionReveal>
            ))}
          </div>

          {/* Static line, sits at card mid-height, behind the cards */}
          <div className="absolute left-0 right-0 top-1/2 z-0 h-px -translate-y-1/2 bg-navy-100" />

          {/* Traveling pulse, loops continuously along the same line */}
          <motion.div
            className="absolute top-1/2 z-0 h-px w-28 -translate-y-1/2 bg-gradient-to-r from-transparent via-teal to-transparent"
            animate={{ left: ["-8%", "108%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Mobile: same idea, vertical line through card middles */}
        <div className="relative mt-14 lg:hidden">
          <div className="grid gap-6">
            {process.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative z-10 rounded-xl border border-navy-100 bg-white p-5 shadow-card"
              >
                <p className="text-xs font-bold text-teal">{`0${i + 1}`}</p>
                <h3 className="mt-1 text-base font-semibold text-navy-800">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-navy-500">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="absolute bottom-0 left-1/2 top-0 z-0 w-px -translate-x-1/2 bg-navy-100" />
          <motion.div
            className="absolute left-1/2 z-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-teal to-transparent"
            style={{ height: "90px" }}
            animate={{ top: ["-10%", "105%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>
    </section>
  );
}
