import { services } from "../data/services.js";

// Per-node accent — kept inside a teal/navy-adjacent family rather than a
// full rainbow, so it stays recognizably "Caelogix" rather than a generic
// template palette.
const ACCENT = [
  { color: "#3FA9A7", glow: "rgba(63,169,167,.55)" },
  { color: "#4FB8E0", glow: "rgba(79,184,224,.55)" },
  { color: "#5B6EE8", glow: "rgba(91,110,232,.55)" },
  { color: "#B06EF2", glow: "rgba(176,110,242,.55)" },
  { color: "#E0A23F", glow: "rgba(224,162,63,.55)" },
];

const NOTES = {
  "chatbot-development": "Conversational AI",
  "web-development": "Modern web builds",
  "generative-ai-integration": "Smarter workflows",
  "agentic-ai-systems": "Autonomous execution",
  "ai-consulting": "Where it pays off",
};

const RADIUS_X = 34;
const RADIUS_Y = 37;

function nodePosition(i, total) {
  const angle = (-90 + i * (360 / total)) * (Math.PI / 180);
  return {
    x: 50 + RADIUS_X * Math.cos(angle),
    y: 50 + RADIUS_Y * Math.sin(angle),
  };
}

// Side matched to the actual pentagon geometry above (top, upper-right,
// lower-right, lower-left, upper-left) — not guessed from coordinates later.
const SIDE = ["bottom", "right", "right", "left", "left"];

function ServiceIcon({ service }) {
  return <service.icon size={30} />;
}

