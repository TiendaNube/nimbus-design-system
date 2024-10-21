import React from "react";
import { render, screen } from "@testing-library/react";

import { TimelineItem } from ".";
import { TimelineItemProps } from "./timelineItem.types";

const makeSut = (props: TimelineItemProps) => {
  render(<TimelineItem {...props} data-testid="timeline-item-element" />);
};

describe("GIVEN <Timeline.Item />", () => {
  describe("WHEN rendered", () => {
    it("THEN should render the submitted content", () => {
      makeSut({
        happenedAt: "2024-08-20T19:50:53+00:00",
        type: "order-fulfillment",
        action: "fulfilled",
        userName: "Bárbara de Tiendanube",
      });
      expect(screen.getByText("Por Bárbara de Tiendanube")).toBeDefined();
      expect(screen.getByText("20 ago")).toBeDefined();
      expect(screen.getByText("Enviada")).toBeDefined();
    });
  });
});
