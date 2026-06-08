"use client";
import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from "recharts";

function calcOldRegime(gross: number, std: number, deductions: number) {
  const taxable = Math.max(0, gross - std - deductions);
  let tax = 0;
  if (taxable > 1000000) tax += (taxable - 1000000) * 0.3;
  if (taxable > 500000) tax += (Math.min(taxable, 1000000) - 500000) * 0.2;
  if (taxable > 250000) tax += (Math.min(taxable, 500000) - 250000) * 0.05;
  if (taxable <= 500000) tax = Math.max(0, tax - 12500);
  const surcharge =
    taxable > 5000000
      ? tax * 0.37
      : taxable > 2000000
        ? tax * 0.25
        : taxable > 1000000
          ? tax * 0.15
          : taxable > 500000
            ? tax * 0.1
            : 0;
  const cess = (tax + surcharge) * 0.04;
  return { tax, surcharge, cess, total: tax + surcharge + cess, taxable };
}

function calcNewRegime(gross: number) {
  const taxable = Math.max(0, gross - 75000);
  let tax = 0;
  if (taxable > 1500000) tax += (taxable - 1500000) * 0.3;
  if (taxable > 1200000) tax += (Math.min(taxable, 1500000) - 1200000) * 0.2;
  if (taxable > 1000000) tax += (Math.min(taxable, 1200000) - 1000000) * 0.15;
  if (taxable > 700000) tax += (Math.min(taxable, 1000000) - 700000) * 0.1;
  if (taxable > 300000) tax += (Math.min(taxable, 700000) - 300000) * 0.05;
  if (taxable <= 700000) tax = Math.max(0, tax - 25000);
  const surcharge =
    taxable > 5000000
      ? tax * 0.25
      : taxable > 2000000
        ? tax * 0.25
        : taxable > 1000000
          ? tax * 0.15
          : taxable > 500000
            ? tax * 0.1
            : 0;
  const cess = (tax + surcharge) * 0.04;
  return { tax, surcharge, cess, total: tax + surcharge + cess, taxable };
}

const fmt = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");
const fmtL = (n: number) => {
  if (n >= 10000000) return (n / 10000000).toFixed(2) + " Cr";
  if (n >= 100000) return (n / 100000).toFixed(2) + " L";
  return "₹" + Math.round(n).toLocaleString("en-IN");
};

