import type { DefenseTokens } from '../types/ship';
import { DEFENSE_TOKEN_KEYS } from '../types/ship';

const TOKEN_COUNT_OPTIONS = [0, 1, 2];

interface SquadronEditorDefenseTokensProps {
  defenseTokens: DefenseTokens;
  onUpdateToken: (token: keyof DefenseTokens, count: number) => void;
}

export function SquadronEditorDefenseTokens({ defenseTokens, onUpdateToken }: SquadronEditorDefenseTokensProps) {
  return (
    <section className="editor-section">
      <h3>Defense Tokens (max 2 total)</h3>
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
