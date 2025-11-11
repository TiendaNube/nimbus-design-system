export const isFileAccepted = (file: File, accept: string): boolean => {
  const trimmedAccept = accept.trim();
  if (!trimmedAccept || trimmedAccept === "*") return true;

  const acceptedTypes = trimmedAccept.split(",").map((type) => type.trim());
  const fileNameLower = file.name.toLowerCase();

  return acceptedTypes.some((acceptedType) => {
    if (acceptedType.endsWith("/*")) {
      const wildcardSuffixLength = 2;
      const baseType = acceptedType.slice(
        0,
        acceptedType.length - wildcardSuffixLength
      );
      return file.type.startsWith(baseType);
    }

    if (acceptedType.startsWith(".")) {
      const acceptedTypeLower = acceptedType.toLowerCase();
      return fileNameLower.endsWith(acceptedTypeLower);
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
