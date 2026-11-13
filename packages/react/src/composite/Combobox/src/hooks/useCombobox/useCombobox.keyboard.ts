/**
 * What a key does in the text input, decided from the state of the field.
 */
export type ComboboxKeyAction =
  | { type: "open" }
  | { type: "move"; target: "next" | "previous" | "first" | "last" }
  | { type: "activate" }
  | { type: "close" }
  | { type: "enterBranch" }
  | { type: "back" }
  | { type: "removeLast" }
  | { type: "tab" };

/**
 * State of the field that decides what a key does.
 */
export interface ComboboxKeyContext {
  open: boolean;
  hierarchical: boolean;
  /** Whether the text of the input is empty. */
  textEmpty: boolean;
  /** Number of levels entered below the root list. */
  depth: number;
  hasActiveRow: boolean;
  activeRowIsBranch: boolean;
  /** Whether the caret is at the end of the text of the input. */
  caretAtEnd: boolean;
  multiple: boolean;
  selectionCount: number;
}

/**
 * The outcome of a key: the action and whether it consumes the key (prevents
 * its default action) and whether it stops its propagation.
 */
export interface ComboboxKeyResult {
  action: ComboboxKeyAction;
  consume: boolean;
  stop?: boolean;
}

type KeyResolver = (context: ComboboxKeyContext) => ComboboxKeyResult | null;

const moveResult = (
  target: "next" | "previous" | "first" | "last"
): ComboboxKeyResult => ({
  action: { type: "move", target },
  consume: true
});

const resolveVertical =
  (target: "next" | "previous"): KeyResolver =>
  (context) =>
    context.open
      ? moveResult(target)
      : { action: { type: "open" }, consume: true };

const resolveHomeEnd =
  (target: "first" | "last"): KeyResolver =>
  (context) =>
    context.open ? moveResult(target) : null;

const resolveEnter: KeyResolver = (context) =>
  context.open && context.hasActiveRow
    ? { action: { type: "activate" }, consume: true }
    : null;

// Escape only stops propagation when it closes the list.
const resolveEscape: KeyResolver = (context) =>
  context.open
    ? { action: { type: "close" }, consume: true, stop: true }
    : null;

const resolveArrowRight: KeyResolver = (context) => {
  const canEnter =
    context.open &&
    context.hierarchical &&
    context.hasActiveRow &&
    context.activeRowIsBranch;
  // While searching, only when the caret is at the end of the text.
  return canEnter && (context.textEmpty || context.caretAtEnd)
    ? { action: { type: "enterBranch" }, consume: true }
    : null;
};

const resolveBack: KeyResolver = (context) =>
  context.open && context.hierarchical && context.textEmpty && context.depth > 0
    ? { action: { type: "back" }, consume: true }
    : null;

const resolveBackspace: KeyResolver = (context) => {
  if (!context.textEmpty) return null;
  if (context.open && context.hierarchical && context.depth > 0) {
    return resolveBack(context);
  }
  return context.multiple && context.selectionCount > 0
    ? { action: { type: "removeLast" }, consume: true }
    : null;
};

const resolveTab: KeyResolver = () => ({
  action: { type: "tab" },
  consume: false
});

const resolvers: Record<string, KeyResolver> = {
  ArrowDown: resolveVertical("next"),
  ArrowUp: resolveVertical("previous"),
  Home: resolveHomeEnd("first"),
  End: resolveHomeEnd("last"),
  Enter: resolveEnter,
  Escape: resolveEscape,
  ArrowRight: resolveArrowRight,
  ArrowLeft: resolveBack,
  Backspace: resolveBackspace,
  Tab: resolveTab
};

/**
 * Resolves a key of the keyboard map into an action, or `null` when the key
 * has no effect in the current state.
 */
export const resolveKey = (
  key: string,
  context: ComboboxKeyContext
): ComboboxKeyResult | null => resolvers[key]?.(context) ?? null;
