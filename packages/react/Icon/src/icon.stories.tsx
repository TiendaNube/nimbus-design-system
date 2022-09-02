import React from "react";
import { TiendanubeIcon } from "@tiendanube/icons";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import { Icon } from "./Icon";

export default {
  title: "Atomic/Icon",
  component: Icon,
  subcomponents: { "Icon.Skeleton": Icon.Skeleton },
  argTypes: {
    source: { control: { disable: true } },
  },
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
} as ComponentMeta<typeof Icon>;

const IconTemplate: ComponentStory<typeof Icon> = (args) => <Icon {...args} />;
const SkeletonTemplate: ComponentStory<typeof Icon.Skeleton> = (args) => (
  <Icon.Skeleton {...args} />
);

export const large = IconTemplate.bind({});
large.args = {
  source: <TiendanubeIcon size="large" />,
  color: "primary.textLow",
};

export const medium = IconTemplate.bind({});
medium.args = {
  source: <TiendanubeIcon size="medium" />,
  color: "primary.textLow",
};

export const small = IconTemplate.bind({});
small.args = {
  source: <TiendanubeIcon size="small" />,
  color: "primary.textLow",
};

export const skeleton = SkeletonTemplate.bind({});
skeleton.args = {};
