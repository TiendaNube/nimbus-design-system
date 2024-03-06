import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import { Button } from "@nimbus-ds/button";
import { Box } from "@nimbus-ds/box";
import { Text } from "@nimbus-ds/text";
import { Link as LinkComponent } from "@nimbus-ds/link";
import { Collapsible } from "./Collapsible";

const meta: Meta<typeof Collapsible> = {
  title: "Composite/Collapsible",
  component: Collapsible,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Collapsible>;

export const basic: Story = {
  render: (args) => {
    const [{ open }, updateArgs] = useArgs();
    const handleOpen = () => updateArgs({ open: !open });
    return (
      <Collapsible {...args} open={open}>
        <Collapsible.Item>
          <Button onClick={handleOpen}>Click me</Button>
        </Collapsible.Item>
        <Collapsible.Body direction="bottom">
          <Box
            width="100%"
            borderStyle="dashed"
            padding="2"
            borderWidth="1"
            borderColor="neutral-interactive"
          >
            <Text textAlign="center">Replace me with your content</Text>
          </Box>
        </Collapsible.Body>
      </Collapsible>
    );
  },
  args: {
    open: false,
  },
};

export const visibilityInverted: Story = {
  render: (args) => {
    const [{ open }, updateArgs] = useArgs();
    const handleOpen = () => updateArgs({ open: !open });
    return (
      <Collapsible {...args} open={open}>
        <Collapsible.Item>
          <Button onClick={handleOpen}>Click me</Button>
        </Collapsible.Item>
        <Collapsible.Body visibleWhen="closed" direction="bottom">
          <Box
            width="100%"
            borderStyle="dashed"
            padding="2"
            borderWidth="1"
            borderColor="neutral-interactive"
          >
            <Text textAlign="center">Replace me with your content</Text>
          </Box>
        </Collapsible.Body>
      </Collapsible>
    );
  },
  args: {
    open: false,
  },
};

export const obfuscatingText: Story = {
  render: (args) => {
    const [{ open }, updateArgs] = useArgs();
    const handleOpen = () => updateArgs({ open: !open });
    const texts = [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in tincidunt felis. Nullam scelerisque sagittis ipsum et fringilla. Pellentesque semper neque sed lacus lobortis vulputate. Vestibulum luctus dolor non blandit finibus. Nunc eget malesuada quam. Phasellus eget dui velit. Nulla eu neque lacinia justo vestibulum interdum. Maecenas convallis lorem ac massa venenatis iaculis. Sed et urna mauris.",
      "Aenean in massa augue. Nam bibendum ante ut tortor eleifend, quis faucibus metus interdum. Nulla rhoncus sapien ac eros accumsan vestibulum. Maecenas in venenatis odio. Praesent lorem lacus, ultricies sit amet orci facilisis, scelerisque rutrum sapien. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aenean commodo vestibulum dolor, sit amet rhoncus nulla cursus sit amet. Morbi imperdiet non lorem a blandit. Mauris rutrum quam vel nunc suscipit, sit amet commodo odio pulvinar. Vestibulum pharetra rhoncus metus eu gravida. Phasellus lobortis tortor non laoreet tempor. Ut sodales et magna ac scelerisque.",
    ];
    return (
      <Collapsible open={open} {...args}>
        <Collapsible.Body visibleWhen="open" direction="top">
          <Box paddingY="2">
            {texts.map((text) => (
              <Text key={text} as="p">
                {text}
              </Text>
            ))}
          </Box>
        </Collapsible.Body>
        <Collapsible.Body visibleWhen="closed" direction="top">
          <Box paddingY="2">
            <Text as="p">{`${texts[0].substring(0, 100)}...`}</Text>
          </Box>
        </Collapsible.Body>
        <Collapsible.Item>
          <LinkComponent
            as="button"
            onClick={handleOpen}
            appearance="primary"
            textDecoration="none"
          >
            {!open ? <>See more</> : <>See less</>}
          </LinkComponent>
        </Collapsible.Item>
      </Collapsible>
    );
  },
  args: {},
};
