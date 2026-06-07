'use client';
import { useState, useEffect } from 'react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface Factor { key: string; label: string; max: number; desc: string; }

const FACTORS: Factor[] = [
  { key: 'size', label: 'Entity Size', max: 10, desc: 'Revenue / total assets magnitude' },
  { key: 'complexity', label: 'Transaction Complexity', max: 10, desc: 'Related party, forex, derivatives' },
  { key: 'control', label: 'Internal Controls', max: 10, desc: 'Strength of existing controls' },
  { key: 'mgmt', label: 'Management Integrity', max: 10, desc: 'Governance & track record' },
  { key: 'industry', label: 'Industry Risk', max: 10, desc: 'Sector regulatory / volatility risk' },
  { key: 'change', label: 'Significant Changes', max: 10, desc: 'New systems, M&A, key personnel change' },
];

const MATERIALITY_BASIS = [
  { label: 'Revenue', pct: 1 },
  { label: 'Gross Profit', pct: 2 },
  { label: 'Total Assets', pct: 0.5 },
  { label: 'Net Income', pct: 5 },
];

function getRiskLevel(score: number): { level: string; color: string; desc: string } {
  if (score <= 30) return { level: 'LOW', color: '#2db88a', desc: 'Risk is manageable. Standard audit procedures apply.' };
  if (score <= 55) return { level: 'MEDIUM', color: 'var(--accent)', desc: 'Moderate risk identified. Extend substantive testing.' };
  if (score <= 75) return { level: 'HIGH', color: '#e09870', desc: 'High risk areas. Significant audit attention required.' };
  return { level: 'CRITICAL', color: '#e05580', desc: 'Critical risk. Consider qualified opinion / specialists.' };
}

export default function AuditRisk() {
  const [scores, setScores] = useState<Record<string, number>>({ size: 5, complexity: 4, control: 3, mgmt: 3, industry: 4, change: 3 });
  const [basis, setBasis] = useState(0);
  const [basisAmount, setBasisAmount] = useState(50000000);
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  const setScore = (key: string, val: number) => setScores(s => ({ ...s, [key]: val }));

  const totalScore = Object.values(scores).reduce((s, v) => s + v, 0);
  const maxScore = FACTORS.length * 10;
  const pct = Math.round((totalScore / maxScore) * 100);
  const { level, color, desc } = getRiskLevel(pct);

  const materiality = (basisAmount * MATERIALITY_BASIS[basis].pct) / 100;
  const perfMateriality = materiality * 0.75;
  const clearly = materiality * 0.05;

  const radarData = FACTORS.map(f => ({ subject: f.label, score: scores[f.key], fullMark: 10 }));

  const fmt = (n: number) => '₹' + Math.round(n).toLocaleString('en-IN');

  return (
    /* Standard structural container layout forcing code cleanly beneath absolute headers */
    <div style={{ 
      width: '100%', 
      height: '100vh',
      maxHeight: '100vh', 
      overflowY: 'auto', 
      paddingTop: '80px', /* Safe top alignment clearance */
      paddingBottom: '40px',
      boxSizing: 'border-box',
      position: 'relative',
      zIndex: 1
    }}>
      <div className="calc-body" style={{ marginTop: 0, paddingTop: 0 }}>
        <div className="calc-split">
          <div className="calc-inputs">
            <div className="calc-section-title">Risk Factor Scoring (0–10)</div>
            {FACTORS.map(f => (
              <div key={f.key} className="calc-input-group">
                <label>{f.label} <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>— {f.desc}</span></label>
                <div className="calc-input-row">
                  <input type="range" min={0} max={10} step={1} value={scores[f.key]} onChange={e => setScore(f.key, +e.target.value)} className="calc-range" />
                  <span className="calc-val-badge" style={{ minWidth: 32 }}>{scores[f.key]}/10</span>
                </div>
              </div>
            ))}

            <div className="calc-section-title" style={{ marginTop: '1.5rem' }}>Materiality Calculation</div>
            <div className="calc-input-group">
              <label>Materiality Basis</label>
              <div className="rate-pills">
                {MATERIALITY_BASIS.map((b, i) => (
                  <button key={i} className={`rate-pill ${basis === i ? 'active' : ''}`} onClick={() => setBasis(i)}>{b.label} ({b.pct}%)</button>
                ))}
              </div>
            </div>
            <div className="calc-input-group">
              <label>{MATERIALITY_BASIS[basis].label} Amount (₹)</label>
              <input type="number" className="calc-text-input" value={basisAmount} onChange={e => setBasisAmount(+e.target.value)} min={0} />
            </div>
          </div>

          <div className="calc-results">
            <div className="calc-result-card main" style={{ borderColor: color + '66' }}>
              <div className="result-label">Composite Risk Score</div>
              <div className="risk-score-display" style={{ color }}>
                <div className="risk-pct">{pct}%</div>
                <div className="risk-level" style={{ background: color + '22', borderColor: color }}>{level} RISK</div>
              </div>
              <div className="risk-desc">{desc}</div>
              <div className="risk-bar-wrap">
                <div className="risk-bar-bg">
                  <div className="risk-bar-fill" style={{ width: `${pct}%`, background: color }} />
                </div>
                <div className="risk-bar-labels">
                  <span style={{ color: '#2db88a' }}>Low</span>
                  <span style={{ color: 'var(--accent)' }}>Medium</span>
                  <span style={{ color: '#e09870' }}>High</span>
                  <span style={{ color: '#e05580' }}>Critical</span>
                </div>
              </div>
            </div>

            <div className="calc-info-box">
              <div className="result-label" style={{ marginBottom: 8 }}>Materiality Thresholds</div>
              <div className="result-rows">
                <div className="result-row"><span>Overall Materiality</span><strong>{fmt(materiality)}</strong></div>
                <div className="result-row"><span>Performance Materiality (75%)</span><strong>{fmt(perfMateriality)}</strong></div>
                <div className="result-row"><span>Clearly Trivial (5%)</span><strong>{fmt(clearly)}</strong></div>
              </div>
            </div>

            {isClient && (
              <div className="calc-charts">
                <div className="chart-title">Risk Factor Spider Chart</div>
                <ResponsiveContainer width="100%" height={220}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="var(--border)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9, fill: 'var(--text-muted)' }} />
                    <PolarRadiusAxis angle={30} domain={[0, 10]} tick={{ fontSize: 8, fill: 'var(--text-muted)' }} />
                    <Radar name="Risk Score" dataKey="score" stroke={color} fill={color} fillOpacity={0.25} />
                    <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8 }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}