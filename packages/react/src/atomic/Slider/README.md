# `@nimbus-ds/slider`

[![@nimbus-ds/slider](https://img.shields.io/npm/v/@nimbus-ds/slider?label=%40nimbus-ds%2Fslider)](https://www.npmjs.com/package/@nimbus-ds/slider)

The Slider component allows users to select a range of values within a defined minimum and maximum.

## Implementation

**Install** the component via terminal.

```bash
$ yarn add @nimbus-ds/slider
# or
$ npm install @nimbus-ds/slider
```

## Component Anatomy

The component consists of:

- A horizontal track representing the value range
- Two draggable thumb buttons to select min and max values
- Optional number inputs for precise value entry
- Optional range labels showing the minimum and maximum bounds

## Guidelines

We use the Slider component when we need the user to select a range of values, such as price filters, date ranges, or any numerical range selection.

## Features

### Range Selection

The slider supports dual-thumb interaction, allowing users to select both minimum and maximum values within the defined range. The thumbs are constrained so they cannot cross each other.

### Number Inputs

Optional number inputs are displayed above the track, allowing users to enter precise values. These inputs can be shown or hidden using the `showInputs` prop.

### Keyboard Navigation

The component fully supports keyboard navigation:

- **Arrow Left/Down**: Decrease value
- **Arrow Right/Up**: Increase value
- **Home**: Set to minimum value
- **End**: Set to maximum value

### Customization

- **Appearance**: Choose from primary, success, warning, danger, or neutral color schemes
- **Step**: Define the increment between values
- **Labels**: Add custom labels for min and max inputs
- **Prefix/Suffix**: Add prefix (e.g., "R$") or suffix (e.g., "kg") to range labels

## Props

| Prop            | Type                                                         | Default    | Description                                       |
| --------------- | ------------------------------------------------------------ | ---------- | ------------------------------------------------- |
| min             | number                                                       | 0          | Minimum value of the slider range                 |
| max             | number                                                       | 100        | Maximum value of the slider range                 |
| minValue        | number                                                       | (required) | Current minimum selected value                    |
| maxValue        | number                                                       | (required) | Current maximum selected value                    |
| step            | number                                                       | 1          | Step increment between values                     |
| appearance      | "primary" \| "success" \| "warning" \| "danger" \| "neutral" | "primary"  | Visual appearance of the slider fill              |
| disabled        | boolean                                                      | false      | Whether the slider is disabled                    |
| showInputs      | boolean                                                      | true       | Whether to show the number inputs                 |
| showRangeLabels | boolean                                                      | true       | Whether to show the range labels below the slider |
| minLabel        | string                                                       | -          | Label for the minimum input                       |
| maxLabel        | string                                                       | -          | Label for the maximum input                       |
| inputSeparator  | string                                                       | "↔"        | Separator displayed between min and max inputs    |
| labelPrefix     | string                                                       | -          | Prefix displayed before range label values        |
| labelSuffix     | string                                                       | -          | Suffix displayed after range label values         |
| onChange        | (minValue: number, maxValue: number) => void                 | -          | Callback fired when min or max value changes      |
| onMinChange     | (value: number) => void                                      | -          | Callback fired when min value changes             |
| onMaxChange     | (value: number) => void                                      | -          | Callback fired when max value changes             |
| onChangeEnd     | (minValue: number, maxValue: number) => void                 | -          | Callback fired when user finishes interaction     |

## Usage Examples

### Basic Usage

````

### Price Range Filter

```tsx
import { Slider } from "@nimbus-ds/slider";

function PriceFilter() {
  const [minPrice, setMinPrice] = useState(200);
  const [maxPrice, setMaxPrice] = useState(7200);

  return (
    <Slider
      min={0}
      max={9800}
      minValue={minPrice}
      maxValue={maxPrice}
      step={100}
      minLabel="Min."
      maxLabel="Máx."
      labelPrefix="R$"
      onChange={(min, max) => {
        setMinPrice(min);
        setMaxPrice(max);
      }}
    />
  );
}
````

### Without Inputs

```tsx
import { Slider } from "@nimbus-ds/slider";

<Slider min={0} max={100} minValue={30} maxValue={70} showInputs={false} />;
```

## Accessibility

The Slider component follows WAI-ARIA guidelines:

- Each thumb has `role="slider"` with appropriate `aria-valuemin`, `aria-valuemax`, and `aria-valuenow` attributes
- Inputs have `aria-label` attributes for screen readers
- Full keyboard navigation support
- Focus indicators on interactive elements

## Related Components

- **Input** - For single value text/number input
- **ProgressBar** - For displaying progress (non-interactive)

## Usage

View docs [here](https://nimbus.nuvemshop.com.br/documentation/atomic-components/slider).

<img alt="Nimbus" style="margin-bottom: 30px;" src="https://tiendanube.github.io/design-system-nimbus/static/media/nimbus-logo.ab60bd79.png" height="30" />
