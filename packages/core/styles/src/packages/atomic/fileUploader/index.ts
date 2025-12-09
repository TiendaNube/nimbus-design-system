import {
  styles,
  fileUploaderSprinkle,
  backgroundColor,
  borderColor,
} from "./nimbus-fileUploader.css";

export const fileUploaderVars = {
  backgroundColor,
  borderColor,
};

export const fileUploader = {
  classnames: { ...styles },
  ...fileUploaderSprinkle,
};
