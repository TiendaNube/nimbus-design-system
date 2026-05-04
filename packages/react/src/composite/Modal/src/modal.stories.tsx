import React, { useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import { Text } from "@nimbus-ds/text";
import { Button } from "@nimbus-ds/button";
import { Box } from "@nimbus-ds/box";
import { Title } from "@nimbus-ds/title";
import { Tag } from "@nimbus-ds/tag";
import { Sidebar } from "@nimbus-ds/sidebar";
import { Modal } from "./Modal";
import { type ModalProps } from "./modal.types";

const meta: Meta<typeof Modal> = {
  title: "Composite/Modal",
  component: Modal,
  argTypes: {
    children: { control: { disable: true } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Modal>;

const render = (args: ModalProps) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen((prevState) => !prevState);
  return (
    <>
      <Button onClick={handleClose}>Open</Button>
      <Modal {...args} open={open} onDismiss={handleClose} />
    </>
  );
};

const renderWithArgs = (args: ModalProps) => {
  const [{ open }, updateArgs] = useArgs();
  const handleClose = () => updateArgs({ open: !open });
  return (
    <>
      <Button onClick={handleClose}>Open</Button>
      <Modal {...args} open={open} onDismiss={handleClose} />
    </>
  );
};

export const basic: Story = {
  render: renderWithArgs,
  args: {
    children: (
      <>
        <Modal.Header title="Title" />
        <Modal.Body padding="none">
          <Text textAlign="left">
            Arcu condimentum enim at tristique aenean in. Fringilla urna, nec
            dignissim malesuada lobortis faucibus volutpat. Purus tincidunt
            adipiscing id felis, tincidunt nunc nibh urna ac.
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Button appearance="neutral">Button</Button>
          <Button appearance="primary">Button</Button>
        </Modal.Footer>
      </>
    ),
  },
};

export const withRoot: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen((prev) => !prev);
    const rootRef = useRef<HTMLDivElement | null>(null);
    return (
      <Box ref={rootRef} height="60vh" position="relative" width="50vw">
        <Box borderStyle="dashed" borderWidth="1" padding="2" height="100%">
          <Button onClick={handleClose}>Open</Button>
          <Modal
            {...args}
            root={rootRef.current}
            open={open}
            onDismiss={handleClose}
          />
        </Box>
      </Box>
    );
  },
  args: {
    children: (
      <>
        <Modal.Header title="Scoped modal" />
        <Modal.Body padding="none">
          <Text textAlign="left">
            This modal renders inside the provided root.
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Button appearance="primary">Button</Button>
        </Modal.Footer>
      </>
    ),
  },
};

export const WithHeader: Story = {
  render,
  args: {
    children: (
      <>
        <Modal.Header title="Title" />
        <Modal.Body>
          <Box
            borderStyle="dashed"
            padding="2"
            borderWidth="1"
            borderColor="neutral-interactive"
          >
            <Text textAlign="center">Replace me with your content</Text>
          </Box>
        </Modal.Body>
      </>
    ),
  },
};

export const WithHeaderAndTag: Story = {
  render,
  args: {
    children: (
      <>
        <Modal.Header title="Title" tag={<Tag appearance="primary">New</Tag>} />
        <Modal.Body>
          <Box
            borderStyle="dashed"
            padding="2"
            borderWidth="1"
            borderColor="neutral-interactive"
          >
            <Text textAlign="center">Replace me with your content</Text>
          </Box>
        </Modal.Body>
      </>
    ),
  },
};

export const WithFooterAndHeader: Story = {
  render,
  args: {
    children: (
      <>
        <Modal.Header title="Title" />
        <Modal.Body>
          <Box
            borderStyle="dashed"
            padding="2"
            borderWidth="1"
            borderColor="neutral-interactive"
          >
            <Text textAlign="center">Replace me with your content</Text>
          </Box>
        </Modal.Body>
        <Modal.Footer>
          <Button appearance="primary">Button</Button>
        </Modal.Footer>
      </>
    ),
  },
};

export const content: Story = {
  render,
  args: {
    padding: "none",
    children: <Text textAlign="center">Replace me with your content</Text>,
  },
};

export const skeleton: Story = {
  render,
  args: {
    children: (
      <>
        <Modal.Header>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            gap="4"
          >
            <Title.Skeleton as="h4" width="80%" />
          </Box>
        </Modal.Header>
        <Modal.Body>
          <Text.Skeleton width="100%" />
        </Modal.Body>
        <Modal.Footer>
          <Button.Skeleton />
          <Button.Skeleton />
        </Modal.Footer>
      </>
    ),
  },
};

export const noDismiss: Story = {
  render: (args: ModalProps) => {
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen((prevState) => !prevState);
    return (
      <>
        <Button onClick={handleClose}>Open</Button>
        <Modal {...args} open={open} />
      </>
    );
  },
  args: {
    onDismiss: undefined,
    children: (
      <>
        <Modal.Header title="Undismissable Modal" />
        <Modal.Body padding="none">
          <Text textAlign="left">
            This modal cannot be dismissed by clicking the X icon or clicking
            outside.
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Button appearance="neutral">Button</Button>
          <Button appearance="primary">Button</Button>
        </Modal.Footer>
      </>
    ),
  },
};

export const noDismissButton: Story = {
  render: renderWithArgs,
  args: {
    renderDismissButton: false,
    children: (
      <>
        <Modal.Header title="No close button" />
        <Modal.Body padding="none">
          <Text textAlign="left">
            The X icon is hidden, but Escape key and clicking outside still
            close the modal.
          </Text>
        </Modal.Body>
      </>
    ),
  },
};

export const modalOverSidebar: Story = {
  render: (args) => {
    const [{ open }, updateArgs] = useArgs();
    const handleClose = () => updateArgs({ open: !open });
    return (
      <Box display="flex" flexDirection="column" gap="4" padding="4">
        <Text>
          The modal overlay and container uses higher zIndex than Sidebar when
          zIndex=Top
        </Text>
        <Box display="flex" gap="4" alignItems="center">
          <Button onClick={handleClose}>Open top-layer modal</Button>
        </Box>
        <Sidebar content="I stay visible underneath the overlay" open={open}>
          <Modal.Body>Another modal</Modal.Body>
        </Sidebar>
        <Modal {...args} open={open} onDismiss={handleClose} />
      </Box>
    );
  },
  args: {
    zIndex: "top",
    children: (
      <>
        <Modal.Header title="Top-layer modal" />
        <Modal.Body padding="none">
          <Text textAlign="left">
            This modal uses zIndex=&quot;top&quot; and renders above tooltips,
            toasts, and popovers.
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Button appearance="primary">Button</Button>
        </Modal.Footer>
      </>
    ),
  },
};

export const withIgnoreAttribute: Story = {
  render: (args) => {
    // ⚡ Use a simple local state instead of useArgs for open/close
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen((prev) => !prev);

    const rootRef = useRef<HTMLDivElement | null>(null);
    const [ignoreAttribute, setIgnoreAttribute] = useState(true);

    const toggleIgnoreAttribute = () => {
      setIgnoreAttribute((prev) => !prev);
    };

    return (
      <Box display="flex" gap="2" height="60vh">
        <Box ref={rootRef} position="relative" flex="1">
          <Box borderStyle="dashed" borderWidth="1" padding="2" height="100%">
            <Button onClick={handleClose}>Open</Button>
            <Modal
              {...args}
              root={rootRef.current}
              open={open}
              onDismiss={handleClose}
            />
          </Box>
        </Box>

        <Box
          width="320px"
          borderStyle="solid"
          borderWidth="1"
          padding="2"
          {...(ignoreAttribute && { "data-nimbus-outside-press-ignore": true })}
        >
          <Text fontWeight="bold">Chat panel (outside)</Text>

          <Box marginTop="2">
            <Text>
              Clicks here {/* Announce changes to assistive tech */}
              <strong aria-live="polite">
                {ignoreAttribute ? "won't" : "will"}
              </strong>{" "}
              close the Modal.
            </Text>
          </Box>

          <Box marginTop="2">
            {/* Avoid alert() for UX; log to console instead */}
            <Button onClick={() => console.log("Interact button clicked")}>
              Interact
            </Button>
          </Box>

          <Box marginTop="2">
            <Button onClick={toggleIgnoreAttribute}>
              Toggle ignore attribute
            </Button>
          </Box>
        </Box>
      </Box>
    );
  },
  args: {
    padding: "base",
    closeOnOutsidePress: true,
    ignoreAttributeName: "data-nimbus-outside-press-ignore",
    children: (
      <>
        <Modal.Header title="Try clicking the chat panel on the right" />
        <Modal.Body padding="none">
          <Text textAlign="left">
            This Modal should remain open when clicking the chat panel marked
            with the ignore attribute.
          </Text>
        </Modal.Body>
      </>
    ),
  },
};
