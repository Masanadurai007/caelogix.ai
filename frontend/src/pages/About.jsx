import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import SectionReveal from "../components/SectionReveal.jsx";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: "5+", label: "Projects completed" },
  { value: "5", label: "Core services offered" },
  { value: "Chennai", label: "India-based team" },
  { value: "<48h", label: "Typical response time" },
];

export default function About() {
  return (
    <>
      {/* Hero with image */}
      <section className="border-b border-navy-100 bg-white py-20">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
          <SectionReveal>
            <p className="eyebrow">About Caelogix</p>
            <h1 className="mt-3 text-4xl font-extrabold leading-[1.1] tracking-tight text-navy-800 sm:text-5xl">
              We build the AI systems we'd want to depend on ourselves.
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-navy-500">
              Caelogix is a Chennai-based software and AI engineering studio. We
              design, build, and ship chatbots, web platforms, and agentic AI
              systems for teams that need software they can actually run their
              business on.
            </p>
            <div className="mt-8">
              <Link to="/contact" className="btn-pill">
                Work with us <ArrowRight size={16} />
              </Link>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1} className="relative">
            <AboutHeroVideo />
          </SectionReveal>
        </div>
      </section>

      {/* Trust stats — huge numerals, no icons */}
      <section className="relative overflow-hidden border-b border-navy-100 bg-navy-800 py-20">
        <div className="pointer-events-none absolute inset-0 bg-grid-pattern bg-[length:40px_40px] opacity-[0.06]" />
        <div className="container-page relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {stats.map((stat, i) => (
            <SectionReveal
              key={stat.label}
              delay={i * 0.08}
              className="relative"
            >
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl"
              >
                {stat.value}
              </motion.p>
              <div className="mt-3 h-0.5 w-10 bg-teal" />
              <p className="mt-3 text-sm font-medium uppercase tracking-wide text-navy-300">
                {stat.label}
              </p>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* Mission / vision */}
      <section className="py-24">
        <div className="container-page grid gap-16 sm:grid-cols-2">
          <SectionReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal">
              Mission
            </p>
            <h2 className="mt-3 text-2xl font-bold text-navy-800 sm:text-3xl">
              Software that holds up under real usage.
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-navy-500">
              To help teams ship AI-powered software that holds up under real
              usage — measured in resolved tickets and shipped features, not
              demo applause.
            </p>
          </SectionReveal>
          <SectionReveal delay={0.08}>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal">
              Vision
            </p>
            <h2 className="mt-3 text-2xl font-bold text-navy-800 sm:text-3xl">
              AI treated with real engineering rigor.
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-navy-500">
              A future where AI systems are treated with the same engineering
              rigor as any other production software — tested, monitored, and
              accountable.
            </p>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}

function AboutHeroVideo() {
  const videoRef = useRef(null);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      // Slow, cinematic feel — tune this value (0.4–0.6 range works well)
      videoRef.current.playbackRate = 0.4;
    }
  }, []);

  if (videoError) {
    return <div className="aspect-[6/5] w-full bg-transparent" />;
  }

  return (
    // No border, no background, no rounded card — video sits directly on the page
    <div className="aspect-[6/5] w-full bg-transparent">
      <video
        ref={videoRef}
        poster="/about-hero.jpg"
        autoPlay
        muted
        loop
        playsInline
        onError={() => setVideoError(true)}
        className="h-full w-full object-contain bg-transparent"
      >
        {/* If you have an alpha-channel WebM, put it first — browsers use the first source they can play */}
        {/* <source src="/about-hero.webm" type="video/webm" /> */}
        <source src="/about-hero.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
