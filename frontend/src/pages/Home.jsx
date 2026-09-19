import { Link } from "react-router-dom";
import { ArrowRight, Link2, Workflow, Sparkles } from "lucide-react";
import { SiFramer } from "react-icons/si";
import { motion } from "framer-motion";
import SectionReveal from "../components/SectionReveal.jsx";
import Marquee from "../components/Marquee.jsx";
import ServicesShowcase from "../components/ServicesShowcase.jsx";
import WhyCaelogix from "../components/WhyCaelogix.jsx";
import HowItWorks from "../components/HowItWorks.jsx";

const DEVICON = (slug) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}/${slug}-original.svg`;

// Row 1 scrolls right → left
const techRow1 = [
  { type: "img", src: DEVICON("fastapi"), name: "FastAPI" },
  { type: "img", src: DEVICON("react"), name: "React" },
  { type: "icon", Icon: Link2, color: "#1C3C3C", name: "LangChain" },
  { type: "img", src: DEVICON("postgresql"), name: "PostgreSQL" },
  { type: "img", src: DEVICON("tailwindcss"), name: "Tailwind CSS" },
];

// Row 2 scrolls left → right
const techRow2 = [
  { type: "icon", Icon: Workflow, color: "#00A67E", name: "LangGraph" },
  { type: "icon", Icon: Sparkles, color: "#8B5CF6", name: "Generative AI" },
  { type: "img", src: DEVICON("python"), name: "Python" },
  { type: "img", src: DEVICON("vitejs"), name: "Vite" },
  { type: "icon", Icon: SiFramer, color: "#0055FF", name: "Framer Motion" },
];

const toMarqueeItems = (row) =>
  row.map((item) => (
    <span key={item.name} className="flex items-center gap-3">
      {item.type === "img" ? (
        <img
          src={item.src}
          alt={item.name}
          className="h-9 w-9 object-contain sm:h-11 sm:w-11"
        />
      ) : (
        <item.Icon size={40} color={item.color} />
      )}
      <span className="text-lg font-semibold text-navy-600">{item.name}</span>
    </span>
  ));

const headlineStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.35 } },
};

const lineUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Home() {
  return (
    <>
      {/* Hero — gradient background, centered headline, floating role pills */}
      <section className="relative overflow-hidden bg-navy-800 py-28 sm:py-32 lg:py-36">
        {/* Layer 1 — vertical gradient, dark at top fading to white at the base */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-800 via-navy-600 to-white" />

        {/* Layer 2 — faint vertical stripes for texture, slowly drifting sideways */}
        <motion.div
          className="absolute inset-y-0 opacity-[0.07]"
          style={{
            left: "-80px",
            right: "-80px",
            backgroundImage:
              "repeating-linear-gradient(90deg, transparent, transparent 78px, rgba(255,255,255,0.9) 79px, rgba(255,255,255,0.9) 80px)",
          }}
          animate={{ x: [0, 80, 0] }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Layer 3 — soft glow rising from the bottom center */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 60% 55% at 50% 100%, rgba(255,255,255,0.35), transparent 70%)",
          }}
        />

        <div className="container-page relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={headlineStagger}
            className="relative"
          >
            <motion.p
              variants={lineUp}
              className="text-sm font-medium uppercase tracking-[0.18em] text-white/70 sm:text-base"
            >
              Web & AI Engineering Partners
            </motion.p>

            <motion.h1 className="mt-3 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              <motion.span variants={lineUp} className="block text-white">
                Software and AI systems
              </motion.span>
              <motion.span variants={lineUp} className="block text-teal-100">
                built for how business runs
              </motion.span>
            </motion.h1>

            <motion.p
              variants={lineUp}
              className="mx-auto mt-6 max-w-xl text-lg text-white/85"
            >
              We partner with growing companies to design, build, and ship
              chatbots, web platforms, and agentic AI — reliable systems backed
              by a team that stands behind every release.
            </motion.p>

            <motion.div
              variants={lineUp}
              className="mt-9 flex flex-wrap items-center justify-center gap-6"
            >
              <Link
                to="/contact"
                className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-navy-700 shadow-lg transition-transform hover:scale-[1.03]"
              >
                Start your project
              </Link>
              <Link
                to="/services"
                className="flex items-center gap-1.5 text-sm font-semibold text-white hover:text-teal-100"
              >
                Explore our services <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Tech stack marquee — two rows, opposite directions */}
      <section className="space-y-8 border-b border-navy-100 bg-white py-10">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-navy-400">
          Powered by a modern, proven engineering stack
        </p>
        <Marquee
          items={toMarqueeItems(techRow1)}
          itemClassName="px-8"
          separator={null}
          speed={30}
        />
        <Marquee
          items={toMarqueeItems(techRow2)}
          itemClassName="px-8"
          separator={null}
          speed={30}
          reverse
        />
      </section>

      <ServicesShowcase />
      <WhyCaelogix />
      <HowItWorks />

      {/* CTA banner */}
      <section className="bg-teal py-20">
        <div className="container-page flex flex-col items-center gap-6 text-center">
          <SectionReveal>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Let's build your next system, together
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-teal-50">
              Share the problem you're solving, and we'll give you a candid
              assessment of the right approach — AI-powered or otherwise.
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
