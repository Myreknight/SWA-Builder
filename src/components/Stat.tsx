import './Stat.css';

interface StatProps {
  label: string;
  value: number;
}

export function Stat({ label, value }: StatProps) {
  return (
    <div className="stat">
      <span className="stat__value">{value}</span>
      <span className="stat__label">{label}</span>
    </div>
  );
}
