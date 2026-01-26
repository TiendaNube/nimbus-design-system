/**
 * Finds and focuses the current/selected option button within a column container.
 * Prioritizes the element with tabindex="0" (current or first item).
 */
function focusColumnOption(
    columnRef: React.RefObject<HTMLDivElement | null>
): void {
    const currentOption = columnRef.current?.querySelector<HTMLButtonElement>(
        'button[tabindex="0"]'
    );
    if (currentOption) {
        currentOption.focus();
        return;
    }

    const fallbackOption =
        columnRef.current?.querySelector<HTMLButtonElement>("button");
    fallbackOption?.focus();
}

export { focusColumnOption };
