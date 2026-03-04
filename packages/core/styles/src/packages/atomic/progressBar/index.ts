import * as styles from "./nimbus-progressBar.css";

export const progressBar = {
  classnames: { ...styles },
  vars: {
    fillColor: styles.fillColorVar,
  },
  shadowMap: {
    1: `0px 0px 4px ${styles.fillColorVar}`,
    2: `0px 0px 8px ${styles.fillColorVar}`,
  } as Record<1 | 2, string>,
};