export default function IncomeTaxCalc() {
  const [gross, setGross] = useState(1500000);
  const [deductions, setDeductions] = useState({
    c80: 150000,
    d80: 25000,
    nps: 50000,
    hra: 0,
    others: 0,
  });
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  const totalDed =
    deductions.c80 +
    deductions.d80 +
    deductions.nps +
    deductions.hra +
    deductions.others;
  const old = calcOldRegime(gross, 50000, totalDed);
  const newR = calcNewRegime(gross);
  const better = old.total <= newR.total ? "old" : "new";
  const saving = Math.abs(old.total - newR.total);

  const barData = [
    {
      name: "Old Regime",
      "Basic Tax": Math.round(old.tax),
      Surcharge: Math.round(old.surcharge),
      Cess: Math.round(old.cess),
    },
    {
      name: "New Regime",
      "Basic Tax": Math.round(newR.tax),
      Surcharge: Math.round(newR.surcharge),
      Cess: Math.round(newR.cess),
    },
  ];

  const pieData = [
    {
      name: "Take Home",
      value: Math.round(gross - newR.total),
      color: "var(--accent)",
    },
    {
      name: "Total Tax",
      value: Math.round(newR.total),
      color: "var(--accent3)",
    },
  ];

  const slabData = [
    { slab: "0-3L", old: 0, new: 0 },
    { slab: "3-5L", old: 5, new: 5 },
    { slab: "5-7L", old: 20, new: 5 },
    { slab: "7-10L", old: 20, new: 10 },
    { slab: "10-12L", old: 30, new: 15 },
    { slab: "12-15L", old: 30, new: 20 },
    { slab: "15L+", old: 30, new: 30 },
  ];

  return (
    /* Wrapped container handles top overflow, standard margins, and controls internal page scrolling cleanly */
    <div
      style={{
        width: "100%",
        maxHeight: "calc(100vh - 60px)",
        overflowY: "auto",
        paddingTop: "2.9rem",
        paddingBottom: "2rem",
        boxSizing: "border-box",
      }}
    >
      <div className="calc-body" style={{ marginTop: 0 }}>
        <div className="calc-split">
          <div className="calc-inputs">
            <div className="calc-input-group">
              <label>Annual Gross Income</label>
              <div className="calc-input-row">
                <input
                  type="range"
                  min={250000}
                  max={10000000}
                  step={50000}
                  value={gross}
                  onChange={(e) => setGross(+e.target.value)}
                  className="calc-range"
                />
                <span className="calc-val-badge">{fmtL(gross)}</span>
              </div>
            </div>

            <div className="calc-section-title">
              Chapter VI-A Deductions (Old Regime)
            </div>

            {[
              { key: "c80", label: "80C — ELSS / PPF / LIC", max: 150000 },
              { key: "d80", label: "80D — Medical Insurance", max: 100000 },
              { key: "nps", label: "80CCD(1B) — NPS", max: 50000 },
              { key: "hra", label: "HRA Exemption", max: 600000 },
              { key: "others", label: "Other Deductions", max: 500000 },
            ].map(({ key, label, max }) => (
              <div key={key} className="calc-input-group">
                <label>{label}</label>
                <div className="calc-input-row">
                  <input
                    type="range"
                    min={0}
                    max={max}
                    step={5000}
                    value={deductions[key as keyof typeof deductions]}
                    onChange={(e) =>
                      setDeductions((d) => ({ ...d, [key]: +e.target.value }))
                    }
                    className="calc-range"
                  />
                  <span className="calc-val-badge">
                    {fmtL(deductions[key as keyof typeof deductions])}
                  </span>
                </div>
              </div>
            ))}

            <div className="calc-info-box">
              <div className="calc-info-row">
                <span>Total Deductions (Old)</span>
                <span>{fmt(totalDed)}</span>
              </div>
              <div className="calc-info-row">
                <span>Standard Deduction — Old</span>
                <span>₹50,000</span>
              </div>
              <div className="calc-info-row">
                <span>Standard Deduction — New</span>
                <span>₹75,000</span>
              </div>
            </div>
          </div>

          <div className="calc-results">
            <div className={`calc-verdict ${better}`}>
              <div className="verdict-label">
                {better === "old" ? "🏆 Old Regime Wins" : "🏆 New Regime Wins"}
              </div>
              <div className="verdict-saving">
                You save {fmt(saving)} vs other regime
              </div>
            </div>

            <div className="calc-regime-cards">
              <div
                className={`regime-card ${better === "old" ? "winner" : ""}`}
              >
                <div className="regime-name">Old Regime</div>
                <div className="regime-taxable">
                  Taxable: {fmt(old.taxable)}
                </div>
                <div className="regime-rows">
                  <div className="regime-row">
                    <span>Base Tax</span>
                    <span>{fmt(old.tax)}</span>
                  </div>
                  <div className="regime-row">
                    <span>Surcharge</span>
                    <span>{fmt(old.surcharge)}</span>
                  </div>
                  <div className="regime-row">
                    <span>4% Cess</span>
                    <span>{fmt(old.cess)}</span>
                  </div>
                </div>
                <div className="regime-total">Total: {fmt(old.total)}</div>
                <div className="regime-effective">
                  Effective Rate:{" "}
                  {gross > 0 ? ((old.total / gross) * 100).toFixed(2) : "0.00"}%
                </div>
              </div>
              <div
                className={`regime-card ${better === "new" ? "winner" : ""}`}
              >
                <div className="regime-name">New Regime</div>
                <div className="regime-taxable">
                  Taxable: {fmt(newR.taxable)}
                </div>
                <div className="regime-rows">
                  <div className="regime-row">
                    <span>Base Tax</span>
                    <span>{fmt(newR.tax)}</span>
                  </div>
                  <div className="regime-row">
                    <span>Surcharge</span>
                    <span>{fmt(newR.surcharge)}</span>
                  </div>
                  <div className="regime-row">
                    <span>4% Cess</span>
                    <span>{fmt(newR.cess)}</span>
                  </div>
                </div>
                <div className="regime-total">Total: {fmt(newR.total)}</div>
                <div className="regime-effective">
                  Effective Rate:{" "}
                  {gross > 0 ? ((newR.total / gross) * 100).toFixed(2) : "0.00"}
                  %
                </div>
              </div>
            </div>

            {isClient && (
              <div className="calc-charts">
                <div className="chart-title">Regime Comparison</div>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={barData}>
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 12, fill: "var(--text-muted)" }}
                    />
                    <YAxis
                      tickFormatter={(v) => fmtL(v)}
                      tick={{ fontSize: 10, fill: "var(--text-muted)" }}
                      width={70}
                    />
                    <Tooltip
                      formatter={(v: any) => (typeof v === "number" ? fmt(v) : v)}
                      contentStyle={{
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                        borderRadius: 8,
                      }}
                    />
                    <Legend />
                    <Bar
                      dataKey="Basic Tax"
                      fill="var(--accent)"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="Surcharge"
                      fill="var(--accent2)"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="Cess"
                      fill="var(--accent3)"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>

                <div className="chart-title" style={{ marginTop: 16 }}>
                  New Regime — Take-Home vs Tax
                </div>
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={75}
                      dataKey="value"
                      paddingAngle={3}
                    >
                      {pieData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(v: any) => (typeof v === "number" ? fmt(v) : v)}
                      contentStyle={{
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                        borderRadius: 8,
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div
                  style={{
                    display: "flex",
                    gap: "1.5rem",
                    justifyContent: "center",
                    marginTop: 8,
                  }}
                >
                  {pieData.map((entry, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: "0.82rem",
                        color: "var(--text-muted)",
                      }}
                    >
                      <span
                        style={{
                          width: 12,
                          height: 12,
                          borderRadius: "50%",
                          background: entry.color,
                          display: "inline-block",
                          flexShrink: 0,
                        }}
                      />
                      <span>{entry.name}</span>
                      <span style={{ color: "var(--text)", fontWeight: 600 }}>
                        {fmtL(entry.value)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="chart-title" style={{ marginTop: 16 }}>
                  Tax Slab Rates (%)
                </div>
                <ResponsiveContainer width="100%" height={160}>
                  <BarChart data={slabData}>
                    <XAxis
                      dataKey="slab"
                      tick={{ fontSize: 10, fill: "var(--text-muted)" }}
                    />
                    <YAxis
                      tick={{ fontSize: 10, fill: "var(--text-muted)" }}
                      unit="%"
                    />
                    <Tooltip
                      contentStyle={{
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                        borderRadius: 8,
                      }}
                    />
                    <Legend />
                    <Bar
                      dataKey="old"
                      name="Old Regime %"
                      fill="var(--accent3)"
                      radius={[3, 3, 0, 0]}
                    />
                    <Bar
                      dataKey="new"
                      name="New Regime %"
                      fill="var(--accent)"
                      radius={[3, 3, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}