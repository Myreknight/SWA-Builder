import type { KeywordDefinition, SquadronKeywordAssignment } from '../types/squadron';

interface SquadronEditorKeywordsProps {
  keywords: SquadronKeywordAssignment[];
  keywordLibrary: KeywordDefinition[];
  onAddKeyword: (id: string) => void;
  onRemoveKeyword: (id: string) => void;
  onUpdateKeywordValue: (id: string, value: number) => void;
}

export function SquadronEditorKeywords({
  keywords,
  keywordLibrary,
  onAddKeyword,
  onRemoveKeyword,
  onUpdateKeywordValue,
}: SquadronEditorKeywordsProps) {
  const assignedIds = keywords.map((k) => k.keywordId);
  const available = keywordLibrary.filter((k) => !assignedIds.includes(k.id));

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
        {keywords.length === 0 && <span className="chip-list__empty">No keywords added</span>}
        {keywords.map((assignment) => {
          const def = keywordLibrary.find((k) => k.id === assignment.keywordId);
          if (!def) return null;
          return (
            <span key={assignment.keywordId} className="chip" title={def.description}>
              {def.name}
              {def.hasValue && (
                <input
                  type="number"
                  min={0}
                  className="chip__value"
                  value={assignment.value ?? 1}
                  onChange={(e) => onUpdateKeywordValue(assignment.keywordId, Number(e.target.value))}
                  aria-label={`${def.name} value`}
                />
              )}
              <button
                type="button"
                onClick={() => onRemoveKeyword(assignment.keywordId)}
                aria-label={`Remove ${def.name}`}
              >
                &times;
              </button>
            </span>
          );
        })}
      </div>
    </section>
  );
}
