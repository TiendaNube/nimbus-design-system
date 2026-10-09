import React, { useCallback, useId, useRef, useState } from "react";
import { Popover } from "@nimbus-ds/popover";
import { Box } from "@nimbus-ds/box";
import { Button } from "@nimbus-ds/button";
import { Text } from "@nimbus-ds/text";

/**
 * Exploration544: can Popover be opened by hover OR keyboard focus, reach a
 * visually disabled trigger and keep inner state across close/open?
 *
 * Everything here is composed OUTSIDE Popover: Popover itself is not modified.
 * Simulated (not real Popover props): focus opening, keyboard entry into the
 * portalled content, disabled-but-focusable trigger, keepMounted (state lifted
 * out of the content) and the dark appearance.
 */

const TABBABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

// Ignore a close request this soon after a focus-open: a mouse press focuses
// the trigger (opens) and then Popover's click handler toggles it closed.
const FOCUS_CLICK_GUARD_MS = 400;

const SIMULATED_CSS = `
.exploration544-disabled { opacity: 0.5; cursor: not-allowed; }
.exploration544-trigger { display: inline-block; }
.exploration544-content { outline: none; }
.exploration544-visually-hidden {
  position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0;
  overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0;
}
`;

export type ExplorationAppearance = "light" | "dark";

export interface InteractivePopoverProps {
  /** Content shown in the popover. */
  content: React.ReactNode;
  /** The trigger: ONE real focusable element (Button, IconButton, Link). */
  children: React.ReactElement;
  /** Simulated: Popover only renders the light tokens it documents today. */
  appearance?: ExplorationAppearance;
  /** Simulated: Popover has no focus option today. */
  openOnFocus?: boolean;
  enabledHover?: boolean;
  position?: "top" | "bottom" | "left" | "right";
  /** Short text announced with the trigger (aria-describedby). */
  description?: string;
  /** Accessible name of the popover content. */
  label?: string;
}

const tabbablesIn = (root: HTMLElement | null) =>
  root ? Array.from(root.querySelectorAll<HTMLElement>(TABBABLE)) : [];

/**
 * Wrapper that adds focus-triggered opening and non-modal keyboard entry on top
 * of Popover's controlled mode. Content is portalled by Popover (no focus
 * manager), so Tab is intercepted on the trigger and on the content to move
 * focus between the two by hand.
 */
export const InteractivePopover: React.FC<InteractivePopoverProps> = ({
  content,
  children,
  appearance = "light",
  openOnFocus = true,
  enabledHover = true,
  position = "bottom",
  description,
  label = "Details",
}) => {
  const [open, setOpenState] = useState(false);
  const triggerRef = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const focusOpenedAt = useRef(0);
  const uid = useId();
  const contentId = `exploration544-content-${uid}`;
  const descriptionId = `exploration544-desc-${uid}`;

  const setOpen = useCallback((next: boolean) => {
    if (!next && Date.now() - focusOpenedAt.current < FOCUS_CLICK_GUARD_MS) {
      return;
    }
    setOpenState(next);
  }, []);

  const triggerElement = () =>
    triggerRef.current?.querySelector<HTMLElement>(TABBABLE) ?? null;

  const outside = (node: EventTarget | null) =>
    !(node instanceof Node) ||
    (!triggerRef.current?.contains(node) && !contentRef.current?.contains(node));

  const handleFocus = () => {
    if (!openOnFocus || open) return;
    focusOpenedAt.current = Date.now();
    setOpenState(true);
  };

  const handleBlur = (event: React.FocusEvent<HTMLElement>) => {
    if (openOnFocus && outside(event.relatedTarget)) setOpenState(false);
  };

  const handleTriggerKeyDown = (event: React.KeyboardEvent) => {
    if (!open || event.key !== "Tab" || event.shiftKey) return;
    const first = tabbablesIn(contentRef.current)[0];
    if (first) {
      event.preventDefault();
      first.focus();
    }
  };

  const handleContentKeyDown = (event: React.KeyboardEvent) => {
    const trigger = triggerElement();
    if (event.key === "Escape") {
      setOpenState(false);
      trigger?.focus();
      return;
    }
    if (event.key !== "Tab") return;
    const inside = tabbablesIn(contentRef.current);
    const active = document.activeElement;
    const atStart = active === contentRef.current || active === inside[0];
    const atEnd = active === inside[inside.length - 1];
    if (event.shiftKey && atStart) {
      event.preventDefault();
      trigger?.focus();
    } else if (!event.shiftKey && atEnd) {
      // Continue after the trigger in document order, as if content were inline.
      event.preventDefault();
      const all = Array.from(
        document.querySelectorAll<HTMLElement>(TABBABLE)
      ).filter((el) => !contentRef.current?.contains(el));
      const next = trigger ? all[all.indexOf(trigger) + 1] : undefined;
      setOpenState(false);
      (next ?? trigger)?.focus();
    }
  };

  const dark = appearance === "dark";

  // aria wiring on the real trigger element.
  const trigger = React.cloneElement(children, {
    "aria-expanded": open,
    "aria-haspopup": "dialog",
    "aria-controls": open ? contentId : undefined,
    "aria-describedby": description ? descriptionId : undefined,
  } as Record<string, unknown>);

  return (
    <>
      <style>{SIMULATED_CSS}</style>
      <Popover
        visible={open}
        onVisibility={setOpen}
        position={position}
        enabledHover={enabledHover}
        // Click stays on so touch (no hover, no focus on tap in iOS) can open.
        // The focus-open guard in setOpen stops the press+click double toggle.
        enabledClick
        // OBSERVED: "neutral-textHigh" is not in Popover's backgroundColor
        // sprinkle (computed background is transparent), so the dark look is
        // painted by an inner Box; Popover keeps its own light token, no arrow
        // and no padding so no light rim shows.
        backgroundColor="neutral-background"
        arrow={!dark}
        padding={(dark ? "none" : "base") as any}
        content={
          <div
            ref={contentRef}
            id={contentId}
            role="dialog"
            aria-label={label}
            tabIndex={-1}
            className="exploration544-content"
            onKeyDown={handleContentKeyDown}
            onBlur={handleBlur}
          >
            {dark ? (
              <Box
                backgroundColor={"neutral-textHigh" as any}
                borderRadius="2"
                padding="4"
              >
                {content}
              </Box>
            ) : (
              content
            )}
          </div>
        }
      >
        <span
          ref={triggerRef}
          className="exploration544-trigger"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleTriggerKeyDown}
        >
          {trigger}
          {description && (
            <span id={descriptionId} className="exploration544-visually-hidden">
              {description}
            </span>
          )}
        </span>
      </Popover>
    </>
  );
};

