import React from "react";
import { timeline } from "@nimbus-ds/styles";
import { Box } from "@nimbus-ds/box";
import { Text } from "@nimbus-ds/text";
import { CreditCardIcon, BoxPackedIcon, TruckIcon } from "@nimbus-ds/icons";
import { TimelineItemProps } from "./timelineItem.types";

const spanishMonths: string[] = [
  "ene",
  "feb",
  "mar",
  "abr",
  "may",
  "jun",
  "jul",
  "ago",
  "sep",
  "oct",
  "nov",
  "dic",
];

const formatDate = (date: Date): string => {
  const day: string = date.getDate().toString().padStart(2, "0");
  const month: string = spanishMonths[date.getMonth()];
  return `${day} ${month}`;
};

const formatTime = (fecha: Date): string => {
  const hours: string = fecha.getHours().toString().padStart(2, "0");
  const minutes: string = fecha.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

const STATUS = {
  pending: "Está siendo revisado",
  paid: "Pago recibido",
  unfulfilled: "Empaquetada",
  fulfilled: "Enviada",
};

const STATUS_ICON = {
  pending: null,
  paid: <CreditCardIcon />,
  unfulfilled: <BoxPackedIcon />,
  fulfilled: <TruckIcon />,
};

/*
 * In the readme there was a type related to the message but I only used action based on the example
 */
const getMessage = (
  _type: TimelineItemProps["type"],
  action: TimelineItemProps["action"]
) => STATUS[action];

const getIcon = (
  _type: TimelineItemProps["type"],
  action: TimelineItemProps["action"]
) => STATUS_ICON[action];

const TimelineItem: React.FC<TimelineItemProps> = ({
  className: _className,
  style: _style,
  userName = "",
  happenedAt,
  type,
  action,
  ...rest
}) => {
  const date = new Date(happenedAt);
  const userNameText = `Por ${userName}`;

  return (
    <div
      className={timeline.subComponents.timelineItem.itemContainer}
      {...rest}
    >
      <div className={timeline.subComponents.timelineItem.leftContent}>
        <div
          className={[
            timeline.subComponents.timelineItem.iconContainer,
            timeline.subComponents.icon.sprinkle({ type: action }),
          ].join(" ")}
        >
          {getIcon(type, action)}
        </div>
        <Box>
          <Text color="neutral-textHigh">{getMessage(type, action)}</Text>
          {userName && <Text>{userNameText}</Text>}
        </Box>
      </div>
      <div className={timeline.subComponents.timelineItem.timelineItemDate}>
        <Text color="neutral-textHigh">{formatDate(date)}</Text>
        <Text>{formatTime(date)}</Text>
      </div>
    </div>
  );
};

export default TimelineItem;

export { TimelineItem };
