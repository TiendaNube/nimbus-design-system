import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Text } from "@nimbus-ds/text";
import { Box } from "@nimbus-ds/box";
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

const useFileSelection = () => {
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files.length > 0) {
      setSelectedFiles(Array.from(files));
    }
  };

  return { selectedFiles, handleChange, setSelectedFiles };
};

export const dragAndDrop: Story = {
  render: () => {
    const { selectedFiles, handleChange } = useFileSelection();

    return (
      <Box display="flex" flexDirection="column" gap="4">
        <Text>Try dragging and dropping a file or clicking to select</Text>
        <FileUploader
          width="200px"
          placeholder="Drag or click"
          onChange={handleChange}
        />
        {selectedFiles.length > 0 && (
          <Box display="flex" flexDirection="column" gap="2">
            <Text fontWeight="bold">Selected files:</Text>
            {selectedFiles.map((file) => (
              <Text key={`${file.name}-${file.size}-${file.lastModified}`}>
                {file.name} ({file.type})
              </Text>
            ))}
          </Box>
        )}
      </Box>
    );
  },
};

export const fileTypeValidation: Story = {
  render: () => {
    const { selectedFiles, handleChange, setSelectedFiles } =
      useFileSelection();
    const [rejectedMessage, setRejectedMessage] = React.useState<string>("");

    const handleDropReject = () => {
      setRejectedMessage(
        "Files rejected! Only JPEG, PNG, and GIF images are accepted."
      );
      setSelectedFiles([]);
    };

    const handleDropSuccess = () => {
      setRejectedMessage("");
    };

    return (
      <Box display="flex" flexDirection="column" gap="4">
        <Box display="flex" flexDirection="column" gap="2">
          <Text fontWeight="bold">Image Files Only</Text>
          <Text fontSize="caption" color="neutral-textLow">
            Try dragging different file types. Only JPEG, PNG, and GIF images
            will be accepted.
          </Text>
        </Box>
        <FileUploader
          width="200px"
          placeholder="Images only"
          accept="image/jpeg,image/png,image/gif"
          onChange={handleChange}
          onDropReject={handleDropReject}
          onDropSuccess={handleDropSuccess}
        />
        {selectedFiles.length > 0 && (
          <Box
            display="flex"
            flexDirection="column"
            gap="2"
            padding="4"
            backgroundColor="success-surface"
          >
            <Text fontWeight="bold" color="success-textHigh">
              Accepted files:
            </Text>
            {selectedFiles.map((file) => (
              <Text
                key={`${file.name}-${file.size}-${file.lastModified}`}
                color="success-textHigh"
              >
                ✓ {file.name} ({file.type})
              </Text>
            ))}
          </Box>
        )}
        {rejectedMessage && (
          <Box padding="4" backgroundColor="danger-surface">
            <Text color="danger-textHigh">{rejectedMessage}</Text>
          </Box>
        )}
      </Box>
    );
  },
};
