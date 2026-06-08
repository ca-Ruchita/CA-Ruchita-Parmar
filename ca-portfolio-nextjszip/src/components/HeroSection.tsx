"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const ROLES = [
  "Audit & Assurance",
  "Direct & Indirect Taxation",
  "Financial Reporting",
  "GST Compliance",
  "Corporate Finance",
  "IFRS & Ind AS",
  "Business Advisory",
];

interface Props {
  onSchedule?: () => void;
}

export default function HeroSection({ onSchedule }: Props) {
  const orbsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const px = e.clientX / window.innerWidth - 0.5;
      const py = e.clientY / window.innerHeight - 0.5;
      const orbs = document.querySelectorAll<HTMLElement>(".hero-orb");
      orbs.forEach((orb, i) => {
        const f = (i + 1) * 20;
        orb.style.transform = `translate(${px * f}px, ${py * f}px)`;
      });
    };
    document.addEventListener("mousemove", onMove);
    return () => document.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    let idx = 0;
    const id = setInterval(() => {
      idx = (idx + 1) % ROLES.length;
      document.querySelectorAll<HTMLElement>(".role-tag").forEach((tag, i) => {
        tag.classList.toggle("active", i === idx);
      });
    }, 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="hero">
      <div className="hero-bg" ref={orbsRef}>
        <div className="hero-grid" />
        <div className="hero-orb o1" />
        <div className="hero-orb o2" />
        <div className="hero-orb o3" />
      </div>

      <div className="hero-inner">
        {/* ── Left: text ── */}
        <div className="hero-content">
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <span>Chartered Accountant · India</span>
          </motion.div>

          <motion.h1
            className="hero-name"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28 }}
          >
            <span>CA RUCHITA</span>
            <span className="accent-line">PARMAR</span>
          </motion.h1>

          <motion.div
            className="hero-roles"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.42 }}
          >
            {ROLES.map((r) => (
              <span key={r} className="role-tag">
                {r}
              </span>
            ))}
          </motion.div>

          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
          >
            <a
              href="#contact"
              className="btn-primary magnetic ripple-container"
            >
              Get in Touch
            </a>
            <a href="#tools" className="btn-secondary magnetic">
              Finance Tools
            </a>
            {onSchedule && (
              <button
                className="btn-schedule magnetic"
                onClick={onSchedule}
                style={{ cursor: "none" }}
              >
                📅 Book a Call
              </button>
            )}
            <a href="#" className="cta-link">
              LinkedIn ↗
            </a>
            <a
              href="https://drive.google.com/file/d/1qTohW0Pvc_yizuYEEwQnPvD0y5kuR9UQ/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-link"
            >
              Download CV ↗
            </a>
          </motion.div>
        </div>

        {/* ── Right: profile photo ── */}
        <motion.div
          className="hero-photo-wrap"
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.35, ease: "easeOut" }}
        >
          {/* Swirling neon glow rings */}
          <div className="photo-ring r1" />
          <div className="photo-ring r2" />
          <div className="photo-ring r3" />
          {/* Ambient blobs */}
          <div className="photo-blob b1" />
          <div className="photo-blob b2" />
          <div className="photo-blob b3" />
          {/* The photo */}
          <div className="hero-photo-frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/profile.jpg"
              alt="CA Ruchita Parmar"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
                display: "block",
              }}
            />
          </div>
          {/* Floating credential card */}
          <motion.div
            className="photo-card"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="photo-card-icon">🏅</span>
            <div>
              <div className="photo-card-title">Chartered Accountant</div>
              <div className="photo-card-sub">ICAI · India</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
      >
        <span>Scroll</span>
        <div className="scroll-line" />
      </motion.div>
    </section>
  );
}
