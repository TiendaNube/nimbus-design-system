import { HTMLAttributes } from "react";

export interface TimelineItemProperties {
  /**
   * Date string.
   */
  happenedAt: string;
  /**
   * Type of order.
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

export type TimelineItemProps = TimelineItemProperties &
  HTMLAttributes<HTMLElement>;
