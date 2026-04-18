export function takeFirst<T>(
  items: readonly T[] | null | undefined,
  count: number,
): T[] {
  if (!items || count <= 0) {
    return [];
  }

  return items.filter((_, index) => index < count);
}
