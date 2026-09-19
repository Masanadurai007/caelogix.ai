import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { services } from "../data/services.js";

const NOTES = {
  "chatbot-development":
    "Assistants that hold context, answer in your voice, and hand off cleanly to a human when they should.",
  "web-development":
    "Fast, accessible sites and web apps built to be maintained for years, not rebuilt every one.",
  "generative-ai-integration":
    "Drafting, summarising, and classification wired directly into the tools your team already uses.",
  "agentic-ai-systems":
    "Systems that plan a multi-step task, run it, and report back on what they did.",
  "ai-consulting":
    "An honest read on where AI pays off in your business — and where it doesn't, yet.",
};

export default function Hero() {
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <section className="cgx-hero relative overflow-hidden">
      <style>{css}</style>

      {/* Decorative globe/network graphic — infinite, non-interactive motion */}
      <svg
        className="cgx-globe pointer-events-none absolute"
        viewBox="0 0 400 400"
        aria-hidden="true"
      >
        <g className="cgx-globe-spin">
          <circle cx="200" cy="200" r="170" className="cgx-globe-line" />
          <ellipse
            cx="200"
            cy="200"
            rx="170"
            ry="60"
            className="cgx-globe-line"
          />
          <ellipse
            cx="200"
            cy="200"
            rx="170"
            ry="110"
            className="cgx-globe-line"
          />
          <ellipse
            cx="200"
            cy="200"
            rx="60"
            ry="170"
            className="cgx-globe-line"
          />
          <ellipse
            cx="200"
            cy="200"
            rx="110"
            ry="170"
            className="cgx-globe-line"
          />
        </g>
        {[
          [90, 120],
          [300, 150],
          [230, 320],
          [130, 300],
          [260, 90],
        ].map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r="3.5"
            className="cgx-node"
            style={{ animationDelay: `${i * 0.7}s` }}
          />
        ))}
      </svg>

      <div className="container-page relative z-10 flex flex-col items-center gap-6 pb-24 pt-24 text-center sm:pt-28">
        <p className="cgx-eyebrow">AI & Web Engineering Studio</p>

        <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
          We build websites &amp; <span className="cgx-accent">AI systems</span>
          <br className="hidden sm:block" /> that grow your business.
        </h1>

        <p className="max-w-xl text-lg leading-relaxed text-white/70">
          Custom chatbots, agentic workflows, and production web platforms —
          designed, built, and shipped by a team that stays on for support.
        </p>

        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <Link to="/contact" className="cgx-btn-primary">
            Let's talk <ArrowRight size={16} />
          </Link>
          <Link to="/services" className="cgx-btn-secondary">
            See our services
          </Link>
        </div>

        <div className="cgx-divider mt-10 w-full max-w-3xl" />

        <div
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
          role="tablist"
          aria-label="Our services"
        >
          {services.map((service, i) => (
            <button
              key={service.slug}
              role="tab"
              aria-selected={active === i}
              onClick={() => setActive(i)}
              className={`cgx-tab ${active === i ? "cgx-tab-active" : ""}`}
            >
              {service.name}
            </button>
          ))}
        </div>

        <div className="mt-2 max-w-xl">
          <p className="text-white/70">{NOTES[current.slug]}</p>
          <Link
            to={`/services#${current.slug}`}
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-200 hover:text-white"
          >
            <span className="cgx-dot" />
            Explore {current.name}
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

const css = `
.cgx-hero{
  background:
    radial-gradient(120% 90% at 75% 0%, rgba(63,169,167,.18) 0%, transparent 55%),
    linear-gradient(170deg, #061225 0%, #0A2140 55%, #0F3055 100%);
}
/* fade the bottom edge into the page's own background so the next section
   doesn't show a hard seam */
.cgx-hero::after{
  content:""; position:absolute; inset:auto 0 0 0; height:140px; z-index:2;
  background:linear-gradient(to bottom, transparent, #ffffff);
  pointer-events:none;
}

.cgx-globe{
  right:-8%; top:6%; width:560px; height:560px; opacity:.5; z-index:0;
}
.cgx-globe-line{ fill:none; stroke:rgba(255,255,255,.22); stroke-width:1; }
.cgx-globe-spin{ transform-origin:200px 200px; animation:cgxGlobeSpin 70s linear infinite; }
@keyframes cgxGlobeSpin{ to{ transform:rotate(360deg); } }
.cgx-node{
  fill:#6DBFBD; opacity:0; animation:cgxNodePulse 3.5s ease-in-out infinite;
}
@keyframes cgxNodePulse{
  0%,100%{ opacity:0; transform:scale(.6); }
  50%{ opacity:1; transform:scale(1); }
}

.cgx-eyebrow{
  font-size:12px; font-weight:600; letter-spacing:.14em; text-transform:uppercase;
  color:rgba(255,255,255,.6);
}
.cgx-accent{ color:#6DBFBD; }

.cgx-btn-primary{
  display:inline-flex; align-items:center; gap:8px;
  background:#fff; color:#0A2140; font-weight:600; font-size:14px;
  padding:12px 22px; border-radius:999px; transition:transform .2s;
}
.cgx-btn-primary:hover{ transform:scale(1.03); }
.cgx-btn-secondary{
  display:inline-flex; align-items:center; gap:8px;
  background:rgba(255,255,255,.08); color:#fff; font-weight:600; font-size:14px;
  padding:12px 22px; border-radius:999px; border:1px solid rgba(255,255,255,.25);
  transition:background .2s;
}
.cgx-btn-secondary:hover{ background:rgba(255,255,255,.16); }

.cgx-divider{ height:1px; background:rgba(255,255,255,.14); }

.cgx-tab{
  font-size:14px; font-weight:600; color:rgba(255,255,255,.55);
  padding-bottom:6px; border-bottom:2px solid transparent; transition:color .2s, border-color .2s;
}
.cgx-tab:hover{ color:rgba(255,255,255,.85); }
.cgx-tab-active{ color:#fff; border-color:#6DBFBD; }

.cgx-dot{
  display:inline-block; width:7px; height:7px; border-radius:999px; background:#3FA9A7;
}

@media (prefers-reduced-motion: reduce){
  .cgx-globe-spin, .cgx-node{ animation:none; opacity:.35; }
}
`;
