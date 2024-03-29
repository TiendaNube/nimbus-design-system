import React from "react";
import { render, screen } from "@testing-library/react";

import { FileUploader } from "./FileUploader";
import { FileUploaderProps } from "./fileUploader.types";

const makeSut = (rest?: FileUploaderProps) => {
  render(<FileUploader {...rest} data-testid="file-uploader-element" />);
};

describe("GIVEN <FileUploader />", () => {
  describe("WHEN rendered", () => {
    it("THEN should correctly render the submitted placeholder", () => {
      makeSut({ placeholder: "my placeholder" });
      expect(screen.getByText("my placeholder")).toBeDefined();
      expect(
        screen.getByTestId<HTMLLabelElement>("file-uploader-container").htmlFor
      ).toEqual("input-file");
    });

    it("THEN should properly disable FileUploader", () => {
      makeSut({ disabled: true });
      expect(
        screen.getByTestId("file-uploader-container").getAttribute("class")
      ).toContain("disabled");
      expect(
        screen.getByTestId<HTMLLabelElement>("file-uploader-container").htmlFor
      ).toContain("disabled");
      expect(
        screen.getByTestId<HTMLInputElement>("file-uploader-element").disabled
      ).toBeTruthy();
    });
  });

  describe("THEN should correctly render the submitted aspectRatio", () => {
    it("THEN should correctly render the aspectRatio default", () => {
      makeSut();
      expect(
        screen.getByTestId("file-uploader-container").getAttribute("class")
      ).toContain("aspectRatio_1/1");
    });

    it("THEN should correctly render the aspectRatio 1/1", () => {
      makeSut({ aspectRatio: "1/1" });
      expect(
        screen.getByTestId("file-uploader-container").getAttribute("class")
      ).toContain("aspectRatio_1/1");
    });

    it("THEN should correctly render the aspectRatio 1/2", () => {
      makeSut({ aspectRatio: "1/2" });
      expect(
        screen.getByTestId("file-uploader-container").getAttribute("class")
      ).toContain("aspectRatio_1/2");
    });

    it("THEN should correctly render the aspectRatio 16/9", () => {
      makeSut({ aspectRatio: "16/9" });
      expect(
        screen.getByTestId("file-uploader-container").getAttribute("class")
      ).toContain("aspectRatio_16/9");
    });

    it("THEN should correctly render the aspectRatio 2/1", () => {
      makeSut({ aspectRatio: "2/1" });
      expect(
        screen.getByTestId("file-uploader-container").getAttribute("class")
      ).toContain("aspectRatio_2/1");
    });

    it("THEN should correctly render the aspectRatio 3/4", () => {
      makeSut({ aspectRatio: "3/4" });
      expect(
        screen.getByTestId("file-uploader-container").getAttribute("class")
      ).toContain("aspectRatio_3/4");
    });

    it("THEN should correctly render the aspectRatio 4/3", () => {
      makeSut({ aspectRatio: "4/3" });
      expect(
        screen.getByTestId("file-uploader-container").getAttribute("class")
      ).toContain("aspectRatio_4/3");
    });

    it("THEN should correctly render the aspectRatio 9/16", () => {
      makeSut({ aspectRatio: "9/16" });
      expect(
        screen.getByTestId("file-uploader-container").getAttribute("class")
      ).toContain("aspectRatio_9/16");
    });
  });
});
