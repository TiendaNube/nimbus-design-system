import React, { forwardRef } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { mapBoxProps } from ".storybook/utils";
import { SampleBox } from "@common/storybook";
import type { BoxProps } from "./Box";
import { Box as BoxComponent } from "./Box";

export const Basic: React.FC<BoxProps> = forwardRef((props: BoxProps) => (
  <BoxComponent {...props} />
)) as React.FC<BoxProps>;
Basic.displayName = "Box";

const meta: Meta<typeof Basic> = {
  title: "Atomic/Box",
  component: Basic,
  argTypes: {
    as: {
      description:
        "The underlying element to render — an HTML element name of type a or button or a React component of type HTMLAnchorElement or HTMLButtonElement.",
    },
    ref: {
      description:
        "A ref to the element rendered by this component. Because this component is polymorphic, the type will vary based on the value of the as prop.",
    },
    children: { control: { type: "text" } },
    ...mapBoxProps(),
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Basic>;

export const basic = {
  args: {
    height: "5rem",
    width: "12rem",
    borderColor: "neutral-interactive",
    borderWidth: "2",
    borderStyle: "dashed",
    borderRadius: "2",
  },
};

export const responsive: Story = {
  args: {
    height: {
      xxl: "8rem",
      xl: "6rem",
      lg: "4rem",
      md: "3rem",
      xs: "2rem",
    },
    width: {
      xxl: "16rem",
      xl: "12rem",
      lg: "10rem",
      md: "8rem",
      xs: "2rem",
    },
    backgroundColor: {
      xxl: "neutral-interactive",
      xl: "warning-interactive",
      lg: "success-interactive",
      md: "danger-interactive",
      xs: "primary-interactive",
    },
    paddingX: {
      xxl: "10",
      xl: "8",
      lg: "6",
      md: "4",
      xs: "none",
    },
    borderRadius: {
      xxl: "1",
      xl: "0-5",
      lg: "2",
      md: "4",
      xs: "full",
    },
  },
};

export const aiGenerated: Story = {
  render: (args) => (
    <BoxComponent
      {...args}
      borderColor="transparent"
      background="ai-generative-interactive-border"
      borderWidth="1"
      borderStyle="solid"
      borderRadius="2"
      boxShadow="aiFocus"
      height="5rem"
      width="12rem"
    />
  ),
};

export const asButton: Story = {
  render: () => (
    <BoxComponent
      as="button"
      type="button"
      padding="2"
      color="neutral-textHigh"
      cursor="pointer"
      borderWidth="1"
      borderStyle="solid"
      onClick={action("clicked")}
      borderRadius="2"
      borderColor="neutral-interactive"
      backgroundColor={{
        xs: "transparent",
        hover: "neutral-surface",
        active: "neutral-interactive",
      }}
    >
      Box as Button
    </BoxComponent>
  ),
};

export const breakpointDemo: Story = {
  render: () => (
    <SampleBox
      width={{
        xs: "8rem",
        md: "12rem",
        lg: "16rem",
        xl: "20rem",
        xxl: "24rem",
      }}
      height={{
        xs: "4rem",
        md: "6rem",
        lg: "8rem",
        xl: "10rem",
        xxl: "12rem",
      }}
      backgroundColor={{
        xs: "primary-interactive",
        md: "success-interactive",
        lg: "warning-interactive",
        xl: "danger-interactive",
        xxl: "neutral-interactive",
      }}
      padding={{
        xs: "1",
        md: "2",
        lg: "3",
        xl: "4",
        xxl: "5",
      }}
      borderRadius={{
        xs: "1",
        md: "2",
        lg: "3",
        xl: "4",
        xxl: "6",
      }}
      display="flex"
      alignItems="center"
      justifyContent="center"
      color="neutral-textHigh"
      fontSize={{
        xs: "3",
        md: "4",
        lg: "5",
        xl: "h6",
        xxl: "h5",
      }}
      fontWeight="medium"
    >
      Resize to see breakpoints
    </SampleBox>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "This story demonstrates how the Box component responds to different screen sizes. Resize your browser window to see the box change size, color, padding, border radius, and font size at different breakpoints: xs (0px), md (672px), lg (1024px), xl (1200px), and xxl (1920px).",
      },
    },
  },
};
