'use client';
import { motion } from 'framer-motion';

const CERTS = [
  { 
    icon: '🎓', 
    issuer: 'ICAI', 
    name: 'Chartered Accountant — ACA', 
    desc: 'Comprehensive qualification across all three ICAI levels. Expertise in finance, audit, taxation, law, and strategic management.', 
    score: '★ Fully Qualified' 
  },
  { 
    icon: '📊', 
    issuer: 'Tally Solutions', 
    name: 'Tally Certification', 
    desc: 'Advanced proficiency in computerized accounting, inventory management, taxation compliance, and financial reporting.', 
    score: '★ Certified' 
  },
  { 
    icon: '💻', 
    issuer: 'NIELIT / Government Bodies', 
    name: 'CCC Certification (Course on Computer Concepts)', 
    desc: 'Demonstrated mastery of essential IT tools, business data operations, and digital workplace efficiency.', 
    score: '★ Certified' 
  },
];

export default function CertsSection() {
  return (
    <section id="certs">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7 }}
      >
        <div className="section-label">Certifications</div>
        <h2 className="section-title">Verified Credentials</h2>
      </motion.div>

      <div className="certs-grid">
        {CERTS.map((c, i) => (
          <motion.div
            key={c.name}
            className="cert-card tilt-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
          >
            <div className="card-shine" />
            <div className="cert-icon">{c.icon}</div>
            <div className="cert-issuer">{c.issuer}</div>
            <div className="cert-name">{c.name}</div>
            <div className="cert-desc">{c.desc}</div>
            {c.score && <div className="cert-score">{c.score}</div>}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
