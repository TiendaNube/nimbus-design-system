import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import { Select } from "./Select";
import { SelectGroup, SelectOption, SelectSkeleton } from "./components";

export default {
  title: "Atomic/Select",
  component: Select,
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
  subcomponents: {
    "Select.Group": SelectGroup,
    "Select.Option": SelectOption,
    "Select.Skeleton": SelectSkeleton,
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
  appearance: "neutral",
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
        <Select.Option label="Option 3" value="Option 3" />
      </Select.Group>
      <Select.Group label="Group 2">
        <Select.Option label="Option 4" value="Option 4" />
        <Select.Option label="Option 5" value="Option 5" />
        <Select.Option label="Option 6" value="Option 6" />
      </Select.Group>
    </>
  ),
};

export const withoutGroups = Template.bind({});
withoutGroups.args = {
  name: "Name",
  id: "Id",
  appearance: "neutral",
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
      <Select.Option label="Option 3" value="Option 3" />
      <Select.Option label="Option 4" value="Option 4" />
      <Select.Option label="Option 5" value="Option 5" />
      <Select.Option label="Option 6" value="Option 6" />
    </>
  ),
};

export const withPlaceholderOption = Template.bind({});
withPlaceholderOption.args = {
  name: "Name",
  id: "Id",
  appearance: "neutral",
  children: (
    <>
      <Select.Option
        label="This option is a placeholder"
        value="Option 1"
        disabled
        selected
      />
      <Select.Option label="Option 2" value="Option 2" />
      <Select.Option label="Option 3" value="Option 3" />
      <Select.Option label="Option 4" value="Option 4" />
      <Select.Option label="Option 5" value="Option 5" />
      <Select.Option label="Option 6" value="Option 6" />
    </>
  ),
};

export const skeleton = SkeletonTemplate.bind({});
skeleton.args = {
  width: "100%",
};
