import {
  isFileAccepted,
  createFileListFromFiles,
} from "./FileUploader.definitions";

const createFile = (name: string, type: string): File =>
  new File(["content"], name, { type });

const createInputElement = (): HTMLInputElement =>
  document.createElement("input");

describe("GIVEN isFileAccepted", () => {
  describe("WHEN accept is wildcard or empty", () => {
    it("THEN should accept any file when accept is *", () => {
      const file = createFile("document.pdf", "application/pdf");
      expect(isFileAccepted(file, "*")).toBe(true);
    });

    it("THEN should accept any file when accept is empty", () => {
      const file = createFile("image.png", "image/png");
      expect(isFileAccepted(file, "")).toBe(true);
    });
  });

  describe("WHEN validating by exact MIME type", () => {
    it("THEN should accept file matching exact MIME type", () => {
      const file = createFile("photo.jpg", "image/jpeg");
      expect(isFileAccepted(file, "image/jpeg")).toBe(true);
    });

    it("THEN should reject file not matching exact MIME type", () => {
      const file = createFile("document.pdf", "application/pdf");
      expect(isFileAccepted(file, "image/jpeg")).toBe(false);
    });

    it("THEN should accept file when MIME type is in comma-separated list", () => {
      const file = createFile("photo.png", "image/png");
      expect(isFileAccepted(file, "image/jpeg,image/png,image/gif")).toBe(true);
    });
  });

  describe("WHEN validating by wildcard MIME type", () => {
    it("THEN should accept any image when accept is image/*", () => {
      const jpegFile = createFile("photo.jpg", "image/jpeg");
      const pngFile = createFile("photo.png", "image/png");
      const webpFile = createFile("photo.webp", "image/webp");

      expect(isFileAccepted(jpegFile, "image/*")).toBe(true);
      expect(isFileAccepted(pngFile, "image/*")).toBe(true);
      expect(isFileAccepted(webpFile, "image/*")).toBe(true);
    });

    it("THEN should reject non-matching wildcard MIME type", () => {
      const pdfFile = createFile("document.pdf", "application/pdf");
      expect(isFileAccepted(pdfFile, "image/*")).toBe(false);
    });

    it("THEN should accept any video when accept is video/*", () => {
      const mp4File = createFile("video.mp4", "video/mp4");
      expect(isFileAccepted(mp4File, "video/*")).toBe(true);
    });
  });

  describe("WHEN validating by file extension", () => {
    it("THEN should accept file matching extension", () => {
      const file = createFile("document.pdf", "application/pdf");
      expect(isFileAccepted(file, ".pdf")).toBe(true);
    });

    it("THEN should reject file not matching extension", () => {
      const file = createFile("document.pdf", "application/pdf");
      expect(isFileAccepted(file, ".doc")).toBe(false);
    });

    it("THEN should handle case-insensitive extension matching", () => {
      const upperFile = createFile("document.PDF", "application/pdf");
      const lowerFile = createFile("document.pdf", "application/pdf");

      expect(isFileAccepted(upperFile, ".pdf")).toBe(true);
      expect(isFileAccepted(lowerFile, ".PDF")).toBe(true);
    });

    it("THEN should accept file when extension is in comma-separated list", () => {
      const file = createFile(
        "document.docx",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      );
      expect(isFileAccepted(file, ".pdf,.doc,.docx")).toBe(true);
    });
  });

  describe("WHEN validating with mixed accept formats", () => {
    it("THEN should accept file matching any format in mixed list", () => {
      const imageFile = createFile("photo.jpg", "image/jpeg");
      const pdfFile = createFile("document.pdf", "application/pdf");
      const docFile = createFile(
        "document.docx",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      );

      const accept = "image/*,.pdf,.docx";

      expect(isFileAccepted(imageFile, accept)).toBe(true);
      expect(isFileAccepted(pdfFile, accept)).toBe(true);
      expect(isFileAccepted(docFile, accept)).toBe(true);
    });

    it("THEN should handle whitespace in accept string", () => {
      const file = createFile("photo.jpg", "image/jpeg");
      expect(isFileAccepted(file, "image/jpeg, image/png, image/gif")).toBe(
        true
      );
    });
  });
});

const verifyFileListCreation = (
  inputElement: HTMLInputElement,
  expectedLength: number,
  expectedFiles?: Array<{ name: string }>
): void => {
  expect(inputElement.files).not.toBeNull();
  expect(inputElement.files?.length).toBe(expectedLength);

  if (expectedFiles) {
    expectedFiles.forEach((expected, index) => {
      expect(inputElement.files?.[index].name).toBe(expected.name);
    });
  }
};

describe("GIVEN createFileListFromFiles", () => {
  describe("WHEN DataTransfer is available", () => {
    it("THEN should create FileList using DataTransfer", () => {
      const inputElement = createInputElement();
      const files = [
        createFile("file1.jpg", "image/jpeg"),
        createFile("file2.png", "image/png"),
      ];

      createFileListFromFiles(files, inputElement);

      verifyFileListCreation(inputElement, 2, [
        { name: "file1.jpg" },
        { name: "file2.png" },
      ]);
    });

    it("THEN should handle single file", () => {
      const inputElement = createInputElement();
      const files = [createFile("single.pdf", "application/pdf")];

      createFileListFromFiles(files, inputElement);

      expect(inputElement.files?.length).toBe(1);
      expect(inputElement.files?.[0].name).toBe("single.pdf");
    });

    it("THEN should handle empty file array", () => {
      const inputElement = createInputElement();
      const files: File[] = [];

      createFileListFromFiles(files, inputElement);

      expect(inputElement.files?.length).toBe(0);
    });
  });

  describe("WHEN DataTransfer is not available", () => {
    let originalDataTransfer: typeof DataTransfer;

    beforeEach(() => {
      originalDataTransfer = global.DataTransfer;
      (global as any).DataTransfer = undefined;
    });

    afterEach(() => {
      global.DataTransfer = originalDataTransfer;
    });

    // eslint-disable-next-line sonarjs/no-identical-functions
    it("THEN should create FileList using fallback method", () => {
      const inputElement = createInputElement();
      const files = [
        createFile("file1.jpg", "image/jpeg"),
        createFile("file2.png", "image/png"),
      ];

      createFileListFromFiles(files, inputElement);

      verifyFileListCreation(inputElement, 2, [
        { name: "file1.jpg" },
        { name: "file2.png" },
      ]);
    });

    it("THEN should create enumerable FileList properties", () => {
      const inputElement = createInputElement();
      const files = [createFile("test.jpg", "image/jpeg")];

      createFileListFromFiles(files, inputElement);

      const fileList = inputElement.files as FileList;
      const keys = Object.keys(fileList).filter((key) => key !== "length");

      expect(keys.length).toBeGreaterThan(0);
    });

    it("THEN should set correct length property", () => {
      const inputElement = createInputElement();
      const files = [
        createFile("file1.jpg", "image/jpeg"),
        createFile("file2.png", "image/png"),
        createFile("file3.gif", "image/gif"),
      ];

      createFileListFromFiles(files, inputElement);

      expect(inputElement.files?.length).toBe(3);
    });
  });
});
