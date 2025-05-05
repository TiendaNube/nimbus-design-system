import { containerSprinkle, buttonStyles, styles } from "./nimbus-segmented-control.css";

export const segmentedControl = {
  ...containerSprinkle,
  classnames: { ...styles },
  subcomponents: {
    button: {
      classnames: { ...buttonStyles },
    },
  },
};
