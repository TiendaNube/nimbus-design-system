/**
 * True only for the Norte UI themes. Compares exact theme names: `next` and
 * `next-dark` must keep the current FileUploader.
 */
export const isNorteUiTheme = (currentTheme?: string): boolean =>
  currentTheme === "next-norteui" || currentTheme === "next-norteui-dark";

/**
 * Icon and placeholder look. Norte UI (Figma): 16px icon, regular text and
 * neutral-textDisabled when disabled. Other themes keep the 20px icon, bold
 * text and neutral-interactive when disabled.
 */
export const getLabelAppearance = (
  norteUi: boolean,
  disabled?: boolean
): {
  iconSize: number;
  fontWeight: "regular" | "bold";
  color: "primary-interactive" | "neutral-interactive" | "neutral-textDisabled";
} => {
  if (norteUi) {
    return {
      iconSize: 16,
      fontWeight: "regular",
      color: disabled ? "neutral-textDisabled" : "primary-interactive",
    };
  }
  return {
    iconSize: 20,
    fontWeight: "bold",
    color: disabled ? "neutral-interactive" : "primary-interactive",
  };
};

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
