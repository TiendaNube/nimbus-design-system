import { type Conditions, type TextAlign } from "../../../types";
import { titleSprinkle } from "./nimbus-title.css";

const { properties: propertiesTitle } = titleSprinkle;

type TitleColorProperties = keyof typeof propertiesTitle.color;
type TitleFontSizeProperties = keyof typeof propertiesTitle.fontSize;
type TitleFontWeightProperties = keyof typeof propertiesTitle.fontWeight;
type TitleLineHeightProperties = keyof typeof propertiesTitle.lineHeight;

type TitleConditions<T> = Conditions<T>;

export interface TitleSprinkle {
  /**
   * The fontSize property sets the size of the title.
   * @default base
   */
  fontSize?: TitleFontSizeProperties | TitleConditions<TitleFontSizeProperties>;
  /**
   * The fontWeight property sets how thick or thin characters in title should be displayed.
   * @default regular
   */
  fontWeight?:
    | TitleFontWeightProperties
    | TitleConditions<TitleFontWeightProperties>;
  /**
   * The lineHeight property specifies the line height of the title.
   * @default base
   */
  lineHeight?:
    | TitleLineHeightProperties
    | TitleConditions<TitleLineHeightProperties>;
  /**
   * The textAlign property specifies the horizontal alignment of title.
   * @default left
   */
  textAlign?: TextAlign | TitleConditions<TextAlign>;
  /**
   * The color property is used to set the color of the title.
   * @default neutral-textLow
   */
  color?: TitleColorProperties | TitleConditions<TitleColorProperties>;
}
