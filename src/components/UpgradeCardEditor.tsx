import { useState } from 'react';
import type { UpgradeSlotDefinition } from '../types/ship';
import type { UpgradeCardData } from '../types/upgrade';
import { createBlankUpgradeCard } from '../utils/createBlankUpgradeCard';
import { UpgradeCardPreview } from './UpgradeCardPreview';
import '../styles/forms.css';

interface UpgradeCardEditorProps {
  upgradeSlotLibrary: UpgradeSlotDefinition[];
  onAdd: (card: UpgradeCardData) => void;
}

export function UpgradeCardEditor({ upgradeSlotLibrary, onAdd }: UpgradeCardEditorProps) {
  const [card, setCard] = useState<UpgradeCardData>(createBlankUpgradeCard);

  function update<K extends keyof UpgradeCardData>(key: K, value: UpgradeCardData[K]) {
    setCard((prev) => ({ ...prev, [key]: value }));
  }

  function handleAdd() {
    onAdd(card);
    setCard(createBlankUpgradeCard());
  }

  return (
    <div className="card-editor">
      <div className="card-editor__form">
        <section className="editor-section">
          <h3>Basic Info</h3>
          <label className="field">
            <span>Name</span>
            <input
              value={card.name}
              onChange={(e) => update('name', e.target.value)}
              placeholder="Upgrade card name"
            />
          </label>
          <div className="field-row">
            <label className="field">
              <span>Upgrade Type</span>
              <select value={card.upgradeSlotId} onChange={(e) => update('upgradeSlotId', e.target.value)}>
                <option value="" disabled>
                  Select type&hellip;
                </option>
                {upgradeSlotLibrary.map((slot) => (
                  <option key={slot.id} value={slot.id}>
                    {slot.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="field">
              <span>Points</span>
              <input
                type="number"
                min={0}
                value={card.points}
                onChange={(e) => update('points', Number(e.target.value))}
              />
            </label>
            <label className="field field--narrow">
              <span>Border Color</span>
              <input type="color" value={card.accentColor} onChange={(e) => update('accentColor', e.target.value)} />
            </label>
          </div>
          <label className="field">
            <span>Upload Image</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = () => update('artUrl', reader.result as string);
                reader.readAsDataURL(file);
              }}
            />
          </label>
          <label className="field">
            <span>Or Paste Image URL</span>
            <input
              value={card.artUrl}
              onChange={(e) => update('artUrl', e.target.value)}
              placeholder="https://... (optional)"
            />
          </label>
          <label className="field">
            <span>Card Text</span>
            <textarea
              value={card.text}
              onChange={(e) => update('text', e.target.value)}
              rows={5}
              placeholder="Ability / rules text"
            />
          </label>
        </section>

        <button type="button" className="add-item-button" onClick={handleAdd} disabled={!card.name}>
          Add Upgrade Card to Gallery
        </button>
      </div>

      <div className="card-editor__preview">
        <h3>Live Preview</h3>
        <UpgradeCardPreview card={card} upgradeSlotLibrary={upgradeSlotLibrary} />
      </div>
    </div>
  );
}
