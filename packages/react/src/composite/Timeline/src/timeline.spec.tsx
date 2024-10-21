import React from "react";
import { render, screen } from "@testing-library/react";

import { Timeline } from "./Timeline";
import { TimelineProps, TimelineItemData } from "./timeline.types";

const makeSut = (rest: TimelineProps) => {
  render(<Timeline {...rest} data-testid="timeline-element" />);
};

const data: TimelineItemData[] = [
  {
    happenedAt: "2024-08-20T19:50:53+00:00",
    type: "order-fulfillment",
    action: "fulfilled",
    userName: "Bárbara de Tiendanube",
  },
  {
    happenedAt: "2024-08-20T19:50:47+00:00",
    type: "order-fulfillment",
    action: "unfulfilled",
    userName: "Bárbara de Tiendanube",
  },
  {
    happenedAt: "2024-08-20T19:49:14+00:00",
    type: "order-payment",
    action: "paid",
    userName: "Bárbara de Tiendanube",
  },
  {
    happenedAt: "2024-08-20T19:49:03+00:00",
    type: "transaction-event",
    action: "pending",
    userName: null,
  },
];

const randomSortedData: TimelineItemData[] = [
  {
    happenedAt: "2024-08-20T19:50:53+00:00",
    type: "order-fulfillment",
    action: "unfulfilled",
    userName: "Bárbara de Tiendanube",
  },
  {
    happenedAt: "2024-08-20T19:50:53+00:00",
    type: "order-fulfillment",
    action: "fulfilled",
    userName: "Bárbara de Tiendanube",
  },
  {
    happenedAt: "2024-08-20T19:49:03+00:00",
    type: "transaction-event",
    action: "pending",
    userName: null,
  },
  {
    happenedAt: "2024-08-20T19:49:14+00:00",
    type: "order-payment",
    action: "paid",
    userName: "Bárbara de Tiendanube",
  },
];
describe("GIVEN <Timeline />", () => {
  describe("WHEN rendered", () => {
    it("THEN should correctly render the submitted content", () => {
      makeSut({ timelineData: data });
      expect(screen.getAllByText("Por Bárbara de Tiendanube")).toHaveLength(3);
      expect(screen.getByText("Pago recibido")).toBeDefined();
      expect(screen.getByText("Empaquetada")).toBeDefined();
      expect(screen.getByText("Enviada")).toBeDefined();
      expect(screen.getByText("Está siendo revisado")).toBeDefined();
    });
  });
  describe("WHEN rendered random sorted content", () => {
    it("THEN should correctly render the sorted content", () => {
      makeSut({ timelineData: randomSortedData });
      expect(screen.getAllByText("Por Bárbara de Tiendanube")).toHaveLength(3);
      const timelineElm = screen.getByTestId("timeline-element");
      const firstChild = timelineElm.firstElementChild;
      expect(firstChild?.textContent).toContain("Está siendo revisado");
    });
  });
  describe("WHEN rendered empty", () => {
    it("THEN should show a message if the data is empty", () => {
      makeSut({});
      expect(
        screen.getAllByText("No hay información que mostrar.")
      ).toBeDefined();
    });
  });
});
