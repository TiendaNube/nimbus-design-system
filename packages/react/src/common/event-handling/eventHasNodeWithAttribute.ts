/**
 * Returns true if the event target or any of its ancestors carry the provided attribute name.
 * This enables consumers to mark areas that should be ignored by outside-press logic.
 */
export const eventHasNodeWithAttribute = (
  event: PointerEvent | MouseEvent,
  attributeName: string
): boolean => {
  const pathGetter = (event as unknown as { composedPath?: () => EventTarget[] })
    .composedPath;
  const path = pathGetter?.call(event);

  if (Array.isArray(path)) {
    const hasIgnored = path.some((node): boolean => {
      if (node instanceof Element) {
        return node.hasAttribute(attributeName);
      }
      return false;
    });
    if (hasIgnored) return true;
  }

  const target = event.target as Element | null;
  if (target && target instanceof Element) {
    if (target.closest(`[${attributeName}]`)) return true;
  }

  return false;
};


