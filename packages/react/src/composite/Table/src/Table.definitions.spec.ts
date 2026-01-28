import { getEffectiveFixedWidth, getColumnWidth } from "./Table.definitions";
import type { TableColumnLayout } from "./table.types";

describe("GIVEN getEffectiveFixedWidth", () => {
  it("THEN returns the fixed width when defined", () => {
    const column: TableColumnLayout = { id: "column-1", width: "200px" };
    expect(getEffectiveFixedWidth(column)).toBe("200px");
  });

  it("THEN returns undefined when no width is set", () => {
    const column: TableColumnLayout = { id: "column-1", grow: 1 };
    expect(getEffectiveFixedWidth(column)).toBeUndefined();
  });
});

describe("GIVEN getColumnWidth", () => {
  describe("WHEN column has a fixed width", () => {
    it("THEN returns the fixed width ignoring grow values", () => {
      const column: TableColumnLayout = {
        id: "column-1",
        width: "150px",
        grow: 2,
      };
      expect(getColumnWidth(column, 10)).toBe("150px");
    });
  });

  describe("WHEN column uses grow distribution", () => {
    it("THEN calculates proportional width based on grow share", () => {
      const column: TableColumnLayout = { id: "column-1", grow: 2 };
      expect(getColumnWidth(column, 4)).toBe("calc(100% * 0.5000)");
    });

    it("THEN handles non-integer grow ratios with 4 decimal precision", () => {
      const column: TableColumnLayout = { id: "column-1", grow: 1 };
      expect(getColumnWidth(column, 3)).toBe("calc(100% * 0.3333)");
    });
  });

  describe("WHEN grow cannot be applied", () => {
    it("THEN returns undefined when totalGrow is zero", () => {
      const column: TableColumnLayout = { id: "column-1", grow: 2 };
      expect(getColumnWidth(column, 0)).toBeUndefined();
    });

    it("THEN returns undefined when grow is zero or negative", () => {
      expect(getColumnWidth({ id: "column-1", grow: 0 }, 10)).toBeUndefined();
      expect(getColumnWidth({ id: "column-1", grow: -1 }, 10)).toBeUndefined();
    });

    it("THEN returns undefined when grow is not defined", () => {
      const column: TableColumnLayout = { id: "column-1" };
      expect(getColumnWidth(column, 10)).toBeUndefined();
    });
  });
});
