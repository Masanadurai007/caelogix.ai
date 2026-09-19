import { services } from "./services.js";

export const servicesMenu = services.map((s) => ({
  name: s.name,
  href: "/services",
  description: s.short,
}));

// NOTE: /careers and /consulting pages don't exist yet in this project —
// both point to /contact for now so the links aren't broken.
export const companyMenu = [
  {
    name: "About Us",
    href: "/about",
    description: "Our mission, values, and team.",
  },
];

export const navLinks = [
  { label: "Company", to: "/about", menu: "company" },
  { label: "Services", to: "/services", menu: "services" },
  { label: "Contact", to: "/contact" }, // no menu key = plain link, no dropdown
];

// WhatsApp number: 9361977522 (India, +91)
export const WHATSAPP_URL = `https://wa.me/919361977522?text=${encodeURIComponent(
  "Hi Caelogix Team, I'd like to get a quote for a project.",
)}`;
