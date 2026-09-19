import { useEffect, useRef, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import Logo from "./Logo.jsx";
import {
  navLinks,
  servicesMenu,
  companyMenu,
  WHATSAPP_URL,
} from "../data/navigations.js";

const CLOSE_DELAY = 150;

const PANEL_ALIGN = {
  company: "left-0",
  services: "left-0",
};

function DropdownPanel({ menuKey }) {
  const align = PANEL_ALIGN[menuKey] || "left-0";
  const items = menuKey === "services" ? servicesMenu : companyMenu;
  const width = menuKey === "services" ? "w-96" : "w-80";

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute top-full ${align} mt-2 ${width} overflow-hidden rounded-xl border border-navy-100 bg-white shadow-card-hover`}
      role="menu"
    >
      <div className="grid gap-0.5 p-2">
        {items.map((item) => (
          <Link
            key={item.href + item.name}
            to={item.href}
            role="menuitem"
            className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-navy-50"
          >
            {item.icon && (
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-teal-50 text-teal">
                <item.icon size={16} />
              </span>
            )}
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-navy-800">
                {item.name}
              </span>
              {item.description && (
                <span className="mt-0.5 block truncate text-xs text-navy-500">
                  {item.description}
                </span>
              )}
            </span>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const closeTimer = useRef(null);
  const navRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
    setMobileExpanded(null);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target))
        setOpenMenu(null);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openNow = (key) => {
    clearCloseTimer();
    setOpenMenu(key);
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpenMenu(null), CLOSE_DELAY);
  };

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors ${
        scrolled
          ? "border-navy-700 bg-navy-800/95 backdrop-blur-sm"
          : "border-navy-800 bg-navy-800"
      }`}
    >
      <nav
        ref={navRef}
        className="container-page flex h-16 items-center justify-between"
        aria-label="Primary"
      >
        <Link to="/" onClick={() => setMobileOpen(false)}>
          <Logo variant="light" />
        </Link>

        <div className="ml-auto hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) =>
              link.menu ? (
                <li
                  key={link.to}
                  className="relative"
                  onMouseEnter={() => openNow(link.menu)}
                  onMouseLeave={scheduleClose}
                >
                  <button
                    type="button"
                    className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-navy-100 transition-colors hover:text-white"
                    aria-haspopup="true"
                    aria-expanded={openMenu === link.menu}
                    onClick={() =>
                      setOpenMenu((cur) =>
                        cur === link.menu ? null : link.menu,
                      )
                    }
                  >
                    <NavLink
                      to={link.to}
                      onClick={(e) => e.stopPropagation()}
                      className={({ isActive }) =>
                        isActive ? "text-teal-300" : ""
                      }
                    >
                      {link.label}
                    </NavLink>
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${openMenu === link.menu ? "rotate-180" : ""}`}
                    />
                  </button>

                  <AnimatePresence>
                    {openMenu === link.menu && (
                      <DropdownPanel menuKey={link.menu} />
                    )}
                  </AnimatePresence>
                </li>
              ) : (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? "text-teal-300"
                          : "text-navy-100 hover:text-white"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ),
            )}
          </ul>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary shrink-0"
          >
            Get a Quote
          </a>
        </div>

        <button
          className="ml-auto inline-flex items-center justify-center rounded-md p-2 text-white md:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-navy-700 bg-navy-800 md:hidden">
          <ul className="container-page flex flex-col gap-1 py-3">
            {navLinks.map((link) => {
              if (!link.menu) {
                return (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `block rounded-md px-3 py-2.5 text-sm font-medium ${
                          isActive
                            ? "bg-navy-700 text-teal-300"
                            : "text-navy-100 hover:bg-navy-700"
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </li>
                );
              }

              const isExpanded = mobileExpanded === link.menu;
              const items =
                link.menu === "services" ? servicesMenu : companyMenu;

              return (
                <li key={link.to}>
                  <div className="flex items-center justify-between">
                    <NavLink
                      to={link.to}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `block flex-1 rounded-md px-3 py-2.5 text-sm font-medium ${
                          isActive
                            ? "bg-navy-700 text-teal-300"
                            : "text-navy-100 hover:bg-navy-700"
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                    <button
                      type="button"
                      onClick={() =>
                        setMobileExpanded(isExpanded ? null : link.menu)
                      }
                      aria-label={`Toggle ${link.label} submenu`}
                      aria-expanded={isExpanded}
                      className="p-2.5 text-navy-300"
                    >
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      />
                    </button>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        className="overflow-hidden pl-3"
                      >
                        {items.map((item) => (
                          <li key={item.href + item.name}>
                            <Link
                              to={item.href}
                              onClick={() => setMobileOpen(false)}
                              className="block rounded-md px-3 py-2 text-sm text-navy-300 hover:bg-navy-700 hover:text-white"
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}

            <li className="pt-2">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full"
              >
                Get a Quote
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
