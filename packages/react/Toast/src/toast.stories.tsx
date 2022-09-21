import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import { Toast } from "./Toast";

export default {
  title: "Atomic/Toast",
  component: Toast,
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
} as ComponentMeta<typeof Toast>;

const ToastTemplate: ComponentStory<typeof Toast> = (args) => (
  <Toast {...args} />
);

export const primary = ToastTemplate.bind({});
primary.args = {
  text: "Primary toast",
  type: "primary",
  autoClose: false,
};

export const success = ToastTemplate.bind({});
success.args = {
  text: "Success toast",
  type: "success",
  autoClose: false,
};

export const danger = ToastTemplate.bind({});
danger.args = {
  text: "Danger toast",
  type: "danger",
  autoClose: false,
};

export const progress = ToastTemplate.bind({});
progress.args = {
  text: "Progress toast",
  type: "progress",
  autoClose: false,
};
