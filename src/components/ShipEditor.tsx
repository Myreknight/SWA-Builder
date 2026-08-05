import { useState } from 'react';
import type { DefenseTokens, DiceColor, Facing, ShipCardData, UpgradeSlot } from '../types/ship';
import { jointsForSpeed } from '../types/ship';
import { createBlankShip } from '../utils/createBlankShip';
import { ShipBase } from './ShipBase';
import { ShipCard } from './ShipCard';
import { ShipEditorAntiSquadron } from './ShipEditorAntiSquadron';
import { ShipEditorArmament } from './ShipEditorArmament';
import { ShipEditorBasicInfo } from './ShipEditorBasicInfo';
import { ShipEditorCoreStats } from './ShipEditorCoreStats';
import { ShipEditorDefenseTokens } from './ShipEditorDefenseTokens';
import { ShipEditorShields } from './ShipEditorShields';
import { ShipEditorSpeedYaw } from './ShipEditorSpeedYaw';
import { ShipEditorUpgradeSlots } from './ShipEditorUpgradeSlots';
import '../styles/forms.css';
import './ShipEditor.css';

interface ShipEditorProps {
  onAdd: (ship: ShipCardData) => void;
}

export function ShipEditor({ onAdd }: ShipEditorProps) {
  const [ship, setShip] = useState<ShipCardData>(createBlankShip);

  function update<K extends keyof ShipCardData>(key: K, value: ShipCardData[K]) {
    setShip((prev) => ({ ...prev, [key]: value }));
  }

  function updateShield(facing: Facing, value: number) {
    setShip((prev) => ({ ...prev, shields: { ...prev.shields, [facing]: value } }));
  }

  function updateArmamentDie(facing: Facing, color: DiceColor, value: number) {
    setShip((prev) => ({
      ...prev,
      armament: {
        ...prev.armament,
        [facing]: { ...prev.armament[facing], [color]: value },
      },
    }));
  }

  function updateAntiSquadronColor(color: DiceColor) {
    setShip((prev) => ({ ...prev, antiSquadronArmament: { ...prev.antiSquadronArmament, color } }));
  }

  function updateAntiSquadronCount(count: number) {
    setShip((prev) => ({ ...prev, antiSquadronArmament: { ...prev.antiSquadronArmament, count } }));
  }

  function updateDefenseToken(token: keyof DefenseTokens, count: number) {
    setShip((prev) => {
      const defenseTokens = { ...prev.defenseTokens };
      if (count === 0) {
        delete defenseTokens[token];
      } else {
        defenseTokens[token] = count;
      }
      return { ...prev, defenseTokens };
    });
  }

  function toggleSpeed(value: number) {
    setShip((prev) => ({
      ...prev,
      speed: prev.speed.some((entry) => entry.speed === value)
        ? prev.speed.filter((entry) => entry.speed !== value)
        : [...prev.speed, { speed: value, yaws: Array(jointsForSpeed(value)).fill(0) }].sort(
            (a, b) => a.speed - b.speed,
          ),
    }));
  }

  function updateYaw(value: number, jointIndex: number, yaw: number) {
    setShip((prev) => ({
      ...prev,
      speed: prev.speed.map((entry) =>
        entry.speed === value
          ? { ...entry, yaws: entry.yaws.map((y, i) => (i === jointIndex ? yaw : y)) }
          : entry,
      ),
    }));
  }

  function addUpgradeSlot(slot: UpgradeSlot) {
    setShip((prev) => ({ ...prev, upgradeSlots: [...prev.upgradeSlots, slot] }));
  }

  function removeUpgradeSlot(index: number) {
    setShip((prev) => ({ ...prev, upgradeSlots: prev.upgradeSlots.filter((_, i) => i !== index) }));
  }

  function handleAdd() {
    onAdd(ship);
    setShip(createBlankShip());
  }

  return (
    <div className="card-editor">
      <div className="card-editor__form">
        <ShipEditorBasicInfo ship={ship} update={update} />
        <ShipEditorCoreStats ship={ship} update={update} />
        <ShipEditorSpeedYaw speed={ship.speed} onToggleSpeed={toggleSpeed} onUpdateYaw={updateYaw} />
        <ShipEditorShields shields={ship.shields} onUpdateShield={updateShield} />
        <ShipEditorArmament armament={ship.armament} onUpdateDie={updateArmamentDie} />
        <ShipEditorAntiSquadron
          antiSquadronArmament={ship.antiSquadronArmament}
          onUpdateColor={updateAntiSquadronColor}
          onUpdateCount={updateAntiSquadronCount}
        />
        <ShipEditorDefenseTokens defenseTokens={ship.defenseTokens} onUpdateToken={updateDefenseToken} />
        <ShipEditorUpgradeSlots
          upgradeSlots={ship.upgradeSlots}
          onAddSlot={addUpgradeSlot}
          onRemoveSlot={removeUpgradeSlot}
        />

        <button type="button" className="add-item-button" onClick={handleAdd} disabled={!ship.name}>
          Add Ship to Gallery
        </button>
      </div>

      <div className="card-editor__preview">
        <h3>Live Preview</h3>
        <ShipCard ship={ship} />
        <ShipBase ship={ship} />
      </div>
    </div>
  );
}
