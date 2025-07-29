import React, { useMemo } from "react";
import { icon } from "@nimbus-ds/styles";

import { IconProps, IconComponents } from "./icon.types";
import { IconSkeleton } from "./components";
import { applyGradientToSvg } from "./utils/gradientUtils";

const Icon: React.FC<IconProps> & IconComponents = ({
  className: _className,
  style: _style,
  color = "neutral-textLow",
  cursor = "inherit",
  source,
  ...rest
}: IconProps) => {
  const isGradient = useMemo(() => color === "ai-interactive", [color]);
  const processedSource = useMemo(
    () => (isGradient ? applyGradientToSvg(source, "linear") : source),
    [isGradient, source]
  );

  return (
    <div
      {...rest}
      className={[
        icon.sprinkle({
          ...(!isGradient && { color }),
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