/**
 * Simulated disabled-but-focusable trigger: aria-disabled instead of the native
 * `disabled` attribute, which removes the element from the tab order.
 */
export const DisabledLookingButton: React.FC<{ label: string }> = ({
  label,
}) => (
  <Button
    appearance="neutral"
    aria-disabled="true"
    className="exploration544-disabled"
    onClick={(event: React.MouseEvent) => event.preventDefault()}
  >
    {label}
  </Button>
);

/** Content with inner state (a counter) to observe what survives close/open. */
export const CounterContent: React.FC<{
  count: number;
  onIncrement: () => void;
  dark?: boolean;
  title: string;
}> = ({ count, onIncrement, dark = false, title }) => {
  const color = dark ? "neutral-background" : "neutral-textHigh";
  return (
    <Box display="flex" flexDirection="column" gap="2">
      <Text color={color as any} fontWeight="bold">
        {title}
      </Text>
      <Text color={color as any}>Clicks inside: {count}</Text>
      <Button appearance="primary" onClick={onIncrement}>
        Add one
      </Button>
    </Box>
  );
};

/** Today's behaviour: state lives in the content, so it resets on close. */
export const UnmountingContent: React.FC<{ dark?: boolean }> = ({ dark }) => {
  const [count, setCount] = useState(0);
  return (
    <CounterContent
      title="State inside content"
      count={count}
      dark={dark}
      onIncrement={() => setCount((value) => value + 1)}
    />
  );
};

/** Simulated keepMounted: state is owned by the parent, so it survives. */
export const PersistentContent: React.FC<{
  count: number;
  onIncrement: () => void;
  dark?: boolean;
}> = ({ count, onIncrement, dark }) => (
  <CounterContent
    title="State lifted to parent"
    count={count}
    dark={dark}
    onIncrement={onIncrement}
  />
);

export interface Exploration544Props {
  appearance?: ExplorationAppearance;
  openOnFocus?: boolean;
  enabledHover?: boolean;
}

export const Exploration544: React.FC<Exploration544Props> = ({
  appearance = "light",
  openOnFocus = true,
  enabledHover = true,
}) => {
  const [lifted, setLifted] = useState(0);
  const dark = appearance === "dark";

  return (
    <Box display="flex" flexDirection="column" gap="6" padding="6">
      <Text>
        Tab to a trigger: the popover opens on keyboard focus (and on hover or
        tap). Tab again moves into its content; Tab past the last control
        continues after the trigger; Shift+Tab or Esc returns to the trigger.
      </Text>

      <Box display="flex" gap="4" alignItems="center" flexWrap="wrap">
        <InteractivePopover
          appearance={appearance}
          openOnFocus={openOnFocus}
          enabledHover={enabledHover}
          label="State inside content"
          content={<UnmountingContent dark={dark} />}
        >
          <Button appearance="neutral">Content unmounts (today)</Button>
        </InteractivePopover>

        <InteractivePopover
          appearance={appearance}
          openOnFocus={openOnFocus}
          enabledHover={enabledHover}
          label="State lifted to parent"
          content={
            <PersistentContent
              dark={dark}
              count={lifted}
              onIncrement={() => setLifted((value) => value + 1)}
            />
          }
        >
          <Button appearance="neutral">State kept (simulated)</Button>
        </InteractivePopover>

        <InteractivePopover
          appearance={appearance}
          openOnFocus={openOnFocus}
          enabledHover={enabledHover}
          label="Why this action is unavailable"
          description="Unavailable: verify your account to enable this action."
          content={
            <Box display="flex" flexDirection="column" gap="2">
              <Text color={(dark ? "neutral-background" : "neutral-textHigh") as any}>
                Verify your account to enable this action.
              </Text>
              <Button appearance="primary">Verify account</Button>
            </Box>
          }
        >
          <DisabledLookingButton label="Looks disabled, still focusable" />
        </InteractivePopover>
      </Box>
    </Box>
  );
};
