"use client";
import { motion } from "framer-motion";

export default function ContentSection() {
  return (
    <section id="cont" style={{ background: "var(--bg2)" }}>
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7 }}
      >
        <div className="section-label">Personal Brand</div>
        <h2 className="section-title">Content & Community</h2>
      </motion.div>

      <div className="cont-grid">
        <motion.div
          className="cont-card tilt-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="card-shine" />
          <div className="cont-platform">LinkedIn · Active · 5K+ Followers</div>
          <div className="cont-title">Finance, Tax & Career Insights</div>
          <div className="cont-desc">
            Sharing practical knowledge on GST updates, income tax planning,
            IFRS changes, audit best practices, and building a career in CA
            practice. Followed by CA aspirants, senior finance professionals,
            and CFOs across India.
          </div>
          <a
            href="https://www.linkedin.com/in/ca-ruchita/"
            className="cont-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit Profile →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
