'use client';
import { motion } from 'framer-motion';

const EDU = [
  {
    level: 'Professional · ICAI',
    degree: 'Chartered Accountant',
    institute: 'Institute of Chartered Accountants of India',
    period: 'Jan 2020 – May 2025',
    desc: 'All three levels cleared Finance, Audit, Tax, Law, and Strategic Management. CPA-equivalent — internationally recognised qualification.',
    tags: ['Foundation: 58%', 'Inter: 57%', 'Final: 56%', '3 Exemptions'],
  },
  {
    level: 'Graduate',
    degree: 'B.Com — Accounting & Finance',
    institute: 'Gujarat University, Ahmedabad',
    period: 'Jul 2019 – Oct 2022',
    desc: 'Accounting, Economics, Business Law, Corporate Finance and Strategic Management. Ran parallel to CA articleship with consistent academic performance.',
    tags: ['GPA: 7.8/10', 'Distinction'],
  },
  {
    level: 'Higher Secondary',
    degree: 'Class XII — Commerce',
    institute: 'Gujarat Secondary & Higher Secondary Board',
    period: '2017 – 2019',
    desc: 'Commerce stream with Accountancy, Economics, and Business Studies. Strong academic foundation that led to pursuing CA.',
    tags: ['95%', 'School Topper'],
  },
];

export default function EducationSection() {
  return (
    <section id="edu">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7 }}
      >
        <div className="section-label">Education</div>
        <h2 className="section-title">Academic Foundation</h2>
      </motion.div>

      <div className="edu-grid">
        {EDU.map((e, i) => (
          <motion.div
            key={e.degree}
            className="edu-card tilt-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <div className="card-shine" />
            <div className="edu-level">{e.level}</div>
            <div className="edu-degree">{e.degree}</div>
            <div className="edu-institute">{e.institute}</div>
            <div className="edu-period">{e.period}</div>
            <div className="edu-desc" dangerouslySetInnerHTML={{ __html: e.desc }} />
            <div className="edu-tags">
              {e.tags.map(t => <span key={t} className="edu-tag">{t}</span>)}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
