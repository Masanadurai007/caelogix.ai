import { useState } from "react";
import { Link } from "react-router-dom";
import { Linkedin, Instagram, Facebook, Mail } from "lucide-react";
import Logo from "./Logo.jsx";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="border-t border-navy-100 bg-navy-800 text-navy-100">
      <div className="container-page grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="[&_span]:text-white">
            <Logo />
          </div>
          <p className="mt-4 max-w-xs text-sm text-navy-200">
            Chatbots, web platforms, and agentic AI systems, engineered for
            production from the first line of code.
          </p>
          <a
            href="mailto:info@caelogix.in"
            className="mt-4 flex items-center gap-2 text-sm text-navy-200 hover:text-teal-300"
          >
            <Mail size={16} />
            info@caelogix.in
          </a>
          <div className="mt-6 flex gap-4">
            <a
              href="https://www.linkedin.com/company/caelogix-ai/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-navy-200 hover:text-teal-300"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://www.instagram.com/caelogix.ai?stkn=bm9vcGJiNXN2aDR3"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-navy-200 hover:text-teal-300"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61594591494139"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-navy-200 hover:text-teal-300"
            >
              <Facebook size={18} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Company</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <Link to="/about" className="hover:text-teal-300">
                About
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-teal-300">
                Services
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Services</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <Link
                to="/services/chatbot-development"
                className="hover:text-teal-300"
              >
                Chatbot Development
              </Link>
            </li>
            <li>
              <Link
                to="/services/web-development"
                className="hover:text-teal-300"
              >
                Web Development
              </Link>
            </li>
            <li>
              <Link
                to="/services/generative-ai-integration"
                className="hover:text-teal-300"
              >
                Generative AI Integration
              </Link>
            </li>
            <li>
              <Link
                to="/services/agentic-ai-systems"
                className="hover:text-teal-300"
              >
                Agentic AI Systems
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Stay updated</h3>
          <p className="mt-4 text-sm text-navy-200">
            Occasional notes on shipping AI systems in production. No noise.
          </p>
          {subscribed ? (
            <p className="mt-3 text-sm font-medium text-teal-300">
              You're subscribed — thank you.
            </p>
          ) : (
            <form onSubmit={handleSubscribe} className="mt-3 flex gap-2">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full min-w-0 rounded-md border border-navy-600 bg-navy-700 px-3 py-2 text-sm text-white placeholder-navy-300 focus:border-teal-400"
              />
              <button
                type="submit"
                className="shrink-0 rounded-md bg-teal px-4 py-2 text-sm font-semibold text-white hover:bg-teal-600"
              >
                Join
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="border-t border-navy-700">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-xs text-navy-300 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} Caelogix, Inc. All rights
            reserved.
          </p>
          <div className="flex gap-4">
            <Link to="/contact" className="hover:text-teal-300">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
