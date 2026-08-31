import type { Meta, StoryObj } from "@storybook/react";
import {
  AvatarIdentityColors,
  AvatarIdentityRoster,
  ROSTER,
} from "./AvatarIdentityColors";

// Disposable Playground prototype — see
// packages/react/src/prototypes/README.md for the mechanics this file
// follows, and the pull request description for intention, mocks, and
// limitations.

const meta: Meta<typeof AvatarIdentityColors> = {
  title: "Prototypes/AvatarIdentityColors",
  component: AvatarIdentityColors,
};

export default meta;

type Story = StoryObj<typeof AvatarIdentityColors>;

/**
 * Internal working view: pick any roster member and flip the photo/initials
 * toggle to see one avatar's two states plus the deterministic color and its
 * measured contrast ratio.
 */
export const Playground: Story = {
  args: {
    personId: ROSTER[0].id,
    hasPhoto: false,
    size: "lg",
  },
  argTypes: {
    personId: {
      control: "select",
      options: ROSTER.map((person) => person.id),
      description: "Roster member to render",
    },
    hasPhoto: {
      control: "boolean",
      name: "Starts with photo",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
    },
  },
};

/**
 * The shareable experience: the full roster, each avatar independently
 * toggleable, to test whether photo vs. initials states read clearly and
 * whether the color-consistency behavior holds across the set.
 */
export const FullScreen: StoryObj<typeof AvatarIdentityRoster> = {
  name: "Full screen",
  render: () => <AvatarIdentityRoster size="lg" />,
  parameters: {
    layout: "fullscreen",
  },
};
