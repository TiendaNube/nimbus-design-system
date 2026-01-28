import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import { FileUploader } from "./FileUploader";
import type { FileUploaderProps } from "./fileUploader.types";
import { isFileAccepted } from "./FileUploader.definitions";

const makeSut = (rest?: FileUploaderProps) => {
  render(<FileUploader {...rest} data-testid="file-uploader-element" />);
};

const createFile = (name: string, type: string): File =>
  new File(["content"], name, { type });

const createDragEvent = (type: string, files: File[]) => {
  const event = new Event(type, { bubbles: true });
  Object.defineProperty(event, "dataTransfer", {
    value: {
      files,
      items: files.map((file) => ({ kind: "file", type: file.type })),
    },
  });
  return event;
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

  describe("WHEN drag and drop interaction occurs", () => {
    it("THEN should handle dragover event and prevent default", () => {
      makeSut();
      const container = screen.getByTestId("file-uploader-container");
      const dragEvent = createDragEvent("dragover", []);

      const preventDefaultSpy = jest.fn();
      const stopPropagationSpy = jest.fn();
      Object.defineProperty(dragEvent, "preventDefault", {
        value: preventDefaultSpy,
      });
      Object.defineProperty(dragEvent, "stopPropagation", {
        value: stopPropagationSpy,
      });

      fireEvent(container, dragEvent);

      expect(preventDefaultSpy).toHaveBeenCalled();
      expect(stopPropagationSpy).toHaveBeenCalled();
    });

    it("THEN should handle dragleave event", () => {
      makeSut();
      const container = screen.getByTestId("file-uploader-container");
      const dragLeaveEvent = createDragEvent("dragleave", []);

      const preventDefaultSpy = jest.fn();
      Object.defineProperty(dragLeaveEvent, "preventDefault", {
        value: preventDefaultSpy,
      });

      fireEvent(container, dragLeaveEvent);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it("THEN should handle file drop and trigger onChange", () => {
      const onChangeMock = jest.fn();
      makeSut({ onChange: onChangeMock });

      const container = screen.getByTestId("file-uploader-container");
      const file = createFile("test.jpg", "image/jpeg");
      const dropEvent = createDragEvent("drop", [file]);

      const preventDefaultSpy = jest.fn();
      const stopPropagationSpy = jest.fn();
      Object.defineProperty(dropEvent, "preventDefault", {
        value: preventDefaultSpy,
      });
      Object.defineProperty(dropEvent, "stopPropagation", {
        value: stopPropagationSpy,
      });

      fireEvent(container, dropEvent);

      expect(preventDefaultSpy).toHaveBeenCalled();
      expect(stopPropagationSpy).toHaveBeenCalled();
      expect(onChangeMock).toHaveBeenCalled();
    });

    it("THEN should not trigger onChange when disabled", () => {
      const onChangeMock = jest.fn();
      makeSut({ disabled: true, onChange: onChangeMock });

      const container = screen.getByTestId("file-uploader-container");
      const file = createFile("test.jpg", "image/jpeg");
      const dropEvent = createDragEvent("drop", [file]);

      fireEvent(container, dropEvent);

      expect(onChangeMock).not.toHaveBeenCalled();
    });

    it("THEN should handle multiple files drop", () => {
      const onChangeMock = jest.fn();
      makeSut({ onChange: onChangeMock, multiple: true });

      const container = screen.getByTestId("file-uploader-container");
      const files = [
        createFile("test1.jpg", "image/jpeg"),
        createFile("test2.png", "image/png"),
      ];
      const dropEvent = createDragEvent("drop", files);

      fireEvent(container, dropEvent);

      expect(onChangeMock).toHaveBeenCalled();
    });
  });

  describe("WHEN validating file types", () => {
    it("THEN should accept files matching exact MIME type", () => {
      const file = createFile("test.png", "image/png");
      expect(isFileAccepted(file, "image/png,image/jpeg")).toBe(true);
    });

    it("THEN should reject files not matching the accept prop", () => {
      const file = createFile("test.pdf", "application/pdf");
      expect(isFileAccepted(file, "image/png,image/jpeg")).toBe(false);
    });

    it("THEN should accept files with wildcard MIME type", () => {
      const file = createFile("test.webp", "image/webp");
      expect(isFileAccepted(file, "image/*")).toBe(true);
    });

    it("THEN should accept files by file extension", () => {
      const file = createFile("document.pdf", "application/pdf");
      expect(isFileAccepted(file, ".pdf,.doc")).toBe(true);
    });

    it("THEN should accept all files when accept is *", () => {
      const file = createFile("test.pdf", "application/pdf");
      expect(isFileAccepted(file, "*")).toBe(true);
    });

    it("THEN should accept all files when accept is empty", () => {
      const file = createFile("test.pdf", "application/pdf");
      expect(isFileAccepted(file, "")).toBe(true);
    });

    it("THEN should handle case-insensitive file extensions", () => {
      const file = createFile("document.PDF", "application/pdf");
      expect(isFileAccepted(file, ".pdf")).toBe(true);
    });
  });

  describe("WHEN validating file types on drop", () => {
    it("THEN should trigger onChange with accepted files", () => {
      const onChangeMock = jest.fn();
      makeSut({ onChange: onChangeMock, accept: "image/png,image/jpeg" });

      const container = screen.getByTestId("file-uploader-container");
      const file = createFile("test.png", "image/png");
      const dropEvent = createDragEvent("drop", [file]);

      fireEvent(container, dropEvent);

      expect(onChangeMock).toHaveBeenCalled();
    });

    it("THEN should not trigger onChange when files are rejected", () => {
      const onChangeMock = jest.fn();
      makeSut({ onChange: onChangeMock, accept: "image/png,image/jpeg" });

      const container = screen.getByTestId("file-uploader-container");
      const file = createFile("test.pdf", "application/pdf");
      const dropEvent = createDragEvent("drop", [file]);

      fireEvent(container, dropEvent);

      expect(onChangeMock).not.toHaveBeenCalled();
    });

    it("THEN should filter and accept only valid files from multiple drops", () => {
      const onChangeMock = jest.fn();
      makeSut({ onChange: onChangeMock, accept: "image/png", multiple: true });

      const container = screen.getByTestId("file-uploader-container");
      const acceptedFile = createFile("test.png", "image/png");
      const rejectedFile = createFile("test.pdf", "application/pdf");
      const dropEvent = createDragEvent("drop", [acceptedFile, rejectedFile]);

      fireEvent(container, dropEvent);

      expect(onChangeMock).toHaveBeenCalled();
      const inputElement = screen.getByTestId<HTMLInputElement>(
        "file-uploader-element"
      );
      expect(inputElement.files?.length).toBe(1);
      expect(inputElement.files?.[0].name).toBe("test.png");
    });
  });

  describe("WHEN using drop callbacks", () => {
    it("THEN should call onDrop callback when files are dropped", () => {
      const onDropMock = jest.fn();
      const onChangeMock = jest.fn();
      makeSut({ onChange: onChangeMock, onDrop: onDropMock });

      const container = screen.getByTestId("file-uploader-container");
      const file = createFile("test.png", "image/png");
      const dropEvent = createDragEvent("drop", [file]);

      fireEvent(container, dropEvent);

      expect(onDropMock).toHaveBeenCalledWith(expect.any(Object));
      expect(onChangeMock).toHaveBeenCalled();
    });

    it("THEN should call onDropSuccess callback when files are accepted", () => {
      const onDropSuccessMock = jest.fn();
      const onChangeMock = jest.fn();
      makeSut({
        onChange: onChangeMock,
        onDropSuccess: onDropSuccessMock,
        accept: "image/png",
      });

      const container = screen.getByTestId("file-uploader-container");
      const file = createFile("test.png", "image/png");
      const dropEvent = createDragEvent("drop", [file]);

      fireEvent(container, dropEvent);

      expect(onDropSuccessMock).toHaveBeenCalledWith(expect.any(Object));
      expect(onChangeMock).toHaveBeenCalled();
    });

    it("THEN should call onDropReject callback when all files are rejected", () => {
      const onDropRejectMock = jest.fn();
      const onChangeMock = jest.fn();
      makeSut({
        onChange: onChangeMock,
        onDropReject: onDropRejectMock,
        accept: "image/png",
      });

      const container = screen.getByTestId("file-uploader-container");
      const file = createFile("test.pdf", "application/pdf");
      const dropEvent = createDragEvent("drop", [file]);

      fireEvent(container, dropEvent);

      expect(onDropRejectMock).toHaveBeenCalledWith(expect.any(Object));
      expect(onChangeMock).not.toHaveBeenCalled();
    });

    it("THEN should call both onDrop and onDropSuccess for accepted files", () => {
      const onDropMock = jest.fn();
      const onDropSuccessMock = jest.fn();
      const onChangeMock = jest.fn();
      makeSut({
        onChange: onChangeMock,
        onDrop: onDropMock,
        onDropSuccess: onDropSuccessMock,
      });

      const container = screen.getByTestId("file-uploader-container");
      const file = createFile("test.png", "image/png");
      const dropEvent = createDragEvent("drop", [file]);

      fireEvent(container, dropEvent);

      expect(onDropMock).toHaveBeenCalled();
      expect(onDropSuccessMock).toHaveBeenCalled();
      expect(onChangeMock).toHaveBeenCalled();
    });

    it("THEN should call both onDrop and onDropReject for rejected files", () => {
      const onDropMock = jest.fn();
      const onDropRejectMock = jest.fn();
      const onChangeMock = jest.fn();
      makeSut({
        onChange: onChangeMock,
        onDrop: onDropMock,
        onDropReject: onDropRejectMock,
        accept: "image/png",
      });

      const container = screen.getByTestId("file-uploader-container");
      const file = createFile("test.pdf", "application/pdf");
      const dropEvent = createDragEvent("drop", [file]);

      fireEvent(container, dropEvent);

      expect(onDropMock).toHaveBeenCalled();
      expect(onDropRejectMock).toHaveBeenCalled();
      expect(onChangeMock).not.toHaveBeenCalled();
    });
  });

  describe("WHEN handling drag state", () => {
    it("THEN should set dragging state on dragover when enabled", () => {
      makeSut();
      const container = screen.getByTestId("file-uploader-container");

      fireEvent.dragEnter(container);

      expect(container.getAttribute("class")).toContain("dragging");
    });

    it("THEN should not set dragging state when disabled", () => {
      makeSut({ disabled: true });
      const container = screen.getByTestId("file-uploader-container");

      fireEvent.dragEnter(container);

      expect(container.getAttribute("class")).not.toContain("dragging");
    });

    it("THEN should clear dragging state on dragleave", () => {
      makeSut();
      const container = screen.getByTestId("file-uploader-container");

      fireEvent.dragEnter(container);
      expect(container.getAttribute("class")).toContain("dragging");

      fireEvent.dragLeave(container);
      expect(container.getAttribute("class")).not.toContain("dragging");
    });

    it("THEN should clear dragging state after drop", () => {
      const onChangeMock = jest.fn();
      makeSut({ onChange: onChangeMock });
      const container = screen.getByTestId("file-uploader-container");
      const file = createFile("test.jpg", "image/jpeg");
      const dropEvent = createDragEvent("drop", [file]);

      fireEvent.dragEnter(container);
      expect(container.getAttribute("class")).toContain("dragging");

      fireEvent(container, dropEvent);
      expect(container.getAttribute("class")).not.toContain("dragging");
    });
  });

  describe("WHEN handling file drop", () => {
    it("THEN should update input element files on successful drop", () => {
      const onChangeMock = jest.fn();
      makeSut({ onChange: onChangeMock });

      const container = screen.getByTestId("file-uploader-container");
      const inputElement = screen.getByTestId<HTMLInputElement>(
        "file-uploader-element"
      );
      const file = createFile("test.jpg", "image/jpeg");
      const dropEvent = createDragEvent("drop", [file]);

      fireEvent(container, dropEvent);

      expect(inputElement.files?.length).toBe(1);
      expect(inputElement.files?.[0].name).toBe("test.jpg");
      expect(onChangeMock).toHaveBeenCalled();
    });

    it("THEN should handle multiple files when multiple prop is true", () => {
      const onChangeMock = jest.fn();
      makeSut({ onChange: onChangeMock, multiple: true });

      const container = screen.getByTestId("file-uploader-container");
      const inputElement = screen.getByTestId<HTMLInputElement>(
        "file-uploader-element"
      );
      const files = [
        createFile("test1.jpg", "image/jpeg"),
        createFile("test2.png", "image/png"),
      ];
      const dropEvent = createDragEvent("drop", files);

      fireEvent(container, dropEvent);

      expect(inputElement.files?.length).toBe(2);
      expect(onChangeMock).toHaveBeenCalled();
    });
  });

  describe("WHEN aspectRatio is provided", () => {
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

  describe("WHEN children prop is provided", () => {
    it("THEN should render children content", () => {
      render(
        <FileUploader data-testid="file-uploader-element">
          <span data-testid="custom-child">Custom content</span>
        </FileUploader>
      );
      expect(screen.getByTestId("custom-child")).toBeDefined();
      expect(screen.getByText("Custom content")).toBeDefined();
    });

    it("THEN should render children alongside placeholder", () => {
      render(
        <FileUploader
          data-testid="file-uploader-element"
          placeholder="Helper text"
        >
          <span data-testid="custom-child">Custom content</span>
        </FileUploader>
      );
      expect(screen.getByText("Helper text")).toBeDefined();
      expect(screen.getByText("Custom content")).toBeDefined();
    });
  });
});
