"use client";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "exp", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "certs", label: "Certs" },
  { id: "edu", label: "Education" },
  { id: "tools", label: "Finance Lab" },
  { id: "cont", label: "Content" },
];

interface Props {
  onSchedule: () => void;
}

export default function Navbar({ onSchedule }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const sections = document.querySelectorAll<HTMLElement>("section[id]");
      let current = "";
      sections.forEach((s) => {
        const rect = s.getBoundingClientRect();
        if (rect.top <= 100) current = s.id;
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const toggleMode = () => {
    const newMode = isDark ? "light" : "dark";
    document.documentElement.dataset.theme = newMode;
    setIsDark(!isDark);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav id="navbar" className={scrolled ? "scrolled" : ""}>
        <a href="#hero" className="nav-logo">
          CA Ruchita Parmar
        </a>

        <ul className="nav-links">
          {NAV_LINKS.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={activeSection === id ? "nav-active" : ""}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <button
            className="theme-btn"
            onClick={toggleMode}
            aria-label="Toggle theme"
          >
            {isDark ? "☀️" : "🌙"}
          </button>
          <button className="btn-schedule magnetic" onClick={onSchedule}>
            📅 Book a Call
          </button>
          <a href="#contact" className="btn-primary magnetic">
            Contact Me
          </a>
          <button
            className={`hamburger${menuOpen ? " open" : ""}`}
            aria-label="Open menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Full-screen mobile menu — z-index 1000, above navbar */}
      <div id="mobile-menu" className={menuOpen ? "open" : ""}>
        {/* Own header row — no bleed-through from navbar */}
        <div className="mm-header">
          <span className="mm-logo">CA Ruchita Parmar</span>
          <button
            className="mm-close"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* Nav links */}
        <div className="mm-links">
          {[...NAV_LINKS, { id: "contact", label: "Contact" }].map(
            ({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className="mm-link"
                onClick={closeMenu}
              >
                {label}
              </a>
            ),
          )}
        </div>

        <button
          className="mm-book-btn"
          onClick={() => {
            onSchedule();
            closeMenu();
          }}
        >
          📅 Book a Free Call
        </button>
      </div>
    </>
  );
}
