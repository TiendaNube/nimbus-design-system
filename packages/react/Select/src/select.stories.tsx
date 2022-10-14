import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import { Select } from "./Select";
import { Group, Option, Skeleton } from "./components";

export default {
  title: "Atomic/Select",
  component: Select,
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
  subcomponents: {
    "Select.Group": Group,
    "Select.Option": Option,
    "Select.Skeleton": Skeleton,
  },
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;
const SkeletonTemplate: ComponentStory<typeof Select.Skeleton> = (args) => (
  <Select.Skeleton {...args} />
);

export const withGroups = Template.bind({});
withGroups.args = {
  name: "Name",
  id: "Id",
  disabled: false,
  children: (
    <>
      <Select.Group label="Group 1">
        <Select.Option
          label="This option is selected"
          selected
          value="Option 1"
        />
        <Select.Option
          label="This option is disabled"
          disabled
          value="Option 2"
        />
        <Select.Option value="Option 3" />
      </Select.Group>
      <Select.Group label="Group 2">
        <Select.Option value="Option 4" />
        <Select.Option value="Option 5" />
        <Select.Option value="Option 6" />
      </Select.Group>
    </>
  ),
};

export const withoutGroups = Template.bind({});
withoutGroups.args = {
  name: "Name",
  id: "Id",
  children: (
    <>
      <Select.Option
        label="This option is selected"
        selected
        value="Option 1"
      />
      <Select.Option
        label="This option is disabled"
        disabled
        value="Option 2"
      />
      <Select.Option value="Option 3" />
      <Select.Option value="Option 4" />
      <Select.Option value="Option 5" />
      <Select.Option value="Option 6" />
    </>
  ),
};

export const withPlaceholderOption = Template.bind({});
withPlaceholderOption.args = {
  name: "Name",
  id: "Id",
  children: (
    <>
      <Select.Option label="This option is a placeholder" disabled selected />
      <Select.Option value="Option 2" />
      <Select.Option value="Option 3" />
      <Select.Option value="Option 4" />
      <Select.Option value="Option 5" />
      <Select.Option value="Option 6" />
    </>
  ),
};

export const skeleton = SkeletonTemplate.bind({});
skeleton.args = {
  width: "100%",
};
