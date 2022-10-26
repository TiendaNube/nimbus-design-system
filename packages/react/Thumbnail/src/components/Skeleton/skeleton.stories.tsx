import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";
import { thumbnail as thumbnailStyle } from "@nimbus-ds/styles";

import { Thumbnail } from "../../Thumbnail";

export default {
  title: "Skeleton/Thumbnail",
  component: Thumbnail.Skeleton,
  argTypes: {
    aspectRatio: {
      options: Object.keys(thumbnailStyle.properties.aspectRatio),
    },
  },
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
} as ComponentMeta<typeof Thumbnail.Skeleton>;

const Template: ComponentStory<typeof Thumbnail.Skeleton> = (args) => (
  <Thumbnail.Skeleton {...args} />
);

export const thumbnail = Template.bind({});
thumbnail.args = {};
