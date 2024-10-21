import { HTMLAttributes } from "react";
import { TimelineItem } from "./components";

export interface TimelineComponents {
  Item: typeof TimelineItem;
}

export interface TimelineItemData {
  /**
   * Date string.
   */
  happenedAt: string;
  /**
   * Order Type.
   */
  type: "order-fulfillment" | "order-payment" | "transaction-event";
  /**
   * Order Action.
   */
  action: "fulfilled" | "unfulfilled" | "paid" | "pending";
  /**
   * Username.
   */
  userName: string | null;
}

export interface TimelineProperties {
  timelineData?: TimelineItemData[];
}

export type TimelineProps = TimelineProperties & HTMLAttributes<HTMLElement>;
