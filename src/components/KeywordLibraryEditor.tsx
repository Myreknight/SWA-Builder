import { useState } from 'react';
import type { KeywordDefinition } from '../types/squadron';
import '../styles/forms.css';
import './KeywordLibraryEditor.css';

interface KeywordLibraryEditorProps {
  keywords: KeywordDefinition[];
  onAdd: (keyword: KeywordDefinition) => void;
  onUpdate: (id: string, patch: Partial<KeywordDefinition>) => void;
  onRemove: (id: string) => void;
}

export function KeywordLibraryEditor({ keywords, onAdd, onUpdate, onRemove }: KeywordLibraryEditorProps) {
  const [draftName, setDraftName] = useState('');
  const [draftDescription, setDraftDescription] = useState('');

  function handleAdd() {
    if (!draftName.trim()) return;
    onAdd({ id: crypto.randomUUID(), name: draftName.trim(), description: draftDescription.trim() });
    setDraftName('');
    setDraftDescription('');
  }

  return (
    <div className="keyword-library">
      <div className="keyword-library__list">
        {keywords.map((kw) => (
          <div key={kw.id} className="keyword-row">
            <input
              className="keyword-row__name"
              value={kw.name}
              onChange={(e) => onUpdate(kw.id, { name: e.target.value })}
              aria-label="Keyword name"
            />
            <textarea
              className="keyword-row__description"
              value={kw.description}
              onChange={(e) => onUpdate(kw.id, { description: e.target.value })}
              rows={2}
              aria-label="Keyword description"
            />
            <button
              type="button"
              className="keyword-row__remove"
              onClick={() => onRemove(kw.id)}
              aria-label={`Remove ${kw.name || 'keyword'}`}
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      <div className="keyword-row keyword-row--new">
        <input
          className="keyword-row__name"
          value={draftName}
          onChange={(e) => setDraftName(e.target.value)}
          placeholder="New keyword name"
        />
        <textarea
          className="keyword-row__description"
          value={draftDescription}
          onChange={(e) => setDraftDescription(e.target.value)}
          placeholder="What does it do?"
          rows={2}
        />
        <button type="button" className="add-item-button" onClick={handleAdd} disabled={!draftName.trim()}>
          Add
        </button>
      </div>
    </div>
  );
}
