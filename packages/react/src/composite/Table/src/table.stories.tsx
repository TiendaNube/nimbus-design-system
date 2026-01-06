import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@nimbus-ds/button";
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

type Column = {
  id: string;
  hidden: boolean;
  title: string;
} & TableColumnLayout;

export const withGrowColumns: Story = {
  args: {},
  render: () => {
    const columnLayout: Column[] = [
      {
        id: "1",
        width: "100px",
        hidden: false,
        title: "Column 1",
      },
      { id: "2", grow: 2, hidden: false, title: "Column 2" },
      { id: "3", grow: 1, hidden: false, title: "Column 3" },
    ];
    const [columns, setColumns] = useState<Column[]>(columnLayout);

    const toggleColumnVisibility = (id: string) => {
      setColumns((prev) =>
        prev.map((column) =>
          column.id === id ? { ...column, hidden: !column.hidden } : column
        )
      );
    };

    return (
      <Table columnLayout={columns.filter((column) => !column.hidden)}>
        <Table.Head>
          <Table.Row backgroundColor="neutral-surface">
            {columns
              .filter((column) => !column.hidden)
              .map((column) => (
                <Table.Cell as="th" key={column.id}>
                  {column.title}
                  <Button onClick={() => toggleColumnVisibility(column.id)}>
                    Hide
                  </Button>
                </Table.Cell>
              ))}
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {Array.from({ length: 1 }, (_, i) => (
            <Table.Row key={i}>
              {columns.find((column) => column.id === "1")?.hidden ? null : (
                <Table.Cell>
                  Cell 1 Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Error tenetur vero odit culpa similique repellat minima
                  aperiam explicabo veniam velit, eius assumenda tempora fugit
                  suscipit reprehenderit ab libero sit ut. Ea sequi aut nobis
                  eos unde, illum numquam consectetur nisi maiores consequuntur
                  eveniet suscipit nesciunt veniam. Reprehenderit eligendi
                  quidem quibusdam, quae sapiente, expedita eos, velit
                  blanditiis doloribus dolorum voluptas quo!
                </Table.Cell>
              )}
              {columns.find((column) => column.id === "2")?.hidden ? null : (
                <Table.Cell>
                  Cell 2 Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Error tenetur vero odit culpa similique repellat minima
                  aperiam explicabo veniam velit, eius assumenda tempora fugit
                  suscipit reprehenderit ab libero sit ut. Ea sequi aut nobis
                  eos unde, illum numquam consectetur nisi maiores consequuntur
                  eveniet suscipit nesciunt veniam. Reprehenderit eligendi
                  quidem quibusdam, quae sapiente, expedita eos, velit
                  blanditiis doloribus dolorum voluptas quo!
                </Table.Cell>
              )}
              {columns.find((column) => column.id === "3")?.hidden ? null : (
                <Table.Cell>
                  Cell 3 Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Error tenetur vero odit culpa similique repellat minima
                  aperiam explicabo veniam velit, eius assumenda tempora fugit
                  suscipit reprehenderit ab libero sit ut. Ea sequi aut nobis
                  eos unde, illum numquam consectetur nisi maiores consequuntur
                  eveniet suscipit nesciunt veniam. Reprehenderit eligendi
                  quidem quibusdam, quae sapiente, expedita eos, velit
                  blanditiis doloribus dolorum voluptas quo!
                </Table.Cell>
              )}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  },
};

export const withGrowConstraints: Story = {
  args: {},
  render: () => {
    const columnLayout: TableColumnLayout[] = [
      { id: "column-1", width: "100px" },
      { id: "column-2", grow: 2 },
      { id: "column-3", grow: 1, minWidth: "200px" },
      { id: "column-4", grow: 1 },
    ];

    return (
      <Table columnLayout={columnLayout}>
        <Table.Head>
          <Table.Row backgroundColor="neutral-surface">
            <Table.Cell as="th" column={0}>
              Fixed 100px
            </Table.Cell>
            <Table.Cell as="th" column={1}>
              Grow 2x
            </Table.Cell>
            <Table.Cell as="th" column={2}>
              Grow 1x (min 200px)
            </Table.Cell>
            <Table.Cell as="th" column={3}>
              Grow 1x
            </Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {Array.from({ length: 3 }, (_, i) => (
            <Table.Row key={i}>
              <Table.Cell column={0}>Cell 1</Table.Cell>
              <Table.Cell column={1}>
                This column grows with factor 2
              </Table.Cell>
              <Table.Cell column={2}>
                This column grows with factor 1 but never shrinks below 200px
              </Table.Cell>
              <Table.Cell column={3}>
                This column grows with factor 1
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
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
