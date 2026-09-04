import React, {
  forwardRef,
  type ForwardRefExoticComponent,
  type ComponentPropsWithRef,
} from "react";
import { select } from "@nimbus-ds/styles";
import { Icon } from "@nimbus-ds/icon";
import { ChevronDownIcon } from "@nimbus-ds/icons";

import { type SelectComponents, type SelectBaseProps } from "./select.types";
import { SelectGroup, SelectOption, SelectSkeleton } from "./components";

const Select = forwardRef<HTMLSelectElement, SelectBaseProps>(
  (
    {
      className,
      style: _style,
      name,
      id,
      children,
      appearance = "neutral",
      aiGenerated = false,
      size = "medium",
      ...rest
    },
    ref
  ) => (
    <div className={select.classnames.container}>
      <div className={select.classnames.container__icon}>
        <Icon source={<ChevronDownIcon />} color="primary-textHigh" />
      </div>
      <select
        {...rest}
        size={typeof size === "number" ? size : undefined}
        ref={ref}
        id={id}
        name={name}
        className={[
          className,
          aiGenerated
            ? select.classnames.aiGenerated
            : select.classnames.appearance[appearance],
          select.classnames.size[typeof size === "number" ? "medium" : size],
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {children}
      </select>
    </div>
  )
) as ForwardRefExoticComponent<
  SelectBaseProps &
    Omit<React.InputHTMLAttributes<HTMLSelectElement>, "size"> &
    React.RefAttributes<HTMLSelectElement>
> &
  SelectComponents;

Select.Group = SelectGroup;
Select.Option = SelectOption;
Select.Skeleton = SelectSkeleton;
Select.displayName = "Select";
Select.Group.displayName = "Select.Group";
Select.Option.displayName = "Select.Option";
Select.Skeleton.displayName = "Select.Skeleton";

export type SelectProps = ComponentPropsWithRef<typeof Select>;
export { Select };
