import React, { useMemo } from "react";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { fileUploader, utils } from "@nimbus-ds/styles";
import { PlusCircleIcon } from "@tiendanube/icons";
import { Icon } from "@nimbus-ds/icon";
import { Text } from "@nimbus-ds/text";

import {
  FileUploaderProps,
  FileUploaderComponents,
} from "./fileUploader.types";
import { FileUploaderSkeleton } from "./components";

const FileUploader: React.FC<FileUploaderProps> & FileUploaderComponents = ({
  className: _className,
  style: _style,
  aspectRatio = "1-1",
  width = "100%",
  height = "",
  accept = "image/jpeg,image/gif,image/png",
  flexDirection = "column",
  placeholder,
  disabled,
  ...rest
}: FileUploaderProps) => {
  const color = useMemo(() => (disabled ? "neutral" : "primary"), [disabled]);
  return (
    <label
      data-testid="file-uploader-container"
      htmlFor={!disabled ? rest.id || "input-file" : "disabled"}
      className={[
        fileUploader.style.container,
        fileUploader.sprinkle({
          aspectRatio,
          flexDirection,
          cursor: disabled ? "auto" : "pointer",
        }),
        disabled && fileUploader.style.disabled,
      ].join(" ")}
      style={assignInlineVars({
        [utils.vars.width]: width,
        [utils.vars.height]: height,
      })}
    >
      <Icon
        color={`${color}.interactive`}
        source={<PlusCircleIcon size={20} />}
      />
      {placeholder && (
        <Text color={`${color}.interactive`} fontWeight="bold">
          {placeholder}
        </Text>
      )}
      <input
        className={fileUploader.style.input}
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
