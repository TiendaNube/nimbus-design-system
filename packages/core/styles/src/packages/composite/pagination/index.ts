import * as styles from "./nimbus-pagination.css";

// `goToPageCharsVar` is a CSS variable, not a class: it is exposed in `vars`.
const { goToPageCharsVar, ...classnames } = styles;

export const pagination = {
  classnames,
  vars: {
    goToPageChars: goToPageCharsVar,
  },
};
