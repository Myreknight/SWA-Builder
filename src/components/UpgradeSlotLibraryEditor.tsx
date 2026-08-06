import { useState } from 'react';
import type { UpgradeSlotDefinition } from '../types/ship';
import '../styles/forms.css';
import '../styles/libraryEditor.css';

interface UpgradeSlotLibraryEditorProps {
  upgradeSlots: UpgradeSlotDefinition[];
  onAdd: (slot: UpgradeSlotDefinition) => void;
  onUpdate: (id: string, patch: Partial<UpgradeSlotDefinition>) => void;
  onRemove: (id: string) => void;
}

export function UpgradeSlotLibraryEditor({ upgradeSlots, onAdd, onUpdate, onRemove }: UpgradeSlotLibraryEditorProps) {
  const [draftName, setDraftName] = useState('');

  function handleAdd() {
    if (!draftName.trim()) return;
    onAdd({ id: crypto.randomUUID(), name: draftName.trim() });
    setDraftName('');
  }

  return (
    <div className="library-editor">
      <div className="library-list">
        {upgradeSlots.map((slot) => (
          <div key={slot.id} className="library-row">
            <input
              className="library-row__name"
              value={slot.name}
              onChange={(e) => onUpdate(slot.id, { name: e.target.value })}
              aria-label="Upgrade slot name"
            />
            <button
              type="button"
              className="library-row__remove"
              onClick={() => onRemove(slot.id)}
              aria-label={`Remove ${slot.name || 'upgrade slot'}`}
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      <div className="library-row library-row--new">
        <input
          className="library-row__name"
          value={draftName}
          onChange={(e) => setDraftName(e.target.value)}
          placeholder="New upgrade slot name"
        />
        <button type="button" className="add-item-button" onClick={handleAdd} disabled={!draftName.trim()}>
          Add
        </button>
      </div>
    </div>
  );
}
