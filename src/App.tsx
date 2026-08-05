import { useEffect, useState } from 'react';
import { ShipBase } from './components/ShipBase';
import { ShipCard } from './components/ShipCard';
import { ShipEditor } from './components/ShipEditor';
import { ShipTile } from './components/ShipTile';
import { sampleShips } from './data/sampleShips';
import type { ShipCardData } from './types/ship';
import { loadCustomShips, saveCustomShips } from './utils/customShipsStorage';
import './App.css';

function App() {
  const [customShips, setCustomShips] = useState<ShipCardData[]>(loadCustomShips);
  const [printQueue, setPrintQueue] = useState<ShipCardData[]>([]);

  useEffect(() => {
    saveCustomShips(customShips);
  }, [customShips]);

  function togglePrint(ship: ShipCardData) {
    setPrintQueue((prev) =>
      prev.some((s) => s.id === ship.id) ? prev.filter((s) => s.id !== ship.id) : [...prev, ship],
    );
  }

  function removeCustomShip(id: string) {
    setCustomShips((prev) => prev.filter((s) => s.id !== id));
    setPrintQueue((prev) => prev.filter((s) => s.id !== id));
  }

  return (
    <div className="app">
      <header className="app__header no-print">
        <h1>SWA Builder</h1>
        <p>Custom Star Wars: Armada ship card preview</p>
      </header>

      <section className="app__section no-print">
        <h2>Build a Ship</h2>
        <ShipEditor onAdd={(ship) => setCustomShips((prev) => [...prev, ship])} />
      </section>

      {customShips.length > 0 && (
        <section className="app__section no-print">
          <h2>Your Ships</h2>
          <div className="app__gallery">
            {customShips.map((ship) => (
              <ShipTile
                key={ship.id}
                ship={ship}
                inQueue={printQueue.some((s) => s.id === ship.id)}
                onTogglePrint={() => togglePrint(ship)}
                onRemove={() => removeCustomShip(ship.id)}
              />
            ))}
          </div>
        </section>
      )}

      <section className="app__section no-print">
        <h2>Sample Ships</h2>
        <div className="app__gallery">
          {sampleShips.map((ship) => (
            <ShipTile
              key={ship.id}
              ship={ship}
              inQueue={printQueue.some((s) => s.id === ship.id)}
              onTogglePrint={() => togglePrint(ship)}
            />
          ))}
        </div>
      </section>

      <section className="app__section print-section">
        <div className="print-section__toolbar no-print">
          <h2>Print Queue ({printQueue.length})</h2>
          <button type="button" onClick={() => window.print()} disabled={printQueue.length === 0}>
            Print
          </button>
        </div>
        <div className="app__gallery print-area">
          {printQueue.map((ship) => (
            <div key={ship.id} className="print-pair">
              <ShipCard ship={ship} />
              <ShipBase ship={ship} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
