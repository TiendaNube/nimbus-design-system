import React, { useMemo, useState, useCallback } from "react";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { fileUploader, vars } from "@nimbus-ds/styles";
import { PlusCircleIcon } from "@nimbus-ds/icons";
import { Icon } from "@nimbus-ds/icon";
import { Text } from "@nimbus-ds/text";

import {
  FileUploaderProps,
  FileUploaderComponents,
} from "./fileUploader.types";
import { FileUploaderSkeleton } from "./components";
import {
  isFileAccepted,
  createFileListFromFiles,
} from "./FileUploader.definitions";

const FileUploader: React.FC<FileUploaderProps> & FileUploaderComponents = ({
  className: _className,
  style: _style,
  aspectRatio = "1/1",
  width = "100%",
  height = "",
  accept = "image/jpeg,image/gif,image/png",
  flexDirection = "column",
  placeholder,
  disabled,
  onDrop,
  onDropReject,
  onDropSuccess,
  ...rest
}: FileUploaderProps) => {
  const color = useMemo(() => (disabled ? "neutral" : "primary"), [disabled]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLLabelElement>) => {
      event.preventDefault();
      event.stopPropagation();
      if (!disabled) {
        setIsDragging(true);
      }
    },
    [disabled]
  );

  const handleDragLeave = useCallback(
    (event: React.DragEvent<HTMLLabelElement>) => {
      event.preventDefault();
      event.stopPropagation();
      setIsDragging(false);
    },
    []
  );

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLLabelElement>) => {
      event.preventDefault();
      event.stopPropagation();
      setIsDragging(false);

      onDrop?.(event);

      if (disabled || !rest.onChange) return;

      const droppedFiles = event.dataTransfer.files;
      if (droppedFiles && droppedFiles.length > 0) {
        const acceptedFiles = Array.from(droppedFiles).filter((file) =>
          isFileAccepted(file, accept)
        );

        if (acceptedFiles.length === 0) {
          onDropReject?.(event);
          return;
        }

        const inputElement = document.getElementById(
          rest.id || "input-file"
        ) as HTMLInputElement;

        if (inputElement) {
          try {
            createFileListFromFiles(acceptedFiles, inputElement);

            const changeEvent = new Event("change", { bubbles: true });
            Object.defineProperty(changeEvent, "target", {
              writable: false,
              value: inputElement,
            });

            rest.onChange(
              changeEvent as unknown as React.ChangeEvent<HTMLInputElement>
            );
            onDropSuccess?.(event);
          } catch (error) {
            console.error("Error handling file drop:", error);
          }
        }
      }
    },
    [disabled, rest, accept, onDrop, onDropReject, onDropSuccess]
  );

  return (
    <label
      data-testid="file-uploader-container"
      htmlFor={!disabled ? rest.id || "input-file" : "disabled"}
      className={[
        fileUploader.classnames.container,
        fileUploader.sprinkle({
          aspectRatio,
          flexDirection,
          cursor: disabled ? "auto" : "pointer",
        }),
        disabled && fileUploader.classnames.disabled,
        isDragging && !disabled && fileUploader.classnames.dragging,
      ].join(" ")}
      style={assignInlineVars({
        [vars.width]: width,
        [vars.height]: height,
      })}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Icon
        color={`${color}-interactive`}
        source={<PlusCircleIcon size={20} />}
      />
      {placeholder && (
        <Text
          color={`${color}-interactive`}
          fontWeight="bold"
          fontSize="caption"
        >
          {placeholder}
        </Text>
      )}
      <input
        className={fileUploader.classnames.container__input}
        type="file"
        accept={accept}
        disabled={disabled}
        id={rest.id || "input-file"}
        {...rest}
      />
    </label>
  );
};

FileUploader.Skeleton = FileUploaderSkeleton;
FileUploader.displayName = "FileUploader";
FileUploader.Skeleton.displayName = "FileUploader.Skeleton";

export { FileUploader };
