import { motion } from "framer-motion";
import SectionReveal from "./SectionReveal.jsx";

const differentiators = [
  {
    title: "Full-stack capability",
    description:
      "One team designs the interface, builds the backend, and integrates the AI layer, so nothing gets lost in translation between vendors.",
  },
  {
    title: "Production-first engineering",
    description:
      "We build for the traffic and edge cases of a live system from day one, not a demo that needs to be rebuilt to ship.",
  },
  {
    title: "Human-in-the-loop safety",
    description:
      "Agentic systems get explicit checkpoints for anything consequential, so autonomy never comes at the expense of control.",
  },
  {
    title: "Fast iteration",
    description:
      "Short cycles with working software at every step, so you are reacting to something real instead of a slide deck.",
  },
];

export default function WhyCaelogix() {
  return (
    <section
      className="relative overflow-hidden border-y border-navy-100 bg-navy-800 bg-cover bg-center py-24 text-white"
      style={{ backgroundImage: "url('/why-caelogix-bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-navy-900/90" />
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern bg-[length:40px_40px] opacity-[0.06]" />

      <div className="container-page relative">
        <SectionReveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-300">
            Why Caelogix
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Engineering discipline applied to AI, not AI applied on top of a
            prototype.
          </h2>
        </SectionReveal>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {differentiators.map((item, i) => (
            <SectionReveal
              key={item.title}
              delay={i * 0.08}
              className="relative"
            >
              <span className="text-5xl font-extrabold text-white/10">{`0${i + 1}`}</span>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{ transformOrigin: "left" }}
                className="mt-3 h-0.5 w-12 bg-teal"
              />
              <h3 className="mt-4 text-base font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-200">
                {item.description}
              </p>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
