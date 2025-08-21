import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@nimbus-ds/button";
import { Box } from "@nimbus-ds/box";
import { Text } from "@nimbus-ds/text";
import { Toast } from "../../Toast";
import { useToast } from "../../hooks";

const meta: Meta<typeof Toast.Provider> = {
  title: "Atomic/Toast/Toast.Provider",
  component: Toast.Provider,
  argTypes: { children: { control: { disable: true } } },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Toast.Provider>;

export const basic: Story = {
  args: {
    children: <Text>App</Text>,
  },
};

const ToastPlayground: React.FC = () => {
  const { addToast, closeToast } = useToast();
  const [toastIds, setToastIds] = useState<string[]>([]);

  const handleAddAutoToast = () => {
    addToast({
      type: "success",
      text: "Auto-closing toast (4 seconds)",
      duration: 4000,
      autoClose: true,
    });
  };

  const handleAddIndefiniteToast = () => {
    const id = `toast-${Date.now()}`;
    addToast({
      id,
      type: "progress",
      text: "Uploading files...",
      duration: null, // New API: null duration for indefinite toasts
    });
    setToastIds(prev => [...prev, id]);
  };

  const handleAddIndefiniteToastLegacy = () => {
    const id = `toast-legacy-${Date.now()}`;
    addToast({
      id,
      type: "progress", 
      text: "Legacy: autoClose false",
      autoClose: false, // Legacy API still works
    });
    setToastIds(prev => [...prev, id]);
  };

  const handleCloseAllToasts = () => {
    toastIds.forEach(id => closeToast(id));
    setToastIds([]);
  };

  const handleAddMultipleToasts = () => {
    addToast({
      type: "primary",
      text: "First toast",
      duration: 4000,
    });
    
    setTimeout(() => {
      addToast({
        type: "success", 
        text: "Second toast",
        duration: 8000,
      });
    }, 1000);

    setTimeout(() => {
      const id = `long-process-${Date.now()}`;
      addToast({
        id,
        type: "progress",
        text: "Long process running...",
        autoClose: false,
      });
      setToastIds(prev => [...prev, id]);
    }, 2000);
  };

  return (
    <Box display="flex" flexDirection="column" gap="4">
      <Text fontSize="base" fontWeight="bold">
        Toast Provider Playground
      </Text>
      
      <Box display="flex" gap="2" flexWrap="wrap">
        <Button onClick={handleAddAutoToast} appearance="primary">
          Add Auto-closing Toast
        </Button>
        
        <Button onClick={handleAddIndefiniteToast} appearance="neutral">
          Add Indefinite Toast (duration: null)
        </Button>

        <Button onClick={handleAddIndefiniteToastLegacy} appearance="neutral">
          Add Indefinite Toast (autoClose: false)
        </Button>
        
        <Button onClick={handleAddMultipleToasts} appearance="neutral">
          Add Multiple Toasts
        </Button>
        
        <Button 
          onClick={handleCloseAllToasts} 
          appearance="danger"
          disabled={toastIds.length === 0}
        >
          Close All Manual Toasts ({toastIds.length})
        </Button>
      </Box>

      <Box padding="4" backgroundColor="neutral-background">
        <Text fontSize="caption" color="neutral-textLow">
          • Auto-closing toasts disappear after their duration
          <br />
          • Indefinite toasts: Use duration: null (NEW) or autoClose: false (legacy)
          <br />
          • Use closeToast(id) to manually remove specific toasts
          <br />
          • Both APIs achieve the same result - choose your preference!
        </Text>
      </Box>
    </Box>
  );
};

export const playground: Story = {
  render: () => (
    <Toast.Provider>
      <ToastPlayground />
    </Toast.Provider>
  ),
};

const AsyncOperationExample: React.FC = () => {
  const { addToast, closeToast } = useToast();
  const [isUploading, setIsUploading] = useState(false);

  const simulateFileUpload = async () => {
    setIsUploading(true);
    
    // Start with indefinite progress toast using new API
    const uploadToastId = `upload-${Date.now()}`;
    addToast({
      id: uploadToastId,
      type: "progress",
      text: "Uploading files...",
      duration: null, // Indefinite duration - exactly as requested in GitHub issue!
    });

    // Simulate variable upload time (2-5 seconds)
    const uploadTime = Math.random() * 3000 + 2000;
    
    try {
      await new Promise(resolve => setTimeout(resolve, uploadTime));
      
      // Close progress toast and show success
      closeToast(uploadToastId);
      addToast({
        type: "success",
        text: "Upload completed!",
        duration: 4000,
      });
    } catch (error) {
      // Close progress toast and show error
      closeToast(uploadToastId);
      addToast({
        type: "danger", 
        text: "Upload failed!",
        duration: 8000,
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap="4">
      <Text fontSize="base" fontWeight="bold">
        Async Operations Example
      </Text>
      
      <Button 
        onClick={simulateFileUpload}
        appearance="primary"
        disabled={isUploading}
      >
        {isUploading ? "Uploading..." : "Start File Upload"}
      </Button>

      <Box padding="4" backgroundColor="neutral-background">
        <Text fontSize="caption" color="neutral-textLow">
          This example shows the ideal pattern for async operations:
          <br />
          1. Show indefinite progress toast (duration: null)
          <br />
          2. Manually close it when operation completes  
          <br />
          3. Show appropriate success/error toast
          <br />
          <br />
          This matches exactly what was requested in GitHub issue #254!
        </Text>
      </Box>
    </Box>
  );
};

export const asyncOperations: Story = {
  render: () => (
    <Toast.Provider>
      <AsyncOperationExample />
    </Toast.Provider>
  ),
};
