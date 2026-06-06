'use client';
import { motion } from 'framer-motion';

interface Tool { id: string; icon: string; name: string; desc: string; live: boolean; }

const TOOLS: Tool[] = [
  { id: 'tax', icon: '📊', name: 'Income Tax Calculator FY 25-26', desc: 'Old vs New Regime comparison with surcharge, cess, and relief u/s 87A. Optimise your tax liability instantly.', live: true },
  { id: 'gst', icon: '🧾', name: 'GST Calculator', desc: 'CGST + SGST or IGST with inclusive/exclusive modes, multi-rate comparison charts and instant invoice values.', live: true },
  { id: 'valuation', icon: '📉', name: 'Business Valuation Model', desc: 'DCF with WACC, terminal value, 5-year projections, sensitivity tables — built from real valuation work.', live: true },
  { id: 'calendar', icon: '📅', name: 'Compliance Calendar 2025-26', desc: 'Never miss a due date. GST, Income Tax, ROC, TDS — all compliance deadlines in one interactive calendar.', live: true },
  { id: 'itc', icon: '🔍', name: 'ITC Eligibility Checker', desc: 'Quick reference to determine GST Input Tax Credit eligibility for common business expenses under Section 17(5).', live: true },
  { id: 'audit', icon: '🏦', name: 'Audit Risk Assessment Tool', desc: 'Audit risk scoring, materiality calculation, and spider-chart visualisation based on industry benchmarks.', live: true },
];

interface Props {
  onOpen: (id: string) => void;
}

export default function ToolsSection({ onOpen }: Props) {
  return (
    <section id="tools">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7 }}
      >
        <div className="section-label">Finance Lab</div>
        <h2 className="section-title">Tools I've Built</h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: 600, marginTop: '0.75rem', fontSize: '0.95rem' }}>
          Finance professionals should also be builders. Click any tool to launch an interactive calculator with real-time charts and accurate data.
        </p>
      </motion.div>

      <div className="tools-grid">
        {TOOLS.map((t, i) => (
          <motion.button
            key={t.name}
            className={`tool-card tilt-card live`}
            onClick={() => onOpen(t.id)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            style={{ cursor: 'none', textAlign: 'left', background: 'none', border: 'none', width: '100%' }}
          >
            <div className="card-shine" />
            <div className="tool-top">
              <div className="tool-icon">{t.icon}</div>
              <span className={`tool-status live`}>Live ↗</span>
            </div>
            <div className="tool-name">{t.name}</div>
            <div className="tool-desc">{t.desc}</div>
            <div className="tool-open-hint">Click to open calculator →</div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
