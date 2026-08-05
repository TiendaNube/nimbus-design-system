import React from "react";
import { render, screen } from "@testing-library/react";

import { Input, type InputProps } from "./Input";

const makeSut = (rest?: Omit<InputProps, "children">) => {
  render(<Input {...rest} data-testid="input-element" />);
};

describe("GIVEN <Input />", () => {
  describe("WHEN rendered", () => {
    it("THEN should properly disable the component", () => {
      makeSut({ disabled: true });
      expect(
        screen.getByRole<HTMLInputElement>("textbox").disabled
      ).toBeTruthy();
    });
  });

  describe("THEN should correctly render the submitted position and icon", () => {
    it("should render the submitted icon", () => {
      makeSut({ disabled: true, append: <svg data-testid="my-icon" /> });
      expect(screen.getByTestId("my-icon")).toBeDefined();
    });

    it("should render the icon sent to the start", () => {
      makeSut({
        disabled: true,
        append: <svg data-testid="my-icon" />,
        appendPosition: "start",
      });
      expect(screen.getByTestId("my-icon")).toBeDefined();
      expect(
        screen.getByTestId("input-element-icon").getAttribute("class")
      ).toContain("append_start");
    });

    it("should render the icon sent to the end", () => {
      makeSut({
        disabled: true,
        append: <svg data-testid="my-icon" />,
        appendPosition: "end",
      });
      expect(screen.getByTestId("my-icon")).toBeDefined();
      expect(
        screen.getByTestId("input-element-icon").getAttribute("class")
      ).toContain("append_end");
    });
  });

  describe("THEN should correctly render the submitted appearance", () => {
    it("THEN should correctly render the appearance default", () => {
      makeSut();
      expect(
        screen.getByTestId("input-element-container").getAttribute("class")
      ).toContain("appearance_neutral");
    });

    it("THEN should correctly render the appearance neutral", () => {
      makeSut({ appearance: "neutral" });
      expect(
        screen.getByTestId("input-element-container").getAttribute("class")
      ).toContain("appearance_neutral");
    });

    it("THEN should correctly render the appearance success", () => {
      makeSut({ appearance: "success" });
      expect(
        screen.getByTestId("input-element-container").getAttribute("class")
      ).toContain("appearance_success");
    });

    it("THEN should correctly render the appearance warning", () => {
      makeSut({ appearance: "warning" });
      expect(
        screen.getByTestId("input-element-container").getAttribute("class")
      ).toContain("appearance_warning");
    });

    it("THEN should correctly render the appearance danger", () => {
      makeSut({ appearance: "danger" });
      expect(
        screen.getByTestId("input-element-container").getAttribute("class")
      ).toContain("appearance_danger");
    });

    it("THEN should correctly render the appearance ai-generative", () => {
      makeSut({ appearance: "ai-generative" });
      expect(
        screen.getByTestId("input-element-container").getAttribute("class")
      ).toContain("appearance_ai-generative");
    });

    it("THEN should correctly render the aiGenerated prop as ai-generative appearance", () => {
      makeSut({ aiGenerated: true });
      expect(
        screen.getByTestId("input-element-container").getAttribute("class")
      ).toContain("appearance_ai-generative");
    });

    it("THEN aiGenerated should take precedence when appearance is also provided", () => {
      makeSut({ appearance: "danger", aiGenerated: true });
      const className = screen
        .getByTestId("input-element-container")
        .getAttribute("class");
      expect(className).toContain("appearance_ai-generative");
    });
  });

  describe("THEN should correctly render the submitted prefix and suffix", () => {
    it("should render the prefix as static text before the input", () => {
      makeSut({ prefix: "$" });
      const prefix = screen.getByTestId("input-element-prefix");
      expect(prefix).toHaveTextContent("$");
      expect(prefix.tagName).toBe("SPAN");
    });

    it("should render the suffix as static text after the input", () => {
      makeSut({ suffix: "kg" });
      const suffix = screen.getByTestId("input-element-suffix");
      expect(suffix).toHaveTextContent("kg");
      expect(suffix.tagName).toBe("SPAN");
    });

    it("should render both prefix and suffix at the same time", () => {
      makeSut({ prefix: "$", suffix: "USD" });
      expect(screen.getByTestId("input-element-prefix")).toHaveTextContent(
        "$"
      );
      expect(screen.getByTestId("input-element-suffix")).toHaveTextContent(
        "USD"
      );
    });

    it("should not render prefix/suffix as a button and should not expose a button role", () => {
      makeSut({ prefix: "$", suffix: "kg" });
      const prefix = screen.getByTestId("input-element-prefix");
      const suffix = screen.getByTestId("input-element-suffix");

      expect(prefix.tagName).not.toBe("BUTTON");
      expect(suffix.tagName).not.toBe("BUTTON");
      expect(screen.queryByRole("button")).toBeNull();
    });

    it("should render prefix/suffix together with an append icon without conflicting", () => {
      makeSut({
        prefix: "$",
        suffix: "kg",
        append: <svg data-testid="my-icon" />,
        appendPosition: "start",
      });

      expect(screen.getByTestId("input-element-prefix")).toBeDefined();
      expect(screen.getByTestId("input-element-suffix")).toBeDefined();
      expect(screen.getByTestId("input-element-icon")).toBeDefined();
      expect(screen.getByTestId("my-icon")).toBeDefined();
      expect(screen.getByRole("button")).toBeDefined();
    });

    it("should not render prefix/suffix elements when not provided", () => {
      makeSut();
      expect(screen.queryByTestId("input-element-prefix")).toBeNull();
      expect(screen.queryByTestId("input-element-suffix")).toBeNull();
    });

    it("should render the prefix before the input in the DOM", () => {
      makeSut({ prefix: "$" });
      const prefix = screen.getByTestId("input-element-prefix");
      const inputElement = screen.getByTestId("input-element");

      const position = prefix.compareDocumentPosition(inputElement);
      // eslint-disable-next-line no-bitwise
      expect(position & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    });

    it("should render the suffix after the input in the DOM", () => {
      makeSut({ suffix: "kg" });
      const suffix = screen.getByTestId("input-element-suffix");
      const inputElement = screen.getByTestId("input-element");

      const position = inputElement.compareDocumentPosition(suffix);
      // eslint-disable-next-line no-bitwise
      expect(position & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    });

    it("should render prefix and suffix around the input in DOM order", () => {
      makeSut({ prefix: "$", suffix: "USD" });
      const container = screen.getByTestId("input-element-container");
      const children = Array.from(container.children);

      const prefixIndex = children.indexOf(
        screen.getByTestId("input-element-prefix")
      );
      const inputIndex = children.indexOf(screen.getByTestId("input-element"));
      const suffixIndex = children.indexOf(
        screen.getByTestId("input-element-suffix")
      );

      expect(prefixIndex).toBeGreaterThanOrEqual(0);
      expect(prefixIndex).toBeLessThan(inputIndex);
      expect(inputIndex).toBeLessThan(suffixIndex);
    });

    it("should render prefix as a static non-button span when disabled", () => {
      makeSut({ prefix: "$", disabled: true });
      const prefix = screen.getByTestId("input-element-prefix");

      expect(prefix.tagName).toBe("SPAN");
      expect(prefix).toHaveTextContent("$");
      expect(prefix.tagName).not.toBe("BUTTON");
      expect(screen.getByTestId<HTMLInputElement>("input-element").disabled).toBe(
        true
      );
    });

    it("should render suffix as a static non-button span when disabled", () => {
      makeSut({ suffix: "kg", disabled: true });
      const suffix = screen.getByTestId("input-element-suffix");

      expect(suffix.tagName).toBe("SPAN");
      expect(suffix).toHaveTextContent("kg");
      expect(suffix.tagName).not.toBe("BUTTON");
      expect(screen.getByTestId<HTMLInputElement>("input-element").disabled).toBe(
        true
      );
    });

    it("should render prefix and suffix as static non-button spans when disabled at the same time", () => {
      makeSut({ prefix: "$", suffix: "kg", disabled: true });

      expect(screen.queryByRole("button")).toBeNull();
      expect(screen.getByTestId("input-element-prefix").tagName).toBe("SPAN");
      expect(screen.getByTestId("input-element-suffix").tagName).toBe("SPAN");
    });

    it("should render a numeric 0 prefix", () => {
      makeSut({ prefix: 0 });
      const prefix = screen.getByTestId("input-element-prefix");

      expect(prefix).toHaveTextContent("0");
    });

    it("should render a numeric 0 suffix", () => {
      makeSut({ suffix: 0 });
      const suffix = screen.getByTestId("input-element-suffix");

      expect(suffix).toHaveTextContent("0");
    });

    it("should render both a numeric 0 prefix and suffix at the same time", () => {
      makeSut({ prefix: 0, suffix: 0 });

      expect(screen.getByTestId("input-element-prefix")).toHaveTextContent(
        "0"
      );
      expect(screen.getByTestId("input-element-suffix")).toHaveTextContent(
        "0"
      );
    });

    it("should associate the prefix and suffix with the input via aria-describedby", () => {
      makeSut({ prefix: "$", suffix: "USD" });
      const inputElement = screen.getByTestId("input-element");
      const prefix = screen.getByTestId("input-element-prefix");
      const suffix = screen.getByTestId("input-element-suffix");

      const describedBy = inputElement.getAttribute("aria-describedby");

      expect(describedBy).toContain(prefix.getAttribute("id"));
      expect(describedBy).toContain(suffix.getAttribute("id"));
    });

    it("should preserve a caller-provided aria-describedby alongside the affix ids", () => {
      makeSut({ prefix: "$", "aria-describedby": "external-hint" });
      const inputElement = screen.getByTestId("input-element");
      const prefix = screen.getByTestId("input-element-prefix");

      const describedBy = inputElement.getAttribute("aria-describedby");

      expect(describedBy).toContain("external-hint");
      expect(describedBy).toContain(prefix.getAttribute("id"));
    });

    it("should not include ids for affixes that are not rendered in aria-describedby", () => {
      makeSut({ prefix: "$" });
      const inputElement = screen.getByTestId("input-element");
      const describedBy = inputElement.getAttribute("aria-describedby");

      expect(describedBy).not.toContain("suffix");
    });

    it("should generate distinct, valid affix ids for two instances sharing the same data-testid", () => {
      render(
        <>
          <Input prefix="$" suffix="USD" data-testid="shared-testid" />
          <Input prefix="$" suffix="USD" data-testid="shared-testid" />
        </>
      );

      const prefixes = screen.getAllByTestId("shared-testid-prefix");
      const suffixes = screen.getAllByTestId("shared-testid-suffix");
      const inputs = screen.getAllByTestId("shared-testid");

      expect(prefixes).toHaveLength(2);
      expect(suffixes).toHaveLength(2);

      const [prefixIdA, prefixIdB] = prefixes.map((el) =>
        el.getAttribute("id")
      );
      const [suffixIdA, suffixIdB] = suffixes.map((el) =>
        el.getAttribute("id")
      );

      // ids must exist and be valid single ARIA IDREF tokens (no whitespace)
      [prefixIdA, prefixIdB, suffixIdA, suffixIdB].forEach((id) => {
        expect(id).toBeTruthy();
        expect(id).not.toMatch(/\s/);
      });

      // the two instances must not collide with each other
      expect(prefixIdA).not.toBe(prefixIdB);
      expect(suffixIdA).not.toBe(suffixIdB);

      // each input's aria-describedby must reference only its own affix ids
      const [describedByA, describedByB] = inputs.map((el) =>
        el.getAttribute("aria-describedby")
      );
      expect(describedByA).toContain(prefixIdA);
      expect(describedByA).toContain(suffixIdA);
      expect(describedByA).not.toContain(prefixIdB);
      expect(describedByA).not.toContain(suffixIdB);

      expect(describedByB).toContain(prefixIdB);
      expect(describedByB).toContain(suffixIdB);
      expect(describedByB).not.toContain(prefixIdA);
      expect(describedByB).not.toContain(suffixIdA);
    });
  });
});
