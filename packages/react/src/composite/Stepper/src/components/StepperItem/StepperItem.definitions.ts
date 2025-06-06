// Utility function to join class names, filtering out empty strings
export const joinClassNames = (
  ...classNames: (string | false | undefined)[]
): string => classNames.filter(Boolean).join(" ");

export enum STEP_STATE {
  CURRENT = "current",
  COMPLETED = "completed",
  SELECTED = "selected",
  PENDING = "pending",
}