export default function OrbitBadges() {
  const total = services.length;

  return (
    <section className="cgx-stage relative px-6 pb-16 pt-14 sm:px-8">
      <style>{css}</style>

      <div className="cgx-orbit relative z-[1] mx-auto w-full max-w-[920px]">
        <svg
          className="cgx-rings pointer-events-none absolute inset-0 z-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <ellipse className="cgx-ring" cx="50" cy="50" rx="44" ry="41" />
          <ellipse
            className="cgx-ring cgx-spin"
            cx="50"
            cy="50"
            rx="30"
            ry="27"
          />
        </svg>

        <div className="cgx-hub">
          <div>
            <div className="cgx-mark">
              Caelo<em>gix</em>
            </div>
            <div className="cgx-role">5 core services</div>
          </div>
        </div>

        {services.map((service, i) => {
          const pos = nodePosition(i, total);
          const side = SIDE[i] ?? "bottom";
          const accent = ACCENT[i % ACCENT.length];

          return (
            <div
              key={service.slug}
              className={`cgx-node cgx-side-${side}`}
              style={{ left: `${pos.x}%`, top: `${pos.y}%`, "--i": i }}
            >
              <button
                type="button"
                className="cgx-badge"
                style={{ "--c": accent.color, "--cg": accent.glow }}
                aria-label={service.name}
              >
                <ServiceIcon service={service} />
                <span className="cgx-num">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </button>
              <div className="cgx-label">
                <b>{service.name}</b>
                <span>{NOTES[service.slug]}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

const css = `
.cgx-orbit{ aspect-ratio:16/11; position:relative; }

.cgx-ring{ fill:none; stroke:rgba(27,42,74,.16); stroke-width:.28; stroke-dasharray:.7 2.4; stroke-linecap:round; }
.cgx-spin{ transform-origin:50% 50%; animation:cgxSpin 90s linear infinite; }
@keyframes cgxSpin{ to{ transform:rotate(360deg); } }

.cgx-hub{
  position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);z-index:2;
  width:172px;height:172px;border-radius:50%;
  background:radial-gradient(circle at 40% 32%, #123049, #071522 72%);
  border:1px solid rgba(109,191,189,.28);
  box-shadow:0 20px 50px -18px rgba(4,12,22,.7), inset 0 0 34px rgba(63,169,167,.14);
  display:grid;place-items:center;text-align:center;
  animation:cgxHubIn .8s .1s both cubic-bezier(.22,1,.36,1);
}
@keyframes cgxHubIn{ from{opacity:0;transform:translate(-50%,-50%) scale(.85)} to{opacity:1;transform:translate(-50%,-50%) scale(1)} }
.cgx-mark{ font-size:22px;font-weight:800;letter-spacing:-.02em;color:#fff }
.cgx-mark em{ font-style:normal;color:#6DBFBD }
.cgx-role{ font-size:10.5px;color:rgba(234,244,246,.55);margin-top:5px;letter-spacing:.03em;text-transform:uppercase }

.cgx-node{
  position:absolute; transform:translate(-50%,-50%); z-index:3;
  display:flex; align-items:center; gap:12px;
  animation:cgxNodeIn .6s both cubic-bezier(.22,1,.36,1);
  animation-delay:calc(var(--i) * 90ms + 150ms);
}
@keyframes cgxNodeIn{ from{opacity:0;transform:translate(-50%,-50%) scale(.7)} to{opacity:1;transform:translate(-50%,-50%) scale(1)} }
.cgx-side-right{ flex-direction:row }
.cgx-side-left{ flex-direction:row-reverse }
.cgx-side-bottom{ flex-direction:column }

.cgx-badge{
  position:relative; width:76px; height:76px; border-radius:50%; flex:0 0 auto;
  background:radial-gradient(circle at 38% 32%, #17324a, #081522 74%);
  display:grid; place-items:center; cursor:pointer; padding:0;
  border:2px solid var(--c);
  color:var(--c);
  box-shadow:0 0 0 4px rgba(255,255,255,.02), 0 0 26px -4px var(--cg), 0 10px 20px -12px rgba(4,12,22,.8);
  animation:cgxFloat 5.5s ease-in-out infinite;
  animation-delay:calc(var(--i) * 260ms);
  transition:transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s;
}
@keyframes cgxFloat{ 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
.cgx-badge:hover, .cgx-badge:focus-visible{
  transform:translateY(-6px) scale(1.08);
  box-shadow:0 0 0 4px rgba(255,255,255,.04), 0 0 38px -2px var(--cg), 0 14px 26px -12px rgba(4,12,22,.85);
  outline:none;
}
.cgx-badge svg{ filter:drop-shadow(0 0 6px var(--cg)); }
.cgx-num{
  position:absolute; top:-6px; right:-6px; width:22px;height:22px;border-radius:50%;
  background:#0A1A2A; border:1.5px solid var(--c); color:#EAF4F6;
  font-size:10px; font-weight:700; display:grid; place-items:center;
}

.cgx-label{ min-width:0 }
.cgx-side-bottom .cgx-label{ text-align:center; margin-top:4px }
.cgx-side-left .cgx-label{ text-align:right }
.cgx-side-right .cgx-label{ text-align:left }
.cgx-label b{ display:block; font-size:14.5px; font-weight:700; color:#F3F8F9; white-space:nowrap; letter-spacing:-.01em }
.cgx-label span{ display:block; font-size:11px; color:rgba(234,244,246,.5); margin-top:2px; white-space:nowrap; letter-spacing:.02em; text-transform:uppercase }

@media (max-width:760px){
  .cgx-orbit{ aspect-ratio:auto }
  .cgx-rings{ display:none }
  .cgx-hub{ position:static; transform:none; margin:0 auto 28px; }
  @keyframes cgxHubIn{ from{opacity:0;transform:scale(.85)} to{opacity:1;transform:none} }
  .cgx-node{ position:static !important; transform:none !important; justify-content:flex-start !important; flex-direction:row !important; margin-bottom:16px; }
  @keyframes cgxNodeIn{ from{opacity:0;transform:translateX(-10px)} to{opacity:1;transform:none} }
  .cgx-label{ text-align:left !important }
  .cgx-label b, .cgx-label span{ white-space:normal }
}
@media (prefers-reduced-motion: reduce){
  .cgx-spin, .cgx-badge{ animation:none }
  .cgx-node{ animation:none; opacity:1 }
}
`;
