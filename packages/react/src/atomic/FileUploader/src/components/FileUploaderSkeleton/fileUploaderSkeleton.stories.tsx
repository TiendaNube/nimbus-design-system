import type { Meta, StoryObj } from "@storybook/react";
import { FileUploader } from "../../FileUploader";

const meta: Meta<typeof FileUploader.Skeleton> = {
  title: "atomic/FileUploader/FileUploader.Skeleton",
  component: FileUploader.Skeleton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FileUploader.Skeleton>;

export const basic: Story = { args: {} };
