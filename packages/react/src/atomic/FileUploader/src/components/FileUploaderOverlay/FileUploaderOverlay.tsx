import React, { useMemo } from "react";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { fileUploader, fileUploaderVars } from "@nimbus-ds/styles";
import { Text } from "@nimbus-ds/text";

import { type FileUploaderOverlayProps } from "./fileUploaderOverlay.types";

/**
 * Overlay component displayed during drag operations on FileUploader.
 * Renders a customizable visual feedback with optional title, subtitle and image.
 */
const FileUploaderOverlay: React.FC<FileUploaderOverlayProps> = ({
  className,
  title,
  subtitle,
  imageSrc,
  imageAlt = "",
  borderColor = "primary-interactive",
  backgroundColor = "primary-surface",
  borderRadius = "2",
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

  const resolvedBorderRadius = useMemo(
    () => fileUploader.properties.borderRadius[borderRadius] ?? borderRadius,
    [borderRadius]
  );

  return (
    <div
      data-testid="file-uploader-overlay"
      className={[className, fileUploader.classnames.overlay].join(" ")}
      style={assignInlineVars({
        [fileUploaderVars.overlayBorderRadius]: resolvedBorderRadius,
      })}
      {...rest}
    >
      <div
        className={fileUploader.classnames.overlay__content}
        style={assignInlineVars({
          [fileUploaderVars.borderColor]: resolvedBorderColor,
          [fileUploaderVars.backgroundColor]: resolvedBackgroundColor,
        })}
      >
        {imageSrc && (
          <img
            src={imageSrc}
            alt={imageAlt}
            className={fileUploader.classnames.overlay__image}
          />
        )}
        <div className={fileUploader.classnames.overlay__content__text}>
          {title && (
            <Text
              color="neutral-textHigh"
              fontSize="highlight"
              fontWeight="bold"
            >
              {title}
            </Text>
          )}
          {subtitle && (
            <Text color="neutral-textLow" fontSize="caption" textAlign="center">
              {subtitle}
            </Text>
          )}
        </div>
        {children}
      </div>
    </div>
  );
};

FileUploaderOverlay.displayName = "FileUploader.Overlay";

export { FileUploaderOverlay };
