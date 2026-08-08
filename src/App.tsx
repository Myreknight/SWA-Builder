import { useEffect, useRef, useState } from 'react';
import { KeywordLibraryEditor } from './components/KeywordLibraryEditor';
import { ShipBase } from './components/ShipBase';
import { ShipCard } from './components/ShipCard';
import { ShipEditor } from './components/ShipEditor';
import { ShipTile } from './components/ShipTile';
import { SquadronCard } from './components/SquadronCard';
import { SquadronEditor } from './components/SquadronEditor';
import { SquadronTile } from './components/SquadronTile';
import { UpgradeCardEditor } from './components/UpgradeCardEditor';
import { UpgradeCardPreview } from './components/UpgradeCardPreview';
import { UpgradeCardTile } from './components/UpgradeCardTile';
import { UpgradeSlotLibraryEditor } from './components/UpgradeSlotLibraryEditor';
import { sampleShips } from './data/sampleShips';
import { sampleSquadrons } from './data/sampleSquadrons';
import { sampleUpgradeCards } from './data/sampleUpgradeCards';
import type { ShipCardData, UpgradeSlotDefinition } from './types/ship';
import type { KeywordDefinition, SquadronCardData } from './types/squadron';
import type { UpgradeCardData } from './types/upgrade';
import { downloadBackup, parseBackup } from './utils/backup';
import { loadCustomShips, saveCustomShips } from './utils/customShipsStorage';
import { loadCustomSquadrons, saveCustomSquadrons } from './utils/customSquadronsStorage';
import { loadCustomUpgradeCards, saveCustomUpgradeCards } from './utils/customUpgradeCardsStorage';
import { loadKeywords, saveKeywords } from './utils/keywordLibraryStorage';
import { mergeById } from './utils/mergeById';
import { loadUpgradeSlots, saveUpgradeSlots } from './utils/upgradeSlotLibraryStorage';
import './App.css';

type Tab = 'ships' | 'upgradeTypes' | 'upgradeCards' | 'squadrons' | 'keywords';

