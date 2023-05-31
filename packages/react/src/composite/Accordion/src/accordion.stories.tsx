import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TiendanubeIcon, UserGroupIcon } from "@nimbus-ds/icons";
import { Text } from "@nimbus-ds/text";
import { Icon } from "@nimbus-ds/icon";
import { Box } from "@nimbus-ds/box";
import { Card } from "@nimbus-ds/card";
import { Title } from "@nimbus-ds/title";
import { Radio } from "@nimbus-ds/radio";

import { Accordion } from "./Accordion";

const meta: Meta<typeof Accordion> = {
  title: "Composite/Accordion/Accordion",
  component: Accordion,
  argTypes: {
    children: { control: { disable: true } },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const basic: Story = {
  args: {
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
              borderWidth="1"
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
              borderWidth="1"
              borderColor="neutral-interactive"
            >
              <Text textAlign="center">Replace me with your content</Text>
            </Box>
          </Accordion.Body>
        </Accordion.Item>
      </>
    ),
  },
};

export const WithCard: Story = {
  args: {
    children: (
      <Card padding="none">
        <div>
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
                borderWidth="1"
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
                borderWidth="1"
                borderColor="neutral-interactive"
              >
                <Text textAlign="center">Replace me with your content</Text>
              </Box>
            </Accordion.Body>
          </Accordion.Item>
        </div>
      </Card>
    ),
  },
};

export const withoutIcon: Story = {
  args: {
    children: (
      <Card padding="none">
        <div>
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
                borderWidth="1"
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
                borderWidth="1"
                borderColor="neutral-interactive"
              >
                <Text textAlign="center">Replace me with your content</Text>
              </Box>
            </Accordion.Body>
          </Accordion.Item>
        </div>
      </Card>
    ),
  },
};

export const WithCustomIcon: Story = {
  args: {
    children: (
      <Card padding="none">
        <div>
          <Accordion.Item index="0">
            <Accordion.Header
              title="Title one"
              subtitle="Caption one"
              borderTop="none"
            >
              <Box
                backgroundColor="primary-surface"
                padding="2-5"
                borderRadius="5"
                marginRight="2-5"
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
                borderWidth="1"
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
                padding="2-5"
                borderRadius="5"
                marginRight="2-5"
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
                borderWidth="1"
                borderColor="neutral-interactive"
              >
                <Text textAlign="center">Replace me with your content</Text>
              </Box>
            </Accordion.Body>
          </Accordion.Item>
        </div>
      </Card>
    ),
  },
};

export const withoutIconToogle: Story = {
  args: {
    children: (
      <Card padding="none">
        <div>
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
                borderWidth="1"
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
                borderWidth="1"
                borderColor="neutral-interactive"
              >
                <Text textAlign="center">Replace me with your content</Text>
              </Box>
            </Accordion.Body>
          </Accordion.Item>
        </div>
      </Card>
    ),
  },
};
