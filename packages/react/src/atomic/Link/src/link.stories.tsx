import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";
import { ExternalLinkIcon } from "@tiendanube/icons";
import { Icon } from "@nimbus-ds/icon";
import { Text } from "@nimbus-ds/text";

import { Link } from "./Link";

export default {
  title: "Atomic/Link",
  component: Link,
  subcomponents: { "Link.Skeleton": Link.Skeleton },
  argTypes: {
    children: { control: { disable: true } },
  },
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
} as ComponentMeta<typeof Link>;

const Template: ComponentStory<typeof Link> = (args) => <Link {...args} />;
const StressedTemplate: ComponentStory<typeof Link> = (args) => (
  <Text fontSize="base" color="neutral.textLow">
    This is a paragraph followed by a link.
    <Link {...args} />
  </Text>
);
const SkeletonTemplate: ComponentStory<typeof Link.Skeleton> = (args) => (
  <Link.Skeleton {...args} />
);

export const base = Template.bind({});
base.args = {
  children: "Link",
  href: "mailto: hola@tiendanube.com",
};

export const icon = Template.bind({});
icon.args = {
  appearance: "primary",
  children: (
    <>
      Link
      <Icon color="primary.interactive" source={<ExternalLinkIcon />} />
    </>
  ),
};

export const stressed = StressedTemplate.bind({});
stressed.args = {
  appearance: "primary",
  children: (
    <>
      Stressed link with a lot of characters
      <Icon color="primary.interactive" source={<ExternalLinkIcon />} />
    </>
  ),
};

export const primary = Template.bind({});
primary.args = {
  appearance: "primary",
  children: "Link",
};

export const danger = Template.bind({});
danger.args = {
  appearance: "danger",
  children: "Link",
};

export const neutral = Template.bind({});
neutral.args = {
  appearance: "neutral",
  children: "Link",
};

export const neutralBackground = Template.bind({});
neutralBackground.args = {
  appearance: "neutral.background",
  children: "Link",
};

export const skeleton = SkeletonTemplate.bind({});
skeleton.args = {};
