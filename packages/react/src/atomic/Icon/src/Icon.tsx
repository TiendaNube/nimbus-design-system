import React, { useMemo } from "react";
import { icon } from "@nimbus-ds/styles";

import { IconProps, IconComponents } from "./icon.types";
import { IconSkeleton } from "./components";
import { applyGradientToSvg, isGradient } from "./utils/gradient";

const Icon: React.FC<IconProps> & IconComponents = ({
  className: _className,
  style: _style,
  color = "neutral-textLow",
  cursor = "inherit",
  source,
  ...rest
}: IconProps) => {
  const renderGradient = useMemo(() => isGradient(color), [color]);
  const processedSource = useMemo(
    () => (renderGradient ? applyGradientToSvg(source) : source),
    [renderGradient, source]
  );

  return (
    <div
      {...rest}
      className={[
        icon.sprinkle({
          ...(!renderGradient && {
            color,
          }),
          cursor,
        }),
        icon.classnames.base,
      ].join(" ")}
    >
      {processedSource}
    </div>
  );
};

Icon.Skeleton = IconSkeleton;
Icon.displayName = "Icon";
Icon.Skeleton.displayName = "Icon.Skeleton";

export { Icon };
