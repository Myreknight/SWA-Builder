import { UPGRADE_SLOT_OPTIONS } from '../types/ship';
import type { UpgradeSlot } from '../types/ship';

interface ShipEditorUpgradeSlotsProps {
  upgradeSlots: UpgradeSlot[];
  onAddSlot: (slot: UpgradeSlot) => void;
  onRemoveSlot: (index: number) => void;
}

export function ShipEditorUpgradeSlots({ upgradeSlots, onAddSlot, onRemoveSlot }: ShipEditorUpgradeSlotsProps) {
  return (
    <section className="editor-section">
      <h3>Upgrade Slots</h3>
      <select
        className="add-select"
        value=""
        onChange={(e) => {
          if (e.target.value) onAddSlot(e.target.value as UpgradeSlot);
          e.target.value = '';
        }}
      >
        <option value="" disabled>
          Add slot&hellip;
        </option>
        {UPGRADE_SLOT_OPTIONS.map((slot) => (
          <option key={slot} value={slot}>
            {slot}
          </option>
        ))}
      </select>
      <div className="chip-list">
        {upgradeSlots.length === 0 && <span className="chip-list__empty">No upgrade slots added</span>}
        {upgradeSlots.map((slot, i) => (
          <span key={`${slot}-${i}`} className="chip">
            {slot}
            <button type="button" onClick={() => onRemoveSlot(i)} aria-label={`Remove ${slot}`}>
              &times;
            </button>
          </span>
        ))}
      </div>
    </section>
  );
}
