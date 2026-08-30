import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@nimbus-ds/box";
import { Text } from "@nimbus-ds/text";
import { Title } from "@nimbus-ds/title";
import { Card } from "@nimbus-ds/card";
import { Checkbox } from "@nimbus-ds/checkbox";
import { ProgressBar } from "@nimbus-ds/progress-bar";

import { ProgressRing } from "./ProgressRing";

const meta: Meta<typeof ProgressRing> = {
  title: "Prototypes/ProgressRing",
  component: ProgressRing,
};

export default meta;

/** Internal working view: sweep the values and compare against the linear bar. */
export const Playground: StoryObj<typeof ProgressRing> = {
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
    size: { control: { type: "range", min: 24, max: 200, step: 4 } },
    thickness: { control: { type: "range", min: 2, max: 24, step: 1 } },
    appearance: {
      control: "select",
      options: [
        "primary",
        "success",
        "warning",
        "danger",
        "neutral",
        "ai-generative",
      ],
    },
  },
  args: { value: 64, appearance: "primary", size: 96, thickness: 8 },
  render: (args) => (
    <Box display="flex" flexDirection="column" gap="6" padding="4">
      <Box display="flex" alignItems="center" gap="6">
        <ProgressRing {...args} label="Store setup progress" />
        <Box display="flex" flexDirection="column" gap="2" width="240px">
          <Text fontSize="caption" color="neutral-textLow">
            Same value on the shipped linear bar
          </Text>
          <ProgressBar
            value={args.value}
            appearance={
              args.appearance === "ai-generative" ? "primary" : args.appearance
            }
          />
        </Box>
      </Box>

      <Box display="flex" flexDirection="column" gap="2">
        <Text fontSize="caption" color="neutral-textLow">
          Smallest sizes — where the centre label stops being legible
        </Text>
        <Box display="flex" alignItems="center" gap="4">
          {[24, 32, 40, 56, 72].map((size) => (
            <ProgressRing
              key={size}
              value={args.value}
              appearance={args.appearance}
              size={size}
              thickness={Math.max(2, Math.round(size / 12))}
              label={`Progress at ${size} pixels`}
            />
          ))}
        </Box>
      </Box>
    </Box>
  ),
};

const TASKS = [
  "Add your first product",
  "Set up a payment method",
  "Choose a shipping option",
  "Pick a domain",
  "Customise your storefront",
];

/**
 * Shareable experience. Ticking a task moves both indicators, so whoever tries
 * it can judge which one they actually looked at.
 */
export const FullScreen: StoryObj<typeof ProgressRing> = {
  name: "Full screen",
  parameters: { layout: "fullscreen", controls: { disable: true } },
  render: () => {
    const [done, setDone] = useState<boolean[]>([
      true,
      true,
      false,
      false,
      false,
    ]);
    const completed = done.filter(Boolean).length;
    const value = (completed / TASKS.length) * 100;
    const appearance = completed === TASKS.length ? "success" : "primary";

    const toggle = (index: number) =>
      setDone((prev) => prev.map((v, i) => (i === index ? !v : v)));

    return (
      <Box
        display="flex"
        justifyContent="center"
        backgroundColor="neutral-background"
        minHeight="100vh"
        padding="6"
      >
        <Box
          display="flex"
          flexDirection="column"
          gap="4"
          width="100%"
          maxWidth="520px"
        >
          <Title as="h2">Finish setting up your store</Title>

          <Card>
            <Card.Body>
              <Box display="flex" alignItems="center" gap="6">
                <ProgressRing
                  value={value}
                  appearance={appearance}
                  size={104}
                  label="Store setup progress"
                >
                  <Box display="flex" flexDirection="column">
                    <Text fontSize="highlight" fontWeight="bold">
                      {completed}/{TASKS.length}
                    </Text>
                    <Text fontSize="caption" color="neutral-textLow">
                      done
                    </Text>
                  </Box>
                </ProgressRing>

                <Box display="flex" flexDirection="column" gap="2" flex="1">
                  <Text>
                    {completed === TASKS.length
                      ? "Your store is ready to sell."
                      : `${
                          TASKS.length - completed
                        } steps left before you can sell.`}
                  </Text>
                  <Text fontSize="caption" color="neutral-textLow">
                    The same value, on the bar we ship today
                  </Text>
                  <ProgressBar value={value} appearance={appearance} />
                </Box>
              </Box>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <Box display="flex" flexDirection="column" gap="3">
                {TASKS.map((task, index) => (
                  <Checkbox
                    key={task}
                    name={`task-${index}`}
                    label={task}
                    checked={done[index]}
                    onChange={() => toggle(index)}
                  />
                ))}
              </Box>
            </Card.Body>
          </Card>
        </Box>
      </Box>
    );
  },
};
