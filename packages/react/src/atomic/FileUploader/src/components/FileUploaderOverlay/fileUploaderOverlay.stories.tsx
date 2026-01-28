import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FileUploader } from "../../FileUploader";

const meta: Meta<typeof FileUploader.Overlay> = {
  title: "Atomic/FileUploader/FileUploader.Overlay",
  component: FileUploader.Overlay,
  tags: ["autodocs"],
  render: (args) => (
    <div style={{ width: "100px", height: "100px" }}>
      <FileUploader.Overlay {...args} />
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof FileUploader.Overlay>;

export const basic: Story = {
  args: {
    title: "Add files",
    subtitle: "Drag and drop files here or click to select files",
  },
};

export const withImage: Story = {
  args: {
    title: "Add files",
    subtitle: "Drag and drop files here or click to select files",
    imageSrc: "/static/image_mockup.png",
    backgroundColor: "neutral-background",
    borderColor: "ai-generativeInteractiveHover",
  },
};
