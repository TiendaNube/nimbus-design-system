import { InputBaseProps } from "../../input.types";

export interface InputTagsProperties extends InputBaseProps {
  /**
   * Maximum number of tags allowed
   * @default 30
   */
  maxTags?: number;
  /**
   * Array of tags
   * @default []
   */
  tags?: string[];
  /**
   * Callback fired when tags array changes
   */
  onTagsChange?: (tags: string[]) => void;
}

export type InputTagsProps = InputTagsProperties;
