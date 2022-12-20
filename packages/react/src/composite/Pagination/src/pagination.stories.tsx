import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";
// eslint-disable-next-line
import { useArgs } from "@storybook/client-api";
import { Pagination } from "./Pagination";

export default {
  title: "Composite/Pagination",
  component: Pagination,
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination> = (args) => {
  const [{ activePage }, updateArgs] = useArgs();
  const onPageChange = (page: number) => updateArgs({ activePage: page });
  return (
    <Pagination {...args} onPageChange={onPageChange} activePage={activePage} />
  );
};

export const base = Template.bind({});
base.args = {
  pageCount: 20,
  activePage: 2,
};

export const noNumbers = Template.bind({});
noNumbers.args = {
  pageCount: 20,
  activePage: 1,
  showNumbers: false,
};

export const stressed = Template.bind({});
stressed.args = {
  pageCount: 3422,
  activePage: 2033,
};

export const dotsLeft = Template.bind({});
dotsLeft.args = {
  pageCount: 50,
  activePage: 48,
};

export const dotsRight = Template.bind({});
dotsRight.args = {
  pageCount: 48,
  activePage: 2,
};
