import React, { useState } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import { TimePicker } from "./TimePicker";
import { TimePickerProps } from "./timePicker.types";

const makeSut = (props: Partial<TimePickerProps> = {}) =>
  render(<TimePicker data-testid="timepicker-element" {...props} />);

const ControlledTimePicker = (props: Partial<TimePickerProps> = {}) => {
  const [time, setTime] = useState<string | null>(props.value as string | null);
  return (
    <TimePicker
      data-testid="controlled-timepicker"
      {...props}
      value={time}
      onChange={(value) => setTime(value)}
    />
  );
};

describe("GIVEN <TimePicker />", () => {
  describe("WHEN rendered with default props", () => {
    it("THEN should display the input with placeholder", () => {
      makeSut({ placeholder: "Select time" });
      expect(screen.getByPlaceholderText("Select time")).toBeDefined();
    });

    it("THEN should display the clock icon", () => {
      makeSut();
      expect(screen.getByRole("combobox")).toBeDefined();
    });

    it("THEN should have aria-haspopup attribute", () => {
      makeSut();
      expect(screen.getByRole("combobox").getAttribute("aria-haspopup")).toBe(
        "listbox"
      );
    });
  });

  describe("WHEN clicking the input", () => {
    it("THEN should open the picker panel", async () => {
      makeSut();
      const input = screen.getByRole("combobox");

      fireEvent.click(input);

      await waitFor(() => {
        expect(screen.getAllByRole("listbox").length).toBeGreaterThan(0);
      });
    });

    it("THEN should update aria-expanded attribute", async () => {
      makeSut();
      const input = screen.getByRole("combobox");

      expect(input.getAttribute("aria-expanded")).toBe("false");

      fireEvent.click(input);

      await waitFor(() => {
        expect(input.getAttribute("aria-expanded")).toBe("true");
      });
    });
  });

  describe("WHEN rendered with a value in 24h format", () => {
    it("THEN should display the formatted time in the input", () => {
      makeSut({ value: "14:30", format: "24h" });
      expect(screen.getByDisplayValue("14:30")).toBeDefined();
    });
  });

  describe("WHEN rendered with a value in 12h format", () => {
    it("THEN should display the formatted time with AM/PM", () => {
      makeSut({ value: "09:30 AM", format: "12h" });
      expect(screen.getByDisplayValue("09:30 AM")).toBeDefined();
    });
  });

  describe("WHEN rendered in scroll mode with 12h format", () => {
    it("THEN should show AM/PM selector when panel is open", async () => {
      makeSut({ format: "12h", mode: "scroll" });
      const input = screen.getByRole("combobox");

      fireEvent.click(input);

      await waitFor(() => {
        expect(
          screen.getByRole("group", { name: "AM/PM selector" })
        ).toBeDefined();
      });
    });
  });

  describe("WHEN rendered in dropdown mode", () => {
    it("THEN should show time options in the dropdown", async () => {
      makeSut({ mode: "dropdown", step: 30 });
      const input = screen.getByRole("combobox");

      fireEvent.click(input);

      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeDefined();
        expect(screen.getByText("00:00")).toBeDefined();
        expect(screen.getByText("00:30")).toBeDefined();
      });
    });
  });

  describe("WHEN selecting a time in dropdown mode", () => {
    it("THEN should call onChange with the selected value", async () => {
      const handleChange = jest.fn();
      makeSut({ mode: "dropdown", step: 60, onChange: handleChange });
      const input = screen.getByRole("combobox");

      fireEvent.click(input);

      await waitFor(() => {
        const option = screen.getByText("10:00");
        fireEvent.click(option);
      });

      expect(handleChange).toHaveBeenCalledWith("10:00", expect.any(Date));
    });

    it("THEN should close the panel after selection", async () => {
      makeSut({ mode: "dropdown", step: 60 });
      const input = screen.getByRole("combobox");

      fireEvent.click(input);

      await waitFor(() => {
        const option = screen.getByText("10:00");
        fireEvent.click(option);
      });

      await waitFor(() => {
        expect(input.getAttribute("aria-expanded")).toBe("false");
      });
    });
  });

  describe("WHEN disabled", () => {
    it("THEN should not open the panel on click", async () => {
      makeSut({ disabled: true });
      const input = screen.getByRole("combobox");

      fireEvent.click(input);

      await waitFor(() => {
        expect(input.getAttribute("aria-expanded")).toBe("false");
      });
    });

    it("THEN should have disabled attribute on input", () => {
      makeSut({ disabled: true });
      expect(screen.getByRole("combobox")).toBeDisabled();
    });
  });

  describe("WHEN minTime and maxTime are set in dropdown mode", () => {
    it("THEN should mark times outside range as disabled", async () => {
      makeSut({
        mode: "dropdown",
        step: 60,
        minTime: "09:00",
        maxTime: "17:00",
      });
      const input = screen.getByRole("combobox");

      fireEvent.click(input);

      await waitFor(() => {
        const earlyOption = screen.getByText("08:00");
        const lateOption = screen.getByText("18:00");
        const validOption = screen.getByText("10:00");

        expect(earlyOption.closest("button")).toHaveAttribute(
          "aria-disabled",
          "true"
        );
        expect(lateOption.closest("button")).toHaveAttribute(
          "aria-disabled",
          "true"
        );
        expect(validOption.closest("button")).not.toHaveAttribute(
          "aria-disabled",
          "true"
        );
      });
    });
  });

  describe("WHEN pressing Escape key", () => {
    it("THEN should close the panel", async () => {
      makeSut();
      const input = screen.getByRole("combobox");

      fireEvent.click(input);

      await waitFor(() => {
        expect(input.getAttribute("aria-expanded")).toBe("true");
      });

      fireEvent.keyDown(input, { key: "Escape" });

      await waitFor(() => {
        expect(input.getAttribute("aria-expanded")).toBe("false");
      });
    });
  });

  describe("WHEN rendered with controlled open state", () => {
    it("THEN should respect the open prop", async () => {
      const { rerender } = render(
        <TimePicker data-testid="controlled-open" open={false} />
      );

      const input = screen.getByRole("combobox");
      expect(input.getAttribute("aria-expanded")).toBe("false");

      rerender(<TimePicker data-testid="controlled-open" open />);

      await waitFor(() => {
        expect(input.getAttribute("aria-expanded")).toBe("true");
      });
    });

    it("THEN should call onOpenChange when interaction occurs", async () => {
      const handleOpenChange = jest.fn();
      makeSut({ onOpenChange: handleOpenChange });

      const input = screen.getByRole("combobox");
      fireEvent.click(input);

      expect(handleOpenChange).toHaveBeenCalledWith(true);
    });
  });

  describe("WHEN rendered with controlled value", () => {
    it("THEN should update display when value changes", () => {
      render(<ControlledTimePicker value="10:00" />);
      expect(screen.getByDisplayValue("10:00")).toBeDefined();
    });
  });

  describe("WHEN rendered with accessibility attributes", () => {
    it("THEN should apply aria-label", () => {
      makeSut({ "aria-label": "Select appointment time" });
      expect(screen.getByRole("combobox").getAttribute("aria-label")).toBe(
        "Select appointment time"
      );
    });
  });

  describe("WHEN rendered with name and id", () => {
    it("THEN should apply name to the input", () => {
      makeSut({ name: "appointment-time" });
      expect(screen.getByRole("combobox").getAttribute("name")).toBe(
        "appointment-time"
      );
    });

    it("THEN should apply id to the input", () => {
      makeSut({ id: "time-input" });
      expect(screen.getByRole("combobox").getAttribute("id")).toBe(
        "time-input"
      );
    });
  });

  describe("WHEN rendered with required", () => {
    it("THEN should apply required attribute", () => {
      makeSut({ required: true });
      expect(screen.getByRole("combobox")).toBeRequired();
    });
  });

  describe("WHEN step prop is set in dropdown mode", () => {
    it("THEN should display options at correct intervals", async () => {
      makeSut({ mode: "dropdown", step: 15 });
      const input = screen.getByRole("combobox");

      fireEvent.click(input);

      await waitFor(() => {
        expect(screen.getByText("00:00")).toBeDefined();
        expect(screen.getByText("00:15")).toBeDefined();
        expect(screen.getByText("00:30")).toBeDefined();
        expect(screen.getByText("00:45")).toBeDefined();
      });
    });
  });
});
