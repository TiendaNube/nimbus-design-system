export const isFileAccepted = (file: File, accept: string): boolean => {
  if (!accept || accept === "*") return true;

  const acceptedTypes = accept.split(",").map((type) => type.trim());

  return acceptedTypes.some((acceptedType) => {
    if (acceptedType.endsWith("/*")) {
      const baseType = acceptedType.slice(0, -2);
      return file.type.startsWith(baseType);
    }

    if (acceptedType.startsWith(".")) {
      return file.name.toLowerCase().endsWith(acceptedType.toLowerCase());
    }

    return file.type === acceptedType;
  });
};

const createFileListUsingDataTransfer = (files: File[]): FileList => {
  const dataTransfer = new DataTransfer();
  files.forEach((file) => {
    dataTransfer.items.add(file);
  });
  return dataTransfer.files;
};

const createFileListUsingFallback = (files: File[]): FileList =>
  files.reduce(
    (list, file, index) => {
      Object.defineProperty(list, index, {
        value: file,
        enumerable: true,
      });
      return list;
    },
    { length: files.length } as unknown as FileList
  );

export const createFileListFromFiles = (
  files: File[],
  inputElement: HTMLInputElement
): void => {
  const fileList =
    typeof DataTransfer !== "undefined"
      ? createFileListUsingDataTransfer(files)
      : createFileListUsingFallback(files);

  Object.defineProperty(inputElement, "files", {
    value: fileList,
    writable: false,
    configurable: true,
  });
};
