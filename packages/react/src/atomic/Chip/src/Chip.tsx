import React from "react";
import { CloseIcon } from "@nimbus-ds/icons";
import { chip } from "@nimbus-ds/styles";
import { Text } from "@nimbus-ds/text";
import { Icon } from "@nimbus-ds/icon";
import type { ChipProps, ChipComponents } from "./chip.types";
import { ChipSkeleton } from "./components";

const Chip: React.FC<ChipProps> & ChipComponents = ({
  className: _className,
  style: _style,
  text,
  icon,
  removable,
  aiGenerated,
  onClick,
  ...rest
}: ChipProps) => (
  <div
    {...rest}
    className={[
      chip.classnames.base,
      aiGenerated && chip.classnames.aiGenerated,
    ]
      .filter(Boolean)
      .join(" ")}
  >
    {icon && <Icon source={icon} color="neutral-textHigh" />}
    <Text
      color="neutral-textHigh"
      fontSize="caption"
      lineHeight="caption"
      lineClamp={1}
      wordBreak="break-all"
    >
      {text}
    </Text>
    {removable && (
      <button
        aria-label="Dismiss chip"
        data-testid="dismiss-chip-button"
        type="button"
        onClick={onClick}
        className={chip.classnames.chip_close_icon_container}
      >
        <Icon
          data-testid="close-chip"
          source={<CloseIcon size={12} />}
          color="neutral-textHigh"
        />
      </button>
    )}
  </div>
);

Chip.Skeleton = ChipSkeleton;
Chip.displayName = "Chip";
Chip.Skeleton.displayName = "Chip.Skeleton";

export { Chip };
