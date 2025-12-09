import { Meta } from "@storybook/react";
import { FileUploader } from "../../FileUploader";

const meta: Meta<typeof FileUploader.Overlay> = {
  title: "Atomic/FileUploader/FileUploader.Overlay",
  component: FileUploader.Overlay,
  tags: ["autodocs"],
};

export default meta;
type Story = Meta<typeof FileUploader.Overlay>;

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
    imageSrc: "https://via.placeholder.com/150",
    backgroundColor: "neutral-background",
    borderColor: "ai-gradientPurpleHigh",
  },
};
