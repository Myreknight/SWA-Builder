import type { UpgradeSlot, UpgradeSlotDefinition } from '../types/ship';

interface ShipEditorUpgradeSlotsProps {
  upgradeSlots: UpgradeSlot[];
  upgradeSlotLibrary: UpgradeSlotDefinition[];
  onAddSlot: (slotId: UpgradeSlot) => void;
  onRemoveSlot: (index: number) => void;
}

export function ShipEditorUpgradeSlots({
  upgradeSlots,
  upgradeSlotLibrary,
  onAddSlot,
  onRemoveSlot,
}: ShipEditorUpgradeSlotsProps) {
  return (
    <section className="editor-section">
      <h3>Upgrade Slots</h3>
      <select
        className="add-select"
        value=""
        onChange={(e) => {
          if (e.target.value) onAddSlot(e.target.value);
          e.target.value = '';
        }}
      >
        <option value="" disabled>
          Add slot&hellip;
        </option>
        {upgradeSlotLibrary.map((slot) => (
          <option key={slot.id} value={slot.id}>
            {slot.name}
          </option>
        ))}
      </select>
      <div className="chip-list">
        {upgradeSlots.length === 0 && <span className="chip-list__empty">No upgrade slots added</span>}
        {upgradeSlots.map((slotId, i) => {
          const def = upgradeSlotLibrary.find((s) => s.id === slotId);
          return (
            <span key={`${slotId}-${i}`} className="chip">
              {def?.name ?? slotId}
              <button type="button" onClick={() => onRemoveSlot(i)} aria-label={`Remove ${def?.name ?? slotId}`}>
                &times;
              </button>
            </span>
          );
        })}
      </div>
    </section>
  );
}
