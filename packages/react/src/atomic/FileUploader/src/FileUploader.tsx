import React, { useMemo, useState, useCallback, useRef } from "react";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { fileUploader, vars } from "@nimbus-ds/styles";
import { PlusCircleIcon } from "@nimbus-ds/icons";
import { Icon } from "@nimbus-ds/icon";
import { Text } from "@nimbus-ds/text";

import {
  type FileUploaderProps,
  type FileUploaderComponents,
} from "./fileUploader.types";
import { FileUploaderSkeleton, FileUploaderOverlay } from "./components";
import {
  isFileAccepted,
  createFileListFromFiles,
} from "./FileUploader.definitions";

const DEFAULT_INPUT_ID = "input-file";

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
  onError,
  children,
  disableClickUpload = false,
  id,
  onChange,
  dragOverlay,
  asOverlay = false,
  ...rest
}: FileUploaderProps) => {
  const color = useMemo(() => (disabled ? "neutral" : "primary"), [disabled]);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dragCounterRef = useRef(0);

  const handleDragEnter = useCallback(
    (event: React.DragEvent<HTMLLabelElement | HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      if (!disabled) {
        dragCounterRef.current += 1;
        if (dragCounterRef.current === 1) {
          setIsDragging(true);
        }
      }
    },
    [disabled]
  );

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLLabelElement | HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
    },
    []
  );

  const handleDragLeave = useCallback(
    (event: React.DragEvent<HTMLLabelElement | HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      dragCounterRef.current -= 1;
      if (dragCounterRef.current === 0) {
        setIsDragging(false);
      }
    },
    []
  );

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLLabelElement | HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      dragCounterRef.current = 0;
      setIsDragging(false);

      if (disabled || !onChange) return;

      onDrop?.(event);

      const droppedFiles = event.dataTransfer.files;
      if (droppedFiles && droppedFiles.length > 0) {
        const acceptedFiles = Array.from(droppedFiles).filter((file) =>
          isFileAccepted(file, accept)
        );

        if (acceptedFiles.length === 0) {
          onDropReject?.(event);
          return;
        }

        const inputElement = inputRef.current;

        if (inputElement) {
          try {
            createFileListFromFiles(acceptedFiles, inputElement);

            const changeEvent = new Event("change", { bubbles: true });
            Object.defineProperty(changeEvent, "target", {
              writable: false,
              value: inputElement,
            });

            onChange(
              changeEvent as unknown as React.ChangeEvent<HTMLInputElement>
            );
            onDropSuccess?.(event);
          } catch (error) {
            const errorInstance =
              error instanceof Error ? error : new Error(String(error));
            onError?.(errorInstance);
            console.error("Error handling file drop:", error);
          }
        }
      }
    },
    [disabled, onChange, accept, onDrop, onDropReject, onDropSuccess, onError]
  );

  if (asOverlay) {
    return (
      <div
        className={fileUploader.classnames.asOverlay}
        style={assignInlineVars({
          [vars.width]: width,
          [vars.height]: height,
        })}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        role="region"
        aria-label="File drop zone"
      >
        <input
          ref={inputRef}
          className={fileUploader.classnames.container__input}
          type="file"
          accept={accept}
          disabled={disabled || disableClickUpload}
          id={id || DEFAULT_INPUT_ID}
          onChange={onChange}
          {...rest}
        />
        {children}
        {isDragging && !disabled && dragOverlay}
      </div>
    );
  }

  return (
    <label
      data-testid="file-uploader-container"
      htmlFor={!disabled ? id || DEFAULT_INPUT_ID : "disabled"}
      className={[
        fileUploader.classnames.container,
        fileUploader.sprinkle({
          aspectRatio,
          flexDirection,
          cursor: disabled || disableClickUpload ? "auto" : "pointer",
        }),
        disabled && fileUploader.classnames.disabled,
        isDragging && !disabled && fileUploader.classnames.dragging,
      ].join(" ")}
      style={assignInlineVars({
        [vars.width]: width,
        [vars.height]: height,
      })}
      onDragEnter={handleDragEnter}
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
      {children}
      <input
        ref={inputRef}
        className={fileUploader.classnames.container__input}
        type="file"
        accept={accept}
        disabled={disabled || disableClickUpload}
        id={id || DEFAULT_INPUT_ID}
        onChange={onChange}
        {...rest}
      />
    </label>
  );
};

FileUploader.Skeleton = FileUploaderSkeleton;
FileUploader.Overlay = FileUploaderOverlay;
FileUploader.displayName = "FileUploader";
FileUploader.Skeleton.displayName = "FileUploader.Skeleton";
FileUploader.Overlay.displayName = "FileUploader.Overlay";

export { FileUploader };
