import type { ShipCardData } from '../types/ship';
import { ShipBase } from './ShipBase';
import { ShipCard } from './ShipCard';
import './ShipTile.css';

interface ShipTileProps {
  ship: ShipCardData;
  inQueue: boolean;
  onTogglePrint: () => void;
  onRemove?: () => void;
}

export function ShipTile({ ship, inQueue, onTogglePrint, onRemove }: ShipTileProps) {
  return (
    <div className="ship-tile">
      <div className="ship-tile__outputs">
        <ShipCard ship={ship} />
        <ShipBase ship={ship} />
      </div>
      <div className="ship-tile__actions">
        <button
          type="button"
          className={`ship-tile__print-toggle${inQueue ? ' active' : ''}`}
          onClick={onTogglePrint}
        >
          {inQueue ? '✓ In Print Queue' : '+ Add to Print Queue'}
        </button>
        {onRemove && (
          <button type="button" className="ship-tile__remove" onClick={onRemove}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
