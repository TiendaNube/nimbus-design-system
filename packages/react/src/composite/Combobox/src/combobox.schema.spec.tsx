import path from "path";
import * as TJS from "typescript-json-schema";
import {
  defaultCompilerOptions,
  defaultSettings
} from "@nimbus-ds/scripts/src/docgen/docgen.definitions";
import type { ComboboxOption, ComboboxProps } from "./combobox.types";

describe("Combobox documentation and public types", () => {
  it("includes single and multiple value props in the schema consumed by Docgen", () => {
    const program = TJS.getProgramFromFiles(
      [path.resolve(__dirname, "combobox.types.ts")],
      defaultCompilerOptions
    );
    const schema = TJS.generateSchema(
      program,
      "ComboboxProperties",
      defaultSettings
    );
    expect(Object.keys(schema?.properties ?? {})).toEqual(
      expect.arrayContaining(["value", "defaultValue", "onChange"])
    );
  });

  it("retains mode-specific values and callbacks", () => {
    const option: ComboboxOption = { value: "one", label: "One" };
    const acceptProps = (props: ComboboxProps) => props;
    const single = acceptProps({
      options: [option],
      value: option,
      onChange: (value) => {
        const selected: ComboboxOption | null = value;
        expect(selected).toBeNull();
      }
    });
    const multiple = acceptProps({
      options: [option],
      multiple: true,
      value: [option],
      onChange: (value) => {
        const selected: ComboboxOption[] = value;
        expect(selected).toEqual([]);
      }
    });
    if (!single.multiple) single.onChange?.(null);
    if (multiple.multiple) multiple.onChange?.([]);
    // @ts-expect-error Single mode does not accept an array value.
    acceptProps({ options: [], value: [option] });
    // @ts-expect-error Multiple mode does not accept a single default value.
    acceptProps({ options: [], multiple: true, defaultValue: option });
    // @ts-expect-error Multiple mode never supplies null to onChange.
    acceptProps({
      options: [],
      multiple: true,
      onChange: (value: ComboboxOption | null) => value
    });
  });
});
