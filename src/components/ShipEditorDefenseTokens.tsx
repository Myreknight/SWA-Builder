import type { DefenseTokens } from '../types/ship';

const DEFENSE_TOKEN_KEYS: (keyof DefenseTokens)[] = ['redirect', 'evade', 'brace', 'contain', 'salvo'];
const TOKEN_COUNT_OPTIONS = [0, 1, 2, 3];

interface ShipEditorDefenseTokensProps {
  defenseTokens: DefenseTokens;
  onUpdateToken: (token: keyof DefenseTokens, count: number) => void;
}

export function ShipEditorDefenseTokens({ defenseTokens, onUpdateToken }: ShipEditorDefenseTokensProps) {
  return (
    <section className="editor-section">
      <h3>Defense Tokens</h3>
      <div className="field-row">
        {DEFENSE_TOKEN_KEYS.map((token) => (
          <label key={token} className="field field--narrow">
            <span>{token}</span>
            <select
              value={defenseTokens[token] ?? 0}
              onChange={(e) => onUpdateToken(token, Number(e.target.value))}
            >
              {TOKEN_COUNT_OPTIONS.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>
    </section>
  );
}
