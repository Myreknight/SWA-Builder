import type { ShipCardData, UpgradeSlotDefinition } from '../types/ship';
import { ShipBase } from './ShipBase';
import { ShipCard } from './ShipCard';
import '../styles/tile.css';

interface ShipTileProps {
  ship: ShipCardData;
  upgradeSlotLibrary: UpgradeSlotDefinition[];
  inQueue: boolean;
  onTogglePrint: () => void;
  onEdit?: () => void;
  onRemove?: () => void;
}

export function ShipTile({ ship, upgradeSlotLibrary, inQueue, onTogglePrint, onEdit, onRemove }: ShipTileProps) {
  return (
    <div className="tile">
      <div className="tile__outputs">
        <ShipCard ship={ship} upgradeSlotLibrary={upgradeSlotLibrary} />
        <ShipBase ship={ship} />
      </div>
      <div className="tile__actions">
        <button type="button" className={`tile__print-toggle${inQueue ? ' active' : ''}`} onClick={onTogglePrint}>
          {inQueue ? '✓ In Print Queue' : '+ Add to Print Queue'}
        </button>
        {onEdit && (
          <button type="button" className="tile__edit" onClick={onEdit}>
            Edit
          </button>
        )}
        {onRemove && (
          <button type="button" className="tile__remove" onClick={onRemove}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
