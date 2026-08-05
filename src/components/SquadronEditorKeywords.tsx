import type { KeywordDefinition } from '../types/squadron';

interface SquadronEditorKeywordsProps {
  keywordIds: string[];
  keywordLibrary: KeywordDefinition[];
  onAddKeyword: (id: string) => void;
  onRemoveKeyword: (id: string) => void;
}

export function SquadronEditorKeywords({
  keywordIds,
  keywordLibrary,
  onAddKeyword,
  onRemoveKeyword,
}: SquadronEditorKeywordsProps) {
  const available = keywordLibrary.filter((k) => !keywordIds.includes(k.id));

  return (
    <section className="editor-section">
      <h3>Keywords</h3>
      <select
        className="add-select"
        value=""
        onChange={(e) => {
          if (e.target.value) onAddKeyword(e.target.value);
          e.target.value = '';
        }}
      >
        <option value="" disabled>
          Add keyword&hellip;
        </option>
        {available.map((k) => (
          <option key={k.id} value={k.id}>
            {k.name}
          </option>
        ))}
      </select>
      <div className="chip-list">
        {keywordIds.length === 0 && <span className="chip-list__empty">No keywords added</span>}
        {keywordIds.map((id) => {
          const kw = keywordLibrary.find((k) => k.id === id);
          if (!kw) return null;
          return (
            <span key={id} className="chip" title={kw.description}>
              {kw.name}
              <button type="button" onClick={() => onRemoveKeyword(id)} aria-label={`Remove ${kw.name}`}>
                &times;
              </button>
            </span>
          );
        })}
      </div>
    </section>
  );
}
