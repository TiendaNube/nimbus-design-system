import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Table } from "./Table";
import { TableColumnLayout } from "./table.types";

const meta: Meta<typeof Table> = {
  title: "Composite/Table",
  component: Table,
  argTypes: {
    children: { control: { disable: true } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Table>;

export const basic: Story = {
  args: {
    children: (
      <>
        <Table.Head>
          <Table.Row backgroundColor="neutral-surface">
            <Table.Cell as="th">Header 1</Table.Cell>
            <Table.Cell as="th">Header 2</Table.Cell>
            <Table.Cell as="th">Header 3</Table.Cell>
            <Table.Cell as="th">Header 4</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {Array.from({ length: 10 }, (_, i) => (
            <Table.Row key={i}>
              <Table.Cell>Cell 1</Table.Cell>
              <Table.Cell>Cell 2</Table.Cell>
              <Table.Cell>Cell 3</Table.Cell>
              <Table.Cell>Cell 4</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </>
    ),
  },
};

export const withCustomCellWidth: Story = {
  args: {
    children: (
      <>
        <Table.Head>
          <Table.Row backgroundColor="neutral-surface">
            <Table.Cell as="th" width="180px">
              This column has fixed width
            </Table.Cell>
            <Table.Cell as="th">This column has auto width</Table.Cell>
            <Table.Cell as="th" width="180px">
              This column has fixed width
            </Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {Array.from({ length: 10 }, (_, i) => (
            <Table.Row key={i}>
              <Table.Cell>Cell 1</Table.Cell>
              <Table.Cell>Cell 2</Table.Cell>
              <Table.Cell>Cell 3</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </>
    ),
  },
};

export const withFlexibleColumns: Story = {
  args: {},
  render: () => {
    const columnLayout: TableColumnLayout[] = [
      { id: "column-1", width: "80px" },
      { id: "column-2", minWidth: "100px", maxWidth: "200px" },
      { id: "column-3", minWidth: "150px", maxWidth: "250px" },
      { id: "column-4" },
    ];

    return (
      <Table columnLayout={columnLayout}>
        <Table.Head>
          <Table.Row backgroundColor="neutral-surface">
            <Table.Cell as="th" column={0}>
              Fixed (80px)
            </Table.Cell>
            <Table.Cell as="th" column={1}>
              Max 200px
            </Table.Cell>
            <Table.Cell as="th" column={2}>
              Min 150px
            </Table.Cell>
            <Table.Cell as="th" column={3}>
              Fixed (100px)
            </Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {Array.from({ length: 3 }, (_, i) => (
            <Table.Row key={i}>
              <Table.Cell column={0}>ID-{i + 1}</Table.Cell>
              <Table.Cell column={1}>
                This content will be truncated when it exceeds the maximum width
                of 200px with ellipsis...
              </Table.Cell>
              <Table.Cell column={2}>
                This column has a minimum width of 150px and will not shrink
                below that
              </Table.Cell>
              <Table.Cell column={3}>Actions</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates column width constraints. Use `width` for fixed-width columns, `maxWidth` for columns that should truncate overflow, and `minWidth` for columns that should not shrink below a certain size.",
      },
    },
  },
};

export const withTruncatedContent: Story = {
  args: {},
  render: () => {
    const columnLayout: TableColumnLayout[] = [
      { id: "column-1", width: "60px" },
      { id: "column-2", maxWidth: "180px" },
      { id: "column-3", width: "100px" },
    ];

    const products = [
      {
        id: "001",
        name: "Premium Wireless Bluetooth Headphones with Noise Cancellation Technology",
        status: "Available",
      },
      {
        id: "002",
        name: "Ultra-Slim Portable External Battery Pack 20000mAh Fast Charging",
        status: "Out of Stock",
      },
      {
        id: "003",
        name: "Professional Studio Quality USB Condenser Microphone Kit",
        status: "Available",
      },
    ];

    return (
      <Table columnLayout={columnLayout}>
        <Table.Head>
          <Table.Row backgroundColor="neutral-surface">
            <Table.Cell as="th" column={0}>
              ID
            </Table.Cell>
            <Table.Cell as="th" column={1}>
              Product Name
            </Table.Cell>
            <Table.Cell as="th" column={2}>
              Status
            </Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {products.map((product) => (
            <Table.Row key={product.id}>
              <Table.Cell column={0}>{product.id}</Table.Cell>
              <Table.Cell column={1}>{product.name}</Table.Cell>
              <Table.Cell column={2}>{product.status}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates text truncation with ellipsis using `maxWidth`. Long product names are truncated to fit within the specified maximum width.",
      },
    },
  },
};

export const withNoPadding: Story = {
  args: {
    children: (
      <>
        <Table.Head>
          <Table.Row backgroundColor="neutral-surface">
            <Table.Cell as="th" padding="none">
              Header 1
            </Table.Cell>
            <Table.Cell as="th" padding="none">
              Header 2
            </Table.Cell>
            <Table.Cell as="th" padding="none">
              Header 3
            </Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {Array.from({ length: 10 }, (_, i) => (
            <Table.Row key={i}>
              <Table.Cell padding="none">Cell 1</Table.Cell>
              <Table.Cell padding="none">Cell 2</Table.Cell>
              <Table.Cell padding="none">Cell 3</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </>
    ),
  },
};

export const withMinWidth: Story = {
  args: {},
  render: () => (
    <div style={{ maxWidth: "500px", border: "1px dashed #ccc" }}>
      <Table minWidth="800px">
        <Table.Head>
          <Table.Row backgroundColor="neutral-surface">
            <Table.Cell as="th">Product</Table.Cell>
            <Table.Cell as="th">Category</Table.Cell>
            <Table.Cell as="th">Price</Table.Cell>
            <Table.Cell as="th">Stock</Table.Cell>
            <Table.Cell as="th">Status</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {Array.from({ length: 5 }, (_, i) => (
            <Table.Row key={i}>
              <Table.Cell>Product {i + 1}</Table.Cell>
              <Table.Cell>Electronics</Table.Cell>
              <Table.Cell>$199.99</Table.Cell>
              <Table.Cell>150 units</Table.Cell>
              <Table.Cell>Available</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "When the container is smaller than the table's `minWidth`, horizontal scrolling is enabled. Resize the window to see the scrolling behavior.",
      },
    },
  },
};

export const withMinAndMaxWidth: Story = {
  args: {},
  render: () => {
    const renderUserRows = () =>
      Array.from({ length: 3 }, (_, i) => (
        <Table.Row key={i}>
          <Table.Cell>John Doe</Table.Cell>
          <Table.Cell>john.doe@example.com</Table.Cell>
          <Table.Cell>Administrator</Table.Cell>
          <Table.Cell>Edit | Delete</Table.Cell>
        </Table.Row>
      ));

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <div>
          <p style={{ marginBottom: "8px", fontFamily: "sans-serif" }}>
            <strong>Narrow container (300px)</strong> — scrolls horizontally
          </p>
          <div style={{ width: "300px", border: "1px dashed #ccc" }}>
            <Table minWidth="600px" maxWidth="900px">
              <Table.Head>
                <Table.Row backgroundColor="neutral-surface">
                  <Table.Cell as="th">Name</Table.Cell>
                  <Table.Cell as="th">Email</Table.Cell>
                  <Table.Cell as="th">Role</Table.Cell>
                  <Table.Cell as="th">Actions</Table.Cell>
                </Table.Row>
              </Table.Head>
              <Table.Body>{renderUserRows()}</Table.Body>
            </Table>
          </div>
        </div>
        <div>
          <p style={{ marginBottom: "8px", fontFamily: "sans-serif" }}>
            <strong>Wide container (100%)</strong> — table respects maxWidth of
            900px
          </p>
          <div style={{ width: "100%", border: "1px dashed #ccc" }}>
            <Table minWidth="600px" maxWidth="900px">
              <Table.Head>
                <Table.Row backgroundColor="neutral-surface">
                  <Table.Cell as="th">Name</Table.Cell>
                  <Table.Cell as="th">Email</Table.Cell>
                  <Table.Cell as="th">Role</Table.Cell>
                  <Table.Cell as="th">Actions</Table.Cell>
                </Table.Row>
              </Table.Head>
              <Table.Body>{renderUserRows()}</Table.Body>
            </Table>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates both `minWidth` and `maxWidth` constraints. The table scrolls when the container is smaller than `minWidth` and stops growing when it reaches `maxWidth`.",
      },
    },
  },
};

export const withFixedColumns: Story = {
  args: {},
  render: () => {
    const columnLayout: TableColumnLayout[] = [
      { id: "column-id", width: "80px", fixed: "left" },
      { id: "column-name", width: "150px", fixed: "left" },
      { id: "column-email", width: "200px" },
      { id: "column-role", width: "120px" },
      { id: "column-department", width: "150px" },
      { id: "column-location", width: "120px" },
      { id: "column-status", width: "100px" },
      { id: "column-actions", width: "120px", fixed: "right" },
    ];

    const data = [
      {
        id: "001",
        name: "John Doe",
        email: "john.doe@example.com",
        role: "Admin",
        department: "Engineering",
        location: "New York",
        status: "Active",
      },
      {
        id: "002",
        name: "Jane Smith",
        email: "jane.smith@example.com",
        role: "Manager",
        department: "Marketing",
        location: "Los Angeles",
        status: "Active",
      },
      {
        id: "003",
        name: "Bob Johnson",
        email: "bob.johnson@example.com",
        role: "Developer",
        department: "Engineering",
        location: "Chicago",
        status: "Inactive",
      },
      {
        id: "004",
        name: "Alice Brown",
        email: "alice.brown@example.com",
        role: "Designer",
        department: "Design",
        location: "San Francisco",
        status: "Active",
      },
      {
        id: "005",
        name: "Charlie Wilson",
        email: "charlie.wilson@example.com",
        role: "Analyst",
        department: "Finance",
        location: "Boston",
        status: "Active",
      },
    ];

    return (
      <div>
        <Table columnLayout={columnLayout} minWidth="1040px">
          <Table.Head>
            <Table.Row backgroundColor="primary-surface">
              <Table.Cell as="th" column={0}>
                ID
              </Table.Cell>
              <Table.Cell as="th" column={1}>
                Name
              </Table.Cell>
              <Table.Cell as="th" column={2}>
                Email
              </Table.Cell>
              <Table.Cell as="th" column={3}>
                Role
              </Table.Cell>
              <Table.Cell as="th" column={4}>
                Department
              </Table.Cell>
              <Table.Cell as="th" column={5}>
                Location
              </Table.Cell>
              <Table.Cell as="th" column={6}>
                Status
              </Table.Cell>
              <Table.Cell as="th" column={7}>
                Actions
              </Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {data.map((row, index) => (
              <Table.Row
                key={row.id}
                backgroundColor={
                  index % 2 === 0 ? "neutral-surface" : "primary-surface"
                }
              >
                <Table.Cell column={0}>{row.id}</Table.Cell>
                <Table.Cell column={1}>{row.name}</Table.Cell>
                <Table.Cell column={2}>{row.email}</Table.Cell>
                <Table.Cell column={3}>{row.role}</Table.Cell>
                <Table.Cell column={4}>{row.department}</Table.Cell>
                <Table.Cell column={5}>{row.location}</Table.Cell>
                <Table.Cell column={6}>{row.status}</Table.Cell>
                <Table.Cell column={7}>Edit | Delete</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates fixed (sticky) columns on both sides. The first two columns (ID and Name) are fixed to the left, while the Actions column is fixed to the right. Fixed columns use CSS `position: sticky` with calculated offsets based on adjacent column widths.",
      },
    },
  },
};

export const withCustomSizes: Story = {
  args: {},
  render: () => {
    const columnLayout: TableColumnLayout[] = [
      { id: "column-id", width: "80px", fixed: "left" },
      { id: "column-name", minWidth: "150px", maxWidth: "250px" },
      { id: "column-description", grow: 1, minWidth: "100px"},
      { id: "column-status", minWidth: "50px", maxWidth: "100px", fixed: "right" },
    ];

    const products = [
      {
        id: "001",
        name: "Wireless Headphones",
        description:
          "Premium Bluetooth headphones with active noise cancellation, 30-hour battery life, and comfortable over-ear design for extended listening sessions.",
        status: "Available",
      },
      {
        id: "002",
        name: "Mechanical Keyboard",
        description:
          "RGB backlit mechanical keyboard with Cherry MX switches, programmable macros, and detachable USB-C cable.",
        status: "Out of Stock",
      },
      {
        id: "003",
        name: "USB Hub",
        description: "7-port USB 3.0 hub with fast charging.",
        status: "Available",
      },
    ];

    return (
      <Table columnLayout={columnLayout} useCustomSizes minWidth="700px">
        <Table.Head> 
          <Table.Row backgroundColor="neutral-surface">
            <Table.Cell as="th" column={0}>
              ID
            </Table.Cell>
            <Table.Cell as="th" column={1}>
              Product Name
            </Table.Cell>
            <Table.Cell as="th" column={2}>
              Description
            </Table.Cell>
            <Table.Cell as="th" column={3}>
              Status
            </Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {products.map((product) => (
            <Table.Row key={product.id}>
              <Table.Cell column={0}>{product.id}</Table.Cell>
              <Table.Cell column={1}>{product.name}</Table.Cell>
              <Table.Cell column={2}>{product.description}</Table.Cell>
              <Table.Cell column={3}>{product.status}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates `useCustomSizes` mode which renders the table using CSS Grid instead of native table elements. This allows proper `minWidth` and `maxWidth` constraints on columns, which native HTML tables don't support well. Resize the window to see columns respect their min/max constraints.",
      },
    },
  },
};
