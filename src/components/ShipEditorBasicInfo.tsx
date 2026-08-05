import { FACTION_PRESETS } from '../types/ship';
import type { ShipCardData, ShipSize } from '../types/ship';

const CUSTOM_FACTION_OPTION = 'Custom…';
const SIZES: ShipSize[] = ['Flotilla', 'Small', 'Medium', 'Large', 'Huge'];

function readImageFile(file: File, onLoaded: (dataUrl: string) => void) {
  const reader = new FileReader();
  reader.onload = () => onLoaded(reader.result as string);
  reader.readAsDataURL(file);
}

interface ShipEditorBasicInfoProps {
  ship: ShipCardData;
  update: <K extends keyof ShipCardData>(key: K, value: ShipCardData[K]) => void;
}

export function ShipEditorBasicInfo({ ship, update }: ShipEditorBasicInfoProps) {
  const isCustomFaction = !FACTION_PRESETS.includes(ship.faction);

  return (
    <section className="editor-section">
      <h3>Basic Info</h3>
      <label className="field">
        <span>Name</span>
        <input value={ship.name} onChange={(e) => update('name', e.target.value)} placeholder="Ship name" />
      </label>
      <div className="field-row">
        <label className="field">
          <span>Faction</span>
          <select
            value={isCustomFaction ? CUSTOM_FACTION_OPTION : ship.faction}
            onChange={(e) => update('faction', e.target.value === CUSTOM_FACTION_OPTION ? '' : e.target.value)}
          >
            {FACTION_PRESETS.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
            <option value={CUSTOM_FACTION_OPTION}>{CUSTOM_FACTION_OPTION}</option>
          </select>
        </label>
        <label className="field">
          <span>Size</span>
          <select value={ship.size} onChange={(e) => update('size', e.target.value as ShipSize)}>
            {SIZES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Points</span>
          <input
            type="number"
            min={0}
            value={ship.points}
            onChange={(e) => update('points', Number(e.target.value))}
          />
        </label>
        <label className="field field--narrow">
          <span>Border Color</span>
          <input type="color" value={ship.accentColor} onChange={(e) => update('accentColor', e.target.value)} />
        </label>
      </div>
      {isCustomFaction && (
        <label className="field">
          <span>Custom Faction Name</span>
          <input
            value={ship.faction}
            onChange={(e) => update('faction', e.target.value)}
            placeholder="Enter custom faction"
          />
        </label>
      )}
      <label className="field">
        <span>Upload Image</span>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) readImageFile(file, (dataUrl) => update('artUrl', dataUrl));
          }}
        />
      </label>
      <label className="field">
        <span>Or Paste Image URL</span>
        <input
          value={ship.artUrl}
          onChange={(e) => update('artUrl', e.target.value)}
          placeholder="https://... (optional)"
        />
      </label>
      <label className="field">
        <span>Upload Silhouette (for ship base)</span>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) readImageFile(file, (dataUrl) => update('silhouetteUrl', dataUrl));
          }}
        />
      </label>
    </section>
  );
}
