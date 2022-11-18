import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";
import { card } from "@nimbus-ds/styles";
import { Title } from "@nimbus-ds/title";
import { Tag } from "@nimbus-ds/tag";
import { Text } from "@nimbus-ds/text";
import { Button } from "@nimbus-ds/button";
import { Box } from "@nimbus-ds/box";
import { Stack } from "@nimbus-ds/stack";

import { Card } from "./Card";

export default {
  title: "Composite/Card",
  component: Card,
  subcomponents: {
    "Card.Header": Card.Header,
    "Card.Body": Card.Body,
    "Card.Footer": Card.Footer,
  },

  parameters: {
    withA11y: { decorators: [withA11y] },
  },
  argTypes: {
    children: { control: { disable: true } },
    backgroundColor: { options: Object.keys(card.properties.backgroundColor) },
    padding: { options: Object.keys(card.properties.padding) },
  },
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const base = Template.bind({});
base.args = {
  children: (
    <>
      <Card.Header>
        <Stack
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Title as="h3">Title</Title>
          <Tag appearance="primary">Text</Tag>
        </Stack>
      </Card.Header>
      <Card.Body>
        <Text textAlign="left" fontSize="base" lineHeight="base">
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
};

export const WithHeader = Template.bind({});
WithHeader.args = {
  children: (
    <>
      <Card.Header title="Title" />
      <Card.Body>
        <Box
          borderStyle="dashed"
          padding="2"
          borderWidth="1px"
          borderColor="neutral.interactive"
        >
          <Text textAlign="center" fontSize="base">
            Replace me with your content
          </Text>
        </Box>
      </Card.Body>
    </>
  ),
};

export const WithFooterAndHeader = Template.bind({});
WithFooterAndHeader.args = {
  children: (
    <>
      <Card.Header title="Title" />
      <Card.Body>
        <Box
          borderStyle="dashed"
          padding="2"
          borderWidth="1px"
          borderColor="neutral.interactive"
        >
          <Text textAlign="center" fontSize="base">
            Replace me with your content
          </Text>
        </Box>
      </Card.Body>
      <Card.Footer>
        <Button appearance="primary">Button</Button>
      </Card.Footer>
    </>
  ),
};

export const content = Template.bind({});
content.args = {
  padding: "none",
  children: (
    <Text textAlign="center" fontSize="base" lineHeight="base">
      Replace me with your content
    </Text>
  ),
};

export const skeleton = Template.bind({});
skeleton.args = {
  children: (
    <>
      <Card.Header>
        <Stack
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap="4"
        >
          <Title.Skeleton as="h3" width="100%" />
          <Tag.Skeleton />
        </Stack>
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
};
