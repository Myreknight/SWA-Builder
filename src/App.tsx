import { useEffect, useState } from 'react';
import { KeywordLibraryEditor } from './components/KeywordLibraryEditor';
import { ShipBase } from './components/ShipBase';
import { ShipCard } from './components/ShipCard';
import { ShipEditor } from './components/ShipEditor';
import { ShipTile } from './components/ShipTile';
import { SquadronCard } from './components/SquadronCard';
import { SquadronEditor } from './components/SquadronEditor';
import { SquadronTile } from './components/SquadronTile';
import { UpgradeSlotLibraryEditor } from './components/UpgradeSlotLibraryEditor';
import { sampleShips } from './data/sampleShips';
import { sampleSquadrons } from './data/sampleSquadrons';
import type { ShipCardData, UpgradeSlotDefinition } from './types/ship';
import type { KeywordDefinition, SquadronCardData } from './types/squadron';
import { loadCustomShips, saveCustomShips } from './utils/customShipsStorage';
import { loadCustomSquadrons, saveCustomSquadrons } from './utils/customSquadronsStorage';
import { loadKeywords, saveKeywords } from './utils/keywordLibraryStorage';
import { loadUpgradeSlots, saveUpgradeSlots } from './utils/upgradeSlotLibraryStorage';
import './App.css';

type Tab = 'ships' | 'upgrades' | 'squadrons' | 'keywords';

