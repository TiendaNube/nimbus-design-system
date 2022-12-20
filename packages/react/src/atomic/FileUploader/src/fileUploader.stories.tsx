import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import { FileUploader } from "./FileUploader";

export default {
  title: "Atomic/File Uploader",
  component: FileUploader,
  subcomponents: { "FileUploader.Skeleton": FileUploader.Skeleton },
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
} as ComponentMeta<typeof FileUploader>;

const Template: ComponentStory<typeof FileUploader> = (args) => (
  <FileUploader {...args} />
);
const SkeletonTemplate: ComponentStory<typeof FileUploader.Skeleton> = (
  args
) => <FileUploader.Skeleton {...args} />;

export const base = Template.bind({});
base.args = {
  width: "104px",
  placeholder: "Helper text",
};

export const disabled = Template.bind({});
disabled.args = {
  width: "104px",
  placeholder: "Helper text",
  disabled: true,
};

export const horizontal = Template.bind({});
horizontal.args = {
  aspectRatio: "none",
  flexDirection: "row",
  width: "100%",
  height: "3rem",
  placeholder: "Helper text",
};

export const vertical = Template.bind({});
vertical.args = {
  aspectRatio: "none",
  width: "96px",
  height: "68px",
  placeholder: "Helper text",
};

export const skeleton = SkeletonTemplate.bind({});
skeleton.args = {};
