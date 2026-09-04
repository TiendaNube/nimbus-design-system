import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@nimbus-ds/box";
import { Text } from "@nimbus-ds/text";
import { Title } from "@nimbus-ds/title";
import { Card } from "@nimbus-ds/card";
import { Divider } from "@nimbus-ds/divider";
import { Slider } from "@nimbus-ds/slider";
import { SegmentedControl } from "@nimbus-ds/segmented-control";
import { ProgressBar } from "@nimbus-ds/progress-bar";

import {
  CircularProgress,
  type CircularProgressAppearance,
  type CircularProgressLabelPlacement,
  type CircularProgressSize,
  type CircularProgressThickness,
  fitLabelToken,
  SIZES,
  THICKNESS_RATIOS,
} from "./CircularProgress";

const meta: Meta<typeof CircularProgress> = {
  title: "Prototypes/CircularProgress",
  component: CircularProgress,
};

export default meta;

const APPEARANCES: CircularProgressAppearance[] = [
  "primary",
  "success",
  "warning",
  "danger",
  "neutral",
  "ai-generative",
];

const SIZE_NAMES = Object.keys(SIZES) as CircularProgressSize[];
const THICKNESS_NAMES = Object.keys(
  THICKNESS_RATIOS
) as CircularProgressThickness[];

/** Diameters below the named scale, to find where a centre label gives up. */
const SMALL_DIAMETERS = [20, 24, 28, 32, 40, 48];

const Caption: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Text fontSize="caption" color="neutral-textLow">
    {children}
  </Text>
);

/** Shows which real font-size token the diameter can actually hold. */
const TokenReadout: React.FC<{ diameter: number; stroke: number }> = ({
  diameter,
  stroke,
}) => {
  const token = fitLabelToken(diameter, stroke);

  return (
    <Text
      fontSize="caption"
      color={token ? "success-textLow" : "danger-textLow"}
    >
      {token ? token : "no label fits"}
    </Text>
  );
};

/* -------------------------------------------------------------------------- */
/* Playground — the internal working view                                      */
/* -------------------------------------------------------------------------- */

