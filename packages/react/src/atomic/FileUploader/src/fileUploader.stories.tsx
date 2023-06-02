import type { Meta, StoryObj } from "@storybook/react";
import { FileUploader } from "./FileUploader";

const meta: Meta<typeof FileUploader> = {
  title: "Atomic/FileUploader",
  component: FileUploader,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FileUploader>;

export const basic: Story = {
  args: {
    width: "104px",
    placeholder: "Helper text",
  },
};

export const disabled: Story = {
  args: {
    width: "104px",
    placeholder: "Helper text",
    disabled: true,
  },
};

export const horizontal: Story = {
  args: {
    aspectRatio: "none",
    flexDirection: "row",
    width: "100%",
    height: "3rem",
    placeholder: "Helper text",
  },
};

export const vertical: Story = {
  args: {
    aspectRatio: "none",
    width: "96px",
    height: "68px",
    placeholder: "Helper text",
  },
};
