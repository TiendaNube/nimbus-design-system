import React, { forwardRef, useState, type AnchorHTMLAttributes } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@nimbus-ds/box";
import { Button } from "@nimbus-ds/button";
import { Modal } from "@nimbus-ds/modal";
import { Sidebar } from "@nimbus-ds/sidebar";
import { Breadcrumb } from "./Breadcrumb";
import { type BreadcrumbItem } from "./breadcrumb.types";

const meta: Meta<typeof Breadcrumb> = {
  title: "Composite/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"]
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

const shortPath: BreadcrumbItem[] = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "Blue shirt" }
];

const longPath: BreadcrumbItem[] = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "Clothing", href: "#clothing" },
  { label: "Shirts", href: "#shirts" },
  { label: "Summer collection", href: "#summer" },
  { label: "Blue shirt" }
];

/** Stands in for a router link: it renders a native anchor and forwards the received attributes. */
const RouterAnchor = forwardRef<
  HTMLAnchorElement,
  AnchorHTMLAttributes<HTMLAnchorElement>
>(({ href, onClick, children, ...props }, ref) => (
  <a
    {...props}
    ref={ref}
    href={href}
    data-router-link="true"
    onClick={(event) => {
      onClick?.(event);
      event.preventDefault();
    }}
  >
    {children}
  </a>
));
RouterAnchor.displayName = "RouterAnchor";

export const Basic: Story = {
  args: {
    items: shortPath
  }
};

export const Collapsed: Story = {
  args: {
    items: longPath
  }
};

export const CustomLimit: Story = {
  args: {
    items: longPath,
    maxVisible: 6
  }
};

export const WithoutLinks: Story = {
  args: {
    items: [
      { label: "Home", href: "#home" },
      { label: "Products" },
      { label: "Clothing", href: "#clothing" },
      { label: "Shirts" },
      { label: "Blue shirt" }
    ]
  }
};

export const LongLabels: Story = {
  render: (args) => (
    <Box maxWidth="16rem" borderStyle="dashed" borderWidth="1">
      <Breadcrumb {...args} />
    </Box>
  ),
  args: {
    items: [
      { label: "Home", href: "#home" },
      {
        label: "A very long category name that needs to wrap",
        href: "#category"
      },
      { label: "Supercalifragilisticexpialidociousproductname" }
    ]
  }
};

export const RouterLink: Story = {
  args: {
    items: longPath,
    linkAs: RouterAnchor
  }
};

export const InsideModal: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open</Button>
        <Modal open={open} onDismiss={() => setOpen(false)}>
          <Breadcrumb {...args} />
        </Modal>
      </>
    );
  },
  args: {
    items: longPath
  }
};

export const InsideSidebar: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open</Button>
        <Sidebar open={open} onRemove={() => setOpen(false)}>
          <Breadcrumb {...args} />
        </Sidebar>
      </>
    );
  },
  args: {
    items: longPath
  }
};

export const RTL: Story = {
  render: (args) => (
    <div dir="rtl">
      <Breadcrumb {...args} />
    </div>
  ),
  args: {
    items: longPath
  }
};

export const MultipleInstances: Story = {
  render: (args) => (
    <Box display="flex" flexDirection="column" gap="4">
      <Breadcrumb {...args} ariaLabel="Products path" />
      <Breadcrumb
        {...args}
        items={[
          { label: "Settings", href: "#settings" },
          { label: "Store", href: "#store" },
          { label: "Payments", href: "#payments" },
          { label: "Providers", href: "#providers" },
          { label: "Card" }
        ]}
        ariaLabel="Settings path"
      />
    </Box>
  ),
  args: {
    items: longPath
  }
};