const TABS: { id: Tab; label: string }[] = [
  { id: 'ships', label: 'Ships' },
  { id: 'upgradeTypes', label: 'Upgrade Types' },
  { id: 'upgradeCards', label: 'Upgrade Cards' },
  { id: 'squadrons', label: 'Squadrons' },
  { id: 'keywords', label: 'Keywords' },
];

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('ships');
  const [customShips, setCustomShips] = useState<ShipCardData[]>(loadCustomShips);
  const [customSquadrons, setCustomSquadrons] = useState<SquadronCardData[]>(loadCustomSquadrons);
  const [customUpgradeCards, setCustomUpgradeCards] = useState<UpgradeCardData[]>(loadCustomUpgradeCards);
  const [keywords, setKeywords] = useState<KeywordDefinition[]>(loadKeywords);
  const [upgradeSlots, setUpgradeSlots] = useState<UpgradeSlotDefinition[]>(loadUpgradeSlots);
  const [printQueueShips, setPrintQueueShips] = useState<ShipCardData[]>([]);
  const [printQueueSquadrons, setPrintQueueSquadrons] = useState<SquadronCardData[]>([]);
  const [printQueueUpgradeCards, setPrintQueueUpgradeCards] = useState<UpgradeCardData[]>([]);
  const [editingShipId, setEditingShipId] = useState<string | null>(null);
  const [editingSquadronId, setEditingSquadronId] = useState<string | null>(null);
  const [editingUpgradeCardId, setEditingUpgradeCardId] = useState<string | null>(null);

  const shipEditorSectionRef = useRef<HTMLElement>(null);
  const squadronEditorSectionRef = useRef<HTMLElement>(null);
  const upgradeCardEditorSectionRef = useRef<HTMLElement>(null);

  const editingShip = customShips.find((s) => s.id === editingShipId);
  const editingSquadron = customSquadrons.find((s) => s.id === editingSquadronId);
  const editingUpgradeCard = customUpgradeCards.find((c) => c.id === editingUpgradeCardId);

  useEffect(() => {
    saveCustomShips(customShips);
  }, [customShips]);

  useEffect(() => {
    saveCustomSquadrons(customSquadrons);
  }, [customSquadrons]);

  useEffect(() => {
    saveCustomUpgradeCards(customUpgradeCards);
  }, [customUpgradeCards]);

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
    setEditingShipId((prev) => (prev === id ? null : prev));
  }

  function handleSaveShip(ship: ShipCardData) {
    if (editingShipId) {
      setCustomShips((prev) => prev.map((s) => (s.id === ship.id ? ship : s)));
      setEditingShipId(null);
    } else {
      setCustomShips((prev) => [...prev, ship]);
    }
  }

  function handleEditShip(id: string) {
    setEditingShipId(id);
    shipEditorSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function toggleSquadronPrint(squadron: SquadronCardData) {
    setPrintQueueSquadrons((prev) =>
      prev.some((s) => s.id === squadron.id) ? prev.filter((s) => s.id !== squadron.id) : [...prev, squadron],
    );
  }

  function removeCustomSquadron(id: string) {
    setCustomSquadrons((prev) => prev.filter((s) => s.id !== id));
    setPrintQueueSquadrons((prev) => prev.filter((s) => s.id !== id));
    setEditingSquadronId((prev) => (prev === id ? null : prev));
  }

  function handleSaveSquadron(squadron: SquadronCardData) {
    if (editingSquadronId) {
      setCustomSquadrons((prev) => prev.map((s) => (s.id === squadron.id ? squadron : s)));
      setEditingSquadronId(null);
    } else {
      setCustomSquadrons((prev) => [...prev, squadron]);
    }
  }

  function handleEditSquadron(id: string) {
    setEditingSquadronId(id);
    squadronEditorSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function toggleUpgradeCardPrint(card: UpgradeCardData) {
    setPrintQueueUpgradeCards((prev) =>
      prev.some((c) => c.id === card.id) ? prev.filter((c) => c.id !== card.id) : [...prev, card],
    );
  }

  function removeCustomUpgradeCard(id: string) {
    setCustomUpgradeCards((prev) => prev.filter((c) => c.id !== id));
    setPrintQueueUpgradeCards((prev) => prev.filter((c) => c.id !== id));
    setEditingUpgradeCardId((prev) => (prev === id ? null : prev));
  }

  function handleSaveUpgradeCard(card: UpgradeCardData) {
    if (editingUpgradeCardId) {
      setCustomUpgradeCards((prev) => prev.map((c) => (c.id === card.id ? card : c)));
      setEditingUpgradeCardId(null);
    } else {
      setCustomUpgradeCards((prev) => [...prev, card]);
    }
  }

  function handleEditUpgradeCard(id: string) {
    setEditingUpgradeCardId(id);
    upgradeCardEditorSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  function handleExport() {
    downloadBackup({
      ships: customShips,
      squadrons: customSquadrons,
      upgradeCards: customUpgradeCards,
      keywords,
      upgradeSlots,
    });
  }

  function handleImportFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const backup = parseBackup(reader.result as string);
        const confirmed = window.confirm(
          `Merge ${backup.ships.length} ships, ${backup.squadrons.length} squadrons, ` +
            `${backup.upgradeCards.length} upgrade cards, ${backup.keywords.length} keywords, and ` +
            `${backup.upgradeSlots.length} upgrade types from this backup?\n\n` +
            `Cards with a matching id are updated in place; new ones are added. Nothing already on this device is deleted.`,
        );
        if (!confirmed) return;
        setCustomShips((prev) => mergeById(prev, backup.ships));
        setCustomSquadrons((prev) => mergeById(prev, backup.squadrons));
        setCustomUpgradeCards((prev) => mergeById(prev, backup.upgradeCards));
        setKeywords((prev) => mergeById(prev, backup.keywords));
        setUpgradeSlots((prev) => mergeById(prev, backup.upgradeSlots));
      } catch (err) {
        console.warn('Failed to import backup', err);
        window.alert("That file doesn't look like a valid SWA Builder backup.");
      }
    };
    reader.readAsText(file);
  }

  const printCount = printQueueShips.length + printQueueSquadrons.length + printQueueUpgradeCards.length;

  return (
    <div className="app">
      <header className="app__header no-print">
        <h1>SWA Builder</h1>
        <p>Custom Star Wars: Armada ship, squadron, and upgrade card preview</p>
      </header>

      <div className="backup-toolbar no-print">
        <button type="button" onClick={handleExport}>
          Export All
        </button>
        <label className="backup-toolbar__import">
          Import Backup
          <input
            type="file"
            accept="application/json"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImportFile(file);
              e.target.value = '';
            }}
          />
        </label>
      </div>

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
        <section className="app__section no-print" ref={shipEditorSectionRef}>
          <h2>{editingShipId ? 'Edit Ship' : 'Build a Ship'}</h2>
          <ShipEditor
            key={editingShipId ?? 'new-ship'}
            upgradeSlotLibrary={upgradeSlots}
            initialShip={editingShip}
            onSave={handleSaveShip}
            onCancel={() => setEditingShipId(null)}
          />
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
                  onEdit={() => handleEditShip(ship.id)}
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

      <div className={`tab-panel${activeTab === 'upgradeTypes' ? '' : ' tab-panel--hidden'}`}>
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

      <div className={`tab-panel${activeTab === 'upgradeCards' ? '' : ' tab-panel--hidden'}`}>
        <section className="app__section no-print" ref={upgradeCardEditorSectionRef}>
          <h2>{editingUpgradeCardId ? 'Edit Upgrade Card' : 'Build an Upgrade Card'}</h2>
          <UpgradeCardEditor
            key={editingUpgradeCardId ?? 'new-upgrade-card'}
            upgradeSlotLibrary={upgradeSlots}
            initialCard={editingUpgradeCard}
            onSave={handleSaveUpgradeCard}
            onCancel={() => setEditingUpgradeCardId(null)}
          />
        </section>

        {customUpgradeCards.length > 0 && (
          <section className="app__section no-print">
            <h2>Your Upgrade Cards</h2>
            <div className="app__gallery">
              {customUpgradeCards.map((card) => (
                <UpgradeCardTile
                  key={card.id}
                  card={card}
                  upgradeSlotLibrary={upgradeSlots}
                  inQueue={printQueueUpgradeCards.some((c) => c.id === card.id)}
                  onTogglePrint={() => toggleUpgradeCardPrint(card)}
                  onEdit={() => handleEditUpgradeCard(card.id)}
                  onRemove={() => removeCustomUpgradeCard(card.id)}
                />
              ))}
            </div>
          </section>
        )}

        <section className="app__section no-print">
          <h2>Sample Upgrade Cards</h2>
          <div className="app__gallery">
            {sampleUpgradeCards.map((card) => (
              <UpgradeCardTile
                key={card.id}
                card={card}
                upgradeSlotLibrary={upgradeSlots}
                inQueue={printQueueUpgradeCards.some((c) => c.id === card.id)}
                onTogglePrint={() => toggleUpgradeCardPrint(card)}
              />
            ))}
          </div>
        </section>
      </div>

      <div className={`tab-panel${activeTab === 'squadrons' ? '' : ' tab-panel--hidden'}`}>
        <section className="app__section no-print" ref={squadronEditorSectionRef}>
          <h2>{editingSquadronId ? 'Edit Squadron' : 'Build a Squadron'}</h2>
          <SquadronEditor
            key={editingSquadronId ?? 'new-squadron'}
            keywordLibrary={keywords}
            initialSquadron={editingSquadron}
            onSave={handleSaveSquadron}
            onCancel={() => setEditingSquadronId(null)}
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
                  onEdit={() => handleEditSquadron(squadron.id)}
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
          {printQueueUpgradeCards.map((card) => (
            <UpgradeCardPreview key={card.id} card={card} upgradeSlotLibrary={upgradeSlots} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
