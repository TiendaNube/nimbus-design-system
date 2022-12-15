import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";
import { thumbnail as thumbnailStyle } from "@nimbus-ds/styles";

import { ThumbnailSkeleton } from "./ThumbnailSkeleton";

export default {
  title: "Skeleton/Thumbnail",
  component: ThumbnailSkeleton,
  argTypes: {
    aspectRatio: {
      options: Object.keys(thumbnailStyle.properties.aspectRatio),
    },
  },
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
} as ComponentMeta<typeof ThumbnailSkeleton>;

const Template: ComponentStory<typeof ThumbnailSkeleton> = (args) => (
  <ThumbnailSkeleton {...args} />
);

export const thumbnail = Template.bind({});
thumbnail.args = {};
