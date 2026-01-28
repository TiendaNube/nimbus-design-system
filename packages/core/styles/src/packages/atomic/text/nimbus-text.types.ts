import type {
  Conditions,
  TextAlign,
  TextDecoration,
  WordBreak,
  TextOverflow,
  WhiteSpace,
  Overflow,
} from "../../../types";
import { textSprinkle } from "./nimbus-text.css";

const { properties: propertiesText } = textSprinkle;

type TextColorProperties = keyof typeof propertiesText.color;
type TextFontSizeProperties = keyof typeof propertiesText.fontSize;
type TextFontWeightProperties = keyof typeof propertiesText.fontWeight;
type TextLineHeightProperties = keyof typeof propertiesText.lineHeight;

type TextConditions<T> = Conditions<T>;

export interface TextSprinkle {
  /**
   * The fontSize property sets the size of the text.
   * @default base
   */
  fontSize?: TextFontSizeProperties | TextConditions<TextFontSizeProperties>;
  /**
   * The fontWeight property sets how thick or thin characters in text should be displayed.
   * @default regular
   */
  fontWeight?:
    | TextFontWeightProperties
    | TextConditions<TextFontWeightProperties>;
  /**
   * The lineHeight property specifies the line height of the text.
   * @default base
   */
  lineHeight?:
    | TextLineHeightProperties
    | TextConditions<TextLineHeightProperties>;
  /**
   * The textAlign property specifies the horizontal alignment of text.
   * @default left
   */
  textAlign?: TextAlign | TextConditions<TextAlign>;
  /**
   * The color property is used to set the color of the text.
   * Note: Gradients like 'ai-generative' changes other properties like 'width' and 'display', which could make the component behave differently. Ensure to visually test the component when dynamically changing the color.
   * @default neutral-textLow
   */
  color?: TextColorProperties | TextConditions<TextColorProperties>;
  /**
   * The amount of lines at which the text will be trimmed, showing an ellipsis when overflowed.
   */
  lineClamp?: number | TextConditions<number>;
  /**
   * The amount of lines at which the text will be trimmed, showing an ellipsis when overflowed.
   */
  WebkitLineClamp?: number | TextConditions<number>;
  /**
   * The wordBreak property sets whether line breaks appear wherever the text would otherwise overflow its content box.
   */
  wordBreak?: WordBreak | TextConditions<WordBreak>;
  /**
   * The textDecoration shorthand property sets the appearance of decorative lines on text.
   */
  textDecoration?: TextDecoration | TextConditions<TextDecoration>;
  /**
   * The textOverflow property specifies how overflowed content that is not displayed should be signaled to the user (e.g., 'ellipsis' for '...', 'clip' for hard cutoff).
   * Note: This property only works when overflow is set to 'hidden'.
   */
  textOverflow?: TextOverflow | TextConditions<TextOverflow>;
  /**
   * The whiteSpace property sets how white space inside an element is handled.
   */
  whiteSpace?: WhiteSpace | TextConditions<WhiteSpace>;
  /**
   * The overflow property specifies what happens if content overflows an element's box.
   */
  overflow?: Overflow | TextConditions<Overflow>;
}
