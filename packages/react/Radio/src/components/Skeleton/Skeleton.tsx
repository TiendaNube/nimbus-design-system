import React, { useMemo } from "react";
import { Skeleton as SkeletonBase } from "@nimbus-ds/skeleton";
import { checkbox } from "@nimbus-ds/styles";

import { SkeletonProps } from "./skeleton.types";

const Skeleton: React.FC<SkeletonProps> = ({
  width,
  as = "radio",
  "data-testid": dataTestId,
}) => {
  const isRadio = useMemo(() => as === "radio", [as]);
  return (
    <div className={checkbox.style.container}>
      {isRadio && (
        <SkeletonBase
          data-testid="checkmark-element"
          width="1rem"
          height="1rem"
          borderRadius="0.75rem"
        />
      )}
      <SkeletonBase
        width={width ?? isRadio ? "2rem" : "3.5rem"}
        height={isRadio ? "1rem" : "1.8rem"}
        borderRadius="0.25rem"
        data-testid={dataTestId}
      />
    </div>
  );
};

Skeleton.displayName = "Radio.Skeleton";
export { Skeleton };
