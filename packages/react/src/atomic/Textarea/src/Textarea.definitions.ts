const DEFAULT_LINE_HEIGHT = 16;

/**
 * Adjust the height of the textarea based on the minLines and maxLines properties. Fallback for browsers that don't support field-sizing.
 */
const adjustTextareaHeightFallback = (
  textarea: HTMLTextAreaElement,
  minLines?: number,
  maxLines?: number
) => {
  const computedStyles = window.getComputedStyle(textarea);
  const lineHeight =
    parseFloat(computedStyles.lineHeight) || DEFAULT_LINE_HEIGHT;
  const paddingTop = parseFloat(computedStyles.paddingTop) || 0;
  const paddingBottom = parseFloat(computedStyles.paddingBottom) || 0;
  const borderTop = parseFloat(computedStyles.borderTopWidth) || 0;
  const borderBottom = parseFloat(computedStyles.borderBottomWidth) || 0;
  const verticalPadding = paddingTop + paddingBottom;
  const verticalBorders = borderTop + borderBottom;
  const extraHeight = verticalPadding + verticalBorders;

  // Reset height to measure scrollHeight accurately
  // eslint-disable-next-line no-param-reassign
  textarea.style.height = "auto";

  const { scrollHeight } = textarea;

  // Calculate min and max heights in pixels
  const minHeight = minLines ? minLines * lineHeight + extraHeight : 0;
  const maxHeight = maxLines ? maxLines * lineHeight + extraHeight : Infinity;

  // Set the appropriate height within constraints
  let newHeight = Math.max(scrollHeight, minHeight);
  if (maxHeight !== Infinity) {
    newHeight = Math.min(newHeight, maxHeight);
  }

  // eslint-disable-next-line no-param-reassign
  textarea.style.height = `${newHeight}px`;
  // eslint-disable-next-line no-param-reassign
  textarea.style.overflowY = newHeight >= maxHeight ? "auto" : "hidden";
};

export { adjustTextareaHeightFallback };
