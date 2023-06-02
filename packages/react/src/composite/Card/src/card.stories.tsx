import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Title } from "@nimbus-ds/title";
import { Tag } from "@nimbus-ds/tag";
import { Text } from "@nimbus-ds/text";
import { Button } from "@nimbus-ds/button";
import { Box } from "@nimbus-ds/box";
import { Card } from "./Card";

const meta: Meta<typeof Card> = {
  title: "Composite/Card",
  component: Card,
  argTypes: {
    children: { control: { disable: true } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const basic: Story = {
  args: {
    children: (
      <>
        <Card.Header>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Title as="h3">Title</Title>
            <Tag appearance="primary">Text</Tag>
          </Box>
        </Card.Header>
        <Card.Body>
          <Text textAlign="left">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed
            tortor hendrerit, varius nulla tristique.
          </Text>
        </Card.Body>
        <Card.Footer>
          <Button appearance="neutral">Button</Button>
          <Button appearance="primary">Button</Button>
        </Card.Footer>
      </>
    ),
  },
};

export const WithHeader: Story = {
  args: {
    children: (
      <>
        <Card.Header title="Title" />
        <Card.Body>
          <Box
            borderStyle="dashed"
            padding="2"
            borderWidth="1"
            borderColor="neutral-interactive"
          >
            <Text textAlign="center">Replace me with your content</Text>
          </Box>
        </Card.Body>
      </>
    ),
  },
};

export const WithFooterAndHeader: Story = {
  args: {
    children: (
      <>
        <Card.Header title="Title" />
        <Card.Body>
          <Box
            borderStyle="dashed"
            padding="2"
            borderWidth="1"
            borderColor="neutral-interactive"
          >
            <Text textAlign="center">Replace me with your content</Text>
          </Box>
        </Card.Body>
        <Card.Footer>
          <Button appearance="primary">Button</Button>
        </Card.Footer>
      </>
    ),
  },
};

export const content: Story = {
  args: {
    padding: "none",
    children: <Text textAlign="center">Replace me with your content</Text>,
  },
};

export const skeleton: Story = {
  args: {
    children: (
      <>
        <Card.Header>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            gap="4"
          >
            <Title.Skeleton as="h3" width="100%" />
            <Tag.Skeleton />
          </Box>
        </Card.Header>
        <Card.Body>
          <Text.Skeleton width="100%" />
        </Card.Body>
        <Card.Footer>
          <Button.Skeleton />
          <Button.Skeleton />
        </Card.Footer>
      </>
    ),
  },
};
