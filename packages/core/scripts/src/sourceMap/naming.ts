/**
 * Strips the known convention suffixes off a filename, in the order a file
 * can actually carry them, so what is left is the bare stem to compare
 * against the component's own name.
 */
function stem(file: string): string {
  return file
    .replace(/\.spec\.tsx?$/, "")
    .replace(/\.stories\.tsx?$/, "")
    .replace(/\.types\.ts$/, "")
    .replace(/\.docs\.json$/, "")
    .replace(/\.tsx?$/, "");
}

/**
 * `fileUploader`, `FileUploader`, `file-uploader` and `file_uploader`
 * all identify the same logical component.
 */
export function normalize(value: string): string {
  return value.toLowerCase().replace(/[-_]/g, "");
}

/**
 * A file belongs to the component's conventional set when its stem is the
 * component's own name.
 */
export function isConventional(file: string, normalizedName: string): boolean {
  return normalize(stem(file)) === normalizedName;
}
