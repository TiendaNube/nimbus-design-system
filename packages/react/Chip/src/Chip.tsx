import React from "react";
import { CloseIcon } from "@tiendanube/icons";
import { chip } from "@nimbus-ds/styles";
import { Text } from "@nimbus-ds/text";
import { Icon } from "@nimbus-ds/icon";

import { ChipProps, ChipComponents } from "./chip.types";
import { Skeleton } from "./components";

const Chip: React.FC<ChipProps> & ChipComponents = ({
  className: _className,
  style: _style,
  text,
  icon,
  removable,
  ...rest
}: ChipProps) => (
  <button type="button" {...rest} className={chip.style}>
    {icon && <Icon source={icon} color="neutral.textLow" />}
    <Text color="neutral.textLow" fontSize="caption">
      {text}
    </Text>
    {removable && (
      <Icon
        data-testid="close-chip"
        source={<CloseIcon size={12} />}
        color="neutral.textLow"
      />
    )}
  </button>
);

Chip.Skeleton = Skeleton;

export { Chip };
