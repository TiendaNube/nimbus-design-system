import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";
import { TiendanubeIcon } from "@nimbus-ds/icons";
import { Icon } from "@nimbus-ds/icon";

import { Input } from "./Input";

export default {
  title: "Atomic/Input",
  component: Input,
  subcomponents: {
    "Input.Password": Input.Password,
    "Input.Search": Input.Search,
    "Input.Skeleton": Input.Skeleton,
  },
  argTypes: {
    append: { control: { disable: true } },
  },
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;
const SearchTemplate: ComponentStory<typeof Input.Search> = (args) => (
  <Input.Search {...args} />
);
const SkeletonTemplate: ComponentStory<typeof Input.Skeleton> = (args) => (
  <Input.Skeleton {...args} />
);
const PasswordTemplate: ComponentStory<typeof Input.Password> = (args) => (
  <Input.Password {...args} />
);

export const base = Template.bind({});
base.args = {
  placeholder: "Placeholder",
};

export const iconStart = Template.bind({});
iconStart.args = {
  placeholder: "Placeholder",
  append: <Icon source={<TiendanubeIcon />} />,
  appendPosition: "start",
};

export const iconEnd = Template.bind({});
iconEnd.args = {
  placeholder: "Placeholder",
  append: <Icon source={<TiendanubeIcon />} />,
  appendPosition: "end",
};

export const search = SearchTemplate.bind({});
search.args = {
  placeholder: "Placeholder",
};

export const password = PasswordTemplate.bind({});
password.args = {
  placeholder: "Placeholder",
};

export const success = Template.bind({});
success.args = {
  placeholder: "Placeholder",
  appearance: "success",
};

export const warning = Template.bind({});
warning.args = {
  placeholder: "Placeholder",
  appearance: "warning",
};

export const danger = Template.bind({});
danger.args = {
  placeholder: "Placeholder",
  appearance: "danger",
};

export const disabled = Template.bind({});
disabled.args = {
  placeholder: "Placeholder",
  disabled: true,
};

export const skeleton = SkeletonTemplate.bind({});
skeleton.args = {};
