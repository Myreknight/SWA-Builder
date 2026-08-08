import type { UpgradeSlotDefinition } from '../types/ship';
import type { UpgradeCardData } from '../types/upgrade';
import { UpgradeCardPreview } from './UpgradeCardPreview';
import '../styles/tile.css';

interface UpgradeCardTileProps {
  card: UpgradeCardData;
  upgradeSlotLibrary: UpgradeSlotDefinition[];
  inQueue: boolean;
  onTogglePrint: () => void;
  onEdit?: () => void;
  onRemove?: () => void;
}

export function UpgradeCardTile({
  card,
  upgradeSlotLibrary,
  inQueue,
  onTogglePrint,
  onEdit,
  onRemove,
}: UpgradeCardTileProps) {
  return (
    <div className="tile">
      <div className="tile__outputs">
        <UpgradeCardPreview card={card} upgradeSlotLibrary={upgradeSlotLibrary} />
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
