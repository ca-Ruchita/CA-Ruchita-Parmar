"use client";
import { useState } from "react";

const MONTHS = [
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
  "Jan",
  "Feb",
  "Mar",
];

const DEADLINES: Record<
  string,
  { date: string; type: string; label: string; desc: string }[]
> = {
  Apr: [
    { date: "11", type: "gst", label: "GSTR-1", desc: "Monthly filers (Mar)" },
    {
      date: "13",
      type: "gst",
      label: "GSTR-1 (QRMP)",
      desc: "Quarterly filers (Jan-Mar)",
    },
    { date: "20", type: "gst", label: "GSTR-3B", desc: "Monthly filers (Mar)" },
    {
      date: "22",
      type: "gst",
      label: "GSTR-3B (QRMP)",
      desc: "Category I states",
    },
    {
      date: "30",
      type: "tds",
      label: "TDS Payment",
      desc: "Deducted in Mar (non-govt)",
    },
    {
      date: "30",
      type: "it",
      label: "Form 61",
      desc: "PAN-linked transactions",
    },
  ],
  May: [
    { date: "11", type: "gst", label: "GSTR-1", desc: "Monthly filers (Apr)" },
    { date: "20", type: "gst", label: "GSTR-3B", desc: "Monthly filers (Apr)" },
    {
      date: "31",
      type: "tds",
      label: "TDS Certificate",
      desc: "Form 16A for Q4",
    },
    {
      date: "31",
      type: "roc",
      label: "Form MGT-7A",
      desc: "Small company annual return",
    },
  ],
  Jun: [
    { date: "11", type: "gst", label: "GSTR-1", desc: "Monthly filers (May)" },
    {
      date: "15",
      type: "it",
      label: "Advance Tax",
      desc: "1st instalment — 15% of liability",
    },
    { date: "20", type: "gst", label: "GSTR-3B", desc: "Monthly filers (May)" },
  ],
  Jul: [
    { date: "11", type: "gst", label: "GSTR-1", desc: "Monthly filers (Jun)" },
    {
      date: "13",
      type: "gst",
      label: "GSTR-1 (QRMP)",
      desc: "Quarterly filers (Apr-Jun)",
    },
    { date: "15", type: "tds", label: "TDS Return", desc: "Form 24Q/26Q — Q1" },
    { date: "20", type: "gst", label: "GSTR-3B", desc: "Monthly filers (Jun)" },
    {
      date: "31",
      type: "it",
      label: "ITR Filing",
      desc: "Individuals & HUF (non-audit)",
    },
    {
      date: "31",
      type: "it",
      label: "Updated Return (ITR-U)",
      desc: "FY 2021-22",
    },
  ],
  Aug: [
    { date: "11", type: "gst", label: "GSTR-1", desc: "Monthly filers (Jul)" },
    { date: "20", type: "gst", label: "GSTR-3B", desc: "Monthly filers (Jul)" },
  ],
  Sep: [
    { date: "11", type: "gst", label: "GSTR-1", desc: "Monthly filers (Aug)" },
    {
      date: "15",
      type: "it",
      label: "Advance Tax",
      desc: "2nd instalment — 45% cumulative",
    },
    { date: "20", type: "gst", label: "GSTR-3B", desc: "Monthly filers (Aug)" },
    {
      date: "30",
      type: "it",
      label: "ITR Filing",
      desc: "Audit cases (if extended)",
    },
    {
      date: "30",
      type: "roc",
      label: "Form AOC-4",
      desc: "Financial statements filing",
    },
  ],
  Oct: [
    { date: "11", type: "gst", label: "GSTR-1", desc: "Monthly filers (Sep)" },
    {
      date: "13",
      type: "gst",
      label: "GSTR-1 (QRMP)",
      desc: "Quarterly filers (Jul-Sep)",
    },
    { date: "15", type: "tds", label: "TDS Return", desc: "Form 24Q/26Q — Q2" },
    { date: "20", type: "gst", label: "GSTR-3B", desc: "Monthly filers (Sep)" },
    { date: "31", type: "it", label: "ITR Filing", desc: "Audit / TP cases" },
    {
      date: "31",
      type: "roc",
      label: "Form MGT-7",
      desc: "Annual return (other companies)",
    },
  ],
  Nov: [
    { date: "11", type: "gst", label: "GSTR-1", desc: "Monthly filers (Oct)" },
    { date: "20", type: "gst", label: "GSTR-3B", desc: "Monthly filers (Oct)" },
    { date: "30", type: "it", label: "TP Audit Report", desc: "Form 3CEB" },
  ],
  Dec: [
    { date: "11", type: "gst", label: "GSTR-1", desc: "Monthly filers (Nov)" },
    {
      date: "15",
      type: "it",
      label: "Advance Tax",
      desc: "3rd instalment — 75% cumulative",
    },
    { date: "20", type: "gst", label: "GSTR-3B", desc: "Monthly filers (Nov)" },
    {
      date: "31",
      type: "it",
      label: "Updated Return (ITR-U)",
      desc: "FY 2022-23",
    },
  ],
  Jan: [
    { date: "11", type: "gst", label: "GSTR-1", desc: "Monthly filers (Dec)" },
    {
      date: "13",
      type: "gst",
      label: "GSTR-1 (QRMP)",
      desc: "Quarterly filers (Oct-Dec)",
    },
    { date: "15", type: "tds", label: "TDS Return", desc: "Form 24Q/26Q — Q3" },
    { date: "20", type: "gst", label: "GSTR-3B", desc: "Monthly filers (Dec)" },
  ],
  Feb: [
    { date: "11", type: "gst", label: "GSTR-1", desc: "Monthly filers (Jan)" },
    { date: "20", type: "gst", label: "GSTR-3B", desc: "Monthly filers (Jan)" },
  ],
  Mar: [
    { date: "11", type: "gst", label: "GSTR-1", desc: "Monthly filers (Feb)" },
    {
      date: "15",
      type: "it",
      label: "Advance Tax",
      desc: "4th instalment — 100%",
    },
    { date: "20", type: "gst", label: "GSTR-3B", desc: "Monthly filers (Feb)" },
    {
      date: "31",
      type: "it",
      label: "Tax Saving Investments",
      desc: "80C, 80D, NPS investments last day",
    },
    {
      date: "31",
      type: "gst",
      label: "GSTR-9 Annual Return",
      desc: "FY 2024-25",
    },
    {
      date: "31",
      type: "it",
      label: "Vivad se Vishwas",
      desc: "Dispute resolution scheme",
    },
  ],
};

