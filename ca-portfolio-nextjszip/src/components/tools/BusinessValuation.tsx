"use client";
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";

const fmt = (n: number) => {
  if (Math.abs(n) >= 10000000) return "₹" + (n / 10000000).toFixed(2) + " Cr";
  if (Math.abs(n) >= 100000) return "₹" + (n / 100000).toFixed(2) + " L";
  return "₹" + Math.round(n).toLocaleString("en-IN");
};

export default function BusinessValuation() {
  const [revenue, setRevenue] = useState(50000000);
  const [revenueGrowth, setRevenueGrowth] = useState(15);
  const [ebitdaMargin, setEbitdaMargin] = useState(20);
  const [wacc, setWacc] = useState(12);
  const [terminalGrowth, setTerminalGrowth] = useState(4);
  const [taxRate, setTaxRate] = useState(25);
  const [capexPct, setCapexPct] = useState(5);
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  const projections = Array.from({ length: 5 }, (_, i) => {
    const year = i + 1;
    const rev = revenue * Math.pow(1 + revenueGrowth / 100, year);
    const ebitda = (rev * ebitdaMargin) / 100;
    const nopat = ebitda * (1 - taxRate / 100);
    const capex = (rev * capexPct) / 100;
    const fcff = nopat - capex;
    const pv = fcff / Math.pow(1 + wacc / 100, year);
    return {
      year: `Y${year}`,
      revenue: Math.round(rev),
      ebitda: Math.round(ebitda),
      fcff: Math.round(fcff),
      pv: Math.round(pv),
    };
  });

  const sumPV = projections.reduce((s, p) => s + p.pv, 0);
  const lastFCFF = projections[4].fcff;
  const terminalValue =
    (lastFCFF * (1 + terminalGrowth / 100)) / ((wacc - terminalGrowth) / 100);
  const pvTerminal = terminalValue / Math.pow(1 + wacc / 100, 5);
  const enterpriseValue = sumPV + pvTerminal;

  const sensitivityWACC = [10, 11, 12, 13, 14].map((w) => ({
    wacc: `${w}%`,
    value: Math.round(
      projections.reduce(
        (s, p, i) => s + p.fcff / Math.pow(1 + w / 100, i + 1),
        0,
      ) +
        (lastFCFF * (1 + terminalGrowth / 100)) /
          ((w - terminalGrowth) / 100) /
          Math.pow(1 + w / 100, 5),
    ),
  }));

  return (
    /* Structural container layout preventing text/ranges from sliding up behind top tracking bars */
    <div
      style={{
        width: "100%",
        height: "100vh",
        maxHeight: "100vh",
        overflowY: "auto",
        paddingTop: "80px" /* Safe layout padding offset */,
        paddingBottom: "40px",
        boxSizing: "border-box",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div className="calc-body" style={{ marginTop: 0, paddingTop: 0 }}>
        <div className="calc-split">
          <div className="calc-inputs">
            {[
              {
                label: "Base Revenue (₹)",
                key: "revenue",
                val: revenue,
                set: setRevenue,
                min: 1000000,
                max: 500000000,
                step: 1000000,
                fmt: true,
              },
              {
                label: "Revenue Growth (%)",
                key: "rg",
                val: revenueGrowth,
                set: setRevenueGrowth,
                min: 0,
                max: 50,
                step: 1,
              },
              {
                label: "EBITDA Margin (%)",
                key: "em",
                val: ebitdaMargin,
                set: setEbitdaMargin,
                min: 0,
                max: 60,
                step: 1,
              },
              {
                label: "WACC (%)",
                key: "wacc",
                val: wacc,
                set: setWacc,
                min: 5,
                max: 30,
                step: 0.5,
              },
              {
                label: "Terminal Growth (%)",
                key: "tg",
                val: terminalGrowth,
                set: setTerminalGrowth,
                min: 1,
                max: 8,
                step: 0.5,
              },
              {
                label: "Tax Rate (%)",
                key: "tr",
                val: taxRate,
                set: setTaxRate,
                min: 0,
                max: 35,
                step: 1,
              },
              {
                label: "Capex (% of Revenue)",
                key: "cx",
                val: capexPct,
                set: setCapexPct,
                min: 0,
                max: 30,
                step: 1,
              },
            ].map(({ label, key, val, set, min, max, step, fmt: isFmt }) => (
              <div key={key} className="calc-input-group">
                <label>{label}</label>
                <div className="calc-input-row">
                  <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={val}
                    onChange={(e) =>
                      (set as (v: number) => void)(+e.target.value)
                    }
                    className="calc-range"
                  />
                  <span className="calc-val-badge">
                    {isFmt ? fmt(val) : `${val}${key === "revenue" ? "" : ""}`}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="calc-results">
            <div className="calc-result-card main">
              <div className="result-label">Enterprise Value (DCF)</div>
              <div className="result-big">{fmt(enterpriseValue)}</div>
              <div className="result-rows" style={{ marginTop: 12 }}>
                <div className="result-row">
                  <span>PV of FCFFs (5 yr)</span>
                  <strong>{fmt(sumPV)}</strong>
                </div>
                <div className="result-row">
                  <span>Terminal Value (undiscounted)</span>
                  <strong>{fmt(terminalValue)}</strong>
                </div>
                <div className="result-row">
                  <span>PV of Terminal Value</span>
                  <strong>{fmt(pvTerminal)}</strong>
                </div>
                <div className="result-row">
                  <span>TV as % of EV</span>
                  <strong>
                    {enterpriseValue
                      ? ((pvTerminal / enterpriseValue) * 100).toFixed(1)
                      : 0}
                    %
                  </strong>
                </div>
              </div>
            </div>

            {isClient && (
              <div className="calc-charts">
                <div className="chart-title">
                  5-Year Revenue & FCFF Projections
                </div>
                <ResponsiveContainer width="100%" height={190}>
                  <LineChart data={projections}>
                    <XAxis
                      dataKey="year"
                      tick={{ fontSize: 11, fill: "var(--text-muted)" }}
                    />
                    <YAxis
                      tickFormatter={(v) => fmt(v)}
                      tick={{ fontSize: 9, fill: "var(--text-muted)" }}
                      width={80}
                    />
                    <Tooltip
                      formatter={(v: number) => fmt(v)}
                      contentStyle={{
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                        borderRadius: 8,
                      }}
                    />
                    <Legend />
                    <Line
                      dataKey="revenue"
                      name="Revenue"
                      stroke="var(--accent)"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                    <Line
                      dataKey="ebitda"
                      name="EBITDA"
                      stroke="var(--accent2)"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                    <Line
                      dataKey="fcff"
                      name="FCFF"
                      stroke="var(--accent3)"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>

                <div className="chart-title" style={{ marginTop: 12 }}>
                  WACC Sensitivity — Enterprise Value
                </div>
                <ResponsiveContainer width="100%" height={150}>
                  <BarChart data={sensitivityWACC}>
                    <XAxis
                      dataKey="wacc"
                      tick={{ fontSize: 11, fill: "var(--text-muted)" }}
                    />
                    <YAxis
                      tickFormatter={(v) => fmt(v)}
                      tick={{ fontSize: 9, fill: "var(--text-muted)" }}
                      width={80}
                    />
                    <Tooltip
                      formatter={(v: number) => fmt(v)}
                      contentStyle={{
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                        borderRadius: 8,
                      }}
                    />
                    <Bar
                      dataKey="value"
                      name="Enterprise Value"
                      radius={[4, 4, 0, 0]}
                    >
                      {sensitivityWACC.map((_, i) => (
                        <Cell
                          key={i}
                          fill={i === 2 ? "var(--accent)" : "var(--accent3)"}
                        />
                      ))}
                    </Bar>
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
