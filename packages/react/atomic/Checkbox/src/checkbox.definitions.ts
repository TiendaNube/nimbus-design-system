export const borderColors = {
  primary: "neutral.interactive",
  danger: "danger.interactive",
  indeterminate: "primary.interactive",
} as {
  [key: string]:
    | "neutral.interactive"
    | "danger.interactive"
    | "primary.interactive";
};

export const textColors = {
  primary: "neutral.textLow",
  danger: "danger.textLow",
  indeterminate: "neutral.textLow",
  disabled: "neutral.textDisabled",
} as {
  [key: string]:
    | "neutral.textLow"
    | "danger.textLow"
    | "neutral.textLow"
    | "neutral.textDisabled";
};
