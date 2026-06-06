'use client';
import { motion } from 'framer-motion';

const SKILLS = [
  { icon: '📋', name: 'Audit & Assurance', desc: 'Statutory, concurrent, and internal audits under Ind AS, IFRS, and Companies Act 2013. Risk-based audit methodology.' },
  { icon: '🧾', name: 'Direct Taxation', desc: 'Income tax planning, filing (ITR-6, 3CD), transfer pricing, assessment, appeal, and litigation support across industries.' },
  { icon: '🏛️', name: 'GST & Indirect Tax', desc: 'GST compliance, advisory, ITC optimisation, departmental audit support, filing (GSTR-1/3B/9C), and appeals.' },
  { icon: '📊', name: 'Financial Reporting (Ind AS / IFRS)', desc: 'Ind AS 109, 116, 115 compliance, group consolidation, financial statement preparation, and disclosure reviews.' },
  { icon: '💎', name: 'Business Valuation', desc: 'DCF, NAV, EV/EBITDA, and comparable company analysis for M&A, fund-raising, and regulatory purposes.' },
  { icon: '🤝', name: 'Due Diligence', desc: 'Tax and financial due diligence for M&A transactions, identifying risks, structuring recommendations, and QoE reports.' },
  { icon: '⚙️', name: 'Excel & Tally · SAP · Python Basics', desc: 'Advanced Excel modelling, pivot tables, VBA macros, Tally ERP, SAP FICO basics, and Python for data tasks.' },
  { icon: '🌐', name: 'Corporate Law & Compliance', desc: 'Companies Act 2013, ROC filings, board resolutions, FEMA, and secretarial compliance advisory.' },
  { icon: '📐', name: 'Financial Planning & Analysis', desc: 'Budgeting, forecasting, variance analysis, MIS reporting, and management dashboards for strategic decision-making.' },
];

export default function SkillsSection() {
  return (
    <section id="skills">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7 }}
      >
        <div className="section-label">Skills & Expertise</div>
        <h2 className="section-title">What I Bring</h2>
      </motion.div>

      <div className="skills-grid">
        {SKILLS.map((s, i) => (
          <motion.div
            key={s.name}
            className="skill-card tilt-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.07 }}
          >
            <div className="card-shine" />
            <div className="skill-icon">{s.icon}</div>
            <div className="skill-name">{s.name}</div>
            <div className="skill-desc">{s.desc}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
