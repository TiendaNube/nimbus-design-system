import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TiendanubeIcon, UserGroupIcon } from "@nimbus-ds/icons";
import { Text } from "@nimbus-ds/text";
import { Icon } from "@nimbus-ds/icon";
import { Box } from "@nimbus-ds/box";
import { Card } from "@nimbus-ds/card";
import { Title } from "@nimbus-ds/title";
import { Radio } from "@nimbus-ds/radio";
import { Button } from "@nimbus-ds/button";

import { Accordion } from "./Accordion";

const meta: Meta<typeof Accordion> = {
  title: "Composite/Accordion",
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

const ControlledAccordionStory = () => {
  const [selectedItem, setSelectedItem] = useState("settings");

  return (
    <Box display="flex" flexDirection="column" gap="4">
      <Box display="flex" gap="2" flexWrap="wrap">
        <Button
          appearance={selectedItem === "settings" ? "primary" : "neutral"}
          onClick={() => setSelectedItem("settings")}
        >
          Open Settings
        </Button>
        <Button
          appearance={selectedItem === "notifications" ? "primary" : "neutral"}
          onClick={() => setSelectedItem("notifications")}
        >
          Open Notifications
        </Button>
        <Button
          appearance={selectedItem === "privacy" ? "primary" : "neutral"}
          onClick={() => setSelectedItem("privacy")}
        >
          Open Privacy
        </Button>
        <Button
          appearance={selectedItem === "" ? "primary" : "neutral"}
          onClick={() => setSelectedItem("")}
        >
          Close All
        </Button>
      </Box>

      <Card padding="none">
        <Accordion selectedItem={selectedItem} onItemSelect={setSelectedItem}>
          <Accordion.Item index="settings">
            <Accordion.Header
              title="Settings"
              subtitle="Manage your account preferences"
              icon={<TiendanubeIcon size={18} />}
              borderTop="none"
            />
            <Accordion.Body>
              <Box padding="4">
                <Text>
                  Configure your application settings, themes, and preferences.
                  This section is controlled externally by the buttons above.
                </Text>
              </Box>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item index="notifications">
            <Accordion.Header
              title="Notifications"
              subtitle="Control your notification preferences"
              icon={<UserGroupIcon size={18} />}
            />
            <Accordion.Body>
              <Box padding="4">
                <Text>
                  Manage email notifications, push notifications, and alert
                  preferences. The accordion state is synchronized with external
                  controls.
                </Text>
              </Box>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item index="privacy">
            <Accordion.Header
              title="Privacy & Security"
              subtitle="Manage your privacy settings"
              icon={<TiendanubeIcon size={18} />}
            />
            <Accordion.Body>
              <Box padding="4">
                <Text>
                  Control data sharing, privacy settings, and security options.
                  Notice how the selected state is managed by the parent
                  component.
                </Text>
              </Box>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Card>

      <Box padding="3" backgroundColor="neutral-surface" borderRadius="2">
        <Text fontSize="caption" color="neutral-textLow">
          <strong>Currently selected:</strong> {selectedItem || "None"}
        </Text>
      </Box>
    </Box>
  );
};

export const Controlled: Story = {
  render: () => <ControlledAccordionStory />,
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates controlled mode where the accordion selection is managed by external state. Use the buttons to control which accordion item is open, or click the accordion headers directly. The selected state is synchronized between the buttons and the accordion.",
      },
    },
  },
};

export const NonInteractiveItems: Story = {
  args: {
    children: (
      <Card padding="none">
        <div>
          <Accordion.Item index="0" interactive={false}>
            <Accordion.Header
              title="Completed step (non-interactive)"
              subtitle="This item is static and cannot be clicked"
              icon={<TiendanubeIcon size={18} />}
              borderTop="none"
            />
          </Accordion.Item>
          <Accordion.Item index="1">
            <Accordion.Header
              title="Active step (interactive)"
              subtitle="This item can be expanded"
              icon={<UserGroupIcon size={18} />}
            />
            <Accordion.Body>
              <Box padding="4">
                <Text>
                  This is the body content of an interactive accordion item.
                  Notice how the previous item has no chevron and doesn`t
                  respond to clicks.
                </Text>
              </Box>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item index="2">
            <Accordion.Header
              title="Another active step"
              subtitle="Also interactive"
              icon={<TiendanubeIcon size={18} />}
            />
            <Accordion.Body>
              <Box padding="4">
                <Text>
                  Regular interactive accordion item with expandable content.
                </Text>
              </Box>
            </Accordion.Body>
          </Accordion.Item>
        </div>
      </Card>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates non-interactive accordion items useful for stepper flows or completed steps. When interactive={false}, the item renders as a static div without hover effects, click handlers, or toggle chevron.",
      },
    },
  },
};
