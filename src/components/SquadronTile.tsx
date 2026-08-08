import type { KeywordDefinition, SquadronCardData } from '../types/squadron';
import { SquadronCard } from './SquadronCard';
import '../styles/tile.css';

interface SquadronTileProps {
  squadron: SquadronCardData;
  keywords: KeywordDefinition[];
  inQueue: boolean;
  onTogglePrint: () => void;
  onEdit?: () => void;
  onRemove?: () => void;
}

export function SquadronTile({ squadron, keywords, inQueue, onTogglePrint, onEdit, onRemove }: SquadronTileProps) {
  return (
    <div className="tile">
      <div className="tile__outputs">
        <SquadronCard squadron={squadron} keywords={keywords} />
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
