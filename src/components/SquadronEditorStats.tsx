import type { SquadronCardData } from '../types/squadron';

interface SquadronEditorStatsProps {
  squadron: SquadronCardData;
  update: <K extends keyof SquadronCardData>(key: K, value: SquadronCardData[K]) => void;
}

export function SquadronEditorStats({ squadron, update }: SquadronEditorStatsProps) {
  return (
    <section className="editor-section">
      <h3>Core Stats</h3>
      <div className="field-row">
        <label className="field">
          <span>Speed</span>
          <input
            type="number"
            min={0}
            value={squadron.speed}
            onChange={(e) => update('speed', Number(e.target.value))}
          />
        </label>
        <label className="field">
          <span>Hull</span>
          <input
            type="number"
            min={0}
            value={squadron.hull}
            onChange={(e) => update('hull', Number(e.target.value))}
          />
        </label>
      </div>
    </section>
  );
}
