import {
  styles,
  fileUploaderSprinkle,
  backgroundColor,
  borderColor,
  overlayBorderRadius,
} from "./nimbus-fileUploader.css";

export const fileUploaderVars = {
  backgroundColor,
  borderColor,
  overlayBorderRadius,
};

export const fileUploader = {
  classnames: { ...styles },
  ...fileUploaderSprinkle,
};
