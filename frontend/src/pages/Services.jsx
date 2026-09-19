import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import SectionReveal from "../components/SectionReveal.jsx";
import { services } from "../data/services.js";

const stats = [
  { value: "5", label: "Core services" },
  { value: "100+", label: "Systems shipped" },
  { value: "4", label: "Industries served" },
  { value: "<48h", label: "Typical response time" },
];

const comparisonRows = [
  {
    label: "Custom-built for your workflows",
    values: [true, true, true, true, true],
  },
  {
    label: "Production monitoring included",
    values: [true, true, true, true, false],
  },
  {
    label: "Human-in-the-loop checkpoints",
    values: [true, false, true, true, false],
  },
  {
    label: "Works with your existing systems",
    values: [true, true, true, true, true],
  },
];

export default function Services() {
  return (
    <>
      {/* Hero banner with uploadable background image */}
      <section
        className="relative overflow-hidden bg-navy-800 bg-cover bg-center py-24 sm:py-28"
        style={{ backgroundImage: "url('/services-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900/95 via-navy-800/90 to-teal-900/80" />
        <div className="pointer-events-none absolute inset-0">
          <div className="animate-blob absolute -left-20 -top-20 h-72 w-72 rounded-full bg-teal-400 opacity-20 blur-3xl" />
          <div className="animate-blob animation-delay-2000 absolute -right-10 bottom-0 h-80 w-80 rounded-full bg-teal-300 opacity-10 blur-3xl" />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-grid-pattern bg-[length:44px_44px] opacity-10" />

        <div className="container-page relative max-w-3xl">
          <SectionReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-300">
              What we build
            </p>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl">
              Software and AI engineering, scoped to what your team actually
              needs.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-navy-100">
              Every engagement starts with the problem, not the technology.
              Explore each service below for the full breakdown.
            </p>
            <div className="mt-8">
              <Link to="/contact" className="btn-pill">
                Start a project <ArrowRight size={16} />
              </Link>
            </div>
          </SectionReveal>

          <SectionReveal
            delay={0.15}
            className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="border-l-2 border-teal-400/40 pl-4"
              >
                <p className="text-2xl font-extrabold text-white sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-navy-200">{stat.label}</p>
              </div>
            ))}
          </SectionReveal>
        </div>
      </section>

      {/* Service showcase */}
      <section className="bg-white py-24">
        <div className="container-page">
          <SectionReveal>
            <ServiceShowcase />
          </SectionReveal>
        </div>
      </section>

      {/* Feature comparison grid */}
      <section className="border-t border-navy-100 bg-navy-800 py-24">
        <div className="container-page">
          <SectionReveal className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-300">
              At a glance
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              What's included across engagements.
            </h2>
          </SectionReveal>

          <SectionReveal
            delay={0.1}
            className="mt-10 overflow-x-auto rounded-xl border border-navy-700 bg-navy-900/60"
          >
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-navy-700">
                  <th className="px-4 py-3 text-left font-semibold text-navy-200">
                    Included
                  </th>
                  {services.map((s) => (
                    <th
                      key={s.slug}
                      className="px-4 py-3 text-center font-semibold text-white"
                    >
                      {s.name.split(" ")[0]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr
                    key={row.label}
                    className="border-b border-navy-700/60 last:border-0"
                  >
                    <td className="px-4 py-3 text-navy-300">{row.label}</td>
                    {row.values.map((v, idx) => (
                      <td key={idx} className="px-4 py-3 text-center">
                        {v ? (
                          <Check size={16} className="mx-auto text-teal-300" />
                        ) : (
                          <span className="text-navy-600">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </SectionReveal>
        </div>
      </section>

      {/* CTA banner */}
      <section className="bg-teal py-20">
        <div className="container-page flex flex-col items-center gap-6 text-center">
          <SectionReveal>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Not sure which service fits?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-teal-50">
              Tell us what you're trying to solve — we'll tell you which of
              these, if any, is actually the right starting point.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-semibold text-teal-700 shadow-sm transition-transform hover:scale-[1.03]"
            >
              Get in Touch <ArrowRight size={16} />
            </Link>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}

function ServiceShowcase() {
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <div className="grid gap-12 lg:grid-cols-[300px_1fr] lg:gap-16">
      {/* Left: plain selector list */}
      <div>
        <p className="eyebrow">What we build</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy-800 sm:text-4xl">
          Five capabilities, one team.
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-navy-500">
          Select a service to view it.
        </p>

        <nav className="mt-10 space-y-1">
          {services.map((service, i) => {
            const isActive = active === i;
            return (
              <button
                key={service.slug}
                onClick={() => setActive(i)}
                className="group flex w-full items-baseline gap-4 py-3 text-left"
              >
                <span
                  className={`shrink-0 text-xs font-semibold tabular-nums tracking-wide transition-colors ${
                    isActive
                      ? "text-teal"
                      : "text-navy-300 group-hover:text-navy-400"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`text-base font-semibold transition-all sm:text-lg ${
                    isActive
                      ? "translate-x-1 text-navy-800"
                      : "text-navy-400 group-hover:translate-x-0.5 group-hover:text-navy-600"
                  }`}
                >
                  {service.name}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Right: content only, no image */}
      <div className="min-h-[420px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-sm font-bold text-teal">
              {String(active + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-2 text-2xl font-bold text-navy-800 sm:text-3xl">
              {current.name}
            </h3>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-navy-500">
              {current.short}
            </p>

            <div className="mt-8 grid gap-8 border-t border-navy-100 pt-8 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-teal">
                  The problem
                </p>
                <p className="mt-3 text-sm leading-relaxed text-navy-600">
                  {current.problem}
                </p>
              </div>
              <div className="sm:border-l sm:border-navy-100 sm:pl-8">
                <p className="text-xs font-semibold uppercase tracking-wide text-teal">
                  Our approach
                </p>
                <p className="mt-3 text-sm leading-relaxed text-navy-600">
                  {current.approach}
                </p>
              </div>
            </div>

            <Link
              to="/contact"
              className="group mt-9 inline-flex items-center gap-3 rounded-full bg-navy-800 py-2.5 pl-6 pr-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-700"
            >
              Ask about {current.name}
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal transition-transform group-hover:translate-x-0.5">
                <ArrowUpRight size={15} />
              </span>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
