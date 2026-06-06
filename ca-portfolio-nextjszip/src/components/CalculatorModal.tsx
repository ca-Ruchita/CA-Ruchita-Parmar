'use client';
import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

const IncomeTaxCalc = dynamic(() => import('./tools/IncomeTaxCalc'), { ssr: false });
const GSTCalc = dynamic(() => import('./tools/GSTCalc'), { ssr: false });
const BusinessValuation = dynamic(() => import('./tools/BusinessValuation'), { ssr: false });
const ComplianceCalendar = dynamic(() => import('./tools/ComplianceCalendar'), { ssr: false });
const ITCChecker = dynamic(() => import('./tools/ITCChecker'), { ssr: false });
const AuditRisk = dynamic(() => import('./tools/AuditRisk'), { ssr: false });

const TOOLS = [
  { id: 'tax', icon: '📊', name: 'Income Tax Calculator', subtitle: 'FY 2025–26 · Old vs New Regime', component: <IncomeTaxCalc /> },
  { id: 'gst', icon: '🧾', name: 'GST Calculator', subtitle: 'CGST · SGST · IGST · Inclusive / Exclusive', component: <GSTCalc /> },
  { id: 'valuation', icon: '📉', name: 'Business Valuation', subtitle: 'DCF · WACC · Terminal Value · Sensitivity', component: <BusinessValuation /> },
  { id: 'calendar', icon: '📅', name: 'Compliance Calendar', subtitle: 'GST · IT · TDS · ROC Deadlines FY 2025–26', component: <ComplianceCalendar /> },
  { id: 'itc', icon: '🔍', name: 'ITC Eligibility Checker', subtitle: 'Section 17(5) · Blocked Credits Reference', component: <ITCChecker /> },
  { id: 'audit', icon: '🏦', name: 'Audit Risk Assessment', subtitle: 'Risk Scoring · Materiality Calculation', component: <AuditRisk /> },
];

interface Props {
  toolId: string | null;
  onClose: () => void;
  onNavigate: (id: string) => void;
}

export default function CalculatorModal({ toolId, onClose }: Props) {
  const tool = TOOLS.find(t => t.id === toolId);
  const inlineRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Close when clicking outside the expanded tool panel
  useEffect(() => {
    if (!toolId) return;
    const handler = (e: MouseEvent) => {
      if (inlineRef.current && !inlineRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    // Small delay so the opening click doesn't immediately close it
    const t = setTimeout(() => document.addEventListener('mousedown', handler), 100);
    return () => { clearTimeout(t); document.removeEventListener('mousedown', handler); };
  }, [toolId, onClose]);

  // Scroll into view when tool opens
  useEffect(() => {
    if (toolId && inlineRef.current) {
      setTimeout(() => {
        inlineRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    }
  }, [toolId]);

  return (
    <AnimatePresence>
      {toolId && tool && (
        <motion.div
          ref={inlineRef}
          className="calc-inline"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          style={{ overflow: 'hidden' }}
        >
          {/* Slim header — just icon + name, no buttons */}
          <div className="calc-inline-header">
            <span className="calc-fs-icon">{tool.icon}</span>
            <div>
              <div className="calc-fs-name">{tool.name}</div>
              <div className="calc-fs-sub">{tool.subtitle} · click outside to close</div>
            </div>
          </div>

          {/* Tool content */}
          <div className="calc-fs-body">
            {tool.component}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
