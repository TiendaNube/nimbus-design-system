import React from "react";
import { render, screen } from "@testing-library/react";
import { textarea as textareaStyles } from "@nimbus-ds/styles";
import { Textarea } from "./Textarea";

describe("Textarea", () => {
  describe("resize functionality", () => {
    it("should apply resize enabled class when resize is true", () => {
      render(
        <Textarea id="test-textarea" resize data-testid="textarea" />
      );

      const textarea = screen.getByTestId("textarea");
      expect(textarea).toHaveClass(textareaStyles.classnames.resize.enabled);
    });

    it("should apply resize disabled class when resize is false", () => {
      render(
        <Textarea id="test-textarea" resize={false} data-testid="textarea" />
      );

      const textarea = screen.getByTestId("textarea");
      expect(textarea).toHaveClass(textareaStyles.classnames.resize.disabled);
    });

    it("should default to resize enabled when resize prop is not provided", () => {
      render(<Textarea id="test-textarea" data-testid="textarea" />);

      const textarea = screen.getByTestId("textarea");
      expect(textarea).toHaveClass(textareaStyles.classnames.resize.enabled);
    });

    it("should work with other props", () => {
      render(
        <Textarea
          id="test-textarea"
          resize={false}
          appearance="success"
          lines={5}
          autoGrow
          data-testid="textarea"
        />
      );

      const textarea = screen.getByTestId("textarea");
      expect(textarea).toHaveClass(textareaStyles.classnames.resize.disabled);
      expect(textarea).toHaveClass(
        textareaStyles.classnames.appearance.success
      );
      expect(textarea).toHaveClass(textareaStyles.classnames.fieldSizing);
      expect(textarea).toHaveAttribute("rows", "5");
    });
  });

  describe("component integration", () => {
    it("should render with all default props", () => {
      render(
        <Textarea
          id="test-textarea"
          placeholder="Test placeholder"
          data-testid="textarea"
        />
      );

      const textarea = screen.getByTestId("textarea");
      expect(textarea).toBeInTheDocument();
      expect(textarea).toHaveAttribute("id", "test-textarea");
      expect(textarea).toHaveAttribute("placeholder", "Test placeholder");
      expect(textarea).toHaveAttribute("rows", "2");
      expect(textarea).toHaveClass(textareaStyles.classnames.resize.enabled);
    });

    it("should forward ref correctly", () => {
      const ref = React.createRef<HTMLTextAreaElement>();

      render(<Textarea id="test-textarea" ref={ref} data-testid="textarea" />);

      expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
      expect(ref.current?.id).toBe("test-textarea");
    });

    it("should handle HTML textarea attributes", () => {
      render(
        <Textarea
          id="test-textarea"
          resize={false}
          disabled
          readOnly
          maxLength={100}
          data-testid="textarea"
        />
      );

      const textarea = screen.getByTestId("textarea");
      expect(textarea).toBeDisabled();
      expect(textarea).toHaveAttribute("readonly");
      expect(textarea).toHaveAttribute("maxLength", "100");
      expect(textarea).toHaveClass(textareaStyles.classnames.resize.disabled);
    });
  });
});
