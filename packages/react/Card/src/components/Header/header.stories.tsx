import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";
import { fileUploader as fileUploaderlStyle } from "@nimbus-ds/styles";

import { FileUploader } from "../../Card";

export default {
  title: "Skeleton/File Uploader",
  component: FileUploader.Skeleton,
  argTypes: {
    aspectRatio: {
      options: Object.keys(fileUploaderlStyle.properties.aspectRatio),
    },
  },
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
} as ComponentMeta<typeof FileUploader.Skeleton>;

const Template: ComponentStory<typeof FileUploader.Skeleton> = (args) => (
  <FileUploader.Skeleton {...args} />
);

export const fileUploader = Template.bind({});
fileUploader.args = {};
