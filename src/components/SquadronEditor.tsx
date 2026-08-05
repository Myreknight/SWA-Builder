import { useState } from 'react';
import type { DiceColor } from '../types/ship';
import type { KeywordDefinition, SquadronCardData } from '../types/squadron';
import { createBlankSquadron } from '../utils/createBlankSquadron';
import { SquadronCard } from './SquadronCard';
import { SquadronEditorAntiShip } from './SquadronEditorAntiShip';
import { SquadronEditorAntiSquadron } from './SquadronEditorAntiSquadron';
import { SquadronEditorBasicInfo } from './SquadronEditorBasicInfo';
import { SquadronEditorKeywords } from './SquadronEditorKeywords';
import { SquadronEditorStats } from './SquadronEditorStats';
import '../styles/forms.css';

interface SquadronEditorProps {
  keywordLibrary: KeywordDefinition[];
  onAdd: (squadron: SquadronCardData) => void;
}

export function SquadronEditor({ keywordLibrary, onAdd }: SquadronEditorProps) {
  const [squadron, setSquadron] = useState<SquadronCardData>(createBlankSquadron);

  function update<K extends keyof SquadronCardData>(key: K, value: SquadronCardData[K]) {
    setSquadron((prev) => ({ ...prev, [key]: value }));
  }

  function updateAntiSquadronDie(color: DiceColor, value: number) {
    setSquadron((prev) => ({
      ...prev,
      antiSquadronArmament: { ...prev.antiSquadronArmament, [color]: value },
    }));
  }

  function updateAntiShipDie(color: DiceColor, value: number) {
    setSquadron((prev) => ({
      ...prev,
      antiShipArmament: { ...prev.antiShipArmament, [color]: value },
    }));
  }

  function addKeyword(id: string) {
    setSquadron((prev) => (prev.keywordIds.includes(id) ? prev : { ...prev, keywordIds: [...prev.keywordIds, id] }));
  }

  function removeKeyword(id: string) {
    setSquadron((prev) => ({ ...prev, keywordIds: prev.keywordIds.filter((k) => k !== id) }));
  }

  function handleAdd() {
    onAdd(squadron);
    setSquadron(createBlankSquadron());
  }

  return (
    <div className="card-editor">
      <div className="card-editor__form">
        <SquadronEditorBasicInfo squadron={squadron} update={update} />
        <SquadronEditorStats squadron={squadron} update={update} />
        <SquadronEditorAntiSquadron dice={squadron.antiSquadronArmament} onUpdateDie={updateAntiSquadronDie} />
        <SquadronEditorAntiShip dice={squadron.antiShipArmament} onUpdateDie={updateAntiShipDie} />
        <SquadronEditorKeywords
          keywordIds={squadron.keywordIds}
          keywordLibrary={keywordLibrary}
          onAddKeyword={addKeyword}
          onRemoveKeyword={removeKeyword}
        />

        <button type="button" className="add-item-button" onClick={handleAdd} disabled={!squadron.name}>
          Add Squadron to Gallery
        </button>
      </div>

      <div className="card-editor__preview">
        <h3>Live Preview</h3>
        <SquadronCard squadron={squadron} keywords={keywordLibrary} />
      </div>
    </div>
  );
}
