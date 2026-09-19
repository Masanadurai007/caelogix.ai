import Marquee from "./Marquee.jsx";

const announcements = [
  "Free 30-minute AI strategy call for new clients",
  "10+ production systems shipped",
  "Chatbots, web platforms & agentic AI",
  "Full-stack team — no handoffs, no delays",
];

export default function TopBar() {
  return (
    <div className="bg-teal py-2 text-white">
      <Marquee
        items={announcements}
        itemClassName="px-4 text-xs font-medium tracking-wide sm:text-sm"
        separator="✦"
      />
    </div>
  );
}
