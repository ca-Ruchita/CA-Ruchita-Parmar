'use client';
import { motion } from 'framer-motion';

const ACHS = [
  { icon: '🎤', title: 'Winner CA MCA Program, Ahmedabad', desc: 'Team Presentation "Gender Equality" at ICAI Regional bacth, audience of 40+ professionals.' },
  { icon: '🌐', title: '5K+ LinkedIn Finance Network', desc: 'Built a growing community of CA aspirants, finance professionals' },
  { icon: '💡', title: 'Rs.35L+ Tax Savings for Clients', desc: 'Generated cumulative indirect tax savings through ITC optimisation and strategic GST structuring for mid-market clients.' },
  { icon: '🤖', title: 'Tech & AI in Finance', desc: 'Actively applying AI tools, audit analytics, and automation in day-to-day finance and compliance workflows to drive efficiency.' },
];

export default function AchievementsSection() {
  return (
    <section id="achievements" style={{ background: 'var(--bg)' }}>
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7 }}
      >
        <div className="section-label">Beyond the Desk</div>
        <h2 className="section-title">Achievements & Impact</h2>
      </motion.div>

      <div className="ach-grid">
        {ACHS.map((a, i) => (
          <motion.div
            key={a.title}
            className="ach-card tilt-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
          >
            <div className="card-shine" />
            <div className="ach-icon">{a.icon}</div>
            <div className="ach-title">{a.title}</div>
            <div className="ach-desc">{a.desc}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
