import {
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
  type Ref,
  type RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from "react";
import {
  autoUpdate,
  flip,
  offset,
  shift,
  size,
  useFloating,
  useId,
  useMergeRefs
} from "@floating-ui/react";

import {
  FOCUSABLE_SELECTOR,
  FOCUS_RESTORE_DELAY,
  PANEL_OFFSET,
  PANEL_VIEWPORT_PADDING
} from "../../breadcrumb.definitions";

const isModifiedClick = (event: ReactMouseEvent) =>
  event.button !== 0 ||
  event.metaKey ||
  event.ctrlKey ||
  event.shiftKey ||
  event.altKey;

export interface HiddenLevelsPanel {
  open: boolean;
  panelId: string | undefined;
  groupRef: RefObject<HTMLLIElement | null>;
  triggerRef: Ref<HTMLButtonElement>;
  panelRef: Ref<HTMLElement>;
  floatingStyles: CSSProperties;
  toggle: () => void;
  handlePanelLinkClick: (event: ReactMouseEvent<HTMLElement>) => void;
}

/**
 * Owns the open state, focus and dismissal of the hidden-levels panel.
 * @param valueKey Identity of the current `items` and limit; when it changes the panel closes.
 */
export const useHiddenLevelsPanel = (valueKey: string): HiddenLevelsPanel => {
  // The panel is open only for the path it was opened on, so a path change closes it during render.
  const [openKey, setOpenKey] = useState<string | null>(null);
  const open = openKey === valueKey;

  const panelId = useId();
  const groupRef = useRef<HTMLLIElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLElement | null>(null);
  const focusWithinRef = useRef(false);
  const wasOpenRef = useRef(open);
  const previousKeyRef = useRef(valueKey);
  const restoreTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );

  const { refs, floatingStyles } = useFloating<HTMLButtonElement>({
    open,
    placement: "bottom-start",
    strategy: "absolute",
    middleware: [
      offset(PANEL_OFFSET),
      flip({ padding: PANEL_VIEWPORT_PADDING }),
      shift({ padding: PANEL_VIEWPORT_PADDING }),
      size({
        padding: PANEL_VIEWPORT_PADDING,
        apply({ availableWidth, elements }) {
          Object.assign(elements.floating.style, {
            maxWidth: `${Math.max(0, availableWidth)}px`
          });
        }
      })
    ],
    whileElementsMounted: autoUpdate
  });

  const mergedTriggerRef = useMergeRefs([triggerRef, refs.setReference]);
  const mergedPanelRef = useMergeRefs([panelRef, refs.setFloating]);

  const close = useCallback(() => setOpenKey(null), []);

  const toggle = useCallback(
    () => setOpenKey((current) => (current === valueKey ? null : valueKey)),
    [valueKey]
  );

  const handlePanelLinkClick = useCallback(
    (event: ReactMouseEvent<HTMLElement>) => {
      // New tab or window clicks keep the panel open; the default action is never prevented.
      if (!isModifiedClick(event)) close();
    },
    [close]
  );

  // A path change while open: focus returns to the trigger only if it was in the group and the trigger survived.
  useLayoutEffect(() => {
    if (previousKeyRef.current === valueKey) return;
    previousKeyRef.current = valueKey;
    const trigger = triggerRef.current;
    if (wasOpenRef.current && focusWithinRef.current && trigger?.isConnected) {
      trigger.focus();
    }
    focusWithinRef.current = false;
  }, [valueKey]);

  useLayoutEffect(() => {
    wasOpenRef.current = open;
  }, [open]);

  useEffect(() => {
    if (!open) return;
    focusWithinRef.current = true;
    const firstLink = panelRef.current?.querySelector<HTMLElement>("a[href]");
    (firstLink ?? triggerRef.current)?.focus();
  }, [open]);

  useEffect(() => {
    const group = groupRef.current;
    if (!open || !group) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      // Keeps an enclosing Modal or Sidebar open.
      event.stopPropagation();
      close();
      triggerRef.current?.focus();
    };

    const handleFocusIn = () => {
      focusWithinRef.current = true;
    };

    const handleFocusOut = (event: FocusEvent) => {
      const next = event.relatedTarget as Node | null;
      if (next && !group.contains(next)) {
        focusWithinRef.current = false;
        close();
      }
    };

    const handleOutsidePress = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (!target || group.contains(target)) return;
      focusWithinRef.current = false;
      close();
      if (!target.closest?.(FOCUSABLE_SELECTOR)) {
        clearTimeout(restoreTimeoutRef.current);
        restoreTimeoutRef.current = setTimeout(
          () => triggerRef.current?.focus(),
          FOCUS_RESTORE_DELAY
        );
      }
    };

    group.addEventListener("keydown", handleKeyDown);
    group.addEventListener("focusin", handleFocusIn);
    group.addEventListener("focusout", handleFocusOut);
    document.addEventListener("mousedown", handleOutsidePress, true);

    return () => {
      group.removeEventListener("keydown", handleKeyDown);
      group.removeEventListener("focusin", handleFocusIn);
      group.removeEventListener("focusout", handleFocusOut);
      document.removeEventListener("mousedown", handleOutsidePress, true);
    };
  }, [open, close]);

  useEffect(() => () => clearTimeout(restoreTimeoutRef.current), []);

  return {
    open,
    panelId,
    groupRef,
    triggerRef: mergedTriggerRef,
    panelRef: mergedPanelRef,
    floatingStyles,
    toggle,
    handlePanelLinkClick
  };
};
