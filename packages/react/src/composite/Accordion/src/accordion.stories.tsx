import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import { TiendanubeIcon, UserGroupIcon } from "@nimbus-ds/icons";
import { Text } from "@nimbus-ds/text";
import { Icon } from "@nimbus-ds/icon";
import { Box } from "@nimbus-ds/box";
import { Card } from "@nimbus-ds/card";
import { Title } from "@nimbus-ds/title";
import { Radio } from "@nimbus-ds/radio";

import { Accordion } from "./Accordion";

export default {
  title: "Composite/Accordion",
  component: Accordion,
  subcomponents: {
    "Accordion.Header": Accordion.Header,
    "Accordion.Body": Accordion.Body,
    "Accordion.Item": Accordion.Item,
  },

  parameters: {
    withA11y: { decorators: [withA11y] },
  },
  argTypes: {
    children: { control: { disable: true } },
  },
} as ComponentMeta<typeof Accordion>;

const Template: ComponentStory<typeof Accordion> = (args) => (
  <Accordion {...args} />
);

export const base = Template.bind({});
base.args = {
  children: (
    <>
      <Accordion.Item index="0">
        <Accordion.Header
          title="Title one"
          subtitle="Caption one"
          icon={<TiendanubeIcon size={18} />}
        />
        <Accordion.Body>
          <Box
            width="100%"
            borderStyle="dashed"
            padding="2"
            borderWidth="1px"
            borderColor="neutral-interactive"
          >
            <Text textAlign="center">Replace me with your content</Text>
          </Box>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item index="1">
        <Accordion.Header
          title="Title two"
          subtitle="Caption two"
          icon={<UserGroupIcon size={18} />}
          borderBottom="base"
        />
        <Accordion.Body borderBottom="base">
          <Box
            width="100%"
            borderStyle="dashed"
            padding="2"
            borderWidth="1px"
            borderColor="neutral-interactive"
          >
            <Text textAlign="center">Replace me with your content</Text>
          </Box>
        </Accordion.Body>
      </Accordion.Item>
    </>
  ),
};

export const WithCard = Template.bind({});
WithCard.args = {
  children: (
    <Card padding="none">
      <Accordion.Item index="0">
        <Accordion.Header
          title="Title one"
          subtitle="Caption one"
          icon={<TiendanubeIcon size={18} />}
          borderTop="none"
        />
        <Accordion.Body>
          <Box
            width="100%"
            borderStyle="dashed"
            padding="2"
            borderWidth="1px"
            borderColor="neutral-interactive"
          >
            <Text textAlign="center">Replace me with your content</Text>
          </Box>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item index="1">
        <Accordion.Header
          title="Title two"
          subtitle="Caption two"
          icon={<UserGroupIcon size={18} />}
        />
        <Accordion.Body>
          <Box
            width="100%"
            borderStyle="dashed"
            padding="2"
            borderWidth="1px"
            borderColor="neutral-interactive"
          >
            <Text textAlign="center">Replace me with your content</Text>
          </Box>
        </Accordion.Body>
      </Accordion.Item>
    </Card>
  ),
};

export const withoutIcon = Template.bind({});
withoutIcon.args = {
  children: (
    <Card padding="none">
      <Accordion.Item index="0">
        <Accordion.Header
          title="Title one"
          subtitle="Caption one"
          borderTop="none"
        />
        <Accordion.Body>
          <Box
            width="100%"
            borderStyle="dashed"
            padding="2"
            borderWidth="1px"
            borderColor="neutral-interactive"
          >
            <Text textAlign="center">Replace me with your content</Text>
          </Box>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item index="1">
        <Accordion.Header title="Title two" subtitle="Caption two" />
        <Accordion.Body>
          <Box
            width="100%"
            borderStyle="dashed"
            padding="2"
            borderWidth="1px"
            borderColor="neutral-interactive"
          >
            <Text textAlign="center">Replace me with your content</Text>
          </Box>
        </Accordion.Body>
      </Accordion.Item>
    </Card>
  ),
};

export const WithCustomIcon = Template.bind({});
WithCustomIcon.args = {
  children: (
    <Card padding="none">
      <Accordion.Item index="0">
        <Accordion.Header
          title="Title one"
          subtitle="Caption one"
          borderTop="none"
        >
          <Box
            backgroundColor="primary-surface"
            padding="2,5"
            borderRadius="8px"
            marginRight="2,5"
          >
            <Icon
              color="neutral-textHigh"
              source={<TiendanubeIcon size="medium" />}
            />
          </Box>
        </Accordion.Header>
        <Accordion.Body>
          <Box
            width="100%"
            borderStyle="dashed"
            padding="2"
            borderWidth="1px"
            borderColor="neutral-interactive"
          >
            <Text textAlign="center">Replace me with your content</Text>
          </Box>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item index="1">
        <Accordion.Header title="Title two" subtitle="Caption two">
          <Box
            backgroundColor="primary-surface"
            padding="2,5"
            borderRadius="8px"
            marginRight="2,5"
          >
            <Icon
              color="neutral-textHigh"
              source={<UserGroupIcon size="medium" />}
            />
          </Box>
        </Accordion.Header>
        <Accordion.Body>
          <Box
            width="100%"
            borderStyle="dashed"
            padding="2"
            borderWidth="1px"
            borderColor="neutral-interactive"
          >
            <Text textAlign="center">Replace me with your content</Text>
          </Box>
        </Accordion.Body>
      </Accordion.Item>
    </Card>
  ),
};

export const withoutIconToogle = Template.bind({});
withoutIconToogle.args = {
  children: (
    <Card padding="none">
      <Accordion.Item index="0">
        <Accordion.Header noIconToggle borderTop="none">
          {({ selected }) => (
            <Box
              width="100%"
              display="flex"
              justifyContent="space-between"
              flexShrink="0"
            >
              <Title as="h5">Lorem Ipsum one</Title>
              <Radio name="accordion-radio-0" checked={selected === "0"} />
            </Box>
          )}
        </Accordion.Header>
        <Accordion.Body>
          <Box
            width="100%"
            borderStyle="dashed"
            padding="2"
            borderWidth="1px"
            borderColor="neutral-interactive"
          >
            <Text textAlign="center">Replace me with your content</Text>
          </Box>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item index="1">
        <Accordion.Header noIconToggle>
          {({ selected }) => (
            <Box
              width="100%"
              display="flex"
              justifyContent="space-between"
              flexShrink="0"
            >
              <Title as="h5">Lorem Ipsum two</Title>
              <Radio name="accordion-radio-0" checked={selected === "1"} />
            </Box>
          )}
        </Accordion.Header>
        <Accordion.Body>
          <Box
            width="100%"
            borderStyle="dashed"
            padding="2"
            borderWidth="1px"
            borderColor="neutral-interactive"
          >
            <Text textAlign="center">Replace me with your content</Text>
          </Box>
        </Accordion.Body>
      </Accordion.Item>
    </Card>
  ),
};
