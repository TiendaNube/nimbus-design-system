import React, { useMemo } from "react";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { fileUploader, fileUploaderVars } from "@nimbus-ds/styles";
import { Text } from "@nimbus-ds/text";

import { FileUploaderOverlayProps } from "./fileUploaderOverlay.types";

/**
 * Overlay component displayed during drag operations on FileUploader.
 * Renders a customizable visual feedback with optional title, subtitle and image.
 */
const FileUploaderOverlay: React.FC<FileUploaderOverlayProps> = ({
  title,
  subtitle,
  imageSrc,
  imageAlt = "",
  borderColor = "primary-interactive",
  backgroundColor = "primary-surface",
  children,
  ...rest
}) => {
  const resolvedBorderColor = useMemo(
    () => fileUploader.properties.borderColor[borderColor] ?? borderColor,
    [borderColor]
  );

  const resolvedBackgroundColor = useMemo(
    () =>
      fileUploader.properties.backgroundColor[backgroundColor] ??
      backgroundColor,
    [backgroundColor]
  );

  return (
    <div
      data-testid="file-uploader-overlay"
      className={fileUploader.classnames.overlay}
      style={assignInlineVars({
        [fileUploaderVars.borderColor]: resolvedBorderColor,
        [fileUploaderVars.backgroundColor]: resolvedBackgroundColor,
      })}
      {...rest}
    >
      {imageSrc && (
        <img
          src={imageSrc}
          alt={imageAlt}
          className={fileUploader.classnames.overlay__image}
        />
      )}
      {title && (
        <Text color="primary-interactive" fontWeight="bold" fontSize="caption">
          {title}
        </Text>
      )}
      {subtitle && (
        <Text color="primary-textLow" fontSize="caption">
          {subtitle}
        </Text>
      )}
      {children}
    </div>
  );
};

FileUploaderOverlay.displayName = "FileUploader.Overlay";

export { FileUploaderOverlay };
