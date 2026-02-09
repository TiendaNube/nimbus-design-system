# @nimbus-ds/time-picker

The TimePicker component allows users to select a time value with support for different picker modes and time formats.

## Installation

```bash
npm install @nimbus-ds/time-picker
# or
yarn add @nimbus-ds/time-picker
```

## Usage

```jsx
import { TimePicker } from "@nimbus-ds/time-picker";

function App() {
  const [time, setTime] = useState("14:30");

  return (
    <TimePicker
      value={time}
      onChange={(value) => setTime(value)}
      format="24h"
      mode="scroll"
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | string \| Date \| null | - | Current time value |
| onChange | function | - | Callback when time changes |
| format | "12h" \| "24h" | "24h" | Time format |
| mode | "scroll" \| "dropdown" | "scroll" | Picker mode |
| step | number | 30 | Step interval in minutes (dropdown mode) |
| minTime | string | - | Minimum selectable time |
| maxTime | string | - | Maximum selectable time |
| disabled | boolean | false | Whether the picker is disabled |
| placeholder | string | "Select time" | Placeholder text |

## Modes

### Scroll Mode
Displays separate scrollable columns for hours and minutes (and AM/PM in 12h format).

### Dropdown Mode
Displays a scrollable list of pre-formatted time options based on the step interval.

## Accessibility

- Full keyboard navigation support
- ARIA attributes for screen readers
- Focus management within the picker panel
