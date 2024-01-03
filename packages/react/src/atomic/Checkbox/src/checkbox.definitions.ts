export const borderColors = {
  primary: "neutral-interactive",
  danger: "danger-interactive",
  indeterminate: "primary-interactive",
} as {
  [key: string]:
    | "neutral-interactive"
    | "danger-interactive"
    | "primary-interactive";
};

export const textColors = {
  primary: "neutral-textHigh",
  danger: "danger-textLow",
  indeterminate: "neutral-textHigh",
  disabled: "neutral-textDisabled",
} as {
  [key: string]:
    | "neutral-textHigh"
    | "danger-textLow"
    | "neutral-textHigh"
    | "neutral-textDisabled";
};
