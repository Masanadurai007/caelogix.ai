import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionReveal from "./SectionReveal.jsx";
import { services } from "../data/services.js";

export default function ServicesShowcase() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-24">
      <div className="container-page">
        <SectionReveal className="max-w-2xl">
          <p className="eyebrow">What we build</p>
          <h2 className="section-heading mt-3">
            Five ways we help teams ship AI that holds up.
          </h2>
        </SectionReveal>

        {/* Desktop: horizontal fan accordion */}
        <div className="mt-14 hidden gap-3 lg:flex lg:h-[540px]">
          {services.map((service, i) => (
            <FanPanel
              key={service.slug}
              service={service}
              index={i}
              isActive={active === i}
              onActivate={() => setActive(i)}
            />
          ))}
        </div>

        {/* Mobile / tablet: stacked cards with image */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:hidden">
          {services.map((service, i) => (
            <SectionReveal key={service.slug} delay={i * 0.06}>
              <StackedCard service={service} index={i} />
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FanPanel({ service, index, isActive, onActivate }) {
  const [imgError, setImgError] = useState(false);
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      onMouseEnter={onActivate}
      onFocus={onActivate}
      animate={{ flexGrow: isActive ? 5 : 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-w-0 flex-1 overflow-hidden rounded-2xl border border-navy-100 shadow-card"
    >
      {/* Background image / fallback gradient */}
      {!imgError ? (
        <img
          src={`/services/${service.slug}.jpg`}
          alt=""
          onError={() => setImgError(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-navy-700 to-teal-700" />
      )}
      <div
        className={`absolute inset-0 bg-gradient-to-t transition-colors duration-500 ${
          isActive
            ? "from-navy-900/95 via-navy-900/35 to-navy-900/45"
            : "from-navy-900/95 via-navy-900/85 to-navy-900/70"
        }`}
      />

      {/* Collapsed: vertical label */}
      <AnimatePresence>
        {!isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex flex-col items-center justify-between p-4"
          >
            <span className="text-xs font-bold text-teal-300">{num}</span>
            <span
              className="text-lg font-bold tracking-wide text-white sm:text-xl"
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              {service.name}
            </span>
            <ArrowUpRight size={16} className="text-white/60" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded: full detail */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, delay: 0.15 }}
            className="absolute inset-0 flex flex-col justify-end p-7"
          >
            <span className="text-sm font-bold text-teal-300">{num}</span>
            <h3 className="mt-2 text-2xl font-bold text-white">
              {service.name}
            </h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-navy-100">
              {service.short}
            </p>
            <Link
              to={`/services`}
              className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-navy-800 transition-transform hover:scale-105"
            >
              Learn more <ArrowUpRight size={14} />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function StackedCard({ service, index }) {
  const [imgError, setImgError] = useState(false);
  const num = String(index + 1).padStart(2, "0");

  return (
    <Link
      to={`/services/${service.slug}`}
      className="group relative block h-72 overflow-hidden rounded-2xl border border-navy-100 shadow-card"
    >
      {!imgError ? (
        <img
          src={`/services/${service.slug}.jpg`}
          alt=""
          onError={() => setImgError(true)}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-navy-700 to-teal-700" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/40 to-navy-900/10" />

      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <span className="text-xs font-bold text-teal-300">{num}</span>
        <h3 className="mt-2 text-lg font-bold text-white">{service.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-navy-100">
          {service.short}
        </p>
        <span className="mt-4 inline-flex w-fit items-center gap-1 text-sm font-semibold text-white">
          Learn more <ArrowUpRight size={14} />
        </span>
      </div>
    </Link>
  );
}
