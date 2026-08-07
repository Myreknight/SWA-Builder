// Merges `incoming` into `current` by id: matching ids are updated in
// place (keeping their original position), new ids are appended. Nothing
// in `current` is ever dropped just for being absent from `incoming`.
export function mergeById<T extends { id: string }>(current: T[], incoming: T[]): T[] {
  const incomingMap = new Map(incoming.map((item) => [item.id, item]));
  const merged = current.map((item) => incomingMap.get(item.id) ?? item);
  const currentIds = new Set(current.map((item) => item.id));
  const added = incoming.filter((item) => !currentIds.has(item.id));
  return [...merged, ...added];
}
