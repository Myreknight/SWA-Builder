import { useState } from 'react';
import type { KeywordDefinition } from '../types/squadron';
import '../styles/forms.css';
import '../styles/libraryEditor.css';
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
  const [draftHasValue, setDraftHasValue] = useState(false);

  function handleAdd() {
    if (!draftName.trim()) return;
    onAdd({
      id: crypto.randomUUID(),
      name: draftName.trim(),
      description: draftDescription.trim(),
      hasValue: draftHasValue,
    });
    setDraftName('');
    setDraftDescription('');
    setDraftHasValue(false);
  }

  return (
    <div className="library-editor">
      <div className="library-list">
        {keywords.map((kw) => (
          <div key={kw.id} className="library-row library-row--with-description">
            <div className="keyword-row__name-col">
              <input
                className="library-row__name"
                value={kw.name}
                onChange={(e) => onUpdate(kw.id, { name: e.target.value })}
                aria-label="Keyword name"
              />
              <label className="keyword-row__has-value">
                <input
                  type="checkbox"
                  checked={!!kw.hasValue}
                  onChange={(e) => onUpdate(kw.id, { hasValue: e.target.checked })}
                />
                <span>Has value (e.g. Counter 2)</span>
              </label>
            </div>
            <textarea
              className="keyword-row__description"
              value={kw.description}
              onChange={(e) => onUpdate(kw.id, { description: e.target.value })}
              rows={2}
              aria-label="Keyword description"
            />
            <button
              type="button"
              className="library-row__remove"
              onClick={() => onRemove(kw.id)}
              aria-label={`Remove ${kw.name || 'keyword'}`}
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      <div className="library-row library-row--with-description library-row--new">
        <div className="keyword-row__name-col">
          <input
            className="library-row__name"
            value={draftName}
            onChange={(e) => setDraftName(e.target.value)}
            placeholder="New keyword name"
          />
          <label className="keyword-row__has-value">
            <input type="checkbox" checked={draftHasValue} onChange={(e) => setDraftHasValue(e.target.checked)} />
            <span>Has value (e.g. Counter 2)</span>
          </label>
        </div>
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
