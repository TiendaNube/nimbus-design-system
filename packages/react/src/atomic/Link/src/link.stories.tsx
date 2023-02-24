import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";
import { ExternalLinkIcon } from "@nimbus-ds/icons";
import { Icon } from "@nimbus-ds/icon";
import { Text } from "@nimbus-ds/text";

import { Link as LinkComponent } from "./Link";
import { LinkProps } from "./link.types";

export const Link: React.FC<LinkProps> = (props) => (
  <LinkComponent {...props} />
);

export default {
  title: "Atomic/Link",
  component: Link,
  subcomponents: { "Link.Skeleton": LinkComponent.Skeleton },
  argTypes: {
    children: { control: { disable: true } },
    as: {
      control: { type: "radio" },
      options: ["a", "button"],
      table: {
        type: {
          required: false,
          summary:
            '"a" | "button" | "ReactNode of type HTMLAnchorElement" | "ReactNode of type HTMLButtonElement"',
        },
        defaultValue: { summary: "a" },
      },
      description:
        "The underlying element to render — either a HTML element name or a React component.",
    },
    ref: {
      control: { disable: true },
      description:
        "A ref to the element rendered by this component. Because this component is polymorphic, the type will vary based on the value of the as prop.",
    },
  },
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
} as ComponentMeta<typeof LinkComponent>;

const Template: ComponentStory<typeof LinkComponent> = (args) => (
  <Link as="a" {...args} />
);
const StressedTemplate: ComponentStory<typeof LinkComponent> = (args) => (
  <Text>
    This is a paragraph followed by a link.
    <Link {...args} />
  </Text>
);
const SkeletonTemplate: ComponentStory<typeof LinkComponent.Skeleton> = (
  args
) => <LinkComponent.Skeleton {...args} />;

export const link = Template.bind({});
link.args = {
  children: "Link",
  // eslint-disable-next-line
  // @ts-ignore
  href: "mailto: hola@tiendanube.com",
};

export const icon = Template.bind({});
icon.args = {
  appearance: "primary",
  children: (
    <>
      Link
      <Icon color="currentColor" source={<ExternalLinkIcon />} />
    </>
  ),
};

export const stressed = StressedTemplate.bind({});
stressed.args = {
  appearance: "primary",
  children: (
    <>
      Stressed link with a lot of characters
      <Icon color="currentColor" source={<ExternalLinkIcon />} />
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

export const asButton = Template.bind({});
asButton.args = {
  children: "Link as button",
  as: "button",
};

export const skeleton = SkeletonTemplate.bind({});
skeleton.args = {};
