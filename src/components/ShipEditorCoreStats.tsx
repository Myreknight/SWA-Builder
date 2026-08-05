import type { ShipCardData } from '../types/ship';

interface ShipEditorCoreStatsProps {
  ship: ShipCardData;
  update: <K extends keyof ShipCardData>(key: K, value: ShipCardData[K]) => void;
}

export function ShipEditorCoreStats({ ship, update }: ShipEditorCoreStatsProps) {
  return (
    <section className="editor-section">
      <h3>Core Stats</h3>
      <div className="field-row">
        <label className="field">
          <span>Hull</span>
          <input type="number" min={0} value={ship.hull} onChange={(e) => update('hull', Number(e.target.value))} />
        </label>
        <label className="field">
          <span>Command</span>
          <input
            type="number"
            min={0}
            value={ship.command}
            onChange={(e) => update('command', Number(e.target.value))}
          />
        </label>
        <label className="field">
          <span>Squadron</span>
          <input
            type="number"
            min={0}
            value={ship.squadron}
            onChange={(e) => update('squadron', Number(e.target.value))}
          />
        </label>
        <label className="field">
          <span>Engineering</span>
          <input
            type="number"
            min={0}
            value={ship.engineering}
            onChange={(e) => update('engineering', Number(e.target.value))}
          />
        </label>
      </div>
    </section>
  );
}