const TABS: { id: Tab; label: string }[] = [
  { id: 'ships', label: 'Ships' },
  { id: 'upgrades', label: 'Upgrades' },
  { id: 'squadrons', label: 'Squadrons' },
  { id: 'keywords', label: 'Keywords' },
];

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('ships');
  const [customShips, setCustomShips] = useState<ShipCardData[]>(loadCustomShips);
  const [customSquadrons, setCustomSquadrons] = useState<SquadronCardData[]>(loadCustomSquadrons);
  const [keywords, setKeywords] = useState<KeywordDefinition[]>(loadKeywords);
  const [upgradeSlots, setUpgradeSlots] = useState<UpgradeSlotDefinition[]>(loadUpgradeSlots);
  const [printQueueShips, setPrintQueueShips] = useState<ShipCardData[]>([]);
  const [printQueueSquadrons, setPrintQueueSquadrons] = useState<SquadronCardData[]>([]);

  useEffect(() => {
    saveCustomShips(customShips);
  }, [customShips]);

  useEffect(() => {
    saveCustomSquadrons(customSquadrons);
  }, [customSquadrons]);

  useEffect(() => {
    saveKeywords(keywords);
  }, [keywords]);

  useEffect(() => {
    saveUpgradeSlots(upgradeSlots);
  }, [upgradeSlots]);

  function toggleShipPrint(ship: ShipCardData) {
    setPrintQueueShips((prev) =>
      prev.some((s) => s.id === ship.id) ? prev.filter((s) => s.id !== ship.id) : [...prev, ship],
    );
  }

  function removeCustomShip(id: string) {
    setCustomShips((prev) => prev.filter((s) => s.id !== id));
    setPrintQueueShips((prev) => prev.filter((s) => s.id !== id));
  }

  function toggleSquadronPrint(squadron: SquadronCardData) {
    setPrintQueueSquadrons((prev) =>
      prev.some((s) => s.id === squadron.id) ? prev.filter((s) => s.id !== squadron.id) : [...prev, squadron],
    );
  }

  function removeCustomSquadron(id: string) {
    setCustomSquadrons((prev) => prev.filter((s) => s.id !== id));
    setPrintQueueSquadrons((prev) => prev.filter((s) => s.id !== id));
  }

  function addKeyword(keyword: KeywordDefinition) {
    setKeywords((prev) => [...prev, keyword]);
  }

  function updateKeyword(id: string, patch: Partial<KeywordDefinition>) {
    setKeywords((prev) => prev.map((k) => (k.id === id ? { ...k, ...patch } : k)));
  }

  function removeKeyword(id: string) {
    setKeywords((prev) => prev.filter((k) => k.id !== id));
    setCustomSquadrons((prev) =>
      prev.map((s) => ({ ...s, keywords: s.keywords.filter((k) => k.keywordId !== id) })),
    );
  }

  function addUpgradeSlot(slot: UpgradeSlotDefinition) {
    setUpgradeSlots((prev) => [...prev, slot]);
  }

  function updateUpgradeSlot(id: string, patch: Partial<UpgradeSlotDefinition>) {
    setUpgradeSlots((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  }

  function removeUpgradeSlot(id: string) {
    setUpgradeSlots((prev) => prev.filter((s) => s.id !== id));
    setCustomShips((prev) =>
      prev.map((s) => ({ ...s, upgradeSlots: s.upgradeSlots.filter((slotId) => slotId !== id) })),
    );
  }

  const printCount = printQueueShips.length + printQueueSquadrons.length;

  return (
    <div className="app">
      <header className="app__header no-print">
        <h1>SWA Builder</h1>
        <p>Custom Star Wars: Armada ship and squadron card preview</p>
      </header>

      <nav className="tab-nav no-print">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`tab-nav__link${activeTab === tab.id ? ' active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <div className={`tab-panel${activeTab === 'ships' ? '' : ' tab-panel--hidden'}`}>
        <section className="app__section no-print">
          <h2>Build a Ship</h2>
          <ShipEditor upgradeSlotLibrary={upgradeSlots} onAdd={(ship) => setCustomShips((prev) => [...prev, ship])} />
        </section>

        {customShips.length > 0 && (
          <section className="app__section no-print">
            <h2>Your Ships</h2>
            <div className="app__gallery">
              {customShips.map((ship) => (
                <ShipTile
                  key={ship.id}
                  ship={ship}
                  upgradeSlotLibrary={upgradeSlots}
                  inQueue={printQueueShips.some((s) => s.id === ship.id)}
                  onTogglePrint={() => toggleShipPrint(ship)}
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
                upgradeSlotLibrary={upgradeSlots}
                inQueue={printQueueShips.some((s) => s.id === ship.id)}
                onTogglePrint={() => toggleShipPrint(ship)}
              />
            ))}
          </div>
        </section>
      </div>

      <div className={`tab-panel${activeTab === 'upgrades' ? '' : ' tab-panel--hidden'}`}>
        <section className="app__section no-print">
          <h2>Upgrade Slot Library</h2>
          <UpgradeSlotLibraryEditor
            upgradeSlots={upgradeSlots}
            onAdd={addUpgradeSlot}
            onUpdate={updateUpgradeSlot}
            onRemove={removeUpgradeSlot}
          />
        </section>
      </div>

      <div className={`tab-panel${activeTab === 'squadrons' ? '' : ' tab-panel--hidden'}`}>
        <section className="app__section no-print">
          <h2>Build a Squadron</h2>
          <SquadronEditor
            keywordLibrary={keywords}
            onAdd={(squadron) => setCustomSquadrons((prev) => [...prev, squadron])}
          />
        </section>

        {customSquadrons.length > 0 && (
          <section className="app__section no-print">
            <h2>Your Squadrons</h2>
            <div className="app__gallery">
              {customSquadrons.map((squadron) => (
                <SquadronTile
                  key={squadron.id}
                  squadron={squadron}
                  keywords={keywords}
                  inQueue={printQueueSquadrons.some((s) => s.id === squadron.id)}
                  onTogglePrint={() => toggleSquadronPrint(squadron)}
                  onRemove={() => removeCustomSquadron(squadron.id)}
                />
              ))}
            </div>
          </section>
        )}

        <section className="app__section no-print">
          <h2>Sample Squadrons</h2>
          <div className="app__gallery">
            {sampleSquadrons.map((squadron) => (
              <SquadronTile
                key={squadron.id}
                squadron={squadron}
                keywords={keywords}
                inQueue={printQueueSquadrons.some((s) => s.id === squadron.id)}
                onTogglePrint={() => toggleSquadronPrint(squadron)}
              />
            ))}
          </div>
        </section>
      </div>

      <div className={`tab-panel${activeTab === 'keywords' ? '' : ' tab-panel--hidden'}`}>
        <section className="app__section no-print">
          <h2>Keyword Library</h2>
          <KeywordLibraryEditor
            keywords={keywords}
            onAdd={addKeyword}
            onUpdate={updateKeyword}
            onRemove={removeKeyword}
          />
        </section>
      </div>

      <section className="app__section print-section">
        <div className="print-section__toolbar no-print">
          <h2>Print Queue ({printCount})</h2>
          <button type="button" onClick={() => window.print()} disabled={printCount === 0}>
            Print
          </button>
        </div>
        <div className="app__gallery print-area">
          {printQueueShips.map((ship) => (
            <div key={ship.id} className="print-pair">
              <ShipCard ship={ship} upgradeSlotLibrary={upgradeSlots} />
              <ShipBase ship={ship} />
            </div>
          ))}
          {printQueueSquadrons.map((squadron) => (
            <SquadronCard key={squadron.id} squadron={squadron} keywords={keywords} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
