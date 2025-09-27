import {
  Conditions,
  TextAlign,
  TextDecoration,
  WordBreak,
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
   * The amount of lines at which the text will be trimmed, showing an ellipsis when overflowed.
   */
  wordBreak?: WordBreak | TextConditions<WordBreak>;
  /**
   * The textDecoration shorthand property sets the appearance of decorative lines on text.
   */
  textDecoration?: TextDecoration | TextConditions<TextDecoration>;
}
