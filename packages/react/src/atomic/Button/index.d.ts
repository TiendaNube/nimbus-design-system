declare module "@nimbus-ds/button/core/styles/src/index" {
  export { utils } from "@nimbus-ds/button/core/styles/src/utils/index";
  export { badge } from "@nimbus-ds/button/core/styles/src/packages/atomic/badge/index";
  export { box } from "@nimbus-ds/button/core/styles/src/packages/atomic/box/index";
  export { button } from "@nimbus-ds/button/core/styles/src/packages/atomic/button/index";
  export { checkbox } from "@nimbus-ds/button/core/styles/src/packages/atomic/checkbox/index";
  export { chip } from "@nimbus-ds/button/core/styles/src/packages/atomic/chip/index";
  export { fileUploader } from "@nimbus-ds/button/core/styles/src/packages/atomic/fileUploader/index";
  export { icon } from "@nimbus-ds/button/core/styles/src/packages/atomic/icon/index";
  export { iconButton } from "@nimbus-ds/button/core/styles/src/packages/atomic/iconButton/index";
  export { input } from "@nimbus-ds/button/core/styles/src/packages/atomic/input/index";
  export { label } from "@nimbus-ds/button/core/styles/src/packages/atomic/label/index";
  export { tag } from "@nimbus-ds/button/core/styles/src/packages/atomic/tag/index";
  export { text } from "@nimbus-ds/button/core/styles/src/packages/atomic/text/index";
  export { title } from "@nimbus-ds/button/core/styles/src/packages/atomic/title/index";
  export { toast } from "@nimbus-ds/button/core/styles/src/packages/atomic/toast/index";
  export { list } from "@nimbus-ds/button/core/styles/src/packages/atomic/list/index";
  export { popover } from "@nimbus-ds/button/core/styles/src/packages/atomic/popover/index";
  export { radio } from "@nimbus-ds/button/core/styles/src/packages/atomic/radio/index";
  export { select } from "@nimbus-ds/button/core/styles/src/packages/atomic/select/index";
  export { skeleton } from "@nimbus-ds/button/core/styles/src/packages/atomic/skeleton/index";
  export { spinner } from "@nimbus-ds/button/core/styles/src/packages/atomic/spinner/index";
  export { stack } from "@nimbus-ds/button/core/styles/src/packages/atomic/stack/index";
  export { toggle } from "@nimbus-ds/button/core/styles/src/packages/atomic/toggle/index";
  export { link } from "@nimbus-ds/button/core/styles/src/packages/atomic/link/index";
  export { tooltip } from "@nimbus-ds/button/core/styles/src/packages/atomic/tooltip/index";
  export { thumbnail } from "@nimbus-ds/button/core/styles/src/packages/atomic/thumbnail/index";
  export { textarea } from "@nimbus-ds/button/core/styles/src/packages/atomic/textarea/index";
  export { alert } from "@nimbus-ds/button/core/styles/src/packages/composite/alert/index";
  export { card } from "@nimbus-ds/button/core/styles/src/packages/composite/card/index";
  export { sidebar } from "@nimbus-ds/button/core/styles/src/packages/composite/sidebar/index";
  export { tabs } from "@nimbus-ds/button/core/styles/src/packages/composite/tabs/index";
  export type { BoxSprinkle } from "@nimbus-ds/button/core/styles/src/packages/atomic/box/index";
  export type { IconButtonSprinkle } from "@nimbus-ds/button/core/styles/src/packages/atomic/iconButton/index";
  export type { StackSprinkle } from "@nimbus-ds/button/core/styles/src/packages/atomic/stack/index";
  export type { SidebarSprinkle } from "@nimbus-ds/button/core/styles/src/packages/composite/sidebar/index";
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/badge/badge.style.css" {
  export const surface: Record<
    "primary" | "success" | "warning" | "danger" | "neutral",
    string
  >;
  export const light: Record<
    "primary" | "success" | "warning" | "danger" | "neutral",
    string
  >;
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/badge/index" {
  import * as style from "@nimbus-ds/button/core/styles/src/packages/atomic/badge/badge.style.css";
  export const badge: {
    style: typeof style;
  };
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/box/box.sprinkle.css" {
  type BorderStyle = "solid" | "none" | "hidden" | "dashed" | "dotted";
  type BoxSizing = "border-box" | "content-box";
  type Cursor = "auto" | "pointer";
  export const backgroundColorProperties: {
    "primary.interactive":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "primary.surface":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "primary.surfaceHighlight":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "primary.textLow":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "success.interactive":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "success.surface":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "success.surfaceHighlight":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "success.textLow":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "warning.interactive":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "warning.surface":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "warning.surfaceHighlight":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "warning.textLow":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "danger.interactive":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "danger.surface":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "danger.surfaceHighlight":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "danger.textLow":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "neutral.background":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "neutral.interactive":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "neutral.surface":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "neutral.surfaceHighlight":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "neutral.textLow":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
  };
  export const borderColorProperties: {
    "primary.interactive":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "primary.surface":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "primary.surfaceHighlight":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "success.interactive":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "success.surface":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "success.surfaceHighlight":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "warning.interactive":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "warning.surface":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "warning.surfaceHighlight":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "danger.interactive":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "danger.surface":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "danger.surfaceHighlight":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "neutral.interactive":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "neutral.surface":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "neutral.surfaceHighlight":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
  };
  export const borderStyleProperties: BorderStyle[];
  export const boxSizingProperties: BoxSizing[];
  export const cursorProperties: Cursor[];
  export const spaceProperties: {
    none: string;
    "0,5":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "1":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "2":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "2,5":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "4":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "6":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "8":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "10":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "12":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "14":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "16":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "18":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "20":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
  };
  export const sprinkle: import("rainbow-sprinkles/dist/declarations/src/createRuntimeFn").SprinklesFn<
    [
      {
        config: {
          borderStyle: {
            values: {
              none: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
              hidden: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
              dashed: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
              dotted: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
              solid: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
            };
            staticScale: BorderStyle[];
            name: "borderStyle";
          };
          boxSizing: {
            values: {
              "border-box": {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
              "content-box": {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
            };
            staticScale: BoxSizing[];
            name: "boxSizing";
          };
          cursor: {
            values: {
              auto: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
              pointer: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
            };
            staticScale: Cursor[];
            name: "cursor";
          };
        };
      } & {
        config: {
          width: {
            dynamic: {
              default: string;
              conditions: Record<"xs" | "md" | "lg", string>;
            };
            dynamicScale: true;
            name: "width";
            vars: {
              default: string;
              conditions: Record<"xs" | "md" | "lg", string>;
            };
          };
          height: {
            dynamic: {
              default: string;
              conditions: Record<"xs" | "md" | "lg", string>;
            };
            dynamicScale: true;
            name: "height";
            vars: {
              default: string;
              conditions: Record<"xs" | "md" | "lg", string>;
            };
          };
          borderRadius: {
            dynamic: {
              default: string;
              conditions: Record<"xs" | "md" | "lg", string>;
            };
            dynamicScale: true;
            name: "borderRadius";
            vars: {
              default: string;
              conditions: Record<"xs" | "md" | "lg", string>;
            };
          };
          borderWidth: {
            dynamic: {
              default: string;
              conditions: Record<"xs" | "md" | "lg", string>;
            };
            dynamicScale: true;
            name: "borderWidth";
            vars: {
              default: string;
              conditions: Record<"xs" | "md" | "lg", string>;
            };
          };
          backgroundColor: {
            dynamic: {
              default: string;
              conditions: Record<"xs" | "md" | "lg", string>;
            };
            dynamicScale: {
              "primary.interactive":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "primary.surface":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "primary.surfaceHighlight":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "primary.textLow":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "success.interactive":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "success.surface":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "success.surfaceHighlight":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "success.textLow":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "warning.interactive":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "warning.surface":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "warning.surfaceHighlight":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "warning.textLow":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "danger.interactive":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "danger.surface":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "danger.surfaceHighlight":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "danger.textLow":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "neutral.background":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "neutral.interactive":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "neutral.surface":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "neutral.surfaceHighlight":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "neutral.textLow":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
            };
            name: "backgroundColor";
            vars: {
              default: string;
              conditions: Record<"xs" | "md" | "lg", string>;
            };
          };
          borderColor: {
            dynamic: {
              default: string;
              conditions: Record<"xs" | "md" | "lg", string>;
            };
            dynamicScale: {
              "primary.interactive":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "primary.surface":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "primary.surfaceHighlight":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "success.interactive":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "success.surface":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "success.surfaceHighlight":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "warning.interactive":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "warning.surface":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "warning.surfaceHighlight":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "danger.interactive":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "danger.surface":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "danger.surfaceHighlight":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "neutral.interactive":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "neutral.surface":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "neutral.surfaceHighlight":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
            };
            name: "borderColor";
            vars: {
              default: string;
              conditions: Record<"xs" | "md" | "lg", string>;
            };
          };
          padding: {
            dynamic: {
              default: string;
              conditions: Record<"xs" | "md" | "lg", string>;
            };
            dynamicScale: {
              none: string;
              "0,5":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "1":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "2":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "2,5":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "4":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "6":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "8":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "10":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "12":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "14":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "16":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "18":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "20":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
            };
            name: "padding";
            vars: {
              default: string;
              conditions: Record<"xs" | "md" | "lg", string>;
            };
          };
          paddingTop: {
            dynamic: {
              default: string;
              conditions: Record<"xs" | "md" | "lg", string>;
            };
            dynamicScale: {
              none: string;
              "0,5":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "1":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "2":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "2,5":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "4":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "6":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "8":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "10":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "12":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "14":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "16":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "18":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "20":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
            };
            name: "paddingTop";
            vars: {
              default: string;
              conditions: Record<"xs" | "md" | "lg", string>;
            };
          };
          paddingBottom: {
            dynamic: {
              default: string;
              conditions: Record<"xs" | "md" | "lg", string>;
            };
            dynamicScale: {
              none: string;
              "0,5":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "1":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "2":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "2,5":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "4":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "6":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "8":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "10":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "12":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "14":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "16":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "18":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "20":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
            };
            name: "paddingBottom";
            vars: {
              default: string;
              conditions: Record<"xs" | "md" | "lg", string>;
            };
          };
          paddingLeft: {
            dynamic: {
              default: string;
              conditions: Record<"xs" | "md" | "lg", string>;
            };
            dynamicScale: {
              none: string;
              "0,5":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "1":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "2":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "2,5":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "4":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "6":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "8":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "10":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "12":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "14":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "16":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "18":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "20":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
            };
            name: "paddingLeft";
            vars: {
              default: string;
              conditions: Record<"xs" | "md" | "lg", string>;
            };
          };
          paddingRight: {
            dynamic: {
              default: string;
              conditions: Record<"xs" | "md" | "lg", string>;
            };
            dynamicScale: {
              none: string;
              "0,5":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "1":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "2":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "2,5":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "4":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "6":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "8":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "10":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "12":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "14":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "16":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "18":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "20":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
            };
            name: "paddingRight";
            vars: {
              default: string;
              conditions: Record<"xs" | "md" | "lg", string>;
            };
          };
          margin: {
            dynamic: {
              default: string;
              conditions: Record<"xs" | "md" | "lg", string>;
            };
            dynamicScale: {
              none: string;
              "0,5":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "1":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "2":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "2,5":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "4":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "6":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "8":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "10":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "12":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "14":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "16":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "18":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "20":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
            };
            name: "margin";
            vars: {
              default: string;
              conditions: Record<"xs" | "md" | "lg", string>;
            };
          };
          marginTop: {
            dynamic: {
              default: string;
              conditions: Record<"xs" | "md" | "lg", string>;
            };
            dynamicScale: {
              none: string;
              "0,5":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "1":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "2":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "2,5":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "4":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "6":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "8":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "10":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "12":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "14":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "16":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "18":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "20":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
            };
            name: "marginTop";
            vars: {
              default: string;
              conditions: Record<"xs" | "md" | "lg", string>;
            };
          };
          marginBottom: {
            dynamic: {
              default: string;
              conditions: Record<"xs" | "md" | "lg", string>;
            };
            dynamicScale: {
              none: string;
              "0,5":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "1":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "2":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "2,5":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "4":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "6":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "8":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "10":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "12":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "14":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "16":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "18":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "20":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
            };
            name: "marginBottom";
            vars: {
              default: string;
              conditions: Record<"xs" | "md" | "lg", string>;
            };
          };
          marginLeft: {
            dynamic: {
              default: string;
              conditions: Record<"xs" | "md" | "lg", string>;
            };
            dynamicScale: {
              none: string;
              "0,5":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "1":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "2":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "2,5":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "4":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "6":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "8":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "10":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "12":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "14":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "16":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "18":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "20":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
            };
            name: "marginLeft";
            vars: {
              default: string;
              conditions: Record<"xs" | "md" | "lg", string>;
            };
          };
          marginRight: {
            dynamic: {
              default: string;
              conditions: Record<"xs" | "md" | "lg", string>;
            };
            dynamicScale: {
              none: string;
              "0,5":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "1":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "2":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "2,5":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "4":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "6":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "8":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "10":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "12":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "14":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "16":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "18":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "20":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
            };
            name: "marginRight";
            vars: {
              default: string;
              conditions: Record<"xs" | "md" | "lg", string>;
            };
          };
        };
      } & {
        config: {
          padding: {
            mappings: (
              | "paddingTop"
              | "paddingBottom"
              | "paddingLeft"
              | "paddingRight"
            )[];
          };
          paddingX: {
            mappings: ("paddingLeft" | "paddingRight")[];
          };
          paddingY: {
            mappings: ("paddingTop" | "paddingBottom")[];
          };
          p: {
            mappings: "padding"[];
          };
          pl: {
            mappings: "paddingLeft"[];
          };
          pr: {
            mappings: "paddingRight"[];
          };
          pt: {
            mappings: "paddingTop"[];
          };
          pb: {
            mappings: "paddingBottom"[];
          };
          px: {
            mappings: ("paddingLeft" | "paddingRight")[];
          };
          py: {
            mappings: ("paddingTop" | "paddingBottom")[];
          };
          margin: {
            mappings: (
              | "marginTop"
              | "marginBottom"
              | "marginLeft"
              | "marginRight"
            )[];
          };
          marginX: {
            mappings: ("marginLeft" | "marginRight")[];
          };
          marginY: {
            mappings: ("marginTop" | "marginBottom")[];
          };
          m: {
            mappings: "margin"[];
          };
          mr: {
            mappings: "marginRight"[];
          };
          ml: {
            mappings: "marginLeft"[];
          };
          mt: {
            mappings: "marginTop"[];
          };
          mb: {
            mappings: "marginBottom"[];
          };
          mx: {
            mappings: ("marginLeft" | "marginRight")[];
          };
          my: {
            mappings: ("marginTop" | "marginBottom")[];
          };
        };
      }
    ]
  >;
  export {};
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/box/box.sprinkle.types" {
  import {
    backgroundColorProperties,
    borderColorProperties,
    borderStyleProperties,
    boxSizingProperties,
    cursorProperties,
    spaceProperties,
  } from "@nimbus-ds/button/core/styles/src/packages/atomic/box/box.sprinkle.css";
  type CursorProperties = typeof cursorProperties[number];
  type BorderColorProperties = keyof typeof borderColorProperties;
  type BackgroundColorProperties = keyof typeof backgroundColorProperties;
  type BorderStyleProperties = typeof borderStyleProperties[number];
  type BoxSizingProperties = typeof boxSizingProperties[number];
  type SpaceProperties = keyof typeof spaceProperties;
  interface Conditions<T> {
    xs?: T;
    md?: T;
    lg?: T;
  }
  export interface BoxSprinkle {
    width?: string | Conditions<string>;
    height?: string | Conditions<string>;
    cursor?: CursorProperties | Conditions<CursorProperties>;
    backgroundColor?:
      | BackgroundColorProperties
      | Conditions<BackgroundColorProperties>;
    borderRadius?: string | Conditions<string>;
    borderWidth?: string | Conditions<string>;
    borderColor?: BorderColorProperties | Conditions<BorderColorProperties>;
    borderStyle?: BorderStyleProperties | Conditions<BorderStyleProperties>;
    boxSizing?: BoxSizingProperties | Conditions<BoxSizingProperties>;
    padding?: SpaceProperties | Conditions<SpaceProperties>;
    paddingTop?: SpaceProperties | Conditions<SpaceProperties>;
    paddingBottom?: SpaceProperties | Conditions<SpaceProperties>;
    paddingLeft?: SpaceProperties | Conditions<SpaceProperties>;
    paddingRight?: SpaceProperties | Conditions<SpaceProperties>;
    margin?: SpaceProperties | Conditions<SpaceProperties>;
    marginTop?: SpaceProperties | Conditions<SpaceProperties>;
    marginBottom?: SpaceProperties | Conditions<SpaceProperties>;
    marginLeft?: SpaceProperties | Conditions<SpaceProperties>;
    marginRight?: SpaceProperties | Conditions<SpaceProperties>;
    paddingX?: SpaceProperties | Conditions<SpaceProperties>;
    paddingY?: SpaceProperties | Conditions<SpaceProperties>;
    p?: SpaceProperties | Conditions<SpaceProperties>;
    pl?: SpaceProperties | Conditions<SpaceProperties>;
    pr?: SpaceProperties | Conditions<SpaceProperties>;
    pt?: SpaceProperties | Conditions<SpaceProperties>;
    pb?: SpaceProperties | Conditions<SpaceProperties>;
    px?: SpaceProperties | Conditions<SpaceProperties>;
    py?: SpaceProperties | Conditions<SpaceProperties>;
    marginX?: SpaceProperties | Conditions<SpaceProperties>;
    marginY?: SpaceProperties | Conditions<SpaceProperties>;
    m?: SpaceProperties | Conditions<SpaceProperties>;
    mr?: SpaceProperties | Conditions<SpaceProperties>;
    ml?: SpaceProperties | Conditions<SpaceProperties>;
    mt?: SpaceProperties | Conditions<SpaceProperties>;
    mb?: SpaceProperties | Conditions<SpaceProperties>;
    mx?: SpaceProperties | Conditions<SpaceProperties>;
    my?: SpaceProperties | Conditions<SpaceProperties>;
  }
  export {};
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/box/index" {
  export const box: {
    sprinkle: import("rainbow-sprinkles/dist/declarations/src/createRuntimeFn").SprinklesFn<
      [
        {
          config: {
            borderStyle: {
              values: {
                none: {
                  default: string;
                  conditions: Record<"xs" | "md" | "lg", string>;
                };
                hidden: {
                  default: string;
                  conditions: Record<"xs" | "md" | "lg", string>;
                };
                dashed: {
                  default: string;
                  conditions: Record<"xs" | "md" | "lg", string>;
                };
                dotted: {
                  default: string;
                  conditions: Record<"xs" | "md" | "lg", string>;
                };
                solid: {
                  default: string;
                  conditions: Record<"xs" | "md" | "lg", string>;
                };
              };
              staticScale: (
                | "none"
                | "hidden"
                | "dashed"
                | "dotted"
                | "solid"
              )[];
              name: "borderStyle";
            };
            boxSizing: {
              values: {
                "border-box": {
                  default: string;
                  conditions: Record<"xs" | "md" | "lg", string>;
                };
                "content-box": {
                  default: string;
                  conditions: Record<"xs" | "md" | "lg", string>;
                };
              };
              staticScale: ("border-box" | "content-box")[];
              name: "boxSizing";
            };
            cursor: {
              values: {
                auto: {
                  default: string;
                  conditions: Record<"xs" | "md" | "lg", string>;
                };
                pointer: {
                  default: string;
                  conditions: Record<"xs" | "md" | "lg", string>;
                };
              };
              staticScale: ("auto" | "pointer")[];
              name: "cursor";
            };
          };
        } & {
          config: {
            width: {
              dynamic: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
              dynamicScale: true;
              name: "width";
              vars: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
            };
            height: {
              dynamic: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
              dynamicScale: true;
              name: "height";
              vars: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
            };
            borderRadius: {
              dynamic: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
              dynamicScale: true;
              name: "borderRadius";
              vars: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
            };
            borderWidth: {
              dynamic: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
              dynamicScale: true;
              name: "borderWidth";
              vars: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
            };
            backgroundColor: {
              dynamic: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
              dynamicScale: {
                "primary.interactive":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "primary.surface":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "primary.surfaceHighlight":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "primary.textLow":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "success.interactive":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "success.surface":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "success.surfaceHighlight":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "success.textLow":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "warning.interactive":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "warning.surface":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "warning.surfaceHighlight":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "warning.textLow":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "danger.interactive":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "danger.surface":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "danger.surfaceHighlight":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "danger.textLow":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "neutral.background":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "neutral.interactive":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "neutral.surface":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "neutral.surfaceHighlight":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "neutral.textLow":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
              };
              name: "backgroundColor";
              vars: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
            };
            borderColor: {
              dynamic: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
              dynamicScale: {
                "primary.interactive":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "primary.surface":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "primary.surfaceHighlight":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "success.interactive":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "success.surface":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "success.surfaceHighlight":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "warning.interactive":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "warning.surface":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "warning.surfaceHighlight":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "danger.interactive":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "danger.surface":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "danger.surfaceHighlight":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "neutral.interactive":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "neutral.surface":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "neutral.surfaceHighlight":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
              };
              name: "borderColor";
              vars: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
            };
            padding: {
              dynamic: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
              dynamicScale: {
                none: string;
                "0,5":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "1":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "2":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "2,5":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "4":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "6":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "8":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "10":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "12":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "14":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "16":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "18":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "20":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
              };
              name: "padding";
              vars: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
            };
            paddingTop: {
              dynamic: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
              dynamicScale: {
                none: string;
                "0,5":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "1":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "2":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "2,5":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "4":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "6":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "8":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "10":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "12":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "14":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "16":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "18":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "20":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
              };
              name: "paddingTop";
              vars: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
            };
            paddingBottom: {
              dynamic: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
              dynamicScale: {
                none: string;
                "0,5":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "1":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "2":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "2,5":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "4":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "6":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "8":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "10":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "12":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "14":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "16":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "18":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "20":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
              };
              name: "paddingBottom";
              vars: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
            };
            paddingLeft: {
              dynamic: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
              dynamicScale: {
                none: string;
                "0,5":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "1":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "2":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "2,5":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "4":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "6":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "8":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "10":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "12":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "14":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "16":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "18":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "20":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
              };
              name: "paddingLeft";
              vars: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
            };
            paddingRight: {
              dynamic: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
              dynamicScale: {
                none: string;
                "0,5":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "1":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "2":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "2,5":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "4":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "6":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "8":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "10":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "12":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "14":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "16":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "18":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "20":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
              };
              name: "paddingRight";
              vars: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
            };
            margin: {
              dynamic: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
              dynamicScale: {
                none: string;
                "0,5":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "1":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "2":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "2,5":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "4":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "6":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "8":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "10":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "12":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "14":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "16":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "18":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "20":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
              };
              name: "margin";
              vars: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
            };
            marginTop: {
              dynamic: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
              dynamicScale: {
                none: string;
                "0,5":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "1":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "2":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "2,5":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "4":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "6":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "8":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "10":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "12":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "14":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "16":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "18":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "20":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
              };
              name: "marginTop";
              vars: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
            };
            marginBottom: {
              dynamic: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
              dynamicScale: {
                none: string;
                "0,5":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "1":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "2":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "2,5":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "4":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "6":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "8":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "10":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "12":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "14":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "16":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "18":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "20":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
              };
              name: "marginBottom";
              vars: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
            };
            marginLeft: {
              dynamic: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
              dynamicScale: {
                none: string;
                "0,5":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "1":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "2":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "2,5":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "4":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "6":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "8":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "10":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "12":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "14":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "16":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "18":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "20":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
              };
              name: "marginLeft";
              vars: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
            };
            marginRight: {
              dynamic: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
              dynamicScale: {
                none: string;
                "0,5":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "1":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "2":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "2,5":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "4":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "6":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "8":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "10":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "12":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "14":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "16":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "18":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "20":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
              };
              name: "marginRight";
              vars: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
            };
          };
        } & {
          config: {
            padding: {
              mappings: (
                | "paddingTop"
                | "paddingBottom"
                | "paddingLeft"
                | "paddingRight"
              )[];
            };
            paddingX: {
              mappings: ("paddingLeft" | "paddingRight")[];
            };
            paddingY: {
              mappings: ("paddingTop" | "paddingBottom")[];
            };
            p: {
              mappings: "padding"[];
            };
            pl: {
              mappings: "paddingLeft"[];
            };
            pr: {
              mappings: "paddingRight"[];
            };
            pt: {
              mappings: "paddingTop"[];
            };
            pb: {
              mappings: "paddingBottom"[];
            };
            px: {
              mappings: ("paddingLeft" | "paddingRight")[];
            };
            py: {
              mappings: ("paddingTop" | "paddingBottom")[];
            };
            margin: {
              mappings: (
                | "marginTop"
                | "marginBottom"
                | "marginLeft"
                | "marginRight"
              )[];
            };
            marginX: {
              mappings: ("marginLeft" | "marginRight")[];
            };
            marginY: {
              mappings: ("marginTop" | "marginBottom")[];
            };
            m: {
              mappings: "margin"[];
            };
            mr: {
              mappings: "marginRight"[];
            };
            ml: {
              mappings: "marginLeft"[];
            };
            mt: {
              mappings: "marginTop"[];
            };
            mb: {
              mappings: "marginBottom"[];
            };
            mx: {
              mappings: ("marginLeft" | "marginRight")[];
            };
            my: {
              mappings: ("marginTop" | "marginBottom")[];
            };
          };
        }
      ]
    >;
    properties: {
      backgroundColor: {
        "primary.interactive":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "primary.surface":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "primary.surfaceHighlight":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "primary.textLow":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "success.interactive":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "success.surface":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "success.surfaceHighlight":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "success.textLow":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "warning.interactive":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "warning.surface":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "warning.surfaceHighlight":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "warning.textLow":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "danger.interactive":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "danger.surface":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "danger.surfaceHighlight":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "danger.textLow":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "neutral.background":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "neutral.interactive":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "neutral.surface":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "neutral.surfaceHighlight":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "neutral.textLow":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
      };
      borderColor: {
        "primary.interactive":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "primary.surface":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "primary.surfaceHighlight":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "success.interactive":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "success.surface":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "success.surfaceHighlight":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "warning.interactive":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "warning.surface":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "warning.surfaceHighlight":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "danger.interactive":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "danger.surface":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "danger.surfaceHighlight":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "neutral.interactive":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "neutral.surface":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "neutral.surfaceHighlight":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
      };
      borderStyle: ("none" | "hidden" | "dashed" | "dotted" | "solid")[];
      boxSizing: ("border-box" | "content-box")[];
      space: {
        none: string;
        "0,5":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "1":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "2":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "2,5":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "4":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "6":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "8":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "10":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "12":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "14":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "16":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "18":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "20":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
      };
      cursor: ("auto" | "pointer")[];
    };
  };
  export type { BoxSprinkle } from "@nimbus-ds/button/core/styles/src/packages/atomic/box/box.sprinkle.types";
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/button/button.style.css" {
  export const style: Record<"primary" | "danger" | "neutral", string>;
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/button/index" {
  export const button: {
    style: Record<"primary" | "danger" | "neutral", string>;
  };
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/checkbox/checkbox.sprinkle.css" {
  export const borderColorProperties: {
    "primary.interactive":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "danger.interactive":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "neutral.interactive":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
  };
  export const cursorProperties: {
    pointer: string;
    auto: string;
  };
  export const sprinkle: ((props: {
    borderColor?:
      | "primary.interactive"
      | "danger.interactive"
      | "neutral.interactive"
      | undefined;
    cursor?: "auto" | "pointer" | undefined;
  }) => string) & {
    properties: Set<"cursor" | "borderColor">;
  };
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/checkbox/checkbox.style.css" {
  export const container: string;
  export const input: string;
  export const checkmark: string;
  export const checkicon: string;
  export const checkindeterminate: string;
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/checkbox/index" {
  import * as styles from "@nimbus-ds/button/core/styles/src/packages/atomic/checkbox/checkbox.style.css";
  export const checkbox: {
    style: typeof styles;
    sprinkle: ((props: {
      borderColor?:
        | "primary.interactive"
        | "danger.interactive"
        | "neutral.interactive"
        | undefined;
      cursor?: "auto" | "pointer" | undefined;
    }) => string) & {
      properties: Set<"cursor" | "borderColor">;
    };
    properties: {
      color: {
        "primary.interactive":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "danger.interactive":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "neutral.interactive":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
      };
      cursor: {
        pointer: string;
        auto: string;
      };
    };
  };
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/chip/chip.style.css" {
  export const style: string;
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/chip/index" {
  export const chip: {
    style: string;
  };
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/fileUploader/fileUploader.sprinkle.css" {
  export const aspectRatioProperties: {
    "1-1": string;
    "16-9": string;
    "9-16": string;
    "4-3": string;
    "3-4": string;
    "2-1": string;
    "1-2": string;
    none: string;
  };
  export const flexDirectionProperties: {
    readonly row: "row";
    readonly column: "column";
  };
  export const cursorProperties: {
    pointer: string;
    auto: string;
  };
  export const sprinkle: ((props: {
    aspectRatio?:
      | "none"
      | "1-1"
      | "16-9"
      | "9-16"
      | "4-3"
      | "3-4"
      | "2-1"
      | "1-2"
      | undefined;
    flexDirection?: "column" | "row" | undefined;
    cursor?: "auto" | "pointer" | undefined;
  }) => string) & {
    properties: Set<"aspectRatio" | "cursor" | "flexDirection">;
  };
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/fileUploader/fileUploader.style.css" {
  export const container: string;
  export const disabled: string;
  export const input: string;
  export const skeleton: string;
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/fileUploader/index" {
  import * as style from "@nimbus-ds/button/core/styles/src/packages/atomic/fileUploader/fileUploader.style.css";
  export const fileUploader: {
    style: typeof style;
    sprinkle: ((props: {
      aspectRatio?:
        | "none"
        | "1-1"
        | "16-9"
        | "9-16"
        | "4-3"
        | "3-4"
        | "2-1"
        | "1-2"
        | undefined;
      flexDirection?: "column" | "row" | undefined;
      cursor?: "auto" | "pointer" | undefined;
    }) => string) & {
      properties: Set<"aspectRatio" | "cursor" | "flexDirection">;
    };
    properties: {
      aspectRatio: {
        "1-1": string;
        "16-9": string;
        "9-16": string;
        "4-3": string;
        "3-4": string;
        "2-1": string;
        "1-2": string;
        none: string;
      };
      flexDirection: {
        readonly row: "row";
        readonly column: "column";
      };
    };
  };
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/icon/icon.sprinkle.css" {
  export const colorProperties: {
    "primary.interactive":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "primary.textLow":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "primary.textHigh":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "success.interactive":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "success.textLow":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "success.textHigh":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "warning.interactive":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "warning.textLow":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "warning.textHigh":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "danger.interactive":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "danger.textLow":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "danger.textHigh":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "neutral.background":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "neutral.interactive":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "neutral.textLow":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "neutral.textDisabled":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "neutral.textHigh":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
  };
  export const cursorProperties: readonly ["auto", "pointer"];
  export const sprinkle: ((props: {
    color?:
      | "primary.interactive"
      | "primary.textLow"
      | "primary.textHigh"
      | "success.interactive"
      | "success.textLow"
      | "success.textHigh"
      | "warning.interactive"
      | "warning.textLow"
      | "warning.textHigh"
      | "danger.interactive"
      | "danger.textLow"
      | "danger.textHigh"
      | "neutral.background"
      | "neutral.interactive"
      | "neutral.textDisabled"
      | "neutral.textLow"
      | "neutral.textHigh"
      | undefined;
    cursor?: "auto" | "pointer" | undefined;
  }) => string) & {
    properties: Set<"color" | "cursor">;
  };
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/icon/icon.style.css" {
  export const style: string;
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/icon/index" {
  export const icon: {
    style: string;
    sprinkle: ((props: {
      color?:
        | "primary.interactive"
        | "primary.textLow"
        | "primary.textHigh"
        | "success.interactive"
        | "success.textLow"
        | "success.textHigh"
        | "warning.interactive"
        | "warning.textLow"
        | "warning.textHigh"
        | "danger.interactive"
        | "danger.textLow"
        | "danger.textHigh"
        | "neutral.background"
        | "neutral.interactive"
        | "neutral.textDisabled"
        | "neutral.textLow"
        | "neutral.textHigh"
        | undefined;
      cursor?: "auto" | "pointer" | undefined;
    }) => string) & {
      properties: Set<"color" | "cursor">;
    };
    properties: {
      color: {
        "primary.interactive":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "primary.textLow":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "primary.textHigh":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "success.interactive":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "success.textLow":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "success.textHigh":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "warning.interactive":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "warning.textLow":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "warning.textHigh":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "danger.interactive":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "danger.textLow":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "danger.textHigh":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "neutral.background":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "neutral.interactive":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "neutral.textLow":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "neutral.textDisabled":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "neutral.textHigh":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
      };
      cursor: readonly ["auto", "pointer"];
    };
  };
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/iconButton/iconButton.sprinkle.css" {
  export const backgroundColorProperties: {
    transparent: string;
    "neutral.interactive":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "neutral.surfaceHighlight":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "neutral.interactivePressed":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
  };
  export const borderColorProperties: {
    "neutral.interactive":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "neutral.interactiveHover":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    transparent: string;
    "neutral.surfaceHighlight":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "neutral.interactivePressed":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
  };
  export const sprinkle: import("rainbow-sprinkles/dist/declarations/src/createRuntimeFn").SprinklesFn<
    [
      {
        config: {};
      } & {
        config: {
          width: {
            dynamic: {
              default: string;
              conditions: Record<
                "xs" | "md" | "lg" | "active" | "hover" | "focus",
                string
              >;
            };
            dynamicScale: true;
            name: "width";
            vars: {
              default: string;
              conditions: Record<
                "xs" | "md" | "lg" | "active" | "hover" | "focus",
                string
              >;
            };
          };
          height: {
            dynamic: {
              default: string;
              conditions: Record<
                "xs" | "md" | "lg" | "active" | "hover" | "focus",
                string
              >;
            };
            dynamicScale: true;
            name: "height";
            vars: {
              default: string;
              conditions: Record<
                "xs" | "md" | "lg" | "active" | "hover" | "focus",
                string
              >;
            };
          };
          backgroundColor: {
            dynamic: {
              default: string;
              conditions: Record<
                "xs" | "md" | "lg" | "active" | "hover" | "focus",
                string
              >;
            };
            dynamicScale: {
              transparent: string;
              "neutral.interactive":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "neutral.surfaceHighlight":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "neutral.interactivePressed":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
            };
            name: "backgroundColor";
            vars: {
              default: string;
              conditions: Record<
                "xs" | "md" | "lg" | "active" | "hover" | "focus",
                string
              >;
            };
          };
          borderColor: {
            dynamic: {
              default: string;
              conditions: Record<
                "xs" | "md" | "lg" | "active" | "hover" | "focus",
                string
              >;
            };
            dynamicScale: {
              "neutral.interactive":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "neutral.interactiveHover":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              transparent: string;
              "neutral.surfaceHighlight":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "neutral.interactivePressed":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
            };
            name: "borderColor";
            vars: {
              default: string;
              conditions: Record<
                "xs" | "md" | "lg" | "active" | "hover" | "focus",
                string
              >;
            };
          };
        };
      } & {
        config: {
          size: {
            mappings: ("width" | "height")[];
          };
        };
      }
    ]
  >;
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/iconButton/iconButton.sprinkle.types" {
  import {
    backgroundColorProperties,
    borderColorProperties,
  } from "@nimbus-ds/button/core/styles/src/packages/atomic/iconButton/iconButton.sprinkle.css";
  type BackgroundColorProperties = keyof typeof backgroundColorProperties;
  type BorderColorProperties = keyof typeof borderColorProperties;
  interface Conditions<T> {
    xs?: T;
    md?: T;
    lg?: T;
    focus?: T;
    active?: T;
    hover?: T;
  }
  export interface IconButtonSprinkle {
    size?: string | Conditions<string>;
    borderColor?: BorderColorProperties | Conditions<BorderColorProperties>;
    backgroundColor?:
      | BackgroundColorProperties
      | Conditions<BackgroundColorProperties>;
  }
  export {};
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/iconButton/iconButton.style.css" {
  export const container: string;
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/iconButton/index" {
  import * as style from "@nimbus-ds/button/core/styles/src/packages/atomic/iconButton/iconButton.style.css";
  export const iconButton: {
    style: typeof style;
    sprinkle: import("rainbow-sprinkles/dist/declarations/src/createRuntimeFn").SprinklesFn<
      [
        {
          config: {};
        } & {
          config: {
            width: {
              dynamic: {
                default: string;
                conditions: Record<
                  "xs" | "md" | "lg" | "active" | "hover" | "focus",
                  string
                >;
              };
              dynamicScale: true;
              name: "width";
              vars: {
                default: string;
                conditions: Record<
                  "xs" | "md" | "lg" | "active" | "hover" | "focus",
                  string
                >;
              };
            };
            height: {
              dynamic: {
                default: string;
                conditions: Record<
                  "xs" | "md" | "lg" | "active" | "hover" | "focus",
                  string
                >;
              };
              dynamicScale: true;
              name: "height";
              vars: {
                default: string;
                conditions: Record<
                  "xs" | "md" | "lg" | "active" | "hover" | "focus",
                  string
                >;
              };
            };
            backgroundColor: {
              dynamic: {
                default: string;
                conditions: Record<
                  "xs" | "md" | "lg" | "active" | "hover" | "focus",
                  string
                >;
              };
              dynamicScale: {
                transparent: string;
                "neutral.interactive":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "neutral.surfaceHighlight":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "neutral.interactivePressed":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
              };
              name: "backgroundColor";
              vars: {
                default: string;
                conditions: Record<
                  "xs" | "md" | "lg" | "active" | "hover" | "focus",
                  string
                >;
              };
            };
            borderColor: {
              dynamic: {
                default: string;
                conditions: Record<
                  "xs" | "md" | "lg" | "active" | "hover" | "focus",
                  string
                >;
              };
              dynamicScale: {
                "neutral.interactive":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "neutral.interactiveHover":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                transparent: string;
                "neutral.surfaceHighlight":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "neutral.interactivePressed":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
              };
              name: "borderColor";
              vars: {
                default: string;
                conditions: Record<
                  "xs" | "md" | "lg" | "active" | "hover" | "focus",
                  string
                >;
              };
            };
          };
        } & {
          config: {
            size: {
              mappings: ("width" | "height")[];
            };
          };
        }
      ]
    >;
    properties: {
      backgroundColor: {
        transparent: string;
        "neutral.interactive":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "neutral.surfaceHighlight":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "neutral.interactivePressed":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
      };
      borderColor: {
        "neutral.interactive":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "neutral.interactiveHover":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        transparent: string;
        "neutral.surfaceHighlight":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "neutral.interactivePressed":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
      };
    };
  };
  export type { IconButtonSprinkle } from "@nimbus-ds/button/core/styles/src/packages/atomic/iconButton/iconButton.sprinkle.types";
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/input/index" {
  import * as style from "@nimbus-ds/button/core/styles/src/packages/atomic/input/input.style.css";
  export const input: {
    style: typeof style;
  };
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/input/input.style.css" {
  export const container: string;
  export const baseAppend: string;
  export const append: Record<"end" | "start", string>;
  export const inputAppearance: Record<
    "success" | "warning" | "danger" | "neutral",
    string
  >;
  export const inputAppend: Record<"end" | "start", string>;
  export const password: string;
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/label/index" {
  import * as style from "@nimbus-ds/button/core/styles/src/packages/atomic/label/label.style.css";
  export const label: {
    style: typeof style;
  };
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/label/label.style.css" {
  export const base: string;
  export const hidden: string;
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/link/index" {
  import * as style from "@nimbus-ds/button/core/styles/src/packages/atomic/link/link.style.css";
  export const link: {
    style: typeof style;
  };
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/link/link.style.css" {
  export const size: Record<"caption" | "base" | "highlight", string>;
  export const textDecoration: Record<"none" | "underline", string>;
  export const appearance: Record<"primary" | "danger" | "neutral", string>;
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/list/index" {
  import * as style from "@nimbus-ds/button/core/styles/src/packages/atomic/list/list.style.css";
  export const list: {
    style: typeof style;
  };
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/list/list.style.css" {
  export const container: string;
  export const item: string;
  export const skeleton: string;
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/popover/index" {
  import * as style from "@nimbus-ds/button/core/styles/src/packages/atomic/popover/popover.style.css";
  export const popover: {
    style: typeof style;
    sprinkle: ((props: {
      backgroundColor?:
        | "primary"
        | "success"
        | "warning"
        | "danger"
        | "neutral"
        | "light"
        | undefined;
      color?:
        | "primary"
        | "success"
        | "warning"
        | "danger"
        | "neutral"
        | "light"
        | undefined;
      padding?: "base" | "none" | undefined;
    }) => string) & {
      properties: Set<"backgroundColor" | "color" | "padding">;
    };
    properties: {
      backgroundColor: {
        primary:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        success:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        danger:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        neutral:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        warning:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        light:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
      };
      padding: {
        base:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        none: number;
      };
      color: {
        primary:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        success:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        danger:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        neutral:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        warning:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        light:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
      };
    };
  };
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/popover/popover.sprinkle.css" {
  export const backgroundColorProperties: {
    primary:
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    success:
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    danger:
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    neutral:
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    warning:
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    light:
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
  };
  export const colorProperties: {
    primary:
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    success:
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    danger:
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    neutral:
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    warning:
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    light:
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
  };
  export const paddingProperties: {
    base:
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    none: number;
  };
  export const sprinkle: ((props: {
    backgroundColor?:
      | "primary"
      | "success"
      | "warning"
      | "danger"
      | "neutral"
      | "light"
      | undefined;
    color?:
      | "primary"
      | "success"
      | "warning"
      | "danger"
      | "neutral"
      | "light"
      | undefined;
    padding?: "base" | "none" | undefined;
  }) => string) & {
    properties: Set<"backgroundColor" | "color" | "padding">;
  };
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/popover/popover.style.css" {
  export const content: string;
  export const baseArrow: string;
  export const arrow: Record<"bottom" | "left" | "right" | "top", string>;
  export const placement: Record<
    | "bottom"
    | "left"
    | "right"
    | "top"
    | "top-start"
    | "top-end"
    | "right-start"
    | "right-end"
    | "bottom-start"
    | "bottom-end"
    | "left-start"
    | "left-end",
    string
  >;
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/radio/index" {
  import * as styles from "@nimbus-ds/button/core/styles/src/packages/atomic/radio/radio.style.css";
  export const radio: {
    style: typeof styles;
    sprinkle: ((props: {
      cursor?: "auto" | "pointer" | undefined;
    }) => string) & {
      properties: Set<"cursor">;
    };
    properties: {
      cursor: {
        pointer: string;
        auto: string;
      };
    };
  };
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/radio/radio.sprinkle.css" {
  export const cursorProperties: {
    pointer: string;
    auto: string;
  };
  export const sprinkle: ((props: {
    cursor?: "auto" | "pointer" | undefined;
  }) => string) & {
    properties: Set<"cursor">;
  };
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/radio/radio.style.css" {
  export const container: string;
  export const content: Record<"button" | "radio" | "disabled", string>;
  export const input: string;
  export const checkmark: string;
  export const checkicon: string;
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/select/index" {
  export const select: {
    style: {
      wrapper: string;
      icon: string;
      appearance: Record<"success" | "warning" | "danger" | "neutral", string>;
    };
  };
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/select/select.style.css" {
  export const wrapper: string;
  export const icon: string;
  export const appearance: Record<
    "success" | "warning" | "danger" | "neutral",
    string
  >;
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/skeleton/index" {
  export const skeleton: {
    style: string;
  };
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/skeleton/skeleton.style.css" {
  export const style: string;
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/spinner/index" {
  export const spinner: {
    style: string;
    sprinkle: ((props: {
      color?:
        | "primary.interactive"
        | "primary.textLow"
        | "success.interactive"
        | "success.textLow"
        | "danger.interactive"
        | "danger.textLow"
        | "neutral.background"
        | "neutral.interactive"
        | "neutral.textLow"
        | undefined;
    }) => string) & {
      properties: Set<"color">;
    };
    properties: {
      "primary.interactive":
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      "primary.textLow":
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      "success.interactive":
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      "success.textLow":
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      "danger.interactive":
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      "danger.textLow":
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      "neutral.background":
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      "neutral.interactive":
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      "neutral.textLow":
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
    };
  };
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/spinner/spinner.sprinkle.css" {
  export const properties: {
    "primary.interactive":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "primary.textLow":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "success.interactive":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "success.textLow":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "danger.interactive":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "danger.textLow":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "neutral.background":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "neutral.interactive":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "neutral.textLow":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
  };
  export const sprinkle: ((props: {
    color?:
      | "primary.interactive"
      | "primary.textLow"
      | "success.interactive"
      | "success.textLow"
      | "danger.interactive"
      | "danger.textLow"
      | "neutral.background"
      | "neutral.interactive"
      | "neutral.textLow"
      | undefined;
  }) => string) & {
    properties: Set<"color">;
  };
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/spinner/spinner.style.css" {
  export const style: string;
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/stack/index" {
  export const stack: {
    sprinkle: import("rainbow-sprinkles/dist/declarations/src/createRuntimeFn").SprinklesFn<
      [
        {
          config: {
            display: {
              values: {
                flex: {
                  default: string;
                  conditions: Record<"xs" | "md" | "lg", string>;
                };
                grid: {
                  default: string;
                  conditions: Record<"xs" | "md" | "lg", string>;
                };
                block: {
                  default: string;
                  conditions: Record<"xs" | "md" | "lg", string>;
                };
                "inline-flex": {
                  default: string;
                  conditions: Record<"xs" | "md" | "lg", string>;
                };
                "inline-grid": {
                  default: string;
                  conditions: Record<"xs" | "md" | "lg", string>;
                };
              };
              staticScale: (
                | "flex"
                | "grid"
                | "block"
                | "inline-flex"
                | "inline-grid"
              )[];
              name: "display";
            };
            flexDirection: {
              values: {
                column: {
                  default: string;
                  conditions: Record<"xs" | "md" | "lg", string>;
                };
                "column-reverse": {
                  default: string;
                  conditions: Record<"xs" | "md" | "lg", string>;
                };
                row: {
                  default: string;
                  conditions: Record<"xs" | "md" | "lg", string>;
                };
                "row-reverse": {
                  default: string;
                  conditions: Record<"xs" | "md" | "lg", string>;
                };
              };
              staticScale: (
                | "column"
                | "column-reverse"
                | "row"
                | "row-reverse"
              )[];
              name: "flexDirection";
            };
            flexWrap: {
              values: {
                nowrap: {
                  default: string;
                  conditions: Record<"xs" | "md" | "lg", string>;
                };
                wrap: {
                  default: string;
                  conditions: Record<"xs" | "md" | "lg", string>;
                };
                "wrap-reverse": {
                  default: string;
                  conditions: Record<"xs" | "md" | "lg", string>;
                };
              };
              staticScale: ("nowrap" | "wrap" | "wrap-reverse")[];
              name: "flexWrap";
            };
            justifyContent: {
              values: {
                center: {
                  default: string;
                  conditions: Record<"xs" | "md" | "lg", string>;
                };
                "flex-end": {
                  default: string;
                  conditions: Record<"xs" | "md" | "lg", string>;
                };
                "flex-start": {
                  default: string;
                  conditions: Record<"xs" | "md" | "lg", string>;
                };
                "space-around": {
                  default: string;
                  conditions: Record<"xs" | "md" | "lg", string>;
                };
                "space-between": {
                  default: string;
                  conditions: Record<"xs" | "md" | "lg", string>;
                };
                "space-evenly": {
                  default: string;
                  conditions: Record<"xs" | "md" | "lg", string>;
                };
              };
              staticScale: (
                | "center"
                | "flex-end"
                | "flex-start"
                | "space-around"
                | "space-between"
                | "space-evenly"
              )[];
              name: "justifyContent";
            };
            alignItems: {
              values: {
                center: {
                  default: string;
                  conditions: Record<"xs" | "md" | "lg", string>;
                };
                "flex-end": {
                  default: string;
                  conditions: Record<"xs" | "md" | "lg", string>;
                };
                "flex-start": {
                  default: string;
                  conditions: Record<"xs" | "md" | "lg", string>;
                };
                baseline: {
                  default: string;
                  conditions: Record<"xs" | "md" | "lg", string>;
                };
                stretch: {
                  default: string;
                  conditions: Record<"xs" | "md" | "lg", string>;
                };
              };
              staticScale: (
                | "center"
                | "flex-end"
                | "flex-start"
                | "baseline"
                | "stretch"
              )[];
              name: "alignItems";
            };
          };
        } & {
          config: {
            width: {
              dynamic: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
              dynamicScale: true;
              name: "width";
              vars: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
            };
            height: {
              dynamic: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
              dynamicScale: true;
              name: "height";
              vars: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
            };
            flex: {
              dynamic: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
              dynamicScale: true;
              name: "flex";
              vars: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
            };
            gridTemplateAreas: {
              dynamic: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
              dynamicScale: true;
              name: "gridTemplateAreas";
              vars: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
            };
            gridTemplateColumns: {
              dynamic: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
              dynamicScale: true;
              name: "gridTemplateColumns";
              vars: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
            };
            gridTemplateRows: {
              dynamic: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
              dynamicScale: true;
              name: "gridTemplateRows";
              vars: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
            };
            gap: {
              dynamic: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
              dynamicScale: {
                none: string;
                "0,5":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "1":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "1,5":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "2":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "2,5":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "4":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "6":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "8":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "10":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "12":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "14":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "16":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "18":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "20":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
              };
              name: "gap";
              vars: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
            };
            gridGap: {
              dynamic: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
              dynamicScale: {
                none: string;
                "0,5":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "1":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "1,5":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "2":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "2,5":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "4":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "6":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "8":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "10":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "12":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "14":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "16":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "18":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                "20":
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
              };
              name: "gridGap";
              vars: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
            };
          };
        } & {
          config: {};
        }
      ]
    >;
    properties: {
      display: ("flex" | "grid" | "block" | "inline-flex" | "inline-grid")[];
      flexDirection: ("column" | "column-reverse" | "row" | "row-reverse")[];
      flexWrap: ("nowrap" | "wrap" | "wrap-reverse")[];
      justifyContent: (
        | "center"
        | "flex-end"
        | "flex-start"
        | "space-around"
        | "space-between"
        | "space-evenly"
      )[];
      alignItems: (
        | "center"
        | "flex-end"
        | "flex-start"
        | "baseline"
        | "stretch"
      )[];
      gap: {
        none: string;
        "0,5":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "1":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "1,5":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "2":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "2,5":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "4":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "6":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "8":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "10":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "12":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "14":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "16":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "18":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "20":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
      };
      gridGap: {
        none: string;
        "0,5":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "1":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "1,5":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "2":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "2,5":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "4":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "6":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "8":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "10":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "12":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "14":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "16":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "18":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "20":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
      };
    };
  };
  export type { StackSprinkle } from "@nimbus-ds/button/core/styles/src/packages/atomic/stack/stack.sprinkle.types";
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/stack/stack.sprinkle.css" {
  type Display = "block" | "flex" | "inline-flex" | "grid" | "inline-grid";
  type FlexWrap = "nowrap" | "wrap" | "wrap-reverse";
  type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";
  type JustifyContent =
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  type AlignItems =
    | "stretch"
    | "flex-start"
    | "flex-end"
    | "center"
    | "baseline";
  export const displayProperties: Display[];
  export const flexDirectionProperties: FlexDirection[];
  export const flexWrapProperties: FlexWrap[];
  export const justifyContentProperties: JustifyContent[];
  export const alignItemsProperties: AlignItems[];
  export const spaceProperties: {
    none: string;
    "0,5":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "1":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "1,5":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "2":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "2,5":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "4":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "6":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "8":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "10":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "12":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "14":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "16":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "18":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "20":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
  };
  export const sprinkle: import("rainbow-sprinkles/dist/declarations/src/createRuntimeFn").SprinklesFn<
    [
      {
        config: {
          display: {
            values: {
              flex: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
              grid: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
              block: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
              "inline-flex": {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
              "inline-grid": {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
            };
            staticScale: Display[];
            name: "display";
          };
          flexDirection: {
            values: {
              column: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
              "column-reverse": {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
              row: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
              "row-reverse": {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
            };
            staticScale: FlexDirection[];
            name: "flexDirection";
          };
          flexWrap: {
            values: {
              nowrap: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
              wrap: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
              "wrap-reverse": {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
            };
            staticScale: FlexWrap[];
            name: "flexWrap";
          };
          justifyContent: {
            values: {
              center: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
              "flex-end": {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
              "flex-start": {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
              "space-around": {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
              "space-between": {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
              "space-evenly": {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
            };
            staticScale: JustifyContent[];
            name: "justifyContent";
          };
          alignItems: {
            values: {
              center: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
              "flex-end": {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
              "flex-start": {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
              baseline: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
              stretch: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
            };
            staticScale: AlignItems[];
            name: "alignItems";
          };
        };
      } & {
        config: {
          width: {
            dynamic: {
              default: string;
              conditions: Record<"xs" | "md" | "lg", string>;
            };
            dynamicScale: true;
            name: "width";
            vars: {
              default: string;
              conditions: Record<"xs" | "md" | "lg", string>;
            };
          };
          height: {
            dynamic: {
              default: string;
              conditions: Record<"xs" | "md" | "lg", string>;
            };
            dynamicScale: true;
            name: "height";
            vars: {
              default: string;
              conditions: Record<"xs" | "md" | "lg", string>;
            };
          };
          flex: {
            dynamic: {
              default: string;
              conditions: Record<"xs" | "md" | "lg", string>;
            };
            dynamicScale: true;
            name: "flex";
            vars: {
              default: string;
              conditions: Record<"xs" | "md" | "lg", string>;
            };
          };
          gridTemplateAreas: {
            dynamic: {
              default: string;
              conditions: Record<"xs" | "md" | "lg", string>;
            };
            dynamicScale: true;
            name: "gridTemplateAreas";
            vars: {
              default: string;
              conditions: Record<"xs" | "md" | "lg", string>;
            };
          };
          gridTemplateColumns: {
            dynamic: {
              default: string;
              conditions: Record<"xs" | "md" | "lg", string>;
            };
            dynamicScale: true;
            name: "gridTemplateColumns";
            vars: {
              default: string;
              conditions: Record<"xs" | "md" | "lg", string>;
            };
          };
          gridTemplateRows: {
            dynamic: {
              default: string;
              conditions: Record<"xs" | "md" | "lg", string>;
            };
            dynamicScale: true;
            name: "gridTemplateRows";
            vars: {
              default: string;
              conditions: Record<"xs" | "md" | "lg", string>;
            };
          };
          gap: {
            dynamic: {
              default: string;
              conditions: Record<"xs" | "md" | "lg", string>;
            };
            dynamicScale: {
              none: string;
              "0,5":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "1":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "1,5":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "2":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "2,5":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "4":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "6":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "8":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "10":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "12":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "14":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "16":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "18":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "20":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
            };
            name: "gap";
            vars: {
              default: string;
              conditions: Record<"xs" | "md" | "lg", string>;
            };
          };
          gridGap: {
            dynamic: {
              default: string;
              conditions: Record<"xs" | "md" | "lg", string>;
            };
            dynamicScale: {
              none: string;
              "0,5":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "1":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "1,5":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "2":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "2,5":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "4":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "6":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "8":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "10":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "12":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "14":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "16":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "18":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              "20":
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
            };
            name: "gridGap";
            vars: {
              default: string;
              conditions: Record<"xs" | "md" | "lg", string>;
            };
          };
        };
      } & {
        config: {};
      }
    ]
  >;
  export {};
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/stack/stack.sprinkle.types" {
  import {
    spaceProperties,
    displayProperties,
    justifyContentProperties,
    flexDirectionProperties,
    alignItemsProperties,
    flexWrapProperties,
  } from "@nimbus-ds/button/core/styles/src/packages/atomic/stack/stack.sprinkle.css";
  type SpaceProperties = keyof typeof spaceProperties;
  type DisplayProperties = typeof displayProperties[number];
  type JustifyContentProperties = typeof justifyContentProperties[number];
  type FlexDirectionProperties = typeof flexDirectionProperties[number];
  type AlignItemsProperties = typeof alignItemsProperties[number];
  type FlexWrapProperties = typeof flexWrapProperties[number];
  interface Conditions<T> {
    xs?: T;
    md?: T;
    lg?: T;
  }
  export interface StackSprinkle {
    width?: string | Conditions<string>;
    height?: string | Conditions<string>;
    flex?: string | Conditions<string>;
    gridTemplateColumns?: string | Conditions<string>;
    gridTemplateAreas?: string | Conditions<string>;
    gridTemplateRows?: string | Conditions<string>;
    display?: DisplayProperties | Conditions<DisplayProperties>;
    flexWrap?: FlexWrapProperties | Conditions<FlexWrapProperties>;
    justifyContent?:
      | JustifyContentProperties
      | Conditions<JustifyContentProperties>;
    flexDirection?:
      | FlexDirectionProperties
      | Conditions<FlexDirectionProperties>;
    alignItems?: AlignItemsProperties | Conditions<AlignItemsProperties>;
    gap?: SpaceProperties | Conditions<SpaceProperties>;
    gridGap?: SpaceProperties | Conditions<SpaceProperties>;
  }
  export {};
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/tag/index" {
  export const tag: {
    style: import("@vanilla-extract/recipes").RuntimeFn<{
      appearance: {
        neutral: {
          color:
            | `var(--${string})`
            | `var(--${string}, ${string})`
            | `var(--${string}, ${number})`;
          backgroundColor:
            | `var(--${string})`
            | `var(--${string}, ${string})`
            | `var(--${string}, ${number})`;
          borderColor:
            | `var(--${string})`
            | `var(--${string}, ${string})`
            | `var(--${string}, ${number})`;
        };
        primary: {
          color:
            | `var(--${string})`
            | `var(--${string}, ${string})`
            | `var(--${string}, ${number})`;
          backgroundColor:
            | `var(--${string})`
            | `var(--${string}, ${string})`
            | `var(--${string}, ${number})`;
          borderColor:
            | `var(--${string})`
            | `var(--${string}, ${string})`
            | `var(--${string}, ${number})`;
        };
        success: {
          color:
            | `var(--${string})`
            | `var(--${string}, ${string})`
            | `var(--${string}, ${number})`;
          backgroundColor:
            | `var(--${string})`
            | `var(--${string}, ${string})`
            | `var(--${string}, ${number})`;
          borderColor:
            | `var(--${string})`
            | `var(--${string}, ${string})`
            | `var(--${string}, ${number})`;
        };
        warning: {
          color:
            | `var(--${string})`
            | `var(--${string}, ${string})`
            | `var(--${string}, ${number})`;
          backgroundColor:
            | `var(--${string})`
            | `var(--${string}, ${string})`
            | `var(--${string}, ${number})`;
          borderColor:
            | `var(--${string})`
            | `var(--${string}, ${string})`
            | `var(--${string}, ${number})`;
        };
        danger: {
          color:
            | `var(--${string})`
            | `var(--${string}, ${string})`
            | `var(--${string}, ${number})`;
          backgroundColor:
            | `var(--${string})`
            | `var(--${string}, ${string})`
            | `var(--${string}, ${number})`;
          borderColor:
            | `var(--${string})`
            | `var(--${string}, ${string})`
            | `var(--${string}, ${number})`;
        };
      };
      defaultVariants: {
        appearance: string;
      };
    }>;
  };
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/tag/tag.style.css" {
  export const style: import("@vanilla-extract/recipes").RuntimeFn<{
    appearance: {
      neutral: {
        color:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        backgroundColor:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        borderColor:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
      };
      primary: {
        color:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        backgroundColor:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        borderColor:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
      };
      success: {
        color:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        backgroundColor:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        borderColor:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
      };
      warning: {
        color:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        backgroundColor:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        borderColor:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
      };
      danger: {
        color:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        backgroundColor:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        borderColor:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
      };
    };
    defaultVariants: {
      appearance: string;
    };
  }>;
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/text/index" {
  export const text: {
    style: string;
    sprinkle: ((props: {
      color?:
        | "primary.interactive"
        | "primary.textLow"
        | "primary.textHigh"
        | "success.interactive"
        | "success.textLow"
        | "success.textHigh"
        | "warning.interactive"
        | "warning.textLow"
        | "warning.textHigh"
        | "danger.interactive"
        | "danger.textLow"
        | "danger.textHigh"
        | "neutral.background"
        | "neutral.interactive"
        | "neutral.textDisabled"
        | "neutral.textLow"
        | "neutral.textHigh"
        | "currentColor"
        | undefined;
      lineHeight?: "caption" | "base" | "highlight" | undefined;
      fontWeight?: "regular" | "bold" | undefined;
      fontSize?: "caption" | "base" | "highlight" | undefined;
      textAlign?: "left" | "right" | "center" | "justify" | undefined;
    }) => string) & {
      properties: Set<
        "fontSize" | "fontWeight" | "color" | "lineHeight" | "textAlign"
      >;
    };
    properties: {
      colors: {
        currentColor: string;
        "primary.interactive":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "primary.textLow":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "primary.textHigh":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "success.interactive":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "success.textLow":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "success.textHigh":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "warning.interactive":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "warning.textLow":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "warning.textHigh":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "danger.interactive":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "danger.textLow":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "danger.textHigh":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "neutral.background":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "neutral.interactive":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "neutral.textDisabled":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "neutral.textLow":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "neutral.textHigh":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
      };
      textAlign: {
        readonly left: "left";
        readonly right: "right";
        readonly center: "center";
        readonly justify: "justify";
      };
      lineHeight: {
        caption:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        base:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        highlight:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
      };
      fontWeight: {
        regular:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        bold:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
      };
      fontSize: {
        caption:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        base:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        highlight:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
      };
    };
  };
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/text/text.sprinkle.css" {
  import { properties as textAlignProperties } from "@nimbus-ds/button/core/styles/src/sprinkles/textAlign.css";
  const colorsProperties: {
    currentColor: string;
    "primary.interactive":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "primary.textLow":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "primary.textHigh":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "success.interactive":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "success.textLow":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "success.textHigh":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "warning.interactive":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "warning.textLow":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "warning.textHigh":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "danger.interactive":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "danger.textLow":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "danger.textHigh":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "neutral.background":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "neutral.interactive":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "neutral.textDisabled":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "neutral.textLow":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "neutral.textHigh":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
  };
  const lineHeightProperties: {
    caption:
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    base:
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    highlight:
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
  };
  const fontWeightProperties: {
    regular:
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    bold:
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
  };
  const fontSizeProperties: {
    caption:
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    base:
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    highlight:
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
  };
  export const sprinkle: ((props: {
    color?:
      | "primary.interactive"
      | "primary.textLow"
      | "primary.textHigh"
      | "success.interactive"
      | "success.textLow"
      | "success.textHigh"
      | "warning.interactive"
      | "warning.textLow"
      | "warning.textHigh"
      | "danger.interactive"
      | "danger.textLow"
      | "danger.textHigh"
      | "neutral.background"
      | "neutral.interactive"
      | "neutral.textDisabled"
      | "neutral.textLow"
      | "neutral.textHigh"
      | "currentColor"
      | undefined;
    lineHeight?: "caption" | "base" | "highlight" | undefined;
    fontWeight?: "regular" | "bold" | undefined;
    fontSize?: "caption" | "base" | "highlight" | undefined;
    textAlign?: "left" | "right" | "center" | "justify" | undefined;
  }) => string) & {
    properties: Set<
      "fontSize" | "fontWeight" | "color" | "lineHeight" | "textAlign"
    >;
  };
  export {
    textAlignProperties,
    colorsProperties,
    lineHeightProperties,
    fontWeightProperties,
    fontSizeProperties,
  };
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/text/text.style.css" {
  export const style: string;
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/textarea/index" {
  export const textarea: {
    style: {
      appearance: Record<"success" | "warning" | "danger" | "neutral", string>;
    };
  };
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/textarea/textarea.style.css" {
  export const appearance: Record<
    "success" | "warning" | "danger" | "neutral",
    string
  >;
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/thumbnail/index" {
  import * as style from "@nimbus-ds/button/core/styles/src/packages/atomic/thumbnail/thumbnail.style.css";
  export const thumbnail: {
    style: typeof style;
    sprinkle: ((props: {
      aspectRatio?:
        | "1-1"
        | "16-9"
        | "9-16"
        | "4-3"
        | "3-4"
        | "2-1"
        | "1-2"
        | undefined;
    }) => string) & {
      properties: Set<"aspectRatio">;
    };
    properties: {
      aspectRatio: {
        "1-1": string;
        "16-9": string;
        "9-16": string;
        "4-3": string;
        "3-4": string;
        "2-1": string;
        "1-2": string;
      };
    };
  };
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/thumbnail/thumbnail.sprinkle.css" {
  export const aspectRatioProperties: {
    "1-1": string;
    "16-9": string;
    "9-16": string;
    "4-3": string;
    "3-4": string;
    "2-1": string;
    "1-2": string;
  };
  export const sprinkle: ((props: {
    aspectRatio?:
      | "1-1"
      | "16-9"
      | "9-16"
      | "4-3"
      | "3-4"
      | "2-1"
      | "1-2"
      | undefined;
  }) => string) & {
    properties: Set<"aspectRatio">;
  };
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/thumbnail/thumbnail.style.css" {
  export const container: string;
  export const image: string;
  export const placeholder: string;
  export const skeleton: string;
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/title/index" {
  export const title: {
    style: import("@vanilla-extract/recipes").RuntimeFn<{
      as: {
        h1: {
          fontSize:
            | `var(--${string})`
            | `var(--${string}, ${string})`
            | `var(--${string}, ${number})`;
          lineHeight:
            | `var(--${string})`
            | `var(--${string}, ${string})`
            | `var(--${string}, ${number})`;
        };
        h2: {
          fontSize:
            | `var(--${string})`
            | `var(--${string}, ${string})`
            | `var(--${string}, ${number})`;
          lineHeight:
            | `var(--${string})`
            | `var(--${string}, ${string})`
            | `var(--${string}, ${number})`;
        };
        h3: {
          fontSize:
            | `var(--${string})`
            | `var(--${string}, ${string})`
            | `var(--${string}, ${number})`;
          lineHeight:
            | `var(--${string})`
            | `var(--${string}, ${string})`
            | `var(--${string}, ${number})`;
        };
        h4: {
          fontSize:
            | `var(--${string})`
            | `var(--${string}, ${string})`
            | `var(--${string}, ${number})`;
          lineHeight:
            | `var(--${string})`
            | `var(--${string}, ${string})`
            | `var(--${string}, ${number})`;
        };
        h5: {
          fontSize:
            | `var(--${string})`
            | `var(--${string}, ${string})`
            | `var(--${string}, ${number})`;
          lineHeight:
            | `var(--${string})`
            | `var(--${string}, ${string})`
            | `var(--${string}, ${number})`;
        };
        h6: {
          fontSize:
            | `var(--${string})`
            | `var(--${string}, ${string})`
            | `var(--${string}, ${number})`;
          lineHeight:
            | `var(--${string})`
            | `var(--${string}, ${string})`
            | `var(--${string}, ${number})`;
        };
      };
      defaultVariants: {
        as: string;
      };
    }>;
    sprinkle: ((props: {
      color?:
        | "primary.textLow"
        | "primary.textHigh"
        | "success.textLow"
        | "success.textHigh"
        | "warning.textLow"
        | "warning.textHigh"
        | "danger.textLow"
        | "danger.textHigh"
        | "neutral.textLow"
        | "neutral.textHigh"
        | undefined;
      textAlign?: "left" | "right" | "center" | "justify" | undefined;
    }) => string) & {
      properties: Set<"color" | "textAlign">;
    };
    properties: {
      colors: {
        "primary.textHigh":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "primary.textLow":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "success.textHigh":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "success.textLow":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "warning.textHigh":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "warning.textLow":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "danger.textHigh":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "danger.textLow":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "neutral.textHigh":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "neutral.textLow":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
      };
      textAlign: {
        readonly left: "left";
        readonly right: "right";
        readonly center: "center";
        readonly justify: "justify";
      };
    };
  };
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/title/title.sprinkle.css" {
  import { properties as textAlignProperties } from "@nimbus-ds/button/core/styles/src/sprinkles/textAlign.css";
  const colorsProperties: {
    "primary.textHigh":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "primary.textLow":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "success.textHigh":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "success.textLow":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "warning.textHigh":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "warning.textLow":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "danger.textHigh":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "danger.textLow":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "neutral.textHigh":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "neutral.textLow":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
  };
  export const sprinkle: ((props: {
    color?:
      | "primary.textLow"
      | "primary.textHigh"
      | "success.textLow"
      | "success.textHigh"
      | "warning.textLow"
      | "warning.textHigh"
      | "danger.textLow"
      | "danger.textHigh"
      | "neutral.textLow"
      | "neutral.textHigh"
      | undefined;
    textAlign?: "left" | "right" | "center" | "justify" | undefined;
  }) => string) & {
    properties: Set<"color" | "textAlign">;
  };
  export { textAlignProperties, colorsProperties };
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/title/title.style.css" {
  export const style: import("@vanilla-extract/recipes").RuntimeFn<{
    as: {
      h1: {
        fontSize:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        lineHeight:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
      };
      h2: {
        fontSize:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        lineHeight:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
      };
      h3: {
        fontSize:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        lineHeight:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
      };
      h4: {
        fontSize:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        lineHeight:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
      };
      h5: {
        fontSize:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        lineHeight:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
      };
      h6: {
        fontSize:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        lineHeight:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
      };
    };
    defaultVariants: {
      as: string;
    };
  }>;
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/toast/index" {
  export const toast: {
    style: {
      wrapper: string;
      content: Record<"primary" | "success" | "danger" | "progress", string>;
    };
  };
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/toast/toast.style.css" {
  export const wrapper: string;
  export const content: Record<
    "primary" | "success" | "danger" | "progress",
    string
  >;
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/toggle/index" {
  import * as styles from "@nimbus-ds/button/core/styles/src/packages/atomic/toggle/toggle.style.css";
  export const toggle: {
    style: typeof styles;
  };
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/toggle/toggle.style.css" {
  export const container: string;
  export const input: string;
  export const slider: string;
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/tooltip/index" {
  import * as style from "@nimbus-ds/button/core/styles/src/packages/atomic/tooltip/tooltip.style.css";
  export const tooltip: {
    style: typeof style;
  };
}
declare module "@nimbus-ds/button/core/styles/src/packages/atomic/tooltip/tooltip.style.css" {
  export const container: string;
  export const content: string;
  export const base: string;
  export const arrow: Record<"bottom" | "left" | "right" | "top", string>;
}
declare module "@nimbus-ds/button/core/styles/src/packages/composite/alert/alert.style.css" {
  export const appearance: Record<
    "primary" | "success" | "warning" | "danger" | "neutral",
    string
  >;
  export const body: string;
  export const content: string;
  export const close: string;
  export const closeAppearance: Record<
    "primary" | "success" | "warning" | "danger" | "neutral",
    string
  >;
}
declare module "@nimbus-ds/button/core/styles/src/packages/composite/alert/index" {
  import * as style from "@nimbus-ds/button/core/styles/src/packages/composite/alert/alert.style.css";
  export const alert: {
    style: typeof style;
  };
}
declare module "@nimbus-ds/button/core/styles/src/packages/composite/card/card.sprinkle.css" {
  export const backgroundColorProperties: {
    "primary.surface":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "primary.surfaceHighlight":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "success.surface":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "success.surfaceHighlight":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "danger.surface":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "danger.surfaceHighlight":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "warning.surface":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "warning.surfaceHighlight":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "neutral.background":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "neutral.surface":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "neutral.surfaceHighlight":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
  };
  export const paddingProperties: {
    base:
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    none: number;
  };
  export const sprinkle: ((props: {
    backgroundColor?:
      | "primary.surface"
      | "primary.surfaceHighlight"
      | "success.surface"
      | "success.surfaceHighlight"
      | "warning.surface"
      | "warning.surfaceHighlight"
      | "danger.surface"
      | "danger.surfaceHighlight"
      | "neutral.background"
      | "neutral.surface"
      | "neutral.surfaceHighlight"
      | undefined;
    padding?: "base" | "none" | undefined;
  }) => string) & {
    properties: Set<"backgroundColor" | "padding">;
  };
}
declare module "@nimbus-ds/button/core/styles/src/packages/composite/card/card.style.css" {
  export const container: string;
  export const header: string;
  export const body: string;
  export const footer: string;
}
declare module "@nimbus-ds/button/core/styles/src/packages/composite/card/index" {
  import * as style from "@nimbus-ds/button/core/styles/src/packages/composite/card/card.style.css";
  export const card: {
    style: typeof style;
    sprinkle: ((props: {
      backgroundColor?:
        | "primary.surface"
        | "primary.surfaceHighlight"
        | "success.surface"
        | "success.surfaceHighlight"
        | "warning.surface"
        | "warning.surfaceHighlight"
        | "danger.surface"
        | "danger.surfaceHighlight"
        | "neutral.background"
        | "neutral.surface"
        | "neutral.surfaceHighlight"
        | undefined;
      padding?: "base" | "none" | undefined;
    }) => string) & {
      properties: Set<"backgroundColor" | "padding">;
    };
    properties: {
      padding: {
        base:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        none: number;
      };
      backgroundColor: {
        "primary.surface":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "primary.surfaceHighlight":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "success.surface":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "success.surfaceHighlight":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "danger.surface":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "danger.surfaceHighlight":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "warning.surface":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "warning.surfaceHighlight":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "neutral.background":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "neutral.surface":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        "neutral.surfaceHighlight":
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
      };
    };
  };
}
declare module "@nimbus-ds/button/core/styles/src/packages/composite/sidebar/index" {
  import * as style from "@nimbus-ds/button/core/styles/src/packages/composite/sidebar/sidebar.style.css";
  export const sidebar: {
    style: typeof style;
    sprinkle: import("rainbow-sprinkles/dist/declarations/src/createRuntimeFn").SprinklesFn<
      [
        {
          config: {
            padding: {
              values: {
                base: {
                  default: string;
                  conditions: Record<"xs" | "md" | "lg", string>;
                };
                none: {
                  default: string;
                  conditions: Record<"xs" | "md" | "lg", string>;
                };
              };
              staticScale: {
                base:
                  | `var(--${string})`
                  | `var(--${string}, ${string})`
                  | `var(--${string}, ${number})`;
                none: number;
              };
              name: "padding";
            };
          };
        } & {
          config: {
            maxWidth: {
              dynamic: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
              dynamicScale: true;
              name: "maxWidth";
              vars: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
            };
            zIndex: {
              dynamic: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
              dynamicScale: true;
              name: "zIndex";
              vars: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
            };
          };
        } & {
          config: {
            [x: string]: {
              mappings: ("maxWidth" | "zIndex" | "padding")[];
            };
          };
        }
      ]
    >;
    properties: {
      padding: {
        base:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        none: number;
      };
    };
  };
  export type { SidebarSprinkle } from "@nimbus-ds/button/core/styles/src/packages/composite/sidebar/sidebar.sprinkle.types";
}
declare module "@nimbus-ds/button/core/styles/src/packages/composite/sidebar/sidebar.sprinkle.css" {
  export const paddingProperties: {
    base:
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    none: number;
  };
  export const sprinkle: import("rainbow-sprinkles/dist/declarations/src/createRuntimeFn").SprinklesFn<
    [
      {
        config: {
          padding: {
            values: {
              base: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
              none: {
                default: string;
                conditions: Record<"xs" | "md" | "lg", string>;
              };
            };
            staticScale: {
              base:
                | `var(--${string})`
                | `var(--${string}, ${string})`
                | `var(--${string}, ${number})`;
              none: number;
            };
            name: "padding";
          };
        };
      } & {
        config: {
          maxWidth: {
            dynamic: {
              default: string;
              conditions: Record<"xs" | "md" | "lg", string>;
            };
            dynamicScale: true;
            name: "maxWidth";
            vars: {
              default: string;
              conditions: Record<"xs" | "md" | "lg", string>;
            };
          };
          zIndex: {
            dynamic: {
              default: string;
              conditions: Record<"xs" | "md" | "lg", string>;
            };
            dynamicScale: true;
            name: "zIndex";
            vars: {
              default: string;
              conditions: Record<"xs" | "md" | "lg", string>;
            };
          };
        };
      } & {
        config: {
          [x: string]: {
            mappings: ("maxWidth" | "zIndex" | "padding")[];
          };
        };
      }
    ]
  >;
}
declare module "@nimbus-ds/button/core/styles/src/packages/composite/sidebar/sidebar.sprinkle.types" {
  import { paddingProperties } from "@nimbus-ds/button/core/styles/src/packages/composite/sidebar/sidebar.sprinkle.css";
  type PaddingProperties = keyof typeof paddingProperties;
  interface Conditions<T> {
    xs?: T;
    md?: T;
    lg?: T;
  }
  export interface SidebarSprinkle {
    maxWidth?: string | Conditions<string>;
    zIndex?: number | Conditions<number>;
    padding?: PaddingProperties | Conditions<PaddingProperties>;
  }
  export {};
}
declare module "@nimbus-ds/button/core/styles/src/packages/composite/sidebar/sidebar.style.css" {
  export const overlay: string;
  export const container: string;
  export const positions: Record<"left" | "right", string>;
  export const isVisible: string;
  export const header: string;
  export const body: string;
  export const footer: string;
}
declare module "@nimbus-ds/button/core/styles/src/packages/composite/tabs/index" {
  import * as style from "@nimbus-ds/button/core/styles/src/packages/composite/tabs/tabs.style.css";
  export const tabs: {
    style: typeof style;
  };
}
declare module "@nimbus-ds/button/core/styles/src/packages/composite/tabs/tabs.style.css" {
  export const container: string;
  export const tabElement: Record<"default" | "fullWidth", string>;
  export const tabButton: Record<"default" | "active", string>;
  export const panel: string;
}
declare module "@nimbus-ds/button/core/styles/src/sprinkles/colors.css" {
  export const properties: {
    "primary.surface":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "primary.surfaceHighlight":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "primary.interactive":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "primary.interactiveHover":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "primary.interactivePressed":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "primary.textLow":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "primary.textHigh":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "success.surface":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "success.surfaceHighlight":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "success.interactive":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "success.interactiveHover":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "success.interactivePressed":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "success.textLow":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "success.textHigh":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "warning.surface":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "warning.surfaceHighlight":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "warning.interactive":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "warning.interactiveHover":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "warning.interactivePressed":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "warning.textLow":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "warning.textHigh":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "danger.surface":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "danger.surfaceHighlight":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "danger.interactive":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "danger.interactiveHover":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "danger.interactivePressed":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "danger.textLow":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "danger.textHigh":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "neutral.background":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "neutral.surface":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "neutral.surfaceDisabled":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "neutral.surfaceHighlight":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "neutral.interactive":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "neutral.interactiveHover":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "neutral.interactivePressed":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "neutral.textDisabled":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "neutral.textLow":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
    "neutral.textHigh":
      | `var(--${string})`
      | `var(--${string}, ${string})`
      | `var(--${string}, ${number})`;
  };
  export const colors: {
    sprinkle: ((props: {
      color?:
        | "primary.surface"
        | "primary.surfaceHighlight"
        | "primary.interactive"
        | "primary.interactiveHover"
        | "primary.interactivePressed"
        | "primary.textLow"
        | "primary.textHigh"
        | "success.surface"
        | "success.surfaceHighlight"
        | "success.interactive"
        | "success.interactiveHover"
        | "success.interactivePressed"
        | "success.textLow"
        | "success.textHigh"
        | "warning.surface"
        | "warning.surfaceHighlight"
        | "warning.interactive"
        | "warning.interactiveHover"
        | "warning.interactivePressed"
        | "warning.textLow"
        | "warning.textHigh"
        | "danger.surface"
        | "danger.surfaceHighlight"
        | "danger.interactive"
        | "danger.interactiveHover"
        | "danger.interactivePressed"
        | "danger.textLow"
        | "danger.textHigh"
        | "neutral.background"
        | "neutral.surface"
        | "neutral.surfaceDisabled"
        | "neutral.surfaceHighlight"
        | "neutral.interactive"
        | "neutral.interactiveHover"
        | "neutral.interactivePressed"
        | "neutral.textDisabled"
        | "neutral.textLow"
        | "neutral.textHigh"
        | undefined;
      backgroundColor?:
        | "primary.surface"
        | "primary.surfaceHighlight"
        | "primary.interactive"
        | "primary.interactiveHover"
        | "primary.interactivePressed"
        | "primary.textLow"
        | "primary.textHigh"
        | "success.surface"
        | "success.surfaceHighlight"
        | "success.interactive"
        | "success.interactiveHover"
        | "success.interactivePressed"
        | "success.textLow"
        | "success.textHigh"
        | "warning.surface"
        | "warning.surfaceHighlight"
        | "warning.interactive"
        | "warning.interactiveHover"
        | "warning.interactivePressed"
        | "warning.textLow"
        | "warning.textHigh"
        | "danger.surface"
        | "danger.surfaceHighlight"
        | "danger.interactive"
        | "danger.interactiveHover"
        | "danger.interactivePressed"
        | "danger.textLow"
        | "danger.textHigh"
        | "neutral.background"
        | "neutral.surface"
        | "neutral.surfaceDisabled"
        | "neutral.surfaceHighlight"
        | "neutral.interactive"
        | "neutral.interactiveHover"
        | "neutral.interactivePressed"
        | "neutral.textDisabled"
        | "neutral.textLow"
        | "neutral.textHigh"
        | undefined;
    }) => string) & {
      properties: Set<"backgroundColor" | "color">;
    };
    properties: {
      "primary.surface":
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      "primary.surfaceHighlight":
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      "primary.interactive":
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      "primary.interactiveHover":
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      "primary.interactivePressed":
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      "primary.textLow":
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      "primary.textHigh":
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      "success.surface":
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      "success.surfaceHighlight":
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      "success.interactive":
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      "success.interactiveHover":
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      "success.interactivePressed":
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      "success.textLow":
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      "success.textHigh":
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      "warning.surface":
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      "warning.surfaceHighlight":
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      "warning.interactive":
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      "warning.interactiveHover":
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      "warning.interactivePressed":
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      "warning.textLow":
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      "warning.textHigh":
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      "danger.surface":
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      "danger.surfaceHighlight":
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      "danger.interactive":
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      "danger.interactiveHover":
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      "danger.interactivePressed":
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      "danger.textLow":
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      "danger.textHigh":
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      "neutral.background":
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      "neutral.surface":
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      "neutral.surfaceDisabled":
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      "neutral.surfaceHighlight":
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      "neutral.interactive":
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      "neutral.interactiveHover":
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      "neutral.interactivePressed":
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      "neutral.textDisabled":
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      "neutral.textLow":
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      "neutral.textHigh":
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
    };
  };
}
declare module "@nimbus-ds/button/core/styles/src/sprinkles/textAlign.css" {
  export const properties: {
    readonly left: "left";
    readonly right: "right";
    readonly center: "center";
    readonly justify: "justify";
  };
  export const textAlign: {
    sprinkle: ((props: {
      textAlign?: "left" | "right" | "center" | "justify" | undefined;
    }) => string) & {
      properties: Set<"textAlign">;
    };
    properties: {
      readonly left: "left";
      readonly right: "right";
      readonly center: "center";
      readonly justify: "justify";
    };
  };
}
declare module "@nimbus-ds/button/core/styles/src/themes/base.css" {
  export const varsThemeBase: {
    colors: {
      primary: {
        surface:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        surfaceHighlight:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        interactive:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        interactiveHover:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        interactivePressed:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        textLow:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        textHigh:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
      };
      success: {
        surface:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        surfaceHighlight:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        interactive:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        interactiveHover:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        interactivePressed:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        textLow:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        textHigh:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
      };
      warning: {
        surface:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        surfaceHighlight:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        interactive:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        interactiveHover:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        interactivePressed:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        textLow:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        textHigh:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
      };
      danger: {
        surface:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        surfaceHighlight:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        interactive:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        interactiveHover:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        interactivePressed:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        textLow:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        textHigh:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
      };
      neutral: {
        background:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        surface:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        surfaceDisabled:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        surfaceHighlight:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        interactive:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        interactiveHover:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        interactivePressed:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        textDisabled:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        textLow:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        textHigh:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
      };
    };
    fontFamily: {
      centranube:
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
    };
    fontSize: {
      body: {
        caption:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        base:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        highlight:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
      };
      title: {
        h1:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        h2:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        h3:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        h4:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        h5:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        h6:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
      };
    };
    fontWeight: {
      regular:
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      medium:
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      bold:
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
    };
    lineWeight: {
      body: {
        caption:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        base:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        highlight:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
      };
      title: {
        h1:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        h2:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        h3:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        h4:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        h5:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        h6:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
      };
    };
    shadow: {
      card:
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      popover:
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      modal:
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
    };
    spacing: {
      "0,5":
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      1:
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      2:
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      4:
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      6:
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      8:
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      10:
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      12:
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      14:
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      16:
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      18:
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      20:
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
    };
    sizes: {
      "0,5":
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      1:
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      "1,5":
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      2:
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      "2,5":
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      3:
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      "3,5":
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      4:
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      "4,5":
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      5:
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      6:
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      7:
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      8:
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      9:
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      10:
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      11:
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      12:
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      14:
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      16:
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      18:
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      20:
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
    };
    motion: {
      speed: {
        base:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        fast:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        slow:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
        slower:
          | `var(--${string})`
          | `var(--${string}, ${string})`
          | `var(--${string}, ${number})`;
      };
    };
    breakpoint: {
      xs:
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      md:
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
      lg:
        | `var(--${string})`
        | `var(--${string}, ${string})`
        | `var(--${string}, ${number})`;
    };
  };
}
declare module "@nimbus-ds/button/core/styles/src/themes/mediaQueries" {
  export const mediaQueries: {
    xs: () => string;
    md: () => string;
    lg: () => string;
  };
}
declare module "@nimbus-ds/button/core/styles/src/utils/index" {
  import * as vars from "@nimbus-ds/button/core/styles/src/utils/vars.css";
  export const utils: {
    vars: typeof vars;
  };
}
declare module "@nimbus-ds/button/core/styles/src/utils/vars.css" {
  export const width:
    | `var(--${string})`
    | `var(--${string}, ${string})`
    | `var(--${string}, ${number})`;
  export const height:
    | `var(--${string})`
    | `var(--${string}, ${string})`
    | `var(--${string}, ${number})`;
  export const borderRadius:
    | `var(--${string})`
    | `var(--${string}, ${string})`
    | `var(--${string}, ${number})`;
}
declare module "@nimbus-ds/button/react/atomic/Badge/src/Badge" {
  import React from "react";
  import {
    BadgeProps,
    BadgeComponents,
  } from "@nimbus-ds/button/react/atomic/Badge/src/badge.types";
  const Badge: React.FC<BadgeProps> & BadgeComponents;
  export { Badge };
}
declare module "@nimbus-ds/button/react/atomic/Badge/src/badge.types" {
  import { HTMLAttributes } from "react";
  import { Skeleton } from "@nimbus-ds/button/react/atomic/Badge/src/components/index";
  export interface BadgeComponents {
    Skeleton: typeof Skeleton;
  }
  export interface BadgeProps extends HTMLAttributes<HTMLElement> {
    /** Badge color */
    appearance?: "primary" | "success" | "warning" | "danger" | "neutral";
    /** Total items to be displayed without badge */
    count: number | string;
    /** Badge appearance color scheme */
    theme?: "surface" | "light";
  }
}
declare module "@nimbus-ds/button/react/atomic/Badge/src/components/Skeleton/Skeleton" {
  import React from "react";
  import { SkeletonProps } from "@nimbus-ds/button/react/atomic/Badge/src/components/Skeleton/skeleton.types";
  const Skeleton: React.FC<SkeletonProps>;
  export { Skeleton };
}
declare module "@nimbus-ds/button/react/atomic/Badge/src/components/Skeleton/index" {
  import { Skeleton } from "@nimbus-ds/button/react/atomic/Badge/src/components/Skeleton/Skeleton";
  export { Skeleton } from "@nimbus-ds/button/react/atomic/Badge/src/components/Skeleton/Skeleton";
  export default Skeleton;
}
declare module "@nimbus-ds/button/react/atomic/Badge/src/components/Skeleton/skeleton.types" {
  import { SkeletonProps as SkeletonBaseProps } from "@nimbus-ds/skeleton";
  export type SkeletonProps = Partial<Pick<SkeletonBaseProps, "width">> &
    Partial<Pick<SkeletonBaseProps, "height">> & {
      "data-testid"?: string;
    };
}
declare module "@nimbus-ds/button/react/atomic/Badge/src/components/index" {
  export * from "@nimbus-ds/button/react/atomic/Badge/src/components/Skeleton/index";
}
declare module "@nimbus-ds/button/react/atomic/Badge/src/index" {
  import { Badge } from "@nimbus-ds/button/react/atomic/Badge/src/Badge";
  import "@nimbus-ds/styles/packages/atomic/badge/index.css";
  export { Badge } from "@nimbus-ds/button/react/atomic/Badge/src/Badge";
  export type { BadgeProps } from "@nimbus-ds/button/react/atomic/Badge/src/badge.types";
  export default Badge;
}
declare module "@nimbus-ds/button/react/atomic/Button/src/Button" {
  import React from "react";
  import {
    ButtonProps,
    ButtonComponents,
  } from "@nimbus-ds/button/react/atomic/Button/src/button.types";
  const Button: React.FC<ButtonProps> & ButtonComponents;
  export { Button };
}
declare module "@nimbus-ds/button/react/atomic/Button/src/button.stories" {
  import React from "react";
  import { ComponentMeta, ComponentStory } from "@storybook/react";
  const _default: ComponentMeta<
    React.FC<
      import("@nimbus-ds/button/react/atomic/Button/src/button.types").ButtonProps
    > &
      import("./button.types").ButtonComponents
  >;
  export default _default;
  export const base: ComponentStory<
    React.FC<
      import("@nimbus-ds/button/react/atomic/Button/src/button.types").ButtonProps
    > &
      import("./button.types").ButtonComponents
  >;
  export const badge: ComponentStory<
    React.FC<
      import("@nimbus-ds/button/react/atomic/Button/src/button.types").ButtonProps
    > &
      import("./button.types").ButtonComponents
  >;
  export const icon: ComponentStory<
    React.FC<
      import("@nimbus-ds/button/react/atomic/Button/src/button.types").ButtonProps
    > &
      import("./button.types").ButtonComponents
  >;
  export const loading: ComponentStory<
    React.FC<
      import("@nimbus-ds/button/react/atomic/Button/src/button.types").ButtonProps
    > &
      import("./button.types").ButtonComponents
  >;
  export const disabled: ComponentStory<
    React.FC<
      import("@nimbus-ds/button/react/atomic/Button/src/button.types").ButtonProps
    > &
      import("./button.types").ButtonComponents
  >;
  export const primary: ComponentStory<
    React.FC<
      import("@nimbus-ds/button/react/atomic/Button/src/button.types").ButtonProps
    > &
      import("./button.types").ButtonComponents
  >;
  export const danger: ComponentStory<
    React.FC<
      import("@nimbus-ds/button/react/atomic/Button/src/button.types").ButtonProps
    > &
      import("./button.types").ButtonComponents
  >;
  export const neutral: ComponentStory<
    React.FC<
      import("@nimbus-ds/button/react/atomic/Button/src/button.types").ButtonProps
    > &
      import("./button.types").ButtonComponents
  >;
  export const skeleton: ComponentStory<
    React.FC<
      import("@nimbus-ds/button/react/atomic/Button/src/components/Skeleton/skeleton.types").SkeletonProps
    >
  >;
}
declare module "@nimbus-ds/button/react/atomic/Button/src/button.types" {
  import { ReactNode, ButtonHTMLAttributes } from "react";
  import { Skeleton } from "@nimbus-ds/button/react/atomic/Button/src/components/index";
  export interface ButtonComponents {
    Skeleton: typeof Skeleton;
  }
  export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** Text to be displayed on chip */
    children: ReactNode;
    /** Button appearance */
    appearance?: "primary" | "danger" | "neutral";
    /** Set whether button state is disabled */
    disabled?: boolean;
  }
}
declare module "@nimbus-ds/button/react/atomic/Button/src/components/Skeleton/Skeleton" {
  import React from "react";
  import { SkeletonProps } from "@nimbus-ds/button/react/atomic/Button/src/components/Skeleton/skeleton.types";
  const Skeleton: React.FC<SkeletonProps>;
  export { Skeleton };
}
declare module "@nimbus-ds/button/react/atomic/Button/src/components/Skeleton/index" {
  import { Skeleton } from "@nimbus-ds/button/react/atomic/Button/src/components/Skeleton/Skeleton";
  export { Skeleton } from "@nimbus-ds/button/react/atomic/Button/src/components/Skeleton/Skeleton";
  export default Skeleton;
}
declare module "@nimbus-ds/button/react/atomic/Button/src/components/Skeleton/skeleton.stories" {
  import React from "react";
  import { ComponentMeta, ComponentStory } from "@storybook/react";
  const _default: ComponentMeta<
    React.FC<
      import("@nimbus-ds/button/react/atomic/Button/src/components/Skeleton/skeleton.types").SkeletonProps
    >
  >;
  export default _default;
  export const button: ComponentStory<
    React.FC<
      import("@nimbus-ds/button/react/atomic/Button/src/components/Skeleton/skeleton.types").SkeletonProps
    >
  >;
}
declare module "@nimbus-ds/button/react/atomic/Button/src/components/Skeleton/skeleton.types" {
  import { SkeletonProps as SkeletonBaseProps } from "@nimbus-ds/skeleton";
  export type SkeletonProps = Partial<Pick<SkeletonBaseProps, "width">> & {
    "data-testid"?: string;
  };
}
declare module "@nimbus-ds/button/react/atomic/Button/src/components/index" {
  export * from "@nimbus-ds/button/react/atomic/Button/src/components/Skeleton/index";
}
declare module "@nimbus-ds/button/react/atomic/Button/src/index" {
  import { Button } from "@nimbus-ds/button/react/atomic/Button/src/Button";
  import "@nimbus-ds/styles/packages/atomic/button/index.css";
  export { Button } from "@nimbus-ds/button/react/atomic/Button/src/Button";
  export type { ButtonProps } from "@nimbus-ds/button/react/atomic/Button/src/button.types";
  export default Button;
}
declare module "@nimbus-ds/button/react/atomic/Icon/src/Icon" {
  import React from "react";
  import {
    IconProps,
    IconComponents,
  } from "@nimbus-ds/button/react/atomic/Icon/src/icon.types";
  const Icon: React.FC<IconProps> & IconComponents;
  export { Icon };
}
declare module "@nimbus-ds/button/react/atomic/Icon/src/components/Skeleton/Skeleton" {
  import React from "react";
  import { SkeletonProps } from "@nimbus-ds/button/react/atomic/Icon/src/components/Skeleton/skeleton.types";
  const Skeleton: React.FC<SkeletonProps>;
  export { Skeleton };
}
declare module "@nimbus-ds/button/react/atomic/Icon/src/components/Skeleton/index" {
  import { Skeleton } from "@nimbus-ds/button/react/atomic/Icon/src/components/Skeleton/Skeleton";
  export { Skeleton } from "@nimbus-ds/button/react/atomic/Icon/src/components/Skeleton/Skeleton";
  export default Skeleton;
}
declare module "@nimbus-ds/button/react/atomic/Icon/src/components/Skeleton/skeleton.types" {
  import { SkeletonProps as SkeletonBaseProps } from "@nimbus-ds/skeleton";
  export type SkeletonProps = Partial<Pick<SkeletonBaseProps, "width">> &
    Partial<Pick<SkeletonBaseProps, "height">> & {
      "data-testid"?: string;
    };
}
declare module "@nimbus-ds/button/react/atomic/Icon/src/components/index" {
  export * from "@nimbus-ds/button/react/atomic/Icon/src/components/Skeleton/index";
}
declare module "@nimbus-ds/button/react/atomic/Icon/src/icon.types" {
  import { ReactNode, HTMLAttributes } from "react";
  import { icon } from "@nimbus-ds/styles";
  import { Skeleton } from "@nimbus-ds/button/react/atomic/Icon/src/components/index";
  export interface IconComponents {
    Skeleton: typeof Skeleton;
  }
  export interface IconProps extends HTMLAttributes<HTMLDivElement> {
    /** Icon SVG */
    source: ReactNode;
    /** Icon color */
    color?: keyof typeof icon.properties.color;
    /** Icon cursor */
    cursor?: typeof icon.properties.cursor[number];
  }
}
declare module "@nimbus-ds/button/react/atomic/Icon/src/index" {
  import { Icon } from "@nimbus-ds/button/react/atomic/Icon/src/Icon";
  import "@nimbus-ds/styles/packages/atomic/icon/index.css";
  export { Icon } from "@nimbus-ds/button/react/atomic/Icon/src/Icon";
  export type { IconProps } from "@nimbus-ds/button/react/atomic/Icon/src/icon.types";
  export default Icon;
}
declare module "@nimbus-ds/button/react/atomic/Skeleton/src/Skeleton" {
  import React from "react";
  import { SkeletonProps } from "@nimbus-ds/button/react/atomic/Skeleton/src/skeleton.types";
  const Skeleton: React.FC<SkeletonProps>;
  export { Skeleton };
}
declare module "@nimbus-ds/button/react/atomic/Skeleton/src/index" {
  import { Skeleton } from "@nimbus-ds/button/react/atomic/Skeleton/src/Skeleton";
  import "@nimbus-ds/styles/packages/atomic/skeleton/index.css";
  export { Skeleton } from "@nimbus-ds/button/react/atomic/Skeleton/src/Skeleton";
  export type { SkeletonProps } from "@nimbus-ds/button/react/atomic/Skeleton/src/skeleton.types";
  export default Skeleton;
}
declare module "@nimbus-ds/button/react/atomic/Skeleton/src/skeleton.types" {
  import { HTMLAttributes } from "react";
  export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
    /** width alignment in content */
    width: string;
    /** height alignment in content */
    height: string;
    /** borderRadius alignment in content */
    borderRadius?: string;
  }
}
declare module "@nimbus-ds/button/react/atomic/Spinner/src/Spinner" {
  import React from "react";
  import { SpinnerProps } from "@nimbus-ds/button/react/atomic/Spinner/src/spinner.types";
  const Spinner: React.FC<SpinnerProps>;
  export { Spinner };
}
declare module "@nimbus-ds/button/react/atomic/Spinner/src/index" {
  import { Spinner } from "@nimbus-ds/button/react/atomic/Spinner/src/Spinner";
  import "@nimbus-ds/styles/packages/atomic/spinner/index.css";
  export { Spinner } from "@nimbus-ds/button/react/atomic/Spinner/src/Spinner";
  export type { SpinnerProps } from "@nimbus-ds/button/react/atomic/Spinner/src/spinner.types";
  export default Spinner;
}
declare module "@nimbus-ds/button/react/atomic/Spinner/src/spinner.definitions" {
  export const sizes: {
    large: number;
    medium: number;
    small: number;
  };
}
declare module "@nimbus-ds/button/react/atomic/Spinner/src/spinner.types" {
  import { SVGAttributes } from "react";
  import { spinner } from "@nimbus-ds/styles";
  export interface SpinnerProps extends SVGAttributes<SVGElement> {
    /** Spinner size */
    size?: "small" | "medium" | "large" | number;
    /** Spinner color */
    color?: keyof typeof spinner.properties;
  }
}
declare module "@nimbus-ds/button/react/atomic/Text/src/Text" {
  import React from "react";
  import {
    TextProps,
    TextComponents,
  } from "@nimbus-ds/button/react/atomic/Text/src/text.types";
  const Text: React.FC<TextProps> & TextComponents;
  export { Text };
}
declare module "@nimbus-ds/button/react/atomic/Text/src/components/Skeleton/Skeleton" {
  import React from "react";
  import { SkeletonProps } from "@nimbus-ds/button/react/atomic/Text/src/components/Skeleton/skeleton.types";
  const Skeleton: React.FC<SkeletonProps>;
  export { Skeleton };
}
declare module "@nimbus-ds/button/react/atomic/Text/src/components/Skeleton/index" {
  import { Skeleton } from "@nimbus-ds/button/react/atomic/Text/src/components/Skeleton/Skeleton";
  export { Skeleton } from "@nimbus-ds/button/react/atomic/Text/src/components/Skeleton/Skeleton";
  export default Skeleton;
}
declare module "@nimbus-ds/button/react/atomic/Text/src/components/Skeleton/skeleton.definitions" {
  export const sizes: {
    caption: {
      width: string;
      height: string;
    };
    base: {
      width: string;
      height: string;
    };
    highlight: {
      width: string;
      height: string;
    };
  };
}
declare module "@nimbus-ds/button/react/atomic/Text/src/components/Skeleton/skeleton.types" {
  import { SkeletonProps as SkeletonBaseProps } from "@nimbus-ds/skeleton";
  import { TextProps } from "@nimbus-ds/button/react/atomic/Text/src/text.types";
  export type SkeletonProps = Pick<TextProps, "fontSize"> &
    Partial<Pick<SkeletonBaseProps, "width">> &
    Partial<Pick<SkeletonBaseProps, "height">> & {
      "data-testid"?: string;
    };
}
declare module "@nimbus-ds/button/react/atomic/Text/src/components/index" {
  export * from "@nimbus-ds/button/react/atomic/Text/src/components/Skeleton/index";
}
declare module "@nimbus-ds/button/react/atomic/Text/src/index" {
  import { Text } from "@nimbus-ds/button/react/atomic/Text/src/Text";
  import "@nimbus-ds/styles/packages/atomic/text/index.css";
  export { Text } from "@nimbus-ds/button/react/atomic/Text/src/Text";
  export type { TextProps } from "@nimbus-ds/button/react/atomic/Text/src/text.types";
  export default Text;
}
declare module "@nimbus-ds/button/react/atomic/Text/src/text.types" {
  import { ReactNode, HTMLAttributes } from "react";
  import { text } from "@nimbus-ds/styles";
  import { Skeleton } from "@nimbus-ds/button/react/atomic/Text/src/components/index";
  export interface TextComponents {
    Skeleton: typeof Skeleton;
  }
  export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
    /** Element to be rendered inside the Text component */
    children: ReactNode;
    /** Type of html tag to create for the Text component */
    as?: "p" | "span";
    /** Text size */
    fontSize?: keyof typeof text.properties.fontSize;
    /** Bold font for the text component */
    fontWeight?: keyof typeof text.properties.fontWeight;
    /** Text line height */
    lineHeight?: keyof typeof text.properties.lineHeight;
    /** Text alignment in content */
    textAlign?: keyof typeof text.properties.textAlign;
    /** Text color */
    color?: keyof typeof text.properties.colors;
  }
}
declare module "@nimbus-ds/button" {
  import main = require("@nimbus-ds/button/index");
  export = main;
}
