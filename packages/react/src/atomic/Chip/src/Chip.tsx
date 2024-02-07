import React from "react";
import { CloseIcon } from "@nimbus-ds/icons";
import { chip } from "@nimbus-ds/styles";
import { Text } from "@nimbus-ds/text";
import { Icon } from "@nimbus-ds/icon";

import { ChipProps, ChipComponents } from "./chip.types";
import { ChipSkeleton } from "./components";

const Chip: React.FC<ChipProps> & ChipComponents = ({
  className: _className,
  style: _style,
  text,
  icon,
  removable,
  ...rest
}: ChipProps) => (
  <button type="button" {...rest} className={chip.classnames.base}>
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
      <Icon
        data-testid="close-chip"
        source={<CloseIcon size={12} />}
        color="neutral-textHigh"
      />
    )}
  </button>
);

Chip.Skeleton = ChipSkeleton;
Chip.displayName = "Chip";
Chip.Skeleton.displayName = "Chip.Skeleton";

export { Chip };
