"use client";
import { motion } from "framer-motion";

interface ExpEntry {
  period: string;
  badge: string;
  org: string;
  title: string;
  sub: string;
  items: string[];
}

const EXP: ExpEntry[] = [
  {
    period: "Sep 2025 – Present",
    badge: "Financial Analyst",
    org: "UBS",
    title: "Financial Analyst",
    sub: "Equity Capital Market · Pune · Investment Banking - Swiss Bank",
    items: [
      "Managed financial operations for <strong>30+ capital market deals</strong>, including IPOs, FPOs, PIPE transactions, Rights Issues, and Buybacks, driving the final settlement of 15+ major deals.",
      "Conducted advanced analytical reviews, variance analysis, and <strong>global debtors' ageing analysis</strong> for complex financial statements tied to investment banking products.",
      "Spearheaded the <strong>automation of multiple financial reports using Microsoft Co-pilot</strong> and robust control workflows, successfully saving over 2+ man-hours daily.",
      "Performed detailed <strong>MTM validation, trend analysis, P&L reporting, and T0/T1 reporting</strong> under IFRS 9 and IFRS 15 frameworks to prepare critical MIS reports for senior management.",
      " Prepare Analytical review and present among the Senior management and Investment Banking team.",
      "Collaborated seamlessly with <strong>onshore teams, risk management, and cross-functional,stakeholders</strong> to facilitate comprehensive deal reviews and resolve critical issues in a timely manner.",
    ],
  },
  {
    period: "May 2023 – Oct 2024",
    badge: "Finance Analyst",
    org: "UBS",
    title: "Finance Analyst – Capital Adequacy RWA Control",
    sub: "Risk & Capital Management · Pune · Investment Banking & Group Treasury",
    items: [
      "Operated at a <strong>global level across multiple business segments, including Investment Banking, Group Treasury, Wealth Management, and Asset Management.</strong>",
      "Performed rigorous <strong>RWA (Risk  weighted Assets) calculations</strong> for diverse asset classes using STSC and AIRB models in strict compliance with <strong>Basel III norms and FINMA regulatory frameworks</strong>.",
      "Executed comprehensive <strong>variance analysis for Equity Instruments and Securitization portfolios</strong>, presenting strategic risk insights and portfolio performance directly to senior management.",
      "Identified and monitored <strong>IFRS 9 transactions and Counterparty Credit Risk (CCR)</strong>, executing robust controls aligned with FINMA guidelines.",
      "Evaluated critical credit risk parameters, including <strong>Loss Given Default (LGD), Credit Conversion Factors (CCF), NSFR and Asset Value Correlation (AVC)</strong> to ensure capital adequacy precision.",
    ],
  },
  {
    period: "May 2025 – Sep 2025",
    badge: "Consultant",
    org: "CRISIL Limited (S&P Global Company)",
    title: "Consultant – Market Intelligence & Risk Solutions",
    sub: "Risk Advisory & Analytics · Mumbai · Global Credit Rating & Research Firm",
    items: [
      "Collaborated cross-functionally to design, implement, and optimize <strong>Early Warning Systems (EWS)</strong> for proactive corporate credit risk monitoring.",
      "Performed rigorous data validation, <strong>test case design, and functional testing</strong> to ensure the mathematical accuracy and reliability of EWS risk alerts and rule engines.",
      "Gathered complex client requirements through face-to-face (F2F) stakeholder meetings, developing customized <strong>risk triggers strictly aligned with RBI guidelines</strong>.",
      "Partnered with IT and engineering teams to deploy system enhancements and supported <strong>Basel III risk calculations</strong>, including IRRBB, NSFR, LGD, EAD, and CCF.",
    ],
  },
  {
    period: "Sep 2021 – May 2023",
    badge: "Articleship",
    org: "GY & Associates",
    title: "Chartered Accountant Article Assistant",
    sub: "Statutory Audit & Tax Advisory · Ahmedabad · Leading Regional CA Firm",
    items: [
      "Executed comprehensive <strong>Statutory Audits in the Manufacturing Industry</strong> for entities with turnovers up to ₹600 Crores (including Listed Companies), performing deep-dive financial statement analysis.",
      "Proficiently managed the preparation and filing of <strong>GST returns, complex tax planning strategies, and income tax return filings</strong> for a diverse client portfolio.",
      "Handled <strong>Financial Planning & Analysis (FP&A)</strong>, specializing in the end-to-end preparation and finalization of financial statements from scratch for regulatory compliance and financing requirements.",
      "Spearheaded diverse special projects, including <strong>loan calculations, project financing reports, regulatory compliance reviews, pre-audits, and custom advisory assignments</strong>.",
    ],
  },
];

export default function ExperienceSection() {
  return (
    <section id="exp">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7 }}
      >
        <div className="section-label">Experience</div>
        <h2 className="section-title">Where I've Built Things</h2>
      </motion.div>

      <div className="exp-list">
        {EXP.map((e, i) => (
          <motion.div
            key={e.title}
            className="exp-card tilt-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <div className="card-shine" />
            <div className="exp-meta">
              <span className="exp-period">{e.period}</span>
              <span className="exp-badge">{e.badge}</span>
              <span className="exp-org">{e.org}</span>
            </div>
            <div className="exp-body">
              <div className="exp-title">{e.title}</div>
              <div className="exp-sub">{e.sub}</div>
              <ul className="exp-list-items">
                {e.items.map((item, j) => (
                  <li key={j} dangerouslySetInnerHTML={{ __html: item }} />
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
