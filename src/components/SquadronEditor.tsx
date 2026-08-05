import { useState } from 'react';
import type { DefenseTokens, DiceColor } from '../types/ship';
import type { KeywordDefinition, SquadronCardData } from '../types/squadron';
import { createBlankSquadron } from '../utils/createBlankSquadron';
import { SquadronCard } from './SquadronCard';
import { SquadronEditorAntiShip } from './SquadronEditorAntiShip';
import { SquadronEditorAntiSquadron } from './SquadronEditorAntiSquadron';
import { SquadronEditorBasicInfo } from './SquadronEditorBasicInfo';
import { SquadronEditorDefenseTokens } from './SquadronEditorDefenseTokens';
import { SquadronEditorKeywords } from './SquadronEditorKeywords';
import { SquadronEditorStats } from './SquadronEditorStats';
import '../styles/forms.css';

const MAX_DEFENSE_TOKENS = 2;

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

  function updateDefenseToken(token: keyof DefenseTokens, count: number) {
    setSquadron((prev) => {
      const defenseTokens = { ...prev.defenseTokens };
      const otherTotal = Object.entries(defenseTokens).reduce(
        (sum, [key, value]) => sum + (key === token ? 0 : (value ?? 0)),
        0,
      );
      const clamped = Math.min(count, Math.max(0, MAX_DEFENSE_TOKENS - otherTotal));
      if (clamped === 0) {
        delete defenseTokens[token];
      } else {
        defenseTokens[token] = clamped;
      }
      return { ...prev, defenseTokens };
    });
  }

  function addKeyword(keywordId: string) {
    setSquadron((prev) =>
      prev.keywords.some((k) => k.keywordId === keywordId)
        ? prev
        : { ...prev, keywords: [...prev.keywords, { keywordId, value: 1 }] },
    );
  }

  function removeKeyword(keywordId: string) {
    setSquadron((prev) => ({ ...prev, keywords: prev.keywords.filter((k) => k.keywordId !== keywordId) }));
  }

  function updateKeywordValue(keywordId: string, value: number) {
    setSquadron((prev) => ({
      ...prev,
      keywords: prev.keywords.map((k) => (k.keywordId === keywordId ? { ...k, value } : k)),
    }));
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
        <SquadronEditorDefenseTokens defenseTokens={squadron.defenseTokens} onUpdateToken={updateDefenseToken} />
        <SquadronEditorKeywords
          keywords={squadron.keywords}
          keywordLibrary={keywordLibrary}
          onAddKeyword={addKeyword}
          onRemoveKeyword={removeKeyword}
          onUpdateKeywordValue={updateKeywordValue}
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
