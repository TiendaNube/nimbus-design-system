import React from "react";
import { timeline } from "@nimbus-ds/styles";

import { Text } from "@nimbus-ds/text";
import { TimelineProps, TimelineComponents } from "./timeline.types";
import TimelineItem from "./components/TimelineItem";

const Timeline: React.FC<TimelineProps> & TimelineComponents = ({
  className: _className,
  style: _style,
  timelineData = [],
  ...rest
}: TimelineProps) => {
  const sortedData = timelineData.sort((a, b) => {
    if (a.happenedAt > b.happenedAt) {
      return 1;
    }
    if (a.happenedAt < b.happenedAt) {
      return -1;
    }
    return 0;
  });

  return (
    <div className={[timeline.classnames.container].join(" ")} {...rest}>
      {sortedData.map((item) => (
        <TimelineItem key={item.happenedAt + item.happenedAt} {...item} />
      ))}
      {timelineData.length === 0 ? (
        <Text>No hay información que mostrar.</Text>
      ) : null}
    </div>
  );
};

Timeline.Item = TimelineItem;
Timeline.displayName = "Timeline";
Timeline.Item.displayName = "Timeline.Item";

export { Timeline };