export const Playground: StoryObj<typeof CircularProgress> = {
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
    size: { control: { type: "range", min: 16, max: 160, step: 2 } },
    thickness: { control: "select", options: THICKNESS_NAMES },
    labelPlacement: {
      control: "inline-radio",
      options: ["inside", "outside", "none"],
    },
    appearance: { control: "select", options: APPEARANCES },
    backgroundColor: {
      control: "inline-radio",
      options: ["neutral-surfaceDisabled", "neutral-background"],
    },
  },
  args: {
    value: 64,
    appearance: "primary",
    size: 96,
    thickness: "regular",
    labelPlacement: "inside",
  },
  render: (args) => (
    <Box display="flex" flexDirection="column" gap="6" padding="4">
      {/* Goal 1 + 6 — the ring next to the bar we already ship, same value. */}
      <Box display="flex" flexDirection="column" gap="2">
        <Title as="h4">Ring vs. the shipped linear bar</Title>
        <Box display="flex" alignItems="center" gap="6">
          <CircularProgress {...args} label="Store setup progress" />
          <Box display="flex" flexDirection="column" gap="2" width="260px">
            <Caption>Same value, same appearance token, on ProgressBar</Caption>
            <ProgressBar
              value={args.value}
              appearance={args.appearance}
              backgroundColor={args.backgroundColor}
            />
          </Box>
        </Box>
      </Box>

      <Divider />

      {/* Goal 3 + 5 — the named scale, each with the token it can hold. */}
      <Box display="flex" flexDirection="column" gap="2">
        <Title as="h4">Named size scale</Title>
        <Caption>
          Each ring shows the font-size token the diameter can actually hold at
          `regular` thickness.
        </Caption>
        <Box display="flex" alignItems="flex-end" gap="5">
          {SIZE_NAMES.map((name) => (
            <Box
              key={name}
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap="1"
            >
              <CircularProgress
                value={args.value}
                appearance={args.appearance}
                size={name}
                label={`Progress, ${name}`}
              />
              <Caption>
                {name} · {SIZES[name]}px
              </Caption>
              <TokenReadout
                diameter={SIZES[name]}
                stroke={Math.round(SIZES[name] * THICKNESS_RATIOS.regular)}
              />
            </Box>
          ))}
        </Box>
      </Box>

      <Divider />

      {/* Goal 5 — where the centre label stops being possible. */}
      <Box display="flex" flexDirection="column" gap="2">
        <Title as="h4">Below the scale: the label floor</Title>
        <Caption>
          The label is never shrunk below `caption` (12px). Under roughly 56px
          the hole cannot hold it, so `inside` renders no label at all — the row
          below repeats the same diameters with the label placed outside.
        </Caption>
        <Box display="flex" alignItems="flex-end" gap="5">
          {SMALL_DIAMETERS.map((diameter) => (
            <Box
              key={diameter}
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap="1"
            >
              <CircularProgress
                value={args.value}
                appearance={args.appearance}
                size={diameter}
                label={`Progress at ${diameter} pixels`}
              />
              <Caption>{diameter}px</Caption>
              <TokenReadout
                diameter={diameter}
                stroke={Math.max(
                  1,
                  Math.round(diameter * THICKNESS_RATIOS.regular)
                )}
              />
            </Box>
          ))}
        </Box>
        <Box display="flex" alignItems="center" gap="5" mt="2">
          {SMALL_DIAMETERS.map((diameter) => (
            <CircularProgress
              key={diameter}
              value={args.value}
              appearance={args.appearance}
              size={diameter}
              labelPlacement="outside"
              label={`Progress at ${diameter} pixels`}
            />
          ))}
        </Box>
      </Box>

      <Divider />

      {/* Goal 4 — stroke width, named ratios against absolute pixels. */}
      <Box display="flex" flexDirection="column" gap="2">
        <Title as="h4">Ring stroke width</Title>
        <Caption>
          Named thicknesses are ratios of the diameter, so the proportion holds
          at every size. The bottom row pins the same stroke in absolute pixels
          instead, where the small ring closes up and the large one goes
          hairline.
        </Caption>
        {THICKNESS_NAMES.map((name) => (
          <Box key={name} display="flex" alignItems="center" gap="5">
            <Box width="120px">
              <Caption>
                {name} · {Math.round(THICKNESS_RATIOS[name] * 100)}%
              </Caption>
            </Box>
            {SIZE_NAMES.map((sizeName) => (
              <CircularProgress
                key={sizeName}
                value={args.value}
                appearance={args.appearance}
                size={sizeName}
                thickness={name}
                label={`${name} stroke, ${sizeName}`}
              />
            ))}
          </Box>
        ))}
        <Box display="flex" alignItems="center" gap="5" mt="2">
          <Box width="120px">
            <Caption>6px, absolute</Caption>
          </Box>
          {SIZE_NAMES.map((sizeName) => (
            <CircularProgress
              key={sizeName}
              value={args.value}
              appearance={args.appearance}
              size={sizeName}
              thickness={6}
              label={`6px stroke, ${sizeName}`}
            />
          ))}
        </Box>
      </Box>

      <Divider />

      {/* Goal 2 — composition: what sits in the middle. */}
      <Box display="flex" flexDirection="column" gap="2">
        <Title as="h4">Composition of the centre</Title>
        <Caption>
          The centre is a single slot. Default is the percentage; `children`
          replaces it entirely, which is how a fraction or an icon would compose
          without the component owning either.
        </Caption>
        <Box display="flex" alignItems="center" gap="6">
          <Box display="flex" flexDirection="column" alignItems="center" gap="1">
            <CircularProgress
              value={args.value}
              appearance={args.appearance}
              size="large"
              label="Default percentage"
            />
            <Caption>default percentage</Caption>
          </Box>

          <Box display="flex" flexDirection="column" alignItems="center" gap="1">
            <CircularProgress
              value={args.value}
              appearance={args.appearance}
              size="large"
              label="Three of five steps done"
            >
              <Box display="flex" flexDirection="column" alignItems="center">
                <Text fontSize="highlight" fontWeight="bold">
                  3/5
                </Text>
                <Text fontSize="caption" color="neutral-textLow">
                  steps
                </Text>
              </Box>
            </CircularProgress>
            <Caption>children slot</Caption>
          </Box>

          <Box display="flex" flexDirection="column" alignItems="center" gap="1">
            <CircularProgress
              value={args.value}
              appearance={args.appearance}
              size="large"
              labelPlacement="none"
              label="No label"
            />
            <Caption>no label</Caption>
          </Box>

          <Box display="flex" flexDirection="column" alignItems="center" gap="1">
            <CircularProgress
              value={args.value}
              appearance={args.appearance}
              size="small"
              labelPlacement="outside"
              label="Label outside"
            />
            <Caption>label outside</Caption>
          </Box>
        </Box>
      </Box>

      <Divider />

      {/* Goal 6 — appearance tokens, including the gradient case. */}
      <Box display="flex" flexDirection="column" gap="2">
        <Title as="h4">Appearance tokens</Title>
        <Caption>
          The same six appearances ProgressBar exposes. `ai-generative` is a
          gradient, re-expressed as an SVG gradient because a stroke cannot take
          a CSS background-image.
        </Caption>
        <Box display="flex" alignItems="center" gap="5">
          {APPEARANCES.map((appearance) => (
            <Box
              key={appearance}
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap="1"
            >
              <CircularProgress
                value={args.value}
                appearance={appearance}
                size="medium"
                label={`${appearance} progress`}
              />
              <Caption>{appearance}</Caption>
            </Box>
          ))}
        </Box>
      </Box>

      <Divider />

      {/* Edge values. */}
      <Box display="flex" flexDirection="column" gap="2">
        <Title as="h4">Edge values</Title>
        <Caption>
          0 draws no arc at all — a round cap on a zero-length dash would paint
          a dot that reads as progress. Out-of-range values clamp, like
          ProgressBar.
        </Caption>
        <Box display="flex" alignItems="center" gap="5">
          {[0, 1, 50, 99, 100, -20, 140].map((value) => (
            <Box
              key={value}
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap="1"
            >
              <CircularProgress
                value={value}
                appearance={args.appearance}
                size="medium"
                label={`Progress ${value}`}
              />
              <Caption>value={value}</Caption>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  ),
};

/* -------------------------------------------------------------------------- */
/* Full screen — the shareable experience                                      */
/* -------------------------------------------------------------------------- */

export const FullScreen: StoryObj<typeof CircularProgress> = {
  name: "Full screen",
  parameters: { layout: "fullscreen", controls: { disable: true } },
  render: () => {
    const [value, setValue] = useState(64);
    const [size, setSize] = useState<CircularProgressSize>("medium");
    const [thickness, setThickness] =
      useState<CircularProgressThickness>("regular");
    const [placement, setPlacement] =
      useState<CircularProgressLabelPlacement>("inside");
    const [appearance, setAppearance] =
      useState<CircularProgressAppearance>("primary");

    const diameter = SIZES[size];
    const stroke = Math.max(
      1,
      Math.round(diameter * THICKNESS_RATIOS[thickness])
    );

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
          maxWidth="640px"
        >
          <Title as="h2">Circular progress</Title>

          <Card>
            <Card.Body>
              <Box display="flex" alignItems="center" gap="6">
                <CircularProgress
                  value={value}
                  appearance={appearance}
                  size={size}
                  thickness={thickness}
                  labelPlacement={placement}
                  label="Store setup progress"
                />

                <Box display="flex" flexDirection="column" gap="2" flex="1">
                  <Text>
                    {diameter}px across, {stroke}px stroke
                  </Text>
                  <Box display="flex" alignItems="center" gap="2">
                    <Caption>centre label:</Caption>
                    {placement === "inside" ? (
                      <TokenReadout diameter={diameter} stroke={stroke} />
                    ) : (
                      <Caption>{placement}</Caption>
                    )}
                  </Box>
                  <Caption>The same value on the bar we ship today</Caption>
                  <ProgressBar value={value} appearance={appearance} />
                </Box>
              </Box>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <Box display="flex" flexDirection="column" gap="4">
                <Box display="flex" flexDirection="column" gap="2">
                  <Caption>Value — {Math.round(value)}%</Caption>
                  <Slider
                    value={value}
                    min={0}
                    max={100}
                    step={1}
                    onChange={(next: number) => setValue(next)}
                    ariaLabel="Progress value"
                  />
                </Box>

                <Box display="flex" flexDirection="column" gap="2">
                  <Caption>Diameter</Caption>
                  <SegmentedControl
                    selectedSegments={[size]}
                    onSegmentsSelect={(ids: string[]) =>
                      setSize(ids[0] as CircularProgressSize)
                    }
                  >
                    {SIZE_NAMES.map((name) => (
                      <SegmentedControl.Button key={name} id={name} label={name}>
                        {name} · {SIZES[name]}px
                      </SegmentedControl.Button>
                    ))}
                  </SegmentedControl>
                </Box>

                <Box display="flex" flexDirection="column" gap="2">
                  <Caption>Ring stroke</Caption>
                  <SegmentedControl
                    selectedSegments={[thickness]}
                    onSegmentsSelect={(ids: string[]) =>
                      setThickness(ids[0] as CircularProgressThickness)
                    }
                  >
                    {THICKNESS_NAMES.map((name) => (
                      <SegmentedControl.Button key={name} id={name} label={name}>
                        {name}
                      </SegmentedControl.Button>
                    ))}
                  </SegmentedControl>
                </Box>

                <Box display="flex" flexDirection="column" gap="2">
                  <Caption>Label</Caption>
                  <SegmentedControl
                    selectedSegments={[placement]}
                    onSegmentsSelect={(ids: string[]) =>
                      setPlacement(ids[0] as CircularProgressLabelPlacement)
                    }
                  >
                    {(
                      ["inside", "outside", "none"] as const
                    ).map((name) => (
                      <SegmentedControl.Button key={name} id={name} label={name}>
                        {name}
                      </SegmentedControl.Button>
                    ))}
                  </SegmentedControl>
                </Box>

                <Box display="flex" flexDirection="column" gap="2">
                  <Caption>Appearance</Caption>
                  <SegmentedControl
                    selectedSegments={[appearance]}
                    onSegmentsSelect={(ids: string[]) =>
                      setAppearance(ids[0] as CircularProgressAppearance)
                    }
                  >
                    {APPEARANCES.map((name) => (
                      <SegmentedControl.Button key={name} id={name} label={name}>
                        {name}
                      </SegmentedControl.Button>
                    ))}
                  </SegmentedControl>
                </Box>
              </Box>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <Box display="flex" flexDirection="column" gap="3">
                <Text fontWeight="medium">Small diameters</Text>
                <Caption>
                  Same value, shrinking. The centre label is never scaled below
                  `caption`, so it disappears rather than turning into
                  something unreadable.
                </Caption>
                <Box display="flex" alignItems="flex-end" gap="5">
                  {SMALL_DIAMETERS.map((small) => (
                    <Box
                      key={small}
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      gap="1"
                    >
                      <CircularProgress
                        value={value}
                        appearance={appearance}
                        size={small}
                        thickness={thickness}
                        label={`Progress at ${small} pixels`}
                      />
                      <Caption>{small}px</Caption>
                    </Box>
                  ))}
                </Box>

                <Caption>The same diameters, label moved outside</Caption>
                <Box display="flex" alignItems="center" gap="5">
                  {SMALL_DIAMETERS.map((small) => (
                    <CircularProgress
                      key={small}
                      value={value}
                      appearance={appearance}
                      size={small}
                      thickness={thickness}
                      labelPlacement="outside"
                      label={`Progress at ${small} pixels`}
                    />
                  ))}
                </Box>
              </Box>
            </Card.Body>
          </Card>
        </Box>
      </Box>
    );
  },
};
