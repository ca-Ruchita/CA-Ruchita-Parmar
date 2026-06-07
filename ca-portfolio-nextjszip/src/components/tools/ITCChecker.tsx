'use client';
import { useState } from 'react';

interface Category { name: string; section: string; eligible: 'full' | 'partial' | 'blocked'; note: string; }

const CATEGORIES: Category[] = [
  { name: 'Raw Materials / Stock-in-trade', section: '16(1)', eligible: 'full', note: 'Fully eligible if used in business and tax invoice available' },
  { name: 'Capital Goods', section: '16(1)', eligible: 'full', note: 'ITC available; reversal needed if used for exempt supply' },
  { name: 'Professional / Consulting Services', section: '16(1)', eligible: 'full', note: 'Eligible if for business purpose. Reasonable nexus required.' },
  { name: 'Works Contract (Construction)', section: '17(5)(c)', eligible: 'blocked', note: 'Blocked under Section 17(5) — no ITC unless supplier of works contract service' },
  { name: 'Construction of Immovable Property', section: '17(5)(d)', eligible: 'blocked', note: 'ITC not available on goods/services for construction of own immovable property' },
  { name: 'Motor Vehicles (<=13 seats)', section: '17(5)(a)', eligible: 'blocked', note: 'ITC blocked EXCEPT if used for transportation of goods, passengers (taxi), or driving school' },
  { name: 'Motor Vehicles — Goods Transport', section: '16(1)', eligible: 'full', note: 'ITC available for vehicles used exclusively for goods transport' },
  { name: 'Food & Beverages', section: '17(5)(b)(i)', eligible: 'blocked', note: 'ITC blocked except for outdoor catering, restaurant business, or as per obligation under law' },
  { name: 'Club Membership / Fitness', section: '17(5)(b)(ii)', eligible: 'blocked', note: 'Blocked — personal benefit to employees' },
  { name: 'Life / Health Insurance (Employees)', section: '17(5)(b)(iii)', eligible: 'partial', note: 'ITC blocked EXCEPT if compulsory under any law (e.g., workmen compensation)' },
  { name: 'Rent-a-Cab / Travel', section: '17(5)(b)(iii)', eligible: 'partial', note: 'Blocked unless obligatory under any law or contract for employees' },
  { name: 'Telecom / Internet Services', section: '16(1)', eligible: 'full', note: 'Fully eligible if for business use. Mixed use requires apportionment.' },
  { name: 'Advertisement / Marketing', section: '16(1)', eligible: 'full', note: 'Eligible if for promotion of taxable supplies' },
  { name: 'Banking / Financial Charges', section: '16(1)', eligible: 'full', note: 'Eligible for taxable businesses. Banks may need to apportion.' },
  { name: 'Hotels / Accommodation (Business Travel)', section: '16(1)', eligible: 'full', note: 'Eligible if for business travel. Employee personal trips blocked.' },
];

const STATUS_COLOR = { full: '#2db88a', partial: 'var(--accent)', blocked: '#e05580' };
const STATUS_LABEL = { full: '✅ Fully Eligible', partial: '⚠️ Conditional / Partial', blocked: '❌ Blocked' };

export default function ITCChecker() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'full' | 'partial' | 'blocked'>('all');
  const [selected, setSelected] = useState<Category | null>(null);

  const filtered = CATEGORIES.filter(c =>
    (filterStatus === 'all' || c.eligible === filterStatus) &&
    (search === '' || c.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    /* Uniform container layout wrapping to guarantee visibility below absolute layouts */
    <div style={{ 
      width: '100%', 
      height: '100vh',
      maxHeight: '100vh', 
      overflowY: 'auto', 
      paddingTop: '80px', /* Safe absolute position push */
      paddingBottom: '40px',
      boxSizing: 'border-box',
      position: 'relative',
      zIndex: 1
    }}>
      <div className="calc-body" style={{ marginTop: 0, paddingTop: 0 }}>
        <div className="itc-layout">
          <div className="itc-controls">
            <input
              className="calc-text-input"
              placeholder="Search expense category…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ marginBottom: '1rem' }}
            />
            <div className="itc-filters">
              {([ 'all', 'full', 'partial', 'blocked' ] as const).map(f => (
                <button
                  key={f}
                  className={`itc-filter ${filterStatus === f ? 'active' : ''}`}
                  onClick={() => setFilterStatus(f)}
                  style={filterStatus === f && f !== 'all' ? { background: STATUS_COLOR[f] + '22', color: STATUS_COLOR[f], borderColor: STATUS_COLOR[f] } : {}}
                >
                  {f === 'all' ? 'All' : STATUS_LABEL[f]}
                </button>
              ))}
            </div>

            <div className="itc-summary">
              <span style={{ color: STATUS_COLOR.full }}>✅ {CATEGORIES.filter(c => c.eligible === 'full').length} Eligible</span>
              <span style={{ color: STATUS_COLOR.partial }}>⚠️ {CATEGORIES.filter(c => c.eligible === 'partial').length} Conditional</span>
              <span style={{ color: STATUS_COLOR.blocked }}>❌ {CATEGORIES.filter(c => c.eligible === 'blocked').length} Blocked</span>
            </div>
          </div>

          <div className="itc-list">
            {filtered.map((cat, i) => (
              <button key={i} className={`itc-item ${selected?.name === cat.name ? 'selected' : ''}`} onClick={() => setSelected(selected?.name === cat.name ? null : cat)}>
                <div className="itc-item-top">
                  <span className="itc-cat-name">{cat.name}</span>
                  <span className="itc-status-badge" style={{ background: STATUS_COLOR[cat.eligible] + '22', color: STATUS_COLOR[cat.eligible], borderColor: STATUS_COLOR[cat.eligible] }}>
                    {cat.eligible === 'full' ? '✅ Eligible' : cat.eligible === 'partial' ? '⚠️ Conditional' : '❌ Blocked'}
                  </span>
                </div>
                <div className="itc-section">Section: {cat.section}</div>
                {selected?.name === cat.name && (
                  <div className="itc-note">{cat.note}</div>
                )}
              </button>
            ))}
            {filtered.length === 0 && <div className="cc-empty">No categories match your search</div>}
          </div>
        </div>
      </div>
    </div>
  );
}