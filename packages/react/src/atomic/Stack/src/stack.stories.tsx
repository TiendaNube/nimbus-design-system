import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";
import { stack } from "@nimbus-ds/styles";
import { Box } from "@nimbus-ds/box";

import { Stack } from "./Stack";

export default {
  title: "Atomic/Stack",
  component: Stack,
  argTypes: {
    children: { control: { disable: true } },
    display: { options: stack.properties.display },
    flexDirection: { options: stack.properties.flexDirection },
    flexWrap: { options: stack.properties.flexWrap },
    justifyContent: { options: stack.properties.justifyContent },
    alignItems: { options: stack.properties.alignItems },
    gridGap: { options: Object.keys(stack.properties.gridGap) },
    gap: { options: Object.keys(stack.properties.gap) },
  },
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
} as ComponentMeta<typeof Stack>;

const Template: ComponentStory<typeof Stack> = (args) => <Stack {...args} />;

export const base = Template.bind({});
base.args = {
  display: "flex",
  justifyContent: "center",
  flexDirection: "row",
  gap: "2",
  children: (
    <>
      <Box
        width="3rem"
        height="2rem"
        borderStyle="solid"
        borderRadius="4px"
        borderWidth="1px"
        borderColor="neutral.interactive"
      />
      <Box
        width="3rem"
        height="2rem"
        borderStyle="solid"
        borderRadius="4px"
        borderWidth="1px"
        borderColor="neutral.interactive"
      />
    </>
  ),
};

export const responsive = Template.bind({});
responsive.args = {
  display: "flex",
  gap: "2",
  flexDirection: {
    lg: "row",
    md: "column",
  },
  justifyContent: {
    lg: "center",
    md: "flex-end",
  },
  children: (
    <>
      <Box
        width="3rem"
        height="2rem"
        borderStyle="solid"
        borderRadius="4px"
        borderWidth="1px"
        borderColor="neutral.interactive"
      />
      <Box
        width="3rem"
        height="2rem"
        borderStyle="solid"
        borderRadius="4px"
        borderWidth="1px"
        borderColor="neutral.interactive"
      />
    </>
  ),
};

export const flex = Template.bind({});
flex.args = {
  display: "flex",
  gap: "2",
  flexDirection: "row",
  justifyContent: "center",
  children: (
    <>
      <Box
        width="100%"
        height="2rem"
        borderStyle="solid"
        borderRadius="4px"
        borderWidth="1px"
        borderColor="neutral.interactive"
      />
      <Box
        width="50%"
        height="2rem"
        borderStyle="solid"
        borderRadius="4px"
        borderWidth="1px"
        borderColor="neutral.interactive"
      />
    </>
  ),
};

export const grid = Template.bind({});
grid.args = {
  display: "grid",
  gap: "2",
  gridTemplateColumns: "1fr 1fr 1fr",
  gridTemplateRows: "1fr",
  height: "8rem",
  children: (
    <>
      <Box
        borderStyle="solid"
        borderRadius="4px"
        borderWidth="1px"
        borderColor="neutral.interactive"
      />
      <Box
        borderStyle="solid"
        borderRadius="4px"
        borderWidth="1px"
        borderColor="neutral.interactive"
      />
      <Box
        borderStyle="solid"
        borderRadius="4px"
        borderWidth="1px"
        borderColor="neutral.interactive"
      />
    </>
  ),
};
