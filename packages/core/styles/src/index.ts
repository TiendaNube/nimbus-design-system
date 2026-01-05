"use client";

/*
 Styles needs an 'use client' as we're using a React Context for theming purposes.
*/

export * from "./components";
export { vars } from "./utils";
export {
  gradients,
  createLinearGradient,
  createBorderGradient,
} from "./gradients";

export { badge } from "./packages/atomic/badge";
export { box } from "./packages/atomic/box";
export { button } from "./packages/atomic/button";
export { checkbox } from "./packages/atomic/checkbox";
export { chip } from "./packages/atomic/chip";
export { fileUploader, fileUploaderVars } from "./packages/atomic/fileUploader";
export { icon } from "./packages/atomic/icon";
export { iconButton } from "./packages/atomic/iconButton";
export { input } from "./packages/atomic/input";
export { label } from "./packages/atomic/label";
export { tag } from "./packages/atomic/tag";
export { text } from "./packages/atomic/text";
export { title } from "./packages/atomic/title";
export { toast } from "./packages/atomic/toast";
export { list, listVars } from "./packages/atomic/list";
export { multiSelect } from "./packages/atomic/multiSelect";
export { popover } from "./packages/atomic/popover";
export { radio } from "./packages/atomic/radio";
export { select } from "./packages/atomic/select";
export { skeleton } from "./packages/atomic/skeleton";
export { spinner } from "./packages/atomic/spinner";
export { toggle } from "./packages/atomic/toggle";
export { link } from "./packages/atomic/link";
export { tooltip } from "./packages/atomic/tooltip";
export { thumbnail } from "./packages/atomic/thumbnail";
export { textarea } from "./packages/atomic/textarea";
export { progressBar } from "./packages/atomic/progressBar";
export { divider } from "./packages/atomic/divider";
export { slider } from "./packages/atomic/slider";

export { accordion } from "./packages/composite/accordion";
export { alert } from "./packages/composite/alert";
export { card } from "./packages/composite/card";
export { collapsible } from "./packages/composite/collapsible";
export { modal } from "./packages/composite/modal";
export { pagination } from "./packages/composite/pagination";
export { sidebar } from "./packages/composite/sidebar";
export { stepper } from "./packages/composite/stepper";
export { tabs } from "./packages/composite/tabs";
export { table } from "./packages/composite/table";
export { segmentedControl } from "./packages/composite/segmented-control";
export { scrollPane } from "./packages/composite/scroll-pane";
export { splitButton } from "./packages/composite/split-button";

export { calendar } from "./packages/patterns/calendar";
export { editor } from "./packages/patterns/editor";

/* Types */
export type { BoxSprinkle } from "./packages/atomic/box";
export type { IconButtonSprinkle } from "./packages/atomic/iconButton";
export type { TextSprinkle } from "./packages/atomic/text";
export type { PopoverSprinkle } from "./packages/atomic/popover";
export type { TitleSprinkle } from "./packages/atomic/title";
export type { ModalSprinkle } from "./packages/composite/modal";
export type { SidebarSprinkle } from "./packages/composite/sidebar";
export type { TableSprinkle } from "./packages/composite/table";
export type { TooltipSprinkle } from "./packages/atomic/tooltip";