const TYPE_COLORS: Record<string, string> = {
  gst: "#2db88a",
  it: "var(--accent)",
  tds: "#4a8fe8",
  roc: "#8b5cf6",
};

const TYPE_LABELS: Record<string, string> = {
  gst: "GST",
  it: "Income Tax",
  tds: "TDS/TCS",
  roc: "ROC / MCA",
};

export default function ComplianceCalendar() {
  const [activeMonth, setActiveMonth] = useState("Apr");
  const [filter, setFilter] = useState("all");

  const items = (DEADLINES[activeMonth] || []).filter(
    (d) => filter === "all" || d.type === filter,
  );

  return (
    /* Layout isolation container pushing layout downward to leave space for headers */
    <div
      style={{
        width: "100%",
        height: "100vh",
        maxHeight: "100vh",
        overflowY: "auto",
        paddingTop: "80px" /* Safe absolute position push */,
        paddingBottom: "40px",
        boxSizing: "border-box",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div className="calc-body" style={{ marginTop: 0, paddingTop: 0 }}>
        <div className="cc-layout">
          <div className="cc-months">
            {MONTHS.map((m) => (
              <button
                key={m}
                className={`cc-month-btn ${activeMonth === m ? "active" : ""}`}
                onClick={() => setActiveMonth(m)}
              >
                {m}
              </button>
            ))}
          </div>

          <div className="cc-main">
            <div className="cc-filters">
              {["all", "gst", "it", "tds", "roc"].map((f) => (
                <button
                  key={f}
                  className={`cc-filter ${filter === f ? "active" : ""}`}
                  style={
                    filter === f && f !== "all"
                      ? { borderColor: TYPE_COLORS[f], color: TYPE_COLORS[f] }
                      : {}
                  }
                  onClick={() => setFilter(f)}
                >
                  {f === "all" ? "📋 All" : TYPE_LABELS[f]}
                </button>
              ))}
            </div>

            <div className="cc-header">
              <h3>
                {activeMonth} 2025 — {items.length} Deadlines
              </h3>
            </div>

            <div className="cc-list">
              {items.length === 0 ? (
                <div className="cc-empty">
                  No deadlines for this filter in {activeMonth}
                </div>
              ) : (
                items.map((d, i) => (
                  <div key={i} className="cc-item">
                    <div
                      className="cc-date"
                      style={{ borderColor: TYPE_COLORS[d.type] }}
                    >
                      <span className="cc-day">{d.date}</span>
                      <span className="cc-mn">{activeMonth}</span>
                    </div>
                    <div className="cc-info">
                      <div className="cc-title">
                        <span
                          className="cc-badge"
                          style={{
                            background: TYPE_COLORS[d.type] + "22",
                            color: TYPE_COLORS[d.type],
                            borderColor: TYPE_COLORS[d.type] + "44",
                          }}
                        >
                          {TYPE_LABELS[d.type]}
                        </span>
                        <span className="cc-label">{d.label}</span>
                      </div>
                      <div className="cc-desc">{d.desc}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
