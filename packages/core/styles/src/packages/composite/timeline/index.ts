import {
  styles,
  timelineItemStyles,
  iconContainerSprinkle,
} from "./nimbus-timeline.css";

export const timeline = {
  classnames: { ...styles },
  subComponents: {
    timelineItem: {
      ...timelineItemStyles,
    },
    icon: iconContainerSprinkle,
  },
};
