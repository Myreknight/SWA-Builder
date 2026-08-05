import { FACTION_PRESETS } from '../types/ship';
import type { SquadronCardData } from '../types/squadron';

const CUSTOM_FACTION_OPTION = 'Custom…';

function readImageFile(file: File, onLoaded: (dataUrl: string) => void) {
  const reader = new FileReader();
  reader.onload = () => onLoaded(reader.result as string);
  reader.readAsDataURL(file);
}

interface SquadronEditorBasicInfoProps {
  squadron: SquadronCardData;
  update: <K extends keyof SquadronCardData>(key: K, value: SquadronCardData[K]) => void;
}

export function SquadronEditorBasicInfo({ squadron, update }: SquadronEditorBasicInfoProps) {
  const isCustomFaction = !FACTION_PRESETS.includes(squadron.faction);

  return (
    <section className="editor-section">
      <h3>Basic Info</h3>
      <label className="field">
        <span>Name</span>
        <input value={squadron.name} onChange={(e) => update('name', e.target.value)} placeholder="Squadron name" />
      </label>
      <label className="checkbox">
        <input type="checkbox" checked={squadron.unique} onChange={(e) => update('unique', e.target.checked)} />
        <span>Unique</span>
      </label>
      <div className="field-row">
        <label className="field">
          <span>Faction</span>
          <select
            value={isCustomFaction ? CUSTOM_FACTION_OPTION : squadron.faction}
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
          <span>Points</span>
          <input
            type="number"
            min={0}
            value={squadron.points}
            onChange={(e) => update('points', Number(e.target.value))}
          />
        </label>
        <label className="field field--narrow">
          <span>Border Color</span>
          <input
            type="color"
            value={squadron.accentColor}
            onChange={(e) => update('accentColor', e.target.value)}
          />
        </label>
      </div>
      {isCustomFaction && (
        <label className="field">
          <span>Custom Faction Name</span>
          <input
            value={squadron.faction}
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
          value={squadron.artUrl}
          onChange={(e) => update('artUrl', e.target.value)}
          placeholder="https://... (optional)"
        />
      </label>
    </section>
  );
}
