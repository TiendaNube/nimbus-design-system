import { ControlledTabsProperties } from "./tabs.types";

export const generateID = (name: string) =>
  name.toLowerCase().replace(" ", "-");

/**
 * Checks if the tabs are controlled.
 * @param props - The props of the tabs.
 * @returns True if the tabs are controlled, false otherwise.
 */
export const isControlled = (props: any): props is ControlledTabsProperties =>
  "selected" in props && "onTabSelect" in props;
