import React, { useCallback, useState } from "react";
import { Popover } from "@nimbus-ds/popover";
import { Box } from "@nimbus-ds/box";
import { Button } from "@nimbus-ds/button";
import { Text } from "@nimbus-ds/text";

/**
 * Exploration544: can Popover be opened by hover OR keyboard focus, reach a
 * visually disabled trigger and keep inner state across close/open?
 *
 * Everything here is composed OUTSIDE Popover: Popover itself is not modified.
 * Simulated (not real Popover props): focus opening, disabled-but-focusable
 * trigger, keepMounted (state lifted out of the content), dark appearance.
 */

const CONTENT_ATTR = "data-exploration544-content";

const SIMULATED_CSS = `
.exploration544-disabled { opacity: 0.5; cursor: not-allowed; }
.exploration544-trigger { display: inline-block; }
`;

export type ExplorationAppearance = "light" | "dark";

export interface InteractivePopoverProps {
  /** Content shown in the popover. */
  content: React.ReactNode;
  /** The trigger. Must be a real focusable element (Button, IconButton, Link). */
  children: React.ReactNode;
  /** Simulated: Popover only accepts light tokens documented today. */
  appearance?: ExplorationAppearance;
  /** Simulated: Popover has no focus option today. */
  openOnFocus?: boolean;
  enabledHover?: boolean;
  position?: "top" | "bottom" | "left" | "right";
}

/**
 * Wrapper that adds focus-triggered opening on top of Popover's controlled mode.
 * Focus events bubble in React, so a wrapper span sees the trigger's focus/blur.
 */
export const InteractivePopover: React.FC<InteractivePopoverProps> = ({
  content,
  children,
  appearance = "light",
  openOnFocus = true,
  enabledHover = true,
  position = "bottom",
}) => {
  const [open, setOpen] = useState(false);

  const handleFocus = useCallback(() => {
    if (openOnFocus) setOpen(true);
  }, [openOnFocus]);

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLElement>) => {
      const next = event.relatedTarget as HTMLElement | null;
      // Moving into the (portalled) popover content must not close it.
      if (next && next.closest?.(`[${CONTENT_ATTR}]`)) return;
      if (event.currentTarget.contains(next)) return;
      if (openOnFocus) setOpen(false);
    },
    [openOnFocus]
  );

  const dark = appearance === "dark";

  return (
    <>
      <style>{SIMULATED_CSS}</style>
      <Popover
        visible={open}
        onVisibility={setOpen}
        position={position}
        enabledHover={enabledHover}
        // Click would toggle the popover closed right after the focus that a
        // mouse press already caused. Click is therefore off while focus is on.
        enabledClick={!openOnFocus}
        // Assumption: the token exists for backgroundColor; Popover also reuses
        // it as `color`, so text inside sets its own color explicitly.
        backgroundColor={(dark ? "neutral-textHigh" : "neutral-background") as any}
        {...({ [CONTENT_ATTR]: "" } as Record<string, string>)}
        content={content}
      >
        <span
          className="exploration544-trigger"
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          {children}
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
        Tab through the triggers: the popover opens on keyboard focus, on hover,
        and closes with Esc or when focus leaves.
      </Text>

      <Box display="flex" gap="4" alignItems="center" flexWrap="wrap">
        <InteractivePopover
          appearance={appearance}
          openOnFocus={openOnFocus}
          enabledHover={enabledHover}
          content={<UnmountingContent dark={dark} />}
        >
          <Button appearance="neutral">Content unmounts (today)</Button>
        </InteractivePopover>

        <InteractivePopover
          appearance={appearance}
          openOnFocus={openOnFocus}
          enabledHover={enabledHover}
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
          content={
            <Text color={(dark ? "neutral-background" : "neutral-textHigh") as any}>
              Verify your account to enable this action.
            </Text>
          }
        >
          <DisabledLookingButton label="Looks disabled, still focusable" />
        </InteractivePopover>
      </Box>
    </Box>
  );
};
