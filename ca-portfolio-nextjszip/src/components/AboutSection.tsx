"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

function RevealWrap({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const STATS = [
  { num: "4+", label: "Years in Finance" },
  {
    num: "CA",
    label: "comprehensive qualification across all three ICAI levels.",
  },
  { num: "200+", label: "Clients Served" },
];

const QUAL = [
  { title: "CA", sub: "All levels · 1st attempt" },
  { title: "GST", sub: "Advisory & Litigation" },
  { title: "ICAI", sub: "Member · Active" },
];

export default function AboutSection() {
  return (
    <section id="about">
      <RevealWrap className="section-header">
        <div className="section-label">About</div>
        <h2 className="section-title">The Story Behind the Numbers</h2>
      </RevealWrap>

      <div className="about-grid">
        <RevealWrap className="about-photo-wrap" delay={0.1}>
          <div className="about-photo tilt-card">
            <img
              src="/profile.jpg"
              alt="CA Ruchita Parmar"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
                display: "block",
                borderRadius: "inherit",
              }}
            />
            <div className="card-shine" />
          </div>
          <div className="about-deco" />
          <div className="stats-row">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                className="stat-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.3 }}
              >
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </RevealWrap>

        <RevealWrap className="about-text" delay={0.2}>
          <div className="section-label">The Story</div>
          <h3
            className="section-title"
            style={{ fontSize: "clamp(1.5rem,3vw,2.2rem)" }}
          >
            From Gujarat to Bridging Investment Banking, Credit Risk, and Elite
            Audit Rooms.
          </h3>
          <blockquote className="about-quote">
            "Excellence is not a skill, it is an attitude."
          </blockquote>
          <p>
            I grew up in Gujarat with a deep-rooted belief that precision and
            integrity are the foundations of great finance. Choosing to become a{" "}
            <strong>Chartered Accountant</strong> was a natural extension of
            that belief — backed by relentless effort and success across all
            three ICAI levels.
          </p>
          <p>
            During my{" "}
            <strong>articleship at GY & Associates and PJS & Co</strong>, I
            immersed myself in statutory audits and direct tax advisory across
            the manufacturing and retail sectors, project finance. I developed a
            sharp eye for financial statements and regulatory compliance from
            day one.
          </p>
          <p>
            Since qualification, I have handled{" "}
            <strong>
              end-to-end audit engagements, GST advisory, corporate tax
              planning, financial modelling, and IFRS-aligned reporting
            </strong>{" "}
            for clients ranging from mid-size enterprises to publicly listed
            entities. I generated <em>significant tax savings</em> through
            strategic planning and received commendations for meticulous audit
            quality.
          </p>
          <p>
            I am a{" "}
            <strong>
              CA with expertise Capital Market products, EWS Product, audit,
              taxation, IFRS, and corporate advisory
            </strong>
            . Analytically rigorous. Compliance-driven. Professionally proven.
            My approach combines technical depth with business acumen to deliver
            insights that go beyond numbers.
          </p>
          <div className="qual-badges">
            {QUAL.map((q, i) => (
              <motion.div
                key={q.title}
                className="qual-badge"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <span className="qb-title">{q.title}</span>
                <span className="qb-sub">{q.sub}</span>
              </motion.div>
            ))}
          </div>
        </RevealWrap>
      </div>
    </section>
  );
}
