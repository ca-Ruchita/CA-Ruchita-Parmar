const ITEMS = [
  'Chartered Accountant','Statutory Audit','GST Advisory','Income Tax',
  'IFRS Reporting','Financial Modelling','Corporate Compliance',
  'Business Valuation','Treasury Management','Due Diligence',
];

export default function Ticker() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div className="ticker-wrap">
      <div className="ticker-track">
        {doubled.map((item, i) => (
          <span key={i} className="ticker-item">{item}</span>
        ))}
      </div>
    </div>
  );
}
