/** out.quint easing — cubic-bezier(0.23, 1, 0.32, 1) */
export const FLOATING_EASING = "cubic-bezier(0.23, 1, 0.32, 1)";

/** Maps each floating side to its transform-origin value for scale animations. */
export const FLOATING_SIDE_ORIGINS: Record<string, string> = {
  top: "bottom center",
  bottom: "top center",
  left: "right center",
  right: "left center",
};
