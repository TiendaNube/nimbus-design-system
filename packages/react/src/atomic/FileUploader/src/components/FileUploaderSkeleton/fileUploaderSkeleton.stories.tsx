import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";
import { fileUploader as fileUploaderlStyle } from "@nimbus-ds/styles";

import { FileUploaderSkeleton } from "./FileUploaderSkeleton";

export default {
  title: "Skeleton/File Uploader",
  component: FileUploaderSkeleton,
  argTypes: {
    aspectRatio: {
      options: Object.keys(fileUploaderlStyle.properties.aspectRatio),
    },
  },
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
} as ComponentMeta<typeof FileUploaderSkeleton>;

const Template: ComponentStory<typeof FileUploaderSkeleton> = (args) => (
  <FileUploaderSkeleton {...args} />
);

export const fileUploader = Template.bind({});
fileUploader.args = {};
