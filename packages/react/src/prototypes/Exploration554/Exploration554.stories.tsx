import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@nimbus-ds/box";
import { Button } from "@nimbus-ds/button";
import { Text } from "@nimbus-ds/text";

import { DatePicker, DateRangePicker, DEFAULT_PRESETS } from "./Exploration554";
import type { PresetsLayout } from "./Exploration554";

const meta: Meta = {
  title: "Prototypes/Exploration554",
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj;

function Demo({ initialLayout }: { initialLayout: PresetsLayout }) {
  const [singleDate, setSingleDate] = useState<Date | null>(null);
  const [range, setRange] = useState<[Date | null, Date | null]>([null, null]);
  const [layout, setLayout] = useState<PresetsLayout>(initialLayout);

  return (
    <Box display="flex" flexDirection="column" gap="6" padding="6">
      <Box display="flex" flexDirection="column" gap="2">
        <Text fontWeight="bold">DatePicker</Text>
        <DatePicker value={singleDate} onChange={setSingleDate} />
        <Text fontSize="caption" color="neutral-textLow">
          Selected: {singleDate ? singleDate.toDateString() : "none"}
        </Text>
      </Box>

      <Box display="flex" flexDirection="column" gap="2">
        <Box display="flex" alignItems="center" gap="2">
          <Text fontWeight="bold">DateRangePicker</Text>
          <Button
            size="small"
            appearance={layout === "sidebar" ? "primary" : "neutral"}
            onClick={() => setLayout("sidebar")}
          >
            Sidebar presets
          </Button>
          <Button
            size="small"
            appearance={layout === "row" ? "primary" : "neutral"}
            onClick={() => setLayout("row")}
          >
            Row presets
          </Button>
        </Box>
        <DateRangePicker value={range} onChange={setRange} presets={DEFAULT_PRESETS} presetsLayout={layout} />
        <Text fontSize="caption" color="neutral-textLow">
          Selected: {range[0] ? range[0].toDateString() : "none"} — {range[1] ? range[1].toDateString() : "none"}
        </Text>
      </Box>
    </Box>
  );
}

export const Playground: Story = {
  render: () => <Demo initialLayout="sidebar" />,
};

export const FullScreen: Story = {
  name: "Full screen",
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
  },
  render: () => <Demo initialLayout="sidebar" />,
};
