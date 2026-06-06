'use client';
import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts';

const GST_RATES = [0, 5, 12, 18, 28];
const fmt = (n: number) => '₹' + Math.round(n).toLocaleString('en-IN');

export default function GSTCalc() {
  const [amount, setAmount] = useState(100000);
  const [rate, setRate] = useState(18);
  const [inclusive, setInclusive] = useState(false);
  const [isIGST, setIsIGST] = useState(false);
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  let base: number, gstAmt: number;
  if (inclusive) {
    base = (amount * 100) / (100 + rate);
    gstAmt = amount - base;
  } else {
    base = amount;
    gstAmt = (amount * rate) / 100;
  }
  const total = base + gstAmt;
  const half = gstAmt / 2;

  const pieData = [
    { name: 'Base Amount', value: Math.round(base), color: 'var(--accent)' },
    { name: 'GST', value: Math.round(gstAmt), color: 'var(--accent3)' },
  ];

  const rateCompare = GST_RATES.map(r => ({
    rate: `${r}%`,
    gst: Math.round(base * r / 100),
    total: Math.round(base + base * r / 100),
  }));

  return (
    <div className="calc-body">
      <div className="calc-split">
        <div className="calc-inputs">
          <div className="calc-input-group">
            <label>Amount (₹)</label>
            <input
              type="number" className="calc-text-input" value={amount}
              onChange={e => setAmount(+e.target.value)} min={0}
            />
          </div>

          <div className="calc-input-group">
            <label>GST Rate</label>
            <div className="rate-pills">
              {GST_RATES.map(r => (
                <button key={r} className={`rate-pill ${rate === r ? 'active' : ''}`} onClick={() => setRate(r)}>{r}%</button>
              ))}
            </div>
          </div>

          <div className="calc-toggle-row">
            <label className="calc-toggle">
              <input type="checkbox" checked={inclusive} onChange={e => setInclusive(e.target.checked)} />
              <span className="toggle-slider" />
              <span>GST Inclusive</span>
            </label>
          </div>

          <div className="calc-toggle-row">
            <label className="calc-toggle">
              <input type="checkbox" checked={isIGST} onChange={e => setIsIGST(e.target.checked)} />
              <span className="toggle-slider" />
              <span>Inter-State (IGST)</span>
            </label>
          </div>

          <div className="calc-info-box">
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              <strong style={{ color: 'var(--accent)' }}>CGST + SGST</strong> — Intra-state transactions<br />
              <strong style={{ color: 'var(--accent)' }}>IGST</strong> — Inter-state / import transactions
            </p>
          </div>
        </div>

        <div className="calc-results">
          <div className="calc-result-card main">
            <div className="result-rows">
              <div className="result-row"><span>Base / Taxable Value</span><strong>{fmt(base)}</strong></div>
              <div className="result-row accent-line" />
              {isIGST ? (
                <div className="result-row"><span>IGST @ {rate}%</span><strong>{fmt(gstAmt)}</strong></div>
              ) : (
                <>
                  <div className="result-row"><span>CGST @ {rate / 2}%</span><strong>{fmt(half)}</strong></div>
                  <div className="result-row"><span>SGST @ {rate / 2}%</span><strong>{fmt(half)}</strong></div>
                </>
              )}
              <div className="result-row total"><span>Total Invoice Value</span><strong>{fmt(total)}</strong></div>
            </div>
          </div>

          {isClient && (
            <div className="calc-charts">
              <div className="chart-title">Tax Breakdown</div>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={75} dataKey="value" paddingAngle={4}>
                    {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip formatter={(v: number) => fmt(v)} contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8 }} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>

              <div className="chart-title" style={{ marginTop: 12 }}>GST at Different Rates</div>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={rateCompare}>
                  <XAxis dataKey="rate" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
                  <YAxis tickFormatter={v => '₹' + (v / 1000).toFixed(0) + 'k'} tick={{ fontSize: 10, fill: 'var(--text-muted)' }} />
                  <Tooltip formatter={(v: number) => fmt(v)} contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8 }} />
                  <Legend />
                  <Bar dataKey="gst" name="GST Amount" fill="var(--accent3)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="total" name="Total Value" fill="var(--accent)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
