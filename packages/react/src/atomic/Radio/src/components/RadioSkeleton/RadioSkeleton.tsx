import React, { useMemo } from "react";
import { Skeleton } from "@nimbus-ds/skeleton";
import { radio } from "@nimbus-ds/styles";

import { type RadioSkeletonProps } from "./radioSkeleton.types";

const RadioSkeleton: React.FC<RadioSkeletonProps> = ({
  width,
  as = "radio",
  "data-testid": dataTestId,
}) => {
  const isRadio = useMemo(() => as === "radio", [as]);
  return (
    <div className={radio.classnames.container}>
      {isRadio && (
        <Skeleton
          data-testid="checkmark-element"
          width="1rem"
          height="1rem"
          borderRadius="0.75rem"
        />
      )}
      <Skeleton
        width={width ?? isRadio ? "2rem" : "3.5rem"}
        height={isRadio ? "1rem" : "1.8rem"}
        borderRadius="0.25rem"
        data-testid={dataTestId}
      />
    </div>
  );
};

export { RadioSkeleton };
