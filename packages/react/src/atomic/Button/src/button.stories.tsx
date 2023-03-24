import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";
import { ExternalLinkIcon } from "@nimbus-ds/icons";
import { Icon } from "@nimbus-ds/icon";
import { Badge } from "@nimbus-ds/badge";
import { Spinner } from "@nimbus-ds/spinner";

import { Button as ButtonComponent, ButtonProps } from "./Button";

export const Base: React.FC<ButtonProps> = (props) => (
  <ButtonComponent {...props} />
);

export default {
  title: "Atomic/Button",
  component: Base,
  subcomponents: {
    "Button.Skeleton": ButtonComponent.Skeleton,
  },
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
        defaultValue: { summary: "button" },
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
} as ComponentMeta<typeof ButtonComponent>;

const Template: ComponentStory<typeof ButtonComponent> = (args) => (
  <Base {...args} />
);
const SkeletonTemplate: ComponentStory<typeof ButtonComponent.Skeleton> = (
  args
) => <ButtonComponent.Skeleton {...args} />;

export const base = Template.bind({});
base.args = {
  children: "Button",
};

export const badge = Template.bind({});
badge.args = {
  appearance: "primary",
  children: (
    <>
      Button
      <Badge appearance="primary" count={2} theme="light" />
    </>
  ),
};

export const icon = Template.bind({});
icon.args = {
  appearance: "primary",
  children: (
    <>
      Button
      <Icon color="currentColor" source={<ExternalLinkIcon />} />
    </>
  ),
};

export const loading = Template.bind({});
loading.args = {
  appearance: "primary",
  children: (
    <>
      <Spinner color="currentColor" size="small" />
      Button
    </>
  ),
};

export const disabled = Template.bind({});
disabled.args = {
  disabled: true,
  children: "Button",
};

export const primary = Template.bind({});
primary.args = {
  appearance: "primary",
  children: "Button",
};

export const danger = Template.bind({});
danger.args = {
  appearance: "danger",
  children: "Button",
};

export const neutral = Template.bind({});
neutral.args = {
  appearance: "neutral",
  children: "Button",
};

export const transparent = Template.bind({});
transparent.args = {
  appearance: "transparent",
  children: "Button",
};

export const asLink = Template.bind({});
asLink.args = {
  as: "a",
  children: "Button as anchor",
  // eslint-disable-next-line
  // @ts-ignore
  href: "https://nimbus.tiendanube.com/",
  target: "_blank",
};

export const skeleton = SkeletonTemplate.bind({});
skeleton.args = {};
