import {
  styles,
  cardSprinkle,
  cardHeaderSprinkle,
  cardBodySprinkle,
  cardFooterSprinkle,
} from "./nimbus-card.css";

export const card = {
  ...cardSprinkle,
  classnames: { ...styles },
  subComponents: {
    header: cardHeaderSprinkle,
    body: cardBodySprinkle,
    footer: cardFooterSprinkle,
  },
};
