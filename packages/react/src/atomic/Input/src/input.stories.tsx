import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TiendanubeIcon } from "@nimbus-ds/icons";
import { Icon } from "@nimbus-ds/icon";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Atomic/Input",
  component: Input,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const basic: Story = {
  args: {
    placeholder: "Placeholder",
  },
};

export const iconStart: Story = {
  args: {
    placeholder: "Placeholder",
    append: <Icon source={<TiendanubeIcon />} />,
    appendPosition: "start",
  },
};

export const iconEnd: Story = {
  args: {
    placeholder: "Placeholder",
    append: <Icon source={<TiendanubeIcon />} />,
    appendPosition: "end",
  },
};

export const success: Story = {
  args: {
    placeholder: "Placeholder",
    appearance: "success",
  },
};

export const warning: Story = {
  args: {
    placeholder: "Placeholder",
    appearance: "warning",
  },
};

export const danger: Story = {
  args: {
    placeholder: "Placeholder",
    appearance: "danger",
  },
};

export const disabled: Story = {
  args: {
    placeholder: "Placeholder",
    disabled: true,
  },
};

export const Tags: Story = {
  args: {
    placeholder: "Type and press Enter to add a tag",
  },
  render: (args) => {
    const [tags, setTags] = useState<string[]>([]);
    return <Input.Tags {...args} tags={tags} onTagsChange={setTags} />;
  },
};

export const TagsWithInitialValues: Story = {
  args: {
    placeholder: "Type and press Enter to add a tag",
  },
  render: (args) => {
    const [tags, setTags] = useState<string[]>([
      "React",
      "TypeScript",
      "JavaScript",
    ]);
    return <Input.Tags {...args} tags={tags} onTagsChange={setTags} />;
  },
};
