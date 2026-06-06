"use client";
import { motion } from "framer-motion";
import { useState, FormEvent } from "react";

interface Props {
  onSchedule: () => void;
}

export default function ContactSection({ onSchedule }: Props) {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    regarding: "Statutory Audit Engagement",
    message: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.firstName || !form.email || !form.message) return;
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setForm({
          firstName: "",
          lastName: "",
          email: "",
          regarding: "Statutory Audit Engagement",
          message: "",
        });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Failed to send. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  };

  return (
    <section id="contact" style={{ background: "var(--bg)" }}>
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7 }}
      >
        <div className="section-label">Contact</div>
        <h2 className="section-title">Let's Connect</h2>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{
          color: "var(--text-muted)",
          maxWidth: 580,
          marginBottom: "3rem",
          fontSize: "0.95rem",
        }}
      >
        Open to conversations about audit & assurance roles, tax advisory
        engagements, business valuation projects, and CA exam guidance. CFOs,
        founders, fellow CAs, and students are all welcome.
      </motion.p>

      <div className="contact-grid">
        <motion.div
          className="contact-info"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="contact-item">
            <span className="contact-label">Email</span>
            <a href="mailto:caruchita2002@gmail.com" className="contact-val">
              caruchita2002@gmail.com
            </a>
          </div>
          <div className="contact-item">
            <span className="contact-label">Phone · India</span>
            <a href="tel:+919328571796" className="contact-val">
              +91 9328571796
            </a>
            <span className="contact-sub">WhatsApp & Calls</span>
          </div>
          <div className="contact-item">
            <span className="contact-label">Location</span>
            <span className="contact-val">Ahmedabad, Gujarat · India</span>
            <span className="contact-sub">
              Open to remote & pan-India engagements
            </span>
          </div>
          <div className="contact-item">
            <span className="contact-label">LinkedIn</span>
            <a
              href="https://www.linkedin.com/in/ca-ruchita/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-val"
            >
              linkedin.com/in/ca-ruchita
            </a>
          </div>

          <button
            className="sched-trigger-card magnetic ripple-container"
            onClick={onSchedule}
          >
            <div className="stc-icon">📅</div>
            <div className="stc-text">
              <div className="stc-title">Book a Free 30-min Call</div>
              <div className="stc-sub">
                Pick a slot · Calendly · Confirmation sent to your email
              </div>
            </div>
            <div className="stc-arrow">→</div>
          </button>
        </motion.div>

        <motion.form
          className="contact-form"
          id="contact-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">First Name *</label>
              <input
                className="form-input"
                type="text"
                placeholder="Ruchita"
                value={form.firstName}
                onChange={(e) =>
                  setForm((f) => ({ ...f, firstName: e.target.value }))
                }
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Last Name</label>
              <input
                className="form-input"
                type="text"
                placeholder="Parmar"
                value={form.lastName}
                onChange={(e) =>
                  setForm((f) => ({ ...f, lastName: e.target.value }))
                }
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Email *</label>
            <input
              className="form-input"
              type="email"
              placeholder="caruchita2002@gmail.com"
              value={form.email}
              onChange={(e) =>
                setForm((f) => ({ ...f, email: e.target.value }))
              }
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Regarding</label>
            <select
              className="form-select"
              value={form.regarding}
              onChange={(e) =>
                setForm((f) => ({ ...f, regarding: e.target.value }))
              }
            >
              <option>Statutory Audit Engagement</option>
              <option>GST Advisory / Compliance</option>
              <option>Income Tax Planning</option>
              <option>Business Valuation</option>
              <option>Due Diligence</option>
              <option>Finance Career Guidance</option>
              <option>CA Exam Mentorship</option>
              <option>Other</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Message *</label>
            <textarea
              className="form-textarea"
              placeholder="Tell me about your requirement…"
              value={form.message}
              onChange={(e) =>
                setForm((f) => ({ ...f, message: e.target.value }))
              }
              required
            />
          </div>

          {status === "error" && (
            <div className="form-error-msg">
              {errorMsg}{" "}
              <a
                href="mailto:caruchita2002@gmail.com"
                style={{ color: "var(--accent)", textDecoration: "underline" }}
              >
                Email directly →
              </a>
            </div>
          )}

          <button
            type="submit"
            className="form-submit magnetic ripple-container"
            disabled={status === "loading"}
            style={
              status === "success"
                ? { background: "#2db88a" }
                : status === "error"
                  ? { background: "#e05580" }
                  : {}
            }
          >
            {status === "loading"
              ? "Sending…"
              : status === "success"
                ? "✓ Sent! I'll be in touch soon."
                : status === "error"
                  ? "✕ Failed — click 'Email directly' above"
                  : "Send Message ↗"}
          </button>

          {status === "success" && (
            <p className="form-smtp-note">
              ✅ Message delivered securely — you&apos;ll receive a confirmation
              email
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
