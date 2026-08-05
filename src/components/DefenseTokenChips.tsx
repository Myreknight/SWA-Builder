import type { DefenseTokens } from '../types/ship';
import '../styles/tokenBadge.css';

const DEFENSE_TOKEN_LABELS: Record<keyof DefenseTokens, string> = {
  redirect: 'Redirect',
  evade: 'Evade',
  brace: 'Brace',
  contain: 'Contain',
  salvo: 'Salvo',
};

interface DefenseTokenChipsProps {
  defenseTokens: DefenseTokens;
}

export function DefenseTokenChips({ defenseTokens }: DefenseTokenChipsProps) {
  const activeTokens = (Object.entries(defenseTokens) as [keyof DefenseTokens, number | undefined][]).filter(
    ([, count]) => (count ?? 0) > 0,
  );

  if (activeTokens.length === 0) {
    return <span className="chip-row__empty">No defense tokens</span>;
  }

  return (
    <>
      {activeTokens.map(([token, count]) => (
        <span key={token} className={`token token--${token}`}>
          {DEFENSE_TOKEN_LABELS[token]}
          {(count ?? 0) > 1 ? ` x${count}` : ''}
        </span>
      ))}
    </>
  );
}
